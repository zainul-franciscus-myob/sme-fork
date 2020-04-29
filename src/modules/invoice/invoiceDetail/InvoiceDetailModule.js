import { Provider } from 'react-redux';
import React from 'react';

import {
  DUPLICATE_INVOICE,
  SUCCESSFULLY_DELETED_INVOICE,
  SUCCESSFULLY_EMAILED_INVOICE,
  SUCCESSFULLY_SAVED_INVOICE,
} from './types/invoiceMessageTypes';
import {
  getAccountModalContext,
  getContactModalContext,
  getContextForInventoryModal,
  getInvoiceId,
  getIsCreating,
  getIsLineAmountDirty,
  getIsModalActionDisabled,
  getIsPageEdited,
  getIsSubmitting,
  getIsTableEmpty,
  getModalType,
  getNewLineIndex,
  getShouldSaveAndReload,
  getShowOnlinePayment,
  getTaxCalculations,
} from './selectors/invoiceDetailSelectors';
import { getCanSaveEmailSettings, getEmailModalType, getFilesForUpload } from './selectors/emailSelectors';
import {
  getCreateNewInvoiceUrl,
  getInvoiceAndQuoteSettingsUrl,
  getInvoiceListUrl,
  getInvoicePaymentUrl,
  getRedirectRefUrl,
  getRedirectState,
  getSubscriptionSettingsUrl,
} from './selectors/redirectSelectors';
import { getExportPdfFilename } from './selectors/exportPdfSelectors';
import { shouldShowSaveAmountDueWarningModal } from './selectors/invoiceSaveSelectors';
import AccountModalModule from '../../account/accountModal/AccountModalModule';
import ContactModalModule from '../../contact/contactModal/ContactModalModule';
import InventoryModalModule from '../../inventory/inventoryModal/InventoryModalModule';
import InvoiceDetailElementId from './types/InvoiceDetailElementId';
import InvoiceDetailModalType from './types/InvoiceDetailModalType';
import InvoiceDetailView from './components/InvoiceDetailView';
import LoadingState from '../../../components/PageView/LoadingState';
import SaveActionType from './types/SaveActionType';
import Store from '../../../store/Store';
import createInvoiceDetailDispatcher from './createInvoiceDetailDispatcher';
import createInvoiceDetailIntegrator from './createInvoiceDetailIntegrator';
import invoiceDetailReducer from './reducer/invoiceDetailReducer';
import keyMap from '../../../hotKeys/keyMap';
import openBlob from '../../../common/blobOpener/openBlob';
import setupHotKeys from '../../../hotKeys/setupHotKeys';

export default class InvoiceDetailModule {
  constructor({
    integration,
    setRootView,
    pushMessage,
    popMessages,
    replaceURLParams,
    globalCallbacks,
    featureToggles,
    navigateTo,
  }) {
    this.setRootView = setRootView;
    this.pushMessage = pushMessage;
    this.popMessages = popMessages;
    this.replaceURLParams = replaceURLParams;
    this.globalCallbacks = globalCallbacks;

    this.store = new Store(invoiceDetailReducer);
    this.dispatcher = createInvoiceDetailDispatcher(this.store);
    this.integrator = createInvoiceDetailIntegrator(this.store, integration);

    this.isInvoiceJobColumnEnabled = featureToggles.isInvoiceJobColumnEnabled;

    this.accountModalModule = new AccountModalModule({
      integration,
    });
    this.contactModalModule = new ContactModalModule({ integration });
    this.inventoryModalModule = new InventoryModalModule({ integration });
    this.navigateTo = navigateTo;
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

  loadInvoice = () => {
    this.dispatcher.setLoadingState(LoadingState.LOADING);

    const onSuccess = (payload) => {
      this.dispatcher.setLoadingState(LoadingState.LOADING_SUCCESS);
      this.dispatcher.setSubmittingState(false);
      this.dispatcher.loadInvoice(payload);
    };

    const onFailure = () => {
      this.dispatcher.setLoadingState(LoadingState.LOADING_FAIL);
    };

    this.integrator.loadInvoice({ onSuccess, onFailure });
  }

  reloadInvoice = ({ onSuccess: next = () => { } }) => {
    this.dispatcher.setSubmittingState(true);

    const onSuccess = (payload) => {
      this.dispatcher.reloadInvoice(payload);
      next();
    };

    const onFailure = ({ message }) => {
      this.dispatcher.setSubmittingState(false);
      this.displayFailureAlert(message);
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

  handleSaveInvoice = () => {
    const state = this.store.getState();
    if (shouldShowSaveAmountDueWarningModal(state)) {
      const modalType = InvoiceDetailModalType.SAVE_AMOUNT_DUE_WARNING;
      this.dispatcher.setModalType(modalType);
    } else {
      this.saveInvoice();
    }
  }

  saveInvoice = () => {
    const onSuccess = ({ message }) => {
      if (getModalType(this.store.getState())) {
        this.closeModal();
      }
      this.displaySuccessAlert(message);
    };

    this.saveAndReload({ onSuccess });
  }

  saveAndCreateNewInvoice = () => {
    this.closeModal();

    const onSuccess = ({ message }) => {
      this.pushSuccessfulSaveMessage(message);

      this.redirectToCreateInvoice();
    };

    this.createOrUpdateInvoice({ onSuccess });
  }

  saveAndDuplicateInvoice = () => {
    this.closeModal();
    const onSuccess = ({ message, id }) => {
      const state = this.store.getState();
      const isCreating = getIsCreating(state);
      const duplicateId = isCreating ? id : getInvoiceId(state);

      this.pushSuccessfulSaveMessage(message);
      this.pushMessage({
        type: DUPLICATE_INVOICE,
        duplicateId,
      });

      this.redirectToCreateInvoice();
    };

    this.createOrUpdateInvoice({ onSuccess });
  }

  saveAndReload = ({ onSuccess: next = () => { } }) => {
    const state = this.store.getState();
    const isCreating = getIsCreating(state);

    const onReloadSuccess = ({ message }) => {
      if (isCreating) {
        this.loadInvoiceHistory();
      }
      next({ message });
    };

    const onCreateOrUpdateInvoiceSuccess = ({ message, id }) => {
      if (isCreating) {
        this.dispatcher.updateInvoiceIdAfterCreate(id);
        this.replaceURLParams({ invoiceId: id });
      }

      this.reloadInvoice({ onSuccess: () => onReloadSuccess({ message }) });
    };

    this.createOrUpdateInvoice({ onSuccess: onCreateOrUpdateInvoiceSuccess });
  }

  saveAndEmailInvoice = () => {
    this.closeModal();

    const state = this.store.getState();
    const shouldSaveAndReload = getShouldSaveAndReload(state);
    if (shouldSaveAndReload) {
      const onSuccess = ({ message }) => {
        this.openEmailModal();
        this.dispatcher.displayModalAlert({ type: 'success', message });
      };
      this.saveAndReload({ onSuccess });
    } else {
      this.openEmailModal();
    }
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

  redirectToInvoiceList = () => {
    const state = this.store.getState();
    const url = getInvoiceListUrl(state);

    this.navigateTo(url);
  }

  redirectToSubscriptionSettings = () => {
    const state = this.store.getState();
    const url = getSubscriptionSettingsUrl(state);

    this.navigateTo(url);
  }

  redirectToInvoicePayment = () => {
    const state = this.store.getState();
    const url = getInvoicePaymentUrl(state);

    this.navigateTo(url);
  }

  redirectToInvoiceAndQuoteSettings = () => {
    const state = this.store.getState();
    const url = getInvoiceAndQuoteSettingsUrl(state);

    this.navigateTo(url);
  }

  redirectToCreateInvoice = () => {
    const state = this.store.getState();
    const url = getCreateNewInvoiceUrl(state);

    this.navigateTo(url);
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
    this.dispatcher.calculateLineTotals(taxCalculations, true);
  }

  /*
   * Workflow:
   *  1. price calculation - update at most one extra field when formula prerequisite met
   *  2. tax calculation - update total
   */
  calculateLineTotalsOnAmountChange = ({ index, key }) => {
    const isLineAmountDirty = getIsLineAmountDirty(this.store.getState());
    if (isLineAmountDirty) {
      this.dispatcher.calculateLineAmounts({ index, key });

      const taxCalculations = getTaxCalculations(this.store.getState(), false);
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
    const { redirectUrl, isOpenInNewTab } = getRedirectState(this.store.getState());
    this.navigateTo(redirectUrl, isOpenInNewTab);
  };

  redirectToRefPage = (ref) => {
    const state = this.store.getState();
    const url = getRedirectRefUrl(state, {
      redirectRefJournalId: ref.journalId,
      redirectRefJournalType: ref.sourceJournalType,
    });
    this.dispatcher.setRedirectState({
      redirectUrl: url,
      isOpenInNewTab: true,
    });
    if (getIsPageEdited(state)) {
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

  openExportPdfModal = () => {
    this.dispatcher.setModalType(InvoiceDetailModalType.EXPORT_PDF);
  }

  openEmailModal = () => {
    const state = this.store.getState();
    const type = getEmailModalType(state);
    this.dispatcher.setModalType(type);
  }

  executeSaveAndAction = saveAction => (
    saveAction === SaveActionType.SAVE_AND_CREATE_NEW
      ? this.openSaveAndCreateNewModal()
      : this.openSaveAndDuplicateModal()
  )

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
      this.globalCallbacks.invoiceSaved();
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

  handleSaveEmailSettings = () => {
    if (getCanSaveEmailSettings(this.store.getState())) {
      this.saveEmailSettings();
    } else {
      this.dispatcher.displayModalAlert({
        type: 'danger',
        message: 'Reply-to email address is required',
      });
    }
  };

  saveEmailSettings = () => {
    this.dispatcher.setModalSubmittingState(true);

    const onSuccess = (response) => {
      this.dispatcher.saveEmailSettings();
      this.closeModal();
      this.dispatcher.setModalSubmittingState(false);

      this.openEmailModal();
      this.dispatcher.displayModalAlert({
        type: 'success',
        message: response.message,
      });
    };

    const onFailure = ({ message }) => {
      this.dispatcher.setModalSubmittingState(false);
      this.dispatcher.displayModalAlert({ type: 'danger', message });
    };

    this.integrator.saveEmailSettings({ onSuccess, onFailure });
  }

  closeEmailModal = () => {
    this.closeModal();
    this.dispatcher.resetEmailInvoiceDetail();
  }

  exportPdf = () => {
    if (getIsModalActionDisabled(this.store.getState())) return;

    this.dispatcher.setModalSubmittingState(true);

    const onSuccess = (data) => {
      this.globalCallbacks.invoiceSaved();
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
    const shouldSaveAndReload = getShouldSaveAndReload(state);
    if (shouldSaveAndReload) {
      this.saveAndReload({ onSuccess: this.openExportPdfModal });
    } else {
      this.openExportPdfModal();
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
    this.globalCallbacks.invoiceSaved();
    this.pushMessage({
      type: SUCCESSFULLY_SAVED_INVOICE,
      content: message,
    });
  }

  displayFailureAlert = message => this.dispatcher.setAlert({ type: 'danger', message });

  displaySuccessAlert = message => this.dispatcher.setAlert({ type: 'success', message })

  readMessages = () => {
    this.popMessages([
      SUCCESSFULLY_SAVED_INVOICE,
      SUCCESSFULLY_EMAILED_INVOICE,
      DUPLICATE_INVOICE,
    ]).forEach(message => {
      switch (message.type) {
        case SUCCESSFULLY_SAVED_INVOICE:
        case SUCCESSFULLY_EMAILED_INVOICE:
          this.dispatcher.setAlert({
            type: 'success',
            message: message.content,
          });
          break;
        case DUPLICATE_INVOICE:
          this.dispatcher.setDuplicateId(message.duplicateId);
          break;
        default:
      }
    });
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
        this.handleSaveInvoice();
        break;
    }
  };

  handlers = {
    SAVE_ACTION: this.saveHandler,
  };

  run(context) {
    this.dispatcher.setInitialState({
      ...context,
      isInvoiceJobColumnEnabled: this.isInvoiceJobColumnEnabled,
    });
    setupHotKeys(keyMap, this.handlers);
    this.render();

    this.readMessages();

    this.loadInvoice();

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
          onUpdateAmount: this.calculateLineTotalsOnAmountChange,
          onAddAccount: this.openAccountModal,
          onLoadAccounts: this.loadAccounts,
        }}
        itemLayoutListeners={{
          onAddRow: this.addInvoiceLine,
          onRemoveRow: this.removeInvoiceLine,
          onUpdateRow: this.updateInvoiceLine,
          onUpdateAmount: this.calculateLineTotalsOnAmountChange,
          onAddItemButtonClick: this.openInventoryModalModule,
          onAddAccount: this.openAccountModal,
          onLoadAccounts: this.loadAccounts,
          onLoadItems: this.loadItems,
        }}
        invoiceActionListeners={{
          onSaveButtonClick: this.handleSaveInvoice,
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
          onConfirmSaveAmountDueWarning: this.saveInvoice,
        }}
        emailSettingsModalListeners={{
          onChange: this.updateEmailInvoiceDetail,
          onConfirm: this.handleSaveEmailSettings,
          onCloseModal: this.closeEmailModal,
          onDismissAlert: this.dispatcher.dismissModalAlert,
        }}
        emailInvoiceDetailModalListeners={{
          onConfirm: this.sendEmail,
          onCloseModal: this.closeEmailModal,
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

  handlePageTransition = (url) => {
    const state = this.store.getState();
    if (getIsPageEdited(state)) {
      this.dispatcher.setRedirectState({
        redirectUrl: url,
        isOpenInNewTab: false,
      });
      this.dispatcher.setModalType(InvoiceDetailModalType.REDIRECT_TO_URL);
    } else {
      this.navigateTo(url);
    }
  }
}
