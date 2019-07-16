import { Provider } from 'react-redux';
import React from 'react';

import {
  ADD_EMPLOYEE,
  ADD_EXEMPTION,
  CLOSE_MODAL,
  CREATE_PAY_ITEM,
  DELETE_PAY_ITEM,
  LOAD_EXISTING_PAY_ITEM,
  LOAD_NEW_PAY_ITEM,
  OPEN_MODAL,
  REMOVE_EMPLOYEE,
  REMOVE_EXEMPTION,
  SET_ALERT,
  SET_IS_SUBMITTING,
  SET_LOADING_STATE,
  UPDATE_DETAILS,
  UPDATE_INFORMATION,
  UPDATE_INFORMATION_AMOUNT,
  UPDATE_PAY_ITEM,
} from '../DeductionPayItemIntents';
import {
  RESET_STATE,
  SET_INITIAL_STATE,
} from '../../../SystemIntents';
import {
  SUCCESSFULLY_DELETED_PAY_ITEM,
  SUCCESSFULLY_SAVED_PAY_ITEM,
} from '../DeductionPayItemMessageTypes';
import {
  getBusinessId, getIsCreating, getIsPageEdited,
  getPayItemId, getRegion, getSaveDeductionPayItemPayload,
} from './DeductionPayItemSelectors';
import DeductionPayItemView from './components/DeductionPayItemView';
import Store from '../../../store/Store';
import deductionPayItemReducer from './deductionPayItemReducer';

export default class DeductionPayItemModule {
  constructor({
    integration, setRootView, pushMessage,
  }) {
    this.integration = integration;
    this.store = new Store(deductionPayItemReducer);
    this.setRootView = setRootView;
    this.pushMessage = pushMessage;
  }

  setInitialState = (context) => {
    this.store.dispatch({
      intent: SET_INITIAL_STATE,
      context,
    });
  }

  setLoadingState = (isLoading) => {
    this.store.dispatch({
      intent: SET_LOADING_STATE,
      isLoading,
    });
  }

  loadPayItem = () => {
    const state = this.store.getState();
    const intent = getIsCreating(state) ? LOAD_NEW_PAY_ITEM : LOAD_EXISTING_PAY_ITEM;

    const onSuccess = (payload) => {
      this.setLoadingState(false);

      this.store.dispatch({
        intent,
        ...payload,
      });
    };

    const onFailure = () => {
      console.log('Failed to load new deduction pay item');
    };

    this.setLoadingState(true);
    this.integration.read({
      intent,
      urlParams: {
        businessId: getBusinessId(this.store.getState()),
        payItemId: getPayItemId(state),
      },
      onSuccess,
      onFailure,
    });
  }

  updatePayItemDetails = ({ key, value }) => this.store.dispatch({
    intent: UPDATE_DETAILS,
    key,
    value,
  })

  updatePayItemInformation = ({ key, value }) => this.store.dispatch({
    intent: UPDATE_INFORMATION,
    key,
    value,
  })

  updatePayItemInformationAmount = ({ key, value }) => this.store.dispatch({
    intent: UPDATE_INFORMATION_AMOUNT,
    key,
    value,
  })

  addEmployeeToSelectedList = ({ key, value }) => this.store.dispatch({
    intent: ADD_EMPLOYEE,
    key,
    value,
  })

  removeEmployeeFromSelectedList = id => this.store.dispatch({
    intent: REMOVE_EMPLOYEE,
    id,
  })

  addExemptionToSelectedList = ({ key, value }) => this.store.dispatch({
    intent: ADD_EXEMPTION,
    key,
    value,
  })

  removeExemptionFromSelectedList = id => this.store.dispatch({
    intent: REMOVE_EXEMPTION,
    id,
  })

  openModal = modalType => this.store.dispatch({ intent: OPEN_MODAL, modalType });

  closeModal = () => this.store.dispatch({ intent: CLOSE_MODAL });

  confirmBeforeDelete = () => {
    this.openModal('delete');
  }

  confirmBeforeCancel = () => {
    if (getIsPageEdited(this.store.getState())) {
      this.openModal('cancel');
    } else {
      this.redirectToDeductionList();
    }
  }

  confirmCancel = () => {
    this.closeModal();
    this.redirectToDeductionList();
  }

  deleteDeductionPayItem = () => {
    this.setIsSubmitting(true);

    const onSuccess = ({ message }) => {
      this.pushMessage({
        type: SUCCESSFULLY_DELETED_PAY_ITEM,
        content: message,
      });
      this.setIsSubmitting(false);
      this.redirectToDeductionList();
    };

    const onFailure = ({ message }) => {
      this.setAlert(message);
      this.setIsSubmitting(false);
    };

    const state = this.store.getState();
    this.integration.write({
      intent: DELETE_PAY_ITEM,
      urlParams: { businessId: getBusinessId(state), payItemId: getPayItemId(state) },
      onSuccess,
      onFailure,
    });
  }

  confirmDelete = () => {
    this.closeModal();
    this.deleteDeductionPayItem();
  }

  redirectToDeductionList = () => {
    const state = this.store.getState();
    const businessId = getBusinessId(state);
    const region = getRegion(state);

    window.location.href = `/#/${region}/${businessId}/payItem?tab=deductions`;
  }

  setIsSubmitting = isSubmitting => this.store.dispatch({
    intent: SET_IS_SUBMITTING,
    isSubmitting,
  })

  savePayItemDeduction = () => {
    this.setIsSubmitting(true);

    const state = this.store.getState();
    const payItemPayload = getSaveDeductionPayItemPayload(state);

    const onSuccess = ({ message }) => {
      this.pushMessage({
        type: SUCCESSFULLY_SAVED_PAY_ITEM,
        content: message,
      });
      this.setIsSubmitting(false);
      this.redirectToDeductionList();
    };

    const onFailure = ({ message }) => {
      this.setIsSubmitting(false);
      this.setAlert(message);
    };

    const intent = getIsCreating(state) ? CREATE_PAY_ITEM : UPDATE_PAY_ITEM;
    this.integration.write({
      intent,
      urlParams: { businessId: getBusinessId(state), payItemId: getPayItemId(state) },
      content: payItemPayload,
      onSuccess,
      onFailure,
    });
  }

  dismissAlert = () => this.store.dispatch({
    intent: SET_ALERT,
    alert: undefined,
  })

  setAlert = message => this.store.dispatch({
    intent: SET_ALERT,
    alert: {
      type: 'danger',
      message,
    },
  })

  run(context) {
    this.setInitialState(context);
    this.render();
    this.loadPayItem();
  }

  render = () => {
    this.setRootView((
      <Provider store={this.store}>
        <DeductionPayItemView
          onDetailsChange={this.updatePayItemDetails}
          onInformationChange={this.updatePayItemInformation}
          onInformationAmountBlur={this.updatePayItemInformationAmount}
          onEmployeeSelected={this.addEmployeeToSelectedList}
          onRemoveEmployee={this.removeEmployeeFromSelectedList}
          onRemoveExemption={this.removeExemptionFromSelectedList}
          onExemptionSelected={this.addExemptionToSelectedList}
          onSaveButtonClick={this.savePayItemDeduction}
          onCancelButtonClick={this.confirmBeforeCancel}
          onDeleteButtonClick={this.confirmBeforeDelete}
          onConfirmCancel={this.confirmCancel}
          onConfirmDelete={this.confirmDelete}
          onCloseModal={this.closeModal}
          onDismissAlert={this.dismissAlert}
        />
      </Provider>
    ));
  }

  resetState() {
    const intent = RESET_STATE;
    this.store.dispatch({
      intent,
    });
  }

  unsubscribeFromStore= () => {
    this.store.unsubscribeAll();
  }
}
