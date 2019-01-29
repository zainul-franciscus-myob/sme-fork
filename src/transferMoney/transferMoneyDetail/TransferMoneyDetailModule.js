import { Provider } from 'react-redux';
import React from 'react';

import { SUCCESSFULLY_DELETED_TRANSFER_MONEY, SUCCESSFULLY_SAVED_TRANSFER_MONEY } from '../transferMoneyMessageTypes';
import { getCreateTransferMoneyPayload, isPageEdited } from './transferMoneyDetailSelectors';
import Store from '../../store/Store';
import SystemIntents from '../../SystemIntents';
import TransferMoneyDetailView from './components/TransferMoneyDetailView';
import TransferMoneyIntents from '../TransferMoneyIntents';
import transferMoneyDetailReducer from './transferMoneyDetailReducer';

export default class TransferMoneyDetailModule {
  constructor({ integration, setRootView, pushMessage }) {
    this.integration = integration;
    this.setRootView = setRootView;
    this.pushMessage = pushMessage;
    this.transferMoneyId = '';
    this.store = new Store(transferMoneyDetailReducer);
  }

  setLoadingState = (isLoading) => {
    this.store.dispatch({
      intent: TransferMoneyIntents.SET_LOADING_STATE,
      isLoading,
    });
  }

  loadTransferMoney = () => {
    const intent = this.isCreating
      ? TransferMoneyIntents.LOAD_NEW_TRANSFER_MONEY
      : TransferMoneyIntents.LOAD_TRANSFER_MONEY_DETAIL;

    const urlParams = {
      businessId: this.businessId,
      ...(!this.isCreating && { transferMoneyId: this.transferMoneyId }),
    };

    const onSuccess = (transferMoney) => {
      this.store.dispatch({
        intent,
        transferMoney,
      });
      this.setLoadingState(false);
    };

    const onFailure = () => {
      console.log('Failed to load transfer money details');
    };

    this.integration.read({
      intent,
      urlParams,
      onSuccess,
      onFailure,
    });
  }

  updateForm = ({ key, value }) => this.store.dispatch({
    intent: TransferMoneyIntents.UPDATE_FORM,
    key,
    value,
  })

  formatAmount = () => this.store.dispatch({ intent: TransferMoneyIntents.FORMAT_AMOUNT })

  setSubmittingState = isSubmitting => this.store.dispatch({
    intent: TransferMoneyIntents.SET_SUBMITTING_STATE,
    isSubmitting,
  });

  redirectToTransactionList= () => {
    window.location.href = `/#/${this.businessId}/transactionList`;
  }

  displayAlert = errorMessage => this.store.dispatch({
    intent: TransferMoneyIntents.SET_ALERT_MESSAGE,
    alertMessage: errorMessage,
  });

  dismissAlert = () => this.store.dispatch({
    intent: TransferMoneyIntents.SET_ALERT_MESSAGE,
    alertMessage: '',
  });

  createTransferMoneyEntry = () => {
    const content = getCreateTransferMoneyPayload(this.store.getState());
    const urlParams = { businessId: this.businessId };

    const onSuccess = (response) => {
      this.pushMessage({
        type: SUCCESSFULLY_SAVED_TRANSFER_MONEY,
        content: response.message,
      });
      this.redirectToTransactionList();
    };

    const onFailure = (error) => {
      this.setSubmittingState(false);
      this.displayAlert(error.message);
    };

    this.setSubmittingState(true);
    this.integration.write({
      intent: TransferMoneyIntents.CREATE_TRANSFER_MONEY,
      urlParams,
      content,
      onSuccess,
      onFailure,
    });
  }

  deleteTransferMoney = () => {
    this.setSubmittingState(true);

    const onSuccess = ({ message }) => {
      this.pushMessage({
        type: SUCCESSFULLY_DELETED_TRANSFER_MONEY,
        content: message,
      });
      this.redirectToTransactionList();
    };

    const onFailure = (error) => {
      this.closeModal();
      this.setSubmittingState(false);
      this.displayAlert(error.message);
    };

    this.integration.write({
      intent: TransferMoneyIntents.DELETE_TRANSFER_MONEY,
      urlParams: {
        businessId: this.businessId,
        transferMoneyId: this.transferMoneyId,
      },
      onSuccess,
      onFailure,
    });
  }

  openDeleteModal = () => this.store.dispatch({
    intent: TransferMoneyIntents.OPEN_MODAL,
    modalType: 'delete',
  })

  openCancelModal = () => (isPageEdited(this.store.getState())
    ? this.store.dispatch({
      intent: TransferMoneyIntents.OPEN_MODAL,
      modalType: 'cancel',
    })
    : this.redirectToTransactionList())

  closeModal = () => this.store.dispatch({ intent: TransferMoneyIntents.CLOSE_MODAL })

  unsubscribeFromStore = () => {
    this.store.unsubscribeAll();
  };

  resetState = () => this.store.dispatch({ intent: SystemIntents.RESET_STATE });

  render = () => {
    const transferMoneyView = (
      <TransferMoneyDetailView
        onUpdateForm={this.updateForm}
        onAmountInputBlur={this.formatAmount}
        onDismissAlert={this.dismissAlert}
        onSave={this.createTransferMoneyEntry}
        isCreating={this.isCreating}
        onCancel={this.openCancelModal}
        onDelete={this.openDeleteModal}
        onCancelModal={this.redirectToTransactionList}
        onDeleteModal={this.deleteTransferMoney}
        onCloseModal={this.closeModal}
      />);

    const wrappedView = (
      <Provider store={this.store}>{transferMoneyView}</Provider>
    );

    this.setRootView(wrappedView);
  }

  run(context) {
    this.businessId = context.businessId;
    this.transferMoneyId = context.transferMoneyId;
    this.isCreating = context.transferMoneyId === 'new';
    this.resetState();
    this.render();
    this.setLoadingState(true);
    this.loadTransferMoney();
  }
}
