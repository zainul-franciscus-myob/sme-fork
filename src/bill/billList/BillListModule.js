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
import { LOAD_BILL_LIST_NEXT_PAGE, START_LOADING_MORE, STOP_LOADING_MORE } from '../billDetail/BillIntents';
import { RESET_STATE, SET_INITIAL_STATE } from '../../SystemIntents';
import {
  SUCCESSFULLY_DELETED_BILL,
  SUCCESSFULLY_SAVED_BILL,
  SUCCESSFULLY_SAVED_BILL_WITHOUT_LINK,
} from '../billDetail/types/BillMessageTypes';
import {
  flipSortOrder,
  getAppliedFilterOptions,
  getBusinessId,
  getFilterOptions,
  getOffset,
  getOrderBy,
  getRegion,
  getSettings,
  getSortOrder,
} from './billListSelectors';
import { loadSettings, saveSettings } from '../../store/localStorageDriver';
import BillListView from './components/BillListView';
import RouteName from '../../router/RouteName';
import Store from '../../store/Store';
import billListReducer from './billListReducer';

const messageTypes = [
  SUCCESSFULLY_DELETED_BILL,
  SUCCESSFULLY_SAVED_BILL,
  SUCCESSFULLY_SAVED_BILL_WITHOUT_LINK,
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
        onLoadMoreButtonClick={this.loadBillListNextPage}
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
      businessId: getBusinessId(state),
    };

    const onSuccess = (action) => {
      this.setLoadingState(false);
      this.store.dispatch({
        intent,
        ...action,
      });
    };

    const filterOptions = getFilterOptions(state);
    const sortOrder = getSortOrder(state);
    const orderBy = getOrderBy(state);

    const onFailure = () => {
      console.log('Failed to load contact list entries');
    };

    this.integration.read({
      intent,
      urlParams,
      params: {
        ...filterOptions,
        sortOrder,
        orderBy,
        offset: 0,
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

    const onSuccess = ({
      entries, pagination, totalDue, total,
    }) => {
      this.setTableLoadingState(false);
      this.store.dispatch({
        intent,
        isSort: false,
        pagination,
        entries,
        totalDue,
        total,
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
        offset: 0,

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

  loadBillListNextPage = () => {
    const state = this.store.getState();

    const intent = LOAD_BILL_LIST_NEXT_PAGE;
    this.startLoadingMore();

    const urlParams = {
      businessId: getBusinessId(state),
    };

    const onSuccess = ({ entries, pagination }) => {
      this.stopLoadingMore();
      this.store.dispatch({
        intent,
        entries,
        pagination,
      });
    };

    const onFailure = ({ message }) => {
      this.stopLoadingMore();
      this.setAlert({ message, type: 'danger' });
    };

    const filterOptions = getFilterOptions(state);
    const sortOrder = getSortOrder(state);
    const orderBy = getOrderBy(state);
    const offset = getOffset(state);

    this.integration.read({
      intent,
      urlParams,
      params: {
        ...filterOptions,
        sortOrder,
        orderBy,
        offset,
      },
      onSuccess,
      onFailure,
    });
  }

  sortBillList = (orderBy) => {
    const state = this.store.getState();
    this.setTableLoadingState(true);

    const newSortOrder = orderBy === getOrderBy(state) ? flipSortOrder(state) : 'asc';
    this.setSortOrder(orderBy, newSortOrder);

    const urlParams = {
      businessId: getBusinessId(state),
    };

    const intent = SORT_AND_FILTER_BILL_LIST;
    const onSuccess = ({
      entries, total, totalDue, pagination,
    }) => {
      this.setTableLoadingState(false);
      this.store.dispatch({
        intent,
        entries,
        isSort: true,
        total,
        totalDue,
        pagination,
      });
    };

    const onFailure = ({ message }) => {
      this.setTableLoadingState(false);
      this.setAlert({ message, type: 'danger' });
    };

    const filterOptions = getAppliedFilterOptions(state);
    this.integration.read({
      intent,
      urlParams,
      params: {
        ...filterOptions,
        sortOrder: newSortOrder,
        orderBy,
        offset: 0,
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

    window.location.href = `/#/${region}/${businessId}/bill/new`;
  };

  readMessages = () => {
    const [successMessage] = this.popMessages(this.messageTypes);

    if (successMessage) {
      const { content: message, type: messageType } = successMessage;
      const type = messageType === SUCCESSFULLY_SAVED_BILL_WITHOUT_LINK ? 'info' : 'success';
      this.setAlert({
        type,
        message,
      });
    }
  };

  run(context) {
    const settings = loadSettings(context.businessId, RouteName.BILL_LIST);
    this.setInitialState(context, settings);
    this.render();
    this.readMessages();
    this.setLoadingState(true);
    this.store.subscribe(state => (
      saveSettings(context.businessId, RouteName.BILL_LIST, getSettings(state))
    ));
    this.loadBillList();
  }

  setInitialState = (context, settings) => {
    this.store.dispatch({
      intent: SET_INITIAL_STATE,
      context,
      settings,
    });
  };

  resetState() {
    this.store.dispatch({
      intent: RESET_STATE,
    });
  }
}
