import { Provider } from 'react-redux';
import React from 'react';

import FileUnavailable from './components/FileUnavailable';
import Store from '../../store/Store';
import createFileUnavailableDispatcher from './fileUnavailableDispatcher';
import createFileUnavailableIntegration from './createFileUnavailableIntegration';
import fileUnavailableReducer from './fileUnavailableReducer';

export default class FileUnavailableModule {
  constructor({ integration, setRootView, navigateTo }) {
    this.integration = createFileUnavailableIntegration(integration);
    this.store = new Store(fileUnavailableReducer);
    this.setRootView = setRootView;
    this.dispatcher = createFileUnavailableDispatcher(this.store);
    this.navigateTo = navigateTo;
  }

  unsubscribeFromStore() {
    this.store.unsubscribeAll();
  }

  resetState() {
    this.dispatcher.resetState();
  }

  load() {
    const { businessId, region } = this.store.getState();

    const urlParams = {
      businessId,
      region,
    };

    this.integration
      .read(urlParams)
      .then((payload) => {
        this.dispatcher.load(payload);
      })
      .catch((error) => {
        throw error;
      });
  }

  run(context) {
    const { reason } = context;

    this.dispatcher.setInitialState(context);

    if (!['versionTooLow', 'versionTooHigh'].includes(reason)) {
      const { businessId, region } = this.store.getState();
      this.navigateTo(`/#/${region}/${businessId}/dashboard`);
      return;
    }
    this.render();
    this.load();
  }

  render = () => {
    const wrappedView = (
      <Provider store={this.store}>
        <FileUnavailable />
      </Provider>
    );
    this.setRootView(wrappedView);
  };
}
