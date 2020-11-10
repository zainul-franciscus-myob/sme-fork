import { Provider } from 'react-redux';
import React from 'react';

import {
  SUCCESSFULLY_DELETED_NZ_EMPLOYEE,
  SUCCESSFULLY_SAVED_NZ_EMPLOYEE,
} from '../../../../common/types/MessageTypes';
import { getNewSortOrder } from './EmployeeListNzSelector';
import EmployeeListNzView from './components/EmployeeListNzView';
import Store from '../../../../store/Store';
import debounce from '../../../../common/debounce/debounce';
import employeeListNzDispatcher from './employeeListNzDispatcher';
import employeeListNzIntegrator from './employeeListNzIntegrator';
import employeeListNzReducer from './employeeListNzReducer';

export default class EmployeeListNzModule {
  constructor({ setRootView, integration, popMessages }) {
    this.setRootView = setRootView;
    this.integration = integration;
    this.popMessages = popMessages;

    this.store = new Store(employeeListNzReducer);
    this.dispatcher = employeeListNzDispatcher({ store: this.store });
    this.integrator = employeeListNzIntegrator({
      store: this.store,
      integration,
    });
  }

  unsubscribeFromStore = () => {
    this.store.unsubscribeAll();
  };

  loadEmployeeList = () => {
    const onSuccess = (response) => {
      this.dispatcher.loadEmployeeList(response);
    };

    const onFailure = () => {
      this.dispatcher.loadEmployeeListFailed();
    };

    this.integrator.loadEmployeeList({ onSuccess, onFailure });
  };

  loadEmployeeListNextPage = () => {
    const onSuccess = (response) => {
      this.dispatcher.loadEmployeeListNextPage(response);
    };

    const onFailure = () => {
      this.dispatcher.loadEmployeeListFailed();
    };

    this.integrator.loadEmployeeListNextPage({ onSuccess, onFailure });
  };

  resetState = () => this.dispatcher.resetState();

  render() {
    const view = (
      <EmployeeListNzView
        onDismissAlert={this.dismissAlert}
        onEmployeeCreateButtonClick={this.redirectToCreateEmployee}
        onLoadMoreButtonClick={this.loadEmployeeListNextPage}
        onUpdateFilterBarOptions={this.updateFilterBarOptions}
        onResetFilterBarOptions={this.resetFilterBarOptions}
        onSort={this.sortEmployeeList}
      />
    );
    const wrappedView = <Provider store={this.store}>{view}</Provider>;
    this.setRootView(wrappedView);
  }

  run(context) {
    this.dispatcher.setInitialState(context);
    this.render();
    this.readMessages();
    this.loadEmployeeList();
  }

  dismissAlert = () => {
    this.dispatcher.dismissAlert();
  };

  setAlert = ({ type, message }) => {
    this.dispatcher.setAlert({ type, message });
  };

  readMessages = () => {
    const [inboxMessage] = this.popMessages([
      SUCCESSFULLY_DELETED_NZ_EMPLOYEE,
      SUCCESSFULLY_SAVED_NZ_EMPLOYEE,
    ]);
    if (inboxMessage) {
      this.setAlert({
        type: 'success',
        message: inboxMessage.content,
      });
    }
  };

  redirectToCreateEmployee = () => {
    const state = this.store.getState();
    const { businessId, region } = state;
    window.location.href = `/#/${region}/${businessId}/employee/new`;
  };

  sortAndFilterEmployeeList = () => {
    this.dispatcher.setTableLoading(true);

    const onSuccess = (response) => {
      this.dispatcher.setTableLoading(false);
      this.dispatcher.sortAndFilterEmployeeList(response);
    };

    const onFailure = (error) => {
      this.dispatcher.setTableLoading(false);
      this.setAlert({ message: error.message, type: 'danger' });
    };

    this.integrator.sortAndFilterEmployeeList({
      onSuccess,
      onFailure,
    });
  };

  updateFilterBarOptions = ({ key, value }) => {
    this.dispatcher.updateFilterBarOptions({ key, value });

    if (key === 'keywords') {
      debounce(this.sortAndFilterEmployeeList)();
    } else {
      this.sortAndFilterEmployeeList();
    }
  };

  resetFilterBarOptions = () => {
    this.dispatcher.resetFilterBarOptions();
    this.sortAndFilterEmployeeList();
  };

  sortEmployeeList = (orderBy) => {
    const state = this.store.getState();
    const newSortOrder = getNewSortOrder(orderBy)(state);
    this.dispatcher.setSortOrder(orderBy, newSortOrder);

    this.sortAndFilterEmployeeList();
  };
}
