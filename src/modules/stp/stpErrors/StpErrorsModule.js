import { Provider } from 'react-redux';
import React from 'react';

import {
  LOAD_BUSINESS_DETAILS,
  LOAD_STP_ERRORS,
  SET_BUSINESS_DETAIL_IS_LOADING,
  SET_ERROR_MESSAGE,
  SET_IS_BUSINESS_DETAILS_MODAL_OPEN,
  SET_IS_LOADING,
} from './stpErrorsIntents';
import { RESET_STATE, SET_INITIAL_STATE } from '../../../SystemIntents';
import {
  getBusinessId, getEmployeePageUrl, getPayItemPageUrl, getStpSetupUrl,
} from './stpErrorsSelectors';
import Store from '../../../store/Store';
import StpErrorsView from './components/StpErrorsView';
import stpErrorsReducer from './stpErrorsReducer';

export default class StpErrorsModule {
  constructor({
    setRootView,
    integration,
  }) {
    this.setRootView = setRootView;
    this.integration = integration;
    this.store = new Store(stpErrorsReducer);
  }

  openEmployeePage = (employeeId) => {
    const state = this.store.getState();
    window.open(getEmployeePageUrl(state, employeeId), '_blank');
  }

  openPayItemPage = ({ itemType, id }) => {
    const state = this.store.getState();
    window.open(getPayItemPageUrl(state, itemType, id), '_blank');
  }

  goToStpSetup = () => {
    const state = this.store.getState();
    const stpSetupUrl = getStpSetupUrl(state);
    window.location.href = stpSetupUrl;
  }

  setBusinessDetailsModalIsOpen = (isOpen) => {
    this.store.dispatch({
      intent: SET_IS_BUSINESS_DETAILS_MODAL_OPEN,
      isOpen,
    });
  }

  setBusinessDetailModalIsLoading = (isLoading) => {
    this.store.dispatch({
      intent: SET_BUSINESS_DETAIL_IS_LOADING,
      isLoading,
    });
  }

  loadBusinessDetail = () => {
    this.setBusinessDetailModalIsLoading(true);

    const state = this.store.getState();

    const urlParams = {
      businessId: getBusinessId(state),
    };

    const onSuccess = (businessDetails) => {
      this.store.dispatch({
        intent: LOAD_BUSINESS_DETAILS,
        businessDetails,
      });
    };

    const onFailure = () => {

    };

    this.integration.read({
      intent: LOAD_BUSINESS_DETAILS,
      urlParams,
      onSuccess,
      onFailure,
    });
  }

  openBusinessDetailModal = () => {
    this.setBusinessDetailsModalIsOpen(true);
    this.loadBusinessDetail();
  }

  render = () => {
    const wrappedView = (
      <Provider store={this.store}>
        <StpErrorsView
          onRefreshClick={this.loadStpErrors}
          onEmployeeNameClick={this.openEmployeePage}
          onPayItemClick={this.openPayItemPage}
          onGetStartedClick={this.goToStpSetup}
          onBusinessDetailsEditLinkClick={this.openBusinessDetailModal}
        />
      </Provider>
    );

    this.setRootView(wrappedView);
  }

  setIsLoading = (isLoading) => {
    this.store.dispatch({
      intent: SET_IS_LOADING,
      isLoading,
    });
  }

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
  }

  run = (context) => {
    this.setInitialState(context);
    this.loadStpErrors();
    this.render();
  }

  unsubscribeFromStore = () => {
    this.store.unsubscribeAll();
  }

  resetState = () => {
    this.store.dispatch({
      intent: RESET_STATE,
    });
  }

  setInitialState = (context) => {
    const intent = SET_INITIAL_STATE;

    this.store.dispatch({
      intent,
      context,
    });
  }
}
