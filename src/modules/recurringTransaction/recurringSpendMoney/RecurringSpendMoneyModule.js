import { Provider } from 'react-redux';
import React from 'react';

import {
  SUCCESSFULLY_DELETED_RECURRING_TRANSACTION,
  SUCCESSFULLY_SAVED_RECURRING_TRANSACTION,
} from '../../../common/types/MessageTypes';
import {
  TaxCalculatorTypes,
  createTaxCalculator,
} from '../../../common/taxCalculator';
import {
  getAccountModalContext,
  getContactComboboxContext,
  getIsLineAmountsTaxInclusive,
  getIsSubmitting,
  getIsTableEmpty,
  getIsTaxInclusive,
  getJobComboboxContext,
  getLinesForTaxCalculation,
  getModal,
  getModalUrl,
  getOpenedModalType,
  getPayToContactId,
  getRecurringTransactionListUrl,
  getRedirectUrl,
  getShouldLoadAbn,
  getTaxCodeOptions,
  getUniqueSelectedJobIds,
  isPageEdited,
} from './RecurringSpendMoneySelectors';
import { isToggleOn } from '../../../splitToggle';
import AccountModalModule from '../../account/accountModal/AccountModalModule';
import ContactComboboxModule from '../../contact/contactCombobox/ContactComboboxModule';
import FeatureToggles from '../../../FeatureToggles';
import JobComboboxModule from '../../job/jobCombobox/JobComboboxModule';
import LoadingState from '../../../components/PageView/LoadingState';
import ModalType from './components/ModalType';
import RecurringSpendMoneyView from './components/RecurringSpendMoneyView';
import Store from '../../../store/Store';
import createRecurringSpendMoneyDispatcher from './createRecurringSpendMoneyDispatcher';
import createRecurringSpendMoneyIntegrator from './createRecurringSpendMoneyIntegrator';
import isFeatureEnabled from '../../../common/feature/isFeatureEnabled';
import keyMap from '../../../hotKeys/keyMap';
import recurringSpendMoneyReducer from './RecurringSpendMoneyReducer';
import setupHotKeys from '../../../hotKeys/setupHotKeys';

export default class RecurringSpendMoneyModule {
  constructor({
    integration,
    setRootView,
    pushMessage,
    navigateTo,
    featureToggles,
  }) {
    this.store = new Store(recurringSpendMoneyReducer);
    this.setRootView = setRootView;
    this.pushMessage = pushMessage;
    this.navigateTo = navigateTo;
    this.featureToggles = featureToggles;
    this.dispatcher = createRecurringSpendMoneyDispatcher(this.store);
    this.integrator = createRecurringSpendMoneyIntegrator(
      this.store,
      integration
    );

    this.taxCalculate = createTaxCalculator(TaxCalculatorTypes.spendMoney);

    this.contactComboboxModule = new ContactComboboxModule({
      integration,
      featureToggles,
    });
    this.jobComboboxModule = new JobComboboxModule({
      integration,
      onAlert: this.dispatcher.setAlert,
    });
    this.accountModalModule = new AccountModalModule({ integration });
  }

  loadRecurringSpendMoney = () => {
    const onSuccess = (intent) => (response) => {
      this.dispatcher.loadRecurringSpendMoney(intent, response);
      this.dispatcher.setLoadingState(LoadingState.LOADING_SUCCESS);

      this.getTaxCalculations({ isSwitchingTaxInclusive: false });
      this.updateComponentsAfterLoadSpendMoney();
    };

    const onFailure = () => {
      this.dispatcher.setLoadingState(LoadingState.LOADING_FAIL);
    };

    this.integrator.loadSpendMoney({ onSuccess, onFailure });
  };

  createOrUpdateRecurringSpendMoney = () => {
    const state = this.store.getState();
    if (getIsSubmitting(state)) {
      return;
    }

    this.dispatcher.setSubmittingState(true);

    const onSuccess = (response) => {
      this.dispatcher.setSubmittingState(false);

      this.pushMessage({
        type: SUCCESSFULLY_SAVED_RECURRING_TRANSACTION,
        content: response.message,
      });

      const url = getRedirectUrl(state);
      this.navigateTo(url);
    };

    const onFailure = (error) => {
      this.dispatcher.setSubmittingState(false);
      if (getModal(this.store.getState())) {
        this.dispatcher.closeModal();
      }

      this.dispatcher.setAlert({
        type: 'danger',
        message: error.message,
      });
    };

    this.integrator.createOrUpdateRecurringSpendMoney({ onSuccess, onFailure });
  };

  deleteRecurringSpendMoney = () => {
    this.dispatcher.setSubmittingState(true);
    this.dispatcher.closeModal();

    const onSuccess = ({ message }) => {
      this.pushMessage({
        type: SUCCESSFULLY_DELETED_RECURRING_TRANSACTION,
        content: message,
      });
      this.redirectToRecurringTransactionList();
    };

    const onFailure = (error) => {
      this.dispatcher.setSubmittingState(false);
      this.dispatcher.setAlert({
        type: 'danger',
        message: error.message,
      });
    };

    this.integrator.deleteRecurringSpendMoney({ onSuccess, onFailure });
  };

  updateComponentsAfterLoadSpendMoney = () => {
    const state = this.store.getState();

    const contactId = getPayToContactId(state);
    if (contactId && getShouldLoadAbn(state)) {
      this.loadAbnFromContact(contactId);
    }

    this.updateContactCombobox();
    this.updateJobCombobox();
  };

  redirectToModalUrl = () => {
    const state = this.store.getState();
    const url = getModalUrl(state);

    this.navigateTo(url);
  };

  redirectToRecurringTransactionList = () => {
    const state = this.store.getState();
    const recurringTransactionListUrl = getRecurringTransactionListUrl(state);

    window.location.href = recurringTransactionListUrl;
  };

  setSpendMoneyOptions = ({ key, value }) => {
    this.dispatcher.setSpendMoneyOptions({ key, value });

    if (key === 'isTaxInclusive') {
      this.getTaxCalculations({ isSwitchingTaxInclusive: true });
    }
  };

  setPayToContact = ({ item }) => {
    this.dispatcher.setPayToContact(item);

    if (item) {
      const state = this.store.getState();
      if (getShouldLoadAbn(state)) {
        this.loadAbnFromContact(item.id);
      }
    }
  };

  addSpendMoneyLine = (line) => {
    const { id, ...partialLine } = line;
    this.dispatcher.addSpendMoneyLine(partialLine);
  };

  updateSpendMoneyLine = (lineIndex, lineKey, lineValue) => {
    this.dispatcher.updateSpendMoneyLine(lineIndex, lineKey, lineValue);

    const taxKeys = ['accountId', 'taxCodeId'];
    if (taxKeys.includes(lineKey)) {
      this.getTaxCalculations({ isSwitchingTaxInclusive: false });
    }
  };

  removeSpendMoneyLine = (index) => {
    this.dispatcher.removeSpendMoneyLine(index);

    this.getTaxCalculations({ isSwitchingTaxInclusive: false });
  };

  formatAndCalculateTotals = () => {
    const state = this.store.getState();
    if (isPageEdited(state)) {
      this.getTaxCalculations({ isSwitchingTaxInclusive: false });
    }
  };

  getTaxCalculations = ({ isSwitchingTaxInclusive }) => {
    const state = this.store.getState();

    if (getIsTableEmpty(state)) {
      this.dispatcher.resetTotals();
      return;
    }

    const isTaxInclusive = getIsTaxInclusive(state);
    const taxCalculations = this.taxCalculate({
      isTaxInclusive,
      lines: getLinesForTaxCalculation(state),
      taxCodes: getTaxCodeOptions(state),
      isLineAmountsTaxInclusive: getIsLineAmountsTaxInclusive(
        isTaxInclusive,
        isSwitchingTaxInclusive
      ),
    });

    this.dispatcher.getTaxCalculations(taxCalculations);
  };

  loadAbnFromContact = (contactId) => {
    this.dispatcher.setAbnLoadingState(true);

    const onSuccess = (response) => {
      this.dispatcher.setAbnLoadingState(false);
      this.dispatcher.loadAbn(response);
    };

    const onFailure = () => {
      this.dispatcher.setAbnLoadingState(false);
    };

    this.integrator.loadAbnFromContact({ contactId, onSuccess, onFailure });
  };

  openCancelModal = () => {
    const state = this.store.getState();
    if (isPageEdited(this.store.getState())) {
      const transactionListUrl = getRecurringTransactionListUrl(state);

      this.dispatcher.openModal({
        type: ModalType.CANCEL,
        url: transactionListUrl,
      });
    } else this.redirectToRecurringTransactionList();
  };

  openDeleteModal = () => {
    const state = this.store.getState();
    const transactionListUrl = getRecurringTransactionListUrl(state);
    this.dispatcher.openModal({
      type: ModalType.DELETE,
      url: transactionListUrl,
    });
  };

  openUnsavedModal = (url) => {
    this.dispatcher.openModal({ type: ModalType.UNSAVED, url });
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

  loadContactCombobox = () => {
    const state = this.store.getState();
    const context = getContactComboboxContext(state);
    this.contactComboboxModule.run(context);
  };

  updateContactCombobox = () => {
    const state = this.store.getState();
    const contactId = getPayToContactId(state);
    if (contactId) {
      this.contactComboboxModule.load(contactId);
    }
  };

  renderContactCombobox = (props) => {
    return this.contactComboboxModule
      ? this.contactComboboxModule.render(props)
      : null;
  };

  render = () => {
    const accountModal = this.accountModalModule.render();

    const spendMoneyView = (
      <RecurringSpendMoneyView
        accountModal={accountModal}
        onDismissAlert={this.dispatcher.dismissAlert}
        onUpdateScheduleOptions={this.dispatcher.setScheduleOptions}
        optionListeners={{
          onUpdateHeaderOptions: this.setSpendMoneyOptions,
          onUpdatePayToContact: this.setPayToContact,
        }}
        tableListeners={{
          onAddRow: this.addSpendMoneyLine,
          onUpdateRow: this.updateSpendMoneyLine,
          onRemoveRow: this.removeSpendMoneyLine,
          onRowInputBlur: this.formatAndCalculateTotals,
          onAddAccount: this.openAccountModal,
        }}
        confirmModalListeners={{
          onConfirmSave: this.createOrUpdateRecurringSpendMoney,
          onConfirmDeleteButtonClick: this.deleteRecurringSpendMoney,
          onConfirmCancelButtonClick: this.redirectToModalUrl,
          onDismissModal: this.dispatcher.closeModal,
        }}
        onActionListeners={{
          onSaveButtonClick: this.createOrUpdateRecurringSpendMoney,
          onCancelButtonClick: this.openCancelModal,
          onDeleteButtonClick: this.openDeleteModal,
        }}
        renderContactCombobox={this.renderContactCombobox}
        renderJobCombobox={this.renderJobCombobox}
      />
    );

    const wrappedView = (
      <Provider store={this.store}>{spendMoneyView}</Provider>
    );

    this.setRootView(wrappedView);
  };

  saveHandler = () => {
    // Quick add modals
    if (this.accountModalModule.isOpened()) {
      this.accountModalModule.save();
      return;
    }

    if (this.jobComboboxModule.isCreateJobModalOpened()) {
      this.jobComboboxModule.createJob();
      return;
    }

    if (this.contactComboboxModule.isContactModalOpened()) {
      this.contactComboboxModule.createContact();
      return;
    }

    const state = this.store.getState();
    const modalType = getOpenedModalType(state);
    switch (modalType) {
      case ModalType.CANCEL:
      case ModalType.DELETE:
        // DO NOTHING
        break;
      case ModalType.UNSAVED:
      default:
        this.createOrUpdateRecurringSpendMoney();
        break;
    }
  };

  handlers = {
    SAVE_ACTION: this.saveHandler,
  };

  handlePageTransition = (url) => {
    const state = this.store.getState();
    if (isPageEdited(state)) {
      this.openUnsavedModal(url);
    } else {
      this.navigateTo(url);
    }
  };

  run(context) {
    const isRecurringTransactionEnabled = isFeatureEnabled({
      isFeatureCompleted: this.featureToggles.isRecurringTransactionEnabled,
      isEarlyAccess: isToggleOn(FeatureToggles.RecurringTransactions),
    });

    this.dispatcher.setInitialState({
      isRecurringTransactionEnabled,
      ...context,
    });
    setupHotKeys(keyMap, this.handlers);
    this.render();
    this.dispatcher.setLoadingState(LoadingState.LOADING);

    this.loadRecurringSpendMoney();

    this.loadContactCombobox();
    this.loadJobCombobox();
  }

  resetState() {
    this.dispatcher.resetState();
    this.accountModalModule.resetState();
    this.contactComboboxModule.resetState();
    this.jobComboboxModule.resetState();
  }

  unsubscribeFromStore = () => {
    this.store.unsubscribeAll();
  };
}
