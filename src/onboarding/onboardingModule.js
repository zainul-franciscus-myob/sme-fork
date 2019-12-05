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
    routeParams,
  }) {
    this.store = new Store(OnboardingReducer);
    this.dispatcher = new CreateOnboardingDispatcher(this.store);

    this.loadFormData = OnboardingClient.loadFormData(this.dispatcher, integration, routeParams);
    this.saveSettingsList = saveSettingsList;
  }

  render = () => {
    const { saveSettingsList, store } = this;

    return (
      <Provider store={store}>
        <OnboardingView saveSettingsList={saveSettingsList} />
      </Provider>
    );
  }

  run = () => {
    this.dispatcher.setInitialState();
    this.loadFormData();
  }

  unsubscribeFromStore = () => {
    this.store.unsubscribeAll();
  }

  resetState = () => this.dispatcher.resetState();
}

export default OnboardingModule;
