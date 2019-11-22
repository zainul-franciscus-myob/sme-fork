import { Provider } from 'react-redux';
import React from 'react';

import {
  CALCULATE_QUOTE_ITEM_AMOUNT_CHANGE,
  CALCULATE_QUOTE_ITEM_ITEM_CHANGE,
  CALCULATE_QUOTE_ITEM_TAX_CODE_CHANGE,
  CALCULATE_QUOTE_ITEM_TAX_INCLUSIVE_CHANGE,
  REMOVE_QUOTE_ITEM_LINE,
} from '../QuoteIntents';
import { SUCCESSFULLY_DELETED_QUOTE, SUCCESSFULLY_EMAILED_QUOTE, SUCCESSFULLY_SAVED_QUOTE } from './QuoteMessageTypes';
import {
  getAccountModalContext,
  getContactModalContext,
  getExportPdfFilename,
  getInventoryModalContext,
  getIsCreating,
  getIsLineAmountInputDirty,
  getIsPageEdited,
  getIsTableEmpty,
  getLayout,
  getNewLineIndex,
  getRouteUrlParams,
  getShouldReload,
  getShouldSaveAndExportPdf,
} from './selectors/QuoteDetailSelectors';
import {
  getCalculateQuoteItemAmountChangePayload,
  getCalculateQuoteItemIsTaxInclusiveChangePayload,
  getCalculateQuoteItemItemChangePayload,
  getCalculateQuoteItemLineRemovePayload,
  getCalculateQuoteItemTaxCodeChangePayload,
} from './selectors/IntegratorSelectors';
import {
  getCreateDuplicateQuoteUrl,
  getCreateInvoiceFromQuoteUrl,
  getCreateNewQuoteUrl,
  getInvoiceAndQuoteSettingsUrl,
  getQuoteListURL,
  getQuoteReadWithEmailModalUrl,
  getQuoteReadWithExportPdfModalUrl,
} from './selectors/RedirectSelectors';
import { getFilesForUpload, getIsEmailModalOpen } from './selectors/EmailSelectors';
import AccountModalModule from '../../account/accountModal/AccountModalModule';
import ContactModalModule from '../../contact/contactModal/ContactModalModule';
import InventoryModalModule from '../../inventory/inventoryModal/InventoryModalModule';
import ModalType from './ModalType';
import QuoteDetailView from './components/QuoteDetailView';
import QuoteLayout from './QuoteLayout';
import SaveActionType from './SaveActionType';
import Store from '../../store/Store';
import createQuoteDetailDispatcher from './createQuoteDetailDispatcher';
import createQuoteDetailIntegrator from './createQuoteDetailIntegrator';
import keyMap from '../../hotKeys/keyMap';
import openBlob from '../../blobOpener/openBlob';
import quoteDetailReducer from './reducer/quoteDetailReducer';
import setupHotKeys from '../../hotKeys/setupHotKeys';

const messageTypes = [
  SUCCESSFULLY_SAVED_QUOTE,
];

export default class QuoteDetailModule {
  constructor({
    integration, setRootView, pushMessage, popMessages, reload, replaceURLParams,
  }) {
    this.integration = integration;
    this.setRootView = setRootView;
    this.pushMessage = pushMessage;
    this.popMessages = popMessages;
    this.messageTypes = messageTypes;
    this.reload = reload;
    this.replaceURLParams = replaceURLParams;

    this.store = new Store(quoteDetailReducer);
    this.dispatcher = createQuoteDetailDispatcher(this.store);
    this.integrator = createQuoteDetailIntegrator(this.store, integration);

    this.contactModalModule = new ContactModalModule({ integration });
    this.accountModalModule = new AccountModalModule({ integration });
    this.inventoryModalModule = new InventoryModalModule({ integration });
  }

  loadQuote = (message) => {
    this.dispatcher.setLoadingState(true);

    const onSuccess = (payload) => {
      this.dispatcher.setLoadingState(false);
      this.dispatcher.loadQuote(payload, message);
    };

    const onFailure = () => console.log('Failed to load quote');

    this.integrator.loadQuote({ onSuccess, onFailure });
  }

  createOrUpdateQuote = ({ onSuccess }) => {
    this.dispatcher.setSubmittingState(true);

    const onFailure = ({ message }) => {
      this.dispatcher.setSubmittingState(false);
      this.displayFailureAlert(message);
    };

    this.integrator.createOrUpdateQuote({ onSuccess, onFailure });
  }

  deleteQuote = () => {
    this.dispatcher.setSubmittingState(true);
    this.dispatcher.closeModal();

    const onSuccess = ({ message }) => {
      this.dispatcher.setSubmittingState(false);
      this.pushMessage({
        type: SUCCESSFULLY_DELETED_QUOTE,
        content: message,
      });
      this.redirectToQuoteList();
    };

    const onFailure = ({ message }) => {
      this.dispatcher.setSubmittingState(false);
      this.displayFailureAlert(message);
    };

    this.integrator.deleteQuote({ onSuccess, onFailure });
  }

  saveQuote = () => {
    const onSuccess = ({ message }) => {
      this.dispatcher.setSubmittingState(false);
      this.pushSuccessfulSaveMessage(message);
      this.redirectToQuoteList();
    };

    this.createOrUpdateQuote({ onSuccess });
  }

  saveAndRedirectToInvoice = () => {
    const onSuccess = () => {
      this.redirectToCreateInvoice();
    };

    this.createOrUpdateQuote({ onSuccess });
  }

  saveAndCreateNew = () => {
    const onSuccess = ({ message }) => {
      const state = this.store.getState();
      this.pushSuccessfulSaveMessage(message);

      if (getShouldReload(state)) {
        this.reload();
      } else {
        this.redirectToCreateQuote();
      }
    };

    this.createOrUpdateQuote({ onSuccess });
  }

  saveAndDuplicate = () => {
    const onSuccess = ({ message, id }) => {
      if (getIsCreating(this.store.getState())) {
        this.dispatcher.updateQuoteIdAfterCreate(id);
      }
      this.pushSuccessfulSaveMessage(message);
      this.redirectToCreateDuplicateQuote();
    };

    this.createOrUpdateQuote({ onSuccess });
  }

  saveAndExportPdf = () => {
    const onSuccess = ({ message, id }) => {
      const state = this.store.getState();
      const isCreating = getIsCreating(state);
      if (isCreating) {
        this.dispatcher.updateQuoteIdAfterCreate(id);
      }
      this.pushSuccessfulSaveMessage(message);
      this.redirectToReadQuoteWithExportPdfModal();
    };

    this.createOrUpdateQuote({ onSuccess });
  }

  displaySuccessAlert = message => this.dispatcher.setAlert({ type: 'success', message });

  displayFailureAlert = message => this.dispatcher.setAlert({ type: 'danger', message });

  pushSuccessfulSaveMessage = (message) => {
    this.pushMessage({
      type: SUCCESSFULLY_SAVED_QUOTE,
      content: message,
    });
  }

  redirectToUrl = (url) => {
    window.location.href = url;
  }

  redirectToQuoteList = () => {
    const state = this.store.getState();
    const url = getQuoteListURL(state);

    this.redirectToUrl(url);
  }

  redirectToCreateQuote = () => {
    const state = this.store.getState();
    const url = getCreateNewQuoteUrl(state);

    this.redirectToUrl(url);
  }

  redirectToCreateDuplicateQuote = () => {
    const state = this.store.getState();
    const url = getCreateDuplicateQuoteUrl(state);

    this.redirectToUrl(url);
  }

  redirectToReadQuoteWithExportPdfModal = () => {
    const state = this.store.getState();
    const url = getQuoteReadWithExportPdfModalUrl(state);

    this.redirectToUrl(url);
  }

  redirectToReadQuoteWithEmailModal = () => {
    const state = this.store.getState();
    const url = getQuoteReadWithEmailModalUrl(state);

    this.redirectToUrl(url);
  }

  redirectToCreateInvoice = () => {
    const state = this.store.getState();
    const url = getCreateInvoiceFromQuoteUrl(state);

    this.redirectToUrl(url);
  }

  redirectToInvoiceAndQuoteSettings = () => {
    const state = this.store.getState();
    const url = getInvoiceAndQuoteSettingsUrl(state);

    this.redirectToUrl(url);
  }

  calculateIsTaxInclusiveChange = () => {
    const state = this.store.getState();
    const layout = getLayout(state);

    if (layout === QuoteLayout.SERVICE) {
      this.getQuoteServiceCalculatedTotals();
    }

    if (layout === QuoteLayout.ITEM) {
      this.calculateQuoteItemIsTaxInclusiveChange();
    }
  }

  updateQuoteDetailHeaderOptions = ({ key, value }) => {
    this.dispatcher.updateQuoteDetailHeaderOptions(key, value);

    if (key === 'isTaxInclusive') {
      this.calculateIsTaxInclusiveChange();
    }

    if (key === 'contactId') {
      this.loadCustomerAddress();
    }
  }

  removeQuoteServiceLine = (index) => {
    this.dispatcher.removeQuoteServiceLine(index);
    this.getQuoteServiceCalculatedTotals();
  }

  updateQuoteServiceLine = ({ index, key, value }) => {
    this.dispatcher.updateQuoteServiceLine(index, key, value);

    const taxKeys = ['allocatedAccountId', 'taxCodeId'];
    if (taxKeys.includes(key)) {
      this.getQuoteServiceCalculatedTotals();
    }
  }

  formatQuoteServiceLine = (index) => {
    this.dispatcher.formatQuoteServiceLine(index);
    this.getQuoteServiceCalculatedTotals();
  }

  getQuoteServiceCalculatedTotals = () => {
    const state = this.store.getState();
    if (getIsTableEmpty(state)) {
      this.dispatcher.resetQuoteServiceTotals();
      return;
    }

    const onSuccess = ({ totals }) => {
      this.dispatcher.getQuoteServiceCalculatedTotals(totals);
    };

    const onFailure = error => this.displayFailureAlert(error.message);

    this.integrator.getQuoteServiceCalculatedTotals({ onSuccess, onFailure });
  }

  getQuoteItemCalculatedLines = (content, intent) => {
    this.dispatcher.setQuoteItemSubmittingState(true);

    const onSuccess = (response) => {
      this.dispatcher.setQuoteItemLineDirty(false);
      this.dispatcher.setQuoteItemSubmittingState(false);
      this.dispatcher.setQuoteItemCalculatedLines(response);
    };

    const onFailure = ({ message }) => {
      this.dispatcher.setQuoteItemLineDirty(false);
      this.dispatcher.setQuoteItemSubmittingState(false);
      this.displayFailureAlert(message);
    };

    this.integrator.getQuoteItemCalculatedLines({
      intent, content, onSuccess, onFailure,
    });
  };

  calculateQuoteItemTaxCodeChange = () => {
    const state = this.store.getState();
    const content = getCalculateQuoteItemTaxCodeChangePayload(state);

    this.getQuoteItemCalculatedLines(content, CALCULATE_QUOTE_ITEM_TAX_CODE_CHANGE);
  }

  calculateQuoteItemItemChange = (index, itemId) => {
    const state = this.store.getState();
    const content = getCalculateQuoteItemItemChangePayload(state, index, itemId);

    this.getQuoteItemCalculatedLines(content, CALCULATE_QUOTE_ITEM_ITEM_CHANGE);
  }

  calculateQuoteItemIsTaxInclusiveChange = () => {
    const state = this.store.getState();
    const content = getCalculateQuoteItemIsTaxInclusiveChangePayload(state);

    this.getQuoteItemCalculatedLines(content, CALCULATE_QUOTE_ITEM_TAX_INCLUSIVE_CHANGE);
  }

  addQuoteItemLine = (row) => {
    this.dispatcher.addQuoteItemLine(row);

    const state = this.store.getState();
    const newLineIndex = getNewLineIndex(state);
    this.calculateQuoteItemItemChange(newLineIndex, row.itemId);
  }

  updateQuoteItemLine = (index, key, value) => {
    this.dispatcher.updateQuoteItemLine(index, key, value);

    if (['units', 'unitPrice', 'discount', 'amount'].includes(key)) {
      this.dispatcher.setQuoteItemLineDirty(true);
    } else if (key === 'itemId') {
      this.calculateQuoteItemItemChange(index, value);
    } else if (key === 'taxCodeId') {
      this.calculateQuoteItemTaxCodeChange();
    }
  }

  removeQuoteItemLine = (index) => {
    this.dispatcher.removeQuoteItemLine(index);

    const state = this.store.getState();
    const content = getCalculateQuoteItemLineRemovePayload(state);
    this.getQuoteItemCalculatedLines(content, REMOVE_QUOTE_ITEM_LINE);
  };

  formatQuoteItemLine = (index, key) => {
    this.dispatcher.formatQuoteItemLine(index, key);

    const state = this.store.getState();
    const isLineAmountDirty = getIsLineAmountInputDirty(state);
    if (isLineAmountDirty) {
      const content = getCalculateQuoteItemAmountChangePayload(state, index, key);

      this.getQuoteItemCalculatedLines(content, CALCULATE_QUOTE_ITEM_AMOUNT_CHANGE);
    }
  };

  loadCustomerAddress = () => {
    const onSuccess = ({ address }) => this.dispatcher.loadContactAddress(address);

    const onFailure = (error) => {
      this.displayFailureAlert(error.message);
      this.dispatcher.loadContactAddress('');
    };

    this.integrator.loadContactAddress({ onSuccess, onFailure });
  }

  loadCustomerAfterCreate = ({ message, id }) => {
    this.contactModalModule.resetState();
    this.displaySuccessAlert(message);
    this.dispatcher.setContactLoadingState(true);

    const onSuccess = (payload) => {
      this.dispatcher.setContactLoadingState(false);
      this.dispatcher.loadContactAfterCreate(id, payload);
    };

    const onFailure = () => {
      this.dispatcher.setContactLoadingState(false);
    };

    this.integrator.loadContactAfterCreate({ id, onSuccess, onFailure });
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

  loadAccountAfterCreate = ({ message, id }, onChange) => {
    this.accountModalModule.close();
    this.displaySuccessAlert(message);
    this.dispatcher.setAccountLoadingState(true);

    const onSuccess = (payload) => {
      this.dispatcher.setAccountLoadingState(false);
      this.dispatcher.loadAccountAfterCreate(payload);
      onChange(payload);
    };

    const onFailure = () => {
      this.dispatcher.setAccountLoadingState(false);
    };

    this.integrator.loadAccountAfterCreate({ id, onSuccess, onFailure });
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

  loadItemAfterCreate = ({ itemId }, onChangeItemTableRow) => {
    this.dispatcher.setQuoteItemSubmittingState(true);

    const onSuccess = (response) => {
      this.dispatcher.loadItemAfterCreate(response);
      onChangeItemTableRow({ id: itemId });
      this.dispatcher.setQuoteItemSubmittingState(false);
    };

    const onFailure = ({ message }) => {
      this.displayFailureAlert(message);
      this.dispatcher.setQuoteItemSubmittingState(false);
    };

    this.integrator.loadItemAfterCreate({ id: itemId, onSuccess, onFailure });
  };

  openInventoryModal = (onChangeItemTableRow) => {
    const state = this.store.getState();
    const context = getInventoryModalContext(state);

    const onLoadFailure = ({ message }) => {
      this.displayFailureAlert(message);
      this.inventoryModalModule.resetState();
    };

    const onSaveSuccess = ({ message, itemId }) => {
      this.displaySuccessAlert(message);
      this.loadItemAfterCreate({ itemId }, onChangeItemTableRow);
      this.inventoryModalModule.resetState();
    };

    this.inventoryModalModule.run({
      context, onSaveSuccess, onLoadFailure,
    });
  }

  openCancelModal = () => {
    if (getIsPageEdited(this.store.getState())) {
      this.dispatcher.openModal(ModalType.CANCEL);
    } else {
      this.redirectToQuoteList();
    }
  };

  openDeleteModal = () => this.dispatcher.openModal(ModalType.DELETE);

  openUnsavedModal = () => {
    if (getIsPageEdited(this.store.getState())) {
      this.dispatcher.openModal(ModalType.UNSAVED);
    } else {
      this.redirectToCreateInvoice();
    }
  }

  openSaveAndCreateNewConfirmationModal = () => {
    this.dispatcher.openModal(ModalType.SAVE_AND_CREATE_NEW);
  }

  openSaveAndDuplicateConfirmationModal = () => {
    this.dispatcher.openModal(ModalType.SAVE_AND_DUPLICATE);
  }

  executeSaveAndAction = saveAndAction => ({
    [SaveActionType.SAVE_AND_CREATE_NEW]: this.openSaveAndCreateNewConfirmationModal,
    [SaveActionType.SAVE_AND_DUPLICATE]: this.openSaveAndDuplicateConfirmationModal,
  }[saveAndAction]())

  saveAndEmailQuote = () => {
    const onSuccess = (successResponse) => {
      if (getIsCreating(this.store.getState())) {
        this.dispatcher.updateQuoteIdAfterCreate(successResponse.id);
      }
      this.pushSuccessfulSaveMessage(successResponse.message);
      this.redirectToReadQuoteWithEmailModal();
    };

    this.createOrUpdateQuote({ onSuccess });
  }

  addEmailAttachments = (files) => {
    this.dispatcher.addEmailAttachments(files);
    this.uploadEmailAttachments(files);
  };

  uploadEmailAttachments = (files) => {
    const state = this.store.getState();

    getFilesForUpload(state, files).forEach(file => this.uploadEmailAttachment(file));
  };

  uploadEmailAttachment = (file) => {
    const onSuccess = (response) => {
      this.dispatcher.uploadEmailAttachment(response, file);
    };

    const onFailure = ({ message }) => {
      this.dispatcher.uploadEmailAttachmentFailed(message, file);
    };

    const onProgress = (uploadProgress) => {
      this.dispatcher.uploadEmailAttachmentUploadProgress(uploadProgress, file);
    };

    this.integrator.uploadEmailAttachment({
      file, onSuccess, onFailure, onProgress,
    });
  };

  closeEmailQuoteDetailModal = () => {
    this.dispatcher.closeModal();
    this.dispatcher.resetOpenSendEmail();
    this.dispatcher.resetEmailQuoteDetail();
  }

  closeEmailSettingsModal = () => {
    this.dispatcher.closeModal();
    this.dispatcher.resetOpenSendEmail();
  }


  openSalesSettingsTabAndCloseModal = () => {
    this.closeEmailSettingsModal();
    this.redirectToInvoiceAndQuoteSettings();
  }

  sendEmail = () => {
    this.dispatcher.setModalSubmittingState(true);

    const onSuccess = ({ message }) => {
      this.dispatcher.setModalSubmittingState(false);
      this.pushMessage({
        type: SUCCESSFULLY_EMAILED_QUOTE,
        content: message,
      });
      this.redirectToQuoteList();
    };

    const onFailure = ({ message }) => {
      this.dispatcher.setModalSubmittingState(false);
      this.dispatcher.setModalAlert({ type: 'danger', message });
    };

    this.integrator.sentEmail({ onSuccess, onFailure });
  }

  exportQuotePdf = () => {
    this.dispatcher.setModalSubmittingState(true);

    const onSuccess = (data) => {
      this.dispatcher.setSubmittingState(false);
      this.dispatcher.setModalSubmittingState(false);
      this.dispatcher.closeModal();

      const state = this.store.getState();
      const filename = getExportPdfFilename(state);
      openBlob(data, filename);
    };

    const onFailure = () => {
      this.displayFailureAlert('Failed to export PDF');
      this.dispatcher.setModalSubmittingState(false);
      this.dispatcher.setSubmittingState(false);
    };

    this.integrator.exportQuotePdf({ onSuccess, onFailure });
  }

  exportPdfOrSaveAndExportPdf = () => {
    const state = this.store.getState();
    const shouldSaveAndExportPdf = getShouldSaveAndExportPdf(state);
    if (shouldSaveAndExportPdf) {
      this.saveAndExportPdf();
    } else {
      this.dispatcher.openModal(ModalType.EXPORT_PDF);
    }
  }

  readMessages = () => {
    const [message] = this.popMessages(this.messageTypes);
    this.message = message;
  }

  updateURLFromState = (state) => {
    const params = getRouteUrlParams(state);
    this.replaceURLParams(params);
  }

  render = () => {
    const contactModal = this.contactModalModule.render();
    const accountModal = this.accountModalModule.render();
    const inventoryModal = this.inventoryModalModule.render();

    const view = (
      <Provider store={this.store}>
        <QuoteDetailView
          contactModal={contactModal}
          accountModal={accountModal}
          inventoryModal={inventoryModal}
          onDismissAlert={this.dispatcher.dismissAlert}
          onUpdateHeaderOptions={this.updateQuoteDetailHeaderOptions}
          onAddCustomerButtonClick={this.openContactModal}
          serviceLayoutListeners={{
            onAddRow: this.dispatcher.addQuoteServiceLine,
            onRemoveRow: this.removeQuoteServiceLine,
            onUpdateRow: this.updateQuoteServiceLine,
            onRowInputBlur: this.formatQuoteServiceLine,
            onAddAccountButtonClick: this.openAccountModal,
          }}
          itemLayoutListeners={{
            onAddRow: this.addQuoteItemLine,
            onRemoveRow: this.removeQuoteItemLine,
            onUpdateRow: this.updateQuoteItemLine,
            onRowInputBlur: this.formatQuoteItemLine,
            onAddItemButtonClick: this.openInventoryModal,
          }}
          quoteActionListeners={{
            onSaveButtonClick: this.saveQuote,
            onSaveAndButtonClick: this.executeSaveAndAction,
            onCancelButtonClick: this.openCancelModal,
            onDeleteButtonClick: this.openDeleteModal,
            onConvertToInvoiceButtonClick: this.openUnsavedModal,
            onExportPdfButtonClick: this.exportPdfOrSaveAndExportPdf,
            onSaveAndEmailButtonClick: this.saveAndEmailQuote,
          }}
          modalListeners={{
            onDismissModal: this.dispatcher.closeModal,
            onConfirmCancelButtonClick: this.redirectToQuoteList,
            onConfirmDeleteButtonClick: this.deleteQuote,
            onConfirmSaveButtonClick: this.saveAndRedirectToInvoice,
            onConfirmUnsaveButtonClick: this.redirectToCreateInvoice,
            onConfirmSaveAndCreateNewButtonClick: this.saveAndCreateNew,
            onConfirmSaveAndDuplicateButtonClick: this.saveAndDuplicate,
            onEmailQuoteDetailChange: this.dispatcher.updateEmailQuoteDetail,
            onConfirmEmailQuoteButtonClick: this.sendEmail,
            onCancelEmailQuoteButtonClick: this.closeEmailQuoteDetailModal,
            onAddAttachments: this.addEmailAttachments,
            onRemoveAttachment: this.dispatcher.removeEmailAttachment,
            onConfirmEmailSettingButtonClick: this.openSalesSettingsTabAndCloseModal,
            onCloseEmailSettingButtonClick: this.closeEmailSettingsModal,
            onConfirmExportPdfButtonClick: this.exportQuotePdf,
            onChangeExportPdfTemplate: this.dispatcher.changeExportPdfTemplate,
            onDismissAlert: this.dispatcher.dismissModalAlert,
          }}
        />
      </Provider>
    );

    this.setRootView(view);
  }

  setInitialState = context => this.dispatcher.setInitialState(context);

  resetState = () => this.dispatcher.resetState();

  unsubscribeFromStore = () => this.store.unsubscribeAll();

  saveHandler = () => {
    const state = this.store.getState();
    if (getIsEmailModalOpen(state)) {
      this.sendEmail();
    } else {
      this.saveQuote();
    }
  }

  handlers = {
    SAVE_ACTION: this.saveHandler,
  };

  run(context) {
    this.dispatcher.setInitialState(context);
    setupHotKeys(keyMap, this.handlers);
    this.render();

    this.readMessages();
    this.store.subscribe(this.updateURLFromState);

    this.loadQuote(this.message);
  }
}
