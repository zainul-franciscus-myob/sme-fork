import { Spinner } from '@myob/myob-widgets';
import React from 'react';

import { CancelModal, DeleteModal } from './components/GeneralJournalDetailModals';
import { SUCCESSFULLY_CREATED_ENTRY, SUCCESSFULLY_DELETED_ENTRY } from '../GeneralJournalMessageTypes';
import {
  getGeneralJournal,
  getGeneralJournalForCreatePayload,
  getHeaderOptions,
  getIndexOfLastLine,
  getIsActionsDisabled,
  getJournalId,
  getLineData,
  getNewLineData,
  getTaxCalculatorPayload,
  getTotals,
} from './GeneralJournalDetailSelectors';
import Alert from '../../components/Alert/Alert';
import GeneralJournalDetailView from './components/GeneralJournalDetailView';
import GeneralJournalIntents from '../GeneralJournalIntents';
import Store from '../../store/Store';
import SystemIntents from '../../SystemIntents';
import generalJournalDetailReducer from './generalJournalDetailReducer';

export default class GeneralJournalDetailModule {
  constructor({ integration, setRootView, pushMessage }) {
    this.integration = integration;
    this.store = new Store(generalJournalDetailReducer);
    this.setRootView = setRootView;
    this.businessId = '';
    this.pushMessage = pushMessage;
    this.journalId = '';
  }

  loadGeneralJournalDetail = () => {
    const intent = this.isCreating
      ? GeneralJournalIntents.LOAD_NEW_GENERAL_JOURNAL_DETAIL
      : GeneralJournalIntents.LOAD_GENERAL_JOURNAL_DETAIL;

    const urlParams = {
      businessId: this.businessId,
      ...(!this.isCreating && { journalId: this.journalId }),
    };

    const onSuccess = ({ generalJournal, newLine }) => {
      this.setLoadingState(false);
      this.store.publish({
        intent,
        generalJournal,
        newLine,
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

  updateHeaderOptions = ({ key, value }) => {
    const intent = GeneralJournalIntents.UPDATE_GENERAL_JOURNAL_DETAIL_HEADER_OPTIONS;

    this.store.publish({
      intent,
      key,
      value,
    });

    if (key === 'gstReportingMethod') {
      this.getCalculatedTax();
    }
  };

  deleteGeneralJournalEntry = journalId => () => {
    const intent = GeneralJournalIntents.DELETE_GENERAL_JOURNAL_DETAIL;

    const urlParams = {
      businessId: this.businessId,
      journalId,
    };

    const onSuccess = () => {
      this.pushMessage({
        type: SUCCESSFULLY_DELETED_ENTRY,
        content: 'Success! Your general journal was deleted.',
      });
      this.redirectToGeneralJournalList();
    };

    const onFailure = (error) => {
      this.closeModal();
      this.displayAlert(error.message);
      this.setSubmittingState(false);
    };

    this.integration.write({
      intent,
      urlParams,
      onSuccess,
      onFailure,
    });
    this.setSubmittingState(true);
  };

  displayAlert = (errorMessage) => {
    this.store.publish({
      intent: GeneralJournalIntents.SET_ALERT_MESSAGE,
      alertMessage: errorMessage,
    });
  }

  saveGeneralJournalEntry = () => {
    const { state } = this.store;
    const journalId = getJournalId(state);
    const content = getGeneralJournal(state);
    const intent = GeneralJournalIntents.SAVE_GENERAL_JOURNAL_DETAIL;
    const urlParams = {
      businessId: this.businessId,
      journalId,
    };

    const onSuccess = () => {
      this.pushMessage({
        type: SUCCESSFULLY_CREATED_ENTRY,
        content: 'Success! Your general journal was saved.',
      });
      this.redirectToGeneralJournalList();
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
  };

  createGeneralJournalEntry = () => {
    const intent = GeneralJournalIntents.CREATE_GENERAL_JOURNAL_DETAIL;
    const content = getGeneralJournalForCreatePayload(this.store.state);
    const urlParams = {
      businessId: this.businessId,
    };

    const onSuccess = () => {
      this.pushMessage({
        type: SUCCESSFULLY_CREATED_ENTRY,
        content: 'Success! Your general journal was saved.',
      });
      this.redirectToGeneralJournalList();
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
  };

  setSubmittingState = (isSubmitting) => {
    const intent = GeneralJournalIntents.SET_SUBMITTING_STATE;

    this.store.publish({
      intent,
      isSubmitting,
    });
  }

  openCancelModal = () => {
    const intent = GeneralJournalIntents.OPEN_MODAL;

    this.store.publish({
      intent,
      modalType: 'cancel',
    });
  };

  openDeleteModal = () => {
    const intent = GeneralJournalIntents.OPEN_MODAL;

    this.store.publish({
      intent,
      modalType: 'delete',
    });
  };

  closeModal = () => {
    const intent = GeneralJournalIntents.CLOSE_MODAL;

    this.store.publish({ intent });
  };

  redirectToGeneralJournalList = () => {
    window.location.href = `/#/${this.businessId}/generalJournal`;
  };

  unsubscribeFromStore = () => {
    this.store.unsubscribeAll();
  };

  updateGeneralJournalLine = (lineIndex, lineKey, lineValue) => {
    const intent = GeneralJournalIntents.UPDATE_GENERAL_JOURNAL_DETAIL_LINE;

    this.store.publish({
      intent,
      lineIndex,
      lineKey,
      lineValue,
    });

    const taxKeys = ['accountId', 'taxCodeId'];
    if (taxKeys.includes(lineKey)) {
      this.getCalculatedTax();
    }
  }

  addGeneralJournalLine = (partialLine) => {
    const intent = GeneralJournalIntents.ADD_GENERAL_JOURNAL_DETAIL_LINE;

    this.store.publish({
      intent,
      line: partialLine,
    });
  }

  deleteJournalLine = (index) => {
    const intent = GeneralJournalIntents.DELETE_GENERAL_JOURNAL_DETAIL_LINE;

    this.store.publish({
      intent,
      index,
    });

    this.getCalculatedTax();
  }

  dismissAlert = () => {
    this.store.publish({
      intent: GeneralJournalIntents.SET_ALERT_MESSAGE,
      alertMessage: '',
    });
  };

  formatJournalLine = (index) => {
    const intent = GeneralJournalIntents.FORMAT_GENERAL_JOURNAL_DETAIL_LINE;

    this.store.publish({
      intent,
      index,
    });
  }

  getCalculatedTax = () => {
    const intent = GeneralJournalIntents.GET_CALCULATED_TAX;
    const content = getTaxCalculatorPayload(this.store.state);
    const urlParams = { businessId: this.businessId };

    const onSuccess = generalJournal => this.store.publish({
      intent,
      generalJournal,
    });
    const onFailure = error => this.displayAlert(error.message);

    this.integration.write({
      intent,
      urlParams,
      content,
      onSuccess,
      onFailure,
    });
  }

  formatAndCalculateTax = (index) => {
    this.formatJournalLine(index);
    this.getCalculatedTax(this.store.state);
  }

  render = (state) => {
    let modal;
    if (state.modalType === 'cancel') {
      modal = (
        <CancelModal
          onCancel={this.closeModal}
          onConfirm={this.redirectToGeneralJournalList}
        />
      );
    } else if (state.modalType === 'delete') {
      modal = (
        <DeleteModal
          onCancel={this.closeModal}
          onConfirm={this.deleteGeneralJournalEntry(getJournalId(state))}
        />
      );
    }

    const alertComponent = state.alertMessage && (
      <Alert type="danger" onDismiss={this.dismissAlert}>
        {state.alertMessage}
      </Alert>
    );

    const generalJournalDetailView = (
      <GeneralJournalDetailView
        headerOptions={getHeaderOptions(state)}
        onUpdateHeaderOptions={this.updateHeaderOptions}
        onSaveButtonClick={this.isCreating
          ? this.createGeneralJournalEntry
          : this.saveGeneralJournalEntry}
        onCancelButtonClick={this.openCancelModal}
        onDeleteButtonClick={this.openDeleteModal}
        modal={modal}
        alertComponent={alertComponent}
        isCreating={this.isCreating}
        lines={getLineData(state)}
        newLineData={getNewLineData(state)}
        onUpdateRow={this.updateGeneralJournalLine}
        onAddRow={this.addGeneralJournalLine}
        onRemoveRow={this.deleteJournalLine}
        onRowInputBlur={this.formatAndCalculateTax}
        indexOfLastLine={getIndexOfLastLine(state)}
        amountTotals={getTotals(state)}
        isActionsDisabled={getIsActionsDisabled(state)}
      />
    );
    const view = state.isLoading ? (<Spinner />) : generalJournalDetailView;
    this.setRootView(view);
  };

  setLoadingState = (isLoading) => {
    this.store.publish({
      intent: GeneralJournalIntents.SET_LOADING_STATE,
      isLoading,
    });
  }

  run(context) {
    this.businessId = context.businessId;
    this.journalId = context.journalId;
    this.isCreating = context.journalId === 'new';
    this.store.subscribe(this.render);
    this.setLoadingState(true);
    this.loadGeneralJournalDetail();
  }

  resetState() {
    const intent = SystemIntents.RESET_STATE;
    this.store.publish({
      intent,
    });
  }
}
