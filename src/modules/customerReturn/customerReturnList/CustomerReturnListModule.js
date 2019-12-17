import { Provider } from 'react-redux';
import React from 'react';

import { CUSTOMER_RETURN_LIST_ROUTE } from '../getCustomerReturnRoutes';
import {
  LOAD_CUSTOMER_RETURN_LIST,
  SET_ALERT,
  SET_LOADING_STATE,
  SET_SORT_ORDER,
  SET_TABLE_LOADING_STATE,
  SORT_AND_FILTER_CUSTOMER_RETURN_LIST,
  UPDATE_FILTER_BAR_OPTIONS,
} from '../CustomerReturnIntents';
import {
  RESET_STATE,
  SET_INITIAL_STATE,
} from '../../../SystemIntents';
import { SUCCESSFULLY_SAVED_APPLY_TO_SALE } from '../../applyToSale/ApplyToSaleMessageType';
import { SUCCESSFULLY_SAVED_PAY_REFUND } from '../../payRefund/PayRefundMessageTypes';
import {
  getAppliedFilterOptions, getBusinessId, getFilterOptions,
  getNewSortOrder, getOrderBy, getRegion, getSettings, getSortOrder,
} from './CustomerReturnListSelectors';
import { loadSettings, saveSettings } from '../../../store/localStorageDriver';
import CustomerReturnListView from './components/CustomerReturnListView';
import Store from '../../../store/Store';
import customerReturnListReducer from './customerReturnListReducer';

const messageTypes = [SUCCESSFULLY_SAVED_PAY_REFUND, SUCCESSFULLY_SAVED_APPLY_TO_SALE];

export default class CustomerReturnListModule {
  constructor({
    integration, setRootView, popMessages,
  }) {
    this.integration = integration;
    this.setRootView = setRootView;
    this.store = new Store(customerReturnListReducer);
    this.popMessages = popMessages;
    this.messageTypes = messageTypes;
  }

  readMessages = () => {
    const [successMessage] = this.popMessages(this.messageTypes);

    if (successMessage) {
      const {
        content: message,
      } = successMessage;

      this.setAlert({
        type: 'success',
        message,
      });
    }
  }

  redirectToCreateRefund = (id) => {
    const state = this.store.getState();
    const businessId = getBusinessId(state);
    const region = getRegion(state);

    window.location.href = `/#/${region}/${businessId}/customerReturn/${id}/payRefund/new`;
  }

  redirectToCreateApplyToSale = (id) => {
    const state = this.store.getState();
    const businessId = getBusinessId(state);
    const region = getRegion(state);

    window.location.href = `/#/${region}/${businessId}/customerReturn/${id}/applyToSale/new`;
  }

  loadCustomerReturnList = () => {
    const intent = LOAD_CUSTOMER_RETURN_LIST;

    const urlParams = {
      businessId: getBusinessId(this.store.getState()),
    };

    const onSuccess = (response) => {
      this.setLoadingState(false);
      this.store.dispatch({
        intent: LOAD_CUSTOMER_RETURN_LIST,
        ...response,
      });
    };

    const onFailure = () => {
      console.log('Failed to load customer return list entries');
    };

    const state = this.store.getState();
    const filterOptions = getFilterOptions(state);
    const sortOrder = getSortOrder(state);
    const orderBy = getOrderBy(state);
    const params = {
      ...filterOptions,
      sortOrder,
      orderBy,
    };

    this.integration.read({
      intent, urlParams, params, onSuccess, onFailure,
    });
  };

  filterCustomerReturnList = () => {
    const state = this.store.getState();

    this.setTableLoadingState(true);

    const urlParams = {
      businessId: getBusinessId(state),
    };

    const intent = SORT_AND_FILTER_CUSTOMER_RETURN_LIST;

    const onSuccess = ({ entries, totalAmount, totalCreditAmount }) => {
      this.setTableLoadingState(false);
      this.store.dispatch({
        intent,
        entries,
        totalAmount,
        totalCreditAmount,
        isSort: false,
      });
    };

    const onFailure = (response) => {
      this.setTableLoadingState(false);
      this.setAlert({
        message: response.message, type: 'danger',
      });
    };

    const filterOptions = getFilterOptions(state);
    const sortOrder = getSortOrder(state);
    const orderBy = getOrderBy(state);
    const params = {
      ...filterOptions,
      sortOrder,
      orderBy,
    };

    this.integration.read({
      intent,
      urlParams,
      params,
      onSuccess,
      onFailure,
    });
  };

  sortCustomerReturnList = (orderBy) => {
    const state = this.store.getState();

    this.setTableLoadingState(true);

    const newSortOrder = getNewSortOrder(orderBy)(state);
    this.setSortOrder(orderBy, newSortOrder);

    const urlParams = {
      businessId: getBusinessId(state),
    };

    const intent = SORT_AND_FILTER_CUSTOMER_RETURN_LIST;

    const onSuccess = ({ entries, totalAmount, totalCreditAmount }) => {
      this.setTableLoadingState(false);
      this.store.dispatch({
        intent,
        entries,
        totalAmount,
        totalCreditAmount,
        isSort: true,
      });
    };

    const onFailure = (error) => {
      this.setTableLoadingState(false);
      this.setAlert({
        message: error.message, type: 'danger',
      });
    };

    const filterOptions = getAppliedFilterOptions(state);
    const params = {
      ...filterOptions,
      sortOrder: newSortOrder,
      orderBy,
    };

    this.integration.read({
      intent,
      urlParams,
      params,
      onSuccess,
      onFailure,
    });
  };

  setSortOrder = (orderBy, sortOrder) => this.store.dispatch({
    intent: SET_SORT_ORDER,
    orderBy,
    sortOrder,
  });

  setTableLoadingState = (isTableLoading) => {
    const intent = SET_TABLE_LOADING_STATE;
    this.store.dispatch({
      intent,
      isTableLoading,
    });
  }

  setAlert = ({ message, type }) => {
    const intent = SET_ALERT;
    this.store.dispatch({
      intent,
      alert: {
        message,
        type,
      },
    });
  }

  dismissAlert = () => {
    const intent = SET_ALERT;
    this.store.dispatch({
      intent,
      alert: undefined,
    });
  }

  updateFilterBarOptions = ({ key, value }) => this.store.dispatch({
    intent: UPDATE_FILTER_BAR_OPTIONS,
    key,
    value,
  });

  render = () => {
    const View = (
      <CustomerReturnListView
        onUpdateFilterBarOptions={this.updateFilterBarOptions}
        onApplyFilter={this.filterCustomerReturnList}
        onDismissAlert={this.dismissAlert}
        onSort={this.sortCustomerReturnList}
        onCreateRefundClick={this.redirectToCreateRefund}
        onCreateApplyToSaleClick={this.redirectToCreateApplyToSale}
      />
    );

    const wrappedView = (
      <Provider store={this.store}>
        {View}
      </Provider>
    );
    this.setRootView(wrappedView);
  }

  unsubscribeFromStore = () => {
    this.store.unsubscribeAll();
  }

  setLoadingState = (isLoading) => {
    const intent = SET_LOADING_STATE;
    this.store.dispatch({
      intent,
      isLoading,
    });
  }

  setInitialState = (context, settings) => {
    const intent = SET_INITIAL_STATE;
    this.store.dispatch({
      intent,
      context,
      settings,
    });
  }

  run(context) {
    const settings = loadSettings(context.businessId, CUSTOMER_RETURN_LIST_ROUTE);
    this.setInitialState(context, settings);
    this.render();
    this.store.subscribe(state => (
      saveSettings(context.businessId, CUSTOMER_RETURN_LIST_ROUTE, getSettings(state))
    ));

    this.readMessages();
    this.loadCustomerReturnList();
  }

  resetState = () => {
    const intent = RESET_STATE;
    this.store.dispatch({
      intent,
    });
  };
}
