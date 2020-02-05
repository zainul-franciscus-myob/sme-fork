import { Provider } from 'react-redux';
import React from 'react';

import FinalisationView from './components/FinalisationView';
import LoadingState from '../../../../components/PageView/LoadingState';
import Store from '../../../../store/Store';
import createFinalisationDispatcher from './createFinalisationDispatcher';
import createFinalisationIntegrator from './createFinalisationIntegrator';
import finalisationReducer from './FinalisationReducer';

export default class FinalisationModule {
  constructor({
    integration,
    context,
  }) {
    this.integration = integration;
    this.store = new Store(finalisationReducer);
    this.dispatcher = createFinalisationDispatcher(this.store);
    this.integrator = createFinalisationIntegrator(this.store, integration);
    this.dispatcher.setInitialState(context);
  }

  loadEmployeesAndHeaderDetailsForYear = (year) => {
    this.dispatcher.setLoadingState(LoadingState.LOADING);

    const onSuccess = (response) => {
      this.dispatcher.setLoadingState(LoadingState.LOADING_SUCCESS);
      this.dispatcher.loadHeadersAndEmployeesForYear(response);
    };

    const onFailure = () => {
      this.dispatcher.setLoadingState(LoadingState.LOADING_FAIL);
    };

    this.integrator.loadHeadersAndEmployeesForYear({
      year,
      onSuccess,
      onFailure,
    });
  }

  loadInitialEmployeesAndHeaderDetails = () => {
    this.dispatcher.setLoadingState(LoadingState.LOADING);

    const onSuccess = (response) => {
      this.dispatcher.setLoadingState(LoadingState.LOADING_SUCCESS);
      this.dispatcher.loadInitialInformation(response);
    };

    const onFailure = () => {
      this.dispatcher.setLoadingState(LoadingState.LOADING_FAIL);
    };

    this.integrator.loadInitialEmployeesAndHeaderDetails({ onSuccess, onFailure });
  };

  setIsRFBAEnabled = ({ value }) => {
    this.dispatcher.setIsRFBAEnabled(value);
  };

  onPayrollYearChange = (payrollYear) => {
    this.dispatcher.setSelectedPayrollYear(payrollYear);
    this.loadEmployeesAndHeaderDetailsForYear(payrollYear);
  }

  selectAllEmployees = (isSelected) => {
    this.dispatcher.selectAllEmployees(isSelected);
  }

  selectEmployeesItem = (item, isSelected) => {
    this.dispatcher.selectEmployeesItem(item, isSelected);
  }

  updateEmployeeRow = ({ key, value }) => {
    this.dispatcher.updateEmployeeRow({ key, value });
  }

  run = () => {
    this.loadInitialEmployeesAndHeaderDetails();
  };

  getView() {
    return (
      <Provider store={this.store}>
        <FinalisationView
          onIsRFBAEnabledClick={this.setIsRFBAEnabled}
          onPayrollYearChange={this.onPayrollYearChange}
          selectAllEmployees={this.selectAllEmployees}
          selectEmployeesItem={this.selectEmployeesItem}
          onEmployeeChange={this.updateEmployeeRow}
        />
      </Provider>
    );
  }
}
