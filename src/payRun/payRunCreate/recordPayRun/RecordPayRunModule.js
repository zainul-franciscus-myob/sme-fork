import React from 'react';

import { SUCCESSFULLY_SAVED_DRAFT_PAY_RUN } from '../../payRunMessageTypes';
import { getPayRunListUrl } from '../PayRunSelectors';
import AlertType from '../types/AlertType';
import RecordPayRunView from './components/RecordPayRunView';
import createRecordPayRunDispatchers from './createRecordPayRunDispatchers';
import createRecordPayRunIntegrator from './createRecordPayRunIntegrator';

export default class RecordPayRunModule {
  constructor({
    integration,
    store,
    pushMessage,
  }) {
    this.integration = integration;
    this.pushMessage = pushMessage;
    this.store = store;
    this.dispatcher = createRecordPayRunDispatchers(store);
    this.integrator = createRecordPayRunIntegrator(store, integration);
  }

  recordPayments = () => {
    this.dispatcher.setLoadingState(true);

    const onSuccess = (response) => {
      this.dispatcher.setLoadingState(false);
      this.dispatcher.dismissAlert();
      this.dispatcher.setEmployeePayments(response);
      this.dispatcher.nextStep();
    };

    const onFailure = ({ message }) => {
      this.dispatcher.setLoadingState(false);
      this.dispatcher.setAlert({ type: AlertType.ERROR, message });
    };

    this.integrator.recordPayments({ onSuccess, onFailure });
  };

  recordStpDeclaration = () => {
    this.dispatcher.setStpDeclarationModalLoadingState(true);

    const onSuccess = () => {
      this.dispatcher.setStpDeclarationModalLoadingState(false);
      this.dispatcher.closeStpModal();
      this.recordPayments();
    };

    const onFailure = ({ message }) => {
      this.dispatcher.setStpDeclarationModalLoadingState(false);
      this.dispatcher.setStpDeclarationAlert(message);
    };

    this.integrator.recordStpDeclaration({ onSuccess, onFailure });
  };

  saveDraftAndRedirect = () => {
    const state = this.store.getState();
    const onSuccess = ({ message }) => {
      this.pushMessage({
        type: SUCCESSFULLY_SAVED_DRAFT_PAY_RUN,
        content: message,
      });
      window.location.href = getPayRunListUrl(state);
    };

    const onFailure = () => {
      this.dispatcher.setAlert({
        type: AlertType.ERROR,
        message: 'Failed to save the draft',
      });
    };

    this.integrator.saveDraft({ onSuccess, onFailure });
  }

  goToPreviousStep = () => {
    this.dispatcher.previousStep();
    this.dispatcher.setTotalNetPay(null);
  }

  getView() {
    return (
      <RecordPayRunView
        recordPayments={this.recordPayments}
        openStpModal={this.dispatcher.openStpModal}
        onPreviousButtonClick={this.goToPreviousStep}
        onSaveAndCloseButtonClick={this.saveDraftAndRedirect}
        stpDeclarationListeners={{
          onChangeStpDeclaration: this.dispatcher.changeStpDeclarationName,
          onCancelStpDeclaration: this.dispatcher.closeStpModal,
          onSaveStpDeclaration: this.recordStpDeclaration,
          onDismissStpDeclarationAlert: this.dispatcher.dismissStpDeclarationAlert,
        }}
      />
    );
  }
}
