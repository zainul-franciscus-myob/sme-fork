import { Provider } from 'react-redux';
import React from 'react';

import { SUCCESSFULLY_DELETED_BILL_PAYMENT, SUCCESSFULLY_SAVED_BILL_PAYMENT } from '../BillPaymentMessageTypes';
import {
  getApplyPaymentToBillId,
  getBusinessId,
  getIsActionsDisabled,
  getIsCreating,
  getIsPageEdited,
  getIsReferenceIdDirty,
  getModalType,
  getRegion,
  getShouldLoadBillList,
  getSupplierId,
} from './BillPaymentDetailSelectors';
import BillPaymentView from './components/BillPaymentDetailView';
import LoadingState from '../../../components/PageView/LoadingState';
import Store from '../../../store/Store';
import billPaymentReducer from './billPaymentDetailReducer';
import createBillPaymentDetailDispatcher from './createBillPaymentDetailDispatcher';
import createBillPaymentDetailIntegrator from './createBillPaymentDetailIntegrator';
import keyMap from '../../../hotKeys/keyMap';
import setupHotKeys from '../../../hotKeys/setupHotKeys';

export default class BillPaymentModule {
  constructor({ integration, setRootView, pushMessage }) {
    this.store = new Store(billPaymentReducer);
    this.setRootView = setRootView;
    this.pushMessage = pushMessage;
    this.dispatcher = createBillPaymentDetailDispatcher(this.store);
    this.integrator = createBillPaymentDetailIntegrator(this.store, integration);
  }

  loadBillPayment = () => {
    const state = this.store.getState();

    const onSuccess = (response) => {
      this.dispatcher.setLoadingState(LoadingState.LOADING_SUCCESS);
      this.dispatcher.loadBillPayment(response);
    };

    const onFailure = () => {
      this.dispatcher.setLoadingState(LoadingState.LOADING_FAIL);
    };

    this.integrator.loadBillPayment({ onSuccess, onFailure });

    if (getSupplierId(state)) {
      this.loadBillList();
    }
  }

  unsubscribeFromStore = () => {
    this.store.unsubscribeAll();
  };

  loadBillList = () => {
    this.dispatcher.setTableLoadingState(true);

    const onSuccess = (response) => {
      this.dispatcher.setTableLoadingState(false);
      this.dispatcher.loadBillList(response);
    };

    const onFailure = ({ message }) => {
      this.dispatcher.setTableLoadingState(false);
      this.dispatcher.setAlertMessage(message);
    };

    this.integrator.loadBillList({ onSuccess, onFailure });
  }

  updateHeaderOption = ({ key, value }) => {
    const state = this.store.getState();

    this.dispatcher.updateHeaderOption({ key, value });

    if (getShouldLoadBillList(key, value, state)) {
      this.loadBillList();
    }

    if (key === 'accountId') {
      this.updateReferenceId();
    }
  }

  updateReferenceId = () => {
    const state = this.store.getState();

    if (getIsReferenceIdDirty(state)) {
      return;
    }

    const onSuccess = ({ referenceId }) => {
      // No blocking behavior, so much perform an additional check
      // just in case a user has dirtied the reference
      if (!getIsReferenceIdDirty(state)) {
        this.dispatcher.updateReferenceId(referenceId);
      }
    };

    const onFailure = ({ message }) => {
      this.dispatcher.setAlertMessage(message);
    };

    this.integrator.updateReferenceId({ onSuccess, onFailure });
  }

  redirectToTransactionList= () => {
    const state = this.store.getState();
    const businessId = getBusinessId(state);
    const region = getRegion(state);

    window.location.href = `/#/${region}/${businessId}/transactionList`;
  }

  redirectToBillList= () => {
    const state = this.store.getState();
    const businessId = getBusinessId(state);
    const region = getRegion(state);

    window.location.href = `/#/${region}/${businessId}/bill`;
  }

  redirectToBillDetail= (billId) => {
    const state = this.store.getState();
    const businessId = getBusinessId(state);
    const region = getRegion(state);

    window.location.href = `/#/${region}/${businessId}/bill/${billId}`;
  }

  dismissAlert = () => this.dispatcher.setAlertMessage('')

  saveBillPayment = () => {
    const state = this.store.getState();
    if (getIsActionsDisabled(state)) return;

    this.dispatcher.setSubmittingState(true);

    const onSuccess = (response) => {
      this.dispatcher.setSubmittingState(false);
      this.pushMessage({
        type: SUCCESSFULLY_SAVED_BILL_PAYMENT,
        content: response.message,
      });

      const isCreating = getIsCreating(state);
      if (isCreating) {
        this.redirectToBillList();
      } else {
        this.redirectToTransactionList();
      }
    };

    const onFailure = ({ message }) => {
      this.dispatcher.setSubmittingState(false);
      this.dispatcher.setAlertMessage(message);
    };

    this.integrator.saveBillPayment({ onSuccess, onFailure });
  }

  openCancelModal = () => {
    if (getIsPageEdited(this.store.getState())) {
      this.dispatcher.openModal('cancel');
    } else {
      this.cancelBillPayment();
    }
  };

  openDeleteModal = () => {
    this.dispatcher.openModal('delete');
  }

  deleteBillPayment = () => {
    this.dispatcher.setSubmittingState(true);
    this.dispatcher.closeModal();

    const onSuccess = (response) => {
      this.dispatcher.setSubmittingState(false);
      this.pushMessage({
        type: SUCCESSFULLY_DELETED_BILL_PAYMENT,
        content: response.message,
      });
      this.redirectToTransactionList();
    };

    const onFailure = ({ message }) => {
      this.dispatcher.setSubmittingState(false);
      this.dispatcher.setAlertMessage(message);
    };

    this.integrator.deleteBillPayment({ onSuccess, onFailure });
  }

  cancelBillPayment = () => {
    const state = this.store.getState();
    const isCreating = getIsCreating(state);
    if (isCreating) {
      const billId = getApplyPaymentToBillId(state);
      this.redirectToBillDetail(billId);
    } else {
      this.redirectToTransactionList();
    }
  }

  render = () => {
    const billPaymentView = (
      <BillPaymentView
        onUpdateHeaderOption={this.updateHeaderOption}
        onUpdateTableInputField={this.dispatcher.updateTableInputField}
        onSaveButtonClick={this.saveBillPayment}
        onCancelButtonClick={this.openCancelModal}
        onDeleteButtonClick={this.openDeleteModal}
        onCloseModal={this.dispatcher.closeModal}
        onCancelModal={this.cancelBillPayment}
        onDeleteModal={this.deleteBillPayment}
        onDismissAlert={this.dismissAlert}
      />
    );

    const wrappedView = (
      <Provider store={this.store}>
        {billPaymentView}
      </Provider>
    );

    this.setRootView(wrappedView);
  };

  saveHandler = () => {
    const state = this.store.getState();
    const modalType = getModalType(state);
    if (modalType) return;

    this.saveBillPayment();
  }

  handlers = {
    SAVE_ACTION: this.saveHandler,
  };

  run = (context) => {
    this.dispatcher.setInitialState(context);
    setupHotKeys(keyMap, this.handlers);
    this.render();
    this.dispatcher.setLoadingState(LoadingState.LOADING);
    this.loadBillPayment();
  }

  resetState() {
    this.dispatcher.resetState();
  }
}
