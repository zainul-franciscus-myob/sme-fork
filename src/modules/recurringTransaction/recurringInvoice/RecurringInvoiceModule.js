import { Provider } from 'react-redux';
import React from 'react';

import {
  SUCCESSFULLY_DELETED_RECURRING_TRANSACTION,
  SUCCESSFULLY_SAVED_RECURRING_TRANSACTION,
} from '../../../common/types/MessageTypes';
import {
  getAccountModalContext,
  getContactComboboxContext,
  getCustomerId,
  getIsCreating,
  getIsLineAmountDirty,
  getIsPageEdited,
  getIsSubmitting,
  getIsTableEmpty,
  getItemComboboxContext,
  getJobComboboxContext,
  getModalType,
  getNewLineIndex,
  getRecurringTransactionListUrl,
  getRecurringTransactionRedirectParams,
  getRedirectState,
  getRegion,
  getShouldShowAbn,
  getTaxCalculations,
  getUniqueSelectedItemIds,
  getUniqueSelectedJobIds,
} from './selectors/RecurringInvoiceSelectors';
import { isToggleOn } from '../../../splitToggle';
import AbnStatus from '../../../components/autoFormatter/AbnInput/AbnStatus';
import AccountModalModule from '../../account/accountModal/AccountModalModule';
import ContactComboboxModule from '../../contact/contactCombobox/ContactComboboxModule';
import FeatureToggles from '../../../FeatureToggles';
import ItemComboboxModule from '../../inventory/itemCombobox/ItemComboboxModule';
import JobComboboxModule from '../../job/jobCombobox/JobComboboxModule';
import LoadingState from '../../../components/PageView/LoadingState';
import RecurringInvoiceModalType from './types/RecurringInvoiceModalType';
import RecurringInvoiceView from './components/RecurringInvoiceView';
import Region from '../../../common/types/Region';
import Store from '../../../store/Store';
import TransactionType from '../types/TransactionType';
import createRecurringInvoiceDispatcher from './createRecurringInvoiceDispatcher';
import createRecurringInvoiceIntegrator from './createRecurringInvoiceIntegrator';
import getRecurringUrl from '../common/getRecurringUrl';
import isFeatureEnabled from '../../../common/feature/isFeatureEnabled';
import keyMap from '../../../hotKeys/keyMap';
import recurringInvoiceReducer from './reducer/RecurringInvoiceReducer';
import setupHotKeys from '../../../hotKeys/setupHotKeys';

export default class RecurringInvoiceModule {
  constructor({
    integration,
    setRootView,
    pushMessage,
    popMessages,
    replaceURLParams,
    navigateTo,
    featureToggles,
  }) {
    this.setRootView = setRootView;
    this.pushMessage = pushMessage;
    this.popMessages = popMessages;
    this.replaceURLParams = replaceURLParams;
    this.navigateTo = navigateTo;

    this.store = new Store(recurringInvoiceReducer);
    this.dispatcher = createRecurringInvoiceDispatcher(this.store);
    this.integrator = createRecurringInvoiceIntegrator(this.store, integration);

    this.accountModalModule = new AccountModalModule({
      integration,
    });
    this.contactComboboxModule = new ContactComboboxModule({ integration });
    this.itemComboboxModule = new ItemComboboxModule({
      integration,
      onAlert: this.dispatcher.setAlert,
    });
    this.jobComboboxModule = new JobComboboxModule({
      integration,
      onAlert: this.dispatcher.setAlert,
    });

    this.featureToggles = featureToggles;
  }

  loadRecurringInvoice = () => {
    this.dispatcher.setLoadingState(LoadingState.LOADING);

    const onSuccess = (payload) => {
      const { transactionType } = payload;
      if (transactionType !== TransactionType.INVOICE) {
        this.redirectToRecurringTransaction(transactionType);
      } else {
        this.dispatcher.setLoadingState(LoadingState.LOADING_SUCCESS);
        this.dispatcher.setSubmittingState(false);
        this.dispatcher.loadRecurringInvoice(payload);

        this.updateContactCombobox();
        this.updateItemCombobox();
        this.updateJobCombobox();

        if (getShouldShowAbn(this.store.getState())) {
          this.loadAbnFromCustomer();
        }
      }
    };

    const onFailure = () => {
      this.dispatcher.setLoadingState(LoadingState.LOADING_FAIL);
    };

    this.integrator.loadRecurringInvoice({ onSuccess, onFailure });
  };

  reloadRecurringInvoice = ({ onSuccess: next = () => {} }) => {
    this.dispatcher.setSubmittingState(true);

    const onSuccess = (payload) => {
      this.dispatcher.reloadRecurringInvoice(payload);
      next();
    };

    const onFailure = ({ message }) => {
      this.dispatcher.setSubmittingState(false);
      this.displayFailureAlert(message);
    };

    this.integrator.loadRecurringInvoice({ onSuccess, onFailure });
  };

  createOrUpdateRecurringInvoice = ({ onSuccess: next }) => {
    const state = this.store.getState();
    if (getIsSubmitting(state)) return;

    this.dispatcher.setSubmittingState(true);

    const onFailure = ({ message }) => {
      this.dispatcher.setSubmittingState(false);
      this.displayFailureAlert(message);
    };

    const onSuccess = (payload) => {
      this.dispatcher.setSubmittingState(false);
      next(payload);
    };

    this.integrator.createOrUpdateRecurringInvoice({
      onSuccess,
      onFailure,
    });
  };

  saveAndReloadRecurringInvoice = ({ onSuccess: next = () => {} }) => {
    const state = this.store.getState();
    const isCreating = getIsCreating(state);

    const onReloadSuccess = ({ message }) => {
      if (getShouldShowAbn(this.store.getState())) {
        this.loadAbnFromCustomer();
      }

      next({ message });
    };

    const onCreateOrUpdateInvoiceSuccess = ({ message, id }) => {
      if (isCreating) {
        this.dispatcher.updateInvoiceIdAfterCreate(id);
        this.replaceURLParams({ recurringTransactionId: id });
      }

      this.reloadRecurringInvoice({
        onSuccess: () => onReloadSuccess({ message }),
      });
    };

    this.createOrUpdateRecurringInvoice({
      onSuccess: onCreateOrUpdateInvoiceSuccess,
    });
  };

  saveAndRedirectToRefUrl = () => {
    const onSuccess = () => {
      this.dispatcher.setSubmittingState(false);
      this.redirectToRefUrl();
    };

    this.createOrUpdateRecurringInvoice({ onSuccess });
  };

  saveRecurringInvoice = () => {
    const onSuccess = ({ message }) => {
      if (getModalType(this.store.getState())) {
        this.closeModal();
      }

      this.pushMessage({
        type: SUCCESSFULLY_SAVED_RECURRING_TRANSACTION,
        content: message,
      });

      this.redirectToRecurringTransactionList();
    };

    this.createOrUpdateRecurringInvoice({ onSuccess });
  };

  deleteRecurringInvoice = () => {
    this.dispatcher.setSubmittingState(true);
    this.closeModal();

    const onSuccess = ({ message }) => {
      this.dispatcher.setSubmittingState(false);
      this.pushMessage({
        type: SUCCESSFULLY_DELETED_RECURRING_TRANSACTION,
        content: message,
      });
      this.redirectToRecurringTransactionList();
    };

    const onFailure = ({ message }) => {
      this.dispatcher.setSubmittingState(false);
      this.displayFailureAlert(message);
    };

    this.integrator.deleteRecurringInvoice({
      onSuccess,
      onFailure,
    });
  };

  updateInvoiceHeaderOptions = ({ key, value }) => {
    if (key === 'isTaxInclusive') {
      const state = this.store.getState();

      const isLineAmountDirty = getIsLineAmountDirty(state);

      if (!isLineAmountDirty) {
        this.dispatcher.updateInvoiceHeaderOptions(key, value);

        this.calculateInvoiceLinesOnTaxInclusiveChange();
      }
    } else {
      this.dispatcher.updateInvoiceHeaderOptions(key, value);

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
      this.calculateInvoiceLines();
    }
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

  removeInvoiceLine = (index) => {
    const state = this.store.getState();

    if (!getIsSubmitting(state)) {
      this.dispatcher.removeInvoiceLine(index);
      this.calculateInvoiceLines();
    }
  };

  updateInvoiceLine = (index, key, value) => {
    this.dispatcher.updateInvoiceLine(index, key, value);

    if (['units', 'unitPrice', 'discount', 'amount'].includes(key)) {
      this.dispatcher.setInvoiceItemLineDirty(true);
    }

    if (key === 'itemId' && value) {
      this.calculateInvoiceLinesOnItemChange({
        index,
        itemId: value,
      });
    }

    if (['accountId', 'taxCodeId'].includes(key)) {
      this.calculateInvoiceLines();
    }
  };

  calculateInvoiceLines = () => {
    const state = this.store.getState();

    const isTableEmpty = getIsTableEmpty(state);
    if (!isTableEmpty) {
      const taxCalculations = getTaxCalculations(state, false);
      this.dispatcher.calculateInvoiceLines(taxCalculations);
    }
  };

  calculateInvoiceLinesOnTaxInclusiveChange = () => {
    const state = this.store.getState();
    const taxCalculations = getTaxCalculations(state, true);
    this.dispatcher.calculateInvoiceLines(taxCalculations, true);
  };

  /*
   * Workflow:
   *  1. price calculation - update at most one extra field when formula prerequisite met
   *  2. tax calculation - update total
   */
  calculateInvoiceLinesOnAmountChange = ({ index, key }) => {
    const isLineAmountDirty = getIsLineAmountDirty(this.store.getState());
    if (isLineAmountDirty) {
      this.dispatcher.calculateLineAmounts({ index, key });

      const taxCalculations = getTaxCalculations(this.store.getState(), false);
      this.dispatcher.calculateInvoiceLines(taxCalculations);
      this.dispatcher.setInvoiceItemLineDirty(false);
    }
  };

  calculateInvoiceLinesOnItemChange = ({ index, itemId }) => {
    this.dispatcher.setSubmittingState(true);

    const onSuccess = (response) => {
      this.dispatcher.loadItem({
        index,
        item: response,
      });
      const state = this.store.getState();
      const taxCalculations = getTaxCalculations(state, false);
      this.dispatcher.calculateInvoiceLines(taxCalculations);
      this.dispatcher.setSubmittingState(false);
    };

    const onFailure = ({ message }) => {
      this.displayFailureAlert(message);
      this.dispatcher.setSubmittingState(false);
    };

    this.integrator.loadItem({
      onSuccess,
      onFailure,
      index,
      itemId,
    });
  };

  redirectToRefUrl = () => {
    const { redirectUrl, isOpenInNewTab } = getRedirectState(
      this.store.getState()
    );
    this.navigateTo(redirectUrl, isOpenInNewTab);
  };

  redirectToRecurringTransaction = (transactionType) => {
    const state = this.store.getState();
    const params = getRecurringTransactionRedirectParams(
      state,
      transactionType
    );
    const url = getRecurringUrl(params);

    this.navigateTo(url);
  };

  redirectToRecurringTransactionList = () => {
    const state = this.store.getState();
    const url = getRecurringTransactionListUrl(state);

    this.navigateTo(url);
  };

  openCancelModal = () => {
    if (getIsPageEdited(this.store.getState())) {
      this.dispatcher.setModalType(RecurringInvoiceModalType.CANCEL);
    } else {
      this.redirectToRecurringTransactionList();
    }
  };

  openDeleteModal = () =>
    this.dispatcher.setModalType(RecurringInvoiceModalType.DELETE);

  closeModal = () =>
    this.dispatcher.setModalType(RecurringInvoiceModalType.NONE);

  displayFailureAlert = (message) =>
    this.dispatcher.setAlert({ type: 'danger', message });

  displaySuccessAlert = (message) =>
    this.dispatcher.setAlert({ type: 'success', message });

  readMessages = () => {
    this.popMessages([SUCCESSFULLY_SAVED_RECURRING_TRANSACTION]).forEach(
      (message) => {
        switch (message.type) {
          case SUCCESSFULLY_SAVED_RECURRING_TRANSACTION:
            this.dispatcher.setAlert({
              type: 'success',
              message: message.content,
            });
            break;
          default:
            break;
        }
      }
    );
  };

  loadAccounts = ({ keywords, onSuccess }) => {
    const onFailure = ({ message }) => {
      this.dispatcher.setAlert({ type: 'danger', message });
    };

    this.integrator.loadAccounts({ keywords, onSuccess, onFailure });
  };

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

  loadCustomer = () => {
    const onSuccess = (payload) => {
      this.dispatcher.loadCustomer(payload);

      this.loadAbnFromCustomer();
    };

    const onFailure = ({ message }) => {
      this.displayFailureAlert(message);
      this.dispatcher.loadCustomer({});
    };

    this.integrator.loadCustomer({
      onSuccess,
      onFailure,
    });
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

  loadJobCombobox = () => {
    const state = this.store.getState();
    const context = getJobComboboxContext(state);
    this.jobComboboxModule.run(context);
  };

  updateJobCombobox = () => {
    const state = this.store.getState();
    const selectedJobIds = getUniqueSelectedJobIds(state);
    if (selectedJobIds.length > 0) {
      this.jobComboboxModule.load(selectedJobIds);
    }
  };

  renderJobCombobox = (props) => {
    return this.jobComboboxModule ? this.jobComboboxModule.render(props) : null;
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

  render = () => {
    const accountModal = this.accountModalModule.render();

    const recurringInvoiceView = (
      <RecurringInvoiceView
        accountModal={accountModal}
        onDismissAlert={this.dispatcher.dismissAlert}
        serviceLayoutListeners={{
          onAddRow: this.addInvoiceLine,
          onRemoveRow: this.removeInvoiceLine,
          onUpdateRow: this.updateInvoiceLine,
          onUpdateAmount: this.calculateInvoiceLinesOnAmountChange,
          onAddAccount: this.openAccountModal,
          onLoadAccounts: this.loadAccounts,
        }}
        itemLayoutListeners={{
          onAddRow: this.addInvoiceLine,
          onRemoveRow: this.removeInvoiceLine,
          onUpdateRow: this.updateInvoiceLine,
          onUpdateAmount: this.calculateInvoiceLinesOnAmountChange,
          onAddAccount: this.openAccountModal,
          onLoadAccounts: this.loadAccounts,
        }}
        invoiceActionListeners={{
          onSaveButtonClick: this.saveRecurringInvoice,
          onSaveAndButtonClick: this.executeSaveAndAction,
          onSaveAndEmailButtonClick: this.saveAndEmailInvoice,
          onPayInvoiceButtonClick: this.payInvoice,
          onExportPdfButtonClick: this.openExportPdfModalOrSaveAndExportPdf,
          onCancelButtonClick: this.openCancelModal,
          onDeleteButtonClick: this.openDeleteModal,
        }}
        confirmModalListeners={{
          onCancelModalConfirm: this.redirectToRecurringTransactionList,
          onDeleteModalConfirm: this.deleteRecurringInvoice,
          onCloseConfirmModal: this.closeModal,
        }}
        redirectToUrlListeners={{
          onConfirmSave: this.saveAndRedirectToRefUrl,
          onConfirmUnsave: this.redirectToRefUrl,
          onCancel: this.closeModal,
        }}
        renderContactCombobox={this.renderContactCombobox}
        renderItemCombobox={this.renderItemCombobox}
        renderJobCombobox={this.renderJobCombobox}
        onInputAlert={this.dispatcher.setAlert}
        onUpdateScheduleOptions={this.dispatcher.updateScheduleOptions}
        onUpdateHeaderOptions={this.updateInvoiceHeaderOptions}
        onUpdateInvoiceLayout={this.updateInvoiceLayout}
      />
    );

    const wrappedView = (
      <Provider store={this.store}>{recurringInvoiceView}</Provider>
    );
    this.setRootView(wrappedView);
  };

  resetState = () => {
    this.contactComboboxModule.resetState();
    this.itemComboboxModule.resetState();
    this.jobComboboxModule.resetState();
    this.accountModalModule.resetState();
    this.dispatcher.resetState();
  };

  handlePageTransition = (url) => {
    const state = this.store.getState();
    if (getIsPageEdited(state)) {
      this.dispatcher.setRedirectState({
        redirectUrl: url,
        isOpenInNewTab: false,
      });
      this.dispatcher.setModalType(RecurringInvoiceModalType.REDIRECT_TO_URL);
    } else {
      this.navigateTo(url);
    }
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

    if (this.jobComboboxModule.isCreateJobModalOpened()) {
      this.jobComboboxModule.createJob();
      return;
    }

    // In-module modals
    const state = this.store.getState();
    const modalType = getModalType(state);
    switch (modalType) {
      case RecurringInvoiceModalType.CANCEL:
      case RecurringInvoiceModalType.DELETE:
        // DO NOTHING
        break;
      case RecurringInvoiceModalType.REDIRECT_TO_URL:
        this.saveAndRedirectToRefUrl();
        break;
      default:
        this.saveRecurringInvoice();
        break;
    }
  };

  run(context) {
    const isRecurringTransactionEnabled = isFeatureEnabled({
      isFeatureCompleted: this.featureToggles.isRecurringTransactionEnabled,
      isEarlyAccess: isToggleOn(FeatureToggles.RecurringTransactions),
    });
    this.dispatcher.setInitialState({
      ...context,
      isRecurringTransactionEnabled,
    });
    setupHotKeys(keyMap, {
      SAVE_ACTION: this.saveHandler,
    });
    this.render();

    this.readMessages();

    this.loadRecurringInvoice();
    this.loadContactCombobox();
    this.loadItemCombobox();
    this.loadJobCombobox();

    const state = this.store.getState();
    const region = getRegion(state);
    if (region === Region.au) {
      this.loadPayDirect();
    }
  }

  unsubscribeFromStore = () => {
    this.store.unsubscribeAll();
  };
}
