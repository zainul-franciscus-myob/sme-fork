import { Provider } from 'react-redux';
import React from 'react';

import { SUCCESSFULLY_SAVED_PURCHASE_ORDER_WITHOUT_LINK } from '../../../common/types/MessageTypes';
import {
  getBusinessId,
  getRegion,
  getSettings,
} from './purchaseOrderListSelectors';
import { loadSettings, saveSettings } from '../../../store/localStorageDriver';
import PurchaseOrderListView from './components/PurchaseOrderListView';
import RouteName from '../../../router/RouteName';
import Store from '../../../store/Store';
import createPurchaseOrderListDispatcher from './createPurchaseOrderListDispatcher';
import createPurchaseOrderListIntegrator from './createPurchaseOrderListIntegrator';
import debounce from '../../../common/debounce/debounce';
import purchaseOrderListReducer from './purchaseOrderListReducer';

const messageTypes = [SUCCESSFULLY_SAVED_PURCHASE_ORDER_WITHOUT_LINK];

export default class PurchaseOrderListModule {
  constructor({ integration, setRootView, popMessages }) {
    this.store = new Store(purchaseOrderListReducer);
    this.integrator = createPurchaseOrderListIntegrator(
      this.store,
      integration
    );
    this.dispatcher = createPurchaseOrderListDispatcher(this.store);
    this.setRootView = setRootView;
    this.popMessages = popMessages;
    this.messageTypes = messageTypes;
  }

  render = () => {
    const purchaseOrderListView = (
      <PurchaseOrderListView
        onUpdateFilters={this.updateFilterOptions}
        onResetFilters={this.resetFilterOptions}
        onSort={this.updateSortOrder}
        onDismissAlert={this.dispatcher.dismissAlert}
        onCreateButtonClick={this.redirectToCreateNewPurchaseOrder}
        onLoadMoreButtonClick={this.loadPurchaseOrderListNextPage}
      />
    );

    const wrappedView = (
      <Provider store={this.store}>{purchaseOrderListView}</Provider>
    );
    this.setRootView(wrappedView);
  };

  loadPurchaseOrderList = () => {
    const onSuccess = (action) => {
      this.dispatcher.loadPurchaseOrderList(action);
    };

    const onFailure = () => {
      this.dispatcher.loadPurchaseOrderListFail();
    };

    this.integrator.loadPurchaseOrderList({ onSuccess, onFailure });
  };

  unsubscribeFromStore = () => {
    this.store.unsubscribeAll();
  };

  sortAndFilterPurchaseOrderList = () => {
    this.dispatcher.setTableLoadingState(true);

    const onSuccess = ({ entries, pagination, total }) => {
      this.dispatcher.sortAndFilterPurchaseOrderList({
        pagination,
        entries,
        total,
      });
    };

    const onFailure = ({ message }) => {
      this.dispatcher.sortAndFilterPurchaseOrderListFail(message);
    };

    this.integrator.sortAndFilterPurchaseOrderList({ onSuccess, onFailure });
  };

  debouncedSortAndFilterPurchaseOrderList = debounce(
    this.sortAndFilterPurchaseOrderList
  );

  updateFilterOptions = ({ key, value }) => {
    this.dispatcher.updateFilterOptions({ key, value });

    if (key === 'keywords') {
      this.debouncedSortAndFilterPurchaseOrderList();
    } else {
      this.sortAndFilterPurchaseOrderList();
    }
  };

  resetFilterOptions = () => {
    this.dispatcher.resetFilterOptions();
    this.sortAndFilterPurchaseOrderList();
  };

  loadPurchaseOrderListNextPage = () => {
    this.dispatcher.startLoadingMore();
    const onSuccess = ({ entries, pagination }) => {
      this.dispatcher.loadPurchaseOrderListNextPage({ pagination, entries });
    };

    const onFailure = ({ message }) => {
      this.dispatcher.loadPurchaseOrderListNextPageFail(message);
    };

    this.integrator.loadPurchaseOrderListNextPage({ onSuccess, onFailure });
  };

  updateSortOrder = (orderBy) => {
    this.dispatcher.updateSortOrder(orderBy);
    this.sortAndFilterPurchaseOrderList();
  };

  redirectToCreateNewPurchaseOrder = () => {
    const state = this.store.getState();
    const businessId = getBusinessId(state);
    const region = getRegion(state);

    window.location.href = `/#/${region}/${businessId}/purchaseOrder/new`;
  };

  readMessages = () => {
    const [successMessage] = this.popMessages(this.messageTypes);

    if (successMessage) {
      const { content: message, type: messageType } = successMessage;
      const type =
        messageType === SUCCESSFULLY_SAVED_PURCHASE_ORDER_WITHOUT_LINK
          ? 'info'
          : 'success';

      this.dispatcher.setAlert({ message, type });
    }
  };

  resetState = () => this.dispatcher.resetState();

  run(context) {
    const settings = loadSettings(
      context.businessId,
      RouteName.PURCHASE_ORDER_LIST
    );
    this.dispatcher.setInitialState(context, settings);
    this.render();
    this.readMessages();
    this.store.subscribe((state) =>
      saveSettings(
        context.businessId,
        RouteName.PURCHASE_ORDER_LIST,
        getSettings(state)
      )
    );
    this.loadPurchaseOrderList();
  }
}
