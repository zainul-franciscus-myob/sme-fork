import { Provider } from 'react-redux';
import React from 'react';

import {
  ADD_EMAIL_ATTACHMENTS,
  CHANGE_EXPORT_PDF_TEMPLATE,
  DELETE_QUOTE_DETAIL,
  EXPORT_QUOTE_PDF,
  LOAD_CUSTOMER_ADDRESS,
  REMOVE_EMAIL_ATTACHMENT,
  RESET_EMAIL_QUOTE_DETAIL,
  RESET_OPEN_SEND_EMAIL,
  SEND_EMAIL,
  SET_ALERT,
  SET_MODAL_ALERT,
  SET_MODAL_SUBMITTING_STATE,
  UPDATE_EMAIL_ATTACHMENT_UPLOAD_PROGRESS,
  UPDATE_EMAIL_QUOTE_DETAIL,
  UPDATE_QUOTE_ID_AFTER_CREATE,
  UPLOAD_EMAIL_ATTACHMENT,
  UPLOAD_EMAIL_ATTACHMENT_FAILED,
} from '../../QuoteIntents';
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
import { RESET_STATE, SET_INITIAL_STATE } from '../../../SystemIntents';
import {
  SUCCESSFULLY_DELETED_ITEM_QUOTE,
  SUCCESSFULLY_EMAILED_QUOTE,
  SUCCESSFULLY_SAVED_ITEM_QUOTE,
} from '../quoteMessageTypes';
import {
  getBusinessId,
  getCreateDuplicateQuoteURL,
  getCreateInvoiceFromQuoteURL,
  getCreateNewItemQuoteURL,
  getCustomerId,
  getExportPdfFilename,
  getExportPdfQuoteParams,
  getExportPdfQuoteUrlParams,
  getFilesForUpload,
  getInvoiceAndQuoteSettingsUrl,
  getIsCreating,
  getIsEmailModalOpen,
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
  getQuoteReadWithEmailModalUrl,
  getQuoteReadWithExportPdfModalUrl,
  getRouteUrlParams,
  getSendEmailPayload,
  getSendEmailUrlParams,
  getShouldReload,
  getShouldSaveAndExportPdf,
} from './ItemQuoteSelectors';
import ItemQuoteView from './components/ItemQuoteView';
import ModalType from '../ModalType';
import SaveActionType from '../SaveActionType';
import Store from '../../../store/Store';
import itemQuoteReducer from './itemQuoteReducer';
import keyMap from '../../../hotKeys/keyMap';
import openBlob from '../../../blobOpener/openBlob';
import setupHotKeys from '../../../hotKeys/setupHotKeys';

export default class ItemQuoteModule {
  constructor({
    integration, setRootView, pushMessage, reload, replaceURLParams,
  }) {
    this.integration = integration;
    this.store = new Store(itemQuoteReducer);
    this.setRootView = setRootView;
    this.pushMessage = pushMessage;
    this.reload = reload;
    this.replaceURLParams = replaceURLParams;
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

  updateQuoteIdAfterCreate = (quoteId) => {
    this.store.dispatch({ intent: UPDATE_QUOTE_ID_AFTER_CREATE, quoteId });
  }

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
    const onSuccess = ({ message, id }) => {
      if (getIsCreating(this.store.getState())) {
        this.updateQuoteIdAfterCreate(id);
      }
      this.pushSuccessfulSaveMessage(message);
      this.redirectToURL(getCreateDuplicateQuoteURL(this.store.getState()));
    };

    this.createOrUpdateQuote({ onSuccess });
  }

  saveAndExportPdf = () => {
    const onSuccess = ({ message, id }) => {
      const state = this.store.getState();
      const isCreating = getIsCreating(state);
      if (isCreating) {
        this.updateQuoteIdAfterCreate(id);
      }
      this.pushSuccessfulSaveMessage(message);
      this.redirectToReadQuoteWithExportPdfModal();
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
    this.setModalSubmittingState(true);

    const state = this.store.getState();
    const urlParams = getExportPdfQuoteUrlParams(state);
    const params = getExportPdfQuoteParams(state);

    const onSuccess = (data) => {
      this.setSubmittingState(false);
      this.setModalSubmittingState(false);
      this.dismissModal();

      const filename = getExportPdfFilename(state);
      openBlob(data, filename);
    };

    const onFailure = () => {
      this.displayFailureAlert('Failed to export PDF');
      this.setModalSubmittingState(false);
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
      intent: CHANGE_EXPORT_PDF_TEMPLATE,
      template: value,
    });
  }

  redirectToURL = (url) => {
    window.location.href = url;
  }

  redirectToQuoteList = () => this.redirectToURL(getQuoteListURL(this.store.getState()));

  redirectToCreateInvoice = () => this.redirectToURL(
    getCreateInvoiceFromQuoteURL(this.store.getState()),
  );

  redirectToReadQuoteWithExportPdfModal = () => {
    const state = this.store.getState();
    const url = getQuoteReadWithExportPdfModalUrl(state);

    this.redirectToURL(url);
  }

  redirectToReadQuoteWithEmailModal = () => {
    const state = this.store.getState();
    const url = getQuoteReadWithEmailModalUrl(state);

    this.redirectToURL(url);
  }

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

  setModalSubmittingState = isModalSubmitting => this.store.dispatch({
    intent: SET_MODAL_SUBMITTING_STATE, isModalSubmitting,
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

  exportPdfOrSaveAndExportPdf = () => {
    const state = this.store.getState();
    const shouldSaveAndExportPdf = getShouldSaveAndExportPdf(state);
    if (shouldSaveAndExportPdf) {
      this.saveAndExportPdf();
    } else {
      this.displayExportPdfModal();
    }
  }

  saveAndEmailQuote = () => {
    const onSuccess = (successResponse) => {
      if (getIsCreating(this.store.getState())) {
        this.updateQuoteIdAfterCreate(successResponse.id);
      }
      this.pushSuccessfulSaveMessage(successResponse.message);
      this.redirectToReadQuoteWithEmailModal();
    };

    this.createOrUpdateQuote({ onSuccess });
  }

  updateEmailQuoteDetail = ({ key, value }) => {
    this.store.dispatch({
      intent: UPDATE_EMAIL_QUOTE_DETAIL, key, value,
    });
  }

  addEmailAttachments = (files) => {
    const intent = ADD_EMAIL_ATTACHMENTS;
    this.store.dispatch({ intent, files });

    this.uploadEmailAttachments(files);
  };

  uploadEmailAttachments = (files) => {
    const state = this.store.getState();

    getFilesForUpload(state, files).forEach(file => this.uploadEmailAttachment(file));
  };

  uploadEmailAttachment = (file) => {
    const onSuccess = (response) => {
      const intent = UPLOAD_EMAIL_ATTACHMENT;
      this.store.dispatch({ intent, ...response, file });
    };

    const onFailure = ({ message }) => {
      const intent = UPLOAD_EMAIL_ATTACHMENT_FAILED;
      this.store.dispatch({ intent, message, file });
    };

    const onProgress = (uploadProgress) => {
      const intent = UPDATE_EMAIL_ATTACHMENT_UPLOAD_PROGRESS;
      this.store.dispatch({ intent, uploadProgress, file });
    };

    const state = this.store.getState();
    this.integration.writeFormData({
      intent: UPLOAD_EMAIL_ATTACHMENT,
      content: {
        file,
      },
      urlParams: {
        businessId: getBusinessId(state),
      },
      onSuccess,
      onFailure,
      onProgress,
    });
  };

  removeEmailAttachment = (index) => {
    const intent = REMOVE_EMAIL_ATTACHMENT;
    this.store.dispatch({ intent, index });
  };

  closeEmailQuoteDetailModal = () => {
    this.dismissModal();
    this.store.dispatch({ intent: RESET_OPEN_SEND_EMAIL });
    this.store.dispatch({ intent: RESET_EMAIL_QUOTE_DETAIL });
  }

  closeEmailSettingsModal = () => {
    this.dismissModal();
    this.store.dispatch({ intent: RESET_OPEN_SEND_EMAIL });
  }

  redirectToInvoiceAndQuoteSettings = () => {
    const state = this.store.getState();
    const url = getInvoiceAndQuoteSettingsUrl(state);

    this.redirectToURL(url);
  }

  openSalesSettingsTabAndCloseModal = () => {
    this.closeEmailSettingsModal();
    this.redirectToInvoiceAndQuoteSettings();
  }

  sendEmail = () => {
    this.setModalSubmittingState(true);

    const onSuccess = ({ message }) => {
      this.setModalSubmittingState(false);
      this.pushMessage({
        type: SUCCESSFULLY_EMAILED_QUOTE,
        content: message,
      });
      this.redirectToQuoteList();
    };

    const onFailure = ({ message }) => {
      this.setModalSubmittingState(false);
      this.store.dispatch({
        intent: SET_MODAL_ALERT, modalAlert: { type: 'danger', message },
      });
    };

    const state = this.store.getState();

    const intent = SEND_EMAIL;
    const urlParams = getSendEmailUrlParams(state);
    const content = getSendEmailPayload(state);

    this.integration.write({
      intent, urlParams, content, onSuccess, onFailure,
    });
  }

  dismissModalAlert = () => this.store.dispatch({ intent: SET_MODAL_ALERT });

  updateURLFromState = (state) => {
    const params = getRouteUrlParams(state);
    this.replaceURLParams(params);
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
          onDismissModalAlert={this.dismissModalAlert}
          onDismissModal={this.dismissModal}
          onConfirmDeleteButtonClick={this.deleteQuote}
          onConfirmCancelButtonClick={this.cancelQuote}
          onConfirmSaveButtonClick={this.saveQuoteAndRedirectToInvoice}
          onConfirmUnsaveButtonClick={this.redirectToCreateInvoice}
          onConfirmSaveAndCreateNewButtonClick={this.saveAndCreateNewQuote}
          onConfirmSaveAndDuplicateButtonClick={this.saveAndDuplicateQuote}
          onExportPdfButtonClick={this.exportPdfOrSaveAndExportPdf}
          onSaveAndEmailButtonClick={this.saveAndEmailQuote}
          onConfirmExportPdfButtonClick={this.exportQuotePdf}
          onChangeExportPdfForm={this.changeExportPdfForm}
          onEmailQuoteDetailChange={this.updateEmailQuoteDetail}
          onConfirmEmailQuoteButtonClick={this.sendEmail}
          onCancelEmailQuoteButtonClick={this.closeEmailQuoteDetailModal}
          onAddAttachments={this.addEmailAttachments}
          onRemoveAttachment={this.removeEmailAttachment}
          onConfirmEmailSettingButtonClick={this.openSalesSettingsTabAndCloseModal}
          onCloseEmailSettingButtonClick={this.closeEmailSettingsModal}
        />
      </Provider>
    );

    this.setRootView(wrappedView);
  };

  saveHandler = () => (
    getIsEmailModalOpen(this.store.getState()) ? this.sendEmail() : this.saveQuote()
  );

  handlers = {
    SAVE_ACTION: this.saveHandler,
  };

  run = ({
    context, payload, message,
  }) => {
    this.setInitialState(context, payload, message);
    setupHotKeys(keyMap, this.handlers);
    this.render();

    this.store.subscribe(this.updateURLFromState);
  };
}
