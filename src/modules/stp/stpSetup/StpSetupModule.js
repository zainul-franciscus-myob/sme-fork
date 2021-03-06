import { Provider } from 'react-redux';
import React from 'react';

import { RESET_STATE, SET_INITIAL_STATE } from '../../../SystemIntents';
import {
  SET_CURRENT_STEP_INDEX,
  SET_PAYER_ABN,
  SET_SELECTED_AGENT_ROLE_DETAILS,
} from './stpSetupIntents';
import {
  getAgentAbn,
  getAgentNumber,
  getAgentRoleSelected,
  getSelectedAgentRole,
  getSoftwareIdParams,
  getStpReportingCentreUrl,
} from './stpSetupSelectors';
import Steps from './Steps';
import Store from '../../../store/Store';
import StpAddClientsModule from './stepModules/AddClients/StpAddClientsModule';
import StpDeclarationInformationModule from './stepModules/DeclarationInformation/StpDeclarationInformationModule';
import StpDoneModule from './stepModules/StpDone/StpDoneModule';
import StpNotifyAtoModule from './stepModules/NotifyAto/StpNotifyAtoModule';
import StpOverviewModule from './stepModules/StpOverview/StpOverviewModule';
import StpSetupView from './components/StpSetupView';
import StpYourRoleModule from './stepModules/StpYourRole/StpYourRoleModule';
import stpSetupReducer from './stpSetupReducer';

export default class StpSetupModule {
  constructor({ integration, setRootView }) {
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
          context,
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
          onFinish: this.onAddClientsFinish,
        }),
      },
      {
        id: Steps.NOTIFY_ATO,
        title: 'Notify ATO',
        module: new StpNotifyAtoModule({
          onPrevious: this.onNotifyAtoPrevious,
          onFinish: this.onNotifyAtoFinish,
          integration: this.integration,
          context,
        }),
      },
      {
        id: Steps.DONE,
        title: 'Done!',
        module: new StpDoneModule({
          onFinish: this.redirectToPayRollReporting,
        }),
      },
    ];
  };

  getAddClientsStepType = (stepIndex, currentStepIndex) => {
    const state = this.store.getState();
    if (getAgentRoleSelected(state) !== true) {
      return 'disabled';
    }

    if (stepIndex > currentStepIndex) {
      return 'incomplete';
    }

    return 'complete';
  };

  overviewFinish = () => {
    this.setStep(Steps.YOUR_ROLE);
  };

  redirectToPayRollReporting = () => {
    const state = this.store.getState();
    window.location.href = getStpReportingCentreUrl(state);
  };

  yourRolePrevious = () => {
    this.setStep(Steps.OVERVIEW);
  };

  yourRoleFinish = ({ roleDetails }) => {
    this.store.dispatch({
      intent: SET_SELECTED_AGENT_ROLE_DETAILS,
      roleDetails,
    });
    this.enterDeclarationStep();
  };

  enterDeclarationStep = () => {
    const declarationStep = this.getStep(Steps.DECLARATION_INFORMATION);
    declarationStep.module.loadBusinessInformation();
    this.setStep(Steps.DECLARATION_INFORMATION);
  };

  declarationInformationPrevious = () => {
    this.setStep(Steps.YOUR_ROLE);
  };

  declarationInformationFinish = ({ payerAbn }) => {
    this.store.dispatch({
      intent: SET_PAYER_ABN,
      payerAbn,
    });
    const state = this.store.getState();

    if (getAgentRoleSelected(state)) {
      this.enterAddClients();
    } else {
      this.enterNotifyAto();
    }
  };

  enterAddClients = () => {
    const state = this.store.getState();
    const addClientsStep = this.getStep(Steps.ADD_CLIENTS);
    addClientsStep.module.setAgentRole(getSelectedAgentRole(state));
    this.setStep(Steps.ADD_CLIENTS);
  };

  onAddClientsPrevious = () => {
    this.setStep(Steps.DECLARATION_INFORMATION);
  };

  onAddClientsFinish = () => {
    this.enterNotifyAto();
  };

  enterNotifyAto = () => {
    const state = this.store.getState();
    const notifyAtoStep = this.getStep(Steps.NOTIFY_ATO);
    notifyAtoStep.module.getSoftwareId(getSoftwareIdParams(state));
    this.setStep(Steps.NOTIFY_ATO);
  };

  onNotifyAtoPrevious = () => {
    const state = this.store.getState();
    if (getAgentRoleSelected(state)) {
      this.setStep(Steps.ADD_CLIENTS);
    } else {
      this.setStep(Steps.DECLARATION_INFORMATION);
    }
  };

  onNotifyAtoFinish = () => {
    const state = this.store.getState();
    const notifyAtoStep = this.getStep(Steps.NOTIFY_ATO);
    notifyAtoStep.module.confirmAtoNotification({
      agentAbn: getAgentAbn(state),
      agentNumber: getAgentNumber(state),
      onConfirmSuccess: () => {
        this.setStep(Steps.DONE);
      },
    });
  };

  getStep = (stepId) => {
    const stepIndex = this.steps.findIndex((step) => step.id === stepId);
    return this.steps[stepIndex];
  };

  setStep = (stepId) => {
    const stepIndex = this.steps.findIndex((step) => step.id === stepId);

    this.store.dispatch({
      intent: SET_CURRENT_STEP_INDEX,
      currentStepIndex: stepIndex,
    });
  };

  render = () => {
    const wrappedView = (
      <Provider store={this.store}>
        <StpSetupView steps={this.steps} />
      </Provider>
    );

    this.setRootView(wrappedView);
  };

  resetState = () => {
    this.store.dispatch({
      intent: RESET_STATE,
    });
  };

  setInitialState = (context) => {
    const intent = SET_INITIAL_STATE;

    this.store.dispatch({
      intent,
      context,
    });
  };

  unsubscribeFromStore = () => {
    this.store.unsubscribeAll();
  };

  run(context) {
    this.setInitialState(context);
    this.setupSteps(context);
    this.render();
  }
}
