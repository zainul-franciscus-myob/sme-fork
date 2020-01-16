/* eslint-disable react/no-this-in-sfc */
import { Provider } from 'react-redux';
import React from 'react';

import { getIsOpen, getIsSubmitting } from './accountModalSelectors';
import AccountModalView from './components/AccountModalView';
import Store from '../../../store/Store';
import accountModalReducer from './accountModalReducer';
import createAccountModalDispatcher from './createAccountModalDispatcher';
import createAccountModalIntegrator from './createAccountModalIntegrator';

export default class AccountModalModule {
  constructor({ integration }) {
    this.integration = integration;

    this.store = new Store(accountModalReducer);
    this.integrator = createAccountModalIntegrator(
      this.store,
      this.integration,
    );
    this.dispatcher = createAccountModalDispatcher(this.store);
  }

  isOpened = () => getIsOpen(this.store.getState());

  isSubmitting = () => getIsSubmitting(this.store.getState());

  close = () => {
    this.dispatcher.resetState();
  }

  save = () => {
    if (this.isSubmitting()) return;

    const onSuccess = (message) => {
      this.onSaveSuccess(message);
      this.dispatcher.setSubmittingState(false);
    };

    const onFailure = ({ message }) => {
      this.dispatcher.setSubmittingState(false);
      this.dispatcher.displayAlert(message);
    };

    this.dispatcher.setSubmittingState(true);
    this.integrator.createAccount(onSuccess, onFailure);
  };

  loadNewAccount = () => {
    const onSuccess = (payload) => {
      this.dispatcher.setLoadingState(false);
      this.dispatcher.loadNewAccount(payload);
    };

    const onFailure = ({ message }) => {
      this.close();
      this.onLoadFailure(message);
    };

    this.dispatcher.setLoadingState(true);
    this.integrator.loadNewAccount(onSuccess, onFailure);
  };

  render = () => (
    <Provider store={this.store}>
      <AccountModalView
        onSaveButtonClick={this.save}
        onAccountChange={this.dispatcher.updateAccountDetails}
        onAccountNumberChange={this.dispatcher.updateAccountNumber}
        onAccountNumberBlur={this.dispatcher.padAccountNumberValue}
        onBankDetailsChange={this.dispatcher.updateBankDetails}
        onAccountTypeChange={this.dispatcher.onAccountTypeChange}
        onDismissAlert={this.dispatcher.dismissAlert}
        onCloseModal={this.close}
      />
    </Provider>
  );

  run = ({ context, onSaveSuccess, onLoadFailure }) => {
    this.onSaveSuccess = onSaveSuccess;
    this.onLoadFailure = onLoadFailure;
    this.dispatcher.setInitialState(context);
    this.loadNewAccount();
  };
}
