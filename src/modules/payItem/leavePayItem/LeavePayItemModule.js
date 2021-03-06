import { Provider } from 'react-redux';
import React from 'react';

import {
  SUCCESSFULLY_DELETED_LEAVE_PAY_ITEM,
  SUCCESSFULLY_SAVED_LEAVE_PAY_ITEM,
} from '../../../common/types/MessageTypes';
import {
  getBusinessId,
  getIsPageEdited,
  getIsSubmitting,
  getModalType,
  getRegion,
} from './leavePayItemSelectors';
import LeavePayItemView from './component/LeavePayItemView';
import LoadingState from '../../../components/PageView/LoadingState';
import Store from '../../../store/Store';
import createLeavePayItemDispatcher from './createLeavePayItemDispatcher';
import createLeavePayItemIntegrator from './createLeavePayItemIntegrator';
import keyMap from '../../../hotKeys/keyMap';
import leavePayItemReducer from './leavePayItemReducer';
import setupHotKeys from '../../../hotKeys/setupHotKeys';

export default class LeavePayItemModule {
  constructor({ integration, setRootView, pushMessage }) {
    this.setRootView = setRootView;
    this.store = new Store(leavePayItemReducer);
    this.dispatcher = createLeavePayItemDispatcher(this.store);
    this.integrator = createLeavePayItemIntegrator(this.store, integration);
    this.pushMessage = pushMessage;
  }

  loadLeavePayItem = () => {
    this.dispatcher.setLoadingState(LoadingState.LOADING);

    const onSuccess = (response) => {
      this.dispatcher.setLoadingState(LoadingState.LOADING_SUCCESS);
      this.dispatcher.loadLeavePayItem(response);
    };

    const onFailure = () => {
      this.dispatcher.setLoadingState(LoadingState.LOADING_FAIL);
    };

    this.integrator.loadLeavePayItem({ onSuccess, onFailure });
  };

  saveLeavePayItem = () => {
    if (getIsSubmitting(this.store.getState())) return;

    this.dispatcher.setSubmittingState(true);

    const onSuccess = ({ message }) => {
      this.pushMessage({
        type: SUCCESSFULLY_SAVED_LEAVE_PAY_ITEM,
        content: message,
      });
      this.dispatcher.setSubmittingState(false);
      this.redirectToLeavePayItemList();
    };

    const onFailure = (error) => {
      this.dispatcher.setSubmittingState(false);
      this.dispatcher.setAlert({ type: 'danger', message: error.message });
    };

    this.integrator.saveLeavePayItem({ onSuccess, onFailure });
  };

  deleteLeavePayItem = () => {
    this.dispatcher.setSubmittingState(true);

    const onSuccess = ({ message }) => {
      this.pushMessage({
        type: SUCCESSFULLY_DELETED_LEAVE_PAY_ITEM,
        content: message,
      });
      this.dispatcher.setSubmittingState(false);
      this.redirectToLeavePayItemList();
    };

    const onFailure = (error) => {
      this.dispatcher.setSubmittingState(false);
      this.dispatcher.setAlert({ type: 'danger', message: error.message });
    };

    this.integrator.deleteLeavePayItem({ onSuccess, onFailure });
  };

  confirmBeforeDelete = () => {
    this.dispatcher.openModal('delete');
  };

  confirmDelete = () => {
    this.dispatcher.closeModal();
    this.deleteLeavePayItem();
  };

  confirmBeforeCancel = () => {
    const state = this.store.getState();
    const isEdited = getIsPageEdited(state);

    if (isEdited) {
      this.dispatcher.openModal('cancel');
    } else {
      this.redirectToLeavePayItemList();
    }
  };

  confirmCancel = () => {
    this.dispatcher.closeModal();
    this.redirectToLeavePayItemList();
  };

  redirectToLeavePayItemList = () => {
    const state = this.store.getState();
    const businessId = getBusinessId(state);
    const region = getRegion(state);

    window.location.href = `/#/${region}/${businessId}/payItem?tab=leave`;
  };

  resetState = () => {
    this.dispatcher.resetState();
  };

  unsubscribeFromStore = () => {
    this.store.unsubscribeAll();
  };

  saveHandler = () => {
    const state = this.store.getState();
    const modalType = getModalType(state);
    if (modalType) return;

    this.saveLeavePayItem();
  };

  handlers = {
    SAVE_ACTION: this.saveHandler,
  };

  run(context) {
    this.dispatcher.setInitialState(context);
    setupHotKeys(keyMap, this.handlers);
    this.render();
    this.loadLeavePayItem();
  }

  render = () => {
    const view = (
      <LeavePayItemView
        onDismissAlert={this.dispatcher.dismissAlert}
        onConfirmCancel={this.confirmCancel}
        onConfirmDelete={this.confirmDelete}
        onCloseModal={this.dispatcher.closeModal}
        onCancelButtonClick={this.confirmBeforeCancel}
        onDeleteButtonClick={this.confirmBeforeDelete}
        onSaveButtonClick={this.saveLeavePayItem}
        onAddEmployee={this.dispatcher.addEmployee}
        onRemoveEmployee={this.dispatcher.removeEmployee}
        onAddExemption={this.dispatcher.addExemption}
        onRemoveExemption={this.dispatcher.removeExemption}
        onAddLinkedWage={this.dispatcher.addLinkedWage}
        onRemoveLinkedWage={this.dispatcher.removeLinkedWage}
        onCalculationBasisChange={this.dispatcher.updateCalculationBasis}
        onCalculationBasisAmountChange={
          this.dispatcher.updateCalculationBasisAmount
        }
        onNameChange={this.dispatcher.updateName}
      />
    );

    const wrappedView = <Provider store={this.store}>{view}</Provider>;

    this.setRootView(wrappedView);
  };
}
