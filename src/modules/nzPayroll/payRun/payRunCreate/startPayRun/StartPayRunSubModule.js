import React from 'react';

import LoadingState from '../../../../../components/PageView/LoadingState';
import StartPayRunView from './components/StartPayRunView';
import createStartPayRunDispatchers from './createStartPayRunDispatchers';
import createStartPayRunIntegrator from './createStartPayRunIntegrator';

export default class StartPayRunSubModule {
  constructor({ integration, store }) {
    this.integration = integration;
    this.store = store;
    this.dispatcher = createStartPayRunDispatchers(store);
    this.integrator = createStartPayRunIntegrator(store, integration);
  }

  createDraftPayRunAndMoveToNextStep = () => {
    this.dispatcher.setLoadingState(LoadingState.LOADING);

    const onSuccess = (createdDraftPayRun) => {
      this.dispatcher.createdDraftPayRunSuccess();
      const createdDraftPayRunTemp = {
        ...createdDraftPayRun,
        employeePays: createdDraftPayRun.employeePays.map((pay) => ({
          ...pay,
          daysPaid: '',
        })),
      };
      this.dispatcher.loadDraftPayRun(createdDraftPayRunTemp);
      this.dispatcher.nextStep();
    };

    const onFailure = (message) => {
      this.dispatcher.createdDraftPayRunFailed(message);
    };

    this.integrator.createDraftPayRun({ onSuccess, onFailure });
  };

  changePayPeriod = ({ key, value }) => {
    this.dispatcher.setPayPeriodDetails({ key, value });
  };

  render() {
    return (
      <StartPayRunView
        onPayPeriodChange={this.changePayPeriod}
        onNextButtonClick={this.createDraftPayRunAndMoveToNextStep}
      />
    );
  }
}
