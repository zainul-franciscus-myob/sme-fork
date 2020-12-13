import { Provider } from 'react-redux';
import React from 'react';

import { getIsOpen } from './RecurringTransactionModalSelectors';
import RecurringTransactionModalView from './components/RecurringTransactionModalView';
import Store from '../../../store/Store';
import createRecurringTransactionModalDispatcher from './createRecurringTransactionModalDispatcher';
import createRecurringTransactionModalIntegrator from './createRecurringTransactionModalIntegrator';
import recurringTransactionModalReducer from './RecurringTransactionModalReducer';

export default class RecurringTransactionModalModule {
  constructor({ integration }) {
    this.integration = integration;
    this.onLoadFailure = () => {};
    this.onSaveSuccess = () => {};

    this.store = new Store(recurringTransactionModalReducer);
    this.integrator = createRecurringTransactionModalIntegrator(
      this.store,
      this.integration
    );
    this.dispatcher = createRecurringTransactionModalDispatcher(this.store);
  }

  isOpened = () => getIsOpen(this.store.getState());

  loadNewRecurringTransaction = () => {
    const onSuccess = (response) => {
      this.dispatcher.setLoadingState(false);
      this.dispatcher.loadNewRecurringTransaction(response);
    };

    const onFailure = ({ message }) => {
      this.dispatcher.setLoadingState(false);
      this.onLoadFailure({ message, type: 'danger' });
    };

    this.dispatcher.setLoadingState(true);
    this.integrator.loadNewRecurringTransaction({ onSuccess, onFailure });
  };

  save = () => {
    const onSuccess = (response) => {
      this.dispatcher.setLoadingState(false);
      this.dispatcher.setSubmittingState(false);
      this.onSaveSuccess(response);
    };

    const onFailure = ({ message }) => {
      this.dispatcher.setLoadingState(false);
      this.dispatcher.setSubmittingState(false);
      this.dispatcher.setAlert({ type: 'danger', message });
    };

    this.dispatcher.setLoadingState(true);
    this.dispatcher.setSubmittingState(true);
    this.integrator.createRecurringTransaction({ onSuccess, onFailure });
  };

  close = () => this.dispatcher.resetState();

  resetState = () => this.dispatcher.resetState();

  run = ({ context, onLoadFailure = () => {}, onSaveSuccess = () => {} }) => {
    this.dispatcher.setInitialState(context);
    this.onLoadFailure = onLoadFailure;
    this.onSaveSuccess = onSaveSuccess;

    this.loadNewRecurringTransaction();
  };

  render() {
    return (
      <Provider store={this.store}>
        <RecurringTransactionModalView
          onDismissAlert={this.dispatcher.dismissAlert}
          onOkButtonClick={this.save}
          onCancelButtonClick={this.dispatcher.resetState}
          onClose={this.resetState}
          onUpdateScheduleOptions={this.dispatcher.updateScheduleOptions}
        />
      </Provider>
    );
  }
}
