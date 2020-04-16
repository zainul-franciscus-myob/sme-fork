import { Provider } from 'react-redux';
import React from 'react';

import ContactDetailsNzTabModule from './contactDetails/ContactDetailsNzTabModule';
import EmployeeDetailNzView from './components/EmployeeDetailNzView';
import LoadingState from '../../../../components/PageView/LoadingState';
import Store from '../../../../store/Store';
import createEmployeeDetailNzDispatcher from './createEmployeeDetailNzDispatcher';
import createEmployeeDetailNzIntegrator from './createEmployeeDetailNzIntegrator';
import employeeDetailNzReducer from './employeeDetailNzReducer';

export default class EmployeeDetailNzModule {
  constructor({ setRootView, integration }) {
    this.setRootView = setRootView;
    this.integration = integration;
    this.store = new Store(employeeDetailNzReducer);
    this.dispatcher = createEmployeeDetailNzDispatcher({ store: this.store });
    this.integrator = createEmployeeDetailNzIntegrator({ store: this.store, integration });
    this.subModule = new ContactDetailsNzTabModule();
  }

  unsubscribeFromStore = () => {
    this.store.unsubscribeAll();
  }

  setInitialState = context => this.dispatcher.setInitialState(context);

  resetState = () => this.dispatcher.resetState();

  loadEmployeeDetails = () => {
    const onSuccess = (response) => {
      this.dispatcher.loadEmployeeDetails(response);
    };

    const onFailure = () => {
      this.dispatcher.setLoadingState(LoadingState.LOADING_FAIL);
    };

    this.integrator.loadEmployeeDetails({ onSuccess, onFailure });
  };

  render() {
    const employeeDetailNzView = <EmployeeDetailNzView tabView={this.subModule} />;
    const wrappedView = <Provider store={this.store}>{employeeDetailNzView}</Provider>;
    this.setRootView(wrappedView);
  }

  run(context) {
    this.setInitialState(context);
    this.render();
    this.loadEmployeeDetails();
  }
}
