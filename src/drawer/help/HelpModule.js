import { Provider } from 'react-redux';
import React from 'react';

import { getShowDrawer } from '../DrawerSelectors';
import {
  isHelpContentLoaded, isUserHelpSettingsLoaded, shouldLoadHelpContent,
} from './HelpSelectors';
import HelpView from './components/HelpView';
import Store from '../../store/Store';
import createHelpDispatcher from './createHelpDispatcher';
import createHelpIntegrator from './createHelpIntegrator';
import helpReducer from './helpReducer';

export default class HelpModule {
  constructor({
    integration, drawerStore, drawerDispatcher,
  }) {
    this.integration = integration;
    this.store = new Store(helpReducer);
    this.drawerStore = drawerStore;
    this.drawerDispatcher = drawerDispatcher;
    this.dispatcher = createHelpDispatcher(this.store);
    this.integrator = createHelpIntegrator(this.store, this.integration);
  }

  getView = () => {
    const view = (
      <HelpView
        closeHelp={this.closeHelp}
      />
    );

    const wrappedView = (
      <Provider store={this.store}>
        {view}
      </Provider>
    );

    return wrappedView;
  }

  closeHelp = () => {
    this.drawerDispatcher.closeDrawer();
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
    if (!shouldLoadHelpContent(this.store.getState())) {
      this.closeHelp();
      return;
    }

    if (getShowDrawer(this.drawerStore.getState())) {
      this.loadHelpContent();
    }
  }

  run = (context) => {
    this.dispatcher.setInitialState(context);
    this.handleDisplayHelp();
  }
}
