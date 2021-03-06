import { Provider } from 'react-redux';
import React from 'react';

import {
  SUCCESSFULLY_DELETED_SUPER_PAY_ITEM,
  SUCCESSFULLY_SAVED_SUPER_PAY_ITEM,
} from '../../../common/types/MessageTypes';
import {
  getBusinessId,
  getIsPageEdited,
  getIsSubmitting,
  getModalType,
  getRegion,
  getUpdatedSuperPayItem,
  getUpdatedSuperPayItemForSave,
} from './superPayItemSelectors';
import LoadingState from '../../../components/PageView/LoadingState';
import Store from '../../../store/Store';
import SuperPayItemView from './component/SuperPayItemView';
import createSuperPayItemDispatcher from './createSuperPayItemDispatcher';
import createSuperPayItemIntegrator from './createSuperPayItemIntegrator';
import keyMap from '../../../hotKeys/keyMap';
import setupHotKeys from '../../../hotKeys/setupHotKeys';
import superPayItemReducer from './superPayItemReducer';

export default class SuperPayItemModule {
  constructor({ integration, setRootView, pushMessage }) {
    this.setRootView = setRootView;
    this.store = new Store(superPayItemReducer);
    this.dispatcher = createSuperPayItemDispatcher(this.store);
    this.integrator = createSuperPayItemIntegrator(this.store, integration);
    this.pushMessage = pushMessage;
  }

  loadSuperPayItem = () => {
    this.dispatcher.setLoadingState(LoadingState.LOADING);

    const onSuccess = (response) => {
      this.dispatcher.setLoadingState(LoadingState.LOADING_SUCCESS);
      this.dispatcher.loadSuperPayItem(response);
    };

    const onFailure = () => {
      this.dispatcher.setLoadingState(LoadingState.LOADING_FAIL);
    };

    this.integrator.loadSuperPayItem({ onSuccess, onFailure });
  };

  createOrUpdateSuperPayItem = () => {
    if (getIsSubmitting(this.store.getState())) return;

    this.dispatcher.setSubmittingState(true);

    const state = this.store.getState();
    const updatedSuperPayItem = getUpdatedSuperPayItemForSave(state);
    this.dispatcher.setSuperPayItem(updatedSuperPayItem);

    const onSuccess = ({ message }) => {
      this.pushMessage({
        type: SUCCESSFULLY_SAVED_SUPER_PAY_ITEM,
        content: message,
      });
      this.dispatcher.setSubmittingState(false);
      this.redirectToSuperPayItemList();
    };

    const onFailure = (error) => {
      this.dispatcher.setSubmittingState(false);
      this.dispatcher.setAlert({ type: 'danger', message: error.message });
    };

    this.integrator.createOrUpdateSuperPayItem({ onSuccess, onFailure });
  };

  deleteSuperPayItem = () => {
    this.dispatcher.setSubmittingState(true);

    const onSuccess = ({ message }) => {
      this.pushMessage({
        type: SUCCESSFULLY_DELETED_SUPER_PAY_ITEM,
        content: message,
      });
      this.dispatcher.setSubmittingState(false);
      this.redirectToSuperPayItemList();
    };

    const onFailure = (error) => {
      this.dispatcher.setSubmittingState(false);
      this.dispatcher.setAlert({ type: 'danger', message: error.message });
    };

    this.integrator.deleteSuperPayItem({ onSuccess, onFailure });
  };

  confirmBeforeDelete = () => {
    this.dispatcher.openModal('delete');
  };

  confirmDelete = () => {
    this.dispatcher.closeModal();

    this.deleteSuperPayItem();
  };

  confirmBeforeCancel = () => {
    const state = this.store.getState();
    const isEdited = getIsPageEdited(state);

    if (isEdited) {
      this.dispatcher.openModal('cancel');
    } else {
      this.redirectToSuperPayItemList();
    }
  };

  confirmCancel = () => {
    this.dispatcher.closeModal();
    this.redirectToSuperPayItemList();
  };

  redirectToSuperPayItemList = () => {
    const state = this.store.getState();
    const businessId = getBusinessId(state);
    const region = getRegion(state);

    window.location.href = `/#/${region}/${businessId}/payItem?tab=superannuation`;
  };

  setSuperPayItemDetail = ({ key, value }) => {
    this.dispatcher.setSuperPayItemDetail({ key, value });

    if (key === 'contributionType') {
      const state = this.store.getState();

      const updatedSuperPayItem = getUpdatedSuperPayItem(state);
      this.dispatcher.setSuperPayItem(updatedSuperPayItem);
    }
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

    this.createOrUpdateSuperPayItem();
  };

  handlers = {
    SAVE_ACTION: this.saveHandler,
  };

  run(context) {
    this.dispatcher.setInitialState(context);
    setupHotKeys(keyMap, this.handlers);
    this.render();
    this.loadSuperPayItem();
  }

  render = () => {
    const view = (
      <SuperPayItemView
        onDismissAlert={this.dispatcher.dismissAlert}
        onConfirmCancel={this.confirmCancel}
        onConfirmDelete={this.confirmDelete}
        onCloseModal={this.dispatcher.closeModal}
        onRefundDetailsChange={this.dispatcher.setRefundDetail}
        onSaveButtonClick={this.createOrUpdateSuperPayItem}
        onCancelButtonClick={this.confirmBeforeCancel}
        onDeleteButtonClick={this.confirmBeforeDelete}
        onSuperPayItemDetailsChange={this.setSuperPayItemDetail}
        onAddSuperPayItemEmployee={this.dispatcher.addSuperPayItemEmployee}
        onRemoveSuperPayItemEmployee={
          this.dispatcher.removeSuperPayItemEmployee
        }
        onAddSuperPayItemExemption={this.dispatcher.addSuperPayItemExemption}
        onRemoveSuperPayItemExemption={
          this.dispatcher.removeSuperPayItemExemption
        }
      />
    );

    const wrappedView = <Provider store={this.store}>{view}</Provider>;

    this.setRootView(wrappedView);
  };
}
