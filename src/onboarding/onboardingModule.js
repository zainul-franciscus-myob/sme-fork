import { Provider } from 'react-redux';
import React from 'react';

import CreateOnboardingDispatcher from './createOnboardingDispatcher';
import OnboardingClient from './api/onboardingService';
import OnboardingReducer from './onboardingReducer';
import OnboardingView from './components/OnboardingView';
import Store from '../store/Store';

class OnboardingModule {
  constructor({
    integration,
    saveSettingsList,
    router,
  }) {
    this.store = new Store(OnboardingReducer);
    this.dispatcher = new CreateOnboardingDispatcher(this.store);
    this.router = router;

    this.loadFormData = OnboardingClient.loadFormData(this.dispatcher, integration, router);
    this.saveSettingsList = saveSettingsList;
  }

  getBusinessId = () => this.router.routeParams().businessId;

  render = () => {
    const { saveSettingsList, store } = this;

    return (
      <Provider store={store}>
        <OnboardingView saveSettingsList={saveSettingsList} />
      </Provider>
    );
  }

  run = () => {
    if (!this.getBusinessId()) return;

    this.dispatcher.setInitialState();
    this.loadFormData();
  }

  unsubscribeFromStore = () => {
    this.store.unsubscribeAll();
  }

  resetState = () => this.dispatcher.resetState();
}

export default OnboardingModule;
