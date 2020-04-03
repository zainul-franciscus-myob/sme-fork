import { Provider } from 'react-redux';
import React from 'react';

import EmployeeListNzView from './components/EmployeeListNzView';
import LoadingState from '../../../../components/PageView/LoadingState';
import Store from '../../../../store/Store';
import createEmployeeListNzDispatcher from './createEmployeeListNzDispatcher';
import createEmployeeListNzIntegrator from './createEmployeeListNzIntegrator';
import employeeListNzReducer from './employeeListNzReducer';

export default class EmployeeListNzModule {
  constructor({ setRootView, integration }) {
    this.setRootView = setRootView;
    this.integration = integration;
    this.store = new Store(employeeListNzReducer);
    this.dispatcher = createEmployeeListNzDispatcher({ store: this.store });
    this.integrator = createEmployeeListNzIntegrator({ store: this.store, integration });
  }

  render = () => {
    const view = <EmployeeListNzView />;
    const wrappedView = <Provider store={this.store}>{view}</Provider>;
    this.setRootView(wrappedView);
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

   run(context) {
     this.dispatcher.setInitialState(context);
     this.render();
     this.loadEmployeeList();
   }
}
