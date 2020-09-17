import { Provider } from 'react-redux';
import React from 'react';

import {
  DUPLICATE_INVOICE,
  SUCCESSFULLY_DELETED_INVOICE,
  SUCCESSFULLY_EMAILED_INVOICE,
  SUCCESSFULLY_SAVED_INVOICE,
} from '../../../common/types/MessageTypes';
import {
  getAccountModalContext,
  getContactComboboxContext,
  getCustomerId,
  getInvoiceId,
  getIsBeforeConversionDate,
  getIsCreating,
  getIsLineAmountDirty,
  getIsModalActionDisabled,
  getIsPageEdited,
  getIsPreConversion,
  getIsSubmitting,
  getIsTableEmpty,
  getItemComboboxContext,
  getJobModalContext,
  getModalType,
  getNewLineIndex,
  getShouldSaveAndReload,
  getShouldShowAbn,
  getShowOnlinePayment,
  getTaxCalculations,
  getUniqueSelectedItemIds,
} from './selectors/invoiceDetailSelectors';
import {
  getCanSaveEmailSettings,
  getEmailModalType,
  getFilesForUpload,
} from './selectors/emailSelectors';
import {
  getCreateNewInvoiceUrl,
  getInvoiceAndQuoteSettingsUrl,
  getInvoiceListUrl,
  getInvoicePaymentUrl,
  getRedirectRefUrl,
  getRedirectState,
} from './selectors/redirectSelectors';
import { getExportPdfFilename } from './selectors/exportPdfSelectors';
import { shouldShowSaveAmountDueWarningModal } from './selectors/invoiceSaveSelectors';
import AbnStatus from '../../../components/autoFormatter/AbnInput/AbnStatus';
import AccountModalModule from '../../account/accountModal/AccountModalModule';
import ContactComboboxModule from '../../contact/contactCombobox/ContactComboboxModule';
import FeatureToggle from '../../../FeatureToggles';
import InvoiceDetailElementId from './types/InvoiceDetailElementId';
import InvoiceDetailModalType from './types/InvoiceDetailModalType';
import InvoiceDetailView from './components/InvoiceDetailView';
import ItemComboboxModule from '../../inventory/itemCombobox/ItemComboboxModule';
import JobModalModule from '../../job/jobModal/JobModalModule';
import LoadingState from '../../../components/PageView/LoadingState';
import SaveActionType from './types/SaveActionType';
import Store from '../../../store/Store';
import createInvoiceDetailDispatcher from './createInvoiceDetailDispatcher';
import createInvoiceDetailIntegrator from './createInvoiceDetailIntegrator';
import formatIsoDate from '../../../common/valueFormatters/formatDate/formatIsoDate';
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
    isToggleOn,
    navigateTo,
    subscribeOrUpgrade,
  }) {
    this.setRootView = setRootView;
    this.pushMessage = pushMessage;
    this.popMessages = popMessages;
    this.replaceURLParams = replaceURLParams;
    this.globalCallbacks = globalCallbacks;

    this.store = new Store(invoiceDetailReducer);
    this.dispatcher = createInvoiceDetailDispatcher(this.store);
    this.integrator = createInvoiceDetailIntegrator(this.store, integration);

    this.isToggleOn = isToggleOn;
    this.subscribeOrUpgrade = subscribeOrUpgrade;

    this.accountModalModule = new AccountModalModule({
      integration,
    });
    this.jobModalModule = new JobModalModule({
      integration,
    });
    this.contactComboboxModule = new ContactComboboxModule({ integration });
    this.itemComboboxModule = new ItemComboboxModule({
      integration,
      onAlert: this.dispatcher.setAlert,
    });

    this.navigateTo = navigateTo;
  }

  openAccountModal = (onChange) => {
    const state = this.store.getState();
    const accountModalContext = getAccountModalContext(state);
    this.accountModalModule.run({
      context: accountModalContext,
      onSaveSuccess: (payload) =>
        this.loadAccountAfterCreate(payload, onChange),
      onLoadFailure: (message) =>
        this.dispatcher.setAlert({ type: 'danger', message }),
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

  openJobModal = (onChange) => {
    const state = this.store.getState();
    const jobModalContext = getJobModalContext(state);
    this.jobModalModule.run({
      context: jobModalContext,
      onSaveSuccess: (payload) => this.loadJobAfterCreate(payload, onChange),
      onLoadFailure: (message) =>
        this.dispatcher.setAlert({ type: 'danger', message }),
    });
  };

  loadJobAfterCreate = ({ message, id }, onChange) => {
    this.dispatcher.setAlert({ type: 'success', message });
    this.dispatcher.setSubmittingState(true);
    this.jobModalModule.close();

    const onSuccess = (payload) => {
      this.dispatcher.setSubmittingState(false);
      this.dispatcher.loadJobAfterCreate({
        ...payload,
        id,
      });
      onChange({
        ...payload,
        id,
      });
    };

    const onFailure = () => {
      this.dispatcher.setSubmittingState(false);
    };
    this.integrator.loadJobAfterCreate({ id, onSuccess, onFailure });
  };

  loadInvoice = () => {
    this.dispatcher.setLoadingState(LoadingState.LOADING);

    const onSuccess = (payload) => {
      this.dispatcher.setLoadingState(LoadingState.LOADING_SUCCESS);
      this.dispatcher.setSubmittingState(false);
      this.dispatcher.loadInvoice(payload);

      this.updateContactCombobox();
      this.updateItemCombobox();

      if (getShouldShowAbn(this.store.getState())) {
        this.loadAbnFromCustomer();
      }
    };

    const onFailure = () => {
      this.dispatcher.setLoadingState(LoadingState.LOADING_FAIL);
    };

    this.integrator.loadInvoice({ onSuccess, onFailure });
  };

  reloadInvoice = ({ onSuccess: next = () => {} }) => {
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
  };

  createOrUpdateInvoice = ({ onSuccess }) => {
    const state = this.store.getState();
    if (getIsSubmitting(state)) return;

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

    if (getIsPreConversion(state)) {
      this.integrator.createOrUpdatePreConversionInvoice({
        onSuccess: onSuccessInterceptor,
        onFailure,
      });
    } else {
      this.integrator.createOrUpdateInvoice({
        onSuccess: onSuccessInterceptor,
        onFailure,
      });
    }
  };

  handleSaveInvoice = () => {
    const state = this.store.getState();
    if (shouldShowSaveAmountDueWarningModal(state)) {
      const modalType = InvoiceDetailModalType.SAVE_AMOUNT_DUE_WARNING;
      this.dispatcher.setModalType(modalType);
    } else {
      this.saveInvoice();
    }
  };

  saveInvoice = () => {
    const onSuccess = ({ message }) => {
      if (getModalType(this.store.getState())) {
        this.closeModal();
      }
      this.displaySuccessAlert(message);
    };

    this.saveAndReload({ onSuccess });
  };

  saveAndCreateNewInvoice = () => {
    this.closeModal();

    const onSuccess = ({ message }) => {
      this.pushSuccessfulSaveMessage(message);

      this.redirectToCreateInvoice();
    };

    this.createOrUpdateInvoice({ onSuccess });
  };

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
  };

  saveAndReload = ({ onSuccess: next = () => {} }) => {
    const state = this.store.getState();
    const isCreating = getIsCreating(state);

    const onReloadSuccess = ({ message }) => {
      if (isCreating) {
        this.loadInvoiceHistory();
      }

      if (getShouldShowAbn(this.store.getState())) {
        this.loadAbnFromCustomer();
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
  };

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
  };

  saveAndRedirectToInvoicePayment = () => {
    this.closeModal();
    const onSuccess = () => {
      this.dispatcher.setSubmittingState(false);
      this.redirectToInvoicePayment();
    };

    this.createOrUpdateInvoice({ onSuccess });
  };

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

    if (getIsPreConversion(this.store.getState())) {
      this.integrator.deletePreConversionInvoice({
        onSuccess,
        onFailure,
      });
    } else {
      this.integrator.deleteInvoice({
        onSuccess,
        onFailure,
      });
    }
  };

  redirectToInvoiceList = () => {
    const state = this.store.getState();
    const url = getInvoiceListUrl(state);

    this.navigateTo(url);
  };

  redirectToInvoicePayment = () => {
    const state = this.store.getState();
    const url = getInvoicePaymentUrl(state);

    this.navigateTo(url);
  };

  redirectToInvoiceAndQuoteSettings = () => {
    const state = this.store.getState();
    const url = getInvoiceAndQuoteSettingsUrl(state);

    this.navigateTo(url);
  };

  redirectToCreateInvoice = () => {
    const state = this.store.getState();
    const url = getCreateNewInvoiceUrl(state);

    this.navigateTo(url);
  };

  loadCustomer = () => {
    const onSuccess = (payload) => {
      this.dispatcher.loadCustomer(payload);

      this.loadAbnFromCustomer();
    };

    const onFailure = ({ message }) => {
      this.displayFailureAlert(message);
      this.dispatcher.loadCustomer('');
    };

    this.integrator.loadCustomer({
      onSuccess,
      onFailure,
    });
  };

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
  };

  updateHeaderOptions = ({ key, value }) => {
    if (key === 'isTaxInclusive') {
      const state = this.store.getState();

      const isLineAmountDirty = getIsLineAmountDirty(state);

      if (!isLineAmountDirty) {
        this.dispatcher.updateHeaderOptions(key, value);

        this.calculateLinesOnTaxInclusiveChange();
      }
    } else {
      this.dispatcher.updateHeaderOptions(key, value);

      if (key === 'customerId') {
        this.dispatcher.resetCustomer();

        if (value) {
          this.loadCustomer();
        }
      }
    }
  };

  updateInvoiceLayout = ({ value: layout }) => {
    const state = this.store.getState();
    const isLineAmountDirty = getIsLineAmountDirty(state);

    if (!isLineAmountDirty) {
      this.dispatcher.updateInvoiceLayout(layout);
      this.calculateLines();
    }
  };

  removeInvoiceLine = (index) => {
    const state = this.store.getState();

    if (!getIsSubmitting(state)) {
      this.dispatcher.removeInvoiceLine(index);
      this.calculateLines();
    }
  };

  updateInvoiceLine = (index, key, value) => {
    this.dispatcher.updateInvoiceLine(index, key, value);

    if (['units', 'unitPrice', 'discount', 'amount'].includes(key)) {
      this.dispatcher.setInvoiceItemLineDirty(true);
    }

    if (key === 'itemId' && value) {
      this.calculateLinesOnItemChange({
        index,
        itemId: value,
      });
    }

    if (['accountId', 'taxCodeId'].includes(key)) {
      this.calculateLines();
    }
  };

  calculateLines = () => {
    const state = this.store.getState();

    const isTableEmpty = getIsTableEmpty(state);

    if (!isTableEmpty) {
      const taxCalculations = getTaxCalculations(state, false);
      this.dispatcher.calculateLines(taxCalculations);
    }
  };

  calculateLinesOnTaxInclusiveChange = () => {
    const state = this.store.getState();
    const taxCalculations = getTaxCalculations(state, true);
    this.dispatcher.calculateLines(taxCalculations, true);
  };

  /*
   * Workflow:
   *  1. price calculation - update at most one extra field when formula prerequisite met
   *  2. tax calculation - update total
   */
  calculateLinesOnAmountChange = ({ index, key }) => {
    const isLineAmountDirty = getIsLineAmountDirty(this.store.getState());
    if (isLineAmountDirty) {
      this.dispatcher.calculateLineAmounts({ index, key });

      const taxCalculations = getTaxCalculations(this.store.getState(), false);
      this.dispatcher.calculateLines(taxCalculations);
      this.dispatcher.setInvoiceItemLineDirty(false);
    }
  };

  calculateLinesOnItemChange = ({ index, itemId }) => {
    this.dispatcher.setSubmittingState(true);

    const onSuccess = (response) => {
      this.dispatcher.loadItemSellingDetails({
        index,
        itemSellingDetails: response,
      });
      const state = this.store.getState();
      const taxCalculations = getTaxCalculations(state, false);
      this.dispatcher.calculateLines(taxCalculations);
      this.dispatcher.setSubmittingState(false);
    };

    const onFailure = ({ message }) => {
      this.displayFailureAlert(message);
      this.dispatcher.setSubmittingState(false);
    };

    this.integrator.loadItemSellingDetails({
      onSuccess,
      onFailure,
      index,
      itemId,
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
    const { redirectUrl, isOpenInNewTab } = getRedirectState(
      this.store.getState()
    );
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

  openDeleteModal = () =>
    this.dispatcher.setModalType(InvoiceDetailModalType.DELETE);

  openSaveAndCreateNewModal = () => {
    this.dispatcher.setModalType(InvoiceDetailModalType.SAVE_AND_CREATE_NEW);
  };

  openSaveAndDuplicateModal = () => {
    this.dispatcher.setModalType(InvoiceDetailModalType.SAVE_AND_DUPLICATE);
  };

  openExportPdfModal = () => {
    this.dispatcher.setModalType(InvoiceDetailModalType.EXPORT_PDF);
  };

  openEmailModal = () => {
    const state = this.store.getState();
    const type = getEmailModalType(state);
    this.dispatcher.setModalType(type);
  };

  executeSaveAndAction = (saveAction) =>
    saveAction === SaveActionType.SAVE_AND_CREATE_NEW
      ? this.openSaveAndCreateNewModal()
      : this.openSaveAndDuplicateModal();

  payInvoice = () => {
    if (getIsPageEdited(this.store.getState())) {
      this.dispatcher.setModalType(
        InvoiceDetailModalType.APPLY_PAYMENT_UNSAVED_CHANGES
      );
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
  };

  updateEmailInvoiceDetail = ({ key, value }) => {
    this.dispatcher.updateEmailInvoiceDetail(key, value);
  };

  addEmailAttachments = (files) => {
    this.dispatcher.addEmailAttachments(files);

    this.uploadEmailAttachments(files);
  };

  uploadEmailAttachments = (files) => {
    const state = this.store.getState();

    getFilesForUpload(state, files).forEach((file) =>
      this.uploadEmailAttachment(file)
    );
  };

  uploadEmailAttachment = (file) => {
    const onSuccess = (response) => {
      this.dispatcher.uploadEmailAttachment({ response, file });
    };

    const onFailure = ({ message }) => {
      this.dispatcher.uploadEmailAttachmentFailed({ message, file });
    };

    const onProgress = (uploadProgress) => {
      this.dispatcher.updateEmailAttachmentUploadProgress({
        uploadProgress,
        file,
      });
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
  };

  closeEmailModal = () => {
    this.closeModal();
    this.dispatcher.resetEmailInvoiceDetail();
  };

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
  };

  openExportPdfModalOrSaveAndExportPdf = () => {
    const state = this.store.getState();
    const shouldSaveAndReload = getShouldSaveAndReload(state);
    if (shouldSaveAndReload) {
      this.saveAndReload({ onSuccess: this.openExportPdfModal });
    } else {
      this.openExportPdfModal();
    }
  };

  loadAbnFromCustomer = () => {
    this.dispatcher.setAbnLoadingState(true);

    const onSuccess = (response) => {
      this.dispatcher.setAbnLoadingState(false);
      this.dispatcher.loadAbn(response);
    };

    const onFailure = () => {
      this.dispatcher.setAbnLoadingState(false);
      this.dispatcher.loadAbn({ status: AbnStatus.UNAVAILABLE });
    };

    this.integrator.loadAbnFromCustomer({ onSuccess, onFailure });
  };

  pushSuccessfulSaveMessage = (message) => {
    this.globalCallbacks.invoiceSaved();
    this.pushMessage({
      type: SUCCESSFULLY_SAVED_INVOICE,
      content: message,
    });
  };

  displayFailureAlert = (message) =>
    this.dispatcher.setAlert({ type: 'danger', message });

  displaySuccessAlert = (message) =>
    this.dispatcher.setAlert({ type: 'success', message });

  readMessages = () => {
    this.popMessages([
      SUCCESSFULLY_SAVED_INVOICE,
      SUCCESSFULLY_EMAILED_INVOICE,
      DUPLICATE_INVOICE,
    ]).forEach((message) => {
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
  };

  resetState = () => {
    this.contactComboboxModule.resetState();
    this.itemComboboxModule.resetState();
    this.accountModalModule.resetState();
    this.dispatcher.resetState();
  };

  unsubscribeFromStore = () => {
    this.store.unsubscribeAll();
  };

  saveHandler = () => {
    // Quick add modals
    if (this.contactComboboxModule.isContactModalOpened()) {
      this.contactComboboxModule.createContact();
      return;
    }

    if (this.accountModalModule.isOpened()) {
      this.accountModalModule.save();
      return;
    }

    if (this.itemComboboxModule.isCreateItemModalOpened()) {
      this.itemComboboxModule.createItem();
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
      isInvoiceJobColumnEnabled: this.isToggleOn(FeatureToggle.EssentialsJobs),
    });
    setupHotKeys(keyMap, this.handlers);
    this.render();

    this.readMessages();

    this.loadInvoice();

    this.loadContactCombobox();
    this.loadItemCombobox();

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
  };

  accordionClosed = () => {
    this.dispatcher.setInvoiceHistoryClosed();
  };

  accordionOpened = () => {
    this.dispatcher.setInvoiceHistoryOpen();
  };

  focusActivityHistory = () => {
    const element = document.getElementById(
      InvoiceDetailElementId.ACTIVITY_HISTORY_ELEMENT_ID
    );
    element.scrollIntoView();
  };

  loadAccounts = ({ keywords, onSuccess }) => {
    const onFailure = ({ message }) => {
      this.dispatcher.setAlert({ type: 'danger', message });
    };

    this.integrator.loadAccounts({ keywords, onSuccess, onFailure });
  };

  validateIssueDate = () => {
    if (getIsBeforeConversionDate(this.store.getState())) {
      this.openPreConversionModal();
    }
  };

  openPreConversionModal = () => {
    this.dispatcher.setModalType(
      InvoiceDetailModalType.CREATE_PRE_CONVERSION_INVOICE
    );
  };

  dismissPreConversionModal = () => {
    this.dispatcher.updateHeaderOptions('issueDate', formatIsoDate(new Date()));
    this.closeModal();
  };

  displayPreConversionAlert = () =>
    this.dispatcher.setShowPreConversionAlert(true);

  dismissPreConversionAlert = () =>
    this.dispatcher.setShowPreConversionAlert(false);

  convertToPreConversionInvoice = () => {
    this.dispatcher.convertToPreConversionInvoice();
    this.closeModal();
    this.displayPreConversionAlert();
  };

  loadContactCombobox = () => {
    const state = this.store.getState();
    const context = getContactComboboxContext(state);
    this.contactComboboxModule.run(context);
  };

  updateContactCombobox = () => {
    const state = this.store.getState();
    const customerId = getCustomerId(state);
    if (customerId) {
      this.contactComboboxModule.load(customerId);
    }
  };

  renderContactCombobox = (props) => {
    return this.contactComboboxModule
      ? this.contactComboboxModule.render(props)
      : null;
  };

  loadItemCombobox = () => {
    const state = this.store.getState();
    const context = getItemComboboxContext(state);
    this.itemComboboxModule.run(context);
  };

  updateItemCombobox = () => {
    const state = this.store.getState();
    const selectedItemIds = getUniqueSelectedItemIds(state);
    if (selectedItemIds.length > 0) {
      this.itemComboboxModule.load(selectedItemIds);
    }
  };

  renderItemCombobox = (props) => {
    return this.itemComboboxModule
      ? this.itemComboboxModule.render(props)
      : null;
  };

  render = () => {
    const accountModal = this.accountModalModule.render();
    const jobModal = this.jobModalModule.render();

    const invoiceDetailView = (
      <InvoiceDetailView
        accountModal={accountModal}
        jobModal={jobModal}
        onDismissAlert={this.dispatcher.dismissAlert}
        onChangeAmountToPay={this.dispatcher.updateInvoicePaymentAmount}
        serviceLayoutListeners={{
          onAddRow: this.addInvoiceLine,
          onRemoveRow: this.removeInvoiceLine,
          onAddJob: this.openJobModal,
          onUpdateRow: this.updateInvoiceLine,
          onUpdateAmount: this.calculateLinesOnAmountChange,
          onAddAccount: this.openAccountModal,
          onLoadAccounts: this.loadAccounts,
        }}
        itemLayoutListeners={{
          onAddRow: this.addInvoiceLine,
          onRemoveRow: this.removeInvoiceLine,
          onUpdateRow: this.updateInvoiceLine,
          onUpdateAmount: this.calculateLinesOnAmountChange,
          onAddAccount: this.openAccountModal,
          onAddJob: this.openJobModal,
          onLoadAccounts: this.loadAccounts,
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
        preConversionModalListeners={{
          onCancel: this.dismissPreConversionModal,
          onConfirm: this.convertToPreConversionInvoice,
        }}
        renderContactCombobox={this.renderContactCombobox}
        renderItemCombobox={this.renderItemCombobox}
        onInputAlert={this.dispatcher.setAlert}
        onUpdateHeaderOptions={this.updateHeaderOptions}
        onIssueDateBlur={this.validateIssueDate}
        onUpdateInvoiceLayout={this.updateInvoiceLayout}
        onUpgradeModalDismiss={this.dispatcher.hideUpgradeModal}
        onUpgradeModalUpgradeButtonClick={this.subscribeOrUpgrade}
        onAccordionClose={this.accordionClosed}
        onAccordionOpen={this.accordionOpened}
        onClickOnRefNo={this.redirectToRefPage}
        onFocusActivityHistory={this.focusActivityHistory}
        onRedirectToCreatePayment={this.redirectToInvoicePayment}
        onDismissPreConversionAlert={this.dismissPreConversionAlert}
      />
    );

    const wrappedView = (
      <Provider store={this.store}>{invoiceDetailView}</Provider>
    );
    this.setRootView(wrappedView);
  };

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
  };
}
