import { Provider } from 'react-redux';
import React from 'react';

import {
  LOAD_BILL_LIST,
  SET_ALERT,
  SET_LOADING_STATE,
  SET_SORT_ORDER,
  SET_TABLE_LOADING_STATE,
  SORT_AND_FILTER_BILL_LIST,
  UPDATE_FILTER_OPTIONS,
} from '../BillIntents';
import {
  RESET_STATE, SET_INITIAL_STATE,
} from '../../SystemIntents';
import { SUCCESSFULLY_DELETED_BILL_SERVICE, SUCCESSFULLY_SAVED_BILL_SERVICE } from '../billMessageTypes';
import {
  flipSortOrder,
  getBusinessId,
  getFilterOptions,
  getNewBillUrlParam,
  getOrderBy,
  getRegion,
  getSortOrder,
} from './billListSelectors';
import BillListView from './components/BillListView';
import Store from '../../store/Store';
import billListReducer from './billListReducer';

const messageTypes = [
  SUCCESSFULLY_SAVED_BILL_SERVICE,
  SUCCESSFULLY_DELETED_BILL_SERVICE,
];

export default class BillListModule {
  constructor({
    integration, setRootView, popMessages,
  }) {
    this.integration = integration;
    this.store = new Store(billListReducer);
    this.setRootView = setRootView;
    this.popMessages = popMessages;
    this.messageTypes = messageTypes;
  }

  render = () => {
    const billListView = (
      <BillListView
        onUpdateFilters={this.updateFilterOptions}
        onApplyFilter={this.filterBillList}
        onSort={this.sortBillList}
        onDismissAlert={this.dismissAlert}
        onCreateButtonClick={this.redirectToCreateNewBill}
      />
    );

    const wrappedView = (
      <Provider store={this.store}>
        {billListView}
      </Provider>
    );
    this.setRootView(wrappedView);
  };

  loadBillList = () => {
    const state = this.store.getState();
    const intent = LOAD_BILL_LIST;
    const urlParams = {
      businessId: getBusinessId(this.store.getState()),
    };

    const onSuccess = (action) => {
      this.setLoadingState(false);
      this.store.dispatch({
        intent,
        ...action,
      });
    };

    const filterOptions = getFilterOptions(state);

    const onFailure = () => {
      console.log('Failed to load contact list entries');
    };

    this.integration.read({
      intent,
      urlParams,
      params: {
        dateFrom: filterOptions.dateFrom,
        dateTo: filterOptions.dateTo,
      },
      onSuccess,
      onFailure,
    });
  };

  setTableLoadingState = (isTableLoading) => {
    this.store.dispatch({
      intent: SET_TABLE_LOADING_STATE,
      isTableLoading,
    });
  };

  unsubscribeFromStore = () => {
    this.store.unsubscribeAll();
  };

  setLoadingState = (isLoading) => {
    this.store.dispatch({
      intent: SET_LOADING_STATE,
      isLoading,
    });
  };

  filterBillList = () => {
    const state = this.store.getState();

    this.setTableLoadingState(true);

    const intent = SORT_AND_FILTER_BILL_LIST;

    const urlParams = {
      businessId: getBusinessId(state),
    };

    const onSuccess = (action) => {
      this.setTableLoadingState(false);
      this.store.dispatch({
        intent,
        isSort: false,
        ...action,
      });
    };

    const onFailure = ({ message }) => {
      this.setTableLoadingState(false);
      this.setAlert({ message, type: 'danger' });
    };

    const filterOptions = getFilterOptions(state);
    const sortOrder = getSortOrder(state);
    const orderBy = getOrderBy(state);

    this.integration.read({
      intent,
      urlParams,
      params: {
        ...filterOptions,
        sortOrder,
        orderBy,
      },
      onSuccess,
      onFailure,
    });
  };

  setAlert = ({ message, type }) => {
    this.store.dispatch({
      intent: SET_ALERT,
      alert: {
        message,
        type,
      },
    });
  };

  updateFilterOptions = ({ filterName, value }) => this.store.dispatch({
    intent: UPDATE_FILTER_OPTIONS,
    filterName,
    value,
  });

  sortBillList = (orderBy) => {
    const state = this.store.getState();
    this.setTableLoadingState(true);

    const newSortOrder = orderBy === getOrderBy(state) ? flipSortOrder(state) : 'asc';
    this.setSortOrder(orderBy, newSortOrder);

    const urlParams = {
      businessId: getBusinessId(state),
    };

    const intent = SORT_AND_FILTER_BILL_LIST;
    const onSuccess = ({ entries, total, totalDue }) => {
      this.setTableLoadingState(false);
      this.store.dispatch({
        intent,
        entries,
        isSort: true,
        total,
        totalDue,
      });
    };

    const onFailure = ({ message }) => {
      this.setTableLoadingState(false);
      this.setAlert({ message, type: 'danger' });
    };

    const filterOptions = getFilterOptions(state);
    this.integration.read({
      intent,
      urlParams,
      params: {
        ...filterOptions,
        sortOrder: newSortOrder,
        orderBy,
      },
      onSuccess,
      onFailure,
    });
  };

  setSortOrder = (orderBy, newSortOrder) => {
    this.store.dispatch({
      intent: SET_SORT_ORDER,
      sortOrder: newSortOrder,
      orderBy,
    });
  };

  dismissAlert = () => {
    this.store.dispatch({
      intent: SET_ALERT,
      alert: undefined,
    });
  };

  redirectToCreateNewBill = () => {
    const state = this.store.getState();
    const businessId = getBusinessId(state);
    const region = getRegion(state);
    const newBillUrlParam = getNewBillUrlParam(state);

    window.location.href = `/#/${region}/${businessId}/bill/${newBillUrlParam}`;
  };

  readMessages = () => {
    const [successMessage] = this.popMessages(this.messageTypes);

    if (successMessage) {
      const { content: message } = successMessage;
      this.setAlert({
        type: 'success',
        message,
      });
    }
  };

  run(context) {
    this.setInitialState(context);
    this.render();
    this.readMessages();
    this.setLoadingState(true);
    this.loadBillList();
  }

  setInitialState = (context) => {
    this.store.dispatch({
      intent: SET_INITIAL_STATE,
      context,
    });
  };

  resetState() {
    this.store.dispatch({
      intent: RESET_STATE,
    });
  }
}
