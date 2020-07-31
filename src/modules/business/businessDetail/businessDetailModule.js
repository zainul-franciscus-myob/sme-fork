import { Provider } from 'react-redux';
import React from 'react';

import {
  getDashboardUrl,
  getIsPageEdited,
  getIsSubmitting,
  getModalUrl,
} from './businessDetailSelectors';
import BusinessDetailsView from './components/BusinessDetailView';
import FeatureToggles from '../../../FeatureToggles';
import LoadingState from '../../../components/PageView/LoadingState';
import Store from '../../../store/Store';
import businessDetailReducer from './businessDetailReducer';
import createBusinessDetailDispatcher from './createBusinessDetailDispatcher';
import createBusinessDetailIntegrator from './createBusinessDetailIntegrator';
import keyMap from '../../../hotKeys/keyMap';
import setupHotKeys from '../../../hotKeys/setupHotKeys';

export default class BusinessDetailModule {
  constructor({
    integration,
    setRootView,
    businessDetailsConfirmed,
    isToggleOn,
  }) {
    this.integration = integration;
    this.setRootView = setRootView;
    this.store = new Store(businessDetailReducer);
    this.businessDetailsConfirmed = businessDetailsConfirmed;
    this.dispatcher = createBusinessDetailDispatcher(this.store);
    this.integrator = createBusinessDetailIntegrator(this.store, integration);
    this.isToggleOn = isToggleOn;
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
  };

  updateBusinessDetailField = ({ key, value }) => {
    this.dispatcher.setPageEditedState(true);
    this.dispatcher.updateBusinessDetail({ key, value });
  };

  updateFinancialYearSettingsField = ({ key, value }) => {
    this.dispatcher.setPageEditedState(true);
    this.dispatcher.updateFinancialYearSettings({ key, value });
  };

  updateLockDateDetail = ({ key, value }) => {
    this.dispatcher.setPageEditedState(true);
    this.dispatcher.updateLockDateDetail({ key, value });
  };

  updateBusinessDetail = () => {
    const onSuccess = ({ message }) => {
      this.businessDetailsConfirmed();
      this.dispatcher.setSubmittingState(false);
      this.dispatcher.setPageEditedState(false);
      this.dispatcher.setIsLockDateAutoPopulated(false);
      this.dispatcher.setAlertMessage({ message, type: 'success' });
      this.dispatcher.setIsFinancialYearSettingsChangedState(false);
    };
    this.saveBusinessDetails(onSuccess);
  };

  saveBusinessDetails = (onSuccess) => {
    const state = this.store.getState();
    if (getIsSubmitting(state)) return;

    this.dispatcher.setSubmittingState(true);

    const onFailure = (error) => {
      this.dispatcher.setSubmittingState(false);
      this.dispatcher.setAlertMessage({
        message: error.message,
        type: 'danger',
      });
    };

    this.integrator.saveBusinessDetails({ onSuccess, onFailure });
  };

  openCancelModal = () => {
    const state = this.store.getState();
    const dashboardUrl = getDashboardUrl(state);

    if (getIsPageEdited(state)) {
      this.dispatcher.openModal(dashboardUrl, 'cancel');
    } else {
      this.redirectToUrl(dashboardUrl);
    }
  };

  dismissAlert = () => {
    this.dispatcher.setAlertMessage();
  };

  unsubscribeFromStore = () => {
    this.store.unsubscribeAll();
  };

  resetState = () => {
    this.dispatcher.resetState();
  };

  startNewFinancialYear = () => {
    const onFailure = ({ message }) => {
      this.dispatcher.stopLoadingFinancialYearModal();
      this.dispatcher.closeFinancialYearModal();
      this.dispatcher.setAlertMessage({
        message,
        type: 'danger',
      });
    };
    const onSuccess = (response) => {
      this.dispatcher.stopLoadingFinancialYearModal();
      this.dispatcher.closeFinancialYearModal();
      this.dispatcher.loadBusinessDetail(response);
      this.dispatcher.setAlertMessage({
        message: "Success! You've started a new financial year.",
        type: 'success',
      });
    };

    this.dispatcher.startLoadingFinancialYearModal();
    this.integrator.startNewFinancialYear({
      onSuccess: () =>
        this.integrator.loadBusinessDetail({ onSuccess, onFailure }),
      onFailure,
    });
  };

  render = () => {
    const businessDetailsView = (
      <BusinessDetailsView
        onChange={this.updateBusinessDetailField}
        onFinancialYearSettingsChange={this.updateFinancialYearSettingsField}
        onStartNewFinancialYear={this.startNewFinancialYear}
        onLockDateDetailChange={this.updateLockDateDetail}
        onSaveButtonClick={this.updateBusinessDetail}
        onCancelButtonClick={this.openCancelModal}
        onDismissAlert={this.dismissAlert}
        onConfirmSave={this.updateAndRedirectToUrl}
        onConfirmCancel={this.redirectToModalUrl}
        onConfirmClose={this.dispatcher.closeModal}
        onOpenFinancialYearModal={this.dispatcher.openFinancialYearModal}
        onCloseFinancialYearModal={this.dispatcher.closeFinancialYearModal}
      />
    );

    const wrappedView = (
      <Provider store={this.store}>{businessDetailsView}</Provider>
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
  };

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
      this.dispatcher.openModal(url, 'unsaved');
    } else {
      this.redirectToUrl(url);
    }
  };

  // @FEATURE_TOGGLE: start-new-financial-year
  run(context) {
    this.dispatcher.setInitialState({
      ...context,
      isStartNewFinancialYearEnabled: this.isToggleOn(
        FeatureToggles.StartNewFinancialYear
      ),
    });
    this.render();
    setupHotKeys(keyMap, this.handlers);
    this.loadBusinessDetail();
  }
}
