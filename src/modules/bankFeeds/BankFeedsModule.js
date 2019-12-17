import { Provider } from 'react-redux';
import React from 'react';

import BankFeedsView from './components/BankFeedsView';
import Store from '../../store/Store';
import bankFeedsReducer from './bankFeedsReducer';
import createBankFeedsDispatcher from './createBankFeedsDispatcher';
import createBankFeedsIntegrator from './createBankFeedsIntegrator';

class BankFeedsModule {
  constructor({
    integration, setRootView,
  }) {
    this.setRootView = setRootView;
    this.integration = integration;
    this.store = new Store(bankFeedsReducer);
    this.integrator = createBankFeedsIntegrator(this.store, this.integration);
    this.dispatcher = createBankFeedsDispatcher(this.store);
  }

  loadBankFeeds = () => {
    const onSuccess = (response) => {
      this.dispatcher.setIsLoading(false);
      this.dispatcher.loadBankFeeds(response);
    };
    const onFailure = () => {
      console.log('Failed to load linked accounts');
    };
    this.integrator.loadBankFeeds({ onSuccess, onFailure });
  }

  saveBankFeeds = () => {
    this.dispatcher.setIsSubmitting(true);

    const onSuccess = (response) => {
      this.dispatcher.setIsSubmitting(false);
      this.displaySuccessMessage(response.message);
    };

    const onFailure = (response) => {
      this.dispatcher.setIsSubmitting(false);
      this.displayFailureAlert(response.message);
    };

    this.integrator.saveBankFeeds({ onSuccess, onFailure });
  };

  openDeleteModalAndSetAccountToBeDeleted = (bankFeedAccountType, bankFeedId) => {
    this.dispatcher.setBankFeedAccountToBeDeleted({ bankFeedAccountType, bankFeedId });
    this.dispatcher.openDeleteModal();
  }

  deleteBankFeed = () => {
    this.dispatcher.closeModal();
    this.dispatcher.setIsSubmitting(true);

    const onSuccess = (response) => {
      this.dispatcher.setIsSubmitting(false);
      this.dispatcher.deleteBankFeed();
      this.dispatcher.resetBankFeedAccountToBeDeleted();
      this.displaySuccessMessage(response.message);
    };

    const onFailure = (response) => {
      this.dispatcher.setIsSubmitting(false);
      this.displayFailureAlert(response.message);
    };

    this.integrator.deleteBankFeed({ onSuccess, onFailure });
  }

  closeDeleteModal = () => {
    this.dispatcher.resetBankFeedAccountToBeDeleted();
    this.dispatcher.closeModal();
  }

  displaySuccessMessage = successMessage => this.dispatcher.setAlert({
    message: successMessage,
    type: 'success',
  });

  displayFailureAlert = errorMessage => this.dispatcher.setAlert({
    message: errorMessage,
    type: 'danger',
  });

  resetState = () => this.dispatcher.resetState();

  run(context) {
    this.dispatcher.setInitialState(context);
    this.render();
    this.dispatcher.setIsLoading(true);
    this.loadBankFeeds();
  }

  render = () => {
    const view = (
      <Provider store={this.store}>
        <BankFeedsView
          onSaveButtonClick={this.saveBankFeeds}
          onDismissAlert={this.dispatcher.dismissAlert}
          onCloseDeleteModal={this.closeDeleteModal}
          onBankAccountLinkedAccountChange={this.dispatcher.updateBankAccountLinkedAccount}
          onCreditCardLinkedAccountChange={this.dispatcher.updateCreditCardLinkedAccount}
          onDeleteBankFeedAccountClick={this.openDeleteModalAndSetAccountToBeDeleted}
          onDeleteBankFeedAccountConfirm={this.deleteBankFeed}
        />
      </Provider>
    );

    this.setRootView(view);
  };

  unsubscribeFromStore = () => {
    this.store.unsubscribeAll();
  };
}

export default BankFeedsModule;
