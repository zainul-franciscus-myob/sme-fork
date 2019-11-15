import { Provider } from 'react-redux';
import React from 'react';

import {
  ADD_EMAIL_ATTACHMENTS,
  CHANGE_EXPORT_PDF_TEMPLATE,
  DELETE_QUOTE_DETAIL,
  EXPORT_QUOTE_PDF,
  LOAD_CUSTOMER_ADDRESS,
  LOAD_CUSTOMER_AFTER_CREATE,
  REMOVE_EMAIL_ATTACHMENT,
  RESET_EMAIL_QUOTE_DETAIL,
  RESET_OPEN_SEND_EMAIL,
  SEND_EMAIL,
  SET_ALERT,
  SET_CUSTOMER_LOADING_STATE,
  SET_MODAL_ALERT,
  SET_MODAL_SUBMITTING_STATE,
  UPDATE_EMAIL_ATTACHMENT_UPLOAD_PROGRESS,
  UPDATE_EMAIL_QUOTE_DETAIL,
  UPDATE_QUOTE_ID_AFTER_CREATE,
  UPLOAD_EMAIL_ATTACHMENT,
  UPLOAD_EMAIL_ATTACHMENT_FAILED,
} from '../../QuoteIntents';
import {
  ADD_SERVICE_QUOTE_LINE,
  CLOSE_MODAL,
  CREATE_SERVICE_QUOTE,
  FORMAT_SERVICE_QUOTE_LINE,
  GET_SERVICE_QUOTE_CALCULATED_TOTALS,
  LOAD_ACCOUNT_AFTER_CREATE,
  OPEN_MODAL,
  REMOVE_SERVICE_QUOTE_LINE,
  RESET_TOTALS,
  SET_ACCOUNT_LOADING_STATE,
  SET_SUBMITTING_STATE,
  UPDATE_SERVICE_QUOTE,
  UPDATE_SERVICE_QUOTE_HEADER_OPTIONS,
  UPDATE_SERVICE_QUOTE_LINE,
} from './ServiceQuoteIntents';
import { RESET_STATE, SET_INITIAL_STATE } from '../../../SystemIntents';
import {
  SUCCESSFULLY_DELETED_SERVICE_QUOTE,
  SUCCESSFULLY_EMAILED_QUOTE,
  SUCCESSFULLY_SAVED_SERVICE_QUOTE,
} from '../quoteMessageTypes';
import {
  getAccountModalContext,
  getBusinessId,
  getCalculatedTotalsPayload,
  getContactModalContext,
  getCreateDuplicateQuoteURL,
  getCreateInvoiceFromQuoteURL,
  getCreateNewServiceQuoteURL,
  getCustomerId,
  getExportPdfFilename,
  getExportPdfQuoteParams,
  getExportPdfQuoteUrlParams,
  getFilesForUpload,
  getInvoiceAndQuoteSettingsUrl,
  getIsCreating,
  getIsEmailModalOpen,
  getIsPageEdited,
  getIsTableEmpty,
  getLoadAddedAccountUrlParams,
  getLoadCustomerUrlParams,
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
} from './ServiceQuoteSelectors';
import AccountModalModule from '../../../account/accountModal/AccountModalModule';
import ContactModalModule from '../../../contact/contactModal/ContactModalModule';
import ModalType from '../ModalType';
import SaveActionType from '../SaveActionType';
import ServiceQuoteView from './components/ServiceQuoteView';
import Store from '../../../store/Store';
import keyMap from '../../../hotKeys/keyMap';
import openBlob from '../../../blobOpener/openBlob';
import serviceQuoteReducer from './serviceQuoteReducer';
import setupHotKeys from '../../../hotKeys/setupHotKeys';

export default class ServiceQuoteModule {
  constructor({
    integration, setRootView, pushMessage, reload, replaceURLParams,
  }) {
    this.integration = integration;
    this.setRootView = setRootView;
    this.pushMessage = pushMessage;
    this.reload = reload;
    this.replaceURLParams = replaceURLParams;
    this.store = new Store(serviceQuoteReducer);

    this.accountModalModule = new AccountModalModule({
      integration,
    });
    this.contactModalModule = new ContactModalModule({ integration });
  }

  setAccountLoadingState= isAccountLoading => this.store.dispatch({
    intent: SET_ACCOUNT_LOADING_STATE, isAccountLoading,
  });

  loadAccountAfterCreate = ({ message, id }, onChange) => {
    this.accountModalModule.close();
    this.displaySuccessAlert(message);
    this.setAccountLoadingState(true);

    const onSuccess = (payload) => {
      this.setAccountLoadingState(false);
      this.store.dispatch({
        intent: LOAD_ACCOUNT_AFTER_CREATE, ...payload,
      });

      onChange(payload);
    };

    const onFailure = () => {
      this.setAccountLoadingState(false);
    };

    const state = this.store.getState();
    const intent = LOAD_ACCOUNT_AFTER_CREATE;
    const urlParams = getLoadAddedAccountUrlParams(state, id);
    this.integration.read({
      intent, urlParams, onSuccess, onFailure,
    });
  };

  openAccountModal = (onChange) => {
    const state = this.store.getState();
    const accountModalContext = getAccountModalContext(state);
    this.accountModalModule.run({
      context: accountModalContext,
      onSaveSuccess: payload => this.loadAccountAfterCreate({ ...payload }, onChange),
      onLoadFailure: message => this.displayFailureAlert(message),
    });
  };

  resetTotals = () => this.store.dispatch({ intent: RESET_TOTALS });

  getCalculatedTotals = () => {
    const state = this.store.getState();
    if (getIsTableEmpty(state)) {
      this.resetTotals();
      return;
    }
    const intent = GET_SERVICE_QUOTE_CALCULATED_TOTALS;
    const onSuccess = ({ totals }) => {
      this.store.dispatch({
        intent,
        totals,
      });
    };
    const onFailure = error => this.displayFailureAlert(error.message);

    this.integration.write({
      intent,
      urlParams: { businessId: getBusinessId(state) },
      content: getCalculatedTotalsPayload(state),
      onSuccess,
      onFailure,
    });
  }

  setCustomerAddress = address => this.store.dispatch({
    intent: LOAD_CUSTOMER_ADDRESS,
    address,
  })

  loadCustomerAddress = () => {
    const state = this.store.getState();
    const urlParams = {
      businessId: getBusinessId(state),
      customerId: getCustomerId(state),
    };

    const onSuccess = ({ address }) => this.setCustomerAddress(address);

    const onFailure = (error) => {
      this.displayFailureAlert(error.message);
      this.setCustomerAddress('');
    };

    this.integration.read({
      intent: LOAD_CUSTOMER_ADDRESS,
      urlParams,
      onSuccess,
      onFailure,
    });
  }

  updateHeaderOptions = ({ key, value }) => {
    this.store.dispatch({
      intent: UPDATE_SERVICE_QUOTE_HEADER_OPTIONS,
      key,
      value,
    });

    const taxKeys = ['taxInclusive'];
    if (taxKeys.includes(key)) {
      this.getCalculatedTotals();
    }

    if (key === 'customerId') {
      this.loadCustomerAddress();
    }
  }

  updateTableLine = ({ index, key, value }) => {
    this.store.dispatch({
      intent: UPDATE_SERVICE_QUOTE_LINE,
      index,
      key,
      value,
    });

    const taxKeys = ['allocatedAccountId', 'taxCodeId'];
    if (taxKeys.includes(key)) {
      this.getCalculatedTotals();
    }
  }

  addTableLine = line => this.store.dispatch({
    intent: ADD_SERVICE_QUOTE_LINE,
    line,
  })

  removeTableLineAndCalculateTotals = (index) => {
    this.store.dispatch({
      intent: REMOVE_SERVICE_QUOTE_LINE,
      index,
    });

    this.getCalculatedTotals();
  }

  formatLine = index => this.store.dispatch({
    intent: FORMAT_SERVICE_QUOTE_LINE,
    index,
  });

  formatAndCalculateTotals = (index) => {
    this.formatLine(index);
    this.getCalculatedTotals();
  }

  updateQuoteIdAfterCreate = (quoteId) => {
    this.store.dispatch({ intent: UPDATE_QUOTE_ID_AFTER_CREATE, quoteId });
  }

  createOrUpdateQuote = ({ onSuccess }) => {
    this.setSubmittingState(true);

    const state = this.store.getState();
    const isCreating = getIsCreating(state);

    const intent = isCreating
      ? CREATE_SERVICE_QUOTE
      : UPDATE_SERVICE_QUOTE;

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
  }

  saveQuote = () => {
    const onSuccess = ({ message }) => {
      this.setSubmittingState(false);
      this.pushSuccessfulSaveMessage(message);
      this.redirectToQuoteList();
    };

    this.createOrUpdateQuote({ onSuccess });
  }

  executeSaveAndAction = saveAndAction => ({
    [SaveActionType.SAVE_AND_CREATE_NEW]: this.openSaveAndCreateNewConfirmationModal,
    [SaveActionType.SAVE_AND_DUPLICATE]: this.openSaveAndDuplicateConfirmationModal,
  }[saveAndAction]())

  saveAndCreateNewQuote = () => {
    const onSuccess = ({ message }) => {
      const state = this.store.getState();
      this.pushSuccessfulSaveMessage(message);

      if (getShouldReload(state)) {
        this.reload();
      } else {
        this.redirectToURL(getCreateNewServiceQuoteURL(state));
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

  saveAndRedirectToInvoice = () => {
    const onSuccess = () => {
      this.redirectToCreateInvoice();
    };

    this.createOrUpdateQuote({ onSuccess });
  }

  pushSuccessfulSaveMessage = (message) => {
    this.pushMessage({
      type: SUCCESSFULLY_SAVED_SERVICE_QUOTE,
      content: message,
    });
  }

  deleteServiceQuoteEntry = () => {
    this.setSubmittingState(true);
    this.closeModal();

    const onSuccess = ({ message }) => {
      this.setSubmittingState(false);
      this.pushMessage({
        type: SUCCESSFULLY_DELETED_SERVICE_QUOTE,
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
  }

  exportQuotePdf = () => {
    this.setModalSubmittingState(true);

    const state = this.store.getState();
    const urlParams = getExportPdfQuoteUrlParams(state);
    const params = getExportPdfQuoteParams(state);

    const onSuccess = (data) => {
      this.setSubmittingState(false);
      this.setModalSubmittingState(false);
      this.closeModal();

      const filename = getExportPdfFilename(state);
      openBlob(data, filename);
    };

    const onFailure = () => {
      this.displayFailureAlert('Failed to export PDF');
      this.setModalSubmittingState(false);
      this.setSubmittingState(false);
    };

    this.integration.readFile({
      intent: EXPORT_QUOTE_PDF,
      urlParams,
      params,
      onSuccess,
      onFailure,
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

  openCancelModal = () => {
    const intent = OPEN_MODAL;
    if (getIsPageEdited(this.store.getState())) {
      this.store.dispatch({
        intent,
        modalType: ModalType.CANCEL,
      });
    } else {
      this.redirectToQuoteList();
    }
  };

  openDeleteModal = () => this.store.dispatch({
    intent: OPEN_MODAL,
    modalType: ModalType.DELETE,
  });

  openUnsavedModal = () => {
    const intent = OPEN_MODAL;
    if (getIsPageEdited(this.store.getState())) {
      this.store.dispatch({
        intent,
        modalType: ModalType.UNSAVED,
      });
    } else {
      this.redirectToCreateInvoice();
    }
  }

  openSaveAndCreateNewConfirmationModal = () => {
    this.store.dispatch({
      intent: OPEN_MODAL,
      modalType: ModalType.SAVE_AND_CREATE_NEW,
    });
  }

  openSaveAndDuplicateConfirmationModal = () => {
    this.store.dispatch({
      intent: OPEN_MODAL,
      modalType: ModalType.SAVE_AND_DUPLICATE,
    });
  }

  displayExportPdfModal = () => {
    this.store.dispatch({
      intent: OPEN_MODAL,
      modalType: ModalType.EXPORT_PDF,
    });
  }

  closeModal = () => this.store.dispatch({
    intent: CLOSE_MODAL,
  });

  setModalSubmittingState = isModalSubmitting => this.store.dispatch({
    intent: SET_MODAL_SUBMITTING_STATE, isModalSubmitting,
  });

  displaySuccessAlert = message => this.store.dispatch({
    intent: SET_ALERT,
    alert: { type: 'success', message },
  });

  displayFailureAlert = errorMessage => this.store.dispatch({
    intent: SET_ALERT,
    alert: {
      type: 'danger',
      message: errorMessage,
    },
  });

  displaySuccessAlert = message => this.store.dispatch({
    intent: SET_ALERT,
    alert: {
      type: 'success',
      message,
    },
  });

  dismissAlert = () => this.store.dispatch({
    intent: SET_ALERT,
  });

  setSubmittingState = isSubmitting => this.store.dispatch({
    intent: SET_SUBMITTING_STATE,
    isSubmitting,
  });

  updateURLFromState = (state) => {
    const params = getRouteUrlParams(state);
    this.replaceURLParams(params);
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
    this.closeModal();
    this.store.dispatch({ intent: RESET_OPEN_SEND_EMAIL });
    this.store.dispatch({ intent: RESET_EMAIL_QUOTE_DETAIL });
  }

  closeEmailSettingsModal = () => {
    this.closeModal();
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

  openContactModal = () => {
    const state = this.store.getState();
    const context = getContactModalContext(state);

    this.contactModalModule.run({
      context,
      onLoadFailure: message => this.displayFailureAlert(message),
      onSaveSuccess: this.loadCustomerAfterCreate,
    });
  }

  loadCustomerAfterCreate = ({ message, id }) => {
    this.contactModalModule.resetState();
    this.displaySuccessAlert(message);
    this.setCustomerLoadingState(true);

    const intent = LOAD_CUSTOMER_AFTER_CREATE;

    const state = this.store.getState();
    const urlParams = getLoadCustomerUrlParams(state, id);

    const onSuccess = (payload) => {
      this.setCustomerLoadingState(false);
      this.store.dispatch({
        intent: LOAD_CUSTOMER_AFTER_CREATE, customerId: id, ...payload,
      });
    };

    const onFailure = () => {
      this.setCustomerLoadingState(false);
    };

    this.integration.read({
      intent, urlParams, onSuccess, onFailure,
    });
  }

  setCustomerLoadingState=(isCustomerLoading) => {
    this.store.dispatch({
      intent: SET_CUSTOMER_LOADING_STATE, isCustomerLoading,
    });
  }

  dismissModalAlert = () => this.store.dispatch({ intent: SET_MODAL_ALERT });

  render = () => {
    const accountModal = this.accountModalModule.render();
    const contactModal = this.contactModalModule.render();

    const serviceQuoteView = (
      <ServiceQuoteView
        accountModal={accountModal}
        onAddAccount={this.openAccountModal}
        onUpdateHeaderOptions={this.updateHeaderOptions}
        onUpdateRow={this.updateTableLine}
        onAddRow={this.addTableLine}
        onRemoveRow={this.removeTableLineAndCalculateTotals}
        onRowInputBlur={this.formatAndCalculateTotals}
        onSaveButtonClick={this.saveQuote}
        onSaveAndButtonClick={this.executeSaveAndAction}
        onConvertToInvoiceButtonClick={this.openUnsavedModal}
        onCancelButtonClick={this.openCancelModal}
        onDeleteButtonClick={this.openDeleteModal}
        onConfirmSaveButtonClick={this.saveAndRedirectToInvoice}
        onConfirmUnsaveButtonClick={this.redirectToCreateInvoice}
        onConfirmSaveAndCreateNewButtonClick={this.saveAndCreateNewQuote}
        onConfirmSaveAndDuplicateButtonClick={this.saveAndDuplicateQuote}
        onCloseModal={this.closeModal}
        onCancelModal={this.redirectToQuoteList}
        onDeleteModal={this.deleteServiceQuoteEntry}
        onDismissAlert={this.dismissAlert}
        onDismissModalAlert={this.dismissModalAlert}
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
        contactModal={contactModal}
        onAddCustomerButtonClick={this.openContactModal}
      />
    );

    const wrappedView = (
      <Provider store={this.store}>
        {serviceQuoteView}
      </Provider>
    );

    this.setRootView(wrappedView);
  }

  unsubscribeFromStore = () => {
    this.store.unsubscribeAll();
  }

  setInitialState = (context, payload, message) => {
    const intent = SET_INITIAL_STATE;

    this.store.dispatch({
      intent,
      context,
      ...payload,
      message,
    });
  }

  saveHandler = () => (
    getIsEmailModalOpen(this.store.getState()) ? this.sendEmail() : this.saveQuote()
  );

  handlers = {
    SAVE_ACTION: this.saveHandler,
  };

  run({ context, payload, message }) {
    this.setInitialState(context, payload, message);
    setupHotKeys(keyMap, this.handlers);
    this.render();

    this.store.subscribe(this.updateURLFromState);
  }

  resetState = () => {
    const intent = RESET_STATE;
    this.store.dispatch({
      intent,
    });
  };
}
