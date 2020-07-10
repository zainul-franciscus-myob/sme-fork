import { Provider } from 'react-redux';
import React from 'react';

import {
  getFlipSortOrder,
  getSelectedPayrollYear,
  getStpDeclarationContext,
} from './TerminationSelector';
import LoadingState from '../../../../components/PageView/LoadingState';
import Store from '../../../../store/Store';
import StpDeclarationModalModule from '../../stpDeclarationModal/StpDeclarationModalModule';
import TerminationView from './components/TerminationView';
import createTerminationDispatcher from './createTerminationDispatcher';
import createTerminationIntegrator from './createTerminationIntegrator';
import terminationReducer from './TerminationReducer';

export default class TerminationModule {
  constructor({ integration, context, setAlert }) {
    this.store = new Store(terminationReducer);
    this.setAlert = setAlert;
    this.integration = integration;
    this.dispatcher = createTerminationDispatcher(this.store);
    this.integrator = createTerminationIntegrator(this.store, integration);
    this.stpDeclarationModule = new StpDeclarationModalModule({ integration });

    this.dispatcher.setInitialState(context);
  }

  loadEmployeesForThisYear = () => {
    this.dispatcher.setLoadingState(LoadingState.LOADING);

    const onSuccess = (response) => {
      this.dispatcher.setLoadingState(LoadingState.LOADING_SUCCESS);
      this.dispatcher.setEmployees(response);
    };

    const onFailure = () => {
      this.dispatcher.setLoadingState(LoadingState.LOADING_FAIL);
    };

    this.integrator.loadEmployeesForThisYear({ onSuccess, onFailure });
  };

  filterEmployeesByYear = (payrollYear) => {
    this.dispatcher.setSelectedPayrollYear(payrollYear);
    this.dispatcher.clearEmployees();
    this.dispatcher.setTableLoadingState(true);

    const onSuccess = (response) => {
      this.dispatcher.setTableLoadingState(false);
      this.dispatcher.setFilteredEmployees(response);
    };

    const onFailure = ({ message }) => {
      this.dispatcher.setTableLoadingState(false);
      this.dispatcher.clearEmployees();
      this.setAlert({ type: 'danger', message });
    };

    this.integrator.filterEmployees({ onSuccess, onFailure });
  };

  sortEmployees = (orderBy) => {
    const state = this.store.getState();
    const newSortOrder = getFlipSortOrder(state);

    this.dispatcher.setTableLoadingState(true);

    const onSuccess = (employees) => {
      this.dispatcher.setTableLoadingState(false);
      this.dispatcher.setSort({
        orderBy,
        sortOrder: newSortOrder,
      });
      this.dispatcher.setSortedEmployees(employees);
    };

    const onFailure = () => {
      this.dispatcher.setTableLoadingState(false);
    };

    this.integrator.sortEmployees({
      onSuccess,
      onFailure,
      orderBy,
      sortOrder: newSortOrder,
    });
  };

  terminateEmployees = () => {
    this.dispatcher.setLoadingState(LoadingState.LOADING);

    const onSuccess = ({ message }) => {
      this.dispatcher.setLoadingState(LoadingState.LOADING_SUCCESS);
      this.setAlert({ type: 'success', message });
      this.dispatcher.setNewEventId();
      this.filterEmployeesByYear(getSelectedPayrollYear(this.store.getState()));
    };

    const onFailure = ({ message }) => {
      this.dispatcher.setLoadingState(LoadingState.LOADING_SUCCESS);
      this.setAlert({ type: 'danger', message });
    };

    this.integrator.terminateEmployee({ onSuccess, onFailure });
  };

  onTerminateEmployees = () => {
    const context = getStpDeclarationContext(this.store.getState());
    this.stpDeclarationModule.run(context, this.terminateEmployees);
  };

  unterminateEmployee = (employee) => () => {
    this.dispatcher.setLoadingState(LoadingState.LOADING);

    const onSuccess = ({ message }) => {
      this.dispatcher.setLoadingState(LoadingState.LOADING_SUCCESS);
      this.setAlert({ type: 'success', message });
      this.dispatcher.setNewEventId();
      this.filterEmployeesByYear(getSelectedPayrollYear(this.store.getState()));
    };

    const onFailure = ({ message }) => {
      this.dispatcher.setLoadingState(LoadingState.LOADING_SUCCESS);
      this.setAlert({ type: 'danger', message });
    };

    this.integrator.unterminateEmployee({ employee, onSuccess, onFailure });
  };

  onUnterminateEmployee = (employee) => () => {
    const context = getStpDeclarationContext(this.store.getState());
    this.stpDeclarationModule.run(context, this.unterminateEmployee(employee));
  };

  onTerminationDateChange = (employee) => ({ value }) => {
    this.dispatcher.setTerminationDate(employee, value);
  };

  run = () => {
    this.loadEmployeesForThisYear();
  };

  getView() {
    const declarationModal = this.stpDeclarationModule.getView();

    return (
      <Provider store={this.store}>
        {declarationModal}
        <TerminationView
          onPayrollYearChange={this.filterEmployeesByYear}
          onTerminationDateChange={this.onTerminationDateChange}
          onTerminateEmployees={this.onTerminateEmployees}
          onUnterminateEmployee={this.onUnterminateEmployee}
          onSort={this.sortEmployees}
        />
      </Provider>
    );
  }
}
