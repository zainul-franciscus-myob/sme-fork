import { Provider } from 'react-redux';
import React from 'react';

import { getDashboardUrl } from './OnboardingSelectors';
import OnboardingView from './components/OnboardingView';
import Store from '../../store/Store';
import createOnboardingDispatcher from './createOnboardingDispatcher';
import createOnboardingIntegrator from './createOnboardingIntegrator';
import isFeatureEnabled from '../../common/feature/isFeatureEnabled';
import loadingState from '../../components/PageView/LoadingState';
import onboardingReducer from './onboardingReducer';

class OnboardingModule {
  constructor({
    integration,
    featureToggles,
    setRootView,
    globalCallbacks,
    loadGlobalBusinessDetails,
    navigateTo,
  }) {
    this.setRootView = setRootView;
    this.globalCallbacks = globalCallbacks;
    this.loadGlobalBusinessDetails = loadGlobalBusinessDetails;
    this.navigateTo = navigateTo;
    this.store = new Store(onboardingReducer);
    this.integrator = createOnboardingIntegrator(this.store, integration);
    this.dispatcher = createOnboardingDispatcher(this.store);
    this.isMoveToMyobEnabled = isFeatureEnabled({
      isFeatureCompleted: featureToggles?.isMoveToMyobEnabled,
    });
  }

  save = async (event) => {
    event.preventDefault();

    const onSuccess = () => {
      this.dispatcher.setAlert(undefined);
      this.globalCallbacks.refreshTaskEvent();
      this.loadGlobalBusinessDetails();
      this.globalCallbacks.toggleTasks();

      this.dispatcher.setLoadingState(loadingState.LOADING_SUCCESS);
      this.redirectToDashboard();
    };
    const onFailure = (response) => {
      this.dispatcher.setAlert({
        type: 'danger',
        message: response.message,
      });
      this.dispatcher.setLoadingState(loadingState.LOADING_SUCCESS); // For soft failure
    };

    this.dispatcher.setLoadingState(loadingState.LOADING);
    await this.integrator.saveOnboarding({
      onSuccess,
      onFailure,
    });
  };

  loadOnboarding = () => {
    this.dispatcher.setLoadingState(loadingState.LOADING);

    const onSuccess = (response) => {
      this.dispatcher.setOnboardingDetails(response);
      this.dispatcher.setLoadingState(loadingState.LOADING_SUCCESS);
    };

    const onFailure = () => {
      this.redirectToDashboard();
    };

    this.integrator.loadOnboarding({ onSuccess, onFailure });
  };

  redirectToDashboard = () => {
    const state = this.store.getState();
    const dashboardUrl = getDashboardUrl(state);
    this.navigateTo(dashboardUrl);
  };

  onChangeBusinessName = (businessName) => {
    this.dispatcher.setBusinessName(businessName.value);
  };

  onChangeIndustry = (industryId) => {
    this.dispatcher.setIndustry(industryId.value);
  };

  onChangeBusinessRole = (businessRole) => {
    this.dispatcher.setBusinessRole(businessRole.value);
  };

  onSelectUsingCompetitorProduct = (usingCompetitorProduct) => {
    this.dispatcher.setUsingCompetitorProduct(usingCompetitorProduct.value);
  };

  render = () => {
    const view = (
      <Provider store={this.store}>
        <OnboardingView
          onChangeBusinessName={this.onChangeBusinessName}
          onChangeBusinessRole={this.onChangeBusinessRole}
          onChangeIndustry={this.onChangeIndustry}
          onDismissAlert={this.dispatcher.dismissAlert}
          onSave={this.save}
          onSelectUsingCompetitorProduct={this.onSelectUsingCompetitorProduct}
        />
      </Provider>
    );
    this.setRootView(view);
  };

  setInitialState = (context) => {
    this.dispatcher.setInitialState({
      ...context,
    });
  };

  resetState = () => null;

  run = (context) => {
    this.setInitialState({
      ...context,
      isMoveToMyobEnabled: this.isMoveToMyobEnabled,
    });

    this.loadOnboarding();
    this.render();
  };

  unsubscribeFromStore = () => null;
}

export default OnboardingModule;
