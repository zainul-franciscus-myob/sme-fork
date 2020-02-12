import { Provider } from 'react-redux';
import React from 'react';

import {
  CLOSE_MODAL,
  LOAD_BUSINESS_DETAIL,
  OPEN_MODAL,
  SET_ALERT_MESSAGE,
  SET_LOADING_STATE,
  SET_PAGE_EDITED_STATE,
  SET_SUBMITTING_STATE,
  UPDATE_BUSINESS_DETAIL,
} from '../../business/BusinessIntents';
import { RESET_STATE, SET_INITIAL_STATE } from '../../../SystemIntents';
import {
  getBusinessForUpdate, getBusinessId, getIsPageEdited, getModalUrl, getRegion,
} from '../../business/businessDetail/businessDetailSelectors';
import InvoiceBusinessSettingsView from './InvoiceBusinessSettingsView';
import Store from '../../../store/Store';
import businessDetailReducer from '../../business/businessDetail/businessDetailReducer';
import keyMap from '../../../hotKeys/keyMap';
import setupHotKeys from '../../../hotKeys/setupHotKeys';

export default class InvoiceBusinessSettingsModule {
  constructor({ integration, setRootView, setupBusinessDetails }) {
    this.integration = integration;
    this.setRootView = setRootView;
    this.store = new Store(businessDetailReducer);
    this.setupBusinessDetailsCallback = setupBusinessDetails;
  }

  loadBusinessDetail = () => {
    this.setLoadingState(true);

    const intent = LOAD_BUSINESS_DETAIL;
    const urlParams = { businessId: this.businessId };

    const onSuccess = ({ businessDetails }) => {
      this.setLoadingState(false);
      this.store.dispatch({ intent, businessDetails });
    };

    const onFailure = () => console.log('Failed to load business detail');

    this.integration.read({
      intent,
      urlParams,
      onSuccess,
      onFailure,
    });
  };

  setLoadingState = isLoading => this.store.dispatch({ SET_LOADING_STATE, isLoading });

  createChangeHandler = intent => ({ key, value }) => {
    this.setIsPageEdited(true);
    this.store.dispatch({ intent, key, value });
  };

  updateBusinessDetail = () => {
    const onSuccess = ({ message }) => {
      this.setSubmittingState(false);
      this.setIsPageEdited(false);
      this.displayAlert({ message, type: 'success' });
      this.setupBusinessDetailsCallback();
      this.redirectToLogoSettings();
    };

    this.saveBusinessDetails(onSuccess);
  };

  handlePageTransition = (url) => {
    const state = this.store.getState();
    if (getIsPageEdited(state)) {
      this.openUnsavedModal(url);
    } else {
      this.redirectToUrl(url);
    }
  };

  saveBusinessDetails = (onSuccess) => {
    this.setSubmittingState(true);

    const intent = UPDATE_BUSINESS_DETAIL;
    const content = getBusinessForUpdate(this.store.getState());
    const urlParams = { businessId: this.businessId };
    const onFailure = (error) => {
      this.setSubmittingState(false);
      this.displayAlert({ message: error.message, type: 'danger' });
    };

    this.integration.write({
      intent,
      urlParams,
      content,
      onSuccess,
      onFailure,
    });
  };

  displayAlert = ({ message, type }) => {
    this.store.dispatch({
      intent: SET_ALERT_MESSAGE,
      alert: { message, type },
    });
  };

  setSubmittingState = (isSubmitting) => {
    const intent = SET_SUBMITTING_STATE;

    this.store.dispatch({ intent, isSubmitting });
  };

  dismissAlert = () => {
    this.store.dispatch({
      intent: SET_ALERT_MESSAGE,
      alert: undefined,
    });
  };

  unsubscribeFromStore = () => this.store.unsubscribeAll();

  resetState = () => {
    const intent = RESET_STATE;
    this.store.dispatch({ intent });
  };

  render = () => {
    this.setRootView(
      <Provider store={this.store}>
        <InvoiceBusinessSettingsView
          onChange={this.createChangeHandler(UPDATE_BUSINESS_DETAIL)}
          onSaveButtonClick={this.updateBusinessDetail}
          onDismissAlert={this.dismissAlert}
          onConfirmSave={this.updateAndRedirectToUrl}
          onConfirmCancel={this.redirectToModalUrl}
          onConfirmClose={this.closeModal}
        />
      </Provider>,
    );
  };

  handlers = { SAVE_ACTION: this.updateBusinessDetail };

  redirectToUrl = (url) => {
    if (url) window.location.href = url;
  };

  openUnsavedModal = (url) => {
    this.store.dispatch({
      intent: OPEN_MODAL,
      modal: { url },
    });
  };

  closeModal = () => {
    this.store.dispatch({ intent: CLOSE_MODAL });
  };

  redirectToPath = (path) => {
    const state = this.store.getState();

    const region = getRegion(state);
    const businessId = getBusinessId(state);

    window.location.href = `/#/${region}/${businessId}${path}`;
  };

  redirectToLogoSettings = () => {
    this.redirectToPath('/invoiceLogoSettings');
  };

  redirectToModalUrl = () => {
    const state = this.store.getState();
    const url = getModalUrl(state);
    this.closeModal();
    this.redirectToUrl(url);
  };

  updateAndRedirectToUrl = () => {
    const onSuccess = () => this.redirectToModalUrl();
    this.saveBusinessDetails(onSuccess);
  };

  setIsPageEdited = (isPageEdited) => {
    this.store.dispatch({
      intent: SET_PAGE_EDITED_STATE,
      isPageEdited,
    });
  };

  run(context) {
    this.businessId = context.businessId;
    this.store.dispatch({ intent: SET_INITIAL_STATE, ...context });
    this.render();
    setupHotKeys(keyMap, this.handlers);
    this.loadBusinessDetail();
  }
}
