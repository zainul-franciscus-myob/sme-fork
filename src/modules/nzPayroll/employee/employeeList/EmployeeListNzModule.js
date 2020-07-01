import { Provider } from 'react-redux';
import React from 'react';

import {
  SUCCESSFULLY_DELETED_NZ_EMPLOYEE,
  SUCCESSFULLY_SAVED_NZ_EMPLOYEE,
} from '../../../../common/types/MessageTypes';
import EmployeeListNzView from './components/EmployeeListNzView';
import LoadingState from '../../../../components/PageView/LoadingState';
import Store from '../../../../store/Store';
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
    this.integrator = employeeListNzIntegrator({ store: this.store, integration });
  }

  unsubscribeFromStore = () => {
    this.store.unsubscribeAll();
  }

  loadEmployeeList = () => {
    const onSuccess = (response) => {
      this.dispatcher.loadEmployeeList(response);
    };

    const onFailure = () => {
      this.dispatcher.setLoadingState(LoadingState.LOADING_FAIL);
    };

    this.integrator.loadEmployeeList({ onSuccess, onFailure });
  }

  resetState = () => this.dispatcher.resetState();

  render() {
    const view = <EmployeeListNzView
      onDismissAlert={this.dismissAlert}
      onEmployeeCreateButtonClick={this.redirectToCreateEmployee}
    />;
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
  }

  readMessages = () => {
    const [inboxMessage] = this.popMessages(
      [
        SUCCESSFULLY_DELETED_NZ_EMPLOYEE,
        SUCCESSFULLY_SAVED_NZ_EMPLOYEE,
      ],
    );
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
  }
}
