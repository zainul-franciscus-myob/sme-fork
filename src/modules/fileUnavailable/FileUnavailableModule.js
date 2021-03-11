import { Provider } from 'react-redux';
import React from 'react';

import { getDashboardURL, getIsOnlineOnly } from './FileUnavailableSelectors';
import FileUnavailableView from './components/FileUnavailableView';
import Store from '../../store/Store';
import companyFileStatusMapping from './companyFileStatusMapping';
import createFileUnavailableDispatcher from './fileUnavailableDispatcher';
import createFileUnavailableIntegration from './createFileUnavailableIntegration';
import fileUnavailableReducer from './fileUnavailableReducer';

const POLLING_INTERVAL = 20000;
const REDIRECT_DELAY = 5000;
export default class FileUnavailableModule {
  constructor({ integration, setRootView, navigateTo }) {
    this.store = new Store(fileUnavailableReducer);
    this.integration = createFileUnavailableIntegration(
      this.store,
      integration
    );
    this.setRootView = setRootView;
    this.dispatcher = createFileUnavailableDispatcher(this.store);
    this.navigateTo = navigateTo;
    this.pollingInterval = null;
  }

  unsubscribeFromStore() {
    this.store.unsubscribeAll();
    this.stopPolling(this.pollingInterval);
  }

  resetState() {
    this.dispatcher.resetState();
  }

  loadFileUnavailable() {
    const onSuccess = (payload) => {
      this.dispatcher.loadFileUnavailable(payload);
      const state = this.store.getState();
      if (getIsOnlineOnly(state)) {
        this.pollingInterval = this.triggerFileUpdate();
      }
    };

    const onFailure = () => {};

    this.integration.loadFileUnavailable(onSuccess, onFailure);
  }

  fileUpdateSuccess(state, interval, redirectDelay) {
    this.stopPolling(interval);
    this.dispatcher.setUpdateFileSuccess(true);
    setTimeout(() => {
      this.navigateTo(getDashboardURL(state));
    }, redirectDelay);
  }

  fileUpdateFail() {
    this.stopPolling();
    this.dispatcher.setUpdateFileSuccess(false);
  }

  startPolling(pollingInterval) {
    this.dispatcher.setIsPolling(true);
    this.dispatcher.setUpdateFileSuccess(false);
    return setInterval(this.poll, pollingInterval);
  }

  stopPolling(interval) {
    clearInterval(interval);
    this.dispatcher.setIsPolling(false);
  }

  poll = () => {
    const onSuccess = (payload) => {
      const { companyFileStatus } = payload;

      const companyFileStatusIsActive =
        companyFileStatus === companyFileStatusMapping[3];
      if (companyFileStatusIsActive) {
        const state = this.store.getState();
        this.fileUpdateSuccess(state, this.pollingInterval, REDIRECT_DELAY);
      }
    };

    const onFailure = () => {
      this.fileUpdateFail();
    };
    this.integration.fetchFileUpdateStatus(onSuccess, onFailure);
  };

  onTryAgainClick = () => {
    this.stopPolling(this.pollingInterval);
    this.pollingInterval = this.triggerFileUpdate();
  };

  triggerFileUpdate() {
    const onSuccess = () => {
      this.dispatcher.setUpdateFileSuccess(true);
    };

    const onFailure = () => {
      this.stopPolling(this.pollingInterval);
    };

    this.integration.triggerFileUpdate(onSuccess, onFailure);
    return this.startPolling(POLLING_INTERVAL);
  }

  run(context) {
    const { reason } = context;

    this.dispatcher.setInitialState(context);

    if (!['versionTooLow', 'versionTooHigh'].includes(reason)) {
      const state = this.store.getState();
      this.fileUpdateSuccess(state, this.pollingInterval, REDIRECT_DELAY);
      return;
    }
    this.render();
    this.loadFileUnavailable();
  }

  render = () => {
    const wrappedView = (
      <Provider store={this.store}>
        <FileUnavailableView onTryAgainClick={this.onTryAgainClick} />
      </Provider>
    );
    this.setRootView(wrappedView);
  };
}
