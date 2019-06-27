import { Provider } from 'react-redux';
import React from 'react';

import {
  ADD_TABLE_ROW,
  CALCULATE_LINES,
  CHANGE_TABLE_ROW,
  CREATE_ITEM_QUOTE,
  FORMAT_LINE_AMOUNT_INPUTS,
  REMOVE_TABLE_ROW,
  SET_IS_CALCULATING,
  SET_IS_LINE_AMOUNT_INPUT_DIRTY,
  SET_MODAL,
  SET_SUBMITTING_STATE,
  UPDATE_ITEM_QUOTE,
  UPDATE_ITEM_QUOTE_OPTION,
  UPDATE_LINE_AMOUNT_INPUTS,
  UPDATE_LINE_ITEM,
  UPDATE_LINE_TAX_CODE,
  UPDATE_TAX_INCLUSIVE,
} from './ItemQuoteIntents';
import { DELETE_QUOTE_DETAIL, LOAD_CUSTOMER_ADDRESS, SET_ALERT } from '../../QuoteIntents';
import { RESET_STATE, SET_INITIAL_STATE } from '../../../SystemIntents';
import { SUCCESSFULLY_DELETED_ITEM_QUOTE, SUCCESSFULLY_SAVED_ITEM_QUOTE } from '../quoteMessageTypes';
import {
  getBusinessId,
  getCustomerId,
  getIsCreating,
  getIsLineAmountInputDirty,
  getIsPageEdited,
  getNewLineIndex,
  getPayloadForCalculateAmountInputs,
  getPayloadForRemoveTableRow,
  getPayloadForUpdateIsTaxInclusive,
  getPayloadForUpdateLineItem,
  getPayloadForUpdateLineTaxCode,
  getQuoteId,
  getQuotePayload,
  getRegion,
} from './ItemQuoteSelectors';
import ItemQuoteView from './components/ItemQuoteView';
import ModalType from './ModalType';
import Store from '../../../store/Store';
import itemQuoteReducer from './itemQuoteReducer';

export default class ItemQuoteModule {
  constructor({
    integration, setRootView, pushMessage,
  }) {
    this.integration = integration;
    this.store = new Store(itemQuoteReducer);
    this.setRootView = setRootView;
    this.pushMessage = pushMessage;
  }

  redirectToQuoteList = () => {
    const state = this.store.getState();
    const businessId = getBusinessId(state);
    const region = getRegion(state);

    window.location.href = `/#/${region}/${businessId}/quote`;
  };

  loadCustomerAddress = () => {
    const state = this.store.getState();

    const urlParams = {
      businessId: getBusinessId(state),
      contactId: getCustomerId(state),
    };

    const onSuccess = ({ address }) => {
      this.setCustomerAddress(address);
    };
    const onFailure = ({ message }) => {
      this.displayAlert(message);
      this.setCustomerAddress('');
    };

    this.integration.read({
      intent: LOAD_CUSTOMER_ADDRESS,
      urlParams,
      onSuccess,
      onFailure,
    });
  };

  updateQuoteOption = ({ key, value }) => {
    this.store.dispatch({
      intent: UPDATE_ITEM_QUOTE_OPTION,
      key,
      value,
    });

    if (key === 'isTaxInclusive') {
      const state = this.store.getState();
      this.calculateLines(getPayloadForUpdateIsTaxInclusive(state), UPDATE_TAX_INCLUSIVE);
    }

    if (key === 'customerId') {
      this.loadCustomerAddress();
    }
  };

  addTableRow = (row) => {
    this.store.dispatch({
      intent: ADD_TABLE_ROW,
      row,
    });
    const state = this.store.getState();
    this.updateLineItem(getNewLineIndex(state), row.itemId);
  }

  changeTableRow = (index, key, value) => {
    this.store.dispatch({
      intent: CHANGE_TABLE_ROW,
      index,
      key,
      value,
    });

    if (['units', 'unitPrice', 'discount', 'amount'].includes(key)) {
      this.setIsLineAmountInputDirty(true);
    } else if (key === 'itemId') {
      this.updateLineItem(index, value);
    } else if (key === 'taxCodeId') {
      this.updateLineTaxCode();
    }
  }

  updateLineAmountInputs = (index, key) => {
    this.store.dispatch({
      intent: FORMAT_LINE_AMOUNT_INPUTS,
      index,
      key,
    });

    const state = this.store.getState();

    const isLineAmountDirty = getIsLineAmountInputDirty(state);

    if (isLineAmountDirty) {
      this.calculateLines(
        getPayloadForCalculateAmountInputs(state, index, key),
        UPDATE_LINE_AMOUNT_INPUTS,
      );
    }
  };

  removeTableRow = (index) => {
    this.store.dispatch({
      intent: REMOVE_TABLE_ROW,
      index,
    });

    const state = this.store.getState();

    this.calculateLines(getPayloadForRemoveTableRow(state), REMOVE_TABLE_ROW);
  };

  updateLineItem = (index, itemId) => {
    const state = this.store.getState();

    this.calculateLines(getPayloadForUpdateLineItem(state, index, itemId), UPDATE_LINE_ITEM);
  }

  updateLineTaxCode = () => {
    const state = this.store.getState();

    this.calculateLines(getPayloadForUpdateLineTaxCode(state), UPDATE_LINE_TAX_CODE);
  }

  calculateLines = (content, intent) => {
    const state = this.store.getState();
    const urlParams = {
      businessId: getBusinessId(state),
    };

    this.setIsCalculating(true);

    const onSuccess = (response) => {
      this.setIsLineAmountInputDirty(false);
      this.setIsCalculating(false);
      this.store.dispatch({
        intent: CALCULATE_LINES,
        ...response,
      });
    };
    const onFailure = ({ message }) => {
      this.setIsLineAmountInputDirty(false);
      this.setIsCalculating(false);
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

  saveQuote = () => {
    const state = this.store.getState();
    const isCreating = getIsCreating(state);

    if (isCreating) {
      this.createQuote();
    } else {
      this.updateQuote();
    }
  };

  createQuote = () => {
    const state = this.store.getState();
    const content = getQuotePayload(state);
    const urlParams = {
      businessId: getBusinessId(state),
    };

    this.setSubmittingState(true);

    const onSuccess = ({ message }) => {
      this.pushMessage({
        type: SUCCESSFULLY_SAVED_ITEM_QUOTE,
        content: message,
      });
      this.redirectToQuoteList();
    };

    const onFailure = ({ message }) => {
      this.setSubmittingState(false);
      this.displayAlert(message);
    };

    this.integration.write({
      intent: CREATE_ITEM_QUOTE,
      urlParams,
      content,
      onSuccess,
      onFailure,
    });
  };

  updateQuote = () => {
    const state = this.store.getState();
    const content = getQuotePayload(state);
    const urlParams = {
      businessId: getBusinessId(state),
      quoteId: getQuoteId(state),
    };

    this.setSubmittingState(true);

    const onSuccess = ({ message }) => {
      this.pushMessage({
        type: SUCCESSFULLY_SAVED_ITEM_QUOTE,
        content: message,
      });
      this.redirectToQuoteList();
    };

    const onFailure = ({ message }) => {
      this.setSubmittingState(false);
      this.displayAlert(message);
    };

    this.integration.write({
      intent: UPDATE_ITEM_QUOTE,
      urlParams,
      content,
      onSuccess,
      onFailure,
    });
  };

  deleteQuote = () => {
    this.dismissModal();
    this.setSubmittingState(true);

    const onSuccess = ({ message }) => {
      this.pushMessage({
        type: SUCCESSFULLY_DELETED_ITEM_QUOTE,
        content: message,
      });
      this.redirectToQuoteList();
    };

    const onFailure = ({ message }) => {
      this.setSubmittingState(false);
      this.displayAlert(message);
    };

    const state = this.store.getState();
    const quoteId = getQuoteId(state);
    const urlParams = {
      businessId: getBusinessId(state),
      quoteId,
    };

    this.integration.write({
      intent: DELETE_QUOTE_DETAIL,
      urlParams,
      onSuccess,
      onFailure,
    });
  };

  cancelQuote = () => {
    this.redirectToQuoteList();
  }

  displayCancelModal = () => {
    const state = this.store.getState();
    const isPageEdited = getIsPageEdited(state);

    if (isPageEdited) {
      this.store.dispatch({
        intent: SET_MODAL,
        modalType: ModalType.CANCEL,
      });
    } else {
      this.cancelQuote();
    }
  }

  displayDeleteModal = () => this.store.dispatch({
    intent: SET_MODAL,
    modalType: ModalType.DELETE,
  });

  dismissModal = () => this.store.dispatch({
    intent: SET_MODAL,
    modalType: undefined,
  });

  displayAlert = message => this.store.dispatch({
    intent: SET_ALERT,
    alertMessage: message,
  });

  dismissAlert = () => this.store.dispatch({
    intent: SET_ALERT,
    alertMessage: '',
  });

  setIsCalculating = (isCalculating) => {
    this.store.dispatch({
      intent: SET_IS_CALCULATING,
      isCalculating,
    });
  }

  setIsLineAmountInputDirty = (isLineAmountInputDirty) => {
    this.store.dispatch({
      intent: SET_IS_LINE_AMOUNT_INPUT_DIRTY,
      isLineAmountInputDirty,
    });
  }

  setCustomerAddress = address => this.store.dispatch({
    intent: LOAD_CUSTOMER_ADDRESS,
    address,
  });

  setSubmittingState = (isSubmitting) => {
    this.store.dispatch({
      intent: SET_SUBMITTING_STATE,
      isSubmitting,
    });
  };

  setInitialState = (context, payload) => {
    this.store.dispatch({
      intent: SET_INITIAL_STATE,
      context,
      payload,
    });
  };

  resetState = () => {
    this.store.dispatch({
      intent: RESET_STATE,
    });
  };

  unsubscribeFromStore = () => {
    this.store.unsubscribeAll();
  };

  render = () => {
    const wrappedView = (
      <Provider store={this.store}>
        <ItemQuoteView
          onUpdateQuoteOption={this.updateQuoteOption}
          onTableRowAmountInputBlur={this.updateLineAmountInputs}
          onAddTableRow={this.addTableRow}
          onChangeTableRow={this.changeTableRow}
          onRemoveTableRow={this.removeTableRow}
          onSaveButtonClick={this.saveQuote}
          onDeleteButtonClick={this.displayDeleteModal}
          onCancelButtonClick={this.displayCancelModal}
          onDismissAlert={this.dismissAlert}
          onDismissModal={this.dismissModal}
          onConfirmDeleteButtonClick={this.deleteQuote}
          onConfirmCancelButtonClick={this.cancelQuote}
        />
      </Provider>
    );

    this.setRootView(wrappedView);
  };

  run = ({ context, payload }) => {
    this.setInitialState(context, payload);
    this.render();
  };
}
