import { Provider } from 'react-redux';
import React from 'react';

import {
  BUSINESS_DETAIL_FIELD_CHANGE,
  LOAD_BUSINESS_DETAILS,
  LOAD_STP_ERRORS,
  SET_BUSINESS_DETAIL_IS_LOADING,
  SET_BUSINESS_DETAIL_MODAL_ALERT_MESSAGE,
  SET_ERROR_MESSAGE,
  SET_IS_BUSINESS_DETAILS_MODAL_OPEN,
  SET_IS_LOADING,
  SUBMIT_BUSINESS_DETAILS,
} from './stpErrorsIntents';
import { RESET_STATE, SET_INITIAL_STATE } from '../../../SystemIntents';
import {
  getBusinessId,
  getEmployeePageUrl,
  getPayItemPageUrl,
  getSource,
  getStpSetupUrl,
  getSubmitBusinessDetailsContent,
} from './stpErrorsSelectors';
import Store from '../../../store/Store';
import StpErrorsView from './components/StpErrorsView';
import stpErrorsReducer from './stpErrorsReducer';

export default class StpErrorsModule {
  constructor({ setRootView, integration, replaceURLParams }) {
    this.setRootView = setRootView;
    this.integration = integration;
    this.replaceURLParams = replaceURLParams;
    this.store = new Store(stpErrorsReducer);
  }

  openEmployeePage = (employeeId) => {
    const state = this.store.getState();
    window.open(getEmployeePageUrl(state, employeeId), '_blank');
  };

  openPayItemPage = ({ itemType, id }) => {
    const state = this.store.getState();
    window.open(getPayItemPageUrl(state, itemType, id), '_blank');
  };

  goToStpSetup = () => {
    const state = this.store.getState();
    const stpSetupUrl = getStpSetupUrl(state);
    window.location.href = stpSetupUrl;
  };

  setBusinessDetailsModalIsOpen = (isOpen) => {
    this.store.dispatch({
      intent: SET_IS_BUSINESS_DETAILS_MODAL_OPEN,
      isOpen,
    });
  };

  setBusinessDetailModalIsLoading = (isLoading) => {
    this.store.dispatch({
      intent: SET_BUSINESS_DETAIL_IS_LOADING,
      isLoading,
    });
  };

  setBusinessDetailModalAlert = (message) => {
    this.store.dispatch({
      intent: SET_BUSINESS_DETAIL_MODAL_ALERT_MESSAGE,
      message,
    });
  };

  loadBusinessDetail = () => {
    this.setBusinessDetailModalIsLoading(true);

    const state = this.store.getState();

    const urlParams = {
      businessId: getBusinessId(state),
    };

    const onSuccess = (businessDetails) => {
      this.setBusinessDetailModalIsLoading(false);
      this.setBusinessDetailModalAlert('');
      this.store.dispatch({
        intent: LOAD_BUSINESS_DETAILS,
        businessDetails,
      });
    };

    const onFailure = ({ message }) => {
      this.setBusinessDetailModalIsLoading(false);
      this.setBusinessDetailModalAlert(message);
    };

    this.integration.read({
      intent: LOAD_BUSINESS_DETAILS,
      urlParams,
      onSuccess,
      onFailure,
    });
  };

  submitBusinessDetail = () => {
    this.setBusinessDetailModalIsLoading(true);

    const state = this.store.getState();

    const urlParams = {
      businessId: getBusinessId(state),
    };

    const content = getSubmitBusinessDetailsContent(state);

    const onSuccess = () => {
      this.setBusinessDetailModalIsLoading(false);
      this.setBusinessDetailsModalIsOpen(false);
      this.loadStpErrors();
    };

    const onFailure = ({ message }) => {
      this.setBusinessDetailModalIsLoading(false);
      this.setBusinessDetailModalAlert(message);
    };

    this.integration.write({
      intent: SUBMIT_BUSINESS_DETAILS,
      urlParams,
      content,
      onSuccess,
      onFailure,
    });
  };

  openBusinessDetailModal = () => {
    this.setBusinessDetailsModalIsOpen(true);
    this.loadBusinessDetail();
  };

  onBusinessDetailsFieldChange = ({ key, value }) => {
    this.store.dispatch({
      intent: BUSINESS_DETAIL_FIELD_CHANGE,
      key,
      value,
    });
  };

  closeTab = () => {
    window.close();
  };

  render = () => {
    const wrappedView = (
      <Provider store={this.store}>
        <StpErrorsView
          onRefreshClick={this.loadStpErrors}
          onEmployeeNameClick={this.openEmployeePage}
          onPayItemClick={this.openPayItemPage}
          onGetStartedClick={this.goToStpSetup}
          closeTabHandler={this.closeTab}
          onBusinessDetailsEditLinkClick={this.openBusinessDetailModal}
          onModalCancel={() => this.setBusinessDetailsModalIsOpen(false)}
          onBusinessDetailsFieldChange={this.onBusinessDetailsFieldChange}
          onBusinessDetailsSaveClick={this.submitBusinessDetail}
        />
      </Provider>
    );

    this.setRootView(wrappedView);
  };

  setIsLoading = (isLoading) => {
    this.store.dispatch({
      intent: SET_IS_LOADING,
      isLoading,
    });
  };

  loadStpErrors = () => {
    this.setIsLoading(true);
    const intent = LOAD_STP_ERRORS;
    const state = this.store.getState();

    const urlParams = {
      businessId: getBusinessId(state),
    };

    const onSuccess = (errorsPayload) => {
      this.setIsLoading(false);
      this.store.dispatch({
        intent: LOAD_STP_ERRORS,
        errorsPayload,
      });
    };

    const onFailure = ({ message }) => {
      this.setIsLoading(false);
      this.store.dispatch({
        intent: SET_ERROR_MESSAGE,
        message,
      });
    };

    this.integration.read({
      intent,
      urlParams,
      onSuccess,
      onFailure,
    });
  };

  updateURLFromState = () => {
    const params = {
      source: getSource(this.store.getState()),
    };

    this.replaceURLParams(params);
  };

  run = (context) => {
    this.store.subscribe(this.updateURLFromState);
    this.setInitialState(context);
    this.loadStpErrors();
    this.render();
  };

  unsubscribeFromStore = () => {
    this.store.unsubscribeAll();
  };

  resetState = () => {
    this.store.dispatch({
      intent: RESET_STATE,
    });
  };

  setInitialState = (context) => {
    const intent = SET_INITIAL_STATE;

    this.store.dispatch({
      intent,
      context,
    });
  };
}
