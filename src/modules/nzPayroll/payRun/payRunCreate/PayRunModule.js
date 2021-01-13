import { Provider } from 'react-redux';
import React from 'react';

import {
  DONE,
  DRAFT_PAY_RUN,
  PREPARE_PAYSLIPS,
  RECORD_AND_REPORT,
  START_PAY_RUN,
} from './payRunSteps';
import { getRedirectUrl, getStepKey } from './PayRunSelectors';
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
  constructor({
    integration,
    setRootView,
    pushMessage,
    subscribeOrUpgrade,
    navigateToName,
    featureToggles,
  }) {
    this.integration = integration;
    this.navigateToName = navigateToName;
    this.setRootView = setRootView;
    this.store = new Store(payRunReducer);
    this.dispatcher = createPayRunDispatchers(this.store);
    this.integrator = createPayRunIntegrator(this.store, integration);
    this.featureToggles = featureToggles;
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
        featureToggles,
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
        navigateToName: this.navigateToName,
        featureToggles: this.featureToggles,
        store: this.store,
      }),
    };
  }

  discard = (callback) => {
    const endLoading = () => {
      this.dispatcher.setLoadingState(LoadingState.LOADING_SUCCESS);
    };

    this.integrator.deleteDraftPayRun({
      onSuccess: () => {
        endLoading();
        callback();
      },
      onFailure: endLoading,
    });
  };

  restartPayRun = () => {
    this.dispatcher.restartPayRun();
    this.startNewPayRun();
  };

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

  discardDraftAndStartNewPayRun = () => {
    this.dispatcher.setLoadingState(LoadingState.LOADING);

    this.discard(this.restartPayRun);
  };

  redirect = () => {
    const state = this.store.getState();
    const redirectUrl = getRedirectUrl(state);
    this.navigateTo(redirectUrl);
  };

  discardAndRedirect = () => {
    this.dispatcher.closeDiscardModal();
    this.dispatcher.setLoadingState(LoadingState.LOADING);
    this.discard(this.redirect);
  };

  closePreviousStepModal = () => {
    this.dispatcher.closePreviousStepModal();
  };

  closeDiscardModal = () => {
    this.dispatcher.closeDiscardModal();
  };

  render() {
    const stepViews = {};
    Object.keys(this.subModules).map((subModuleKey) => {
      stepViews[subModuleKey] = this.subModules[subModuleKey].render();
      return null;
    });

    const payRunView = (
      <PayRunView
        stepViews={stepViews}
        onDismissAlert={this.dispatcher.dismissAlert}
        onClosePreviousStepModal={this.closePreviousStepModal}
        onDiscardDraft={this.discardDraftAndStartNewPayRun}
        onCloseDiscardAndRedirect={this.closeDiscardModal}
        onDiscardAndRedirect={this.discardAndRedirect}
      />
    );

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
    this.dispatcher.setRedirectUrl(url);
    this.attemptToRoute(() => {
      this.navigateTo(url);
    });
  };
}
