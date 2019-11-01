import { Provider } from 'react-redux';
import React from 'react';

import { LOAD_HELP_CONTENT } from './HelpIntents';
import { getLoadHelpContentParams, getLoadHelpContentUrlParams, shouldLoadHelpContent } from './HelpSelectors';
import HelpView from './components/HelpView';
import Store from '../../store/Store';
import createHelpDispatcher from './createHelpDispatcher';
import helpReducer from './helpReducer';

export default class HelpModule {
  constructor({
    integration, drawerDispatcher,
  }) {
    this.integration = integration;
    this.store = new Store(helpReducer);
    this.drawerDispatcher = drawerDispatcher;
    this.dispatcher = createHelpDispatcher(this.store);
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

  loadHelpContent = () => {
    this.dispatcher.setLoadingState(true);

    const state = this.store.getState();
    const urlParams = getLoadHelpContentUrlParams(state);
    const params = getLoadHelpContentParams(state);

    const onSuccess = (helpContent) => {
      this.dispatcher.setLoadingState(false);
      this.dispatcher.loadHelpContent(helpContent);
    };
    const onFailure = () => {
      this.dispatcher.setLoadingState(false);
      this.dispatcher.loadHelpContentFailure();
    };
    this.integration.read({
      intent: LOAD_HELP_CONTENT,
      urlParams,
      params,
      onSuccess,
      onFailure,
    });
  }

  handleDisplayHelp = () => {
    if (!shouldLoadHelpContent(this.store.getState())) {
      this.closeHelp();
      return;
    }
    this.loadHelpContent();
  }

  run = (context) => {
    this.dispatcher.setInitialState(context);
    this.handleDisplayHelp();
  }
}
