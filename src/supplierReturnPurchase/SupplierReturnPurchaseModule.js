import { Provider } from 'react-redux';
import React from 'react';

import {
  CLOSE_MODAL,
  CREATE_PURCHASE_RETURN,
  DELETE_PURCHASE_RETURN,
  FORMAT_AMOUNT_INPUT,
  LOAD_NEW_PURCHASE_RETURN,
  LOAD_PURCHASES,
  LOAD_PURCHASE_RETURN,
  OPEN_MODAL,
  SET_ALERT,
  SET_LOADING_STATE,
  SET_SUBMITTING_STATE,
  SET_TABLE_LOADING_STATE,
  UPDATE_PURCHASE_OPTION,
  UPDATE_TABLE_AMOUNT_FIELDS,
} from './SupplierReturnPurchaseIntents';
import { RESET_STATE, SET_INITIAL_STATE } from '../SystemIntents';
import {
  SUCCESSFULLY_DELETED_PURCHASE_RETURN,
  SUCCESSFULLY_SAVED_PURCHASE_RETURN,
} from './SupplierReturnPurchaseMessageTypes';
import {
  getBusinessId,
  getIsCreating,
  getIsPageEdited,
  getPurchaseReturnId,
  getRegion,
  getSupplierId,
  getSupplierReturnId,
  getSupplierReturnPurchasePayload,
} from './SupplierReturnPurchaseSelector';
import Store from '../store/Store';
import SupplierReturnPurchaseView from './components/SupplierReturnPurchaseView';
import supplierReturnPurchaseReducer from './SupplierReturnPurchaseReducer';

export default class SupplerReturnPurchaseModule {
  constructor({ integration, setRootView, pushMessage }) {
    this.integration = integration;
    this.store = new Store(supplierReturnPurchaseReducer);
    this.setRootView = setRootView;
    this.pushMessage = pushMessage;
  }

  loadPurchaseReturn = () => {
    const state = this.store.getState();

    const isCreating = getIsCreating(state);

    const intent = isCreating ? LOAD_NEW_PURCHASE_RETURN : LOAD_PURCHASE_RETURN;

    const urlParams = {
      businessId: getBusinessId(state),
      supplierReturnId: getSupplierReturnId(state),
      purchaseReturnId: getPurchaseReturnId(state),
    };

    const onSuccess = (purchaseReturn) => {
      this.setLoadingState(false);

      this.store.dispatch({
        intent,
        purchaseReturn,
      });
    };

    const onFailure = ({ message }) => {
      this.setLoadingState(false);
      this.displayAlert(message);
    };

    this.integration.read({
      intent,
      urlParams,
      onSuccess,
      onFailure,
    });
  };

  createPurchaseReturn = () => {
    this.setSubmittingState(true);

    const state = this.store.getState();

    const intent = CREATE_PURCHASE_RETURN;

    const onSuccess = (response) => {
      this.setSubmittingState(false);
      this.pushMessage({
        type: SUCCESSFULLY_SAVED_PURCHASE_RETURN,
        content: response.message,
      });
      this.redirectToSupplierReturnList();
    };

    const onFailure = ({ message }) => {
      this.setSubmittingState(false);
      this.displayAlert(message);
    };

    this.integration.write({
      intent,
      urlParams: {
        businessId: getBusinessId(state),
      },
      content: getSupplierReturnPurchasePayload(state),
      onSuccess,
      onFailure,
    });
  }

  deletePurchaseReturn = () => {
    this.setSubmittingState(true);

    const state = this.store.getState();

    const intent = DELETE_PURCHASE_RETURN;

    const onSuccess = (response) => {
      this.setSubmittingState(false);
      this.pushMessage({
        type: SUCCESSFULLY_DELETED_PURCHASE_RETURN,
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
        purchaseReturnId: getPurchaseReturnId(state),

      },
      onSuccess,
      onFailure,
    });
  }

  loadPurchases = (includeClosedPurchases) => {
    this.setTableLoadingState(true);

    const state = this.store.getState();

    const intent = LOAD_PURCHASES;

    const params = {
      supplierId: getSupplierId(state),
      includeClosedPurchases,
    };

    const onSuccess = (response) => {
      this.setTableLoadingState(false);

      this.store.dispatch({
        intent,
        ...response,
      });
    };

    const onFailure = ({ message }) => {
      this.setTableLoadingState(false);
      this.displayAlert(message);
    };

    this.integration.read({
      intent,
      urlParams: {
        businessId: getBusinessId(state),
      },
      params,
      onSuccess,
      onFailure,
    });
  }

  updateTableAmountFields = ({ key, value, index }) => {
    this.store.dispatch({
      intent: UPDATE_TABLE_AMOUNT_FIELDS,
      key,
      value,
      index,
    });
  }

  formatAmountInput = ({ key, value, index }) => {
    this.store.dispatch({
      intent: FORMAT_AMOUNT_INPUT,
      key,
      value,
      index,
    });
  }

  updatePurchaseOptions = ({ key, value }) => {
    this.store.dispatch({
      intent: UPDATE_PURCHASE_OPTION,
      key,
      value,
    });

    if (key === 'includeClosedPurchases') {
      this.loadPurchases(value);
    }
  }

  confirmBeforeCancel = () => {
    const state = this.store.getState();
    const isEdited = getIsPageEdited(state);

    if (isEdited) {
      this.store.dispatch({
        intent: OPEN_MODAL,
        modalType: 'cancel',
      });
    } else if (getIsCreating(state)) {
      this.redirectToSupplierReturnList();
    } else {
      this.redirectToTransactionList();
    }
  }

  confirmBeforeDelete = () => {
    this.store.dispatch({
      intent: OPEN_MODAL,
      modalType: 'delete',
    });
  }

  confirmCancel = () => {
    const state = this.store.getState();

    this.closeModal();

    if (getIsCreating(state)) {
      this.redirectToSupplierReturnList();
    } else {
      this.redirectToTransactionList();
    }
  }

  confirmDelete = () => {
    this.closeModal();
    this.deletePurchaseReturn();
  }

  closeModal = () => {
    this.store.dispatch({
      intent: CLOSE_MODAL,
    });
  }

  setTableLoadingState = (isTableLoading) => {
    this.store.dispatch({
      intent: SET_TABLE_LOADING_STATE,
      isTableLoading,
    });
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

  render = () => {
    const supplierReturnPurchaseView = (
      <SupplierReturnPurchaseView
        onUpdatePurchaseOptions={this.updatePurchaseOptions}
        onUpdateTableAmountFields={this.updateTableAmountFields}
        onFormatAmountInput={this.formatAmountInput}
        onSaveButtonClick={this.createPurchaseReturn}
        onCancelButtonClick={this.confirmBeforeCancel}
        onDeleteButtonClick={this.confirmBeforeDelete}
        onConfirmCancel={this.confirmCancel}
        onConfirmDelete={this.confirmDelete}
        onCloseModal={this.closeModal}
        onDismissAlert={this.dismissAlert}
      />
    );

    const wrappedView = (
      <Provider store={this.store}>
        {supplierReturnPurchaseView}
      </Provider>
    );

    this.setRootView(wrappedView);
  };

  unsubscribeFromStore = () => {
    this.store.unsubscribeAll();
  };

  setLoadingState = (isLoading) => {
    this.store.dispatch({
      intent: SET_LOADING_STATE,
      isLoading,
    });
  }

  setSubmittingState = (isSubmitting) => {
    this.store.dispatch({
      intent: SET_SUBMITTING_STATE,
      isSubmitting,
    });
  }

  setInitialState = (context) => {
    const intent = SET_INITIAL_STATE;

    this.store.dispatch({
      intent,
      context,
    });
  }

  displayAlert = errorMessage => this.store.dispatch({
    intent: SET_ALERT,
    alertMessage: errorMessage,
  });

  dismissAlert = () => this.store.dispatch({
    intent: SET_ALERT,
    alertMessage: '',
  });

  resetState() {
    const intent = RESET_STATE;
    this.store.dispatch({
      intent,
    });
  }

  run = (context) => {
    this.setInitialState(context);
    this.render();
    this.setLoadingState(true);
    this.loadPurchaseReturn();
  }
}
