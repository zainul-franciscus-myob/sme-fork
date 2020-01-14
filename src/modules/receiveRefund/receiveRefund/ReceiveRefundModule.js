import { Provider } from 'react-redux';
import React from 'react';

import { SUCCESSFULLY_DELETED_RECEIVE_REFUND, SUCCESSFULLY_SAVED_RECEIVE_REFUND } from '../ReceiveRefundMessageTypes';
import { getBusinessId, getIsPageEdited, getRegion } from './receiveRefundSelectors';
import LoadingState from '../../../components/PageView/LoadingState';
import RefundView from './components/ReceiveRefundView';
import Store from '../../../store/Store';
import createReceiveRefundDispatcher from './createReceiveRefundDispatcher';
import createReceiveRefundIntegrator from './createReceiveRefundIntegrator';
import receiveRefundReducer from './receiveRefundReducer';

export default class ReceiveRefundModule {
  constructor({
    integration, setRootView, pushMessage,
  }) {
    this.setRootView = setRootView;
    this.store = new Store(receiveRefundReducer);
    this.pushMessage = pushMessage;
    this.dispatcher = createReceiveRefundDispatcher(this.store);
    this.integrator = createReceiveRefundIntegrator(this.store, integration);
  }

  loadRefund = () => {
    this.dispatcher.setLoadingState(LoadingState.LOADING);

    const onSuccess = (response) => {
      this.dispatcher.setLoadingState(LoadingState.LOADING_SUCCESS);
      this.dispatcher.loadRefund(response);
    };

    const onFailure = () => {
      this.dispatcher.setLoadingState(LoadingState.LOADING_FAIL);
    };

    this.integrator.loadRefund({ onSuccess, onFailure });
  }

  createRefund = () => {
    this.dispatcher.setSubmittingState(true);

    const onSuccess = ({ message }) => {
      this.pushMessage({
        type: SUCCESSFULLY_SAVED_RECEIVE_REFUND,
        content: message,
      });
      this.dispatcher.setSubmittingState(false);
      this.redirectToSupplierReturnList();
    };

    const onFailure = (error) => {
      this.dispatcher.setSubmittingState(false);
      this.dispatcher.setAlert({ type: 'danger', message: error.message });
    };

    this.integrator.createRefund({ onSuccess, onFailure });
  }

  deleteRefund = () => {
    this.dispatcher.setSubmittingState(true);

    const onSuccess = ({ message }) => {
      this.pushMessage({
        type: SUCCESSFULLY_DELETED_RECEIVE_REFUND,
        content: message,
      });
      this.dispatcher.setSubmittingState(false);
      this.redirectToTransactionList();
    };

    const onFailure = (error) => {
      this.dispatcher.setSubmittingState(false);
      this.dispatcher.setAlert({ type: 'danger', message: error.message });
    };

    this.integrator.deleteRefund({ onSuccess, onFailure });
  }

  confirmBeforeDelete = () => {
    this.dispatcher.openModal('delete');
  }

  confirmDelete = () => {
    this.dispatcher.closeModal();

    this.deleteRefund();
  }

  confirmBeforeCancel = () => {
    const state = this.store.getState();
    const isEdited = getIsPageEdited(state);

    if (isEdited) {
      this.dispatcher.openModal('cancel');
    } else {
      this.redirectToSupplierReturnList();
    }
  }

  confirmCancel = () => {
    this.dispatcher.closeModal();
    this.redirectToSupplierReturnList();
  }

  redirectToSupplierReturnList = () => {
    const state = this.store.getState();
    const businessId = getBusinessId(state);
    const region = getRegion(state);

    window.location.href = `/#/${region}/${businessId}/supplierReturn`;
  }

  redirectToTransactionList = () => {
    const state = this.store.getState();
    const businessId = getBusinessId(state);
    const region = getRegion(state);

    window.location.href = `/#/${region}/${businessId}/transactionList`;
  }

  resetState = () => {
    this.dispatcher.resetState();
  }

  unsubscribeFromStore = () => {
    this.store.unsubscribeAll();
  }

  run(context) {
    this.dispatcher.setInitialState(context);
    this.render();
    this.loadRefund();
  }

  render = () => {
    const view = (
      <RefundView
        onDismissAlert={this.dispatcher.dismissAlert}
        onConfirmCancel={this.confirmCancel}
        onConfirmDelete={this.confirmDelete}
        onCloseModal={this.dispatcher.closeModal}
        onRefundDetailsChange={this.dispatcher.setRefundDetail}
        onSaveButtonClick={this.createRefund}
        onCancelButtonClick={this.confirmBeforeCancel}
        onDeleteButtonClick={this.confirmBeforeDelete}
        onGoBackButtonClick={this.redirectToTransactionList}
      />
    );

    const wrappedView = (
      <Provider store={this.store}>
        {view}
      </Provider>
    );
    this.setRootView(wrappedView);
  }
}
