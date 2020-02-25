import { Provider } from 'react-redux';
import React from 'react';

import { SUCCESSFULLY_SAVED_APPLY_TO_SALE } from '../../applyToSale/ApplyToSaleMessageType';
import { SUCCESSFULLY_SAVED_PAY_REFUND } from '../../payRefund/PayRefundMessageTypes';
import {
  getBusinessId,
  getNewSortOrder,
  getRegion,
  getSettings,
} from './CustomerReturnListSelectors';
import { loadSettings, saveSettings } from '../../../store/localStorageDriver';
import CustomerReturnListView from './components/CustomerReturnListView';
import LoadingState from '../../../components/PageView/LoadingState';
import RouteName from '../../../router/RouteName';
import Store from '../../../store/Store';
import createCustomerReturnListDispatcher from './createCustomerReturnListDispatcher';
import createCustomerReturnListIntegrator from './createCustomerReturnListIntegrator';
import customerReturnListReducer from './customerReturnListReducer';

const messageTypes = [SUCCESSFULLY_SAVED_PAY_REFUND, SUCCESSFULLY_SAVED_APPLY_TO_SALE];

export default class CustomerReturnListModule {
  constructor({
    integration, setRootView, popMessages,
  }) {
    this.setRootView = setRootView;
    this.store = new Store(customerReturnListReducer);
    this.dispatcher = createCustomerReturnListDispatcher(this.store);
    this.integrator = createCustomerReturnListIntegrator(this.store, integration);
    this.popMessages = popMessages;
    this.messageTypes = messageTypes;
  }

  readMessages = () => {
    const [successMessage] = this.popMessages(this.messageTypes);

    if (successMessage) {
      const {
        content: message,
      } = successMessage;

      this.dispatcher.setAlert({
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
    const onSuccess = (response) => {
      this.dispatcher.setLoadingState(LoadingState.LOADING_SUCCESS);
      this.dispatcher.loadCustomerReturnList(response);
    };

    const onFailure = () => {
      this.dispatcher.setLoadingState(LoadingState.LOADING_FAIL);
    };
    this.integrator.loadCustomerReturnList({ onSuccess, onFailure });
  };

  filterCustomerReturnList = () => {
    this.dispatcher.setTableLoadingState(true);

    const onSuccess = ({ entries, totalAmount, totalCreditAmount }) => {
      this.dispatcher.setTableLoadingState(false);
      this.dispatcher.filterCustomerReturnList({
        entries,
        totalAmount,
        totalCreditAmount,
      });
    };

    const onFailure = (response) => {
      this.dispatcher.setTableLoadingState(false);
      this.dispatcher.setAlert({
        message: response.message, type: 'danger',
      });
    };

    this.integrator.filterCustomerReturnList({ onSuccess, onFailure });
  };

  sortCustomerReturnList = (orderBy) => {
    const state = this.store.getState();

    this.dispatcher.setTableLoadingState(true);

    const newSortOrder = getNewSortOrder(orderBy)(state);
    this.dispatcher.setSortOrder(orderBy, newSortOrder);

    const onSuccess = ({ entries, totalAmount, totalCreditAmount }) => {
      this.dispatcher.setTableLoadingState(false);
      this.dispatcher.sortCustomerReturnList({ entries, totalAmount, totalCreditAmount });
    };

    const onFailure = (error) => {
      this.dispatcher.setTableLoadingState(false);
      this.dispatcher.setAlert({
        message: error.message, type: 'danger',
      });
    };

    this.integrator.sortCustomerReturnList({
      orderBy,
      onSuccess,
      onFailure,
    });
  };

  updateFilterBarOptions = ({ key, value }) => {
    this.dispatcher.updateFilterBarOptions({ key, value });
  }

  render = () => {
    const View = (
      <CustomerReturnListView
        onUpdateFilterBarOptions={this.updateFilterBarOptions}
        onApplyFilter={this.filterCustomerReturnList}
        onDismissAlert={this.dispatcher.dismissAlert}
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

  run(context) {
    const settings = loadSettings(context.businessId, RouteName.CUSTOMER_RETURN_LIST);
    this.dispatcher.setInitialState(context, settings);
    this.render();
    this.store.subscribe(state => (
      saveSettings(context.businessId, RouteName.CUSTOMER_RETURN_LIST, getSettings(state))
    ));

    this.readMessages();
    this.loadCustomerReturnList();
  }

  resetState = () => {
    this.dispatcher.resetState();
  };
}
