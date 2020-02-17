import { Provider } from 'react-redux';
import React from 'react';

import { SUCCESSFULLY_DELETED_GENERAL_JOURNAL, SUCCESSFULLY_SAVED_GENERAL_JOURNAL } from '../GeneralJournalMessageTypes';
import { TaxCalculatorTypes, createTaxCalculator } from '../../../common/taxCalculator';
import {
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
    integration, setRootView, pushMessage,
  }) {
    this.store = new Store(generalJournalDetailReducer);
    this.setRootView = setRootView;
    this.pushMessage = pushMessage;
    this.purchasesTaxCalculate = createTaxCalculator(TaxCalculatorTypes.generalJournalPurchases);
    this.salesTaxCalculate = createTaxCalculator(TaxCalculatorTypes.generalJournalSales);
    this.dispatcher = createGeneralJournalDispatcher(this.store);
    this.integrator = createGeneralJournalIntegrator(this.store, integration);
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
      this.dispatcher.setAlertMessage(error.message);
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
      this.dispatcher.setAlertMessage(error.message);
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

  unsubscribeFromStore = () => {
    this.store.unsubscribeAll();
  };

  redirectToTransactionList= () => {
    const state = this.store.getState();
    const transactionListUrl = getTransactionListUrl(state);
    this.redirectToUrl(transactionListUrl);
  }

  redirectToModalUrl = () => {
    const state = this.store.getState();
    const url = getModalUrl(state);
    this.redirectToUrl(url);
  }

  redirectToUrl = (url) => {
    window.location.href = url;
  }

  render = () => {
    const generalJournalView = (
      <GeneralJournalDetailView
        onUpdateHeaderOptions={this.updateHeaderOptions}
        onSaveButtonClick={this.saveGeneralJournal}
        onCancelButtonClick={this.openCancelModal}
        onDeleteButtonClick={this.openDeleteModal}
        onDismissModal={this.dispatcher.closeModal}
        onConfirmDeleteButtonClick={this.deleteGeneralJournal}
        onConfirmCancelButtonClick={this.redirectToModalUrl}
        onDismissAlert={this.dispatcher.dismissAlert}
        onUpdateRow={this.updateGeneralJournalLine}
        onAddRow={this.addGeneralJournalLine}
        onRemoveRow={this.deleteGeneralJournalLine}
        onRowInputBlur={this.formatAndCalculateTotals}
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
    const state = this.store.getState();
    const modalType = getOpenedModalType(state);
    switch (modalType) {
      case ModalType.CANCEL:
      case ModalType.DELETE:
        // DO NOTHING
        break;
      case ModalType.UNSAVED:
      default:
        this.saveGeneralJournal();
        break;
    }
  }

 handlers = {
   SAVE_ACTION: this.saveHandler,
 };

 run(context) {
   this.dispatcher.setInitialState(context);
   setupHotKeys(keyMap, this.handlers);
   this.render();
   this.dispatcher.setLoadingState(LoadingState.LOADING);
   this.loadGeneralJournal();
 }

 resetState() {
   this.dispatcher.resetState();
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
