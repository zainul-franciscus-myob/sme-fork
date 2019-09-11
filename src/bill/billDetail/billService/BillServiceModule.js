import { Provider } from 'react-redux';
import React from 'react';

import { SUCCESSFULLY_DELETED_BILL_SERVICE, SUCCESSFULLY_SAVED_BILL_SERVICE } from '../billMessageTypes';
import {
  getBusinessId,
  getIsCreating,
  getIsTableEmpty,
  getRegion,
  isPageEdited,
} from './billServiceSelectors';
import BillServiceView from './components/BillServiceView';
import Store from '../../../store/Store';
import billServiceReducer from './billServiceReducer';
import createBillServiceDispatcher from './createBillServiceDispatcher';
import createBillServiceIntegrator from './createBillServiceIntegrator';
import keyMap from '../../../hotKeys/keyMap';
import setupHotKeys from '../../../hotKeys/setupHotKeys';

export default class BillServiceModule {
  constructor({
    integration, setRootView, pushMessage,
  }) {
    this.integration = integration;
    this.setRootView = setRootView;
    this.pushMessage = pushMessage;
    this.store = new Store(billServiceReducer);
    this.dispatcher = createBillServiceDispatcher(this.store);
    this.integrator = createBillServiceIntegrator(this.store, this.integration);
  }

  getCalculatedTotals = () => {
    const state = this.store.getState();
    if (getIsTableEmpty(state)) {
      this.dispatcher.resetTotals();
      return;
    }
    const onSuccess = ({ totals }) => this.dispatcher.getCalculatedBillTotals(totals);
    const onFailure = error => this.dispatcher.displayAlert(error.message);

    this.integrator.getCalculatedTotals({ onSuccess, onFailure });
  }

  loadSupplierAddress = () => {
    const onSuccess = ({ address }) => this.dispatcher.loadSupplierAddress(address);
    const onFailure = (error) => {
      this.dispatcher.displayAlert(error.message);
      this.dispatcher.loadSupplierAddress('');
    };

    this.integrator.loadSupplierAddress({ onSuccess, onFailure });
  }

  updateHeaderOptions = ({ key, value }) => {
    this.dispatcher.updateHeaderOptions({ key, value });

    const taxKeys = ['taxInclusive'];
    if (taxKeys.includes(key)) {
      this.getCalculatedTotals();
    }

    if (key === 'contactId') {
      this.loadSupplierAddress();
    }
  }

  updateTableLine = ({ index, key, value }) => {
    this.dispatcher.updateTableLine({ index, key, value });

    const taxKeys = ['allocatedAccountId', 'taxCodeId'];
    if (taxKeys.includes(key)) {
      this.getCalculatedTotals();
    }
  }

  removeTableLineAndCalculateTotals = (index) => {
    this.dispatcher.removeTableLine(index);
    this.getCalculatedTotals();
  }

  redirectToBillList= () => {
    const state = this.store.getState();
    const businessId = getBusinessId(state);
    const region = getRegion(state);

    window.location.href = `/#/${region}/${businessId}/bill`;
  }

  openCancelModal = () => {
    if (isPageEdited(this.store.getState())) {
      this.dispatcher.openModal('cancel');
    } else {
      this.redirectToBillList();
    }
  };

  openDeleteModal = () => this.dispatcher.openModal('delete');

  updateBillServiceEntry = ({ onSuccess, onFailure }) => {
    this.integrator.updateBillServiceEntry({ onSuccess, onFailure });
  }

  createBillServiceEntry = ({ onSuccess, onFailure }) => {
    this.integrator.createBillServiceEntry({ onSuccess, onFailure });
  }

  deleteBillEntry = () => {
    this.dispatcher.setSubmittingState(true);
    this.dispatcher.closeModal();

    const onSuccess = ({ message }) => {
      this.dispatcher.setSubmittingState(false);
      this.pushMessage({
        type: SUCCESSFULLY_DELETED_BILL_SERVICE,
        content: message,
      });
      this.redirectToBillList();
    };

    const onFailure = ({ message }) => {
      this.dispatcher.setSubmittingState(false);
      this.dispatcher.displayAlert(message);
    };

    this.integrator.deleteBillEntry({ onSuccess, onFailure });
  }

  formatAndCalculateTotals = (index) => {
    this.dispatcher.formatLine(index);
    this.getCalculatedTotals();
  }

  saveBill = () => {
    this.dispatcher.setSubmittingState(true);

    const onSuccess = ({ message }) => {
      this.dispatcher.setSubmittingState(false);
      this.pushMessage({
        type: SUCCESSFULLY_SAVED_BILL_SERVICE,
        content: message,
      });
      this.redirectToBillList();
    };

    const onFailure = ({ message }) => {
      this.dispatcher.setSubmittingState(false);
      this.dispatcher.displayAlert(message);
    };

    const isCreating = getIsCreating(this.store.getState());

    if (isCreating) {
      this.createBillServiceEntry({ onSuccess, onFailure });
    } else {
      this.updateBillServiceEntry({ onSuccess, onFailure });
    }
  }

  render = () => {
    const billServiceView = (
      <BillServiceView
        onUpdateHeaderOptions={this.updateHeaderOptions}
        onUpdateRow={this.updateTableLine}
        onAddRow={this.dispatcher.addTableLine}
        onRemoveRow={this.removeTableLineAndCalculateTotals}
        onRowInputBlur={this.formatAndCalculateTotals}
        onSaveButtonClick={this.saveBill}
        onCancelButtonClick={this.openCancelModal}
        onCloseModal={this.dispatcher.closeModal}
        onCancelModal={this.redirectToBillList}
        onDeleteButtonClick={this.openDeleteModal}
        onDeleteModal={this.deleteBillEntry}
        onDismissAlert={this.dispatcher.dismissAlert}
      />
    );

    const wrappedView = (
      <Provider store={this.store}>
        {billServiceView}
      </Provider>
    );
    this.setRootView(wrappedView);
  }

  unsubscribeFromStore = () => {
    this.store.unsubscribeAll();
  }

  setInitialState = (context, payload) => this.dispatcher.setInitialState(context, payload);

  handlers = {
    SAVE_ACTION: this.saveBill,
  };

  run({ context, payload }) {
    this.setInitialState(context, payload);
    setupHotKeys(keyMap, this.handlers);
    this.render();
  }

  resetState = () => this.dispatcher.resetState();
}
