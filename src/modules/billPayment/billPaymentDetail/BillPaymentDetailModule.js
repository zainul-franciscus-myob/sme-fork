import { Provider } from 'react-redux';
import React from 'react';

import {
  CLOSE_MODAL,
  CREATE_BILL_PAYMENT,
  DELETE_BILL_PAYMENT,
  LOAD_BILL_LIST,
  LOAD_BILL_PAYMENT,
  LOAD_NEW_BILL_PAYMENT,
  OPEN_MODAL,
  SET_ALERT_MESSAGE,
  SET_LOADING_STATE,
  SET_SUBMITTING_STATE,
  SET_TABLE_LOADING_STATE,
  UPDATE_BILL_PAYMENT,
  UPDATE_HEADER_OPTION,
  UPDATE_REFERENCE_ID,
  UPDATE_TABLE_INPUT_FIELD,
} from '../BillPaymentIntents';
import { RESET_STATE, SET_INITIAL_STATE } from '../../../SystemIntents';
import { SUCCESSFULLY_DELETED_BILL_PAYMENT, SUCCESSFULLY_SAVED_BILL_PAYMENT } from '../BillPaymentMessageTypes';
import {
  getBillPaymentId,
  getBusinessId,
  getIsActionsDisabled,
  getIsCreating,
  getIsPageEdited,
  getIsReferenceIdDirty,
  getLoadBillListParams,
  getModalType,
  getRegion,
  getSaveBillPaymentPayload,
  getShouldLoadBillList,
  getSupplierId,
} from './BillPaymentDetailSelectors';
import BillPaymentView from './components/BillPaymentDetailView';
import LoadingState from '../../../components/PageView/LoadingState';
import Store from '../../../store/Store';
import billPaymentReducer from './billPaymentDetailReducer';
import keyMap from '../../../hotKeys/keyMap';
import setupHotKeys from '../../../hotKeys/setupHotKeys';

export default class BillPaymentModule {
  constructor({ integration, setRootView, pushMessage }) {
    this.integration = integration;
    this.store = new Store(billPaymentReducer);
    this.setRootView = setRootView;
    this.pushMessage = pushMessage;
  }

  loadBillPayment = () => {
    const state = this.store.getState();

    const intent = getIsCreating(state) ? LOAD_NEW_BILL_PAYMENT : LOAD_BILL_PAYMENT;

    const urlParams = {
      businessId: getBusinessId(state),
      billPaymentId: getBillPaymentId(state),
    };

    const onSuccess = (response) => {
      this.setLoadingState(LoadingState.LOADING_SUCCESS);

      this.store.dispatch({
        intent,
        ...response,
      });
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

    if (getSupplierId(state)) {
      const billListParams = getLoadBillListParams(state);
      this.loadBillList(billListParams);
    }
  }

  unsubscribeFromStore = () => {
    this.store.unsubscribeAll();
  };

  setLoadingState = (loadingState) => {
    this.store.dispatch({
      intent: SET_LOADING_STATE,
      loadingState,
    });
  }

  setTableLoadingState = (isTableLoading) => {
    this.store.dispatch({
      intent: SET_TABLE_LOADING_STATE,
      isTableLoading,
    });
  }

  setInitialState = (context) => {
    const intent = SET_INITIAL_STATE;

    this.store.dispatch({
      intent,
      context,
    });
  }

  loadBillList = ({ urlParams, params }) => {
    this.setTableLoadingState(true);
    const intent = LOAD_BILL_LIST;

    const onSuccess = ({ entries }) => {
      this.setTableLoadingState(false);
      this.store.dispatch({
        intent,
        entries,
      });
    };

    const onFailure = ({ message }) => {
      this.setTableLoadingState(false);
      this.displayAlert(message);
    };

    this.integration.read({
      intent,
      urlParams,
      params,
      onSuccess,
      onFailure,
    });
  }

  updateHeaderOption = ({ key, value }) => {
    const state = this.store.getState();

    this.store.dispatch({
      intent: UPDATE_HEADER_OPTION,
      key,
      value,
    });

    if (getShouldLoadBillList(key, value, state)) {
      const billListParams = getLoadBillListParams(this.store.getState());
      this.loadBillList(billListParams);
    }

    if (key === 'accountId') {
      this.updateReferenceId(value);
    }
  }

  updateReferenceId = (accountId) => {
    const intent = UPDATE_REFERENCE_ID;
    const state = this.store.getState();

    if (getIsReferenceIdDirty(state)) {
      return;
    }

    // @TODO no loading state? bug?

    const onSuccess = ({ referenceId }) => {
      // @TODO this seems like dead code, due to the above early return
      if (!getIsReferenceIdDirty(state)) {
        this.store.dispatch({
          intent,
          referenceId,
        });
      }
    };

    const onFailure = ({ message }) => {
      this.displayAlert(message);
    };

    this.integration.read({
      intent,
      urlParams: {
        businessId: getBusinessId(state),
      },
      params: { accountId },
      onSuccess,
      onFailure,
    });
  }

  updateTableInputField = ({ key, value, index }) => {
    this.store.dispatch({
      intent: UPDATE_TABLE_INPUT_FIELD,
      key,
      value,
      index,
    });
  }


  setSubmittingState = (isSubmitting) => {
    this.store.dispatch({
      intent: SET_SUBMITTING_STATE,
      isSubmitting,
    });
  }

  redirectToTransactionList= () => {
    const state = this.store.getState();
    const businessId = getBusinessId(state);
    const region = getRegion(state);

    window.location.href = `/#/${region}/${businessId}/transactionList`;
  }

  displayAlert = errorMessage => this.store.dispatch({
    intent: SET_ALERT_MESSAGE,
    alertMessage: errorMessage,
  });

  dismissAlert = () => this.store.dispatch({
    intent: SET_ALERT_MESSAGE,
    alertMessage: '',
  });

  saveBillPayment = () => {
    const state = this.store.getState();
    if (getIsActionsDisabled(state)) return;

    this.setSubmittingState(true);

    const intent = getIsCreating(state) ? CREATE_BILL_PAYMENT : UPDATE_BILL_PAYMENT;

    const onSuccess = (response) => {
      this.setSubmittingState(false);
      this.pushMessage({
        type: SUCCESSFULLY_SAVED_BILL_PAYMENT,
        content: response.message,
      });
      this.redirectToTransactionList();
    };

    const onFailure = ({ message }) => {
      this.setSubmittingState(false);
      this.displayAlert(message);
    };

    this.integration.write({
      intent,
      urlParams: {
        businessId: getBusinessId(state),
        billPaymentId: getBillPaymentId(state),
      },
      content: getSaveBillPaymentPayload(state),
      onSuccess,
      onFailure,
    });
  }

  openCancelModal = () => {
    if (getIsPageEdited(this.store.getState())) {
      this.store.dispatch({
        intent: OPEN_MODAL,
        modalType: 'cancel',
      });
    } else {
      this.redirectToTransactionList();
    }
  };

  openDeleteModal = () => {
    this.store.dispatch({
      intent: OPEN_MODAL,
      modalType: 'delete',
    });
  }

  closeModal = () => {
    const intent = CLOSE_MODAL;
    this.store.dispatch({ intent });
  };

  deleteBillPayment = () => {
    this.setSubmittingState(true);
    this.closeModal();

    const state = this.store.getState();

    const intent = DELETE_BILL_PAYMENT;

    const onSuccess = (response) => {
      this.setSubmittingState(false);
      this.pushMessage({
        type: SUCCESSFULLY_DELETED_BILL_PAYMENT,
        content: response.message,
      });
      this.redirectToTransactionList();
    };

    const onFailure = ({ message }) => {
      this.setSubmittingState(false);
      this.displayAlert(message);
    };

    this.integration.write({
      intent,
      urlParams: {
        businessId: getBusinessId(state),
        billPaymentId: getBillPaymentId(state),
      },
      onSuccess,
      onFailure,
    });
  }

  render = () => {
    const billPaymentView = (
      <BillPaymentView
        onUpdateHeaderOption={this.updateHeaderOption}
        onUpdateTableInputField={this.updateTableInputField}
        onSaveButtonClick={this.saveBillPayment}
        onCancelButtonClick={this.openCancelModal}
        onDeleteButtonClick={this.openDeleteModal}
        onCloseModal={this.closeModal}
        onCancelModal={this.redirectToTransactionList}
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
    this.setInitialState(context);
    setupHotKeys(keyMap, this.handlers);
    this.render();
    this.setLoadingState(LoadingState.LOADING);
    this.loadBillPayment();
  }

  resetState() {
    const intent = RESET_STATE;
    this.store.dispatch({
      intent,
    });
  }
}
