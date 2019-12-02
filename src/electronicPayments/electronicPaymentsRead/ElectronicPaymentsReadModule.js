import { Provider } from 'react-redux';
import React from 'react';

import {
  LOAD_ELECTRONIC_PAYMENT_DETAILS,
} from './ElectronicPaymentsReadIntents';
import { RESET_STATE, SET_INITIAL_STATE } from '../../SystemIntents';
import {
  SET_LOADING_STATE,
  SET_SORT_ORDER,
  SET_TABLE_LOADING_STATE,
  SORT_AND_FILTER_ELECTRONIC_PAYMENTS,
} from '../ElectronicPaymentsIntents';
import {
  getBusinessId,
  getElectronicPaymentId,
  getOrderBy,
  getSortOrder,
} from '../ElectronicPaymentsSelector';
import ElectronicPaymentsReadView from './components/ElectronicPaymentsReadView';
import Store from '../../store/Store';
import electronicPaymentReadReducer from './electronicPaymentsReadReducer';

export default class ElectronicPaymentsReadModule {
  constructor({
    setRootView,
    integration,
  }) {
    this.setRootView = setRootView;
    this.store = new Store(electronicPaymentReadReducer);
    this.integration = integration;
  }

  run(context) {
    this.setInitialState(context);
    this.render();
    this.loadElectronicPaymentDetails();
  }

  setIsLoading(isLoading) {
    this.store.dispatch({
      intent: SET_LOADING_STATE,
      isLoading,
    });
  }

  setIsTableLoading(isTableLoading) {
    this.store.dispatch({
      intent: SET_TABLE_LOADING_STATE,
      isTableLoading,
    });
  }

  fetchElectronicPayments = () => {
    this.setIsTableLoading(true);
    const state = this.store.getState();
    const intent = SORT_AND_FILTER_ELECTRONIC_PAYMENTS;
    const urlParams = {
      businessId: getBusinessId(state),
    };
    const onSuccess = ({ entries }) => {
      this.store.dispatch({
        intent,
        entries,
      });
      this.setIsTableLoading(false);
    };
    const onFailure = ({ message }) => this.setAlert({ message, type: 'danger' });

    this.integration.read({
      intent,
      urlParams,
      params: {
        sortOrder: getSortOrder(state),
        orderBy: getOrderBy(state),
      },
      onSuccess,
      onFailure,
    });
  }

  onGoBackClick = () => {
    window.history.back();
  }

  loadElectronicPaymentDetails = () => {
    this.setIsLoading(true);
    const state = this.store.getState();
    const urlParams = {
      businessId: getBusinessId(state),
      electronicPaymentId: getElectronicPaymentId(state),
    };
    const onSuccess = (response) => {
      this.store.dispatch({
        intent: LOAD_ELECTRONIC_PAYMENT_DETAILS,
        response,
      });
      this.setIsLoading(false);
      this.setIsTableLoading(false);
    };
    const onFailure = () => { };
    this.integration.read({
      urlParams,
      onSuccess,
      onFailure,
      intent: LOAD_ELECTRONIC_PAYMENT_DETAILS,
    });
  }

    flipSortOrder = ({ sortOrder }) => (sortOrder === 'desc' ? 'asc' : 'desc');

    setSortOrder = (orderBy, newSortOrder) => {
      this.store.dispatch({
        intent: SET_SORT_ORDER,
        sortOrder: newSortOrder,
        orderBy,
      });
    }

  sortElectronicPayments = (orderBy) => {
    const state = this.store.getState();
    const newSortOrder = orderBy === getOrderBy(state) ? this.flipSortOrder(state) : 'asc';
    this.setSortOrder(orderBy, newSortOrder);
    this.fetchElectronicPayments();
  }

  setInitialState = (context) => {
    this.store.dispatch({
      intent: SET_INITIAL_STATE,
      context,
    });
  };

  render = () => {
    const view = (
      <ElectronicPaymentsReadView
        onSort={this.sortElectronicPayments}
        onGoBackClick={this.onGoBackClick}
      />
    );

    const wrappedView = (
      <Provider store={this.store}>
        {view}
      </Provider>
    );
    this.setRootView(wrappedView);
  }

  unsubscribeFromStore = () => {
    this.store.unsubscribeAll();
  }

  resetState = () => {
    this.store.dispatch({
      intent: RESET_STATE,
    });
  }
}
