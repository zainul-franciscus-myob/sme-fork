import { Provider } from 'react-redux';
import React from 'react';

import {
  ADD_GENERAL_JOURNAL_LINE,
  CLOSE_MODAL,
  CREATE_GENERAL_JOURNAL,
  DELETE_GENERAL_JOURNAL,
  DELETE_GENERAL_JOURNAL_LINE,
  FORMAT_GENERAL_JOURNAL_LINE,
  GET_CALCULATED_TOTALS,
  LOAD_GENERAL_JOURNAL_DETAIL,
  LOAD_NEW_GENERAL_JOURNAL,
  OPEN_MODAL,
  RESET_TOTALS,
  SET_ALERT_MESSAGE,
  SET_LOADING_STATE,
  SET_SUBMITTING_STATE,
  UPDATE_GENERAL_JOURNAL,
  UPDATE_GENERAL_JOURNAL_HEADER,
  UPDATE_GENERAL_JOURNAL_LINE,
} from '../GeneralJournalIntents';
import {
  RESET_STATE,
  SET_INITIAL_STATE,
} from '../../SystemIntents';
import {
  SUCCESSFULLY_DELETED_GENERAL_JOURNAL, SUCCESSFULLY_SAVED_GENERAL_JOURNAL,
} from '../GeneralJournalMessageTypes';
import {
  getBusinessId,
  getCalculatedTotalsPayload,
  getGeneralJournal,
  getGeneralJournalForCreatePayload,
  getGeneralJournalId,
  getIsTableEmpty,
  getRegion,
  isPageEdited,
} from './generalJournalDetailSelectors';
import GeneralJournalDetailView from './components/GeneralJournalDetailView';
import Store from '../../store/Store';
import generalJournalDetailReducer from './generalJournalDetailReducer';
import keyMap from '../../hotKeys/keyMap';
import setupHotKeys from '../../hotKeys/setupHotKeys';

export default class GeneralJournalDetailModule {
  constructor({
    integration, setRootView, pushMessage,
  }) {
    this.integration = integration;
    this.store = new Store(generalJournalDetailReducer);
    this.setRootView = setRootView;
    this.pushMessage = pushMessage;
    this.generalJournalId = '';
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
      generalJournal, newLine, totals, pageTitle,
    }) => {
      this.setLoadingState(false);
      this.store.dispatch({
        intent,
        generalJournal,
        totals,
        newLine,
        pageTitle,
        isLoading: false,
      });
    };

    const onFailure = () => {
      console.log('Failed to load general journal details');
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
    const onSuccess = (response) => {
      this.pushMessage({
        type: SUCCESSFULLY_SAVED_GENERAL_JOURNAL,
        content: response.message,
      });
      this.setSubmittingState(false);
      this.redirectToTransactionList();
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
    this.setSubmittingState(true);
  }

  updateHeaderOptions = ({ key, value }) => {
    const intent = UPDATE_GENERAL_JOURNAL_HEADER;
    this.store.dispatch({
      intent,
      key,
      value,
    });

    const taxKeys = ['isTaxInclusive', 'gstReportingMethod'];
    if (taxKeys.includes(key)) {
      this.getCalculatedTotals();
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
      this.getCalculatedTotals();
    }
  }

  addGeneralJournalLine = (partialLine) => {
    const intent = ADD_GENERAL_JOURNAL_LINE;

    this.store.dispatch({
      intent,
      line: partialLine,
    });

    this.getCalculatedTotals();
  }

  deleteGeneralJournalLine = (index) => {
    const intent = DELETE_GENERAL_JOURNAL_LINE;

    this.store.dispatch({
      intent,
      index,
    });

    this.getCalculatedTotals();
  }

  getCalculatedTotals = () => {
    const state = this.store.getState();
    if (getIsTableEmpty(state)) {
      this.store.dispatch({
        intent: RESET_TOTALS,
      });
      return;
    }

    const intent = GET_CALCULATED_TOTALS;

    const onSuccess = (totals) => {
      this.store.dispatch({
        intent,
        totals,
      });
    };

    const onFailure = error => this.displayAlert(error.message);

    this.integration.write({
      intent,
      urlParams: { businessId: getBusinessId(state) },
      content: getCalculatedTotalsPayload(state),
      onSuccess,
      onFailure,
    });
  }

  formatGeneralJournalLine = (index) => {
    const intent = FORMAT_GENERAL_JOURNAL_LINE;

    this.store.dispatch({
      intent,
      index,
    });
  }

  formatAndCalculateTotals = (line) => {
    this.formatGeneralJournalLine(line);
    this.getCalculatedTotals();
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
      this.store.dispatch({
        intent,
        modalType: 'cancel',
      });
    } else {
      this.redirectToTransactionList();
    }
  };

  openDeleteModal = () => {
    const intent = OPEN_MODAL;

    this.store.dispatch({
      intent,
      modalType: 'delete',
    });
  };

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
    const businessId = getBusinessId(state);
    const region = getRegion(state);

    window.location.href = `/#/${region}/${businessId}/transactionList`;
  }

  render = () => {
    const generalJournalView = (
      <GeneralJournalDetailView
        onUpdateHeaderOptions={this.updateHeaderOptions}
        isCreating={this.isCreating}
        onSaveButtonClick={this.isCreating
          ? this.createGeneralJournalEntry : this.updateGeneralJournalEntry}
        onCancelButtonClick={this.openCancelModal}
        onDeleteButtonClick={this.openDeleteModal}
        onCloseModal={this.closeModal}
        onDeleteModal={this.deleteGeneralJournal}
        onCancelModal={this.redirectToTransactionList}
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

  setLoadingState = (isLoading) => {
    this.store.dispatch({
      intent: SET_LOADING_STATE,
      isLoading,
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

 handlers = {
   SAVE_ACTION: this.saveGeneralJournal,
 };

 run(context) {
   this.generalJournalId = context.generalJournalId;
   this.isCreating = context.generalJournalId === 'new';
   this.setInitialState(context);
   setupHotKeys(keyMap, this.handlers);
   this.render();
   this.setLoadingState(true);
   this.loadGeneralJournal();
 }

 resetState() {
   const intent = RESET_STATE;
   this.store.dispatch({
     intent,
   });
 }
}
