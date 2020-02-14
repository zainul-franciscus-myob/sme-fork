import { Provider } from 'react-redux';
import React from 'react';

import {
  SUCCESSFULLY_DELETED_INVOICE,
  SUCCESSFULLY_EMAILED_INVOICE,
  SUCCESSFULLY_SAVED_INVOICE,
} from './invoiceMessageTypes';
import {
  getAccountModalContext,
  getContactModalContext,
  getContextForInventoryModal,
  getIsCreating,
  getIsLineAmountDirty,
  getIsModalActionDisabled,
  getIsPageEdited,
  getIsSubmitting,
  getIsTableEmpty,
  getModalType,
  getNewLineIndex,
  getRouteURLParams,
  getShouldReload,
  getShowOnlinePayment,
  getTaxCalculations,
} from './selectors/invoiceDetailSelectors';
import {
  getCreateDuplicateInvoiceUrl,
  getCreateNewInvoiceUrl,
  getInvoiceAndQuoteSettingsUrl,
  getInvoiceListUrl,
  getInvoicePaymentUrl,
  getInvoiceReadWithEmailModalUrl,
  getInvoiceReadWithExportPdfModalUrl,
  getRedirectRefUrl,
  getSubscriptionSettingsUrl,
} from './selectors/redirectSelectors';
import { getExportPdfFilename, getShouldSaveAndExportPdf } from './selectors/exportPdfSelectors';
import { getFilesForUpload } from './selectors/emailSelectors';
import AccountModalModule from '../../account/accountModal/AccountModalModule';
import ContactModalModule from '../../contact/contactModal/ContactModalModule';
import InventoryModalModule from '../../inventory/inventoryModal/InventoryModalModule';
import InvoiceDetailElementId from './InvoiceDetailElementId';
import InvoiceDetailModalType from './InvoiceDetailModalType';
import InvoiceDetailView from './components/InvoiceDetailView';
import LoadingState from '../../../components/PageView/LoadingState';
import SaveActionType from './SaveActionType';
import Store from '../../../store/Store';
import createInvoiceDetailDispatcher from './createInvoiceDetailDispatcher';
import createInvoiceDetailIntegrator from './createInvoiceDetailIntegrator';
import invoiceDetailReducer from './reducer/invoiceDetailReducer';
import keyMap from '../../../hotKeys/keyMap';
import openBlob from '../../../common/blobOpener/openBlob';
import setupHotKeys from '../../../hotKeys/setupHotKeys';

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
    this.inventoryModalModule = new InventoryModalModule({ integration });
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
    this.dispatcher.setSubmittingState(true);
    this.accountModalModule.close();

    const onSuccess = (payload) => {
      this.dispatcher.setSubmittingState(false);
      this.dispatcher.loadAccountAfterCreate(payload);
      onChange(payload);
    };

    const onFailure = () => {
      this.dispatcher.setSubmittingState(false);
    };

    this.integrator.loadAccountAfterCreate({ id, onSuccess, onFailure });
  };

  loadInvoice = (message) => {
    this.dispatcher.setLoadingState(LoadingState.LOADING);

    const onSuccess = (payload) => {
      this.dispatcher.setLoadingState(LoadingState.LOADING_SUCCESS);
      this.dispatcher.setSubmittingState(false);
      this.dispatcher.loadInvoice(payload, message);
    };

    const onFailure = () => {
      this.dispatcher.setLoadingState(LoadingState.LOADING_FAIL);
    };

    this.integrator.loadInvoice({ onSuccess, onFailure });
  }

  createOrUpdateInvoice = ({ onSuccess }) => {
    if (getIsSubmitting(this.store.getState())) return;

    this.dispatcher.setSubmittingState(true);

    const onFailure = ({ message }) => {
      this.dispatcher.setSubmittingState(false);
      this.displayFailureAlert(message);
    };

    const onSuccessInterceptor = (payload) => {
      this.dispatcher.setSubmittingState(false);
      if (payload.monthlyLimit) {
        this.dispatcher.showUpgradeModal(payload.monthlyLimit);
      } else {
        onSuccess(payload);
      }
    };

    this.integrator.createOrUpdateInvoice({ onSuccess: onSuccessInterceptor, onFailure });
  }

  saveInvoice = () => {
    const onSuccess = ({ message }) => {
      this.pushSuccessfulSaveMessage(message);
      this.redirectToInvoiceList();
    };

    this.createOrUpdateInvoice({ onSuccess });
  }

  saveAndCreateNewInvoice = () => {
    this.closeModal();

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
    this.closeModal();
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
    this.closeModal();

    const state = this.store.getState();
    const isCreating = getIsCreating(state);
    const isPageEdited = getIsPageEdited(state);

    if (!isCreating && !isPageEdited) {
      this.redirectToReadInvoiceWithEmailModal();
    } else {
      const onSuccess = (successResponse) => {
        if (getIsCreating(this.store.getState())) {
          this.dispatcher.updateInvoiceIdAfterCreate(successResponse.id);
        }
        this.pushSuccessfulSaveMessage(successResponse.message);
        this.redirectToReadInvoiceWithEmailModal();
      };

      this.createOrUpdateInvoice({ onSuccess });
    }
  }

  saveAndExportPdf = () => {
    this.closeModal();

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
    this.closeModal();
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

  redirectToUrlInNewTab = (url) => {
    window.open(url, '_blank');
  }

  redirectToInvoiceList = () => {
    const state = this.store.getState();
    const url = getInvoiceListUrl(state);

    this.redirectToUrl(url);
  }

  redirectToSubscriptionSettings = () => {
    const state = this.store.getState();
    const url = getSubscriptionSettingsUrl(state);

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

  updateHeaderOptions = ({ key, value }) => {
    if (key === 'isTaxInclusive') {
      const state = this.store.getState();

      const isLineAmountDirty = getIsLineAmountDirty(state);

      if (!isLineAmountDirty) {
        this.dispatcher.updateHeaderOptions(key, value);

        this.calculateLineTotalsOnTaxInclusiveChange();
      }
    } else {
      this.dispatcher.updateHeaderOptions(key, value);

      if (key === 'contactId') {
        this.loadContactAddress();
      }
    }
  }

  updateInvoiceLayout = ({ value: layout }) => {
    const state = this.store.getState();
    const isLineAmountDirty = getIsLineAmountDirty(state);

    if (!isLineAmountDirty) {
      this.dispatcher.updateInvoiceLayout(layout);
      this.calculateLineTotals();
    }
  }

  removeInvoiceLine = (index) => {
    const state = this.store.getState();

    if (!getIsSubmitting(state)) {
      this.dispatcher.removeInvoiceLine(index);
      this.calculateLineTotals();
    }
  };

  updateInvoiceLine = (index, key, value) => {
    this.dispatcher.updateInvoiceLine(index, key, value);

    if (['units', 'unitPrice', 'discount', 'amount'].includes(key)) {
      this.dispatcher.setInvoiceItemLineDirty(true);
    }

    if (key === 'itemId') {
      this.calculateLineTotalsOnItemChange({
        index,
        itemId: value,
      });
    }

    if (['accountId', 'taxCodeId'].includes(key)) {
      this.calculateLineTotals();
    }
  }

  updateAmount = ({ index, key }) => {
    this.dispatcher.formatInvoiceLine({ index, key });
    this.calculateLineTotalsOnAmountChange({ index, key });
  }

  calculateLineTotals = () => {
    const state = this.store.getState();

    const isTableEmpty = getIsTableEmpty(state);

    if (isTableEmpty) {
      this.dispatcher.resetInvoiceItemTotals();
    } else {
      const taxCalculations = getTaxCalculations(state, false);
      this.dispatcher.calculateLineTotals(taxCalculations);
    }
  }

  calculateLineTotalsOnTaxInclusiveChange = () => {
    const state = this.store.getState();
    const taxCalculations = getTaxCalculations(state, true);
    this.dispatcher.calculateLineTotals(taxCalculations);
  }

  calculateLineTotalsOnAmountChange = ({ index, key }) => {
    this.dispatcher.calculateLineAmounts({
      index,
      key,
    });
    const state = this.store.getState();
    const isLineAmountDirty = getIsLineAmountDirty(state);
    if (isLineAmountDirty) {
      const taxCalculations = getTaxCalculations(state, false);
      this.dispatcher.calculateLineTotals(taxCalculations);
      this.dispatcher.setInvoiceItemLineDirty(false);
    }
  }

  calculateLineTotalsOnItemChange = ({ index, itemId }) => {
    this.dispatcher.setSubmittingState(true);

    const onSuccess = (response) => {
      this.dispatcher.loadItemSellingDetails({
        index,
        itemSellingDetails: response,
      });
      const state = this.store.getState();
      const taxCalculations = getTaxCalculations(state, false);
      this.dispatcher.calculateLineTotals(taxCalculations);
      this.dispatcher.setSubmittingState(false);
    };

    const onFailure = ({ message }) => {
      this.displayFailureAlert(message);
      this.dispatcher.setSubmittingState(false);
    };

    this.integrator.loadItemSellingDetails({
      onSuccess, onFailure, index, itemId,
    });
  };

  addInvoiceLine = (line) => {
    const state = this.store.getState();

    const getKey = ({ id, ...lineWithoutId }) => Object.keys(lineWithoutId)[0];
    const key = getKey(line);
    const value = line[key];
    const index = getNewLineIndex(state);

    this.dispatcher.addInvoiceLine();
    this.updateInvoiceLine(index, key, value);
  };

  openCancelModal = () => {
    if (getIsPageEdited(this.store.getState())) {
      this.dispatcher.setModalType(InvoiceDetailModalType.CANCEL);
    } else {
      this.redirectToInvoiceList();
    }
  };

  redirectToRefUrl = () => {
    const url = getRedirectRefUrl(this.store.getState());
    this.redirectToUrlInNewTab(url);
  };

  redirectToRefPage = (ref) => {
    this.dispatcher.setRedirectRef(ref);
    if (getIsPageEdited(this.store.getState())) {
      this.dispatcher.setModalType(InvoiceDetailModalType.REDIRECT_TO_URL);
    } else {
      this.redirectToRefUrl();
    }
  };

  saveAndRedirectToRefUrl = () => {
    const onSuccess = () => {
      this.dispatcher.setSubmittingState(false);
      this.redirectToRefUrl();
    };

    this.createOrUpdateInvoice({ onSuccess });
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
    if (getIsSubmitting(this.store.getState())) return;

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
    if (getIsModalActionDisabled(this.store.getState())) return;

    this.dispatcher.setModalSubmittingState(true);

    const onSuccess = (data) => {
      this.dispatcher.setModalSubmittingState(false);
      this.closeModal();

      const state = this.store.getState();
      const filename = getExportPdfFilename(state);
      openBlob({ blob: data, filename });
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
      onLoadFailure: message => this.displayFailureAlert(message),
      onSaveSuccess: this.loadContactAfterCreate,
    });
  }

  loadContactAfterCreate = ({ message, id }) => {
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

  pushSuccessfulSaveMessage = (message) => {
    this.pushMessage({
      type: SUCCESSFULLY_SAVED_INVOICE,
      content: message,
    });
  }

  displayFailureAlert = message => this.dispatcher.setAlert({ type: 'danger', message });

  displaySuccessAlert = message => this.dispatcher.setAlert({ type: 'success', message })

  readMessages = () => {
    const [message] = this.popMessages(this.messageTypes);
    this.message = message;
  }

  updateURLFromState = (state) => {
    const params = getRouteURLParams(state);
    this.replaceURLParams(params);
  }

  resetState = () => {
    this.contactModalModule.resetState();
    this.inventoryModalModule.resetState();
    this.accountModalModule.resetState();
    this.dispatcher.resetState();
  };

  unsubscribeFromStore = () => {
    this.store.unsubscribeAll();
  }

  saveHandler = () => {
    // Quick add modals
    if (this.contactModalModule.isOpened()) {
      this.contactModalModule.save();
      return;
    }

    if (this.accountModalModule.isOpened()) {
      this.accountModalModule.save();
      return;
    }

    if (this.inventoryModalModule.isOpened()) {
      this.inventoryModalModule.save();
      return;
    }

    // In-module modals
    const state = this.store.getState();
    const modalType = getModalType(state);
    switch (modalType) {
      case InvoiceDetailModalType.CANCEL:
      case InvoiceDetailModalType.DELETE:
        // DO NOTHING
        break;
      case InvoiceDetailModalType.EXPORT_PDF:
        this.exportPdf();
        break;
      case InvoiceDetailModalType.EMAIL_INVOICE:
        this.sendEmail();
        break;
      case InvoiceDetailModalType.EMAIL_SETTINGS:
        this.openSalesSettingsTabAndCloseModal();
        break;
      case InvoiceDetailModalType.APPLY_PAYMENT_UNSAVED_CHANGES:
        this.saveAndRedirectToInvoicePayment();
        break;
      case InvoiceDetailModalType.REDIRECT_TO_URL:
        this.saveAndRedirectToRefUrl();
        break;
      case InvoiceDetailModalType.SAVE_AND_CREATE_NEW:
        this.saveAndCreateNewInvoice();
        break;
      case InvoiceDetailModalType.SAVE_AND_DUPLICATE:
        this.saveAndDuplicateInvoice();
        break;
      default:
        this.saveInvoice();
        break;
    }
  };

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

    const state = this.store.getState();
    const isCreating = getIsCreating(state);

    if (!isCreating) {
      this.loadInvoiceHistory();
    }
  }

  loadItemOption = ({ itemId }, onChangeItemTableRow) => {
    const onSuccess = (response) => {
      this.dispatcher.loadItemOption(response);
      this.dispatcher.setSubmittingState(false);
      onChangeItemTableRow({ id: itemId });
    };

    const onFailure = ({ message }) => {
      this.dispatcher.setSubmittingState(false);
      this.displayFailureAlert(message);
    };

    this.dispatcher.setSubmittingState(true);

    this.integrator.loadItemOption({ onSuccess, onFailure, itemId });
  };

  saveItem = ({ message, itemId }, onChangeItemTableRow) => {
    this.displaySuccessAlert(message);
    this.loadItemOption({ itemId }, onChangeItemTableRow);
    this.inventoryModalModule.resetState();
  }

  failLoadItem = ({ message }) => {
    this.displayFailureAlert(message);
    this.inventoryModalModule.resetState();
  }

  openInventoryModalModule = (onChangeItemTableRow) => {
    const state = this.store.getState();
    const context = getContextForInventoryModal(state);

    this.inventoryModalModule.run({
      context,
      onSaveSuccess: (response) => {
        this.saveItem(response, onChangeItemTableRow);
      },
      onLoadFailure: this.failLoadItem,
    });
  }

  loadInvoiceHistory = () => {
    this.dispatcher.setInvoiceHistoryLoading();

    const onSuccess = ({ invoiceHistory }) => {
      this.dispatcher.loadInvoiceHistory(invoiceHistory);
    };

    const onFailure = () => {
      this.dispatcher.setInvoiceHistoryUnavailable();
    };

    this.integrator.loadInvoiceHistory({
      onSuccess,
      onFailure,
    });
  }

  accordionClosed = () => {
    this.dispatcher.setInvoiceHistoryClosed();
  }

  accordionOpened = () => {
    this.dispatcher.setInvoiceHistoryOpen();
  }

  focusActivityHistory = () => {
    const element = document.getElementById(InvoiceDetailElementId.ACTIVITY_HISTORY_ELEMENT_ID);
    element.scrollIntoView();
  }

  loadAccounts = ({ keywords, onSuccess }) => {
    const onFailure = ({ message }) => {
      this.dispatcher.setAlert({ type: 'danger', message });
    };

    this.integrator.loadAccounts({ keywords, onSuccess, onFailure });
  };

  loadItems = ({ keywords, onSuccess }) => {
    const onFailure = ({ message }) => {
      this.dispatcher.setAlert({ type: 'danger', message });
    };

    this.integrator.loadItems({ keywords, onSuccess, onFailure });
  };

  loadContacts = ({ keywords, onSuccess }) => {
    const onFailure = ({ message }) => {
      this.dispatcher.setAlert({ type: 'danger', message });
    };

    this.integrator.loadContacts({ keywords, onSuccess, onFailure });
  };

  render = () => {
    const accountModal = this.accountModalModule.render();
    const contactModal = this.contactModalModule.render();
    const inventoryModal = this.inventoryModalModule.render();

    const invoiceDetailView = (
      <InvoiceDetailView
        accountModal={accountModal}
        inventoryModal={inventoryModal}
        onDismissAlert={this.dispatcher.dismissAlert}
        onChangeAmountToPay={this.dispatcher.updateInvoicePaymentAmount}
        serviceLayoutListeners={{
          onAddRow: this.addInvoiceLine,
          onRemoveRow: this.removeInvoiceLine,
          onUpdateRow: this.updateInvoiceLine,
          onUpdateAmount: this.updateAmount,
          onAddAccount: this.openAccountModal,
          onLoadAccounts: this.loadAccounts,
        }}
        itemLayoutListeners={{
          onAddRow: this.addInvoiceLine,
          onRemoveRow: this.removeInvoiceLine,
          onUpdateRow: this.updateInvoiceLine,
          onUpdateAmount: this.updateAmount,
          onAddItemButtonClick: this.openInventoryModalModule,
          onAddAccount: this.openAccountModal,
          onLoadAccounts: this.loadAccounts,
          onLoadItems: this.loadItems,
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
        redirectToUrlListeners={{
          onConfirmSave: this.saveAndRedirectToRefUrl,
          onConfirmUnsave: this.redirectToRefUrl,
          onCancel: this.closeModal,
        }}
        exportPdfModalListeners={{
          onCancel: this.closeModal,
          onConfirm: this.exportPdf,
          onChange: this.dispatcher.updateExportPdfDetail,
        }}
        contactModal={contactModal}
        onUpdateHeaderOptions={this.updateHeaderOptions}
        onLoadContacts={this.loadContacts}
        onAddContactButtonClick={this.openContactModal}
        onUpdateInvoiceLayout={this.updateInvoiceLayout}
        onUpgradeModalDismiss={this.dispatcher.hideUpgradeModal}
        onUpgradeModalUpgradeButtonClick={this.redirectToSubscriptionSettings}
        onAccordionClose={this.accordionClosed}
        onAccordionOpen={this.accordionOpened}
        onClickOnRefNo={this.redirectToRefPage}
        onFocusActivityHistory={this.focusActivityHistory}
        onRedirectToCreatePayment={this.redirectToInvoicePayment}
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
