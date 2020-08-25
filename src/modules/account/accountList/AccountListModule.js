import { Provider } from 'react-redux';
import React from 'react';

import { RESET_STATE, SET_INITIAL_STATE } from '../../../SystemIntents';
import {
  SUCCESSFULLY_DELETED_ACCOUNT,
  SUCCESSFULLY_SAVED_ACCOUNT,
} from '../../../common/types/MessageTypes';
import {
  getFilterOptions,
  getImportChartOfAccountsUrl,
  getLinkedAccountUrl,
  getNewAccountUrl,
  getRawEntries,
} from './AccountListSelectors';
import { loadSettings, saveSettings } from '../../../store/localStorageDriver';
import AccountListView from './components/AccountListView';
import LoadingState from '../../../components/PageView/LoadingState';
import RouteName from '../../../router/RouteName';
import Store from '../../../store/Store';
import accountListReducer from './accountListReducer';
import createAccountListDispatcher from './createAccountListDispatcher';
import createAccountListIntegrator from './createAccountListIntegrator';
import debounce from '../../../common/debounce/debounce';

const messageTypes = [SUCCESSFULLY_DELETED_ACCOUNT, SUCCESSFULLY_SAVED_ACCOUNT];
export default class AccountListModule {
  constructor({ integration, setRootView, popMessages }) {
    this.integration = integration;
    this.store = new Store(accountListReducer);
    this.setRootView = setRootView;
    this.popMessages = popMessages;
    this.messageTypes = messageTypes;
    this.dispatcher = createAccountListDispatcher(this.store);
    this.integrator = createAccountListIntegrator(this.store, integration);
  }

  loadAccountList = (onBulkActionCompleted) => {
    this.dispatcher.setLoadingState(LoadingState.LOADING);

    const onSuccess = (payload) => {
      this.dispatcher.setLoadingState(LoadingState.LOADING_SUCCESS);
      this.dispatcher.filterAccountList(payload);

      if (onBulkActionCompleted) {
        onBulkActionCompleted();
      }
    };

    const onFailure = () => {
      this.dispatcher.setLoadingState(LoadingState.LOADING_FAIL);
    };

    this.integrator.filterAccountList({ onSuccess, onFailure });
  };

  filterAccountList = () => {
    this.dispatcher.setAccountListTableLoadingState(true);

    const onSuccess = (response) => {
      this.dispatcher.setAccountListTableLoadingState(false);
      this.dispatcher.filterAccountList(response);
    };

    const onFailure = (error) => {
      this.dispatcher.setAccountListTableLoadingState(false);
      this.dispatcher.setAlert({ message: error.message, type: 'danger' });
    };

    this.integrator.filterAccountList({ onSuccess, onFailure });
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
    this.dispatcher.closeModal();

    const accountsBeforeDelete = getRawEntries(this.store.getState());
    const prevSelectedAccountIds = accountsBeforeDelete
      .filter((acc) => acc.selected)
      .map((acc) => acc.id);

    const onBulkDeleteCompleted = () => {
      this.reselectAccountsNotDeleted(prevSelectedAccountIds);

      const prevNumAccounts = accountsBeforeDelete.length;
      const currNumAccounts = getRawEntries(this.store.getState()).length;
      const numDeleted = prevNumAccounts - currNumAccounts;
      if (numDeleted === 0) return;

      const message = `${numDeleted} accounts deleted.`;
      this.dispatcher.setAlert({
        type: 'success',
        message,
      });
    };

    const onSuccess = () => {
      this.loadAccountList(onBulkDeleteCompleted);
    };

    const onFailure = (error) => {
      this.dispatcher.setAlert({ message: error.message, type: 'danger' });
      this.loadAccountList(onBulkDeleteCompleted);
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

  render = () => {
    const accountView = (
      <AccountListView
        onDismissAlert={this.dispatcher.dismissAlert}
        onUpdateFilterOptions={this.updateFilterOptions}
        onResetFilterOptions={this.resetFilterOptions}
        onTabSelect={this.setTab}
        onEditLinkedAccountButtonClick={this.redirectToLinkedAccounts}
        onImportChartOfAccountsClick={this.redirectToImportChartOfAccounts}
        onCreateAccountButtonClick={this.redirectToNewAccount}
        onAccountSelected={this.selectAccount}
        onAllAccountsSelected={this.selectAllAccounts}
        onCloseModal={this.dispatcher.closeModal}
        onDeleteAccountsButtonClick={this.dispatcher.openBulkDeleteModel}
        onDeleteConfirmButtonClick={this.deleteAccounts}
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
