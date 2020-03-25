import { Provider } from 'react-redux';
import React from 'react';

import { SUCCESSFULLY_DELETED_GENERAL_JOURNAL, SUCCESSFULLY_SAVED_GENERAL_JOURNAL } from '../GeneralJournalMessageTypes';
import { TaxCalculatorTypes, createTaxCalculator } from '../../../common/taxCalculator';
import {
  getAccountModalContext,
  getIsActionsDisabled,
  getIsLineAmountsTaxInclusive,
  getIsSale,
  getIsTaxInclusive,
  getLinesForTaxCalculation,
  getModalUrl,
  getOpenedModalType,
  getSaveUrl,
  getTaxCodeOptions,
  getTransactionListUrl,
  isPageEdited,
} from './generalJournalDetailSelectors';
import AccountModalModule from '../../account/accountModal/AccountModalModule';
import GeneralJournalDetailView from './components/GeneralJournalDetailView';
import LoadingState from '../../../components/PageView/LoadingState';
import ModalType from './ModalType';
import Store from '../../../store/Store';
import createGeneralJournalDispatcher from './createGeneralJournalDisptacher';
import createGeneralJournalIntegrator from './createGeneralJournalIntegrator';
import generalJournalDetailReducer from './generalJournalDetailReducer';
import keyMap from '../../../hotKeys/keyMap';
import setupHotKeys from '../../../hotKeys/setupHotKeys';

export default class GeneralJournalDetailModule {
  constructor({
    integration, setRootView, popMessages, pushMessage, reload,
  }) {
    this.store = new Store(generalJournalDetailReducer);
    this.setRootView = setRootView;
    this.pushMessage = pushMessage;
    this.popMessages = popMessages;
    this.reload = reload;
    this.purchasesTaxCalculate = createTaxCalculator(TaxCalculatorTypes.generalJournalPurchases);
    this.salesTaxCalculate = createTaxCalculator(TaxCalculatorTypes.generalJournalSales);
    this.dispatcher = createGeneralJournalDispatcher(this.store);
    this.integrator = createGeneralJournalIntegrator(this.store, integration);
    this.accountModalModule = new AccountModalModule({
      integration,
    });
  }

  loadGeneralJournal = () => {
    const onSuccess = ({
      generalJournal,
      newLine,
      totals,
      pageTitle,
      taxCodes: taxCodeOptions,
      accounts: accountOptions,
    }) => {
      this.dispatcher.setLoadingState(LoadingState.LOADING_SUCCESS);
      this.dispatcher.loadGeneralJournalDetail({
        generalJournal,
        totals,
        newLine,
        pageTitle,
        taxCodeOptions,
        accountOptions,
      });
    };

    const onFailure = () => {
      this.dispatcher.setLoadingState(LoadingState.LOADING_FAIL);
    };

    this.integrator.loadGeneralJournalDetail({ onSuccess, onFailure });
  };

  deleteGeneralJournal = () => {
    this.dispatcher.setSubmittingState(true);
    this.dispatcher.closeModal();

    const onSuccess = ({ message }) => {
      this.pushMessage({
        type: SUCCESSFULLY_DELETED_GENERAL_JOURNAL,
        content: message,
      });
      this.redirectToTransactionList();
    };

    const onFailure = (error) => {
      this.dispatcher.setSubmittingState(false);
      this.dispatcher.setAlert({
        message: error.message,
        type: 'danger',
      });
    };

    this.integrator.deleteGeneralJournal({
      onSuccess,
      onFailure,
    });
  }

  saveGeneralJournal = () => {
    if (getIsActionsDisabled(this.store.getState())) return;

    this.dispatcher.setSubmittingState(true);

    const onSuccess = (response) => {
      this.pushMessage({
        type: SUCCESSFULLY_SAVED_GENERAL_JOURNAL,
        content: response.message,
      });
      this.dispatcher.setSubmittingState(false);

      const state = this.store.getState();
      const url = getSaveUrl(state);
      this.redirectToUrl(url);
    };

    const onFailure = (error) => {
      this.dispatcher.setSubmittingState(false);
      this.dispatcher.setAlert({
        message: error.message,
        type: 'danger',
      });
    };

    this.integrator.saveGeneralJournalDetail({ onSuccess, onFailure });
  }

  saveUnsavedChanges = () => {
    const state = this.store.getState();
    if (getIsActionsDisabled(state)) return;

    const modalUrl = getModalUrl(state);
    this.dispatcher.closeModal();
    this.dispatcher.setSubmittingState(true);

    const onSuccess = (response) => {
      this.pushMessage({
        type: SUCCESSFULLY_SAVED_GENERAL_JOURNAL,
        content: response.message,
      });
      this.dispatcher.setSubmittingState(false);

      if (window.location.href.includes(modalUrl)) {
        this.reload();
      } else {
        this.redirectToUrl(modalUrl);
      }
    };

    const onFailure = (error) => {
      this.dispatcher.setSubmittingState(false);
      this.dispatcher.setAlert({
        message: error.message,
        type: 'danger',
      });
    };

    this.integrator.saveGeneralJournalDetail({ onSuccess, onFailure });
  }

  updateHeaderOptions = ({ key, value }) => {
    this.dispatcher.updateGeneralJournalHeader({ key, value });

    if (key === 'isTaxInclusive') {
      this.getCalculatedTotals({ isSwitchingTaxInclusive: true });
    }
    if (key === 'gstReportingMethod') {
      this.getCalculatedTotals({ isSwitchingTaxInclusive: false });
    }
  };

  updateGeneralJournalLine = (lineIndex, lineKey, lineValue) => {
    this.dispatcher.updateGeneralJournalLine({
      lineIndex,
      lineKey,
      lineValue,
    });

    const taxKeys = ['accountId', 'taxCodeId'];
    if (taxKeys.includes(lineKey)) {
      this.getCalculatedTotals({ isSwitchingTaxInclusive: false });
    }
  }

  addGeneralJournalLine = (line) => {
    const { id, ...partialLine } = line;

    this.dispatcher.addGeneralJournalLine(partialLine);
    this.getCalculatedTotals({ isSwitchingTaxInclusive: false });
  }

  deleteGeneralJournalLine = (index) => {
    this.dispatcher.deleteGeneralJournalLine(index);
    this.getCalculatedTotals({ isSwitchingTaxInclusive: false });
  }

  getCalculatedTotals = ({ isSwitchingTaxInclusive }) => {
    const state = this.store.getState();
    const isTaxInclusive = getIsTaxInclusive(state);
    const taxCalculate = getIsSale(state) ? this.salesTaxCalculate : this.purchasesTaxCalculate;
    const taxCalculations = taxCalculate({
      isTaxInclusive,
      lines: getLinesForTaxCalculation(state),
      taxCodes: getTaxCodeOptions(state),
      isLineAmountsTaxInclusive: getIsLineAmountsTaxInclusive(
        state, isSwitchingTaxInclusive,
      ),
    });

    this.dispatcher.getTaxCalculations(taxCalculations);
  }

  formatAndCalculateTotals = () => {
    this.getCalculatedTotals({ isSwitchingTaxInclusive: false });
  }

  openCancelModal = () => {
    if (isPageEdited(this.store.getState())) {
      const state = this.store.getState();
      const transactionListUrl = getTransactionListUrl(state);
      this.dispatcher.openModal({
        type: ModalType.CANCEL,
        url: transactionListUrl,
      });
    } else {
      this.redirectToTransactionList();
    }
  };

  openDeleteModal = () => {
    const state = this.store.getState();
    const transactionListUrl = getTransactionListUrl(state);

    this.dispatcher.openModal({
      type: ModalType.DELETE,
      url: transactionListUrl,
    });
  }

  openAccountModal = (onChange) => {
    const state = this.store.getState();
    const accountModalContext = getAccountModalContext(state);
    this.accountModalModule.run({
      context: accountModalContext,
      onSaveSuccess: payload => this.loadAccountAfterCreate(payload, onChange),
      onLoadFailure: message => this.dispatcher.setAlert({ message, type: 'danger' }),
    });
  };

  loadAccountAfterCreate = ({ message, id }, onChange) => {
    this.dispatcher.setAlert({ message, type: 'success' });
    this.dispatcher.setCreatedAccountLoadingState(true);
    this.accountModalModule.close();


    const onSuccess = (payload) => {
      this.dispatcher.setCreatedAccountLoadingState(false);
      this.dispatcher.loadAccountAfterCreate(payload);
      onChange(payload);
    };

    const onFailure = () => {
      this.dispatcher.setCreatedAccountLoadingState(false);
    };

    this.integrator.loadAccountAfterCreate({ id, onSuccess, onFailure });
  };

  unsubscribeFromStore = () => {
    this.store.unsubscribeAll();
  };

  redirectToTransactionList = () => {
    const state = this.store.getState();
    const transactionListUrl = getTransactionListUrl(state);
    this.redirectToUrl(transactionListUrl);
  }

  redirectToModalUrl = () => {
    const state = this.store.getState();
    const modalUrl = getModalUrl(state);

    if (window.location.href.includes(modalUrl)) {
      this.reload();
      return;
    }

    this.redirectToUrl(modalUrl);
  }

  redirectToUrl = (url) => {
    window.location.href = url;
  }

  render = () => {
    const accountModal = this.accountModalModule.render();

    const generalJournalView = (
      <GeneralJournalDetailView
        accountModal={accountModal}
        onUpdateHeaderOptions={this.updateHeaderOptions}
        onSaveButtonClick={this.saveGeneralJournal}
        onCancelButtonClick={this.openCancelModal}
        onDeleteButtonClick={this.openDeleteModal}
        confirmModalListeners={{
          onDismissModal: this.dispatcher.closeModal,
          deleteModal: {
            onConfirm: this.deleteGeneralJournal,
          },
          cancelModal: {
            onConfirm: this.redirectToModalUrl,
          },
          unsavedModal: {
            onConfirmSave: this.saveUnsavedChanges,
            onConfirmUnsave: this.redirectToModalUrl,
          },
        }}
        onDismissAlert={this.dispatcher.dismissAlert}
        onUpdateRow={this.updateGeneralJournalLine}
        onAddRow={this.addGeneralJournalLine}
        onRemoveRow={this.deleteGeneralJournalLine}
        onRowInputBlur={this.formatAndCalculateTotals}
        onCreateAccountButtonClick={this.openAccountModal}
      />
    );

    const wrappedView = (
      <Provider store={this.store}>
        {generalJournalView}
      </Provider>
    );

    this.setRootView(wrappedView);
  };

  saveHandler = () => {
    // Quick add modal
    if (this.accountModalModule.isOpened()) {
      this.accountModalModule.save();
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
        this.saveUnsavedChanges();
        break;
      default:
        this.saveGeneralJournal();
        break;
    }
  }

  handlers = {
    SAVE_ACTION: this.saveHandler,
  };

  readMessages = () => {
    const messageTypes = [SUCCESSFULLY_SAVED_GENERAL_JOURNAL];
    const [successMessage] = this.popMessages(messageTypes);

    if (successMessage) {
      const { content: message } = successMessage;
      this.dispatcher.setAlert({ message, type: 'success' });
    }
  };

  run(context) {
    this.dispatcher.setInitialState(context);
    setupHotKeys(keyMap, this.handlers);
    this.render();
    this.readMessages();
    this.dispatcher.setLoadingState(LoadingState.LOADING);
    this.loadGeneralJournal();
  }

  resetState() {
    this.dispatcher.resetState();
    this.accountModalModule.resetState();
  }

  handlePageTransition = (url) => {
    const state = this.store.getState();
    if (isPageEdited(state)) {
      this.dispatcher.openModal({ type: ModalType.UNSAVED, url });
    } else {
      this.redirectToUrl(url);
    }
  }
}
