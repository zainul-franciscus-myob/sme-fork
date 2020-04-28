import { Provider } from 'react-redux';
import React from 'react';

import { SUCCESSFULLY_UPDATED_JOB_KEEPER_PAYMENTS } from '../MessageTypes';
import { getFlipSortOrder, getStpDeclarationContext, getStpReportTabUrl } from './JobKeeperSelector';
import JobKeeperView from './components/JobKeeperView';
import LoadingState from '../../../../components/PageView/LoadingState';
import Store from '../../../../store/Store';
import StpDeclarationModalModule from '../../stpDeclarationModal/StpDeclarationModalModule';
import createJobKeeperDispatcher from './createJobKeeperDispatcher';
import createJobKeeperIntegrator from './createJobKeeperIntegrator';
import jobKeeperReducer from './JobKeeperReducer';

export default class JobKeeperModule {
  constructor({
    integration,
    context,
    setAlert,
    pushMessage,
  }) {
    this.store = new Store(jobKeeperReducer);
    this.integration = integration;
    this.dispatcher = createJobKeeperDispatcher(this.store);
    this.integrator = createJobKeeperIntegrator(this.store, integration);
    this.stpDeclarationModule = new StpDeclarationModalModule({ integration });
    this.setAlert = setAlert;
    this.pushMessage = pushMessage;

    this.dispatcher.setInitialState(context);
  }

  loadInitialEmployeesAndHeaderDetails = () => {
    this.dispatcher.setLoadingState(LoadingState.LOADING);

    const onSuccess = (response) => {
      this.dispatcher.setLoadingState(LoadingState.LOADING_SUCCESS);
      this.dispatcher.setInitialJobKeeper(response);
    };

    const onFailure = () => {
      this.dispatcher.setLoadingState(LoadingState.LOADING_FAIL);
    };

    this.integrator.loadInitialEmployeesAndHeaderDetails({ onSuccess, onFailure });
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


  redirectToReportTab = () => {
    const state = this.store.getState();
    window.location.href = getStpReportTabUrl(state);
  };

  updateJobKeeperPayments = () => {
    this.dispatcher.setLoadingState(LoadingState.LOADING);

    const onSuccess = ({ message }) => {
      this.dispatcher.setLoadingState(LoadingState.LOADING_SUCCESS);
      this.dispatcher.setNewEventId();
      this.pushMessage({ type: SUCCESSFULLY_UPDATED_JOB_KEEPER_PAYMENTS, content: message });
      this.redirectToReportTab();
    };

    const onFailure = ({ message }) => {
      this.dispatcher.setLoadingState(LoadingState.LOADING_SUCCESS);
      this.setAlert({ type: 'danger', message });
    };

    this.integrator.updateJobKeeperPayments({ onSuccess, onFailure });
  };

  openStpDeclarationModal = () => {
    const context = getStpDeclarationContext(this.store.getState());
    this.stpDeclarationModule.run(context, this.updateJobKeeperPayments);
  }

  updateEmployeeRow = ({ key, value, rowId }) => {
    this.dispatcher.updateEmployeeRow({ key, value, rowId });
  }

  run = () => {
    this.loadInitialEmployeesAndHeaderDetails();
  };

  getView() {
    const declarationModal = this.stpDeclarationModule.getView();

    return (
      <Provider store={this.store}>
        {declarationModal}
        <JobKeeperView
          onNotifyAtoClick={this.openStpDeclarationModal}
          onPayrollYearChange={this.filterEmployeesByYear}
          onSort={this.sortEmployees}
          onEmployeeChange={this.updateEmployeeRow}
        />
      </Provider>);
  }
}
