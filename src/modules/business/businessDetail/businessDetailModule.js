import { Provider } from 'react-redux';
import React from 'react';

import {
  getIsPageEdited, getIsSubmitting, getModalUrl,
} from './businessDetailSelectors';
import BusinessDetailsView from './components/BusinessDetailView';
import LoadingState from '../../../components/PageView/LoadingState';
import Store from '../../../store/Store';
import businessDetailReducer from './businessDetailReducer';
import createBusinessDetailDispatcher from './createBusinessDetailDispatcher';
import createBusinessDetailIntegrator from './createBusinessDetailIntegrator';
import keyMap from '../../../hotKeys/keyMap';
import setupHotKeys from '../../../hotKeys/setupHotKeys';

export default class BusinessDetailModule {
  constructor({
    integration, setRootView, businessDetailsConfirmed,
  }) {
    this.integration = integration;
    this.setRootView = setRootView;
    this.store = new Store(businessDetailReducer);
    this.businessDetailsConfirmed = businessDetailsConfirmed;
    this.dispatcher = createBusinessDetailDispatcher(this.store);
    this.integrator = createBusinessDetailIntegrator(this.store, integration);
  }

  loadBusinessDetail = () => {
    this.dispatcher.setLoadingState(LoadingState.LOADING);

    const onSuccess = (response) => {
      this.dispatcher.setLoadingState(LoadingState.LOADING_SUCCESS);
      this.dispatcher.loadBusinessDetail(response);
    };

    const onFailure = () => {
      this.dispatcher.setLoadingState(LoadingState.LOADING_FAIL);
    };

    this.integrator.loadBusinessDetail({ onSuccess, onFailure });
  }

  updateBusinessDetailField = ({ key, value }) => {
    this.dispatcher.setPageEditedState(true);
    this.dispatcher.updateBusinessDetail({ key, value });
  }

  updateLockDateDetail = ({ key, value }) => {
    this.dispatcher.setPageEditedState(true);
    this.dispatcher.updateLockDateDetail({ key, value });
  }

  updateBusinessDetail = () => {
    const onSuccess = ({ message }) => {
      this.businessDetailsConfirmed();
      this.dispatcher.setSubmittingState(false);
      this.dispatcher.setPageEditedState(false);
      this.dispatcher.setIsLockDateAutoPopulated(false);
      this.dispatcher.setAlertMessage({ message, type: 'success' });
    };
    this.saveBusinessDetails(onSuccess);
  };

  saveBusinessDetails = (onSuccess) => {
    const state = (this.store.getState());
    if (getIsSubmitting(state)) return;

    this.dispatcher.setSubmittingState(true);

    const onFailure = (error) => {
      this.dispatcher.setSubmittingState(false);
      this.dispatcher.setAlertMessage({ message: error.message, type: 'danger' });
    };

    this.integrator.saveBusinessDetails({ onSuccess, onFailure });
  }

  dismissAlert = () => {
    this.dispatcher.setAlertMessage();
  };

  unsubscribeFromStore = () => {
    this.store.unsubscribeAll();
  };

  resetState = () => {
    this.dispatcher.resetState();
  };

  render = () => {
    const businessDetailsView = (
      <BusinessDetailsView
        onChange={this.updateBusinessDetailField}
        onLockDateDetailChange={this.updateLockDateDetail}
        onSaveButtonClick={this.updateBusinessDetail}
        onDismissAlert={this.dismissAlert}
        onConfirmSave={this.updateAndRedirectToUrl}
        onConfirmCancel={this.redirectToModalUrl}
        onConfirmClose={this.dispatcher.closeModal}
      />
    );

    const wrappedView = (
      <Provider store={this.store}>
        {businessDetailsView}
      </Provider>
    );
    this.setRootView(wrappedView);
  };

  handlers = {
    SAVE_ACTION: this.updateBusinessDetail,
  };

  redirectToUrl = (url) => {
    if (url) {
      window.location.href = url;
    }
  }

  redirectToModalUrl = () => {
    const state = this.store.getState();
    const url = getModalUrl(state);
    this.dispatcher.closeModal();
    this.redirectToUrl(url);
  };

  updateAndRedirectToUrl = () => {
    const onSuccess = () => {
      this.redirectToModalUrl();
    };
    this.saveBusinessDetails(onSuccess);
  };

  handlePageTransition = (url) => {
    const state = this.store.getState();
    if (getIsPageEdited(state)) {
      this.dispatcher.openModal(url);
    } else {
      this.redirectToUrl(url);
    }
  }

  run(context) {
    this.dispatcher.setInitialState(context);
    this.render();
    setupHotKeys(keyMap, this.handlers);
    this.loadBusinessDetail();
  }
}
