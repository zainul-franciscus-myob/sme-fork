import { Alert } from '@myob/myob-widgets';
import React from 'react';

import { CancelModal, DeleteModal } from './components/GeneralJournalDetailModals';
import {
  getAccounts,
  getHeaderOptions,
  getIndexOfLastLine,
  getLineData,
  getTotals,
} from './GeneralJournalDetailSelectors';
import GeneralJournalDetailView from './components/GeneralJournalDetailView';
import GeneralJournalIntents from './GeneralJournalIntents';
import Store from '../store/Store';
import generalJournalDetailReducer from './generalJournalDetailReducer';

export default class GeneralJournalDetailModule {
  constructor(integration, setRootView) {
    this.integration = integration;
    this.store = new Store(generalJournalDetailReducer);
    this.setRootView = setRootView;
    this.businessId = '';
  }

  loadGeneralJournalDetail = () => {
    const intent = GeneralJournalIntents.LOAD_GENERAL_JOURNAL_DETAIL;

    const urlParams = {
      businessId: this.businessId,
      referenceId: this.referenceId,
    };

    const onSuccess = ({ generalJournal, accounts }) => {
      this.store.publish({
        intent,
        generalJournal,
        accounts,
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
  };

  deleteGeneralJournalEntry = () => {
    const intent = GeneralJournalIntents.DELETE_GENERAL_JOURNAL_DETAIL;

    const urlParams = {
      businessId: this.businessId,
      referenceId: this.referenceId,
    };

    const onSuccess = () => {
      this.redirectToGeneralJournalList();
    };

    const onFailure = (error) => {
      this.closeModal();
      this.displayAlert(error.message);
    };

    this.integration.write({
      intent,
      urlParams,
      onSuccess,
      onFailure,
    });
  };

  displayAlert = (errorMessage) => {
    this.store.publish({
      intent: GeneralJournalIntents.SET_ALERT_MESSAGE,
      alertMessage: errorMessage,
    });
  }

  saveGeneralJournalEntry = () => {
    const intent = GeneralJournalIntents.SAVE_GENERAL_JOURNAL_DETAIL;

    const urlParams = {
      businessId: this.businessId,
      referenceId: this.referenceId,
    };

    const onSuccess = () => {
      this.redirectToGeneralJournalList();
    };

    const onFailure = (error) => {
      this.displayAlert(error.message);
    };

    this.integration.write({
      intent,
      urlParams,
      onSuccess,
      onFailure,
    });
  };

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
  }

  addGeneralJournalLine = (partialLine) => {
    const intent = GeneralJournalIntents.ADD_GENERAL_JOURNAL_DETAIL_LINE;

    const line = {
      accountId: '',
      debitDisplayAmount: '',
      creditDisplayAmount: '',
      description: '',
      taxCodeId: '',
      displayTaxAmount: '',
      ...partialLine,
    };

    this.store.publish({
      intent,
      line,
    });
  }

  deleteJournalLine = (index) => {
    const intent = GeneralJournalIntents.DELETE_GENERAL_JOURNAL_DETAIL_LINE;

    this.store.publish({
      intent,
      index,
    });
  }

  formatJournalLine = (index) => {
    const intent = GeneralJournalIntents.FORMAT_GENERAL_JOURNAL_DETAIL_LINE;

    this.store.publish({
      intent,
      index,
    });
  }

  dismissAlert = () => {
    this.store.publish({
      intent: GeneralJournalIntents.SET_ALERT_MESSAGE,
      alertMessage: '',
    });
  };

  render = (state) => {
    let modal = null;
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
          onConfirm={this.deleteGeneralJournalEntry}
        />
      );
    }

    const alertComponent = state.alertMessage ? (
      <Alert type="danger" onDismiss={this.dismissAlert}>
        {state.alertMessage}
      </Alert>
    ) : null;

    this.setRootView(<GeneralJournalDetailView
      headerOptions={getHeaderOptions(state)}
      onUpdateHeaderOptions={this.updateHeaderOptions}
      onSaveButtonClick={this.saveGeneralJournalEntry}
      onCancelButtonClick={this.openCancelModal}
      onDeleteButtonClick={this.openDeleteModal}
      modal={modal}
      alertComponent={alertComponent}
      isCreating={this.isCreating}
      lines={getLineData(state)}
      accounts={getAccounts(state)}
      onUpdateRow={this.updateGeneralJournalLine}
      onAddRow={this.addGeneralJournalLine}
      onRemoveRow={this.deleteJournalLine}
      onRowInputBlur={this.formatJournalLine}
      indexOfLastLine={getIndexOfLastLine(state)}
      amountTotals={getTotals(state)}
    />);
  };

  run(context) {
    this.businessId = context.businessId;
    this.referenceId = context.referenceId;
    this.isCreating = context.referenceId !== 'new';
    this.store.subscribe(this.render);
    this.loadGeneralJournalDetail();
  }
}
