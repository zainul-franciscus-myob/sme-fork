import { Provider } from 'react-redux';
import React from 'react';

import { isIrdAuthorisationComplete } from './OnboardingSelectors';
import AuthorisationStepModule from './stepModules/AuthorisationStep/AuthorisationStepModule';
import DoneStepModule from './stepModules/DoneStep/DoneStepModule';
import LoadingState from '../../../../components/PageView/LoadingState';
import OnboardingView from './components/OnboardingView';
import OverviewStepModule from './stepModules/OverviewStep/OverviewStepModule';
import Steps from './OnboardingSteps';
import Store from '../../../../store/Store';
import onboardingDispatchers from './OnboardingDispatchers';
import onboardingIntegrator from './OnboardingIntegrator';
import onboardingReducer from './OnboardingReducer';

export default class OnboardingModule {
  constructor({ integration, setRootView, navigateTo, replaceURLParams }) {
    this.integration = integration;
    this.setRootView = setRootView;
    this.navigateTo = navigateTo;
    this.store = new Store(onboardingReducer);
    this.integrator = onboardingIntegrator(this.store, integration);
    this.dispatcher = onboardingDispatchers(this.store);
    this.stepModules = [];
    this.replaceURLParams = replaceURLParams;
  }

  setupSubModules = () => {
    this.stepModules = {
      [Steps.OVERVIEW]: new OverviewStepModule({
        store: this.store,
      }),
      [Steps.AUTHORISE_MYOB]: new AuthorisationStepModule({
        store: this.store,
        integration: this.integration,
        navigateTo: this.navigateTo,
      }),
      [Steps.DONE]: new DoneStepModule({
        store: this.store,
        navigateTo: this.navigateTo,
      }),
    };
  };

  moveToDoneStep = () => {
    this.dispatcher.setStep(Steps.DONE);
  };

  moveToAuthoriseStepWithError = (message) => {
    this.replaceURLParams({ authorisation: undefined });
    this.dispatcher.setAlert({ message, type: 'danger' });
    this.dispatcher.setStep(Steps.AUTHORISE_MYOB);
  };

  setBusinessIrdNumber = () => {
    const onSuccess = ({ irdNumber }) => {
      this.dispatcher.setIrdNumber(irdNumber);
    };

    const onFailure = () => {
      this.dispatcher.setLoadingState(LoadingState.LOADING_FAIL);
    };

    this.integrator.getIrdNumber({ onSuccess, onFailure });
  };

  updateOnboardUser = () => {
    const onSuccess = () => {
      this.moveToDoneStep();
    };

    const onFailure = ({ message }) => {
      this.moveToAuthoriseStepWithError(message);
    };

    this.integrator.updateOnboardUser({ onSuccess, onFailure });
  };

  setupSteps = () => {
    const state = this.store.getState();

    if (isIrdAuthorisationComplete(state)) {
      this.updateOnboardUser();
    }
  };

  render = () => {
    const wrappedView = (
      <Provider store={this.store}>
        <OnboardingView
          stepModules={this.stepModules}
          onDismissAlert={this.dispatcher.dismissAlert()}
        />
      </Provider>
    );

    this.setRootView(wrappedView);
  };

  run(context) {
    this.dispatcher.setInitialState(context);
    this.setupSubModules();
    this.setBusinessIrdNumber();
    this.setupSteps();
    this.render();
    this.dispatcher.setLoadingState(LoadingState.LOADING_SUCCESS);
  }

  resetState = () => {
    this.dispatcher.resetState();
  };

  unsubscribeFromStore = () => {
    this.store.unsubscribeAll();
  };
}
