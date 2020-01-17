import React from 'react';

import { SUCCESSFULLY_SAVED_DRAFT_PAY_RUN } from '../../payRunMessageTypes';
import { getIsRegisteredForStp, getStpDeclarationContext } from './RecordPayRunSelectors';
import { getPayRunListUrl } from '../PayRunSelectors';
import AlertType from '../types/AlertType';
import LoadingState from '../../../components/PageView/LoadingState';
import RecordPayRunView from './components/RecordPayRunView';
import StpDeclarationModalModule from '../../../modules/stp/stpDeclarationModal/StpDeclarationModalModule';
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
    this.stpDeclarationModule = new StpDeclarationModalModule({
      integration,
      onDeclared: this.recordPayments,
    });
  }

  recordPayments = () => {
    this.dispatcher.setLoadingState(LoadingState.LOADING);

    const onSuccess = (response) => {
      this.dispatcher.setLoadingState(LoadingState.LOADING_SUCCESS);
      this.dispatcher.dismissAlert();
      this.dispatcher.setEmployeePayments(response);
      this.dispatcher.nextStep();
    };

    const onFailure = ({ message }) => {
      this.dispatcher.setLoadingState(LoadingState.LOADING_SUCCESS);
      this.dispatcher.setAlert({ type: AlertType.ERROR, message });
    };

    this.integrator.recordPayments({ onSuccess, onFailure });
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
  };

  goToPreviousStep = () => {
    this.dispatcher.previousStep();
    this.dispatcher.setTotalNetPay(null);
  };

  onNext = () => {
    const state = this.store.getState();
    if (getIsRegisteredForStp(state)) {
      this.stpDeclarationModule.run(getStpDeclarationContext(state));
    } else {
      this.recordPayments();
    }
  };

  getView() {
    const declarationModal = this.stpDeclarationModule.getView();
    return (
      <>
        {declarationModal}
        <RecordPayRunView
          recordPayments={this.onNext}
          openStpModal={this.dispatcher.openStpModal}
          onPreviousButtonClick={this.goToPreviousStep}
          onSaveAndCloseButtonClick={this.saveDraftAndRedirect}
        />
      </>
    );
  }
}
