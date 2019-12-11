import { Provider } from 'react-redux';
import React from 'react';

import {
  LOAD_SUPPLIER_RETURN_LIST,
  LOAD_SUPPLIER_RETURN_LIST_NEXT_PAGE,
  SET_ALERT,
  SET_LOADING_STATE,
  SET_SORT_ORDER,
  SET_TABLE_LOADING_STATE,
  SORT_AND_FILTER_SUPPLIER_RETURN_LIST,
  START_LOADING_MORE,
  STOP_LOADING_MORE,
  UPDATE_FILTER_BAR_OPTIONS,
} from '../SupplierReturnIntents';
import {
  RESET_STATE,
  SET_INITIAL_STATE,
} from '../../SystemIntents';
import { SUCCESSFULLY_SAVED_PURCHASE_RETURN } from '../../supplierReturnPurchase/SupplierReturnPurchaseMessageTypes';
import { SUCCESSFULLY_SAVED_RECEIVE_REFUND } from '../../receiveRefund/ReceiveRefundMessageTypes';
import { SUPPLIER_RETURN_LIST } from '../getSupplierReturnRoutes';
import {
  getAppliedParams,
  getBusinessId,
  getParams,
  getRegion,
  getSettings,
  getURLParams,
} from './selectors/SupplierReturnListIntegrationSelectors';
import {
  getNewSortOrder,
  getOffset,
} from './selectors/SupplierReturnListSelectors';
import { loadSettings, saveSettings } from '../../store/localStorageDriver';
import Store from '../../store/Store';
import SupplierReturnListView from './components/SupplierReturnListView';
import supplierReturnListReducer from './supplierReturnListReducer';

const messageTypes = [SUCCESSFULLY_SAVED_RECEIVE_REFUND, SUCCESSFULLY_SAVED_PURCHASE_RETURN];

export default class SupplierReturnListModule {
  constructor({
    integration, setRootView, popMessages,
  }) {
    this.integration = integration;
    this.setRootView = setRootView;
    this.store = new Store(supplierReturnListReducer);
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

  loadSupplierReturnList = () => {
    const state = this.store.getState();
    const intent = LOAD_SUPPLIER_RETURN_LIST;

    const onSuccess = (response) => {
      this.setPageLoadingState(false);
      this.store.dispatch({
        intent,
        ...response,
      });
    };

    const onFailure = () => {
      console.log('Failed to load supplier return list entries');
    };

    const urlParams = getURLParams(state);

    const params = {
      ...getParams(state),
      offset: 0,
    };

    this.integration.read({
      intent, urlParams, params, onSuccess, onFailure,
    });
  };

  filterSupplierReturnList = () => {
    const state = this.store.getState();
    const params = getParams(state);
    const isSort = false;
    this.getFilteredSupplierList(isSort, params);
  };

  sortSupplierReturnList = (orderBy) => {
    const state = this.store.getState();
    const newSortOrder = getNewSortOrder(state, orderBy);
    this.setSortOrder(orderBy, newSortOrder);

    const isSort = true;
    const params = getAppliedParams(state);
    this.getFilteredSupplierList(isSort, params);
  };

  getFilteredSupplierList = (isSort, params) => {
    const state = this.store.getState();
    const intent = SORT_AND_FILTER_SUPPLIER_RETURN_LIST;

    this.setTableLoadingState(true);

    const onSuccess = (response) => {
      this.setTableLoadingState(false);
      this.store.dispatch({
        intent,
        ...response,
        isSort,
      });
    };
    const onFailure = (error) => {
      this.setTableLoadingState(false);
      this.setDangerAlert(error.message);
    };

    const urlParams = getURLParams(state);
    const paramsWithOffset = {
      ...params,
      offset: 0,
    };

    this.integration.read({
      intent,
      urlParams,
      params: paramsWithOffset,
      onSuccess,
      onFailure,
    });
  }

  loadSupplierReturnListNextPage = () => {
    const state = this.store.getState();

    const intent = LOAD_SUPPLIER_RETURN_LIST_NEXT_PAGE;
    this.startLoadingMore();

    const urlParams = {
      businessId: getBusinessId(state),
    };

    const onSuccess = ({
      entries, pagination, totalAmount, totalDebitAmount,
    }) => {
      this.stopLoadingMore();
      this.store.dispatch({
        intent,
        entries,
        pagination,
        totalAmount,
        totalDebitAmount,
      });
    };

    const onFailure = ({ message }) => {
      this.stopLoadingMore();
      this.setAlert({ message, type: 'danger' });
    };

    const params = getParams(state);
    const offset = getOffset(state);

    this.integration.read({
      intent,
      urlParams,
      params: {
        ...params,
        offset,
      },
      onSuccess,
      onFailure,
    });
  }

  setSortOrder = (orderBy, sortOrder) => this.store.dispatch({
    intent: SET_SORT_ORDER,
    orderBy,
    sortOrder,
  });

  setTableLoadingState = (isTableLoading) => {
    this.store.dispatch({
      intent: SET_TABLE_LOADING_STATE,
      isTableLoading,
    });
  }

  setDangerAlert = (message) => {
    this.store.dispatch({
      intent: SET_ALERT,
      alert: {
        message,
        type: 'danger',
      },
    });
  }

  dismissAlert = () => {
    this.store.dispatch({
      intent: SET_ALERT,
      alert: undefined,
    });
  }

  updateFilterBarOptions = ({ key, value }) => {
    this.store.dispatch({
      intent: UPDATE_FILTER_BAR_OPTIONS,
      key,
      value,
    });
  }

  render = () => {
    const View = (
      <SupplierReturnListView
        onUpdateFilterBarOptions={this.updateFilterBarOptions}
        onApplyFilter={this.filterSupplierReturnList}
        onDismissAlert={this.dismissAlert}
        onSort={this.sortSupplierReturnList}
        onCreateRefundClick={this.redirectToCreateRefund}
        onCreatePurchaseClick={this.redirectToCreatePurchase}
        onLoadMoreButtonClick={this.loadSupplierReturnListNextPage}
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

  setPageLoadingState = (isLoading) => {
    this.store.dispatch({
      intent: SET_LOADING_STATE,
      isLoading,
    });
  }

  startLoadingMore = () => {
    this.store.dispatch({
      intent: START_LOADING_MORE,
    });
  }

  stopLoadingMore = () => {
    this.store.dispatch({
      intent: STOP_LOADING_MORE,
    });
  }

  setInitialState = (context, settings) => {
    this.store.dispatch({
      intent: SET_INITIAL_STATE,
      context,
      settings,
    });
  }

  redirectToCreateRefund = (id) => {
    const state = this.store.getState();
    const businessId = getBusinessId(state);
    const region = getRegion(state);

    window.location.href = `/#/${region}/${businessId}/supplierReturn/${id}/receiveRefund/new`;
  }

  redirectToCreatePurchase = (id) => {
    const state = this.store.getState();
    const businessId = getBusinessId(state);
    const region = getRegion(state);

    window.location.href = `/#/${region}/${businessId}/supplierReturn/${id}/applyToPurchase/new`;
  }

  run(context) {
    const settings = loadSettings(context.businessId, SUPPLIER_RETURN_LIST);
    this.setInitialState(context, settings);
    this.render();
    this.readMessages();
    this.store.subscribe(states => (
      saveSettings(context.businessId, SUPPLIER_RETURN_LIST, getSettings(states))
    ));
    this.loadSupplierReturnList();
  }

  resetState = () => {
    this.store.dispatch({
      intent: RESET_STATE,
    });
  };
}
