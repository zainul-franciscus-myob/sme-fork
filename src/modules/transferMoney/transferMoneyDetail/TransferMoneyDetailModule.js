import { Provider } from 'react-redux';
import React from 'react';

import {
  CLOSE_MODAL,
  CREATE_TRANSFER_MONEY,
  DELETE_TRANSFER_MONEY,
  FORMAT_AMOUNT,
  LOAD_NEW_TRANSFER_MONEY,
  LOAD_TRANSFER_MONEY_DETAIL,
  OPEN_MODAL,
  SET_ALERT_MESSAGE,
  SET_LOADING_STATE,
  SET_SUBMITTING_STATE,
  UPDATE_FORM,
} from '../TransferMoneyIntents';
import { RESET_STATE, SET_INITIAL_STATE } from '../../../SystemIntents';
import { SUCCESSFULLY_DELETED_TRANSFER_MONEY, SUCCESSFULLY_SAVED_TRANSFER_MONEY } from '../transferMoneyMessageTypes';
import {
  getBusinessId,
  getCreateTransferMoneyPayload,
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
import keyMap from '../../../hotKeys/keyMap';
import setupHotKeys from '../../../hotKeys/setupHotKeys';
import transferMoneyDetailReducer from './transferMoneyDetailReducer';

export default class TransferMoneyDetailModule {
  constructor({
    integration, setRootView, pushMessage,
  }) {
    this.integration = integration;
    this.setRootView = setRootView;
    this.pushMessage = pushMessage;
    this.transferMoneyId = '';
    this.store = new Store(transferMoneyDetailReducer);
  }

  setLoadingState = (loadingState) => {
    this.store.dispatch({
      intent: SET_LOADING_STATE,
      loadingState,
    });
  }

  loadTransferMoney = () => {
    const intent = this.isCreating
      ? LOAD_NEW_TRANSFER_MONEY
      : LOAD_TRANSFER_MONEY_DETAIL;

    const urlParams = {
      businessId: getBusinessId(this.store.getState()),
      ...(!this.isCreating && { transferMoneyId: this.transferMoneyId }),
    };

    const onSuccess = (transferMoney) => {
      this.store.dispatch({
        intent,
        transferMoney,
      });
      this.setLoadingState(LoadingState.LOADING_SUCCESS);
    };

    const onFailure = () => {
      this.setLoadingState(LoadingState.LOADING_FAIL);
    };

    this.integration.read({
      intent,
      urlParams,
      onSuccess,
      onFailure,
    });
  }

  updateForm = ({ key, value }) => this.store.dispatch({
    intent: UPDATE_FORM,
    key,
    value,
  })

  formatAmount = () => this.store.dispatch({ intent: FORMAT_AMOUNT })

  setSubmittingState = isSubmitting => this.store.dispatch({
    intent: SET_SUBMITTING_STATE,
    isSubmitting,
  });

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

  displayAlert = errorMessage => this.store.dispatch({
    intent: SET_ALERT_MESSAGE,
    alertMessage: errorMessage,
  });

  dismissAlert = () => this.store.dispatch({
    intent: SET_ALERT_MESSAGE,
    alertMessage: '',
  });

  createTransferMoneyEntry = () => {
    const state = this.store.getState();
    if (getIsActionsDisabled(state)) return;

    const content = getCreateTransferMoneyPayload(state);
    const urlParams = { businessId: getBusinessId(state) };

    const onSuccess = (response) => {
      this.pushMessage({
        type: SUCCESSFULLY_SAVED_TRANSFER_MONEY,
        content: response.message,
      });

      const url = getSaveUrl(state);
      this.redirectToUrl(url);
    };

    const onFailure = (error) => {
      this.setSubmittingState(false);
      this.displayAlert(error.message);
    };

    this.setSubmittingState(true);
    this.integration.write({
      intent: CREATE_TRANSFER_MONEY,
      urlParams,
      content,
      onSuccess,
      onFailure,
    });
  }

  deleteTransferMoney = () => {
    this.setSubmittingState(true);
    this.closeModal();

    const onSuccess = ({ message }) => {
      this.pushMessage({
        type: SUCCESSFULLY_DELETED_TRANSFER_MONEY,
        content: message,
      });
      this.redirectToTransactionList();
    };

    const onFailure = (error) => {
      this.setSubmittingState(false);
      this.displayAlert(error.message);
    };

    this.integration.write({
      intent: DELETE_TRANSFER_MONEY,
      urlParams: {
        businessId: getBusinessId(this.store.getState()),
        transferMoneyId: this.transferMoneyId,
      },
      onSuccess,
      onFailure,
    });
  }

  openDeleteModal = () => {
    const state = this.store.getState();
    const transactionListUrl = getTransactionListUrl(state);

    this.store.dispatch({
      intent: OPEN_MODAL,
      modal: {
        type: ModalType.DELETE,
        url: transactionListUrl,
      },
    });
  }

  openCancelModal = () => {
    const intent = OPEN_MODAL;

    if (isPageEdited(this.store.getState())) {
      const state = this.store.getState();
      const transactionListUrl = getTransactionListUrl(state);

      this.store.dispatch({
        intent,
        modal: {
          type: ModalType.CANCEL,
          url: transactionListUrl,
        },
      });
    } else {
      this.redirectToTransactionList();
    }
  }

  openUnsavedModal = (url) => {
    this.store.dispatch({
      intent: OPEN_MODAL,
      modal: {
        type: ModalType.UNSAVED,
        url,
      },
    });
  }

  closeModal = () => this.store.dispatch({ intent: CLOSE_MODAL })

  unsubscribeFromStore = () => {
    this.store.unsubscribeAll();
  };

  resetState = () => this.store.dispatch({ intent: RESET_STATE });

  render = () => {
    const transferMoneyView = (
      <TransferMoneyDetailView
        onUpdateForm={this.updateForm}
        onAmountInputBlur={this.formatAmount}
        onDismissAlert={this.dismissAlert}
        onSave={this.createTransferMoneyEntry}
        onCancel={this.openCancelModal}
        onDelete={this.openDeleteModal}
        onConfirmCancelButtonClick={this.redirectToModalUrl}
        onConfirmDeleteButtonClick={this.deleteTransferMoney}
        onDismissModal={this.closeModal}
      />);

    const wrappedView = (
      <Provider store={this.store}>{transferMoneyView}</Provider>
    );

    this.setRootView(wrappedView);
  }

  setInitialState = (context) => {
    this.store.dispatch({
      intent: SET_INITIAL_STATE,
      context,
    });
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
    this.setInitialState(context);
    this.transferMoneyId = context.transferMoneyId;
    setupHotKeys(keyMap, this.handlers);
    this.render();
    this.setLoadingState(LoadingState.LOADING);
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
