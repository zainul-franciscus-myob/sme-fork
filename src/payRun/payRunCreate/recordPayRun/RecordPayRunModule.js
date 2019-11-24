import React from 'react';

import AlertType from '../types/AlertType';
import RecordPayRunView from './components/RecordPayRunView';
import createPayRunDispatchers from '../createPayRunDispatchers';
import createRecordPayRunIntegrator from './createRecordPayRunIntegrator';

export default class RecordPayRunModule {
  constructor({
    integration,
    store,
    pushMessage,
  }) {
    this.integration = integration;
    this.pushMessage = pushMessage;
    this.dispatcher = createPayRunDispatchers(store);
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
  }

  openPreviousStepModal = () => this.dispatcher.openModal({
    type: 'previousStep',
  });

  getView() {
    return (
      <RecordPayRunView
        onRecordButtonClick={this.recordPayments}
        onPreviousButtonClick={this.openPreviousStepModal}
      />
    );
  }
}
