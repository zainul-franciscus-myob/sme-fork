import { Provider } from 'react-redux';
import React from 'react';

import {
  DONE,
  DRAFT_PAY_RUN,
  PREPARE_PAYSLIPS,
  RECORD_AND_REPORT,
  START_PAY_RUN,
} from './payRunSteps';
import { getStepKey } from './PayRunSelectors';
import DraftPayRunSubModule from './draftPayRun/DraftPayRunSubModule';
import LoadingState from '../../../../components/PageView/LoadingState';
import PayRunDoneSubModule from './payRunDone/PayRunDoneSubModule';
import PayRunView from './components/PayRunView';
import PreparePaySlipsSubModule from './preparePayslips/PreparePaySlipsSubModule';
import RecordPayRunSubModule from './recordPayRun/RecordPayRunSubModule';
import StartPayRunSubModule from './startPayRun/StartPayRunSubModule';
import Store from '../../../../store/Store';
import createPayRunDispatchers from './createPayRunDispatchers';
import createPayRunIntegrator from './createPayRunIntegrator';
import payRunReducer from './payRunReducer';

export default class PayRunModule {
  constructor({ integration, setRootView, pushMessage, subscribeOrUpgrade }) {
    this.integration = integration;
    this.setRootView = setRootView;
    this.store = new Store(payRunReducer);
    this.dispatcher = createPayRunDispatchers(this.store);
    this.integrator = createPayRunIntegrator(this.store, integration);
    this.subModules = {
      [START_PAY_RUN.key]: new StartPayRunSubModule({
        integration,
        store: this.store,
      }),
      [DRAFT_PAY_RUN.key]: new DraftPayRunSubModule({
        integration,
        store: this.store,
        pushMessage,
        subscribeOrUpgrade,
      }),
      [RECORD_AND_REPORT.key]: new RecordPayRunSubModule({
        integration,
        store: this.store,
      }),
      [PREPARE_PAYSLIPS.key]: new PreparePaySlipsSubModule({
        integration,
        store: this.store,
      }),
      [DONE.key]: new PayRunDoneSubModule({
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

  render() {
    const stepViews = {};
    Object.keys(this.subModules).map((subModuleKey) => {
      stepViews[subModuleKey] = this.subModules[subModuleKey].render();
      return null;
    });

    const payRunView = <PayRunView stepViews={stepViews} />;

    const wrappedView = <Provider store={this.store}>{payRunView}</Provider>;
    this.setRootView(wrappedView);
  }

  unsubscribeFromStore = () => {
    this.store.unsubscribeAll();
  };

  run(context) {
    this.dispatcher.setInitialState({
      ...context,
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
    const currentStepKey = getStepKey(state);
    return this.subModules[currentStepKey];
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
