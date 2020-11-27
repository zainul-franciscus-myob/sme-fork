import { Provider } from 'react-redux';
import React from 'react';

import AuthorisationStepModule from './stepModules/AuthorisationStep/AuthorisationStepModule';
import OnboardingView from './components/OnboardingView';
import OverviewStepModule from './stepModules/OverviewStep/OverviewStepModule';
import Steps from './OnboardingSteps';
import Store from '../../../../store/Store';
import onboardingDispatchers from './OnboardingDispatchers';
import onboardingReducer from './OnboardingReducer';

export default class OnboardingModule {
  constructor({ integration, setRootView }) {
    this.integration = integration;
    this.setRootView = setRootView;
    this.store = new Store(onboardingReducer);
    this.dispatcher = onboardingDispatchers(this.store);
    this.stepModules = [];
  }

  setupSubModules = () => {
    this.stepModules = {
      [Steps.OVERVIEW]: new OverviewStepModule({
        store: this.store,
        integration: this.integration,
      }),
      [Steps.AUTHORISE_MYOB]: new AuthorisationStepModule({
        store: this.store,
      }),
    };
  };

  render = () => {
    const wrappedView = (
      <Provider store={this.store}>
        <OnboardingView stepModules={this.stepModules} />
      </Provider>
    );

    this.setRootView(wrappedView);
  };

  run(context) {
    this.dispatcher.setInitialState(context);
    this.setupSubModules();
    this.render();
  }

  resetState = () => {
    this.dispatcher.resetState();
  };

  unsubscribeFromStore = () => {
    this.store.unsubscribeAll();
  };
}
