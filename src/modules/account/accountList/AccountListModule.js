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
  getAccountsForCalcHistoricalBalance,
  getDirtyEntries,
  getFilterOptions,
  getImportChartOfAccountsUrl,
  getLinkedAccountUrl,
  getNewAccountUrl,
  getRawEntries,
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

  filterAccountList = (onBulkActionCompleted) => {
    this.dispatcher.setAccountListTableLoadingState(true);

    const onSuccess = (response) => {
      this.dispatcher.setAccountListTableLoadingState(false);
      this.dispatcher.filterAccountList(response);

      if (onBulkActionCompleted) {
        onBulkActionCompleted();
      }
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

  selectAccount = ({ index, value }) => {
    this.dispatcher.selectAccount({ index, value });
  };

  selectAllAccounts = (selected) => {
    this.dispatcher.selectAllAccounts(selected);
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

  clickBulkUpdateSave = () => {
    this.dispatcher.setLoadingState(LoadingState.LOADING);
    this.dispatcher.setModalType('');
    this.dispatcher.setEditMode(false);
    this.dispatcher.setRedirectUrl('');
    this.dispatcher.dismissAllAlerts();
    const onSuccess = ({ numAccountsUpdated, validationErrors }) => {
      const onBulkUpdateCompleted = () => {
        this.dispatcher.setLoadingState(LoadingState.LOADING_SUCCESS);
        const accountGrammar = numAccountsUpdated > 1 ? 'accounts' : 'account';
        const message = `${numAccountsUpdated} ${accountGrammar} updated.`;
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
    this.integrator.updateAccounts(onSuccess, onFailure);
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
