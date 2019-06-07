import { Provider } from 'react-redux';
import React from 'react';

import {
  ADD_LINE,
  CALCULATE_LINE,
  CLOSE_MODAL,
  CREATE_BILL,
  DELETE_BILL,
  FORMAT_LINE_AMOUNT,
  OPEN_MODAL,
  REMOVE_LINE, SET_ADDRESS,
  SET_ALERT_MESSAGE,
  SET_ARE_LINES_CALCULATING,
  SET_LINE_AMOUNT_DIRTY,
  SET_SUBMITTING_STATE,
  TABLE_ROW_CHANGE,
  UPDATE_BILL,
  UPDATE_BILL_OPTION,
  UPDATE_LINES,
  UPDATE_LINE_ITEM,
  UPDATE_LINE_TAX_CODE,
  UPDATE_TAX_INCLUSIVE,
} from './BillItemIntents';
import { RESET_STATE, SET_INITIAL_STATE } from '../../SystemIntents';
import { SUCCESSFULLY_DELETED_BILL_ITEM, SUCCESSFULLY_SAVED_BILL_ITEM } from '../billMessageTypes';
import {
  getBillId,
  getBillPayload,
  getBusinessId,
  getIsAnAmountInput,
  getIsCreating,
  getIsLineAmountDirty,
  getIsPageEdited,
  getLinesAndTaxInclusive,
  getLinesForCalculation,
  getLinesForItemChange,
  getNewLineIndex,
  getRegion,
  getSupplierId,
} from './billItemSelectors';
import BillItemView from './components/BillItemView';
import ModalTypes from './ModalType';
import Store from '../../store/Store';
import billItemReducer from './billItemReducer';

export default class BillItemModule {
  constructor({
    integration, setRootView, pushMessage, replaceURLParams,
  }) {
    this.integration = integration;
    this.store = new Store(billItemReducer);
    this.setRootView = setRootView;
    this.pushMessage = pushMessage;
    this.replaceURLParams = replaceURLParams;
  }

  unsubscribeFromStore = () => {
    this.store.unsubscribeAll();
  };

  setInitialState = (context) => {
    const intent = SET_INITIAL_STATE;

    this.store.dispatch({
      intent,
      context,
    });
  };

  addTableLine = (line) => {
    this.store.dispatch({
      intent: ADD_LINE,
      line,
    });

    const state = this.store.getState();

    if (line.itemId) {
      this.updateLineItem({ index: getNewLineIndex(state), value: line.itemId });
    }
  };

  updateLines = (content, intent) => {
    const state = this.store.getState();
    const urlParams = {
      businessId: getBusinessId(state),
    };

    this.setAreLinesCalculating(true);

    const onSuccess = (response) => {
      this.setLineAmountDirty(false);
      this.setAreLinesCalculating(false);
      this.store.dispatch({
        intent: UPDATE_LINES,
        ...response,
      });
    };
    const onFailure = ({ message }) => {
      this.setLineAmountDirty(false);
      this.setAreLinesCalculating(false);
      this.displayAlert(message);
    };

    this.integration.write({
      intent,
      urlParams,
      content,
      onSuccess,
      onFailure,
    });
  };

  changeTableRow = (index, key, value) => {
    this.store.dispatch({
      intent: TABLE_ROW_CHANGE,
      index,
      key,
      value,
    });

    if (getIsAnAmountInput(key)) {
      this.setLineAmountDirty(true);
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
      this.store.dispatch({
        intent: REMOVE_LINE,
        index,
      });

      const state = this.store.getState();
      this.updateLines(getLinesAndTaxInclusive(state), REMOVE_LINE);
    }
  };

  lineCalculation = ({ index, key }) => {
    this.store.dispatch({
      intent: FORMAT_LINE_AMOUNT,
      index,
      key,
    });

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
      this.store.dispatch({
        intent: UPDATE_BILL_OPTION,
        key,
        value,
      });

      const newState = this.store.getState();
      this.updateLines(getLinesAndTaxInclusive(newState), UPDATE_TAX_INCLUSIVE);
    }
  };

  setContactAddress = address => this.store.dispatch({
    intent: SET_ADDRESS,
    address,
  });

  updateBillOption = ({ key, value }) => {
    this.store.dispatch({
      intent: UPDATE_BILL_OPTION,
      key,
      value,
    });

    if (key === 'supplierId') {
      const state = this.store.getState();
      const urlParams = {
        businessId: getBusinessId(state),
        supplierId: getSupplierId(state),
      };

      const onSuccess = ({ address }) => {
        this.setContactAddress(address);
      };
      const onFailure = ({ message }) => {
        this.displayAlert(message);
        this.setContactAddress('');
      };

      this.integration.read({
        intent: SET_ADDRESS,
        urlParams,
        onSuccess,
        onFailure,
      });
    }
  };

  setSubmittingState = (isSubmitting) => {
    const intent = SET_SUBMITTING_STATE;

    this.store.dispatch({
      intent,
      isSubmitting,
    });
  };

  createBill = () => {
    const intent = CREATE_BILL;
    const state = this.store.getState();
    const content = getBillPayload(state);

    const urlParams = {
      businessId: getBusinessId(state),
    };

    this.setSubmittingState(true);

    const onSuccess = ({ message }) => {
      this.pushMessage({
        type: SUCCESSFULLY_SAVED_BILL_ITEM,
        content: message,
      });
      this.redirectToBillList();
    };

    const onFailure = ({ message }) => {
      this.setSubmittingState(false);
      this.displayAlert(message);
    };

    this.integration.write({
      intent,
      urlParams,
      content,
      onSuccess,
      onFailure,
    });
  };

  updateBill = () => {
    const intent = UPDATE_BILL;
    const state = this.store.getState();
    const content = getBillPayload(state);

    const urlParams = {
      businessId: getBusinessId(state),
      billId: getBillId(state),
    };

    this.setSubmittingState(true);

    const onSuccess = ({ message }) => {
      this.pushMessage({
        type: SUCCESSFULLY_SAVED_BILL_ITEM,
        content: message,
      });
      this.redirectToBillList();
    };

    const onFailure = ({ message }) => {
      this.setSubmittingState(false);
      this.displayAlert(message);
    };

    this.integration.write({
      intent,
      urlParams,
      content,
      onSuccess,
      onFailure,
    });
  };

  deleteBill = () => {
    this.setSubmittingState(true);
    this.closeModal();

    const onSuccess = ({ message }) => {
      this.pushMessage({
        type: SUCCESSFULLY_DELETED_BILL_ITEM,
        content: message,
      });
      this.redirectToBillList();
    };

    const onFailure = ({ message }) => {
      this.setSubmittingState(false);
      this.displayAlert(message);
    };

    const state = this.store.getState();
    const billId = getBillId(state);
    const urlParams = {
      businessId: getBusinessId(state),
      billId,
    };

    this.integration.write({
      intent: DELETE_BILL,
      urlParams,
      onSuccess,
      onFailure,
    });
  };

  openCancelModal = () => {
    const intent = OPEN_MODAL;
    const state = this.store.getState();

    if (getIsPageEdited(state)) {
      this.store.dispatch({
        intent,
        modalType: ModalTypes.CancelModal,
      });
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

  openDeleteModal = () => {
    const intent = OPEN_MODAL;

    this.store.dispatch({
      intent,
      modalType: ModalTypes.DeleteModal,
    });
  };

  confirmCancelModal = () => {
    this.redirectToBillList();
  };

  closeModal = () => {
    this.store.dispatch({
      intent: CLOSE_MODAL,
    });
  };

  setLineAmountDirty = isLineAmountDirty => this.store.dispatch({
    intent: SET_LINE_AMOUNT_DIRTY,
    isLineAmountDirty,
  });

  setAreLinesCalculating = areLinesCalculating => this.store.dispatch({
    intent: SET_ARE_LINES_CALCULATING,
    areLinesCalculating,
  })

  displayAlert = errorMessage => this.store.dispatch({
    intent: SET_ALERT_MESSAGE,
    alertMessage: errorMessage,
  });

  dismissAlert = () => this.store.dispatch({
    intent: SET_ALERT_MESSAGE,
    alertMessage: '',
  });

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
          onModalClose={this.closeModal}
          onCancelModalConfirm={this.confirmCancelModal}
          onDeleteModalConfirm={this.deleteBill}
          onAddTableLine={this.addTableLine}
          onChangeTableRow={this.changeTableRow}
          onRemoveTableRow={this.removeTableRow}
          onLineInputBlur={this.lineCalculation}
          onDismissAlert={this.dismissAlert}
        />
      </Provider>
    );

    this.setRootView(wrappedView);
  };

  run(context) {
    this.setInitialState(context);
    this.render();
  }

  resetState = () => {
    const intent = RESET_STATE;
    this.store.dispatch({
      intent,
    });
  };
}
