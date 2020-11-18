import { Provider } from 'react-redux';
import React from 'react';

import {
  getCreateBankFeedsUrl,
  getIsSubmitting,
  getModalType,
} from './BankFeedsSelectors';
import BankFeedsView from './components/BankFeedsView';
import FeatureToggle from '../../../FeatureToggles';
import LoadingState from '../../../components/PageView/LoadingState';
import ModalTypes from './ModalTypes';
import Store from '../../../store/Store';
import bankFeedsReducer from './bankFeedsReducer';
import createBankFeedsDispatcher from './createBankFeedsDispatcher';
import createBankFeedsIntegrator from './createBankFeedsIntegrator';
import keyMap from '../../../hotKeys/keyMap';
import setupHotKeys from '../../../hotKeys/setupHotKeys';

class BankFeedsModule {
  constructor({
    integration,
    setRootView,
    globalCallbacks,
    isToggleOn,
    navigateTo,
  }) {
    this.setRootView = setRootView;
    this.integration = integration;
    this.store = new Store(bankFeedsReducer);
    this.integrator = createBankFeedsIntegrator(this.store, this.integration);
    this.dispatcher = createBankFeedsDispatcher(this.store);
    this.globalCallbacks = globalCallbacks;
    this.isToggleOn = isToggleOn;
    this.navigateTo = navigateTo;
  }

  loadBankFeeds = () => {
    const onSuccess = (response) => {
      this.dispatcher.setLoadingState(LoadingState.LOADING_SUCCESS);
      this.dispatcher.loadBankFeeds(response);
      this.globalCallbacks.bankFeedsUpdated();
    };
    const onFailure = () => {
      this.dispatcher.setLoadingState(LoadingState.LOADING_FAIL);
    };
    this.integrator.loadBankFeeds({ onSuccess, onFailure });
  };

  saveBankFeeds = () => {
    if (getIsSubmitting(this.store.getState())) return;

    this.dispatcher.setIsSubmitting(true);

    const onSuccess = (response) => {
      this.dispatcher.setIsSubmitting(false);
      this.displaySuccessMessage(response.message);
      this.globalCallbacks.bankFeedsUpdated();
    };

    const onFailure = (response) => {
      this.dispatcher.setIsSubmitting(false);
      this.displayFailureAlert(response.message);
    };

    this.integrator.saveBankFeeds({ onSuccess, onFailure });
  };

  redirectToCreateNewBankFeed = () => {
    const state = this.store.getState();
    const url = getCreateBankFeedsUrl(state);
    this.navigateTo(url, true);
  };

  openDeleteModalAndSetAccountToBeDeleted = (
    bankFeedAccountType,
    bankFeedId
  ) => {
    this.dispatcher.setBankFeedAccountToBeDeleted({
      bankFeedAccountType,
      bankFeedId,
    });
    this.dispatcher.openDeleteModal();
  };

  deleteBankFeed = () => {
    this.dispatcher.closeModal();
    this.dispatcher.setIsSubmitting(true);

    const onSuccess = (response) => {
      this.dispatcher.setIsSubmitting(false);
      this.dispatcher.deleteBankFeed();
      this.dispatcher.resetBankFeedAccountToBeDeleted();
      this.displaySuccessMessage(response.message);
      this.globalCallbacks.bankFeedsUpdated();
    };

    const onFailure = (response) => {
      this.dispatcher.setIsSubmitting(false);
      this.displayFailureAlert(response.message);
    };

    this.integrator.deleteBankFeed({ onSuccess, onFailure });
  };

  closeDeleteModal = () => {
    this.dispatcher.resetBankFeedAccountToBeDeleted();
    this.dispatcher.closeModal();
  };

  displaySuccessMessage = (successMessage) =>
    this.dispatcher.setAlert({
      message: successMessage,
      type: 'success',
    });

  displayFailureAlert = (errorMessage) =>
    this.dispatcher.setAlert({
      message: errorMessage,
      type: 'danger',
    });

  cancelBankFeedsLoginModal = () => {
    this.dispatcher.closeModal();
    this.dispatcher.clearBankFeedsLogin();
  };

  getBankFeedsAccess = () => {
    const { dispatcher, integrator } = this;

    const onSuccess = (response) => {
      const canUserAccessNewFlow = response;
      dispatcher.setLoadingState(LoadingState.LOADING_SUCCESS);
      dispatcher.setNewBankFeedsAccess(
        canUserAccessNewFlow &&
          this.isToggleOn(FeatureToggle.InProductBankFeeds)
      );
    };

    const onFailure = () =>
      dispatcher.setLoadingState(LoadingState.LOADING_FAIL);

    integrator.getBankFeedsAccess({ onSuccess, onFailure });
  };

  reloadBankFeeds = () => {
    const onSuccess = (response) => {
      this.dispatcher.setIsTableLoading(false);
      this.dispatcher.loadBankFeeds(response);
      this.globalCallbacks.bankFeedsUpdated();
    };
    const onFailure = ({ message }) => {
      this.dispatcher.setIsTableLoading(false);
      this.displayFailureAlert(message);
    };

    this.dispatcher.setIsTableLoading(true);
    this.integrator.loadBankFeeds({ onSuccess, onFailure });
  };

  bankFeedsLogin = () => {
    const onSuccess = ({ message }) => {
      this.displaySuccessMessage(message);
      this.reloadBankFeeds();
    };

    const onFailure = ({ message }) => {
      this.dispatcher.setIsTableLoading(false);
      this.displayFailureAlert(message);
    };

    this.integrator.bankFeedsLogin({ onSuccess, onFailure });

    this.dispatcher.setIsTableLoading(true);
    this.cancelBankFeedsLoginModal();
  };

  saveHandler = () => {
    const state = this.store.getState();
    const modalType = getModalType(state);
    switch (modalType) {
      case ModalTypes.DELETE:
        // DO NOTHING
        break;
      case ModalTypes.BANK_FEEDS_LOGIN:
        this.bankFeedsLogin();
        break;
      default:
        this.saveBankFeeds();
        break;
    }
  };

  handlers = {
    SAVE_ACTION: this.saveHandler,
  };

  resetState = () => this.dispatcher.resetState();

  run(context) {
    this.dispatcher.setInitialState(context);
    setupHotKeys(keyMap, this.handlers);
    this.render();
    this.dispatcher.setLoadingState(LoadingState.LOADING);
    this.loadBankFeeds();
    this.getBankFeedsAccess();
  }

  render = () => {
    const view = (
      <Provider store={this.store}>
        <BankFeedsView
          onSaveButtonClick={this.saveBankFeeds}
          onCreateBankFeedButtonClick={this.redirectToCreateNewBankFeed}
          onDismissAlert={this.dispatcher.dismissAlert}
          onCloseDeleteModal={this.closeDeleteModal}
          onBankAccountLinkedAccountChange={
            this.dispatcher.updateBankAccountLinkedAccount
          }
          onCreditCardLinkedAccountChange={
            this.dispatcher.updateCreditCardLinkedAccount
          }
          onDeleteBankFeedAccountClick={
            this.openDeleteModalAndSetAccountToBeDeleted
          }
          onDeleteBankFeedAccountConfirm={this.deleteBankFeed}
          onUpdateButtonClick={this.dispatcher.openBankFeedsLoginModal}
          onUpdateBankFeedsLoginDetails={
            this.dispatcher.updateBankFeedsLoginDetails
          }
          onCancelBankFeedsLogin={this.cancelBankFeedsLoginModal}
          onConfirmBankFeedsLogin={this.bankFeedsLogin}
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
