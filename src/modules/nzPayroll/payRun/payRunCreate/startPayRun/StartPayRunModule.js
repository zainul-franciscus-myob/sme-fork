import React from 'react';

import LoadingState from '../../../../../components/PageView/LoadingState';
import StartPayRunView from './components/StartPayRunView';
import createStartPayRunDispatchers from './createStartPayRunDispatchers';
import createStartPayRunIntegrator from './createStartPayRunIntegrator';

export default class StartPayRunModule {
  constructor({
    integration,
    store,
  }) {
    this.integration = integration;
    this.store = store;
    this.dispatcher = createStartPayRunDispatchers(store);
    this.integrator = createStartPayRunIntegrator(store, integration);
  }

  emptyButtonClickFunction = () => {
    // TODO: Deliberatly do nothing on click. Edit this when adding next step to NZ payrun.
    this.dispatcher.setLoadingState(LoadingState.LOADING_FAIL);
  };

  changePayPeriod = ({ key, value }) => {
    this.dispatcher.setPayPeriodDetails({ key, value });
  }

  getView() {
    return (
      <StartPayRunView
        onPayPeriodChange={this.changePayPeriod}
        onNextButtonClick={this.emptyButtonClickFunction}
      />
    );
  }
}
