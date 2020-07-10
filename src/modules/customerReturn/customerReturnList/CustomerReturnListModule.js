import { Provider } from 'react-redux';
import React from 'react';

import {
  SUCCESSFULLY_SAVED_APPLY_TO_SALE,
  SUCCESSFULLY_SAVED_PAY_REFUND,
} from '../../../common/types/MessageTypes';
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
import debounce from '../../../common/debounce/debounce';

const messageTypes = [
  SUCCESSFULLY_SAVED_PAY_REFUND,
  SUCCESSFULLY_SAVED_APPLY_TO_SALE,
];

export default class CustomerReturnListModule {
  constructor({ integration, setRootView, popMessages }) {
    this.setRootView = setRootView;
    this.store = new Store(customerReturnListReducer);
    this.dispatcher = createCustomerReturnListDispatcher(this.store);
    this.integrator = createCustomerReturnListIntegrator(
      this.store,
      integration
    );
    this.popMessages = popMessages;
    this.messageTypes = messageTypes;
  }

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

  redirectToCreateRefund = (id) => {
    const state = this.store.getState();
    const businessId = getBusinessId(state);
    const region = getRegion(state);

    window.location.href = `/#/${region}/${businessId}/customerReturn/${id}/payRefund/new`;
  };

  redirectToCreateApplyToSale = (id) => {
    const state = this.store.getState();
    const businessId = getBusinessId(state);
    const region = getRegion(state);

    window.location.href = `/#/${region}/${businessId}/customerReturn/${id}/applyToSale/new`;
  };

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

  sortAndFilterCustomerReturnList = () => {
    this.dispatcher.setTableLoadingState(true);

    const onSuccess = ({ entries, totalAmount, totalCreditAmount }) => {
      this.dispatcher.setTableLoadingState(false);
      this.dispatcher.sortAndFilterCustomerReturnList({
        entries,
        totalAmount,
        totalCreditAmount,
      });
    };

    const onFailure = (response) => {
      this.dispatcher.setTableLoadingState(false);
      this.dispatcher.setAlert({
        message: response.message,
        type: 'danger',
      });
    };

    this.integrator.sortAndFilterCustomerReturnList({ onSuccess, onFailure });
  };

  debouncedSortAndFilterCustomerReturnList = debounce(
    this.sortAndFilterCustomerReturnList
  );

  updateSortOrder = (orderBy) => {
    const state = this.store.getState();
    const newSortOrder = getNewSortOrder(orderBy)(state);
    this.dispatcher.setSortOrder(orderBy, newSortOrder);

    this.sortAndFilterCustomerReturnList();
  };

  updateFilterBarOptions = ({ key, value }) => {
    this.dispatcher.updateFilterBarOptions({ key, value });

    if (key === 'keywords') {
      this.debouncedSortAndFilterCustomerReturnList();
    } else {
      this.sortAndFilterCustomerReturnList();
    }
  };

  render = () => {
    const View = (
      <CustomerReturnListView
        onUpdateFilterBarOptions={this.updateFilterBarOptions}
        onDismissAlert={this.dispatcher.dismissAlert}
        onSort={this.updateSortOrder}
        onCreateRefundClick={this.redirectToCreateRefund}
        onCreateApplyToSaleClick={this.redirectToCreateApplyToSale}
      />
    );

    const wrappedView = <Provider store={this.store}>{View}</Provider>;
    this.setRootView(wrappedView);
  };

  unsubscribeFromStore = () => {
    this.store.unsubscribeAll();
  };

  run(context) {
    const settings = loadSettings(
      context.businessId,
      RouteName.CUSTOMER_RETURN_LIST
    );
    this.dispatcher.setInitialState(context, settings);
    this.render();
    this.store.subscribe((state) =>
      saveSettings(
        context.businessId,
        RouteName.CUSTOMER_RETURN_LIST,
        getSettings(state)
      )
    );

    this.readMessages();
    this.loadCustomerReturnList();
  }

  resetState = () => {
    this.dispatcher.resetState();
  };
}
