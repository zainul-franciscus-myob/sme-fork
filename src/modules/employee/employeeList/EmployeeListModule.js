import { Provider } from 'react-redux';
import React from 'react';

import {
  LOAD_EMPLOYEE_LIST,
  LOAD_EMPLOYEE_LIST_NEXT_PAGE,
  RESET_FILTER_BAR_OPTIONS,
  SET_ALERT,
  SET_LOADING_STATE,
  SET_SORT_ORDER,
  SET_TABLE_LOADING_STATE,
  SORT_AND_FILTER_EMPLOYEE_LIST,
  START_LOADING_MORE,
  STOP_LOADING_MORE,
  UPDATE_FILTER_BAR_OPTIONS,
} from '../EmployeeIntents';
import { RESET_STATE, SET_INITIAL_STATE } from '../../../SystemIntents';
import {
  SUCCESSFULLY_DELETED_EMPLOYEE,
  SUCCESSFULLY_SAVED_EMPLOYEE,
} from '../../../common/types/MessageTypes';
import {
  getBusinessId,
  getFilterEmployeeListNextPageParams,
  getLoadEmployeeListNextPageParams,
  getNewSortOrder,
  getRegion,
} from './EmployeeListSelectors';
import EmployeeListView from './components/EmployeeListView';
import LoadingState from '../../../components/PageView/LoadingState';
import Store from '../../../store/Store';
import debounce from '../../../common/debounce/debounce';
import employeeListReducer from './employeeListReducer';

const messageTypes = [
  SUCCESSFULLY_DELETED_EMPLOYEE,
  SUCCESSFULLY_SAVED_EMPLOYEE,
];

export default class EmployeeListModule {
  constructor({ integration, setRootView, popMessages }) {
    this.integration = integration;
    this.setRootView = setRootView;
    this.popMessages = popMessages;
    this.messageTypes = messageTypes;
    this.store = new Store(employeeListReducer);
  }

  redirectToCreateEmployee = () => {
    const state = this.store.getState();
    const businessId = getBusinessId(state);
    const region = getRegion(state);

    window.location.href = `/#/${region}/${businessId}/employee/new`;
  };

  updateFilterBarOptions = ({ key, value }) => {
    this.store.dispatch({ intent: UPDATE_FILTER_BAR_OPTIONS, key, value });

    if (key === 'keywords') {
      debounce(this.sortAndFilterEmployeeList)();
    } else {
      this.sortAndFilterEmployeeList();
    }
  };

  resetFilterBarOptions = () => {
    this.store.dispatch({ intent: RESET_FILTER_BAR_OPTIONS });
    this.sortAndFilterEmployeeList();
  };

  setSortOrder = (orderBy, sortOrder) =>
    this.store.dispatch({
      intent: SET_SORT_ORDER,
      orderBy,
      sortOrder,
    });

  sortEmployeeList = (orderBy) => {
    const state = this.store.getState();
    const newSortOrder = getNewSortOrder(orderBy)(state);
    this.setSortOrder(orderBy, newSortOrder);

    this.sortAndFilterEmployeeList();
  };

  loadEmployeeList = () => {
    const intent = LOAD_EMPLOYEE_LIST;

    const urlParams = {
      businessId: getBusinessId(this.store.getState()),
    };

    const params = {
      offset: 0,
    };

    const onSuccess = (response) => {
      this.setLoadingState(LoadingState.LOADING_SUCCESS);
      this.store.dispatch({
        intent: LOAD_EMPLOYEE_LIST,
        ...response,
      });
    };

    const onFailure = () => {
      this.setLoadingState(LoadingState.LOADING_FAIL);
    };

    this.integration.read({
      intent,
      urlParams,
      onSuccess,
      onFailure,
      params,
    });
  };

  setAlert = ({ message, type }) => {
    const intent = SET_ALERT;
    this.store.dispatch({
      intent,
      alert: {
        message,
        type,
      },
    });
  };

  sortAndFilterEmployeeList = () => {
    const state = this.store.getState();
    this.setTableLoadingState(true);

    const intent = SORT_AND_FILTER_EMPLOYEE_LIST;

    const urlParams = {
      businessId: getBusinessId(state),
    };

    const onSuccess = ({ entries, pagination }) => {
      this.setTableLoadingState(false);
      this.store.dispatch({
        intent,
        entries,
        pagination,
      });
    };

    const onFailure = ({ message }) => {
      this.setTableLoadingState(false);
      this.setAlert({
        message,
        type: 'danger',
      });
    };

    const params = getFilterEmployeeListNextPageParams(state);

    this.integration.read({
      intent,
      urlParams,
      params,
      onSuccess,
      onFailure,
    });
  };

  loadEmployeeListNextPage = () => {
    const state = this.store.getState();
    this.startLoadingMore();

    const intent = LOAD_EMPLOYEE_LIST_NEXT_PAGE;

    const urlParams = {
      businessId: getBusinessId(state),
    };

    const params = getLoadEmployeeListNextPageParams(state);

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

    this.integration.read({
      intent,
      urlParams,
      params,
      onSuccess,
      onFailure,
    });
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

  render = () => {
    const View = (
      <EmployeeListView
        onEmployeeCreateButtonClick={this.redirectToCreateEmployee}
        onUpdateFilterBarOptions={this.updateFilterBarOptions}
        onResetFilterBarOptions={this.resetFilterBarOptions}
        onSort={this.sortEmployeeList}
        onDismissAlert={this.dismissAlert}
        onLoadMoreButtonClick={this.loadEmployeeListNextPage}
      />
    );

    const wrappedView = <Provider store={this.store}>{View}</Provider>;
    this.setRootView(wrappedView);
  };

  dismissAlert = () => {
    const intent = SET_ALERT;
    this.store.dispatch({
      intent,
      alert: undefined,
    });
  };

  unsubscribeFromStore = () => {
    this.store.unsubscribeAll();
  };

  setTableLoadingState = (isTableLoading) => {
    const intent = SET_TABLE_LOADING_STATE;
    this.store.dispatch({
      intent,
      isTableLoading,
    });
  };

  setLoadingState = (loadingState) => {
    const intent = SET_LOADING_STATE;
    this.store.dispatch({
      intent,
      loadingState,
    });
  };

  setInitialState = (context) => {
    const intent = SET_INITIAL_STATE;

    this.store.dispatch({
      intent,
      context,
    });
  };

  run(context) {
    this.setInitialState(context);
    this.render();
    this.readMessages();
    this.loadEmployeeList();
  }

  resetState = () => {
    const intent = RESET_STATE;
    this.store.dispatch({
      intent,
    });
  };
}
