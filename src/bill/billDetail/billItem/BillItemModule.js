import { Provider } from 'react-redux';
import React from 'react';

import {
  CALCULATE_LINE,
  REMOVE_LINE,
  UPDATE_LINE_ITEM,
  UPDATE_LINE_TAX_CODE,
  UPDATE_TAX_INCLUSIVE,
} from './BillItemIntents';
import { SUCCESSFULLY_DELETED_BILL_ITEM, SUCCESSFULLY_SAVED_BILL_ITEM } from '../billMessageTypes';
import {
  getBusinessId,
  getIsAnAmountInput,
  getIsCreating,
  getIsCreatingFromInTray,
  getIsLineAmountDirty,
  getIsPageEdited,
  getIsTableEmpty,
  getLinesAndTaxInclusive,
  getLinesForCalculation,
  getLinesForItemChange,
  getNewLineIndex,
  getRegion,
  isAlreadyPrefilledFromInTray,
} from './billItemSelectors';
import BillItemView from './components/BillItemView';
import ModalTypes from './ModalType';
import Store from '../../../store/Store';
import billItemReducer from './billItemReducer';
import createBillItemDispatcher from './createBillItemDispatcher';
import createBillItemIntegrator from './createBillItemIntegrator';
import keyMap from '../../../hotKeys/keyMap';
import setupHotKeys from '../../../hotKeys/setupHotKeys';

export default class BillItemModule {
  constructor({
    integration, setRootView, pushMessage, replaceURLParams,
  }) {
    this.integration = integration;
    this.store = new Store(billItemReducer);
    this.setRootView = setRootView;
    this.pushMessage = pushMessage;
    this.replaceURLParams = replaceURLParams;
    this.dispatcher = createBillItemDispatcher(this.store);
    this.integrator = createBillItemIntegrator(this.store, this.integration);
  }

  unsubscribeFromStore = () => {
    this.store.unsubscribeAll();
  };

  addTableLine = (line) => {
    this.dispatcher.addTableLine(line);
    const state = this.store.getState();

    if (line.itemId) {
      this.updateLineItem({ index: getNewLineIndex(state), value: line.itemId });
    }
  };

  updateLines = (content, intent) => {
    this.dispatcher.setAreLinesCalculating(true);

    const onSuccess = (response) => {
      this.dispatcher.setLineAmountDirty(false);
      this.dispatcher.setAreLinesCalculating(false);
      this.dispatcher.updateLines(response);
    };
    const onFailure = ({ message }) => {
      this.dispatcher.setLineAmountDirty(false);
      this.dispatcher.setAreLinesCalculating(false);
      this.dispatcher.displayAlert(message);
    };

    this.integrator.updateLines({
      content, intent, onSuccess, onFailure,
    });
  };

  changeTableRow = (index, key, value) => {
    this.dispatcher.changeTableRow(index, key, value);

    if (getIsAnAmountInput(key)) {
      this.dispatcher.setLineAmountDirty(true);
    }

    if (key === 'itemId') {
      this.updateLineItem({
        index,
        value,
      });
    }

    if (key === 'taxCodeId') {
      this.updateLineTaxCode({
        index,
        value,
      });
    }
  };

  removeTableRow = (index) => {
    const { areLinesCalculating } = this.store.getState();

    if (!areLinesCalculating) {
      this.dispatcher.removeTableRow(index);
      const state = this.store.getState();

      if (!getIsTableEmpty(state)) {
        this.updateLines(getLinesAndTaxInclusive(state), REMOVE_LINE);
      } else {
        this.dispatcher.resetTotals();
      }
    }
  };

  lineCalculation = ({ index, key }) => {
    this.dispatcher.formatLineAmount(index, key);
    const state = this.store.getState();

    const isLineAmountDirty = getIsLineAmountDirty(state);

    if (isLineAmountDirty) {
      this.updateLines(getLinesForCalculation(state, index, key), CALCULATE_LINE);
    }
  };

  updateLineItem = ({ index, value }) => {
    const state = this.store.getState();

    this.updateLines(getLinesForItemChange(state, index, value), UPDATE_LINE_ITEM);
  };

  updateLineTaxCode = () => {
    const state = this.store.getState();

    this.updateLines(getLinesAndTaxInclusive(state), UPDATE_LINE_TAX_CODE);
  };

  updateIsTaxInclusive = ({ key, value }) => {
    const state = this.store.getState();

    const isLineAmountDirty = getIsLineAmountDirty(state);

    if (!isLineAmountDirty) {
      this.dispatcher.updateBillOption({ key, value });
      const newState = this.store.getState();

      if (!getIsTableEmpty(state)) {
        this.updateLines(getLinesAndTaxInclusive(newState), UPDATE_TAX_INCLUSIVE);
      }
    }
  };

  loadSupplierAddress = () => {
    const onSuccess = ({ address }) => {
      this.dispatcher.loadSupplierAddress(address);
    };
    const onFailure = ({ message }) => {
      this.dispatcher.displayAlert(message);
      this.dispatcher.loadSupplierAddress('');
    };

    this.integrator.loadSupplierAddress({ onSuccess, onFailure });
  };

  updateBillOption = ({ key, value }) => {
    this.dispatcher.updateBillOption({ key, value });

    if (key === 'supplierId') {
      this.loadSupplierAddress();

      const state = this.store.getState();
      if (getIsCreatingFromInTray(state)
        && !isAlreadyPrefilledFromInTray(state)) {
        this.dispatcher.prefillDataFromInTrayOnSupplierSelect();
      }
    }
  };

  createBill = () => {
    this.dispatcher.setSubmittingState(true);

    const onSuccess = ({ message }) => {
      this.pushMessage({
        type: SUCCESSFULLY_SAVED_BILL_ITEM,
        content: message,
      });
      this.redirectOnSaveOrCancel();
    };

    const onFailure = ({ message }) => {
      this.dispatcher.setSubmittingState(false);
      this.dispatcher.displayAlert(message);
    };

    this.integrator.createBill({ onSuccess, onFailure });
  };

  updateBill = () => {
    this.dispatcher.setSubmittingState(true);

    const onSuccess = ({ message }) => {
      this.pushMessage({
        type: SUCCESSFULLY_SAVED_BILL_ITEM,
        content: message,
      });
      this.redirectToBillList();
    };

    const onFailure = ({ message }) => {
      this.dispatcher.setSubmittingState(false);
      this.dispatcher.displayAlert(message);
    };

    this.integrator.updateBill({ onSuccess, onFailure });
  };

  deleteBill = () => {
    this.dispatcher.setSubmittingState(true);
    this.dispatcher.closeModal();

    const onSuccess = ({ message }) => {
      this.pushMessage({
        type: SUCCESSFULLY_DELETED_BILL_ITEM,
        content: message,
      });
      this.redirectToBillList();
    };

    const onFailure = ({ message }) => {
      this.dispatcher.setSubmittingState(false);
      this.dispatcher.displayAlert(message);
    };

    this.integrator.deleteBill({ onSuccess, onFailure });
  };

  redirectToInTray = () => {
    const state = this.store.getState();
    const businessId = getBusinessId(state);
    const region = getRegion(state);

    window.location.href = `/#/${region}/${businessId}/inTray`;
  }

  redirectOnSaveOrCancel = () => {
    const state = this.store.getState();

    if (getIsCreatingFromInTray(state)) {
      this.redirectToInTray();
    } else {
      this.redirectToBillList();
    }
  }

  openCancelModal = () => {
    const state = this.store.getState();

    if (getIsPageEdited(state)) {
      this.dispatcher.openModal(ModalTypes.CancelModal);
    } else {
      this.redirectToBillList();
    }
  };

  redirectToBillList = () => {
    const state = this.store.getState();
    const businessId = getBusinessId(state);
    const region = getRegion(state);

    window.location.href = `/#/${region}/${businessId}/bill`;
  };

  openDeleteModal = () => this.dispatcher.openModal(ModalTypes.DeleteModal);

  confirmCancelModal = () => {
    this.redirectOnSaveOrCancel();
  };

  saveBill = () => {
    const state = this.store.getState();
    const isCreating = getIsCreating(state);
    return isCreating ? this.createBill() : this.updateBill();
  };

  render = () => {
    const wrappedView = (
      <Provider store={this.store}>
        <BillItemView
          onUpdateBillOption={this.updateBillOption}
          onUpdateTaxInclusive={this.updateIsTaxInclusive}
          onSaveButtonClick={this.saveBill}
          onCancelButtonClick={this.openCancelModal}
          onDeleteButtonClick={this.openDeleteModal}
          onModalClose={this.dispatcher.closeModal}
          onCancelModalConfirm={this.confirmCancelModal}
          onDeleteModalConfirm={this.deleteBill}
          onAddTableLine={this.addTableLine}
          onChangeTableRow={this.changeTableRow}
          onRemoveTableRow={this.removeTableRow}
          onLineInputBlur={this.lineCalculation}
          onDismissAlert={this.dispatcher.dismissAlert}
        />
      </Provider>
    );

    this.setRootView(wrappedView);
  };

  handlers = {
    SAVE_ACTION: this.saveBill,
  };

  setInitialState = (context) => {
    this.dispatcher.setInitialState(context);

    const state = this.store.getState();
    if (getIsCreatingFromInTray(state)) {
      this.prefillBillFromInTrayOnInit();
    }
  }

  prefillBillFromInTrayOnInit() {
    this.dispatcher.setSubmittingState(true);

    const onSuccess = (response) => {
      this.dispatcher.setSubmittingState(false);
      this.dispatcher.prefillDataFromInTray(response);
    };

    const onFailure = ({ message }) => {
      this.dispatcher.setSubmittingState(false);
      this.dispatcher.displayAlert(message);
    };

    this.integrator.prefillDataFromInTray({ onSuccess, onFailure });
  }


  run(context) {
    this.setInitialState(context);
    setupHotKeys(keyMap, this.handlers);
    this.render();
  }

  resetState = () => this.dispatcher.resetState();
}
