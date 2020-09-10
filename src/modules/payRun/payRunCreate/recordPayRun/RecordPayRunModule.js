import React from 'react';

import { SUCCESSFULLY_SAVED_DRAFT_PAY_RUN } from '../../../../common/types/MessageTypes';
import {
  getIsRegisteredForStp,
  getStpDeclarationContext,
} from './RecordPayRunSelectors';
import { getPayRunListUrl } from '../PayRunSelectors';
import AlertType from '../types/AlertType';
import LoadingState from '../../../../components/PageView/LoadingState';
import RecordPayRunView from './components/RecordPayRunView';
import StpDeclarationModalModule from '../../../stp/stpDeclarationModal/StpDeclarationModalModule';
import createRecordPayRunDispatchers from './createRecordPayRunDispatchers';
import createRecordPayRunIntegrator from './createRecordPayRunIntegrator';
import openBlob from '../../../../common/blobOpener/openBlob';

export default class RecordPayRunModule {
  constructor({ integration, store, pushMessage, featureToggles }) {
    this.integration = integration;
    this.pushMessage = pushMessage;
    this.store = store;
    this.dispatcher = createRecordPayRunDispatchers(store);
    this.integrator = createRecordPayRunIntegrator(store, integration);
    this.stpDeclarationModule = new StpDeclarationModalModule({
      integration,
      onDeclared: this.recordPayments,
    });
    this.isAllowNegativesInPayRuns = featureToggles?.isAllowNegativesInPayRuns;
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
    this.showAppcuesPopup();
  };

  showAppcuesPopup = () => {
    // eslint-disable-next-line no-unused-expressions
    window.Appcues &&
      window.Appcues.show('c31e7ff9-b5a1-4d21-9b29-5c68b1314304');
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

    this.integrator.saveDraft({
      onSuccess,
      onFailure,
      isAllowNegativesInPayRuns: this.isAllowNegativesInPayRuns,
    });
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

  previewPayDetails = () => {
    this.dispatcher.setLoadingState(LoadingState.LOADING);

    const onSuccess = (blob) => {
      this.dispatcher.setLoadingState(LoadingState.LOADING_SUCCESS);
      openBlob({ blob });
    };

    const onFailure = () => {
      this.dispatcher.setLoadingState(LoadingState.LOADING_SUCCESS);
      this.dispatcher.setAlert({
        type: AlertType.ERROR,
        message: 'Failed to preview pay details',
      });
    };

    this.integrator.previewPayDetails({ onSuccess, onFailure });
  };

  onPreviewPayRunActivityClick = () => {
    this.dispatcher.setLoadingState(LoadingState.LOADING);
    const onSuccess = (blob) => {
      this.dispatcher.setLoadingState(LoadingState.LOADING_SUCCESS);
      openBlob({ blob });
    };

    const onFailure = () => {
      this.dispatcher.setLoadingState(LoadingState.LOADING_SUCCESS);
      this.dispatcher.setAlert({
        type: AlertType.ERROR,
        message: 'Failed to preview pay run activity',
      });
    };

    this.integrator.previewPayRunActivity({ onSuccess, onFailure });
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
          onPreviewPayDetailsClick={this.previewPayDetails}
          onPreviewPayRunActivityClick={this.onPreviewPayRunActivityClick}
        />
      </>
    );
  }
}
