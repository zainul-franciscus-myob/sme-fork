import { Provider } from 'react-redux';
import React from 'react';

import {
  MAX_ACCOUNT_NUMBER_FLEX_LENGTH,
  MAX_ACCOUNT_NUMBER_NON_FLEX_LENGTH,
} from './AccountListConfig';
import { RESET_STATE, SET_INITIAL_STATE } from '../../../SystemIntents';
import {
  SUCCESSFULLY_DELETED_ACCOUNT,
  SUCCESSFULLY_SAVED_ACCOUNT,
} from '../../../common/types/MessageTypes';
import {
  getAccountsForBulkUpdate,
  getAccountsForBulkUpdateTaxCodes,
  getAccountsForCalcHistoricalBalance,
  getDirtyEntries,
  getFilterOptions,
  getImportChartOfAccountsUrl,
  getLinkedAccountUrl,
  getNewAccountUrl,
  getRawEntries,
  getSelectedAccounts,
  getSelectedAccountsWithAllChildren,
  getSelectedTaxCodeId,
} from './AccountListSelectors';
import { loadSettings, saveSettings } from '../../../store/localStorageDriver';
import AccountListModalType from './components/AccountListModalType';
import AccountListRootView from './components/AccountListRootView';
import LoadingState from '../../../components/PageView/LoadingState';
import RouteName from '../../../router/RouteName';
import Store from '../../../store/Store';
import accountListReducer from './accountListReducer';
import accountTypes from './accountTypes';
import createAccountListDispatcher from './createAccountListDispatcher';
import createAccountListIntegrator from './createAccountListIntegrator';
import debounce from '../../../common/debounce/debounce';

const messageTypes = [SUCCESSFULLY_DELETED_ACCOUNT, SUCCESSFULLY_SAVED_ACCOUNT];
export default class AccountListModule {
  constructor({ integration, setRootView, popMessages, navigateTo }) {
    this.integration = integration;
    this.store = new Store(accountListReducer);
    this.setRootView = setRootView;
    this.popMessages = popMessages;
    this.messageTypes = messageTypes;
    this.dispatcher = createAccountListDispatcher(this.store);
    this.integrator = createAccountListIntegrator(this.store, integration);
    this.navigateTo = navigateTo;
  }

  loadAccountList = () => {
    this.dispatcher.setLoadingState(LoadingState.LOADING);

    const onSuccess = (payload) => {
      this.dispatcher.setLoadingState(LoadingState.LOADING_SUCCESS);
      this.dispatcher.loadAccountList(payload);
    };

    const onFailure = () => {
      this.dispatcher.setLoadingState(LoadingState.LOADING_FAIL);
    };

    this.integrator.loadAccountList({ onSuccess, onFailure });
  };

  filterAccountList = (onActionCompleted) => {
    this.dispatcher.setAccountListTableLoadingState(true);

    const onSuccess = (response) => {
      this.dispatcher.setAccountListTableLoadingState(false);
      this.dispatcher.filterAccountList(response);

      if (onActionCompleted) onActionCompleted();
    };

    const onFailure = (error) => {
      this.dispatcher.setAccountListTableLoadingState(false);
      this.dispatcher.setAlert({ message: error.message, type: 'danger' });
    };

    this.integrator.filterAccountList({ onSuccess, onFailure });
  };

  fetchAllAccounts = () => {
    this.dispatcher.setAccountListTableLoadingState(true);

    const onSuccess = (response) => {
      this.dispatcher.setAccountListTableLoadingState(false);
      this.dispatcher.filterAccountList(response);
      this.calculateRemainingHistoricalBalance();
    };

    const onFailure = (error) => {
      this.dispatcher.setAccountListTableLoadingState(false);
      this.dispatcher.setAlert({ message: error.message, type: 'danger' });
    };

    this.integrator.fetchAllAccounts({ onSuccess, onFailure });
  };

  setTab = (tabId) => {
    this.dispatcher.setAccountListTab(tabId);
    this.filterAccountList();
  };

  redirectToLinkedAccounts = () => {
    window.location.href = getLinkedAccountUrl(this.store.getState());
  };

  redirectToImportChartOfAccounts = () => {
    window.location.href = getImportChartOfAccountsUrl(this.store.getState());
  };

  redirectToNewAccount = () => {
    window.location.href = getNewAccountUrl(this.store.getState());
  };

  shouldDisableMoveTo = () => {
    const selectedAccounts = getSelectedAccounts(this.store.getState());

    // If there are any level 1 accounts selected
    const level1AccountSelected = selectedAccounts.some(
      (entry) => entry.level === 1
    );

    // Find primary account types (Assets, Liabilities, etc) in user's selection
    const accountTypeMap = selectedAccounts.reduce((acc, entry) => {
      acc[entry.accountType] = true;
      return acc;
    }, {});

    // If there are multiple primary account types in the user's selection
    const accountsSelectedFromMultipleTypes =
      Object.keys(accountTypeMap).length > 1;

    // If there are any level 1 accounts or multiple primary account types
    // in the user's selection then the Move To drop down should be disabled
    return level1AccountSelected || accountsSelectedFromMultipleTypes;
  };

  selectAccount = ({ index, value }) => {
    const entries = getRawEntries(this.store.getState());

    // Create a map of account IDs and the index in the list of entries
    const entriesMap = entries.reduce((acc, entry, i) => {
      acc[entry.id] = i;
      return acc;
    }, {});

    // Find the entry selected by the user and the parent of that entry if it exists
    // otherwise set the selected entry's parent to null
    const selectedEntry = { ...entries[index], selected: value };
    const selectedEntryParentIndex = entriesMap[selectedEntry.parentAccountId];
    const selectedEntryParent =
      selectedEntryParentIndex != null
        ? { ...entries[selectedEntryParentIndex] }
        : null;

    // If the selected entry has a parent
    if (selectedEntryParent) {
      // If the entry is being selected but it's parent is not selected
      // then the entry's parent should be updated
      if (value && !selectedEntryParent.selected)
        selectedEntry.shouldUpdateParentId = true;

      // If the entry is being deselected and it's parent is not selected
      // then the entry's parent should NOT be updated
      if (!value && !selectedEntryParent.selected)
        selectedEntry.shouldUpdateParentId = false;

      // If the entry is being selected and it's parent is selected
      // then the entry's parent should NOT be updated as only the
      // parent needs to be updated in the tree structure
      if (value && selectedEntryParent.selected)
        selectedEntry.shouldUpdateParentId = false;

      // If the entry is being deselected and it's parent is selected
      // then the entry's parent should be updated to the next unselected
      // grandparent
      if (!value && selectedEntryParent.selected) {
        // Search up the tree to find the next grandparent that is selected
        // and not a system account
        let newParent = selectedEntryParent;
        while (newParent.selected && !newParent.isSystem) {
          const newParentIndex = entriesMap[newParent.parentAccountId];
          newParent = entries[newParentIndex];
        }
        // The parent ID for the selected account should be
        // updated to the new found grandparent
        selectedEntry.shouldUpdateParentId = true;
        selectedEntry.newParentId = newParent.id;
      }
    }

    // The selected entry is always updated
    const updatedAccountsMap = {
      [index]: selectedEntry,
    };

    // If there is a parent and it is selected
    // then the parent must also be updated
    if (selectedEntryParent && selectedEntryParent.selected)
      updatedAccountsMap[selectedEntryParentIndex] = selectedEntryParent;

    const selectedEntryAccountLevel = entries[index].level;

    // Select all children under an entry by checking that the
    // entry's level is greater then the selected entry's
    for (let i = index + 1; i < entries.length; i += 1) {
      const entry = entries[i];
      const isChild = entry.level > selectedEntryAccountLevel;

      if (isChild) {
        // Child entries don't need their parent to be updated
        // as when the parent is moved the children follow
        updatedAccountsMap[i] = {
          ...entry,
          shouldUpdateParentId: false,
          selected: value,
        };
      } else break;
    }
    this.dispatcher.selectAccounts(updatedAccountsMap);
    this.dispatcher.setMoveToDisabled(this.shouldDisableMoveTo());
  };

  selectAllAccounts = (selected) => {
    this.dispatcher.selectAllAccounts(selected);
    this.dispatcher.setMoveToDisabled(this.shouldDisableMoveTo());
  };

  reselectAccountsNotDeleted = (prevSelectedAccountIds) => {
    const prevSelectAccountsDict = {};
    prevSelectedAccountIds.forEach((accId) => {
      prevSelectAccountsDict[accId] = true;
    });

    const newEntries = getRawEntries(this.store.getState()).map((acc) => ({
      ...acc,
      selected: Boolean(prevSelectAccountsDict[acc.id]),
    }));
    this.dispatcher.reselectAccountsNotDeleted(newEntries);
  };

  deleteAccounts = () => {
    this.dispatcher.setLoadingState(LoadingState.LOADING);
    this.dispatcher.setModalType('');
    this.dispatcher.dismissAllAlerts();

    const accountsBeforeDelete = getRawEntries(this.store.getState());
    const prevSelectedAccountIds = accountsBeforeDelete
      .filter((acc) => acc.selected)
      .map((acc) => acc.id);

    const onBulkDeleteCompleted = () => {
      this.reselectAccountsNotDeleted(prevSelectedAccountIds);

      const prevNumAccounts = accountsBeforeDelete.length;
      const currNumAccounts = getRawEntries(this.store.getState()).length;
      const numDeleted = prevNumAccounts - currNumAccounts;
      this.dispatcher.setLoadingState(LoadingState.LOADING_SUCCESS);
      if (numDeleted === 0) return;

      const message = `${numDeleted} accounts deleted.`;
      this.dispatcher.setAlert({
        type: 'success',
        message,
      });
    };

    const onSuccess = () => {
      this.filterAccountList(onBulkDeleteCompleted);
    };

    const onFailure = (error) => {
      this.dispatcher.setAlert({ message: error.message, type: 'danger' });
      this.filterAccountList(onBulkDeleteCompleted);
    };

    this.integrator.deleteAccounts(onSuccess, onFailure);
  };

  updateFilterOptions = ({ key, value }) => {
    this.dispatcher.setAccountListFilterOptions({ key, value });

    if (key === 'keywords') {
      debounce(this.filterAccountList)();
    } else {
      this.filterAccountList();
    }
  };

  resetFilterOptions = () => {
    this.dispatcher.resetAccountListFilterOptions();
    this.filterAccountList();
  };

  clickEditAccounts = () => {
    this.dispatcher.setEditMode(true);
    this.fetchAllAccounts();
  };

  clickBulkUpdateCancel = () => {
    if (getDirtyEntries(this.store.getState()).length > 0) {
      this.dispatcher.setModalType(AccountListModalType.CANCEL);
    } else {
      this.clickBulkUpdateModalDiscard();
    }
  };

  saveBulkUpdate = (updatedAccounts, customSuccessMessage) => {
    this.dispatcher.setLoadingState(LoadingState.LOADING);
    this.dispatcher.setModalType('');
    this.dispatcher.setEditMode(false);
    this.dispatcher.setRedirectUrl('');
    this.dispatcher.dismissAllAlerts();

    const orginalSelectedAccounts = getSelectedAccounts(this.store.getState());

    const onSuccess = ({ numAccountsUpdated, validationErrors }) => {
      const onBulkUpdateCompleted = () => {
        this.dispatcher.setLoadingState(LoadingState.LOADING_SUCCESS);

        let message = customSuccessMessage;
        if (!customSuccessMessage) {
          const accountGrammar =
            numAccountsUpdated > 1 ? 'accounts' : 'account';
          message = `${numAccountsUpdated} ${accountGrammar} updated.`;
        }
        this.dispatcher.setAlert({
          type: 'success',
          message,
        });

        if (validationErrors) {
          this.dispatcher.setAlert({
            type: 'danger',
            message: validationErrors,
          });
        }

        const orginalSelectedAccountMap = orginalSelectedAccounts.reduce(
          (acc, entry) => {
            acc[entry.id] = entry.selected;
            return acc;
          },
          {}
        );

        // Reselect accounts whose indices may be changed after bulk move
        const newSelectedAccounts = getRawEntries(this.store.getState());
        newSelectedAccounts.forEach((entry, i) => {
          if (orginalSelectedAccountMap[entry.id])
            this.selectAccount({ index: i, value: true });
        });
      };
      this.filterAccountList(onBulkUpdateCompleted);
    };

    const onFailure = (error) => {
      const onBulkUpdateCompleted = () => {
        this.dispatcher.setLoadingState(LoadingState.LOADING_SUCCESS);
        this.dispatcher.setAlert({ message: error.message, type: 'danger' });
      };
      this.filterAccountList(onBulkUpdateCompleted);
    };

    this.integrator.updateAccounts(
      { accounts: updatedAccounts },
      onSuccess,
      onFailure
    );
  };

  clickBulkUpdateSave = () => {
    const updateAccounts = getAccountsForBulkUpdate(this.store.getState());
    this.saveBulkUpdate(updateAccounts);
  };

  changeAccountDetails = ({ index, key, value }) => {
    this.dispatcher.setAccountDetails({ index, key, value });
  };

  updateFlexAccountNumber = ({ index, key, value }) => {
    if (value.length <= MAX_ACCOUNT_NUMBER_FLEX_LENGTH)
      this.changeAccountDetails({ index, key, value });
  };

  updateNonFlexAccountNumber = ({ index, prefix, key, value }) => {
    const startsWithPrefix = value.startsWith(prefix);
    const onlyNumeric = new RegExp('^[0-9]*$').test(
      value.substr(prefix.length)
    );
    const maxLength =
      value.length <= prefix.length + MAX_ACCOUNT_NUMBER_NON_FLEX_LENGTH;
    if (startsWithPrefix && onlyNumeric && maxLength)
      this.changeAccountDetails({ index, key, value });
  };

  changeAccountNumber = ({ index, prefix, key, value }) => {
    const state = this.store.getState();
    if (state.hasFlexibleAccountNumbers)
      this.updateFlexAccountNumber({ index, key, value });
    else this.updateNonFlexAccountNumber({ index, prefix, key, value });
  };

  padAccountNumber = ({ index, prefix, key, value }) => {
    const state = this.store.getState();
    if (!state.hasFlexibleAccountNumbers) {
      const autoCompletedNumber = value.padEnd(
        prefix.length + MAX_ACCOUNT_NUMBER_NON_FLEX_LENGTH,
        '0'
      );
      this.changeAccountDetails({ index, key, value: autoCompletedNumber });
    }
  };

  clickBulkUpdateModalDiscard = (url) => {
    this.dispatcher.setModalType('');
    this.dispatcher.setEditMode(false);
    if (url) {
      this.dispatcher.setRedirectUrl('');
      this.navigateTo(url);
    } else this.filterAccountList();
  };

  clickBulkUpdateModalCancel = () => {
    this.dispatcher.setModalType('');
  };

  openDeleteModal = () => {
    this.dispatcher.setModalType(AccountListModalType.DELETE);
  };

  handlePageTransition = (url) => {
    const state = this.store.getState();
    if (getDirtyEntries(state).length > 0) {
      this.dispatcher.setModalType(AccountListModalType.UNSAVED);
      this.dispatcher.setRedirectUrl(url);
    } else {
      this.navigateTo(url);
    }
  };

  calculateRemainingHistoricalBalance = () => {
    const state = this.store.getState();
    const remainingHistoricalBalance = getAccountsForCalcHistoricalBalance(
      state
    ).reduce((acc, entry) => {
      if (!entry.openingBalance) return acc;

      const openingBalance = parseFloat(entry.openingBalance);
      if (
        entry.accountType === accountTypes.ASSET ||
        entry.accountType === accountTypes.COST_OF_SALES ||
        entry.accountType === accountTypes.EXPENSE ||
        entry.accountType === accountTypes.OTHER_EXPENSE
      )
        return acc + openingBalance;
      return acc - openingBalance;
    }, 0);

    this.dispatcher.setRemainingHistoricalBalance(remainingHistoricalBalance);
  };

  moveUpAccount = () => {
    this.dispatcher.setLoadingState(LoadingState.LOADING);

    const onSuccess = ({ message }) => {
      this.dispatcher.setLoadingState(LoadingState.LOADING_SUCCESS);

      const onMoveUpSuccess = () => {
        this.dispatcher.setAlert({
          type: 'success',
          message,
        });
      };

      this.filterAccountList(onMoveUpSuccess);
    };

    const onFailure = ({ message }) => {
      this.dispatcher.setLoadingState(LoadingState.LOADING_FAIL);
      this.dispatcher.setAlert({ message, type: 'danger' });
    };

    this.integrator.moveUp(onSuccess, onFailure);
  };

  moveDownAccount = () => {
    this.dispatcher.setLoadingState(LoadingState.LOADING);

    const onSuccess = ({ message }) => {
      this.dispatcher.setLoadingState(LoadingState.LOADING_SUCCESS);

      const onMoveDownSuccess = () => {
        this.dispatcher.setAlert({
          type: 'success',
          message,
        });
      };

      this.filterAccountList(onMoveDownSuccess);
    };

    const onFailure = ({ message }) => {
      this.dispatcher.setLoadingState(LoadingState.LOADING_FAIL);
      this.dispatcher.setAlert({ message, type: 'danger' });
    };

    this.integrator.moveDown(onSuccess, onFailure);
  };

  clickBulkUpdateTaxCodeSave = () => {
    const state = this.store.getState();
    const numSelectedAccounts = getSelectedAccounts(state).length;
    const accounts = getAccountsForBulkUpdateTaxCodes(state);
    const selectedTaxCodeId = getSelectedTaxCodeId(state);

    const updatedAccounts = accounts.map((account) => ({
      ...account,
      taxCodeId: selectedTaxCodeId,
    }));
    const accountGrammar = numSelectedAccounts > 1 ? 'accounts' : 'account';
    const successMessage = `${numSelectedAccounts} ${accountGrammar} tax codes updated.`;
    this.saveBulkUpdate(updatedAccounts, successMessage);
  };

  moveAccountTo = (newParentId) => {
    const state = this.store.getState();
    const numSelectedAccounts = getSelectedAccounts(state).length;
    const accountsToBeMoved = getSelectedAccountsWithAllChildren(state);

    const updatedAccounts = [];

    accountsToBeMoved.forEach((account) => {
      if (!account.shouldUpdateParentId) return;

      if (account.newParentId)
        updatedAccounts.push({
          ...account,
          parentAccountId: account.newParentId,
        });
      else
        updatedAccounts.push({
          ...account,
          parentAccountId: newParentId,
        });
    });
    const accountGrammar = numSelectedAccounts > 1 ? 'accounts' : 'account';
    const successMessage = `${numSelectedAccounts} ${accountGrammar} moved.`;
    this.saveBulkUpdate(updatedAccounts, successMessage);
  };

  render = () => {
    const accountView = (
      <AccountListRootView
        onDismissAlert={this.dispatcher.dismissAlert}
        onUpdateFilterOptions={this.updateFilterOptions}
        onResetFilterOptions={this.resetFilterOptions}
        onTabSelect={this.setTab}
        onEditLinkedAccountButtonClick={this.redirectToLinkedAccounts}
        onImportChartOfAccountsClick={this.redirectToImportChartOfAccounts}
        onCreateAccountButtonClick={this.redirectToNewAccount}
        onAccountSelected={this.selectAccount}
        onAllAccountsSelected={this.selectAllAccounts}
        onDeleteClick={this.openDeleteModal}
        onDeleteConfirmButtonClick={this.deleteAccounts}
        onBulkUpdateModalCancelClick={this.clickBulkUpdateModalCancel}
        onEditAccountsClick={this.clickEditAccounts}
        onAccountDetailsChange={this.changeAccountDetails}
        onAccountNumberChange={this.changeAccountNumber}
        onAccountNumberBlur={this.padAccountNumber}
        onBulkUpdateCancelClick={this.clickBulkUpdateCancel}
        onBulkUpdateSaveClick={this.clickBulkUpdateSave}
        onBulkUpdateDiscardClick={this.clickBulkUpdateModalDiscard}
        onAccountMoveUpClick={this.moveUpAccount}
        onAccountMoveDownClick={this.moveDownAccount}
        calculateRemainingHistoricalBalance={
          this.calculateRemainingHistoricalBalance
        }
        onEntryHover={this.dispatcher.setHoveredRow}
        onEntryLeave={() => this.dispatcher.setHoveredRow(null)}
        onBulkUpdateTaxCodeChange={this.dispatcher.setSelectedTaxCode}
        onBulkUpdateTaxCodeSaveClick={this.clickBulkUpdateTaxCodeSave}
        onBulkUpdateTaxCodeOpen={() => this.dispatcher.setSelectedTaxCode(null)}
        onMoveToChange={this.moveAccountTo}
      />
    );

    const wrappedView = <Provider store={this.store}>{accountView}</Provider>;

    this.setRootView(wrappedView);
  };

  resetState = () => {
    const intent = RESET_STATE;
    this.store.dispatch({
      intent,
    });
  };

  unsubscribeFromStore = () => {
    this.store.unsubscribeAll();
  };

  setInitialState = (context, settings) => {
    this.store.dispatch({
      intent: SET_INITIAL_STATE,
      context,
      settings,
    });
  };

  readMessages = () => {
    const [successMessage] = this.popMessages(this.messageTypes);

    if (successMessage) {
      const { content: message } = successMessage;

      this.dispatcher.setAlert({
        type: 'success',
        message,
      });
    }
  };

  run = (context) => {
    const settings = loadSettings(context.businessId, RouteName.ACCOUNT_LIST);
    this.setInitialState(context, settings);
    this.render();
    this.readMessages();
    this.store.subscribe((state) =>
      saveSettings(
        context.businessId,
        RouteName.ACCOUNT_LIST,
        getFilterOptions(state)
      )
    );
    this.loadAccountList();
  };
}
