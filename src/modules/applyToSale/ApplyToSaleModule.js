import { Provider } from 'react-redux';
import React from 'react';

import {
  CREATE_APPLY_TO_SALE,
  DELETE_APPLY_TO_SALE,
  FORMAT_TABLE_AMOUNT_INPUT,
  LOAD_APPLY_TO_SALE,
  LOAD_NEW_APPLY_TO_SALE,
  SET_ALERT_MESSAGE,
  SET_IS_LOADING,
  SET_IS_PAGE_EDITED,
  SET_IS_SUBMITTING,
  SET_MODAL_TYPE,
  UPDATE_APPLY_TO_SALE_OPTION,
  UPDATE_TABLE_AMOUNT_INPUT,
} from './ApplyToSaleIntents';
import { RESET_STATE, SET_INITIAL_STATE } from '../../SystemIntents';
import { SUCCESSFULLY_DELETED_APPLY_TO_SALE, SUCCESSFULLY_SAVED_APPLY_TO_SALE } from './ApplyToSaleMessageType';
import {
  getApplyToSaleId,
  getBusinessId,
  getCreateApplyToSalePayload,
  getCustomerReturnId,
  getIsCreating,
  getIsPageEdited,
  getIsSubmitting,
  getModalType,
  getRegion,
} from './applyToSaleSelectors';
import ApplyToSaleView from './components/ApplyToSaleView';
import ModalType from './ModalType';
import Store from '../../store/Store';
import applyToSaleReducer from './applyToSaleReducer';
import keyMap from '../../hotKeys/keyMap';
import setupHotKeys from '../../hotKeys/setupHotKeys';

export default class ApplyToSaleModule {
  constructor({ integration, setRootView, pushMessage }) {
    this.integration = integration;
    this.setRootView = setRootView;
    this.pushMessage = pushMessage;
    this.store = new Store(applyToSaleReducer);
  }

  loadApplyToSale = () => {
    const state = this.store.getState();
    const isCreating = getIsCreating(state);
    const intent = isCreating ? LOAD_NEW_APPLY_TO_SALE : LOAD_APPLY_TO_SALE;
    const urlParams = isCreating ? {
      businessId: getBusinessId(state),
      customerReturnId: getCustomerReturnId(state),
    } : {
      businessId: getBusinessId(state),
      applyToSaleId: getApplyToSaleId(state),
    };

    this.setIsLoading(true);

    const onSuccess = (applyToSale) => {
      this.setIsLoading(false);

      this.store.dispatch({
        intent,
        applyToSale,
      });
    };

    const onFailure = ({ message }) => {
      this.setIsLoading(false);
      this.setAlertMessage(message);
    };

    this.integration.read({
      intent,
      urlParams,
      onSuccess,
      onFailure,
    });
  }

  createApplyToSale = () => {
    const state = this.store.getState();
    if (getIsSubmitting(state)) return;

    this.setIsSubmitting(true);

    const urlParams = {
      businessId: getBusinessId(state),
    };
    const content = getCreateApplyToSalePayload(state);

    const onSuccess = ({ message }) => {
      this.pushMessage({
        type: SUCCESSFULLY_SAVED_APPLY_TO_SALE,
        content: message,
      });
      this.redirectToCustomerReturnList();
    };

    const onFailure = ({ message }) => {
      this.setIsSubmitting(false);
      this.setAlertMessage(message);
    };

    this.integration.write({
      intent: CREATE_APPLY_TO_SALE,
      urlParams,
      content,
      onSuccess,
      onFailure,
    });
  }

  deleteApplyToSale = () => {
    this.setIsSubmitting(true);

    const state = this.store.getState();
    const urlParams = {
      businessId: getBusinessId(state),
      applyToSaleId: getApplyToSaleId(state),
    };

    const onSuccess = ({ message }) => {
      this.pushMessage({
        type: SUCCESSFULLY_DELETED_APPLY_TO_SALE,
        content: message,
      });
      this.redirectToTransactionList();
    };

    const onFailure = ({ message }) => {
      this.setIsSubmitting(false);
      this.setAlertMessage(message);
    };

    this.integration.write({
      intent: DELETE_APPLY_TO_SALE,
      urlParams,
      onSuccess,
      onFailure,
    });
  }

  cancelApplyToSale = () => {
    this.redirectToCustomerReturnList();
  }

  updateApplyToSaleOption = ({ key, value }) => {
    this.store.dispatch({
      intent: UPDATE_APPLY_TO_SALE_OPTION,
      key,
      value,
    });
    this.setIsPageEdited(true);
  };

  updateTableAmountInput = ({ key, value, index }) => {
    this.store.dispatch({
      intent: UPDATE_TABLE_AMOUNT_INPUT,
      key,
      value,
      index,
    });
    this.setIsPageEdited(true);
  }

  formatTableAmountInput = ({ index }) => {
    this.store.dispatch({
      intent: FORMAT_TABLE_AMOUNT_INPUT,
      index,
    });
  }

  redirectToCustomerReturnList = () => {
    const state = this.store.getState();
    const businessId = getBusinessId(state);
    const region = getRegion(state);

    window.location.href = `/#/${region}/${businessId}/customerReturn`;
  };

  redirectToTransactionList = () => {
    const state = this.store.getState();
    const businessId = getBusinessId(state);
    const region = getRegion(state);

    window.location.href = `/#/${region}/${businessId}/transactionList`;
  }

  openCancelModal = () => {
    const state = this.store.getState();
    if (getIsPageEdited(state)) {
      this.setModalType(ModalType.CANCEL);
    } else {
      this.redirectToCustomerReturnList();
    }
  }

  openDeleteModal = () => {
    this.setModalType(ModalType.DELETE);
  }

  dismissModal = () => {
    this.setModalType('');
  }

  dismissAlert = () => {
    this.setAlertMessage('');
  }

  setModalType = (modalType) => {
    this.store.dispatch({
      intent: SET_MODAL_TYPE,
      modalType,
    });
  }

  setAlertMessage = (alertMessage) => {
    this.store.dispatch({
      intent: SET_ALERT_MESSAGE,
      alertMessage,
    });
  }

  setIsLoading = (isLoading) => {
    this.store.dispatch({
      intent: SET_IS_LOADING,
      isLoading,
    });
  }

  setIsSubmitting = (isSubmitting) => {
    this.store.dispatch({
      intent: SET_IS_SUBMITTING,
      isSubmitting,
    });
  }

  setIsPageEdited = (isPageEdited) => {
    this.store.dispatch({
      intent: SET_IS_PAGE_EDITED,
      isPageEdited,
    });
  }

  saveHandler = () => {
    const state = this.store.getState();
    const modalType = getModalType(state);
    if (modalType) return;

    this.createApplyToSale();
  }

  handlers = {
    SAVE_ACTION: this.saveHandler,
  };

  setInitialState = (context) => {
    this.store.dispatch({
      intent: SET_INITIAL_STATE,
      context,
    });
  };

  run = (context) => {
    this.setInitialState(context);
    setupHotKeys(keyMap, this.handlers);
    this.render();
    this.loadApplyToSale();
  };

  render = () => {
    const wrappedView = (
      <Provider store={this.store}>
        <ApplyToSaleView
          onUpdateApplyToSaleOption={this.updateApplyToSaleOption}
          onUpdateTableAmountInput={this.updateTableAmountInput}
          onBlurTableAmountInput={this.formatTableAmountInput}
          onSaveButtonClick={this.createApplyToSale}
          onCancelButtonClick={this.openCancelModal}
          onDeleteButtonClick={this.openDeleteModal}
          onGoBackButtonClick={this.redirectToTransactionList}
          onDismissModal={this.dismissModal}
          onDismissAlert={this.dismissAlert}
          onConfirmCancelButtonClick={this.cancelApplyToSale}
          onConfirmDeleteButtonClick={this.deleteApplyToSale}
        />
      </Provider>
    );

    this.setRootView(wrappedView);
  };

  unsubscribeFromStore = () => {
    this.store.unsubscribeAll();
  };

  resetState() {
    this.store.dispatch({
      intent: RESET_STATE,
    });
  }
}
