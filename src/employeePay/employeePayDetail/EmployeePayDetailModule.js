import { Provider } from 'react-redux';
import React from 'react';

import { RESET_STATE, SET_INITIAL_STATE } from '../../SystemIntents';
import EmployeePayDetailView from './components/EmployeePayDetailView';
import Store from '../../store/Store';
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
    this.dispatcher.setLoadingState(true);

    const onSuccess = (response) => {
      this.dispatcher.setLoadingState(false);
      this.dispatcher.setEmployeePayDetails(response);
    };

    const onFailure = ({ message }) => {
      console.log(`Failed to load Employee Pay detail ${message}`);
    };

    this.integrator.loadEmployeePayDetail({ onSuccess, onFailure });
  };

  goBack = () => {
    window.history.back();
  };

  setInitialState = (context) => {
    this.store.dispatch({
      intent: SET_INITIAL_STATE,
      context,
    });
  };

  resetState = () => {
    this.store.dispatch({
      intent: RESET_STATE,
    });
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
