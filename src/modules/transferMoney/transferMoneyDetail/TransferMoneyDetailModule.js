import { Provider } from 'react-redux';
import React from 'react';

import { DUPLICATE_TRANSFER_MONEY, SUCCESSFULLY_DELETED_TRANSFER_MONEY, SUCCESSFULLY_SAVED_TRANSFER_MONEY } from '../transferMoneyMessageTypes';
import {
  getCreateNewUrl,
  getIsActionsDisabled,
  getIsCreating,
  getModal,
  getModalUrl,
  getOpenedModalType,
  getSaveUrl,
  getTransactionListUrl,
  isPageEdited,
} from './transferMoneyDetailSelectors';
import LoadingState from '../../../components/PageView/LoadingState';
import ModalType from '../ModalType';
import SaveActionType from '../SaveActionType';
import Store from '../../../store/Store';
import TransferMoneyDetailView from './components/TransferMoneyDetailView';
import createTransferMoneyDetailDispatcher from './createTransferMoneyDetailDispatcher';
import createTransferMoneyDetailIntegrator from './createTransferMoneyDetailIntegrator';
import keyMap from '../../../hotKeys/keyMap';
import setupHotKeys from '../../../hotKeys/setupHotKeys';
import transferMoneyDetailReducer from './transferMoneyDetailReducer';

export default class TransferMoneyDetailModule {
  constructor({
    integration, setRootView, pushMessage, popMessages, navigateTo,
  }) {
    this.setRootView = setRootView;
    this.pushMessage = pushMessage;
    this.popMessages = popMessages;
    this.navigateTo = navigateTo;
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
    this.navigateTo(transactionListUrl);
  };

  handleOnDiscardClickFromUnsavedModal = () => {
    const state = this.store.getState();
    const url = getModalUrl(state);

    this.navigateTo(url);
  }

  dismissAlert = () => this.dispatcher.setAlert();

  createTransferMoneyEntry = (onPostCreate) => {
    const state = this.store.getState();
    if (getIsActionsDisabled(state)) return;

    const onSuccess = (response) => {
      this.pushMessage({
        type: SUCCESSFULLY_SAVED_TRANSFER_MONEY,
        content: response.message,
      });

      onPostCreate(response);
    };

    const onFailure = (error) => {
      if (getModal(this.store.getState())) {
        this.dispatcher.closeModal();
      }
      this.dispatcher.setSubmittingState(false);
      this.dispatcher.setAlert({ message: error.message, type: 'danger' });
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
      this.dispatcher.setAlert({ message: error.message, type: 'danger' });
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
        onSave={this.handleSaveAction}
        onSaveAnd={this.handleSaveAndAction}
        onCancel={this.openCancelModal}
        onDelete={this.openDeleteModal}
        onConfirmCancelButtonClick={this.handleOnDiscardClickFromUnsavedModal}
        onConfirmDeleteButtonClick={this.deleteTransferMoney}
        onDismissModal={this.dispatcher.closeModal}
      />);

    const wrappedView = (
      <Provider store={this.store}>{transferMoneyView}</Provider>
    );

    this.setRootView(wrappedView);
  }

  handleSaveAndAction = (actionType) => {
    const onPostCreate = (response) => {
      const state = this.store.getState();

      if (actionType === SaveActionType.SAVE_AND_DUPLICATE) {
        this.pushMessage({
          type: DUPLICATE_TRANSFER_MONEY,
          duplicateId: response.id,
        });
      }

      this.navigateTo(getCreateNewUrl(state));
    };

    this.createTransferMoneyEntry(onPostCreate);
  }

  handleSaveAction = () => {
    const onPostCreate = () => {
      const url = getSaveUrl(this.store.getState());
      this.navigateTo(url);
    };

    this.createTransferMoneyEntry(onPostCreate);
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
        this.handleSaveAction();
    }
  }

  handlers = {
    SAVE_ACTION: this.saveHandler,
  };

  readMessages = () => {
    this.popMessages([
      SUCCESSFULLY_SAVED_TRANSFER_MONEY,
      DUPLICATE_TRANSFER_MONEY,
    ]).forEach(message => {
      switch (message.type) {
        case SUCCESSFULLY_SAVED_TRANSFER_MONEY:
          this.dispatcher.setAlert({ message: message.content, type: 'success' });
          break;
        case DUPLICATE_TRANSFER_MONEY:
          this.dispatcher.setDuplicateId(message.duplicateId);
          break;
        default:
      }
    });
  };

  run(context) {
    this.dispatcher.setInitialState(context);
    setupHotKeys(keyMap, this.handlers);
    this.render();
    this.readMessages();
    this.dispatcher.setLoadingState(LoadingState.LOADING);
    this.loadTransferMoney();
  }

  handlePageTransition = (url) => {
    const state = this.store.getState();
    if (isPageEdited(state)) {
      this.openUnsavedModal(url);
    } else {
      this.navigateTo(url);
    }
  }
}
