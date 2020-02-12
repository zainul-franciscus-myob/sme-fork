import { Provider } from 'react-redux';
import React from 'react';

import {
  ADD_GENERAL_JOURNAL_LINE,
  CLOSE_MODAL,
  CREATE_GENERAL_JOURNAL,
  DELETE_GENERAL_JOURNAL,
  DELETE_GENERAL_JOURNAL_LINE,
  FORMAT_GENERAL_JOURNAL_LINE,
  GET_TAX_CALCULATIONS,
  LOAD_GENERAL_JOURNAL_DETAIL,
  LOAD_NEW_GENERAL_JOURNAL,
  OPEN_MODAL,
  SET_ALERT_MESSAGE,
  SET_LOADING_STATE,
  SET_SUBMITTING_STATE,
  UPDATE_GENERAL_JOURNAL,
  UPDATE_GENERAL_JOURNAL_HEADER,
  UPDATE_GENERAL_JOURNAL_LINE,
} from '../GeneralJournalIntents';
import { RESET_STATE, SET_INITIAL_STATE } from '../../../SystemIntents';
import { SUCCESSFULLY_DELETED_GENERAL_JOURNAL, SUCCESSFULLY_SAVED_GENERAL_JOURNAL } from '../GeneralJournalMessageTypes';
import { TaxCalculatorTypes, createTaxCalculator } from '../../../common/taxCalculator';
import {
  getBusinessId,
  getGeneralJournal,
  getGeneralJournalForCreatePayload,
  getGeneralJournalId,
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
import generalJournalDetailReducer from './generalJournalDetailReducer';
import keyMap from '../../../hotKeys/keyMap';
import setupHotKeys from '../../../hotKeys/setupHotKeys';

export default class GeneralJournalDetailModule {
  constructor({
    integration, setRootView, pushMessage,
  }) {
    this.integration = integration;
    this.store = new Store(generalJournalDetailReducer);
    this.setRootView = setRootView;
    this.pushMessage = pushMessage;
    this.generalJournalId = '';
    this.purchasesTaxCalculate = createTaxCalculator(TaxCalculatorTypes.generalJournalPurchases);
    this.salesTaxCalculate = createTaxCalculator(TaxCalculatorTypes.generalJournalSales);
  }

  loadGeneralJournal = () => {
    const intent = this.isCreating
      ? LOAD_NEW_GENERAL_JOURNAL
      : LOAD_GENERAL_JOURNAL_DETAIL;
    const state = this.store.getState();
    const urlParams = {
      businessId: getBusinessId(state),
      ...(!this.isCreating && { generalJournalId: this.generalJournalId }),
    };

    const onSuccess = ({
      generalJournal,
      newLine,
      totals,
      pageTitle,
      taxCodes: taxCodeOptions,
      accounts: accountOptions,
    }) => {
      this.setLoadingState(LoadingState.LOADING_SUCCESS);
      this.store.dispatch({
        intent,
        generalJournal,
        totals,
        newLine,
        pageTitle,
        taxCodeOptions,
        accountOptions,
      });
    };

    const onFailure = () => {
      this.setLoadingState(LoadingState.LOADING_FAIL);
    };

    this.integration.read({
      intent,
      urlParams,
      onSuccess,
      onFailure,
    });
  };

  deleteGeneralJournal = () => {
    this.setSubmittingState(true);
    this.closeModal();

    const onSuccess = ({ message }) => {
      this.pushMessage({
        type: SUCCESSFULLY_DELETED_GENERAL_JOURNAL,
        content: message,
      });
      this.redirectToTransactionList();
    };

    const onFailure = (error) => {
      this.setSubmittingState(false);
      this.displayAlert(error.message);
    };

    const state = this.store.getState();
    const businessId = getBusinessId(state);

    this.integration.write({
      intent: DELETE_GENERAL_JOURNAL,
      urlParams: {
        businessId,
        generalJournalId: this.generalJournalId,
      },
      onSuccess,
      onFailure,
    });
  }

  createGeneralJournalEntry = () => {
    const intent = CREATE_GENERAL_JOURNAL;
    const state = this.store.getState();
    const content = getGeneralJournalForCreatePayload(state);
    const urlParams = {
      businessId: getBusinessId(state),
    };
    this.saveGeneralJournalEntry(intent, content, urlParams);
  };

  updateGeneralJournalEntry = () => {
    const intent = UPDATE_GENERAL_JOURNAL;
    const state = this.store.getState();
    const content = getGeneralJournal(state);
    const generalJournalId = getGeneralJournalId(state);

    const urlParams = {
      businessId: getBusinessId(state),
      generalJournalId,
    };
    this.saveGeneralJournalEntry(intent, content, urlParams);
  }

  saveGeneralJournalEntry(intent, content, urlParams) {
    if (getIsActionsDisabled(this.store.getState())) return;

    this.setSubmittingState(true);

    const onSuccess = (response) => {
      this.pushMessage({
        type: SUCCESSFULLY_SAVED_GENERAL_JOURNAL,
        content: response.message,
      });
      this.setSubmittingState(false);

      const state = this.store.getState();
      const url = getSaveUrl(state);
      this.redirectToUrl(url);
    };

    const onFailure = (error) => {
      this.setSubmittingState(false);
      this.displayAlert(error.message);
    };

    this.integration.write({
      intent,
      urlParams,
      content,
      onSuccess,
      onFailure,
    });
  }

  updateHeaderOptions = ({ key, value }) => {
    const intent = UPDATE_GENERAL_JOURNAL_HEADER;
    this.store.dispatch({
      intent,
      key,
      value,
    });

    if (key === 'isTaxInclusive') {
      this.getCalculatedTotals({ isSwitchingTaxInclusive: true });
    }
    if (key === 'gstReportingMethod') {
      this.getCalculatedTotals({ isSwitchingTaxInclusive: false });
    }
  };

  updateGeneralJournalLine = (lineIndex, lineKey, lineValue) => {
    const intent = UPDATE_GENERAL_JOURNAL_LINE;

    this.store.dispatch({
      intent,
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
    const intent = ADD_GENERAL_JOURNAL_LINE;
    const { id, ...partialLine } = line;

    this.store.dispatch({
      intent,
      line: partialLine,
    });

    this.getCalculatedTotals({ isSwitchingTaxInclusive: false });
  }

  deleteGeneralJournalLine = (index) => {
    const intent = DELETE_GENERAL_JOURNAL_LINE;

    this.store.dispatch({
      intent,
      index,
    });

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

    this.store.dispatch({
      intent: GET_TAX_CALCULATIONS,
      taxCalculations,
    });
  }

  formatGeneralJournalLine = (index, key) => {
    const intent = FORMAT_GENERAL_JOURNAL_LINE;

    this.store.dispatch({
      intent,
      index,
      key,
    });
  }

  formatAndCalculateTotals = ({ index, key }) => {
    this.formatGeneralJournalLine(index, key);
    this.getCalculatedTotals({ isSwitchingTaxInclusive: false });
  }

  setSubmittingState = (isSubmitting) => {
    const intent = SET_SUBMITTING_STATE;

    this.store.dispatch({
      intent,
      isSubmitting,
    });
  }

  displayAlert = (errorMessage) => {
    this.store.dispatch({
      intent: SET_ALERT_MESSAGE,
      alertMessage: errorMessage,
    });
  }

  openCancelModal = () => {
    const intent = OPEN_MODAL;
    if (isPageEdited(this.store.getState())) {
      const state = this.store.getState();
      const transactionListUrl = getTransactionListUrl(state);
      this.store.dispatch({
        intent,
        modal: {
          type: ModalType.CANCEL,
          url: transactionListUrl,
        },
      });
    } else {
      this.redirectToTransactionList();
    }
  };

  openDeleteModal = () => {
    const state = this.store.getState();
    const transactionListUrl = getTransactionListUrl(state);

    this.store.dispatch({
      intent: OPEN_MODAL,
      modal: {
        type: ModalType.DELETE,
        url: transactionListUrl,
      },
    });
  }

  openUnsavedModal = (url) => {
    this.store.dispatch({
      intent: OPEN_MODAL,
      modal: {
        type: ModalType.UNSAVED,
        url,
      },
    });
  }

  closeModal = () => {
    const intent = CLOSE_MODAL;

    this.store.dispatch({ intent });
  };

  unsubscribeFromStore = () => {
    this.store.unsubscribeAll();
  };

  dismissAlert = () => {
    this.store.dispatch({
      intent: SET_ALERT_MESSAGE,
      alertMessage: '',
    });
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
        isCreating={this.isCreating}
        onSaveButtonClick={this.saveGeneralJournal}
        onCancelButtonClick={this.openCancelModal}
        onDeleteButtonClick={this.openDeleteModal}
        onDismissModal={this.closeModal}
        onConfirmDeleteButtonClick={this.deleteGeneralJournal}
        onConfirmCancelButtonClick={this.redirectToModalUrl}
        onDismissAlert={this.dismissAlert}
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

  setLoadingState = (loadingState) => {
    this.store.dispatch({
      intent: SET_LOADING_STATE,
      loadingState,
    });
  }

 setInitialState = (context) => {
   this.store.dispatch({
     intent: SET_INITIAL_STATE,
     context,
   });
 }


 saveGeneralJournal = () => {
   if (this.isCreating) {
     this.createGeneralJournalEntry();
   } else {
     this.updateGeneralJournalEntry();
   }
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
   this.generalJournalId = context.generalJournalId;
   this.isCreating = context.generalJournalId === 'new';
   this.setInitialState(context);
   setupHotKeys(keyMap, this.handlers);
   this.render();
   this.setLoadingState(LoadingState.LOADING);
   this.loadGeneralJournal();
 }

 resetState() {
   const intent = RESET_STATE;
   this.store.dispatch({
     intent,
   });
 }

  handlePageTransition = (url) => {
    const state = this.store.getState();
    if (isPageEdited(state)) {
      this.openUnsavedModal(url);
    } else {
      this.redirectToUrl(url);
    }
  }
}
