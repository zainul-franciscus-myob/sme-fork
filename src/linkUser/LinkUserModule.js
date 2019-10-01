import { Provider } from 'react-redux';
import React from 'react';

import { getRedirectURL } from './LinkUserSelectors';
import LinkUserView from './components/LinkUserView';
import Store from '../store/Store';
import createLinkUserDispatcher from './createLinkUserDispatcher';
import createLinkUserIntegrator from './createLinkUserIntegrator';
import linkUserReducer from './linkUserReducer';

export default class LinkUserModule {
  constructor({ integration, setRootView }) {
    this.integration = integration;
    this.store = new Store(linkUserReducer);
    this.setRootView = setRootView;
    this.dispatcher = createLinkUserDispatcher(this.store);
    this.integrator = createLinkUserIntegrator(this.store, this.integration);
  }

  loadBusinessInformation = () => {
    this.dispatcher.setLoadingState(true);

    const onSuccess = (businessInformation) => {
      this.dispatcher.setLoadingState(false);
      this.dispatcher.loadBusinessInformation(businessInformation);
    };

    const onFailure = () => {
      this.dispatcher.setLoadingState(false);
      console.log('Failed to load business information');
    };

    this.integrator.loadBusinessInformation({
      onSuccess,
      onFailure,
    });
  }

  linkUserId = () => {
    this.dispatcher.setLoadingState(true);

    const onSuccess = () => {
      this.dispatcher.setLoadingState(false);
      this.redirectToPreviousPage();
    };

    const onFailure = ({ message }) => {
      this.dispatcher.setLoadingState(false);
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

  run = (context) => {
    this.setInitialState(context);
    this.render();
    this.loadBusinessInformation();
  }

  resetState() {
    this.dispatcher.resetState();
  }
}
