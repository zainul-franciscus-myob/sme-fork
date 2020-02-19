import { Provider } from 'react-redux';
import React from 'react';

import { SUCCESSFULLY_DELETED_APPLY_TO_SALE, SUCCESSFULLY_SAVED_APPLY_TO_SALE } from './ApplyToSaleMessageType';
import {
  getBusinessId,
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
import createApplyToSaleDispatcher from './createApplyToSaleDispatcher';
import createApplyToSaleIntegrator from './createApplyToSaleIntegrator';
import keyMap from '../../hotKeys/keyMap';
import setupHotKeys from '../../hotKeys/setupHotKeys';

export default class ApplyToSaleModule {
  constructor({ integration, setRootView, pushMessage }) {
    this.integration = integration;
    this.setRootView = setRootView;
    this.pushMessage = pushMessage;
    this.store = new Store(applyToSaleReducer);
    this.dispatcher = createApplyToSaleDispatcher(this.store);
    this.integrator = createApplyToSaleIntegrator(this.store, integration);
  }

  loadApplyToSale = () => {
    this.dispatcher.setIsLoading(true);

    const isCreating = getIsCreating(this.store.getState());

    const onSuccess = (applyToSale) => {
      this.dispatcher.setIsLoading(false);
      this.dispatcher.loadApplyToSale({ applyToSale, isCreating });
    };

    const onFailure = ({ message }) => {
      this.dispatcher.setIsLoading(false);
      this.dispatcher.setAlertMessage(message);
    };

    this.integrator.loadApplyToSale({ isCreating, onSuccess, onFailure });
  }

  createApplyToSale = () => {
    const state = this.store.getState();
    if (getIsSubmitting(state)) return;

    this.dispatcher.setIsSubmitting(true);

    const onSuccess = ({ message }) => {
      this.pushMessage({
        type: SUCCESSFULLY_SAVED_APPLY_TO_SALE,
        content: message,
      });
      this.redirectToCustomerReturnList();
    };

    const onFailure = ({ message }) => {
      this.dispatcher.setIsSubmitting(false);
      this.dispatcher.setAlertMessage(message);
    };
    this.integrator.createApplyToSale({ onSuccess, onFailure });
  }

  deleteApplyToSale = () => {
    this.dispatcher.setIsSubmitting(true);

    const onSuccess = ({ message }) => {
      this.pushMessage({
        type: SUCCESSFULLY_DELETED_APPLY_TO_SALE,
        content: message,
      });
      this.redirectToTransactionList();
    };

    const onFailure = ({ message }) => {
      this.dispatcher.setIsSubmitting(false);
      this.dispatcher.setAlertMessage(message);
    };

    this.integrator.deleteApplyToSale({ onSuccess, onFailure });
  }

  cancelApplyToSale = () => {
    this.redirectToCustomerReturnList();
  }

  updateApplyToSaleOption = ({ key, value }) => {
    this.dispatcher.updateApplyToSaleOption({ key, value });
    this.dispatcher.setIsPageEdited(true);
  };

  updateTableAmountInput = ({ key, value, index }) => {
    this.dispatcher.updateTableAmountInput({
      key,
      value,
      index,
    });
    this.dispatcher.setIsPageEdited(true);
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
      this.dispatcher.setModalType(ModalType.CANCEL);
    } else {
      this.redirectToCustomerReturnList();
    }
  }

  openDeleteModal = () => {
    this.dispatcher.setModalType(ModalType.DELETE);
  }

  dismissModal = () => {
    this.dispatcher.setModalType('');
  }

  dismissAlert = () => {
    this.dispatcher.setAlertMessage('');
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

  run = (context) => {
    this.dispatcher.setInitialState(context);
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
    this.dispatcher.resetState();
  }
}
