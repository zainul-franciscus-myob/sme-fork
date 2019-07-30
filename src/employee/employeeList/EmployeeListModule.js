import { Provider } from 'react-redux';
import React from 'react';

import {
  LOAD_EMPLOYEE_LIST,
  SET_ALERT,
  SET_LOADING_STATE,
  SET_SORT_ORDER,
  SET_TABLE_LOADING_STATE,
  SORT_AND_FILTER_EMPLOYEE_LIST,
  UPDATE_FILTER_BAR_OPTIONS,
} from '../EmployeeIntents';
import {
  RESET_STATE,
  SET_INITIAL_STATE,
} from '../../SystemIntents';
import { SUCCESSFULLY_DELETED_EMPLOYEE, SUCCESSFULLY_SAVED_EMPLOYEE } from '../EmployeeMessageTypes';
import {
  getAppliedFilterOptions, getBusinessId, getFilterOptions,
  getNewSortOrder, getOrderBy, getRegion, getSortOrder,
} from './EmployeeListSelectors';
import EmployeeListView from './components/EmployeeListView';
import Store from '../../store/Store';
import employeeListReducer from './employeeListReducer';

const messageTypes = [
  SUCCESSFULLY_DELETED_EMPLOYEE,
  SUCCESSFULLY_SAVED_EMPLOYEE,
];

export default class EmployeeListModule {
  constructor({
    integration, setRootView, popMessages,
  }) {
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
  }

  updateFilterBarOptions = ({ key, value }) => this.store.dispatch({
    intent: UPDATE_FILTER_BAR_OPTIONS,
    key,
    value,
  });

  setSortOrder = (orderBy, sortOrder) => this.store.dispatch({
    intent: SET_SORT_ORDER,
    orderBy,
    sortOrder,
  });

  sortEmployeeList = (orderBy) => {
    const state = this.store.getState();
    this.setTableLoadingState(true);

    const newSortOrder = getNewSortOrder(orderBy)(state);
    this.setSortOrder(orderBy, newSortOrder);

    const urlParams = {
      businessId: getBusinessId(state),
    };

    const intent = SORT_AND_FILTER_EMPLOYEE_LIST;
    const onSuccess = ({ entries }) => {
      this.setTableLoadingState(false);
      this.store.dispatch({
        intent,
        entries,
        isSort: true,
      });
    };

    const onFailure = (error) => {
      this.setTableLoadingState(false);
      this.setAlert({
        message: error.message, type: 'danger',
      });
    };

    const filterOptions = getAppliedFilterOptions(state);
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

  loadEmployeeList = () => {
    const intent = LOAD_EMPLOYEE_LIST;

    const urlParams = {
      businessId: getBusinessId(this.store.getState()),
    };

    const onSuccess = (response) => {
      this.setLoadingState(false);
      this.store.dispatch({
        intent: LOAD_EMPLOYEE_LIST,
        ...response,
      });
    };

    const onFailure = () => {
      console.log('Failed to load employee list entries');
    };

    this.integration.read({
      intent, urlParams, onSuccess, onFailure,
    });
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

  filterEmployeeList = () => {
    const state = this.store.getState();
    this.setTableLoadingState(true);

    const intent = SORT_AND_FILTER_EMPLOYEE_LIST;

    const urlParams = {
      businessId: getBusinessId(state),
    };

    const onSuccess = ({ entries }) => {
      this.setTableLoadingState(false);
      this.store.dispatch({
        intent,
        entries,
        isSort: false,
      });
    };

    const onFailure = (error) => {
      this.setTableLoadingState(false);
      this.setAlert({
        message: error.message, type: 'danger',
      });
    };

    const filterOptions = getFilterOptions(state);
    const sortOrder = getSortOrder(state);
    const orderBy = getOrderBy(state);
    const params = {
      ...filterOptions,
      sortOrder,
      orderBy,
    };

    this.integration.read({
      intent,
      urlParams,
      params,
      onSuccess,
      onFailure,
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
        onApplyFilter={this.filterEmployeeList}
        onSort={this.sortEmployeeList}
        onDismissAlert={this.dismissAlert}
      />
    );

    const wrappedView = (
      <Provider store={this.store}>
        {View}
      </Provider>
    );
    this.setRootView(wrappedView);
  }

  dismissAlert = () => {
    const intent = SET_ALERT;
    this.store.dispatch({
      intent,
      alert: undefined,
    });
  }

  unsubscribeFromStore = () => {
    this.store.unsubscribeAll();
  }

  setTableLoadingState = (isTableLoading) => {
    const intent = SET_TABLE_LOADING_STATE;
    this.store.dispatch({
      intent,
      isTableLoading,
    });
  }

  setLoadingState = (isLoading) => {
    const intent = SET_LOADING_STATE;
    this.store.dispatch({
      intent,
      isLoading,
    });
  }

  setInitialState = (context) => {
    const intent = SET_INITIAL_STATE;

    this.store.dispatch({
      intent,
      context,
    });
  }

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
