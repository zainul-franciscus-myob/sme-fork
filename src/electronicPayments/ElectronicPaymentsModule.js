import { Provider } from 'react-redux';
import React from 'react';

import {
  LOAD_ACCOUNTS_AND_ELECTRONIC_PAYMENTS,
  RECORD_AND_DOWNLOAD_BANK_FILE,
  SELECT_ALL_ELECTRONIC_PAYMENTS,
  SELECT_ITEM_ELECTRONIC_PAYMENT,
  SET_ALERT,
  SET_LOADING_STATE,
  SET_SORT_ORDER,
  SET_TABLE_LOADING_STATE,
  SORT_AND_FILTER_ELECTRONIC_PAYMENTS,
  UPDATE_APPLIED_FILTER_OPTIONS,
  UPDATE_BANK_FILE_DETAILS,
  UPDATE_FILTER_OPTIONS,
  UPDATE_SELECTED_ACCOUNT_ID,
} from './ElectronicPaymentsIntents';
import { RESET_STATE, SET_INITIAL_STATE } from '../SystemIntents';
import {
  getAppliedFilterOptions,
  getBusinessId,
  getFilterOptions,
  getOrderBy,
  getRecordAndDownloadBankFileContent,
  getSortOrder,
} from './ElectronicPaymentsSelector';
import ElectronicPaymentsView from './components/ElectronicPaymentsView';
import Store from '../store/Store';
import electronicPaymentReducer from './electronicPaymentsReducer';


export default class ElectronicPaymentsModule {
  constructor({
    setRootView,
    integration,
  }) {
    this.setRootView = setRootView;
    this.store = new Store(electronicPaymentReducer);
    // this.dispatcher = createElectronicPaymentsDispatcher(this.store);
    this.integration = integration;
  }

  run(context) {
    this.setInitialState(context);
    this.render();
    this.loadAccountsAndElectronicPayments();
  }

  setIsLoading(isLoading) {
    this.store.dispatch({
      intent: SET_LOADING_STATE,
      isLoading,
    });
  }

  setIsTableLoading(isTableLoading) {
    this.store.dispatch({
      intent: SET_TABLE_LOADING_STATE,
      isTableLoading,
    });
  }

  updateSelectedAccountId = ({ key, value }) => {
    this.store.dispatch({
      intent: UPDATE_SELECTED_ACCOUNT_ID,
      key,
      value,
    });
  }

  updateFilterBarOptions = ({ filterName, value }) => {
    this.store.dispatch({
      intent: UPDATE_FILTER_OPTIONS,
      filterName,
      value,
    });
  }

  applyFilter = () => {
    this.filterEletronicPayments();
  }

  filterEletronicPayments = () => {
    const state = this.store.getState();
    const filterOptions = getFilterOptions(state);

    this.fetchElectronicPayments({
      filterOptions,
      isSort: false,
    });
    this.updateAppliedFilterOptions(filterOptions);
  }

  fetchElectronicPayments = ({ filterOptions, isSort }) => {
    this.setIsTableLoading(true);
    const state = this.store.getState();
    const intent = SORT_AND_FILTER_ELECTRONIC_PAYMENTS;
    const urlParams = {
      businessId: getBusinessId(state),
    };
    const onSuccess = ({ entries, sortOrder }) => {
      this.store.dispatch({
        intent,
        entries,
        isSort,
        sortOrder,
      });
      this.setIsTableLoading(false);
    };
    const onFailure = ({ message }) => this.setAlert({ message, type: 'danger' });

    let sortOrder;
    if (isSort) {
      sortOrder = getSortOrder(state) === 'desc' ? 'asc' : 'desc';
    } else {
      sortOrder = getSortOrder(state);
    }

    this.integration.read({
      intent,
      urlParams,
      params: {
        ...filterOptions,
        sortOrder,
        orderBy: getOrderBy(state),
      },
      onSuccess,
      onFailure,
    });
  }

  updateAppliedFilterOptions = (filterOptions) => {
    this.store.dispatch({
      intent: UPDATE_APPLIED_FILTER_OPTIONS,
      filterOptions,
    });
  }

  loadAccountsAndElectronicPayments = () => {
    this.setIsLoading(true);
    const state = this.store.getState();
    const filterOptions = getFilterOptions(state);

    const urlParams = {
      businessId: getBusinessId(state),
    };

    const onSuccess = (response) => {
      this.store.dispatch({
        intent: LOAD_ACCOUNTS_AND_ELECTRONIC_PAYMENTS,
        response,
      });

      const firstAccountId = response && response.accounts
        && response.accounts[0] && response.accounts[0].id;
      this.store.dispatch({
        intent: UPDATE_SELECTED_ACCOUNT_ID,
        value: firstAccountId,
      });
      this.setIsLoading(false);
      this.setIsTableLoading(false);
    };
    const onFailure = () => {};

    this.integration.read({
      urlParams,
      params: {
        ...filterOptions,
        sortOrder: getSortOrder(state),
        orderBy: getOrderBy(state),
      },
      onSuccess,
      onFailure,
      intent: LOAD_ACCOUNTS_AND_ELECTRONIC_PAYMENTS,
    });
  }

  flipSortOrder = ({ sortOrder }) => (sortOrder === 'desc' ? 'asc' : 'desc');

  setSortOrder = (orderBy, newSortOrder) => {
    this.store.dispatch({
      intent: SET_SORT_ORDER,
      sortOrder: newSortOrder,
      orderBy,
    });
  }

  sortElectronicPayments = (orderBy) => {
    const state = this.store.getState();
    const filterOptions = getAppliedFilterOptions(state);

    const newSortOrder = orderBy === getOrderBy(state) ? this.flipSortOrder(state) : 'asc';
    this.setSortOrder(orderBy, newSortOrder);

    this.fetchElectronicPayments({
      filterOptions,
      isSort: true,
    });
  }

  recordAndDownloadBankFile = () => {
    const state = this.store.getState();
    const intent = RECORD_AND_DOWNLOAD_BANK_FILE;

    const content = getRecordAndDownloadBankFileContent(state);
    const onSuccess = ({ message }) => {
      this.setAlert({
        type: 'success',
        message,
      });
    };

    const onFailure = ({ message }) => {
      this.setAlert({
        type: 'danger',
        message,
      });
    };

    this.integration.write({
      intent,
      content,
      onSuccess,
      onFailure,
    });
  }

  setInitialState = (context) => {
    this.store.dispatch({
      intent: SET_INITIAL_STATE,
      context,
    });
  };

  setAlert = (alert) => {
    this.store.dispatch({
      intent: SET_ALERT,
      alert,
    });
  }

  dismissAlert = () => {
    const intent = SET_ALERT;
    this.store.dispatch({
      intent,
      alert: undefined,
    });
  };

  selectAll = (isSelected) => {
    this.store.dispatch({
      intent: SELECT_ALL_ELECTRONIC_PAYMENTS,
      isSelected,
    });
  }

  selectItem = (item, isSelected) => {
    this.store.dispatch({
      intent: SELECT_ITEM_ELECTRONIC_PAYMENT,
      isSelected,
      item,
    });
  }

  updateInputField = ({ key, value }) => {
    this.store.dispatch({
      intent: UPDATE_BANK_FILE_DETAILS,
      key,
      value,
    });
  }

  render = () => {
    const view = (
      <ElectronicPaymentsView
        onUpdateFilterBarOptions={this.updateFilterBarOptions}
        onApplyFilter={this.applyFilter}
        onAccountChange={this.updateSelectedAccountId}
        selectAll={this.selectAll}
        selectItem={this.selectItem}
        onSort={this.sortElectronicPayments}
        onDismissAlert={this.dismissAlert}
        onRecordAndDownloadBankFile={this.recordAndDownloadBankFile}
        onInputChange={this.updateInputField}
      />
    );

    const wrappedView = (
      <Provider store={this.store}>
        {view}
      </Provider>
    );
    this.setRootView(wrappedView);
  }

  unsubscribeFromStore = () => {
    this.store.unsubscribeAll();
  }

  resetState = () => {
    this.store.dispatch({
      intent: RESET_STATE,
    });
  }
}
