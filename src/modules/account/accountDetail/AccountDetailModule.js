import { Provider } from 'react-redux';
import React from 'react';

import {
  SUCCESSFULLY_DELETED_ACCOUNT,
  SUCCESSFULLY_SAVED_ACCOUNT,
} from '../../../common/types/MessageTypes';
import {
  getBusinessId,
  getIsActionsDisabled,
  getIsCreating,
  getModalType,
  getRegion,
  isPageEdited,
} from './accountDetailSelectors';
import AccountDetailView from './components/AccountDetailView';
import LoadingState from '../../../components/PageView/LoadingState';
import RegionToBankComponentMapping from './RegionToBankComponentMapping';
import Store from '../../../store/Store';
import accountDetailReducer from './accountDetailReducer';
import createAccountDetailDispatcher from './createAccountDetailDispatcher';
import createAccountDetailIntegrator from './createAccountDetailIntegrator';
import keyMap from '../../../hotKeys/keyMap';
import setupHotKeys from '../../../hotKeys/setupHotKeys';

export default class AccountDetailModule {
  constructor({ integration, setRootView, pushMessage }) {
    this.integration = integration;
    this.store = new Store(accountDetailReducer);
    this.setRootView = setRootView;
    this.pushMessage = pushMessage;

    this.dispatcher = createAccountDetailDispatcher(this.store);
    this.integrator = createAccountDetailIntegrator(this.store, integration);
  }

  render = () => {
    const state = this.store.getState();
    const region = getRegion(state);

    const BankingSection = RegionToBankComponentMapping[region];
    const accountDetailView = (
      <AccountDetailView
        onAccountChange={this.dispatcher.updateAccountDetails}
        onAccountNumberChange={this.dispatcher.updateAccountNumber}
        onAccountNumberBlur={this.dispatcher.padAccountNumberValue}
        onBankDetailsChange={this.dispatcher.updateBankDetails}
        onUpdateAccountCategory={this.dispatcher.updateAccountCategory}
        onHeaderAccountTypeChange={this.dispatcher.onHeaderAccountTypeChange}
        onDetailAccountTypeChange={this.dispatcher.onDetailAccountTypeChange}
        bankSectionComponent={BankingSection}
        onDismissAlert={this.dispatcher.dismissAlert}
        onDeleteButtonClick={this.dispatcher.openDeleteModal}
        onCancelButtonClick={this.openCancelModal}
        onCloseModal={this.dispatcher.closeModal}
        onSaveButtonClick={this.updateOrCreateAccount}
        onDeleteModal={this.deleteAccount}
        onCancelModal={this.redirectToAccountList}
      />
    );

    const wrappedView = (
      <Provider store={this.store}>{accountDetailView}</Provider>
    );
    this.setRootView(wrappedView);
  };

  updateOrCreateAccount = () => {
    const state = this.store.getState();
    if (getIsActionsDisabled(state)) return;

    const isCreating = getIsCreating(state);
    this.dispatcher.setSubmittingState(true);

    const onSuccess = ({ message }) => {
      this.pushMessage({
        type: SUCCESSFULLY_SAVED_ACCOUNT,
        content: message,
      });
      this.dispatcher.setSubmittingState(false);
      this.redirectToAccountList();
    };

    const onFailure = (error) => {
      this.dispatcher.setSubmittingState(false);
      this.dispatcher.displayAlert(error.message);
    };

    if (isCreating) {
      this.integrator.createAccount(onSuccess, onFailure);
    } else {
      this.integrator.updateAccount(onSuccess, onFailure);
    }
  };

  loadAccountDetail = () => {
    const state = this.store.getState();
    const isCreating = getIsCreating(state);
    const onSuccess = (payload) => {
      this.dispatcher.setLoadingState(LoadingState.LOADING_SUCCESS);
      this.dispatcher.loadAccountDetail(payload);
    };

    const onFailure = () => {
      this.dispatcher.setLoadingState(LoadingState.LOADING_FAIL);
    };

    if (isCreating) {
      this.integrator.loadNewAccount(onSuccess, onFailure);
      return;
    }

    this.dispatcher.setLoadingState(LoadingState.LOADING);
    this.integrator.loadAccountDetail(onSuccess, onFailure);
  };

  unsubscribeFromStore = () => {
    this.store.unsubscribeAll();
  };

  openCancelModal = () => {
    const state = this.store.getState();
    if (isPageEdited(state)) {
      this.dispatcher.openCancelModal();
    } else {
      this.redirectToAccountList();
    }
  };

  redirectToAccountList = () => {
    const state = this.store.getState();
    const businessId = getBusinessId(state);
    const region = getRegion(state);

    window.location.href = `/#/${region}/${businessId}/account`;
  };

  loadNewAccount = () => {
    const onSuccess = (payload) => {
      this.dispatcher.setLoadingState(LoadingState.LOADING_SUCCESS);
      this.dispatcher.loadNewAccount(payload);
    };

    const onFailure = () => {
      this.dispatcher.setLoadingState(LoadingState.LOADING_FAIL);
    };

    this.dispatcher.setLoadingState(LoadingState.LOADING);
    this.integrator.loadNewAccount({
      onSuccess,
      onFailure,
    });
  };

  deleteAccount = () => {
    this.dispatcher.setSubmittingState(true);
    this.dispatcher.closeModal();
    const onSuccess = ({ message }) => {
      this.pushMessage({
        type: SUCCESSFULLY_DELETED_ACCOUNT,
        content: message,
      });
      this.redirectToAccountList();
    };

    const onFailure = (error) => {
      this.dispatcher.setSubmittingState(false);
      this.dispatcher.displayAlert(error.message);
    };

    this.integrator.deleteAccount(
      onSuccess,
      onFailure,
    );
  };

  saveHandler = () => {
    const state = this.store.getState();
    const modalType = getModalType(state);
    if (modalType) return;

    this.updateOrCreateAccount();
  }

  handlers = {
    SAVE_ACTION: this.saveHandler,
  };

  resetState = () => {
    this.dispatcher.resetState();
  };

  run(context) {
    this.dispatcher.setInitialState(context);
    setupHotKeys(keyMap, this.handlers);
    this.render();
    this.loadAccountDetail();
  }
}
