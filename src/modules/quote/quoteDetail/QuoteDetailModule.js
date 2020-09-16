import { Provider } from 'react-redux';
import React from 'react';

import {
  CALCULATE_QUOTE_AMOUNT_CHANGE,
  CALCULATE_QUOTE_ITEM_CHANGE,
  CALCULATE_QUOTE_LINE_TOTALS,
  CALCULATE_QUOTE_TAX_INCLUSIVE_CHANGE,
} from '../QuoteIntents';
import {
  DUPLICATE_QUOTE,
  SUCCESSFULLY_DELETED_QUOTE,
  SUCCESSFULLY_EMAILED_QUOTE,
  SUCCESSFULLY_SAVED_QUOTE,
} from '../../../common/types/MessageTypes';
import {
  getAccountModalContext,
  getContactComboboxContext,
  getContactId,
  getExportPdfFilename,
  getIsCreating,
  getIsLineAmountInputDirty,
  getIsModalActionDisabled,
  getIsPageEdited,
  getIsSubmitting,
  getIsTaxCalculationRequired,
  getItemComboboxContext,
  getItemSellingDetailsFromCache,
  getJobModalContext,
  getLength,
  getLineByIndex,
  getModalUrl,
  getNewLineIndex,
  getOpenedModalType,
  getQuoteId,
  getShouldSaveAndReload,
  getTaxCalculations,
  getUniqueSelectedItemIds,
} from './selectors/QuoteDetailSelectors';
import {
  getCreateInvoiceFromQuoteUrl,
  getCreateNewQuoteUrl,
  getInvoiceAndQuoteSettingsUrl,
  getQuoteListURL,
} from './selectors/RedirectSelectors';
import {
  getEmailModalType,
  getFilesForUpload,
} from './selectors/EmailSelectors';
import AccountModalModule from '../../account/accountModal/AccountModalModule';
import ContactComboboxModule from '../../contact/contactCombobox/ContactComboboxModule';
import FeatureToggle from '../../../FeatureToggles';
import ItemComboboxModule from '../../inventory/itemCombobox/ItemComboboxModule';
import JobModalModule from '../../job/jobModal/JobModalModule';
import LoadingState from '../../../components/PageView/LoadingState';
import ModalType from './ModalType';
import QuoteDetailView from './components/QuoteDetailView';
import QuoteLineType from './QuoteLineType';
import SaveActionType from './SaveActionType';
import Store from '../../../store/Store';
import createQuoteDetailDispatcher from './createQuoteDetailDispatcher';
import createQuoteDetailIntegrator from './createQuoteDetailIntegrator';
import keyMap from '../../../hotKeys/keyMap';
import openBlob from '../../../common/blobOpener/openBlob';
import quoteDetailReducer from './reducer/quoteDetailReducer';
import setupHotKeys from '../../../hotKeys/setupHotKeys';

export default class QuoteDetailModule {
  constructor({
    integration,
    setRootView,
    pushMessage,
    popMessages,
    navigateTo,
    replaceURLParams,
    isToggleOn,
  }) {
    this.integration = integration;
    this.setRootView = setRootView;
    this.pushMessage = pushMessage;
    this.popMessages = popMessages;
    this.navigateTo = navigateTo;
    this.replaceURLParams = replaceURLParams;

    this.store = new Store(quoteDetailReducer);
    this.dispatcher = createQuoteDetailDispatcher(this.store);
    this.integrator = createQuoteDetailIntegrator(this.store, integration);

    this.isToggleOn = isToggleOn;

    this.accountModalModule = new AccountModalModule({ integration });
    this.jobModalModule = new JobModalModule({ integration });
    this.contactComboboxModule = new ContactComboboxModule({ integration });
    this.itemComboboxModule = new ItemComboboxModule({
      integration,
      onAlert: this.dispatcher.setAlert,
    });
  }

  loadQuote = () => {
    this.dispatcher.setLoadingState(LoadingState.LOADING);

    const onSuccess = (payload) => {
      this.dispatcher.setLoadingState(LoadingState.LOADING_SUCCESS);
      this.dispatcher.loadQuote(payload);
      this.updateContactCombobox();
      this.updateItemCombobox();
    };

    const onFailure = () => {
      this.dispatcher.setLoadingState(LoadingState.LOADING_FAIL);
    };

    this.integrator.loadQuote({ onSuccess, onFailure });
  };

  reloadQuote = ({ onSuccess: next = () => {} }) => {
    this.dispatcher.setSubmittingState(true);

    const onSuccess = (payload) => {
      this.dispatcher.reloadQuote(payload);
      next();
    };

    const onFailure = ({ message }) => {
      this.dispatcher.setSubmittingState(false);
      this.displayFailureAlert(message);
    };

    this.integrator.loadQuote({ onSuccess, onFailure });
  };

  createOrUpdateQuote = ({ onSuccess }) => {
    if (getIsSubmitting(this.store.getState())) return;

    this.dispatcher.setSubmittingState(true);

    const onFailure = ({ message }) => {
      this.dispatcher.setSubmittingState(false);
      this.displayFailureAlert(message);
    };

    this.integrator.createOrUpdateQuote({ onSuccess, onFailure });
  };

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
  };

  saveQuote = () => {
    const onSuccess = ({ message }) => {
      this.displaySuccessAlert(message);
    };

    this.saveAndReload({ onSuccess });
  };

  saveUnsavedChanges = () => {
    const state = this.store.getState();
    const url = getModalUrl(state);
    this.dispatcher.closeModal();

    const onSuccess = ({ message }) => {
      this.pushSuccessfulSaveMessage(message);
      this.navigateTo(url);
    };

    this.createOrUpdateQuote({ onSuccess });
  };

  saveAndCreateNew = () => {
    const onSuccess = ({ message }) => {
      this.pushSuccessfulSaveMessage(message);

      this.redirectToCreateQuote();
    };

    this.createOrUpdateQuote({ onSuccess });
  };

  saveAndDuplicate = () => {
    const onSuccess = ({ message, id }) => {
      if (getIsCreating(this.store.getState())) {
        this.dispatcher.updateQuoteIdAfterCreate(id);
      }

      this.pushSuccessfulSaveMessage(message);
      this.pushMessage({
        type: DUPLICATE_QUOTE,
        duplicateId: getQuoteId(this.store.getState()),
      });
      this.redirectToCreateQuote();
    };

    this.createOrUpdateQuote({ onSuccess });
  };

  saveAndReload = ({ onSuccess: next = () => {} }) => {
    const onSuccess = ({ message, id }) => {
      const state = this.store.getState();
      const isCreating = getIsCreating(state);
      if (isCreating) {
        this.dispatcher.updateQuoteIdAfterCreate(id);
        this.replaceURLParams({ quoteId: id });
      }

      this.reloadQuote({ onSuccess: () => next({ message }) });
    };

    this.createOrUpdateQuote({ onSuccess });
  };

  displaySuccessAlert = (message) =>
    this.dispatcher.setAlert({ type: 'success', message });

  displayFailureAlert = (message) =>
    this.dispatcher.setAlert({ type: 'danger', message });

  pushSuccessfulSaveMessage = (message) => {
    this.pushMessage({
      type: SUCCESSFULLY_SAVED_QUOTE,
      content: message,
    });
  };

  redirectToQuoteList = () => {
    const state = this.store.getState();
    const url = getQuoteListURL(state);

    this.navigateTo(url);
  };

  redirectToCreateQuote = () => {
    const state = this.store.getState();
    const url = getCreateNewQuoteUrl(state);

    this.navigateTo(url);
  };

  redirectToCreateInvoice = () => {
    const state = this.store.getState();
    const url = getCreateInvoiceFromQuoteUrl(state);

    this.navigateTo(url);
  };

  redirectToInvoiceAndQuoteSettings = () => {
    const state = this.store.getState();
    const url = getInvoiceAndQuoteSettingsUrl(state);

    this.navigateTo(url);
  };

  handleOnDiscardButtonClickFromUnsavedModal = () => {
    const state = this.store.getState();
    const url = getModalUrl(state);

    this.navigateTo(url);
  };

  updateQuoteDetailHeaderOptions = ({ key, value }) => {
    this.dispatcher.updateQuoteDetailHeaderOptions(key, value);

    if (key === 'isTaxInclusive') {
      this.calculateQuoteIsTaxInclusiveChange();
    }

    if (key === 'contactId') {
      this.dispatcher.resetContact();
      if (value) {
        this.loadCustomerAddress();
      }
    }
  };

  addQuoteLine = (line) => {
    this.dispatcher.addQuoteLine(line);

    const state = this.store.getState();
    const newLineIndex = getNewLineIndex(state);
    const newLine = getLineByIndex(state, { index: newLineIndex });

    if (newLine.type === QuoteLineType.ITEM) {
      this.calculateQuoteItemChange(newLineIndex, newLine.itemId);
    }
  };

  updateQuoteLine = (index, key, value) => {
    this.dispatcher.updateQuoteLine(index, key, value);

    const itemKeys = ['units', 'unitPrice', 'discount', 'amount'];
    const taxKeys = ['accountId', 'taxCodeId'];

    if (itemKeys.includes(key)) {
      this.dispatcher.setQuoteLineDirty(true);
    } else if (taxKeys.includes(key)) {
      this.calculateQuoteTaxCodeChange();
    } else if (key === 'itemId') {
      this.calculateQuoteItemChange(index, value);
    }
  };

  removeQuoteLine = (index) => {
    this.dispatcher.removeQuoteLine(index);

    const state = this.store.getState();

    const taxCalculations = getTaxCalculations(state, {
      isSwitchingTaxInclusive: false,
    });
    this.setQuoteCalculatedLines(taxCalculations, CALCULATE_QUOTE_LINE_TOTALS);
  };

  /*
   * Workflow:
   *  1. price calculation - update at most one extra field when formula prerequisite met
   *  2. tax calculation - update total
   */
  formatQuoteLine = (index, key) => {
    if (index >= getLength(this.store.getState())) {
      return;
    }

    const isLineAmountDirty = getIsLineAmountInputDirty(this.store.getState());
    if (isLineAmountDirty) {
      this.dispatcher.calculateLineAmounts(index, key);

      const taxCalculations = getTaxCalculations(this.store.getState(), {
        isSwitchingTaxInclusive: false,
      });
      this.setQuoteCalculatedLines(
        taxCalculations,
        CALCULATE_QUOTE_AMOUNT_CHANGE
      );
    }
  };

  setQuoteCalculatedLines = (
    taxCalculations,
    intent,
    isSwitchingTaxInclusive = false
  ) => {
    const state = this.store.getState();

    if (
      intent !== CALCULATE_QUOTE_ITEM_CHANGE &&
      !getIsTaxCalculationRequired(state)
    ) {
      return;
    }

    this.dispatcher.setQuoteCalculatedLines(
      taxCalculations,
      isSwitchingTaxInclusive
    );
  };

  calculateQuoteTaxCodeChange = () => {
    const state = this.store.getState();
    const taxCalculations = getTaxCalculations(state, {
      isSwitchingTaxInclusive: false,
    });

    this.setQuoteCalculatedLines(taxCalculations, CALCULATE_QUOTE_LINE_TOTALS);
  };

  loadItemSellingDetails = (index, itemSellingDetails) => {
    this.dispatcher.loadItemSellingDetails({
      index,
      itemSellingDetails,
    });
    const state = this.store.getState();
    const taxCalculations = getTaxCalculations(state, {
      isSwitchingTaxInclusive: false,
    });
    this.setQuoteCalculatedLines(taxCalculations, CALCULATE_QUOTE_ITEM_CHANGE);
  };

  calculateQuoteItemChange = (index, itemId) => {
    const cachedItemSellingDetails = getItemSellingDetailsFromCache(
      this.store.getState(),
      itemId
    );
    if (cachedItemSellingDetails) {
      this.loadItemSellingDetails(index, cachedItemSellingDetails);
    } else {
      this.dispatcher.setQuoteSubmittingState(true);
      const onSuccess = (itemSellingDetails) => {
        this.dispatcher.setQuoteLineDirty(false);
        this.dispatcher.setQuoteSubmittingState(false);
        this.dispatcher.cacheItemSellingDetails({
          itemId,
          itemSellingDetails,
        });
        this.loadItemSellingDetails(index, itemSellingDetails);
      };

      const onFailure = ({ message }) => {
        this.dispatcher.setQuoteLineDirty(false);
        this.dispatcher.setQuoteSubmittingState(false);
        this.displayFailureAlert(message);
      };

      this.integrator.loadItemSellingDetails({
        itemId,
        onSuccess,
        onFailure,
      });
    }
  };

  calculateQuoteIsTaxInclusiveChange = () => {
    const state = this.store.getState();
    const isSwitchingTaxInclusive = true;
    const taxCalculations = getTaxCalculations(state, {
      isSwitchingTaxInclusive,
    });

    this.setQuoteCalculatedLines(
      taxCalculations,
      CALCULATE_QUOTE_TAX_INCLUSIVE_CHANGE,
      isSwitchingTaxInclusive
    );
  };

  updateLayout = ({ value }) => {
    this.dispatcher.updateLayout({ value });
    this.calculateQuoteTaxCodeChange();
  };

  loadCustomerAddress = () => {
    const onSuccess = ({ address }) =>
      this.dispatcher.loadContactAddress(address);

    const onFailure = (error) => {
      this.displayFailureAlert(error.message);
      this.dispatcher.loadContactAddress('');
    };

    this.integrator.loadContactAddress({ onSuccess, onFailure });
  };

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
      onSaveSuccess: (payload) =>
        this.loadAccountAfterCreate({ ...payload }, onChange),
      onLoadFailure: (message) => this.displayFailureAlert(message),
    });
  };

  openCancelModal = () => {
    if (getIsPageEdited(this.store.getState())) {
      this.dispatcher.openModal({ type: ModalType.CANCEL });
    } else {
      this.redirectToQuoteList();
    }
  };

  openJobModal = (onChange) => {
    const state = this.store.getState();
    const context = getJobModalContext(state);

    this.jobModalModule.run({
      context,
      onLoadFailure: (message) => this.displayFailureAlert(message),
      onSaveSuccess: (payload) => this.loadJobAfterCreate(payload, onChange),
    });
  };

  loadJobAfterCreate = ({ message, id }, onChange) => {
    this.jobModalModule.resetState();
    this.displaySuccessAlert(message);
    this.dispatcher.setJobLoadingState(true);

    const onSuccess = (payload) => {
      const job = { ...payload, id };
      this.dispatcher.setJobLoadingState(false);
      this.dispatcher.loadJobAfterCreate(job);
      onChange(job);
    };

    const onFailure = () => {
      this.dispatcher.setJobLoadingState(false);
    };

    this.integrator.loadJobAfterCreate({ id, onSuccess, onFailure });
  };

  openDeleteModal = () => this.dispatcher.openModal({ type: ModalType.DELETE });

  openUnsavedModal = (url) => {
    this.dispatcher.openModal({ type: ModalType.UNSAVED, url });
  };

  openEmailModal = () => {
    const state = this.store.getState();
    const type = getEmailModalType(state);

    this.dispatcher.openModal({ type });
  };

  openExportPdfModal = () => {
    this.dispatcher.openModal({ type: ModalType.EXPORT_PDF });
  };

  convertToInvoiceOrOpenUnsavedModal = () => {
    const state = this.store.getState();
    if (getIsPageEdited(state)) {
      const url = getCreateInvoiceFromQuoteUrl(state);
      this.openUnsavedModal(url);
    } else {
      this.redirectToCreateInvoice();
    }
  };

  openSaveAndCreateNewConfirmationModal = () => {
    this.dispatcher.openModal({ type: ModalType.SAVE_AND_CREATE_NEW });
  };

  openSaveAndDuplicateConfirmationModal = () => {
    this.dispatcher.openModal({ type: ModalType.SAVE_AND_DUPLICATE });
  };

  executeSaveAndAction = (saveAndAction) =>
    ({
      [SaveActionType.SAVE_AND_CREATE_NEW]: this
        .openSaveAndCreateNewConfirmationModal,
      [SaveActionType.SAVE_AND_DUPLICATE]: this
        .openSaveAndDuplicateConfirmationModal,
    }[saveAndAction]());

  saveAndEmailQuote = () => {
    const state = this.store.getState();
    const shouldSaveAndReload = getShouldSaveAndReload(state);
    if (shouldSaveAndReload) {
      const onSuccess = ({ message }) => {
        this.openEmailModal();
        this.dispatcher.setModalAlert({ type: 'success', message });
      };

      this.saveAndReload({ onSuccess });
    } else {
      this.openEmailModal();
    }
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
      this.dispatcher.uploadEmailAttachment(response, file);
    };

    const onFailure = ({ message }) => {
      this.dispatcher.uploadEmailAttachmentFailed(message, file);
    };

    const onProgress = (uploadProgress) => {
      this.dispatcher.uploadEmailAttachmentUploadProgress(uploadProgress, file);
    };

    this.integrator.uploadEmailAttachment({
      file,
      onSuccess,
      onFailure,
      onProgress,
    });
  };

  closeEmailQuoteDetailModal = () => {
    this.dispatcher.closeModal();
    this.dispatcher.resetOpenSendEmail();
    this.dispatcher.resetEmailQuoteDetail();
  };

  closeEmailSettingsModal = () => {
    this.dispatcher.closeModal();
    this.dispatcher.resetOpenSendEmail();
  };

  openSalesSettingsTabAndCloseModal = () => {
    this.closeEmailSettingsModal();
    this.redirectToInvoiceAndQuoteSettings();
  };

  sendEmail = () => {
    if (getIsModalActionDisabled(this.store.getState())) return;

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
  };

  exportQuotePdf = () => {
    if (getIsModalActionDisabled(this.store.getState())) return;

    this.dispatcher.setModalSubmittingState(true);

    const onSuccess = (data) => {
      this.dispatcher.setSubmittingState(false);
      this.dispatcher.setModalSubmittingState(false);
      this.dispatcher.closeModal();

      const state = this.store.getState();
      const filename = getExportPdfFilename(state);
      openBlob({ blob: data, filename });
    };

    const onFailure = () => {
      this.displayFailureAlert('Failed to export PDF');
      this.dispatcher.setModalSubmittingState(false);
      this.dispatcher.setSubmittingState(false);
    };

    this.integrator.exportQuotePdf({ onSuccess, onFailure });
  };

  exportPdfOrSaveAndExportPdf = () => {
    const state = this.store.getState();
    const shouldSaveAndReload = getShouldSaveAndReload(state);
    if (shouldSaveAndReload) {
      this.saveAndReload({ onSuccess: this.openExportPdfModal });
    } else {
      this.openExportPdfModal();
    }
  };

  readMessages = () => {
    this.popMessages([SUCCESSFULLY_SAVED_QUOTE, DUPLICATE_QUOTE]).forEach(
      (message) => {
        switch (message.type) {
          case SUCCESSFULLY_SAVED_QUOTE:
            this.dispatcher.setAlert({
              message: message.content,
              type: 'success',
            });
            break;
          case DUPLICATE_QUOTE:
            this.dispatcher.setDuplicateId(message.duplicateId);
            break;
          default:
        }
      }
    );
  };

  loadContactCombobox = () => {
    const state = this.store.getState();
    const context = getContactComboboxContext(state);
    this.contactComboboxModule.run(context);
  };

  updateContactCombobox = () => {
    const state = this.store.getState();
    const contactId = getContactId(state);
    if (contactId) {
      this.contactComboboxModule.load(contactId);
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

    const tableListeners = {
      onAddRow: this.addQuoteLine,
      onRemoveRow: this.removeQuoteLine,
      onUpdateRow: this.updateQuoteLine,
      onRowInputBlur: this.formatQuoteLine,
      onAddAccountButtonClick: this.openAccountModal,
      onAddJob: this.openJobModal,
    };

    const view = (
      <Provider store={this.store}>
        <QuoteDetailView
          renderContactCombobox={this.renderContactCombobox}
          renderItemCombobox={this.renderItemCombobox}
          accountModal={accountModal}
          jobModal={jobModal}
          onDismissAlert={this.dispatcher.dismissAlert}
          onUpdateHeaderOptions={this.updateQuoteDetailHeaderOptions}
          onUpdateLayout={this.updateLayout}
          onInputAlert={this.dispatcher.setAlert}
          serviceLayoutListeners={tableListeners}
          itemAndServiceLayoutListeners={tableListeners}
          quoteActionListeners={{
            onSaveButtonClick: this.saveQuote,
            onSaveAndButtonClick: this.executeSaveAndAction,
            onCancelButtonClick: this.openCancelModal,
            onDeleteButtonClick: this.openDeleteModal,
            onConvertToInvoiceButtonClick: this
              .convertToInvoiceOrOpenUnsavedModal,
            onExportPdfButtonClick: this.exportPdfOrSaveAndExportPdf,
            onSaveAndEmailButtonClick: this.saveAndEmailQuote,
          }}
          modalListeners={{
            onDismissModal: this.dispatcher.closeModal,
            onConfirmCancelButtonClick: this.redirectToQuoteList,
            onConfirmDeleteButtonClick: this.deleteQuote,
            onConfirmSaveButtonClick: this.saveUnsavedChanges,
            onConfirmUnsaveButtonClick: this
              .handleOnDiscardButtonClickFromUnsavedModal,
            onConfirmSaveAndCreateNewButtonClick: this.saveAndCreateNew,
            onConfirmSaveAndDuplicateButtonClick: this.saveAndDuplicate,
            onEmailQuoteDetailChange: this.dispatcher.updateEmailQuoteDetail,
            onConfirmEmailQuoteButtonClick: this.sendEmail,
            onCancelEmailQuoteButtonClick: this.closeEmailQuoteDetailModal,
            onAddAttachments: this.addEmailAttachments,
            onRemoveAttachment: this.dispatcher.removeEmailAttachment,
            onConfirmEmailSettingButtonClick: this
              .openSalesSettingsTabAndCloseModal,
            onCloseEmailSettingButtonClick: this.closeEmailSettingsModal,
            onConfirmExportPdfButtonClick: this.exportQuotePdf,
            onChangeExportPdfTemplate: this.dispatcher.changeExportPdfTemplate,
            onDismissAlert: this.dispatcher.dismissModalAlert,
          }}
        />
      </Provider>
    );

    this.setRootView(view);
  };

  setInitialState = (context) => this.dispatcher.setInitialState(context);

  resetState = () => {
    this.contactComboboxModule.resetState();
    this.itemComboboxModule.resetState();
    this.accountModalModule.resetState();
    this.dispatcher.resetState();
  };

  unsubscribeFromStore = () => this.store.unsubscribeAll();

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
    const modalType = getOpenedModalType(state);
    switch (modalType) {
      case ModalType.CANCEL:
      case ModalType.DELETE:
        // DO NOTHING
        break;
      case ModalType.EXPORT_PDF:
        this.exportQuotePdf();
        break;
      case ModalType.EMAIL_QUOTE:
        this.sendEmail();
        break;
      case ModalType.EMAIL_SETTINGS:
        this.openSalesSettingsTabAndCloseModal();
        break;
      case ModalType.SAVE_AND_CREATE_NEW:
        this.saveAndCreateNew();
        break;
      case ModalType.SAVE_AND_DUPLICATE:
        this.saveAndDuplicate();
        break;
      case ModalType.UNSAVED:
        this.saveUnsavedChanges();
        break;
      default:
        this.saveQuote();
        break;
    }
  };

  handlers = {
    SAVE_ACTION: this.saveHandler,
  };

  handlePageTransition = (url) => {
    const state = this.store.getState();
    if (getIsPageEdited(state)) {
      this.openUnsavedModal(url);
    } else {
      this.navigateTo(url);
    }
  };

  run(context) {
    this.dispatcher.setInitialState({
      ...context,
      isQuoteJobColumnEnabled: this.isToggleOn(FeatureToggle.EssentialsJobs),
    });
    setupHotKeys(keyMap, this.handlers);
    this.render();

    this.readMessages();

    this.loadQuote();
    this.loadContactCombobox();
    this.loadItemCombobox();
  }
}
