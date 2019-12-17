import { Provider } from 'react-redux';
import React from 'react';

import { SUCCESSFULLY_DELETED_PAY_REFUND, SUCCESSFULLY_SAVED_PAY_REFUND } from '../PayRefundMessageTypes';
import {
  getBusinessId, getIsCreating, getIsPageEdited, getRegion, isReferenceIdDirty,
} from './payRefundSelectors';
import RefundView from './components/PayRefundView';
import Store from '../../../store/Store';
import createPayRefundDispatcher from './createPayRefundDispatcher';
import createPayRefundIntegrator from './createPayRefundIntegrator';
import payRefundReducer from './payRefundReducer';

export default class PayRefundModule {
  constructor({
    integration, setRootView, pushMessage,
  }) {
    this.setRootView = setRootView;
    this.store = new Store(payRefundReducer);
    this.pushMessage = pushMessage;
    this.dispatcher = createPayRefundDispatcher(this.store);
    this.integrator = createPayRefundIntegrator(this.store, integration);
  }

  loadRefund = () => {
    this.dispatcher.setLoadingState(true);

    const onSuccess = (response) => {
      this.dispatcher.setLoadingState(false);
      this.dispatcher.loadRefund(response);
    };

    const onFailure = () => {
      console.error('Failed to load a refund');
    };

    this.integrator.loadRefund({ onSuccess, onFailure });
  }

  createRefund = () => {
    this.dispatcher.setSubmittingState(true);

    const onSuccess = ({ message }) => {
      this.pushMessage({
        type: SUCCESSFULLY_SAVED_PAY_REFUND,
        content: message,
      });
      this.dispatcher.setSubmittingState(false);
      this.redirectToCustomerReturnList();
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
        type: SUCCESSFULLY_DELETED_PAY_REFUND,
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
      this.redirectToCustomerReturnList();
    }
  }

  confirmCancel = () => {
    this.dispatcher.closeModal();
    this.redirectToCustomerReturnList();
  }

  redirectToCustomerReturnList = () => {
    const state = this.store.getState();
    const businessId = getBusinessId(state);
    const region = getRegion(state);

    window.location.href = `/#/${region}/${businessId}/customerReturn`;
  }

  redirectToTransactionList = () => {
    const state = this.store.getState();
    const businessId = getBusinessId(state);
    const region = getRegion(state);

    window.location.href = `/#/${region}/${businessId}/transactionList`;
  }

  setRefundDetails = ({ key, value }) => {
    const state = this.store.getState();
    const isCreating = getIsCreating(state);
    if (isCreating && key === 'accountId') {
      this.loadReferenceId(value);
    }

    this.dispatcher.setRefundDetail({ key, value });
  };

  loadReferenceId = (accountId) => {
    const state = this.store.getState();

    if (!isReferenceIdDirty(state)) {
      const onSuccess = ({ referenceId }) => {
        if (!isReferenceIdDirty(this.store.getState())) {
          this.dispatcher.loadReferenceId(referenceId);
        }
      };

      const onFailure = ({ message }) => {
        this.dispatcher.setAlert({ type: 'danger', message });
      };

      this.integrator.loadReferenceId({
        accountId, onSuccess, onFailure,
      });
    }
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
        onRefundDetailsChange={this.setRefundDetails}
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
