import { Provider } from 'react-redux';
import React from 'react';

import {
  ADD_TABLE_ROW,
  CALCULATE_LINES,
  CHANGE_EXPORT_PDF_FORM,
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
import {
  DELETE_QUOTE_DETAIL,
  EXPORT_QUOTE_PDF,
  LOAD_CUSTOMER_ADDRESS,
  SET_ALERT,
  UPDATE_QUOTE_ID_AFTER_CREATE,
} from '../../QuoteIntents';
import { RESET_STATE, SET_INITIAL_STATE } from '../../../SystemIntents';
import { SUCCESSFULLY_DELETED_ITEM_QUOTE, SUCCESSFULLY_SAVED_ITEM_QUOTE } from '../quoteMessageTypes';
import {
  getBusinessId,
  getCreateDuplicateQuoteURL,
  getCreateInvoiceFromQuoteURL,
  getCreateNewItemQuoteURL,
  getCustomerId,
  getExportPdfQuoteParams,
  getExportPdfQuoteUrlParams,
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
  getQuoteListURL,
  getQuotePayload,
  getShouldReload,
} from './ItemQuoteSelectors';
import ItemQuoteView from './components/ItemQuoteView';
import ModalType from '../ModalType';
import SaveActionType from '../SaveActionType';
import Store from '../../../store/Store';
import itemQuoteReducer from './itemQuoteReducer';
import keyMap from '../../../hotKeys/keyMap';
import setupHotKeys from '../../../hotKeys/setupHotKeys';

export default class ItemQuoteModule {
  constructor({
    integration, setRootView, pushMessage, reload,
  }) {
    this.integration = integration;
    this.store = new Store(itemQuoteReducer);
    this.setRootView = setRootView;
    this.pushMessage = pushMessage;
    this.reload = reload;
  }

  loadCustomerAddress = () => {
    const state = this.store.getState();

    const urlParams = {
      businessId: getBusinessId(state),
      customerId: getCustomerId(state),
    };

    const onSuccess = ({ address }) => {
      this.setCustomerAddress(address);
    };
    const onFailure = ({ message }) => {
      this.displayFailureAlert(message);
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
      this.displayFailureAlert(message);
    };

    this.integration.write({
      intent,
      urlParams,
      content,
      onSuccess,
      onFailure,
    });
  };

  createOrUpdateQuote = ({ onSuccess }) => {
    this.setSubmittingState(true);

    const state = this.store.getState();
    const isCreating = getIsCreating(state);

    const intent = isCreating
      ? CREATE_ITEM_QUOTE
      : UPDATE_ITEM_QUOTE;

    const businessId = getBusinessId(state);
    const quoteId = isCreating ? undefined : getQuoteId(state);
    const urlParams = { businessId, quoteId };

    const content = getQuotePayload(state);

    const onFailure = ({ message }) => {
      this.setSubmittingState(false);
      this.displayFailureAlert(message);
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
    const onSuccess = ({ message }) => {
      this.pushSuccessfulSaveMessage(message);
      this.redirectToQuoteList();
    };

    this.createOrUpdateQuote({ onSuccess });
  }

  executeSaveAndAction = saveAndAction => ({
    [SaveActionType.SAVE_AND_CREATE_NEW]: this.displaySaveAndCreateNewConfirmationModal,
    [SaveActionType.SAVE_AND_DUPLICATE]: this.displaySaveAndDuplicateConfirmationModal,
    [SaveActionType.SAVE_AND_EXPORT_PDF]: this.saveAndExportPdf,
  }[saveAndAction]())

  saveAndCreateNewQuote = () => {
    const onSuccess = ({ message }) => {
      const state = this.store.getState();
      this.pushSuccessfulSaveMessage(message);

      if (getShouldReload(state)) {
        this.reload();
      } else {
        this.redirectToURL(getCreateNewItemQuoteURL(state));
      }
    };

    this.createOrUpdateQuote({ onSuccess });
  }

  saveAndDuplicateQuote = () => {
    const onSuccess = (successResponse) => {
      if (getIsCreating(this.store.getState())) {
        this.store.dispatch({
          intent: UPDATE_QUOTE_ID_AFTER_CREATE,
          quoteId: successResponse.id,
        });
      }
      this.pushSuccessfulSaveMessage(successResponse.message);
      this.redirectToURL(getCreateDuplicateQuoteURL(this.store.getState()));
    };

    this.createOrUpdateQuote({ onSuccess });
  }

  saveAndExportPdf = () => {
    const onSuccess = () => {
      this.displayExportPdfModal();
    };

    this.createOrUpdateQuote({ onSuccess });
  }

  saveQuoteAndRedirectToInvoice = () => {
    const onSuccess = () => {
      this.redirectToCreateInvoice();
    };

    this.createOrUpdateQuote({ onSuccess });
  }

  pushSuccessfulSaveMessage = (message) => {
    this.pushMessage({
      type: SUCCESSFULLY_SAVED_ITEM_QUOTE,
      content: message,
    });
  }

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
      this.displayFailureAlert(message);
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

  exportQuotePdf = () => {
    const state = this.store.getState();
    const urlParams = getExportPdfQuoteUrlParams(state);
    const params = getExportPdfQuoteParams(state);

    const onSuccess = (data) => {
      this.setSubmittingState(false);
      this.dismissModal();
      window.open(URL.createObjectURL(data), '_blank');
    };

    const onFailure = () => {
      this.displayFailureAlert('Failed to export PDF');
      this.setSubmittingState(false);
      this.dismissModal();
    };

    this.integration.readFile({
      intent: EXPORT_QUOTE_PDF,
      urlParams,
      params,
      onSuccess,
      onFailure,
    });
  }

  changeExportPdfForm = ({ value }) => {
    this.store.dispatch({
      intent: CHANGE_EXPORT_PDF_FORM,
      selectedForm: value,
    });
  }

  redirectToURL = (url) => {
    window.location.href = url;
  }

  redirectToQuoteList = () => this.redirectToURL(getQuoteListURL(this.store.getState()));

  redirectToCreateInvoice = () => this.redirectToURL(
    getCreateInvoiceFromQuoteURL(this.store.getState()),
  );

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

  displayUnsavedModal = () => {
    const state = this.store.getState();
    const isPageEdited = getIsPageEdited(state);

    if (isPageEdited) {
      this.store.dispatch({
        intent: SET_MODAL,
        modalType: ModalType.UNSAVED,
      });
    } else {
      this.redirectToCreateInvoice();
    }
  }

  displaySaveAndCreateNewConfirmationModal = () => {
    this.store.dispatch({
      intent: SET_MODAL,
      modalType: ModalType.SAVE_AND_CREATE_NEW,
    });
  }

  displaySaveAndDuplicateConfirmationModal = () => {
    this.store.dispatch({
      intent: SET_MODAL,
      modalType: ModalType.SAVE_AND_DUPLICATE,
    });
  }

  dismissModal = () => this.store.dispatch({
    intent: SET_MODAL,
    modalType: undefined,
  });

  displayFailureAlert = message => this.store.dispatch({
    intent: SET_ALERT,
    alert: {
      type: 'danger',
      message,
    },
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

  setInitialState = (context, payload, message) => {
    this.store.dispatch({
      intent: SET_INITIAL_STATE,
      context,
      payload,
      message,
    });
  };

  displayExportPdfModal = () => {
    this.store.dispatch({
      intent: SET_MODAL,
      modalType: ModalType.EXPORT_PDF,
    });
  }

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
          onSaveAndButtonClick={this.executeSaveAndAction}
          onDeleteButtonClick={this.displayDeleteModal}
          onCancelButtonClick={this.displayCancelModal}
          onConvertToInvoiceButtonClick={this.displayUnsavedModal}
          onDismissAlert={this.dismissAlert}
          onDismissModal={this.dismissModal}
          onConfirmDeleteButtonClick={this.deleteQuote}
          onConfirmCancelButtonClick={this.cancelQuote}
          onConfirmSaveButtonClick={this.saveQuoteAndRedirectToInvoice}
          onConfirmUnsaveButtonClick={this.redirectToCreateInvoice}
          onConfirmSaveAndCreateNewButtonClick={this.saveAndCreateNewQuote}
          onConfirmSaveAndDuplicateButtonClick={this.saveAndDuplicateQuote}
          onExportPdfButtonClick={this.displayExportPdfModal}
          onConfirmExportPdfButtonClick={this.exportQuotePdf}
          onChangeExportPdfForm={this.changeExportPdfForm}
        />
      </Provider>
    );

    this.setRootView(wrappedView);
  };

  handlers = {
    SAVE_ACTION: this.saveQuote,
  };

  run = ({
    context, payload, message,
  }) => {
    this.setInitialState(context, payload, message);
    setupHotKeys(keyMap, this.handlers);
    this.render();
  };
}
