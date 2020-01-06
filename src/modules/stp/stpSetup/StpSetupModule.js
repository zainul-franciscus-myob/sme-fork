import { Provider } from 'react-redux';
import React from 'react';

import { RESET_STATE, SET_INITIAL_STATE } from '../../../SystemIntents';
import { SET_CURRENT_STEP_INDEX, SET_SELECTED_AGENT_ROLE } from './stpSetupIntents';
import { getAgentRoleSelected, getSelectedAgentRole } from './stpSetupSelectors';
import Steps from './Steps';
import Store from '../../../store/Store';
import StpAddClientsModule from './stepModules/AddClients/StpAddClientsModule';
import StpDeclarationInformationModule from './stepModules/DeclarationInformation/StpDeclarationInformationModule';
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

    this.steps = [];
  }

  setupSteps = (context) => {
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
          context,
          integration: this.integration,
          onPrevious: this.yourRolePrevious,
          onFinish: this.yourRoleFinish,
        }),
      },
      {
        id: Steps.DECLARATION_INFORMATION,
        title: 'Declaration information',
        module: new StpDeclarationInformationModule({
          integration: this.integration,
          onPrevious: this.declarationInformationPrevious,
          onFinish: this.declarationInformationFinish,
        }),
      },
      {
        id: Steps.ADD_CLIENTS,
        title: 'Add clients (Agents only)',
        getType: this.getAddClientsStepType,
        module: new StpAddClientsModule({
          onPrevious: this.onAddClientsPrevious,
          onFinish: () => {},
        }),
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

  getAddClientsStepType = (stepIndex, currentStepIndex) => {
    if (stepIndex < currentStepIndex) {
      return 'completed';
    }
    const state = this.store.getState();
    if (getAgentRoleSelected(state)) {
      return 'incomplete';
    }
    return 'disabled';
  }

  overviewFinish = () => {
    this.setStep(Steps.YOUR_ROLE);
  }

  yourRolePrevious = () => {
    this.setStep(Steps.OVERVIEW);
  }

  yourRoleFinish = ({ selectedAgentRole }) => {
    this.store.dispatch({
      intent: SET_SELECTED_AGENT_ROLE,
      selectedAgentRole,
    });
    this.enterDeclarationStep();
  }

  enterDeclarationStep = () => {
    const declarationStep = this.getStep(Steps.DECLARATION_INFORMATION);
    declarationStep.module.loadBusinessInformation();
    this.setStep(Steps.DECLARATION_INFORMATION);
  }

  declarationInformationPrevious = () => {
    this.setStep(Steps.YOUR_ROLE);
  }

  declarationInformationFinish = () => {
    const state = this.store.getState();
    if (getAgentRoleSelected(state)) {
      this.enterAddClients();
    } else {
      this.setStep(Steps.NOTIFY_ATO);
    }
  }

  enterAddClients = () => {
    const state = this.store.getState();
    const addClientsStep = this.getStep(Steps.ADD_CLIENTS);
    addClientsStep.module.setAgentRole(getSelectedAgentRole(state));
    this.setStep(Steps.ADD_CLIENTS);
  }

  onAddClientsPrevious = () => {
    this.setStep(Steps.DECLARATION_INFORMATION);
  }

  getStep = (stepId) => {
    const stepIndex = this.steps.findIndex(step => step.id === stepId);
    return this.steps[stepIndex];
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
    this.setupSteps(context);
    this.render();
  }
}
