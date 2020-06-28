import { Provider } from 'react-redux';
import React from 'react';

import { START_PAY_RUN } from './payRunSteps';
import { getStepKey } from './PayRunSelectors';
import LoadingState from '../../../../components/PageView/LoadingState';
import PayRunView from './components/PayRunView';
import StartPayRunModule from './startPayRun/StartPayRunModule';
import Store from '../../../../store/Store';
import createPayRunDispatchers from './createPayRunDispatchers';
import createPayRunIntegrator from './createPayRunIntegrator';
import payRunReducer from './payRunReducer';

export default class PayRunModule {
  constructor({
    integration,
    setRootView,
  }) {
    this.integration = integration;
    this.setRootView = setRootView;
    this.store = new Store(payRunReducer);
    this.dispatcher = createPayRunDispatchers(this.store);
    this.integrator = createPayRunIntegrator(this.store, integration);
    this.subModules = {
      [START_PAY_RUN.key]: new StartPayRunModule({
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
    Object.keys(this.subModules)
      .map(subModuleKey => {
        stepViews[subModuleKey] = this.subModules[subModuleKey].getView();
        return null;
      });

    const payRunView = (
      <PayRunView
        stepViews={stepViews}
      />
    );

    const wrappedView = (
      <Provider store={this.store}>
        {payRunView}
      </Provider>
    );
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
  }

  getCurrentSubModule = () => {
    const state = this.store.getState();
    const currentStepKey = getStepKey(state);
    return this.subModules[currentStepKey];
  }

  attemptToRoute = (navigationFunction) => {
    const subModule = this.getCurrentSubModule();
    if (subModule.tryToNavigate) {
      subModule.tryToNavigate(navigationFunction);
    } else {
      navigationFunction();
    }
  }

  handlePageTransition = (url) => {
    this.attemptToRoute(() => {
      this.redirectToUrl(url);
    });
  }
}
