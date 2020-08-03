import { Provider } from 'react-redux';
import React from 'react';

import {
  SUCCESSFULLY_SAVED_PURCHASE_RETURN,
  SUCCESSFULLY_SAVED_RECEIVE_REFUND,
} from '../../../common/types/MessageTypes';
import {
  getCreatePurchaseUrl,
  getCreateRefundUrl,
  getNewSortOrder,
} from './selectors/SupplierReturnListSelectors';
import { getSettings } from './selectors/SupplierReturnListIntegrationSelectors';
import { loadSettings, saveSettings } from '../../../store/localStorageDriver';
import LoadingState from '../../../components/PageView/LoadingState';
import RouteName from '../../../router/RouteName';
import Store from '../../../store/Store';
import SupplierReturnListView from './components/SupplierReturnListView';
import createSupplierReturnListDispatcher from './createSupplierReturnListDispatcher';
import createSupplierReturnListIntegrator from './createSupplierReturnListIntegrator';
import debounce from '../../../common/debounce/debounce';
import supplierReturnListReducer from './supplierReturnListReducer';

const messageTypes = [
  SUCCESSFULLY_SAVED_RECEIVE_REFUND,
  SUCCESSFULLY_SAVED_PURCHASE_RETURN,
];

export default class SupplierReturnListModule {
  constructor({ integration, setRootView, popMessages }) {
    this.setRootView = setRootView;
    this.store = new Store(supplierReturnListReducer);
    this.popMessages = popMessages;
    this.messageTypes = messageTypes;
    this.integrator = createSupplierReturnListIntegrator(
      this.store,
      integration
    );
    this.dispatcher = createSupplierReturnListDispatcher(this.store);
  }

  render = () => {
    const view = (
      <Provider store={this.store}>
        <SupplierReturnListView
          onUpdateFilterBarOptions={this.updateFilterBarOptions}
          onResetFilterBarOptions={this.resetFilterBarOptions}
          onDismissAlert={this.dispatcher.dismissAlert}
          onSort={this.sortSupplierReturnList}
          onCreateRefundClick={this.redirectToCreateRefund}
          onCreatePurchaseClick={this.redirectToCreatePurchase}
        />
      </Provider>
    );
    this.setRootView(view);
  };

  loadSupplierReturnList = () => {
    const onSuccess = (payload) => {
      this.dispatcher.setLoadingState(LoadingState.LOADING_SUCCESS);
      this.dispatcher.loadSupplierReturnList(payload);
    };

    const onFailure = () => {
      this.dispatcher.setLoadingState(LoadingState.LOADING_FAIL);
    };

    this.integrator.loadSupplierReturnList({ onSuccess, onFailure });
  };

  sortAndFilterSupplierReturnList = () => {
    this.dispatcher.setTableLoadingState(true);

    const onSuccess = (payload) => {
      this.dispatcher.setTableLoadingState(false);
      this.dispatcher.sortAndFilterSupplierReturnList(payload, false);
    };

    const onFailure = ({ message }) => {
      this.dispatcher.setTableLoadingState(false);
      this.dispatcher.setAlert({ message, type: 'danger' });
    };

    this.integrator.sortAndFilterSupplierReturnList({ onSuccess, onFailure });
  };

  updateFilterBarOptions = ({ key, value }) => {
    this.dispatcher.updateFilterBarOptions({ key, value });

    if (key === 'keywords') {
      debounce(this.sortAndFilterSupplierReturnList)();
    } else {
      this.sortAndFilterSupplierReturnList();
    }
  };

  resetFilterBarOptions = () => {
    this.dispatcher.resetFilterBarOptions();
    this.sortAndFilterSupplierReturnList();
  };

  sortSupplierReturnList = (orderBy) => {
    const state = this.store.getState();
    const newSortOrder = getNewSortOrder(state, orderBy);
    this.dispatcher.setSortOrder(orderBy, newSortOrder);

    this.sortAndFilterSupplierReturnList();
  };

  redirectToCreateRefund = (id) => {
    const state = this.store.getState();
    const url = getCreateRefundUrl(state, id);

    window.location.href = url;
  };

  redirectToCreatePurchase = (id) => {
    const state = this.store.getState();
    const url = getCreatePurchaseUrl(state, id);

    window.location.href = url;
  };

  readMessages = () => {
    const [successMessage] = this.popMessages(this.messageTypes);
    if (successMessage) {
      const { content: message } = successMessage;
      this.dispatcher.setAlert({ type: 'success', message });
    }
  };

  run(context) {
    const settings = loadSettings(
      context.businessId,
      RouteName.SUPPLIER_RETURN_LIST
    );
    this.dispatcher.setInitialState(context, settings);
    this.render();
    this.readMessages();
    this.store.subscribe((states) =>
      saveSettings(
        context.businessId,
        RouteName.SUPPLIER_RETURN_LIST,
        getSettings(states)
      )
    );
    this.loadSupplierReturnList();
  }

  resetState = () => {
    this.dispatcher.resetState();
  };

  unsubscribeFromStore = () => {
    this.store.unsubscribeAll();
  };
}
