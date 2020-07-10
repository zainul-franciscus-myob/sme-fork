import { Provider } from 'react-redux';
import React from 'react';

import { getStep } from './PayRunSelectors';
import AlertType from './types/AlertType';
import EmployeePayListModule from './employeePayList/EmployeePayListModule';
import FeatureToggle from '../../../FeatureToggles';
import LoadingState from '../../../components/PageView/LoadingState';
import PayRunDoneModule from './payRunDone/PayRunDoneModule';
import PayRunView from './components/PayRunView';
import PreparePaySlipsModule from './preparePaySlips/PreparePaySlipsModule';
import RecordPayRunModule from './recordPayRun/RecordPayRunModule';
import StartPayRunModule from './startPayRun/StartPayRunModule';
import Store from '../../../store/Store';
import createPayRunDispatchers from './createPayRunDispatchers';
import createPayRunIntegrator from './createPayRunIntegrator';
import payRunReducer from './payRunReducer';

export default class PayRunModule {
  constructor({
    integration,
    setRootView,
    pushMessage,
    isToggleOn,
    subscribeOrUpgrade,
  }) {
    this.integration = integration;
    this.setRootView = setRootView;
    this.store = new Store(payRunReducer);
    this.pushMessage = pushMessage;
    this.dispatcher = createPayRunDispatchers(this.store);
    this.integrator = createPayRunIntegrator(this.store, integration);
    this.isToggleOn = isToggleOn;
    this.subModules = {
      startPayRunModule: new StartPayRunModule({
        integration,
        store: this.store,
        pushMessage,
      }),
      employeePayListModule: new EmployeePayListModule({
        integration,
        store: this.store,
        pushMessage,
        subscribeOrUpgrade,
      }),
      recordPayRunModule: new RecordPayRunModule({
        integration,
        store: this.store,
        pushMessage,
      }),
      preparePaySlipModule: new PreparePaySlipsModule({
        integration,
        store: this.store,
        pushMessage,
      }),
      payRunDoneModule: new PayRunDoneModule({
        integration,
        store: this.store,
      }),
    };
  }

  startNewPayRun = () => {
    this.dispatcher.setLoadingState(LoadingState.LOADING);

    const onSuccess = (response) => {
      this.dispatcher.setLoadingState(LoadingState.LOADING_SUCCESS);
      this.dispatcher.startNewPayRun(response);
    };

    const onFailure = () => {
      this.dispatcher.setLoadingState(LoadingState.LOADING_FAIL);
    };

    this.integrator.startNewPayRun({ onSuccess, onFailure });
  };

  loadTimesheets = () => {
    this.dispatcher.setLoadingState(LoadingState.LOADING);
    const onSuccess = (response) => {
      this.dispatcher.loadTimesheets(response);
      this.dispatcher.setLoadingState(LoadingState.LOADING_SUCCESS);
    };

    const onFailure = ({ message }) => {
      this.dispatcher.setLoadingState(LoadingState.LOADING_SUCCESS);
      this.dispatcher.loadTimesheets({ timesheets: [] });
      this.dispatcher.setAlert({
        type: AlertType.ERROR,
        message,
      });
    };

    this.integrator.loadTimesheets({ onSuccess, onFailure });
  };

  deleteDraftAndGoBack = () => {
    this.dispatcher.setLoadingState(LoadingState.LOADING);

    const afterDelete = () => {
      this.dispatcher.setLoadingState(LoadingState.LOADING_SUCCESS);
      this.dispatcher.dismissAlert();
      this.dispatcher.closePreviousStepModal();
      this.dispatcher.previousStep();
      this.startNewPayRun();
    };

    this.integrator.deleteDraft({
      onSuccess: afterDelete,
      onFailure: afterDelete,
    });
  };

  render = () => {
    const stepViews = Object.keys(this.subModules).map((module) =>
      this.subModules[module].getView()
    );

    const payRunView = (
      <PayRunView
        stepViews={stepViews}
        onDismissAlert={this.dispatcher.dismissAlert}
        onDismissModal={this.dispatcher.closePreviousStepModal}
        onPreviousStepModalGoBack={this.deleteDraftAndGoBack}
      />
    );

    const wrappedView = <Provider store={this.store}>{payRunView}</Provider>;
    this.setRootView(wrappedView);
  };

  unsubscribeFromStore = () => {
    this.store.unsubscribeAll();
  };

  run(context) {
    this.dispatcher.setInitialState({
      ...context,
      isPayrollJobColumnEnabled: this.isToggleOn(
        FeatureToggle.EssentialsJobsPayrun
      ),
    });
    this.render();
    this.startNewPayRun();
  }

  resetState = () => {
    this.dispatcher.resetState();
  };

  redirectToUrl = (url) => {
    window.location.href = url;
  };

  getCurrentSubModule = () => {
    const state = this.store.getState();
    const currentStep = getStep(state);
    const subModuleNamesArray = Object.keys(this.subModules);
    const currentSubModuleName = subModuleNamesArray[currentStep];
    const currentSubModule = this.subModules[currentSubModuleName];
    return currentSubModule;
  };

  attemptToRoute = (navigationFunction) => {
    const subModule = this.getCurrentSubModule();
    if (subModule.tryToNavigate) {
      subModule.tryToNavigate(navigationFunction);
    } else {
      navigationFunction();
    }
  };

  handlePageTransition = (url) => {
    this.attemptToRoute(() => {
      this.redirectToUrl(url);
    });
  };
}
