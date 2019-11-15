import { Provider } from 'react-redux';
import React from 'react';

import {
  CALCULATE_INVOICE_ITEM_LINES_CHANGE,
  CALCULATE_INVOICE_ITEM_LINE_INPUT_CHANGE,
  CALCULATE_INVOICE_ITEM_LINE_TAX_CODE_CHANGE,
  CALCULATE_INVOICE_ITEM_TAX_INCLUSIVE_CHANGE,
  REMOVE_INVOICE_ITEM_LINE,
} from '../InvoiceIntents';
import {
  SUCCESSFULLY_DELETED_INVOICE,
  SUCCESSFULLY_EMAILED_INVOICE,
  SUCCESSFULLY_SAVED_INVOICE,
} from './invoiceMessageTypes';
import {
  getAccountModalContext,
  getAreLinesCalculating,
  getContactModalContext,
  getIsCreating,
  getIsLineAmountDirty,
  getIsPageEdited,
  getIsServiceLayout,
  getIsTableEmpty,
  getRouteURLParams,
  getShouldReload,
  getShowOnlinePayment,
} from './selectors/invoiceDetailSelectors';
import {
  getCreateDuplicateInvoiceUrl,
  getCreateNewInvoiceUrl,
  getInvoiceAndQuoteSettingsUrl,
  getInvoiceListUrl,
  getInvoicePaymentUrl,
  getInvoiceReadWithEmailModalUrl,
  getInvoiceReadWithExportPdfModalUrl,
} from './selectors/redirectSelectors';
import { getExportPdfFilename, getShouldSaveAndExportPdf } from './selectors/exportPdfSelectors';
import { getFilesForUpload, getIsEmailModalOpen } from './selectors/emailSelectors';
import {
  getInvoiceItemCalculateAmountChangePayload,
  getInvoiceItemCalculateLineChangePayload,
  getInvoiceItemCalculateLineRemovalPayload,
  getInvoiceItemCalculateTaxCodeChangePayload,
  getInvoiceItemCalculateTaxInclusiveChangePayload,
  getIsAnAmountLineInput,
  getNewLineIndex,
} from './selectors/itemLayoutSelectors';
import AccountModalModule from '../../account/accountModal/AccountModalModule';
import ContactModalModule from '../../contact/contactModal/ContactModalModule';
import InvoiceDetailModalType from './InvoiceDetailModalType';
import InvoiceDetailView from './components/InvoiceDetailView';
import SaveActionType from './SaveActionType';
import Store from '../../store/Store';
import createInvoiceDetailDispatcher from './createInvoiceDetailDispatcher';
import createInvoiceDetailIntegrator from './createInvoiceDetailIntegrator';
import invoiceDetailReducer from './reducer/invoiceDetailReducer';
import keyMap from '../../hotKeys/keyMap';
import openBlob from '../../blobOpener/openBlob';
import setupHotKeys from '../../hotKeys/setupHotKeys';

const messageTypes = [
  SUCCESSFULLY_SAVED_INVOICE,
  SUCCESSFULLY_EMAILED_INVOICE,
];

export default class InvoiceDetailModule {
  constructor({
    integration, setRootView, pushMessage, popMessages, replaceURLParams, reload,
  }) {
    this.setRootView = setRootView;
    this.pushMessage = pushMessage;
    this.popMessages = popMessages;
    this.messageTypes = messageTypes;
    this.replaceURLParams = replaceURLParams;
    this.reload = reload;

    this.store = new Store(invoiceDetailReducer);
    this.dispatcher = createInvoiceDetailDispatcher(this.store);
    this.integrator = createInvoiceDetailIntegrator(this.store, integration);

    this.accountModalModule = new AccountModalModule({
      integration,
    });
    this.contactModalModule = new ContactModalModule({ integration });
  }

  openAccountModal = (onChange) => {
    const state = this.store.getState();
    const accountModalContext = getAccountModalContext(state);
    this.accountModalModule.run({
      context: accountModalContext,
      onSaveSuccess: payload => this.loadAccountAfterCreate(payload, onChange),
      onLoadFailure: message => this.dispatcher.setAlert({ type: 'danger', message }),
    });
  };

  loadAccountAfterCreate = ({ message, id }, onChange) => {
    this.dispatcher.setAlert({ type: 'success', message });
    this.dispatcher.setAccountLoadingState(true);
    this.accountModalModule.close();

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

  loadInvoice = (message) => {
    this.dispatcher.setLoadingState(true);

    const onSuccess = (payload) => {
      this.dispatcher.setLoadingState(false);
      this.dispatcher.setSubmittingState(false);
      this.dispatcher.loadInvoice(payload, message);
    };

    const onFailure = () => console.log('Failed to load invoice');

    this.integrator.loadInvoice({ onSuccess, onFailure });
  }

  createOrUpdateInvoice = ({ onSuccess }) => {
    this.dispatcher.setSubmittingState(true);

    const onFailure = ({ message }) => {
      this.dispatcher.setSubmittingState(false);
      this.displayFailureAlert(message);
    };

    this.integrator.createOrUpdateInvoice({ onSuccess, onFailure });
  }

  saveInvoice = () => {
    const onSuccess = ({ message }) => {
      this.dispatcher.setSubmittingState(false);
      this.pushSuccessfulSaveMessage(message);
      this.redirectToInvoiceList();
    };

    this.createOrUpdateInvoice({ onSuccess });
  }

  saveAndCreateNewInvoice = () => {
    const onSuccess = ({ message }) => {
      const state = this.store.getState();
      this.pushSuccessfulSaveMessage(message);

      if (getShouldReload(state)) {
        this.reload();
      } else {
        this.redirectToCreateInvoice();
      }
    };

    this.createOrUpdateInvoice({ onSuccess });
  }

  saveAndDuplicateInvoice = () => {
    const onSuccess = (successResponse) => {
      if (getIsCreating(this.store.getState())) {
        this.dispatcher.updateInvoiceIdAfterCreate(successResponse.id);
      }
      this.pushSuccessfulSaveMessage(successResponse.message);
      this.redirectToCreateDuplicateInvoiceUrl();
    };

    this.createOrUpdateInvoice({ onSuccess });
  }

  saveAndEmailInvoice = () => {
    const onSuccess = (successResponse) => {
      if (getIsCreating(this.store.getState())) {
        this.dispatcher.updateInvoiceIdAfterCreate(successResponse.id);
      }
      this.pushSuccessfulSaveMessage(successResponse.message);
      this.redirectToReadInvoiceWithEmailModal();
    };

    this.createOrUpdateInvoice({ onSuccess });
  }

  saveAndExportPdf = () => {
    const onSuccess = ({ message, id }) => {
      const state = this.store.getState();
      const isCreating = getIsCreating(state);
      if (isCreating) {
        this.dispatcher.updateInvoiceIdAfterCreate(id);
      }

      this.pushSuccessfulSaveMessage(message);
      this.redirectToReadInvoiceWithExportPdfModal();
    };

    this.createOrUpdateInvoice({ onSuccess });
  }

  saveAndRedirectToInvoicePayment = () => {
    const onSuccess = () => {
      this.dispatcher.setSubmittingState(false);
      this.redirectToInvoicePayment();
    };

    this.createOrUpdateInvoice({ onSuccess });
  }

  deleteInvoice = () => {
    this.dispatcher.setSubmittingState(true);
    this.closeModal();

    const onSuccess = ({ message }) => {
      this.dispatcher.setSubmittingState(false);
      this.pushMessage({
        type: SUCCESSFULLY_DELETED_INVOICE,
        content: message,
      });
      this.redirectToInvoiceList();
    };

    const onFailure = ({ message }) => {
      this.dispatcher.setSubmittingState(false);
      this.displayFailureAlert(message);
    };

    this.integrator.deleteInvoice({
      onSuccess,
      onFailure,
    });
  }

  redirectToUrl = (url) => {
    window.location.href = url;
  }

  redirectToInvoiceList = () => {
    const state = this.store.getState();
    const url = getInvoiceListUrl(state);

    this.redirectToUrl(url);
  }

  redirectToInvoicePayment = () => {
    const state = this.store.getState();
    const url = getInvoicePaymentUrl(state);

    this.redirectToUrl(url);
  }

  redirectToInvoiceAndQuoteSettings = () => {
    const state = this.store.getState();
    const url = getInvoiceAndQuoteSettingsUrl(state);

    this.redirectToUrl(url);
  }

  redirectToCreateInvoice = () => {
    const state = this.store.getState();
    const url = getCreateNewInvoiceUrl(state);

    this.redirectToUrl(url);
  }

  redirectToCreateDuplicateInvoiceUrl = () => {
    const state = this.store.getState();
    const url = getCreateDuplicateInvoiceUrl(state);

    this.redirectToUrl(url);
  }

  redirectToReadInvoiceWithEmailModal = () => {
    const state = this.store.getState();
    const url = getInvoiceReadWithEmailModalUrl(state);

    this.redirectToUrl(url);
  }

  redirectToReadInvoiceWithExportPdfModal = () => {
    const state = this.store.getState();
    const url = getInvoiceReadWithExportPdfModalUrl(state);

    this.redirectToUrl(url);
  }

  loadContactAddress = () => {
    const onSuccess = ({ address }) => this.dispatcher.loadContactAddress(address);

    const onFailure = ({ message }) => {
      this.displayFailureAlert(message);
      this.dispatcher.loadContactAddress('');
    };

    this.integrator.loadContactAddress({
      onSuccess,
      onFailure,
    });
  }

  loadPayDirect = () => {
    this.dispatcher.setPayDirectLoadingState(true);

    const onSuccess = ({ payDirect }) => {
      this.dispatcher.setPayDirectLoadingState(false);
      this.dispatcher.loadPayDirect(payDirect);
    };

    const onFailure = () => {
      this.dispatcher.setPayDirectLoadingState(false);
    };

    this.integrator.loadPayDirect({
      onSuccess,
      onFailure,
    });
  }

  updateInvoiceServiceIsTaxInclusive = ({ key, value }) => {
    this.dispatcher.updateHeaderOptions(key, value);
    this.getInvoiceServiceCalculatedTotals();
  }

  updateInvoiceItemIsTaxInclusive = ({ key, value }) => {
    const state = this.store.getState();

    const isLineAmountDirty = getIsLineAmountDirty(state);
    const isTableEmpty = getIsTableEmpty(state);

    if (!isLineAmountDirty) {
      this.dispatcher.updateHeaderOptions(key, value);

      const newState = this.store.getState();

      if (!isTableEmpty) {
        this.getInvoiceItemCalculatedLines(
          getInvoiceItemCalculateTaxInclusiveChangePayload(newState),
          CALCULATE_INVOICE_ITEM_TAX_INCLUSIVE_CHANGE,
        );
      }
    }
  }

  updateIsTaxInclusive = ({ key, value }) => {
    const state = this.store.getState();

    const isServiceLayout = getIsServiceLayout(state);
    if (isServiceLayout) {
      this.updateInvoiceServiceIsTaxInclusive({ key, value });
    } else {
      this.updateInvoiceItemIsTaxInclusive({ key, value });
    }
  }

  updateHeaderOptions = ({ key, value }) => {
    if (key === 'isTaxInclusive') {
      this.updateIsTaxInclusive({ key, value });
    } else {
      this.dispatcher.updateHeaderOptions(key, value);

      if (key === 'contactId') {
        this.loadContactAddress();
      }
    }
  }

  removeInvoiceServiceLineAndCalculateTotals = (index) => {
    this.dispatcher.removeInvoiceServiceLine(index);
    this.getInvoiceServiceCalculatedTotals();
  }

  formatInvoiceServiceLineAndCalculateTotals = (index) => {
    this.dispatcher.formatInvoiceServiceLine(index);
    this.getInvoiceServiceCalculatedTotals();
  }

  updateInvoiceServiceLine = ({ index, key, value }) => {
    this.dispatcher.updateInvoiceServiceLine(index, key, value);

    const taxKeys = ['allocatedAccountId', 'taxCodeId'];
    if (taxKeys.includes(key)) {
      this.getInvoiceServiceCalculatedTotals();
    }
  }

  getInvoiceServiceCalculatedTotals = () => {
    const state = this.store.getState();
    if (getIsTableEmpty(state)) {
      this.dispatcher.resetInvoiceServiceTotals();
      return;
    }

    const onSuccess = ({ totals }) => {
      this.dispatcher.getInvoiceServiceCalculatedTotals(totals);
    };

    const onFailure = ({ message }) => {
      this.dispatcher.setSubmittingState(false);
      this.displayFailureAlert(message);
    };

    this.integrator.getInvoiceServiceCalculatedTotals({
      onSuccess,
      onFailure,
    });
  }

  getInvoiceItemCalculatedLines = (requestPayload, intent) => {
    this.dispatcher.setInvoiceItemSubmittingState(true);

    const onSuccess = (response) => {
      this.dispatcher.setInvoiceItemLineDirty(false);
      this.dispatcher.setInvoiceItemSubmittingState(false);
      this.dispatcher.getInvoiceItemCalculatedLines(response);
    };

    const onFailure = ({ message }) => {
      this.dispatcher.setInvoiceItemLineDirty(false);
      this.dispatcher.setInvoiceItemSubmittingState(false);
      this.displayFailureAlert(message);
    };

    this.integrator.getInvoiceItemCalculatedLines({
      intent,
      requestPayload,
      onSuccess,
      onFailure,
    });
  };

  addOrUpdateInvoiceItemLine = ({ index, itemId }) => {
    const state = this.store.getState();

    this.getInvoiceItemCalculatedLines(
      getInvoiceItemCalculateLineChangePayload({ state, index, itemId }),
      CALCULATE_INVOICE_ITEM_LINES_CHANGE,
    );
  };

  addInvoiceItemLine = (line) => {
    this.dispatcher.addInvoiceItemLine(line);

    const { itemId } = line;
    if (itemId) {
      const state = this.store.getState();

      this.addOrUpdateInvoiceItemLine({
        index: getNewLineIndex(state),
        itemId,
      });
    }
  };

  removeInvoiceItemLine = (index) => {
    const state = this.store.getState();

    if (!getAreLinesCalculating(state)) {
      this.dispatcher.removeInvoiceItemLine(index);

      const newState = this.store.getState();
      const isTableEmpty = getIsTableEmpty(newState);

      if (isTableEmpty) {
        this.dispatcher.resetInvoiceItemTotals();
      } else {
        this.getInvoiceItemCalculatedLines(
          getInvoiceItemCalculateLineRemovalPayload(newState),
          REMOVE_INVOICE_ITEM_LINE,
        );
      }
    }
  };

  updateInvoiceItemLine = (index, key, value) => {
    this.dispatcher.updateInvoiceItemLine(index, key, value);

    if (getIsAnAmountLineInput(key)) {
      this.dispatcher.setInvoiceItemLineDirty(true);
    }

    if (key === 'itemId') {
      this.addOrUpdateInvoiceItemLine({
        index,
        itemId: value,
      });
    }

    if (key === 'taxCodeId') {
      const state = this.store.getState();
      this.getInvoiceItemCalculatedLines(
        getInvoiceItemCalculateTaxCodeChangePayload(state),
        CALCULATE_INVOICE_ITEM_LINE_TAX_CODE_CHANGE,
      );
    }
  };

  formatInvoiceItemLine = ({ index, key }) => {
    this.dispatcher.formatInvoiceItemLine(index, key);

    const state = this.store.getState();

    const isLineAmountDirty = getIsLineAmountDirty(state);

    if (isLineAmountDirty) {
      this.getInvoiceItemCalculatedLines(
        getInvoiceItemCalculateAmountChangePayload(state, index, key),
        CALCULATE_INVOICE_ITEM_LINE_INPUT_CHANGE,
      );
    }
  };

  openCancelModal = () => {
    if (getIsPageEdited(this.store.getState())) {
      this.dispatcher.setModalType(InvoiceDetailModalType.CANCEL);
    } else {
      this.redirectToInvoiceList();
    }
  };

  openDeleteModal = () => this.dispatcher.setModalType(InvoiceDetailModalType.DELETE);

  openSaveAndCreateNewModal = () => {
    this.dispatcher.setModalType(InvoiceDetailModalType.SAVE_AND_CREATE_NEW);
  }

  openSaveAndDuplicateModal = () => {
    this.dispatcher.setModalType(InvoiceDetailModalType.SAVE_AND_DUPLICATE);
  }

  executeSaveAndAction = saveAction => (
    saveAction === SaveActionType.SAVE_AND_CREATE_NEW
      ? this.openSaveAndCreateNewModal()
      : this.openSaveAndDuplicateModal()
  )

  openSalesSettingsTabAndCloseModal = () => {
    this.redirectToInvoiceAndQuoteSettings();
    this.closeEmailSettingsModal();
  }

  payInvoice = () => {
    if (getIsPageEdited(this.store.getState())) {
      this.dispatcher.setModalType(InvoiceDetailModalType.APPLY_PAYMENT_UNSAVED_CHANGES);
    } else {
      this.redirectToInvoicePayment();
    }
  };

  closeModal = () => this.dispatcher.setModalType(InvoiceDetailModalType.NONE);

  sendEmail = () => {
    this.dispatcher.setSubmittingState(true);

    const onSuccess = ({ message }) => {
      this.dispatcher.setSubmittingState(false);
      this.pushMessage({
        type: SUCCESSFULLY_EMAILED_INVOICE,
        content: message,
      });
      this.redirectToInvoiceList();
    };

    const onFailure = ({ message }) => {
      this.dispatcher.setSubmittingState(false);
      this.dispatcher.displayModalAlert({ type: 'danger', message });
    };

    this.integrator.sendEmail({
      onSuccess,
      onFailure,
    });
  }

  updateEmailInvoiceDetail = ({ key, value }) => {
    this.dispatcher.updateEmailInvoiceDetail(key, value);
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
      this.dispatcher.uploadEmailAttachment({ response, file });
    };

    const onFailure = ({ message }) => {
      this.dispatcher.uploadEmailAttachmentFailed({ message, file });
    };

    const onProgress = (uploadProgress) => {
      this.dispatcher.updateEmailAttachmentUploadProgress({ uploadProgress, file });
    };

    this.integrator.uploadEmailAttachment({
      onSuccess,
      onFailure,
      onProgress,
      file,
    });
  };

  closeEmailInvoiceDetailModal = () => {
    this.closeModal();
    this.dispatcher.resetOpenSendEmailParam();
    this.dispatcher.resetEmailInvoiceDetail();
  }

  closeEmailSettingsModal = () => {
    this.closeModal();
    this.dispatcher.resetOpenSendEmailParam();
  }

  exportPdf = () => {
    this.dispatcher.setModalSubmittingState(true);

    const onSuccess = (data) => {
      this.dispatcher.setModalSubmittingState(false);
      this.closeModal();

      const state = this.store.getState();
      const filename = getExportPdfFilename(state);
      openBlob(data, filename);
    };

    const onFailure = () => {
      this.displayFailureAlert('Failed to export PDF');
      this.dispatcher.setModalSubmittingState(false);
      this.closeModal();
    };

    this.integrator.exportPdf({ onSuccess, onFailure });
  }

  openExportPdfModalOrSaveAndExportPdf = () => {
    const state = this.store.getState();
    const shouldSaveAndExport = getShouldSaveAndExportPdf(state);
    if (shouldSaveAndExport) {
      this.saveAndExportPdf();
    } else {
      this.dispatcher.setModalType(InvoiceDetailModalType.EXPORT_PDF);
    }
  }

  openContactModal = () => {
    const state = this.store.getState();
    const context = getContactModalContext(state);

    this.contactModalModule.run({
      context,
      onLoadFailure: message => this.dispatcher.setAlert({ type: 'danger', message }),
      onSaveSuccess: this.loadContactAfterCreate,
    });
  }

  loadContactAfterCreate = ({ message, id }) => {
    this.contactModalModule.resetState();
    this.dispatcher.setAlert({ type: 'success', message });
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

  pushSuccessfulSaveMessage = (message) => {
    this.pushMessage({
      type: SUCCESSFULLY_SAVED_INVOICE,
      content: message,
    });
  }

  displayFailureAlert = message => this.dispatcher.setAlert({ type: 'danger', message });

  readMessages = () => {
    const [message] = this.popMessages(this.messageTypes);
    this.message = message;
  }

  updateURLFromState = (state) => {
    const params = getRouteURLParams(state);
    this.replaceURLParams(params);
  }

  resetState = () => {
    this.dispatcher.resetState();
  };

  unsubscribeFromStore = () => {
    this.store.unsubscribeAll();
  }

  saveHandler = () => (
    getIsEmailModalOpen(this.store.getState()) ? this.sendEmail() : this.saveInvoice()
  );

  handlers = {
    SAVE_ACTION: this.saveHandler,
  };

  run(context) {
    this.dispatcher.setInitialState(context);
    setupHotKeys(keyMap, this.handlers);
    this.render();

    this.readMessages();
    this.store.subscribe(this.updateURLFromState);

    this.loadInvoice(this.message);

    const showOnlinePayment = getShowOnlinePayment(this.store.getState());
    if (showOnlinePayment) {
      this.loadPayDirect();
    }
  }

  render = () => {
    const accountModal = this.accountModalModule.render();
    const contactModal = this.contactModalModule.render();

    const invoiceDetailView = (
      <InvoiceDetailView
        accountModal={accountModal}
        onDismissAlert={this.dispatcher.dismissAlert}
        onUpdateHeaderOptions={this.updateHeaderOptions}
        serviceLayoutListeners={{
          onAddRow: this.dispatcher.addInvoiceServiceLine,
          onRemoveRow: this.removeInvoiceServiceLineAndCalculateTotals,
          onUpdateRow: this.updateInvoiceServiceLine,
          onRowInputBlur: this.formatInvoiceServiceLineAndCalculateTotals,
          onChangeAmountToPay: this.dispatcher.updateInvoicePaymentAmount,
          onAddAccount: this.openAccountModal,
        }}
        itemLayoutListeners={{
          onAddTableLine: this.addInvoiceItemLine,
          onRemoveTableRow: this.removeInvoiceItemLine,
          onChangeTableRow: this.updateInvoiceItemLine,
          onLineInputBlur: this.formatInvoiceItemLine,
          onChangeAmountToPay: this.dispatcher.updateInvoicePaymentAmount,
        }}
        invoiceActionListeners={{
          onSaveButtonClick: this.saveInvoice,
          onSaveAndButtonClick: this.executeSaveAndAction,
          onSaveAndEmailButtonClick: this.saveAndEmailInvoice,
          onPayInvoiceButtonClick: this.payInvoice,
          onExportPdfButtonClick: this.openExportPdfModalOrSaveAndExportPdf,
          onCancelButtonClick: this.openCancelModal,
          onDeleteButtonClick: this.openDeleteModal,
        }}
        confirmModalListeners={{
          onCancelModalConfirm: this.redirectToInvoiceList,
          onDeleteModalConfirm: this.deleteInvoice,
          onCloseConfirmModal: this.closeModal,
        }}
        saveAndConfirmModalListeners={{
          onCloseModal: this.closeModal,
          onConfirmSaveAndCreateNew: this.saveAndCreateNewInvoice,
          onConfirmSaveAndDuplicate: this.saveAndDuplicateInvoice,
        }}
        emailSettingsModalListeners={{
          onConfirm: this.openSalesSettingsTabAndCloseModal,
          onCloseModal: this.closeEmailSettingsModal,
          onDismissAlert: this.dispatcher.dismissModalAlert,
        }}
        emailInvoiceDetailModalListeners={{
          onConfirm: this.sendEmail,
          onCloseModal: this.closeEmailInvoiceDetailModal,
          onEmailInvoiceDetailChange: this.updateEmailInvoiceDetail,
          onDismissAlert: this.dispatcher.dismissModalAlert,
          onAddAttachments: this.addEmailAttachments,
          onRemoveAttachment: this.dispatcher.removeEmailAttachment,
        }}
        applyPaymentUnsavedChangesListeners={{
          onConfirmSave: this.saveAndRedirectToInvoicePayment,
          onConfirmUnsave: this.redirectToInvoicePayment,
          onCancel: this.closeModal,
        }}
        exportPdfModalListeners={{
          onCancel: this.closeModal,
          onConfirm: this.exportPdf,
          onChange: this.dispatcher.updateExportPdfDetail,
        }}
        contactModal={contactModal}
        onAddContactButtonClick={this.openContactModal}
      />
    );

    const wrappedView = (
      <Provider store={this.store}>
        {invoiceDetailView}
      </Provider>
    );
    this.setRootView(wrappedView);
  }
}
