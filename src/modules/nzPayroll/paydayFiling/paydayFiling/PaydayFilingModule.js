import { Provider } from 'react-redux';
import React from 'react';

import {
  getOnboardingPageUrl,
  getSelectedTab,
  getUrlParams,
} from './PaydayFilingSelectors';
import { tabIds } from './TabItems';
import InlandRevenueSettingsModule from './inlandRevenueSettings/InlandRevenueSettingsModule';
import LoadingState from '../../../../components/PageView/LoadingState';
import PaydayCentreView from './components/PaydayFilingView';
import PaydayFilingReducer from './PaydayFilingReducer';
import Store from '../../../../store/Store';
import SubmissionsListModule from './submissionsList/SubmissionsListModule';
import createPaydayFilingDispatcher from './createPaydayFilingDispatcher';
import createPaydayFilingIntegrator from './createPaydayFilingIntegrator';
import routeName from '../../../../router/RouteName';

export default class PaydayFilingModule {
  constructor({
    integration,
    setRootView,
    replaceURLParams,
    featureToggles,
    pushMessage,
    popMessages,
    navigateToName,
  }) {
    this.setRootView = setRootView;
    this.integration = integration;
    this.featureToggles = featureToggles;
    this.replaceURLParams = replaceURLParams;
    this.store = new Store(PaydayFilingReducer);
    this.integrator = createPaydayFilingIntegrator(
      this.store,
      this.integration
    );
    this.dispatcher = createPaydayFilingDispatcher(this.store);
    this.popMessages = popMessages;
    this.pushMessage = pushMessage;
    this.subModules = {};
    this.navigateToName = navigateToName;
  }

  setupSubModules = (context) => {
    this.subModules = {
      [tabIds.submissionsList]: new SubmissionsListModule({
        integration: this.integration,
        context,
      }),
      [tabIds.irdSettings]: new InlandRevenueSettingsModule({
        integration: this.integration,
        context,
      }),
    };
  };

  readMessages = () => {
    const [successMessage] = this.popMessages(this.messageTypes);

    if (successMessage) {
      const { content: message } = successMessage;
      this.dispatcher.setAlert({
        type: 'success',
        message,
      });
    }
  };

  setSelectedTab = (tab) => {
    this.attemptToRoute(() => {
      this.dispatcher.setTab(tab);
      this.runTab();
    });
  };

  runTab = () => {
    const state = this.store.getState();
    this.subModules[getSelectedTab(state)].run();
  };

  resetState = () => {
    this.dispatcher.resetState();
  };

  unsubscribeFromStore = () => {
    this.store.unsubscribeAll();
  };

  updateURLFromState = (state) => {
    this.replaceURLParams(getUrlParams(state));
  };

  loadBusinessOnboardedStatus = () => {
    this.dispatcher.setLoadingState(LoadingState.LOADING);

    const onSuccess = (response) => {
      this.dispatcher.setIsBusinessOnboarded(response.isBusinessOnboarded);
      if (response.isBusinessOnboarded) {
        this.dispatcher.setLoadingState(LoadingState.LOADING_SUCCESS);
        this.runTab();
      } else {
        this.redirectToOnboardingPage();
      }
    };

    const onFailure = () => {
      this.dispatcher.setLoadingState(LoadingState.LOADING_FAIL);
    };

    this.integrator.loadBusinessOnboardedStatus({ onSuccess, onFailure });
  };

  run(context) {
    if (this.featureToggles.isPaydayFilingEnabled) {
      this.setupSubModules(context);
      this.dispatcher.setInitialState(context);
      this.render();
      this.loadBusinessOnboardedStatus();
      this.dispatcher.setLoadingState(LoadingState.LOADING_SUCCESS);
    } else this.redirectToBusinessList();
  }

  render = () => {
    const wrappedView = (
      <Provider store={this.store}>
        <PaydayCentreView
          tabModules={this.subModules}
          onDismissAlert={this.dispatcher.clearAlert}
          onTabSelected={this.setSelectedTab}
          featureToggles={this.featureToggles}
        />
      </Provider>
    );

    this.setRootView(wrappedView);
  };

  redirectToUrl = (url) => {
    window.location.href = url;
  };

  attemptToRoute = (navigationFunction) => {
    const state = this.store.getState();
    const subModule = this.subModules[getSelectedTab(state)];
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

  redirectToOnboardingPage = () => {
    window.location.href = getOnboardingPageUrl(this.store.getState());
  };

  redirectToBusinessList = () => {
    this.navigateToName(routeName.BUSINESS_LIST);
  };
}
