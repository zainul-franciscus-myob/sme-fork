import React from 'react';

import AlertType from '../types/AlertType';
import LoadingState from '../../../../../components/PageView/LoadingState';
import RecordPayRunView from './components/RecordPayRunView';
import createRecordPayRunDispatchers from './createRecordPayRunDispatchers';
import createRecordPayRunIntegrator from './createRecordPayRunIntegrator';
import openBlob from '../../../../../common/blobOpener/openBlob';

export default class RecordPayRunSubModule {
  constructor({ integration, store }) {
    this.integration = integration;
    this.store = store;
    this.dispatcher = createRecordPayRunDispatchers(store);
    this.integrator = createRecordPayRunIntegrator(store, integration);
  }

  recordPayments = () => {
    this.dispatcher.setLoadingState(LoadingState.LOADING);

    const onSuccess = () => {
      this.dispatcher.setLoadingState(LoadingState.LOADING_SUCCESS);
      this.dispatcher.dismissAlert();
      this.dispatcher.nextStep();
    };

    const onFailure = ({ message }) => {
      this.dispatcher.setLoadingState(LoadingState.LOADING_SUCCESS);
      this.dispatcher.setAlert({ type: AlertType.ERROR, message });
    };

    this.integrator.recordPayments({ onSuccess, onFailure });
  };

  payrollVerificationReport = () => {
    this.dispatcher.loadPayrollVerificationReport();

    const onSuccess = (blob) => {
      this.dispatcher.loadPayrollVerificationReportSuccess();
      openBlob({ blob });
    };

    const onFailure = () => {
      this.dispatcher.loadPayrollVerificationReportFailed();
    };

    this.integrator.loadPayrollVerificationReport({ onSuccess, onFailure });
  };

  onNext = () => {
    this.recordPayments();
  };

  goToPreviousStep = () => {
    this.dispatcher.setTotalTakeHomePay(null);
    this.dispatcher.previousStep();
  };

  tryToNavigate() {
    this.dispatcher.openDiscardAndRedirectModal();
  }

  render() {
    return (
      <>
        <RecordPayRunView
          recordPayments={this.onNext}
          onViewPayrollVerifyReportClick={this.payrollVerificationReport}
          onPreviousButtonClick={this.goToPreviousStep}
        />
      </>
    );
  }
}
