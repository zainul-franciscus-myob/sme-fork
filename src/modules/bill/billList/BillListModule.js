import { Provider } from 'react-redux';
import React from 'react';

import {
  LOAD_BILL_LIST,
  LOAD_BILL_LIST_NEXT_PAGE,
  RESET_FILTER_OPTIONS,
  SET_ALERT,
  SET_LOADING_STATE,
  SET_SORT_ORDER,
  SET_TABLE_LOADING_STATE,
  SORT_AND_FILTER_BILL_LIST,
  UPDATE_FILTER_OPTIONS,
} from '../BillIntents';
import { RESET_STATE, SET_INITIAL_STATE } from '../../../SystemIntents';
import {
  START_LOADING_MORE,
  STOP_LOADING_MORE,
} from '../billDetail/BillIntents';
import {
  SUCCESSFULLY_DELETED_BILL,
  SUCCESSFULLY_DOWNLOADED_REMITTANCE_ADVICE,
  SUCCESSFULLY_EMAILED_REMITTANCE_ADVICE,
  SUCCESSFULLY_SAVED_BILL_PAYMENT,
  SUCCESSFULLY_SAVED_BILL_WITHOUT_LINK,
  SUCCESSFULLY_SAVED_SUPPLIER_PAYMENT,
} from '../../../common/types/MessageTypes';
import {
  flipSortOrder,
  getBusinessId,
  getFilterOptions,
  getOffset,
  getOrderBy,
  getRegion,
  getSettings,
  getSortOrder,
} from './billListSelectors';
import { loadSettings, saveSettings } from '../../../store/localStorageDriver';
import BillListView from './components/BillListView';
import LoadingState from '../../../components/PageView/LoadingState';
import RouteName from '../../../router/RouteName';
import Store from '../../../store/Store';
import billListReducer from './billListReducer';
import debounce from '../../../common/debounce/debounce';

const messageTypes = [
  SUCCESSFULLY_EMAILED_REMITTANCE_ADVICE,
  SUCCESSFULLY_DOWNLOADED_REMITTANCE_ADVICE,
  SUCCESSFULLY_DELETED_BILL,
  SUCCESSFULLY_SAVED_BILL_WITHOUT_LINK,
  SUCCESSFULLY_SAVED_BILL_PAYMENT,
  SUCCESSFULLY_SAVED_SUPPLIER_PAYMENT,
];

export default class BillListModule {
  constructor({ integration, setRootView, popMessages }) {
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
        onResetFilters={this.resetFilterOptions}
        onSort={this.updateSortOrder}
        onDismissAlert={this.dismissAlert}
        onCreateButtonClick={this.redirectToCreateNewBill}
        onLoadMoreButtonClick={this.loadBillListNextPage}
      />
    );

    const wrappedView = <Provider store={this.store}>{billListView}</Provider>;
    this.setRootView(wrappedView);
  };

  loadBillList = () => {
    const state = this.store.getState();
    const intent = LOAD_BILL_LIST;
    const urlParams = {
      businessId: getBusinessId(state),
    };

    const onSuccess = (action) => {
      this.setLoadingState(LoadingState.LOADING_SUCCESS);
      this.store.dispatch({
        intent,
        ...action,
      });
    };

    const filterOptions = getFilterOptions(state);
    const sortOrder = getSortOrder(state);
    const orderBy = getOrderBy(state);

    const onFailure = () => {
      this.setLoadingState(LoadingState.LOADING_FAIL);
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

  setLoadingState = (loadingState) => {
    this.store.dispatch({
      intent: SET_LOADING_STATE,
      loadingState,
    });
  };

  sortAndFilterBillList = () => {
    const state = this.store.getState();

    this.setTableLoadingState(true);

    const intent = SORT_AND_FILTER_BILL_LIST;

    const urlParams = {
      businessId: getBusinessId(state),
    };

    const onSuccess = ({
      entries,
      pagination,
      totalDue,
      total,
      totalOverdue,
    }) => {
      this.setTableLoadingState(false);
      this.store.dispatch({
        intent,
        pagination,
        entries,
        totalDue,
        total,
        totalOverdue,
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

  debouncedSortAndFilterBillList = debounce(this.sortAndFilterBillList);

  setAlert = ({ message, type }) => {
    this.store.dispatch({
      intent: SET_ALERT,
      alert: {
        message,
        type,
      },
    });
  };

  updateFilterOptions = ({ key, value }) => {
    this.store.dispatch({
      intent: UPDATE_FILTER_OPTIONS,
      filterName: key,
      value,
    });

    if (key === 'keywords') {
      this.debouncedSortAndFilterBillList();
    } else {
      this.sortAndFilterBillList();
    }
  };

  resetFilterOptions = () => {
    this.store.dispatch({
      intent: RESET_FILTER_OPTIONS,
    });
    this.sortAndFilterBillList();
  };

  startLoadingMore = () => {
    this.store.dispatch({
      intent: START_LOADING_MORE,
    });
  };

  stopLoadingMore = () => {
    this.store.dispatch({
      intent: STOP_LOADING_MORE,
    });
  };

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
  };

  updateSortOrder = (orderBy) => {
    const state = this.store.getState();
    const newSortOrder =
      orderBy === getOrderBy(state) ? flipSortOrder(state) : 'asc';
    this.setSortOrder(orderBy, newSortOrder);

    this.sortAndFilterBillList();
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
      const type =
        messageType === SUCCESSFULLY_SAVED_BILL_WITHOUT_LINK
          ? 'info'
          : 'success';
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
    this.setLoadingState(LoadingState.LOADING);
    this.store.subscribe((state) =>
      saveSettings(context.businessId, RouteName.BILL_LIST, getSettings(state))
    );
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
