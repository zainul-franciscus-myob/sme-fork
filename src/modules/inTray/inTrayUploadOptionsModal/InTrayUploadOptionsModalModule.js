import { Provider } from 'react-redux';
import React from 'react';
import copy from 'copy-to-clipboard';

import {
  getAppStoreLink,
  getEmail,
  getGooglePlayLink,
  getIsUploadOptionsLoading,
  getSuppliersWikiLink,
} from './selectors/inTrayUploadOptionsSelectors';
import InTrayUploadOptionsModalView from './components/inTrayUploadOptionsModal';
import Store from '../../../store/Store';
import createInTrayUploadOptionsModalDispatcher from './createInTrayUploadOptionsModalDispatcher';
import createInTrayUploadOptionsModalIntegrator from './createInTrayUploadOptionsModalIntegrator';
import inTrayUploadOptionsModalReducer from './reducers/inTrayuploadOptionsReducer';

export default class InTrayUploadOptionsModalModule {
  constructor({ integration, navigateTo, globalCallbacks }) {
    this.integration = integration;
    this.store = new Store(inTrayUploadOptionsModalReducer);
    this.dispatcher = createInTrayUploadOptionsModalDispatcher(this.store);
    this.integrator = createInTrayUploadOptionsModalIntegrator(
      this.store,
      integration
    );
    this.navigateTo = navigateTo;
    this.globalCallbacks = globalCallbacks;
  }

  onCloseUploadOptionsModal = () => {
    if (!getIsUploadOptionsLoading(this.store.getState())) {
      this.hideEmailGenerationConfirmation();
      this.dispatcher.resetState();
    }

    this.globalCallbacks.inTrayUploadOptionsClosed();
  };

  openInNewTab = (url) => this.navigateTo(url, true);

  openInSameTab = (url) => this.navigateTo(url, false);

  copyEmail = () => {
    copy(getEmail(this.store.getState()));

    this.dispatcher.setUploadOptionsAlert({
      message: 'Copied!',
      type: 'success',
    });
  };

  showEmailGenerationConfirmation = () =>
    this.dispatcher.setConfirmingEmailGeneration(true);

  hideEmailGenerationConfirmation = () =>
    this.dispatcher.setConfirmingEmailGeneration(false);

  generateNewEmail = () => {
    this.dispatcher.setUploadOptionsLoading(true);

    const onFailure = ({ message }) => {
      this.dispatcher.setUploadOptionsLoading(false);
      this.dispatcher.setUploadOptionsAlert({
        message,
        type: 'danger',
      });
    };

    const onSuccess = ({ message, email }) => {
      this.hideEmailGenerationConfirmation();
      this.dispatcher.setUploadOptionsLoading(false);
      this.dispatcher.setUploadOptionsAlert({
        message,
        type: 'success',
      });
      this.dispatcher.generateNewEmail(message, email);
    };

    this.integrator.generateNewEmail({ onSuccess, onFailure });
  };

  render = () => (
    <Provider store={this.store}>
      <InTrayUploadOptionsModalView
        listeners={{
          onCancel: this.onCloseUploadOptionsModal,
          onConfirmEmailGenerationButtonClick: this
            .showEmailGenerationConfirmation,
          onCopyEmailButtonClicked: this.copyEmail,
          onDismissAlert: this.dispatcher.dismissUploadOptionsAlert,
          onDismissConfirmEmailGeneration: this.hideEmailGenerationConfirmation,
          onGenerateNewEmailButtonClick: this.generateNewEmail,
          navigateToAppStore: () =>
            this.openInNewTab(getAppStoreLink(this.store.getState())),
          navigateToGooglePlay: () => this.openInNewTab(getGooglePlayLink),
          navigateToSuppliersWiki: () =>
            this.openInNewTab(getSuppliersWikiLink),
        }}
      />
    </Provider>
  );

  close = () => this.dispatcher.resetState();

  run = ({ context }) => {
    this.dispatcher.setInitialState(context);
  };

  resetState = () => this.dispatcher.resetState();
}
