import { Provider } from 'react-redux';
import React from 'react';

import {
  getSearchLink,
  getSearchValue,
  isHelpContentLoaded,
  isUserHelpSettingsLoaded,
} from './HelpSelectors';
import HelpView from './components/HelpView';
import Store from '../../store/Store';
import createHelpDispatcher from './createHelpDispatcher';
import createHelpIntegrator from './createHelpIntegrator';
import helpReducer from './helpReducer';

export default class HelpModule {
  constructor({
    integration, closeDrawer,
  }) {
    this.integration = integration;
    this.store = new Store(helpReducer);
    this.closeDrawer = closeDrawer;
    this.dispatcher = createHelpDispatcher(this.store);
    this.integrator = createHelpIntegrator(this.store, this.integration);
  }

  getView = () => {
    const {
      store, closeDrawer, dispatcher: { updateSearchValue }, openSearchPage,
    } = this;

    return (
      <Provider store={store}>
        <HelpView
          closeHelp={closeDrawer}
          onSearchChange={updateSearchValue}
          onSearchClick={openSearchPage}
        />
      </Provider>
    );
  }

  setActive = (isActive) => {
    this.dispatcher.setActiveState(!!isActive);
  }

  openSearchPage = () => {
    const state = this.store.getState();
    if (getSearchValue(state)) {
      const url = getSearchLink(state);
      window.open(url, '_blank');
    }
  }

  loadHelpUserSettings = (onLoadSettingsSuccess) => {
    const onSuccess = (helpUserSettings) => {
      this.dispatcher.loadHelpUserSettings(helpUserSettings);
      onLoadSettingsSuccess();
    };

    const onFailure = () => {
      this.dispatcher.loadHelpContentFailure();
    };

    this.integrator.loadHelpUserSettings({
      onSuccess,
      onFailure,
    });
  }

  loadHelpContent = () => {
    this.dispatcher.setLoadingState(true);

    if (!isUserHelpSettingsLoaded(this.store.getState())) {
      this.loadHelpUserSettings(this.getHelpContent);
      return;
    }
    if (isHelpContentLoaded(this.store.getState())) {
      this.dispatcher.setLoadingState(false);
      return;
    }

    this.getHelpContent();
  }

  getHelpContent = () => {
    const onSuccess = (helpContent) => {
      this.dispatcher.setLoadingState(false);
      this.dispatcher.loadHelpContent(helpContent);
    };
    const onFailure = () => {
      this.dispatcher.setLoadingState(false);
      this.dispatcher.loadHelpContentFailure();
    };
    this.integrator.loadHelpContent({
      onSuccess,
      onFailure,
    });
  }

  handleDisplayHelp = () => {
    this.loadHelpContent();
  }

  run = (context) => {
    this.dispatcher.setInitialState(context);
    this.handleDisplayHelp();
  }
}
