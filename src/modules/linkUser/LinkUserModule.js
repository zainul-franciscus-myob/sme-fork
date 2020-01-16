import { Provider } from 'react-redux';
import React from 'react';

import { getLoadingState, getRedirectURL } from './LinkUserSelectors';
import LinkUserView from './components/LinkUserView';
import LoadingState from '../../components/PageView/LoadingState';
import Store from '../../store/Store';
import createLinkUserDispatcher from './createLinkUserDispatcher';
import createLinkUserIntegrator from './createLinkUserIntegrator';
import keyMap from '../../hotKeys/keyMap';
import linkUserReducer from './linkUserReducer';
import setupHotKeys from '../../hotKeys/setupHotKeys';

export default class LinkUserModule {
  constructor({ integration, setRootView }) {
    this.integration = integration;
    this.store = new Store(linkUserReducer);
    this.setRootView = setRootView;
    this.dispatcher = createLinkUserDispatcher(this.store);
    this.integrator = createLinkUserIntegrator(this.store, this.integration);
  }

  loadBusinessInformation = () => {
    this.dispatcher.setLoadingState(LoadingState.LOADING);

    const onSuccess = (businessInformation) => {
      this.dispatcher.setLoadingState(LoadingState.LOADING_SUCCESS);
      this.dispatcher.loadBusinessInformation(businessInformation);
    };

    const onFailure = () => {
      this.dispatcher.setLoadingState(LoadingState.LOADING_FAIL);
    };

    this.integrator.loadBusinessInformation({
      onSuccess,
      onFailure,
    });
  }

  linkUserId = () => {
    if (getLoadingState(this.store.getState()) === LoadingState.LOADING) return;

    this.dispatcher.setLoadingState(LoadingState.LOADING);

    const onSuccess = () => {
      this.dispatcher.setLoadingState(LoadingState.LOADING_SUCCESS);
      this.redirectToPreviousPage();
    };

    const onFailure = ({ message }) => {
      this.dispatcher.setLoadingState(LoadingState.LOADING_FAIL);
      this.dispatcher.setAlert(message);
    };

    this.integrator.linkUserId({
      onSuccess,
      onFailure,
    });
  }

  redirectToBusinessList = () => {
    window.location.href = '/#/businesses';
  }

  redirectToPreviousPage = () => {
    const state = this.store.getState();
    const redirectURL = getRedirectURL(state);
    window.location.href = redirectURL;
  }

  unsubscribeFromStore = () => {
    this.store.unsubscribeAll();
  };

  render = () => {
    const linkUserView = (
      <LinkUserView
        onUserInformationUpdate={this.dispatcher.updateUserInformation}
        onLinkUser={this.linkUserId}
        onCancel={this.redirectToBusinessList}
        onDismissAlert={this.dispatcher.dismissAlert}
      />
    );

    const wrappedView = (
      <Provider store={this.store}>
        {linkUserView}
      </Provider>
    );
    this.setRootView(wrappedView);
  };

  setInitialState = context => this.dispatcher.setInitialState(context);

  handlers = {
    SAVE_ACTION: this.linkUserId,
  };

  run = (context) => {
    this.setInitialState(context);
    setupHotKeys(keyMap, this.handlers);
    this.render();
    this.loadBusinessInformation();
  }

  resetState() {
    this.dispatcher.resetState();
  }
}
