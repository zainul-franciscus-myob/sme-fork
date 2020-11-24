import { Provider } from 'react-redux';
import React from 'react';

import {
  getIsOpen,
  getSelectedEntry,
} from './RecurringTransactionListModalSelectors';
import RecurringTransactionListModalView from './components/RecurringTransactionListModalView';
import Store from '../../../store/Store';
import createRecurringTransactionListModalDispatcher from './createRecurringTransactionListModalDispatcher';
import createRecurringTransactionListModalIntegrator from './createRecurringTransactionListModalIntegrator';
import recurringTransactionListModalReducer from './RecurringTransactionListModalReducer';

export default class RecurringTransactionListModalModule {
  constructor({ integration }) {
    this.integration = integration;
    this.onLoadFailure = () => {};
    this.onComplete = () => {};

    this.store = new Store(recurringTransactionListModalReducer);
    this.integrator = createRecurringTransactionListModalIntegrator(
      this.store,
      this.integration
    );
    this.dispatcher = createRecurringTransactionListModalDispatcher(this.store);
  }

  isOpened = () => getIsOpen(this.store.getState());

  loadRecurringTransactionList = () => {
    const onSuccess = (response) => {
      this.dispatcher.setLoadingState(false);
      this.dispatcher.loadRecurringTransactionList(response);
    };

    const onFailure = ({ message }) => {
      this.dispatcher.setLoadingState(false);
      this.onLoadFailure({ message, type: 'danger' });
    };

    this.dispatcher.setLoadingState(true);
    this.integrator.loadRecurringTransactionList({ onSuccess, onFailure });
  };

  sortRecurringTransactionList = () => {
    const onSuccess = (response) => {
      this.dispatcher.setTableLoadingState(false);
      this.dispatcher.sortRecurringTransactionList(response);
    };

    const onFailure = ({ message }) => {
      this.dispatcher.setTableLoadingState(false);
      this.dispatcher.setAlert({ message, type: 'danger' });
    };

    this.dispatcher.setTableLoadingState(true);
    this.integrator.sortRecurringTransactionList({
      onSuccess,
      onFailure,
    });
  };

  updateSort = (orderBy) => {
    this.dispatcher.setSortOrder(orderBy);
    this.sortRecurringTransactionList();
  };

  complete = () => {
    const state = this.store.getState();
    const selected = getSelectedEntry(state);

    this.onComplete(selected);
  };

  close = () => this.dispatcher.resetState();

  resetState = () => this.dispatcher.resetState();

  run = ({ context, onLoadFailure = () => {}, onComplete = () => {} }) => {
    this.dispatcher.setInitialState(context);
    this.onLoadFailure = onLoadFailure;
    this.onComplete = onComplete;
    this.loadRecurringTransactionList();
  };

  render() {
    return (
      <Provider store={this.store}>
        <RecurringTransactionListModalView
          onDismissAlert={this.dispatcher.dismissAlert}
          onOkButtonClick={this.complete}
          onCancelButtonClick={this.dispatcher.resetState}
          onClose={this.resetState}
          onSelect={this.dispatcher.setRecurringTransactionId}
          onSort={this.updateSort}
        />
      </Provider>
    );
  }
}
