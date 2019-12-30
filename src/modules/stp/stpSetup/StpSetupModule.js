import { Provider } from 'react-redux';
import React from 'react';

import { RESET_STATE, SET_INITIAL_STATE } from '../../../SystemIntents';
import { SET_CURRENT_STEP_INDEX } from './stpSetupIntents';
import Steps from './Steps';
import Store from '../../../store/Store';
import StpOverviewModule from './stepModules/StpOverview/StpOverviewModule';
import StpSetupView from './components/StpSetupView';
import StpYourRoleModule from './stepModules/StpYourRole/StpYourRoleModule';
import stpSetupReducer from './stpSetupReducer';

export default class StpSetupModule {
  constructor({
    integration, setRootView,
  }) {
    this.integration = integration;
    this.setRootView = setRootView;
    this.store = new Store(stpSetupReducer);

    this.steps = [
      {
        id: Steps.OVERVIEW,
        title: 'Overview',
        module: new StpOverviewModule({
          onFinish: this.overviewFinish,
        }),
      },
      {
        id: Steps.YOUR_ROLE,
        title: 'Your role',
        module: new StpYourRoleModule({
          onPrevious: this.yourRolePrevious,
        }),
      },
      {
        id: Steps.DECLARATION_INFORMATION,
        title: 'Declaration information',
        onPrevious: this.declarationInformationPrevious,
      },
      {
        id: Steps.ADD_CLIENTS,
        title: 'Add clients (Agents only)',
      },
      {
        id: Steps.NOTIFY_ATO,
        title: 'Notify ATO',
      },
      {
        id: Steps.ACTIVATE,
        title: 'Activate',
      },
    ];
  }

  overviewFinish = () => {
    this.setStep(Steps.YOUR_ROLE);
  }

  yourRolePrevious = () => {
    this.setStep(Steps.OVERVIEW);
  }

  yourRoleFinish = () => {
    this.setStep(Steps.DECLARATION_INFORMATION);
  }

  declarationInformationPrevious = () => {
    this.setStep(Steps.YOUR_ROLE);
  }

  setStep = (stepId) => {
    const stepIndex = this.steps.findIndex(step => step.id === stepId);
    this.store.dispatch({
      intent: SET_CURRENT_STEP_INDEX,
      currentStepIndex: stepIndex,
    });
  }

  render = () => {
    const stpSetupView = (
      <StpSetupView
        steps={this.steps}
      />
    );

    const wrappedView = (
      <Provider store={this.store}>
        {stpSetupView}
      </Provider>
    );

    this.setRootView(wrappedView);
  }

  resetState = () => {
    this.store.dispatch({
      intent: RESET_STATE,
    });
  }

  setInitialState = (context) => {
    const intent = SET_INITIAL_STATE;

    this.store.dispatch({
      intent,
      context,
    });
  }

  unsubscribeFromStore = () => {
    this.store.unsubscribeAll();
  }

  run(context) {
    this.setInitialState(context);
    this.render();
  }
}
