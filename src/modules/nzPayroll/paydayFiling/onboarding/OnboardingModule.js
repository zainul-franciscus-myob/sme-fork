import { Provider } from 'react-redux';
import React from 'react';

import { isAuthorisationComplete } from './OnboardingSelectors';
import AuthorisationStepModule from './stepModules/AuthorisationStep/AuthorisationStepModule';
import DoneStepModule from './stepModules/DoneStep/DoneStepModule';
import OnboardingView from './components/OnboardingView';
import OverviewStepModule from './stepModules/OverviewStep/OverviewStepModule';
import Steps from './OnboardingSteps';
import Store from '../../../../store/Store';
import onboardingDispatchers from './OnboardingDispatchers';
import onboardingReducer from './OnboardingReducer';

export default class OnboardingModule {
  constructor({ integration, setRootView, navigateTo }) {
    this.integration = integration;
    this.setRootView = setRootView;
    this.navigateTo = navigateTo;
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
        integration: this.integration,
        navigateTo: this.navigateTo,
      }),
      [Steps.DONE]: new DoneStepModule({
        store: this.store,
      }),
    };
  };

  setupSteps = () => {
    const state = this.store.getState();

    if (isAuthorisationComplete(state)) {
      this.dispatcher.setStep(Steps.DONE);
    }
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
    this.setupSteps();
    this.render();
  }

  resetState = () => {
    this.dispatcher.resetState();
  };

  unsubscribeFromStore = () => {
    this.store.unsubscribeAll();
  };
}
