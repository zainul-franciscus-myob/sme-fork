import { Provider } from 'react-redux';
import React from 'react';

import {
  SUCCESSFULLY_DELETED_ITEM,
  SUCCESSFULLY_SAVED_ITEM,
} from '../../../common/types/MessageTypes';
import {
  getBusinessId,
  getIsActionsDisabled,
  getModalType,
  getRegion,
  isPageEdited,
} from './inventoryDetailSelectors';
import InventoryDetailView from './components/InventoryDetailView';
import LoadingState from '../../../components/PageView/LoadingState';
import Store from '../../../store/Store';
import createInventoryDetailDispatcher from './createInventoryDetailDisptacher';
import createInventoryDetailIntegrator from './createInventoryDetailIntegrator';
import inventoryDetailReducer from './inventoryDetailReducer';
import keyMap from '../../../hotKeys/keyMap';
import setupHotKeys from '../../../hotKeys/setupHotKeys';

export default class InventoryDetailModule {
  constructor({
    integration, setRootView, pushMessage,
  }) {
    this.store = new Store(inventoryDetailReducer);
    this.setRootView = setRootView;
    this.pushMessage = pushMessage;

    this.dispatcher = createInventoryDetailDispatcher(this.store);
    this.integrator = createInventoryDetailIntegrator(this.store, integration);
  }

  render = () => {
    const inventoryDetailView = (
      <InventoryDetailView
        onEnableForSellingChange={this.dispatcher.setEnableForSellingState}
        onEnableForBuyingChange={this.dispatcher.setEnableForBuyingState}
        onItemDetailsChange={this.dispatcher.updateItemDetails}
        onSellingDetailsChange={this.dispatcher.updateSellingDetails}
        onBuyingDetailsChange={this.dispatcher.updateBuyingDetails}
        onSaveButtonClick={this.saveInventoryDetail}
        onDeleteButtonClick={this.openDeleteModal}
        onCancelButtonClick={this.openCancelModal}
        onCloseModal={this.dispatcher.closeModal}
        onDeleteModal={this.deleteInventoryDetail}
        onCancelModal={this.redirectToInventoryList}
        onDismissAlert={this.dispatcher.dismissAlert}
      />
    );

    const wrappedView = (
      <Provider store={this.store}>
        {inventoryDetailView}
      </Provider>
    );
    this.setRootView(wrappedView);
  };

  loadInventoryDetail = () => {
    this.dispatcher.setLoadingState(LoadingState.LOADING);

    const onSuccess = (response) => {
      this.dispatcher.setLoadingState(LoadingState.LOADING_SUCCESS);
      this.dispatcher.loadInventoryDetail(response);
    };

    const onFailure = () => {
      this.dispatcher.setLoadingState(LoadingState.LOADING_FAIL);
    };

    this.integrator.loadInventoryDetail({ onSuccess, onFailure });
  };

  redirectToInventoryList = () => {
    const state = this.store.getState();
    const businessId = getBusinessId(state);
    const region = getRegion(state);

    window.location.href = `/#/${region}/${businessId}/inventory`;
  };

  saveInventoryDetail = () => {
    if (getIsActionsDisabled(this.store.getState())) return;

    this.dispatcher.setSubmittingState(true);

    const onSuccess = ({ message }) => {
      this.dispatcher.setSubmittingState(false);
      this.pushMessage({
        type: SUCCESSFULLY_SAVED_ITEM,
        content: message,
      });
      this.redirectToInventoryList();
    };

    const onFailure = ({ message }) => {
      this.dispatcher.setSubmittingState(false);
      this.dispatcher.displayAlert(message);
    };

    this.integrator.saveInventoryDetail({ onSuccess, onFailure });
  };

  deleteInventoryDetail = () => {
    this.dispatcher.setSubmittingState(true);
    this.dispatcher.closeModal();

    const onSuccess = ({ message }) => {
      this.pushMessage({
        type: SUCCESSFULLY_DELETED_ITEM,
        content: message,
      });
      this.redirectToInventoryList();
    };

    const onFailure = ({ message }) => {
      this.dispatcher.setSubmittingState(false);
      this.dispatcher.displayAlert(message);
    };

    this.integrator.deleteInventoryDetail({ onSuccess, onFailure });
  };

  openCancelModal = () => {
    const state = this.store.getState();
    if (isPageEdited(state)) {
      this.dispatcher.openModal('cancel');
    } else {
      this.redirectToInventoryList();
    }
  };

  openDeleteModal = () => {
    this.dispatcher.openModal('delete');
  };

  saveHandler = () => {
    const state = this.store.getState();
    const modalType = getModalType(state);
    if (modalType) return;

    this.saveInventoryDetail();
  };

  handlers = {
    SAVE_ACTION: this.saveHandler,
  };

  run(context) {
    this.dispatcher.setInitialState(context);
    setupHotKeys(keyMap, this.handlers);
    this.render();
    this.loadInventoryDetail();
  }

  unsubscribeFromStore = () => this.store.unsubscribeAll();

  resetState = () => this.dispatcher.resetState();
}
