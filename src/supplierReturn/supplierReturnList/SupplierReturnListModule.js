import { Provider } from 'react-redux';
import React from 'react';

import {
  LOAD_SUPPLIER_RETURN_LIST,
  SET_ALERT,
  SET_LOADING_STATE,
  SET_SORT_ORDER,
  SET_TABLE_LOADING_STATE,
  SORT_AND_FILTER_SUPPLIER_RETURN_LIST,
  UPDATE_FILTER_BAR_OPTIONS,
} from '../SupplierReturnIntents';
import {
  RESET_STATE,
  SET_INITIAL_STATE,
} from '../../SystemIntents';
import {
  getAppliedFilterOptions,
  getBusinessId,
  getFilterOptions,
  getNewSortOrder,
  getOrderBy,
  getSortOrder,
} from './supplierReturnListSelectors';
import Store from '../../store/Store';
import SupplierReturnListView from './components/SupplierReturnListView';
import supplierReturnListReducer from './supplierReturnListReducer';

export default class SupplierReturnListModule {
  constructor({
    integration, setRootView,
  }) {
    this.integration = integration;
    this.setRootView = setRootView;
    this.store = new Store(supplierReturnListReducer);
  }

  loadSupplierReturnList = () => {
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

    const urlParams = {
      businessId: getBusinessId(this.store.getState()),
    };
    this.integration.read({
      intent, urlParams, onSuccess, onFailure,
    });
  };

  filterSupplierReturnList = () => {
    const state = this.store.getState();
    const filterOptions = getFilterOptions(state);
    const isSort = false;
    this.getFilteredSupplierList(isSort, filterOptions);
  };

  sortSupplierReturnList = (orderBy) => {
    const state = this.store.getState();
    const newSortOrder = getNewSortOrder(state, orderBy);
    this.setSortOrder(orderBy, newSortOrder);

    const isSort = true;
    const filterOptions = getAppliedFilterOptions(state);
    this.getFilteredSupplierList(isSort, filterOptions);
  };

  getFilteredSupplierList = (isSort, filterOptions) => {
    this.setTableLoadingState(true);

    const intent = SORT_AND_FILTER_SUPPLIER_RETURN_LIST;

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

    const state = this.store.getState();
    const orderBy = getOrderBy(state);
    const sortOrder = getSortOrder(state);
    const params = {
      ...filterOptions,
      sortOrder,
      orderBy,
    };
    const urlParams = {
      businessId: getBusinessId(state),
    };

    this.integration.read({
      intent, urlParams, params, onSuccess, onFailure,
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

  setInitialState = (context) => {
    this.store.dispatch({
      intent: SET_INITIAL_STATE,
      context,
    });
  }

  run(context) {
    this.setInitialState(context);
    this.render();
    this.loadSupplierReturnList();
  }

  resetState = () => {
    this.store.dispatch({
      intent: RESET_STATE,
    });
  };
}
