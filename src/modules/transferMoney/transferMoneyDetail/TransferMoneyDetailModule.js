import { Provider } from 'react-redux';
import React from 'react';

import { SUCCESSFULLY_DELETED_TRANSFER_MONEY, SUCCESSFULLY_SAVED_TRANSFER_MONEY } from '../transferMoneyMessageTypes';
import {
  getIsActionsDisabled,
  getIsCreating,
  getModalUrl,
  getOpenedModalType,
  getSaveUrl,
  getTransactionListUrl,
  isPageEdited,
} from './transferMoneyDetailSelectors';
import LoadingState from '../../../components/PageView/LoadingState';
import ModalType from '../ModalType';
import Store from '../../../store/Store';
import TransferMoneyDetailView from './components/TransferMoneyDetailView';
import createTransferMoneyDetailDispatcher from './createTransferMoneyDetailDispatcher';
import createTransferMoneyDetailIntegrator from './createTransferMoneyDetailIntegrator';
import keyMap from '../../../hotKeys/keyMap';
import setupHotKeys from '../../../hotKeys/setupHotKeys';
import transferMoneyDetailReducer from './transferMoneyDetailReducer';

export default class TransferMoneyDetailModule {
  constructor({
    integration, setRootView, pushMessage,
  }) {
    this.setRootView = setRootView;
    this.pushMessage = pushMessage;
    this.store = new Store(transferMoneyDetailReducer);
    this.dispatcher = createTransferMoneyDetailDispatcher(this.store);
    this.integrator = createTransferMoneyDetailIntegrator(this.store, integration);
  }

  loadTransferMoney = () => {
    const onSuccess = (transferMoney) => {
      this.dispatcher.loadTransferMoney(transferMoney);
      this.dispatcher.setLoadingState(LoadingState.LOADING_SUCCESS);
    };

    const onFailure = () => {
      this.dispatcher.setLoadingState(LoadingState.LOADING_FAIL);
    };

    this.integrator.loadTransferMoney({ onSuccess, onFailure });
  }

  redirectToTransactionList = () => {
    const state = this.store.getState();
    const transactionListUrl = getTransactionListUrl(state);
    this.redirectToUrl(transactionListUrl);
  };

  redirectToModalUrl = () => {
    const state = this.store.getState();
    const url = getModalUrl(state);
    this.redirectToUrl(url);
  }

  redirectToUrl = (url) => {
    window.location.href = url;
  }

  dismissAlert = () => this.dispatcher.setAlertMessage('');

  createTransferMoneyEntry = () => {
    const state = this.store.getState();
    if (getIsActionsDisabled(state)) return;

    const onSuccess = (response) => {
      this.pushMessage({
        type: SUCCESSFULLY_SAVED_TRANSFER_MONEY,
        content: response.message,
      });

      const url = getSaveUrl(state);
      this.redirectToUrl(url);
    };

    const onFailure = (error) => {
      this.dispatcher.setSubmittingState(false);
      this.dispatcher.setAlertMessage(error.message);
    };

    this.dispatcher.setSubmittingState(true);
    this.integrator.createTransferMoney({ onSuccess, onFailure });
  }

  deleteTransferMoney = () => {
    this.dispatcher.setSubmittingState(true);
    this.dispatcher.closeModal();

    const onSuccess = ({ message }) => {
      this.pushMessage({
        type: SUCCESSFULLY_DELETED_TRANSFER_MONEY,
        content: message,
      });
      this.redirectToTransactionList();
    };

    const onFailure = (error) => {
      this.dispatcher.setSubmittingState(false);
      this.dispatcher.setAlertMessage(error.message);
    };

    this.integrator.deleteTranferMoney({ onSuccess, onFailure });
  }

  openDeleteModal = () => {
    const state = this.store.getState();
    const transactionListUrl = getTransactionListUrl(state);

    this.dispatcher.openModal({
      type: ModalType.DELETE,
      url: transactionListUrl,
    });
  }

  openCancelModal = () => {
    if (isPageEdited(this.store.getState())) {
      const state = this.store.getState();
      const transactionListUrl = getTransactionListUrl(state);

      this.dispatcher.openModal({
        type: ModalType.CANCEL,
        url: transactionListUrl,
      });
    } else {
      this.redirectToTransactionList();
    }
  }

  openUnsavedModal = (url) => {
    this.dispatcher.openModal({
      type: ModalType.UNSAVED,
      url,
    });
  }

  unsubscribeFromStore = () => {
    this.store.unsubscribeAll();
  };

  resetState = () => this.dispatcher.resetState();

  render = () => {
    const transferMoneyView = (
      <TransferMoneyDetailView
        onUpdateForm={this.dispatcher.updateForm}
        onDismissAlert={this.dismissAlert}
        onSave={this.createTransferMoneyEntry}
        onCancel={this.openCancelModal}
        onDelete={this.openDeleteModal}
        onConfirmCancelButtonClick={this.redirectToModalUrl}
        onConfirmDeleteButtonClick={this.deleteTransferMoney}
        onDismissModal={this.dispatcher.closeModal}
      />);

    const wrappedView = (
      <Provider store={this.store}>{transferMoneyView}</Provider>
    );

    this.setRootView(wrappedView);
  }

  saveHandler = () => {
    const state = this.store.getState();
    const isCreating = getIsCreating(state);
    if (!isCreating) return;

    const modalType = getOpenedModalType(state);
    switch (modalType) {
      case ModalType.CANCEL:
      case ModalType.DELETE:
        // DO NOTHING
        break;
      case ModalType.UNSAVED:
      default:
        this.createTransferMoneyEntry();
        break;
    }
  }

  handlers = {
    SAVE_ACTION: this.saveHandler,
  };

  run(context) {
    this.dispatcher.setInitialState(context);
    setupHotKeys(keyMap, this.handlers);
    this.render();
    this.dispatcher.setLoadingState(LoadingState.LOADING);
    this.loadTransferMoney();
  }

  handlePageTransition = (url) => {
    const state = this.store.getState();
    if (isPageEdited(state)) {
      this.openUnsavedModal(url);
    } else {
      this.redirectToUrl(url);
    }
  }
}
