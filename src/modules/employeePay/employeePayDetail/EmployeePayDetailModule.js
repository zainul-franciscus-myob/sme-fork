import { Provider } from 'react-redux';
import React from 'react';

import EmployeePayDetailView from './components/EmployeePayDetailView';
import LoadingState from '../../../components/PageView/LoadingState';
import Store from '../../../store/Store';
import createEmployeePayDetailDispatchers from './createEmployeePayDetailDispatchers';
import createEmployeePayDetailIntegrator from './createEmployeePayDetailIntegrator';
import employeePayDetailReducer from './employeePayDetailReducer';

export default class EmployeePayDetailModule {
  constructor({
    integration, setRootView,
  }) {
    this.setRootView = setRootView;
    this.store = new Store(employeePayDetailReducer);
    this.dispatcher = createEmployeePayDetailDispatchers(this.store);
    this.integrator = createEmployeePayDetailIntegrator(this.store, integration);
  }

  loadEmployeePayDetail = () => {
    this.dispatcher.setLoadingState(LoadingState.LOADING);

    const onSuccess = (response) => {
      this.dispatcher.setLoadingState(LoadingState.LOADING_SUCCESS);
      this.dispatcher.setEmployeePayDetails(response);
    };

    const onFailure = () => {
      this.dispatcher.setLoadingState(LoadingState.LOADING_FAIL);
    };

    this.integrator.loadEmployeePayDetail({ onSuccess, onFailure });
  };

  goBack = () => {
    window.history.back();
  };

  setInitialState = (context) => {
    this.dispatcher.setInitialState(context);
  };

  resetState = () => {
    this.dispatcher.resetState();
  };

  unsubscribeFromStore = () => {
    this.store.unsubscribeAll();
  };

  run(context) {
    this.setInitialState(context);
    this.render();
    this.loadEmployeePayDetail();
  }

  render = () => {
    const wrappedView = (
      <Provider store={this.store}>
        <EmployeePayDetailView
          onGoBackClick={this.goBack}
          onDeleteButtonClick={() => {}}
        />
      </Provider>
    );

    this.setRootView(wrappedView);
  };
}
