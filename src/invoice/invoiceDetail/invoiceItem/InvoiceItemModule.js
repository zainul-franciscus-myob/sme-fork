import { Provider } from 'react-redux';
import React from 'react';

import {
  ADD_LINE, CALCULATE_LINE, CREATE_INVOICE_ITEM_DETAIL, FORMAT_LINE_AMOUNT,
  REMOVE_LINE, RESET_TOTALS, SET_ARE_LINES_CALCULATING, SET_LINE_AMOUNT_DIRTY,
  TABLE_ROW_CHANGE, UPDATE_INVOICE_ITEM_DETAIL, UPDATE_INVOICE_ITEM_OPTION,
  UPDATE_INVOICE_ITEM_TAX_INCLUSIVE, UPDATE_LINES, UPDATE_LINE_ITEM, UPDATE_LINE_TAX_CODE,
} from './InvoiceItemIntents';
import {
  CLOSE_MODAL, DELETE_INVOICE_DETAIL,
  LOAD_CONTACT_ADDRESS,
  OPEN_MODAL,
  SET_ALERT_MESSAGE,
  SET_LOADING_STATE,
  SET_SUBMITTING_STATE,
} from '../../InvoiceIntents';
import {
  RESET_STATE,
  SET_INITIAL_STATE,
} from '../../../SystemIntents';
import { SUCCESSFULLY_DELETED_INVOICE_ITEM, SUCCESSFULLY_SAVED_INVOICE_ITEM } from '../invoiceMessageTypes';
import {
  areLinesCalculating, getBusinessId, getCustomerId,
  getInvoiceId, getInvoicePayload, getIsAnAmountLineInput,
  getIsCreating, getIsLineAmountDirty, getIsPageEdited,
  getIsTableEmpty, getNewLineIndex, getRegion,
  getTotalsPayloadForCalculation, getTotalsPayloadForLineItemChange, getTotalsPayloadForLineRemoval,
  getTotalsPayloadForLineTaxCodeChange, getTotalsPayloadForTaxInclusiveChange,
} from './invoiceItemSelectors';
import InvoiceItemView from './components/InvoiceItemView';
import ModalType from './enums/ModalType';
import Store from '../../../store/Store';
import invoiceItemReducer from './invoiceItemReducer';
import keyMap from '../../../hotKeys/keyMap';
import setupHotKeys from '../../../hotKeys/setupHotKeys';

export default class InvoiceItemModule {
  constructor({
    integration, setRootView, pushMessage,
  }) {
    this.integration = integration;
    this.setRootView = setRootView;
    this.pushMessage = pushMessage;
    this.store = new Store(invoiceItemReducer);
  }

  setContactAddress = address => this.store.dispatch({
    intent: LOAD_CONTACT_ADDRESS,
    address,
  });

  loadCustomerAddress = () => {
    const state = this.store.getState();

    const urlParams = {
      businessId: getBusinessId(state),
      contactId: getCustomerId(state),
    };

    const onSuccess = ({ address }) => {
      this.setContactAddress(address);
    };
    const onFailure = ({ message }) => {
      this.displayErrorAlert(message);
      this.setContactAddress('');
    };

    this.integration.read({
      intent: LOAD_CONTACT_ADDRESS,
      urlParams,
      onSuccess,
      onFailure,
    });
  };

  updateInvoiceOption = ({ key, value }) => {
    this.store.dispatch({
      intent: UPDATE_INVOICE_ITEM_OPTION,
      key,
      value,
    });

    if (key === 'customerId') {
      this.loadCustomerAddress();
    }
  };

  setAreLinesCalculating = linesCalculating => this.store.dispatch({
    intent: SET_ARE_LINES_CALCULATING,
    areLinesCalculating: linesCalculating,
  })

  setLineAmountDirty = isLineAmountDirty => this.store.dispatch({
    intent: SET_LINE_AMOUNT_DIRTY,
    isLineAmountDirty,
  });

  updateLines = (requestPayload, intent) => {
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
      this.displayErrorAlert(message);
    };

    this.integration.write({
      intent,
      urlParams,
      content: requestPayload,
      onSuccess,
      onFailure,
    });
  };

  updateIsTaxInclusive = ({ key, value }) => {
    const state = this.store.getState();

    const isLineAmountDirty = getIsLineAmountDirty(state);
    const isTableEmpty = getIsTableEmpty(state);

    if (!isLineAmountDirty) {
      this.store.dispatch({
        intent: UPDATE_INVOICE_ITEM_OPTION,
        key,
        value,
      });

      const newState = this.store.getState();

      if (!isTableEmpty) {
        this.updateLines(
          getTotalsPayloadForTaxInclusiveChange(newState),
          UPDATE_INVOICE_ITEM_TAX_INCLUSIVE,
        );
      }
    }
  };

  displayErrorAlert = errorMessage => this.store.dispatch({
    intent: SET_ALERT_MESSAGE,
    alertMessage: errorMessage,
  });

  setSubmittingState = (isSubmitting) => {
    const intent = SET_SUBMITTING_STATE;

    this.store.dispatch({
      intent,
      isSubmitting,
    });
  };

  redirectToInvoiceList = () => {
    const state = this.store.getState();
    const businessId = getBusinessId(state);
    const region = getRegion(state);

    window.location.href = `/#/${region}/${businessId}/invoice`;
  };

  updateInvoice = () => {
    const intent = UPDATE_INVOICE_ITEM_DETAIL;

    const state = this.store.getState();
    const content = getInvoicePayload(state);

    const urlParams = {
      businessId: getBusinessId(state),
      invoiceId: getInvoiceId(state),
    };

    this.setSubmittingState(true);

    const onSuccess = ({ message }) => {
      this.pushMessage({
        type: SUCCESSFULLY_SAVED_INVOICE_ITEM,
        content: message,
      });
      this.redirectToInvoiceList();
    };

    const onFailure = ({ message }) => {
      this.setSubmittingState(false);
      this.displayErrorAlert(message);
    };

    this.integration.write({
      intent,
      urlParams,
      content,
      onSuccess,
      onFailure,
    });
  };

  createInvoice = () => {
    const intent = CREATE_INVOICE_ITEM_DETAIL;

    const state = this.store.getState();
    const content = getInvoicePayload(state);

    const urlParams = {
      businessId: getBusinessId(state),
    };

    this.setSubmittingState(true);

    const onSuccess = ({ message }) => {
      this.pushMessage({
        type: SUCCESSFULLY_SAVED_INVOICE_ITEM,
        content: message,
      });
      this.redirectToInvoiceList();
    };

    const onFailure = ({ message }) => {
      this.setSubmittingState(false);
      this.displayErrorAlert(message);
    };

    this.integration.write({
      intent,
      urlParams,
      content,
      onSuccess,
      onFailure,
    });
  };

  saveInvoice = () => {
    const state = this.store.getState();
    const isCreating = getIsCreating(state);

    return isCreating
      ? this.createInvoice()
      : this.updateInvoice();
  };

  openCancelModal = () => {
    const intent = OPEN_MODAL;
    const state = this.store.getState();

    if (getIsPageEdited(state)) {
      this.store.dispatch({
        intent,
        modalType: ModalType.cancel,
      });
    } else {
      this.redirectToInvoiceList();
    }
  };

  openDeleteModal = () => {
    const intent = OPEN_MODAL;

    this.store.dispatch({
      intent,
      modalType: ModalType.delete,
    });
  };

  closeModal = () => {
    this.store.dispatch({
      intent: CLOSE_MODAL,
    });
  };

  confirmCancelModal = () => {
    this.redirectToInvoiceList();
  };

  deleteInvoice = () => {
    this.setSubmittingState(true);
    this.closeModal();

    const intent = DELETE_INVOICE_DETAIL;

    const onSuccess = ({ message }) => {
      this.pushMessage({
        type: SUCCESSFULLY_DELETED_INVOICE_ITEM,
        content: message,
      });
      this.redirectToInvoiceList();
    };

    const onFailure = ({ message }) => {
      this.setSubmittingState(false);
      this.displayErrorAlert(message);
    };

    const state = this.store.getState();

    const urlParams = {
      businessId: getBusinessId(state),
      invoiceId: getInvoiceId(state),
    };

    this.integration.write({
      intent,
      urlParams,
      onSuccess,
      onFailure,
    });
  };

  updateLineItem = ({ index, itemId }) => {
    const state = this.store.getState();

    this.updateLines(
      getTotalsPayloadForLineItemChange({ state, index, itemId }),
      UPDATE_LINE_ITEM,
    );
  };

  updateLineTaxCode = () => {
    const state = this.store.getState();

    this.updateLines(
      getTotalsPayloadForLineTaxCodeChange(state),
      UPDATE_LINE_TAX_CODE,
    );
  };

  addTableLine = (line) => {
    this.store.dispatch({
      intent: ADD_LINE,
      line,
    });

    const { itemId } = line;
    if (itemId) {
      const state = this.store.getState();

      this.updateLineItem({
        index: getNewLineIndex(state),
        itemId,
      });
    }
  };

  changeTableRow = (index, key, value) => {
    this.store.dispatch({
      intent: TABLE_ROW_CHANGE,
      index,
      key,
      value,
    });

    if (getIsAnAmountLineInput(key)) {
      this.setLineAmountDirty(true);
    }

    if (key === 'itemId') {
      this.updateLineItem({
        index,
        itemId: value,
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
    const state = this.store.getState();

    if (!areLinesCalculating(state)) {
      this.store.dispatch({
        intent: REMOVE_LINE,
        index,
      });

      const newState = this.store.getState();
      const isTableEmpty = getIsTableEmpty(newState);

      if (isTableEmpty) {
        this.store.dispatch({
          intent: RESET_TOTALS,
        });
      } else {
        this.updateLines(
          getTotalsPayloadForLineRemoval(newState),
          REMOVE_LINE,
        );
      }
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
      this.updateLines(
        getTotalsPayloadForCalculation(state, index, key),
        CALCULATE_LINE,
      );
    }
  };

  dismissAlert = () => this.store.dispatch({
    intent: SET_ALERT_MESSAGE,
    alertMessage: '',
  });

  render = () => {
    const invoiceItemView = (
      <InvoiceItemView
        onUpdateInvoiceOption={this.updateInvoiceOption}
        onUpdateTaxInclusive={this.updateIsTaxInclusive}
        onSaveButtonClick={this.saveInvoice}
        onCancelButtonClick={this.openCancelModal}
        onDeleteButtonClick={this.openDeleteModal}
        onModalClose={this.closeModal}
        onCancelModalConfirm={this.confirmCancelModal}
        onDeleteModalConfirm={this.deleteInvoice}
        onAddTableLine={this.addTableLine}
        onChangeTableRow={this.changeTableRow}
        onRemoveTableRow={this.removeTableRow}
        onLineInputBlur={this.lineCalculation}
        onDismissAlert={this.dismissAlert}
      />
    );

    const wrappedView = (
      <Provider store={this.store}>
        {invoiceItemView}
      </Provider>
    );

    this.setRootView(wrappedView);
  }

  unsubscribeFromStore = () => {
    this.store.unsubscribeAll();
  }

  setLoadingState = (isLoading) => {
    const intent = SET_LOADING_STATE;
    this.store.dispatch({
      intent,
      isLoading,
    });
  }

  setInitialState = (context) => {
    const intent = SET_INITIAL_STATE;

    this.store.dispatch({
      intent,
      context,
    });
  }

  handlers = {
    SAVE_ACTION: this.saveInvoice,
  };

  run(context) {
    this.setInitialState(context);
    setupHotKeys(keyMap, this.handlers);
    this.render();
  }

  resetState = () => {
    const intent = RESET_STATE;
    this.store.dispatch({
      intent,
    });
  };
}
