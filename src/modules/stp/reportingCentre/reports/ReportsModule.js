import { Provider } from 'react-redux';
import React from 'react';

import { getIsSelectedPayEvent } from './ReportsSelector';
import LoadingState from '../../../../components/PageView/LoadingState';
import ReportsView from './components/ReportsView';
import Store from '../../../../store/Store';
import createReportsDispatcher from './createReportsDispatcher';
import createReportsIntegrator from './createReportsIntegrator';
import reportsReducer from './ReportsReducer';

export default class ReportsModule {
  constructor({
    integration,
    context,
    setAlert,
  }) {
    this.store = new Store(reportsReducer);
    this.dispatcher = createReportsDispatcher(this.store);
    this.integrator = createReportsIntegrator(this.store, integration);
    this.setAlert = setAlert;

    this.dispatcher.setInitialState(context);
  }

  loadPayEvents = () => {
    this.dispatcher.setLoadingState(LoadingState.LOADING);

    const onSuccess = (response) => {
      this.dispatcher.setLoadingState(LoadingState.LOADING_SUCCESS);
      this.dispatcher.setPayEvents(response);
    };

    const onFailure = () => {
      this.dispatcher.setLoadingState(LoadingState.LOADING_FAIL);
    };

    this.integrator.loadPayEvents({ onSuccess, onFailure });
  };

  filterPayEvents = (payrollYear) => {
    this.dispatcher.setSelectedPayrollYear(payrollYear);
    this.dispatcher.setTableLoadingState(true);

    const onSuccess = (response) => {
      this.dispatcher.setTableLoadingState(false);
      this.dispatcher.setFilteredPayEvents(response);
    };

    const onFailure = ({ message }) => {
      this.dispatcher.setTableLoadingState(false);
      this.dispatcher.clearPayEvents();
      this.setAlert({ type: 'danger', message });
    };

    this.integrator.filterPayEvents({ onSuccess, onFailure });
  };

  loadPayEventDetails = () => {
    this.dispatcher.setDetailsLoadingState(LoadingState.LOADING);

    const onSuccess = (response) => {
      if (getIsSelectedPayEvent(this.store.getState(), response.id)) {
        this.dispatcher.setPayEventDetails(response);
        this.dispatcher.setDetailsLoadingState(LoadingState.LOADING_SUCCESS);
      }
    };

    const onFailure = () => {
      this.dispatcher.setDetailsLoadingState(LoadingState.LOADING_FAIL);
    };

    this.integrator.loadPayEventDetails({ onSuccess, onFailure });
  };

  setSelectedPayEvent = (payEventId) => {
    this.dispatcher.setSelectedPayEvent(payEventId);
    this.loadPayEventDetails();
  };

  run = () => {
    this.loadPayEvents();
  };

  getView() {
    return (
      <Provider store={this.store}>
        <ReportsView
          onPayrollYearChange={this.filterPayEvents}
          onRowSelect={this.setSelectedPayEvent}
          onClearSelected={this.dispatcher.clearSelectedPayEvent}
        />
      </Provider>
    );
  }
}
