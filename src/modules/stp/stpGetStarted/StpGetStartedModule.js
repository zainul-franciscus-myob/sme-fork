import { Provider } from 'react-redux';
import React from 'react';

import {
  LOAD_REGISTRATION_ITEMS_VALIDATION,
  SET_LOADING_STATE,
  SET_MODAL_STATE,
} from './stpGetStartedIntents';
import { RESET_STATE, SET_INITIAL_STATE } from '../../../SystemIntents';
import { getBusinessId, getStpErrorsUrl, getStpSetupUrl } from './stpGetStartedSelectors';
import LoadingState from '../../../components/PageView/LoadingState';
import Store from '../../../store/Store';
import StpGetStartedView from './components/StpGetStartedView';
import stpGetStartedReducer from './stpGetStartedReducer';

export default class StpGetStartedModule {
  constructor({ integration, setRootView }) {
    this.integration = integration;
    this.setRootView = setRootView;
    this.store = new Store(stpGetStartedReducer);
  }

  setLoadingState = (loadingState) => {
    this.store.dispatch({
      intent: SET_LOADING_STATE,
      loadingState,
    });
  };

  openModal = () => {
    this.store.dispatch({
      intent: SET_MODAL_STATE,
      isModalOpen: true,
    });
  };

  closeModal = () => {
    this.store.dispatch({
      intent: SET_MODAL_STATE,
      isModalOpen: false,
    });
  };

  goToStpSetUp = () => {
    const state = this.store.getState();
    window.location.href = getStpSetupUrl(state);
  };

  goToErrorsPage = () => {
    const state = this.store.getState();
    window.location.href = getStpErrorsUrl(state);
  };

  handleGetStarted = () => {
    this.setLoadingState(LoadingState.LOADING);
    const state = this.store.getState();
    const urlParams = {
      businessId: getBusinessId(state),
    };

    const onSuccess = (registrationItems) => {
      this.setLoadingState(LoadingState.LOADING_SUCCESS);
      if (registrationItems.hasRegistrationErrors) {
        this.openModal();
      } else {
        this.goToStpSetUp();
      }
    };

    const onFailure = () => {
      this.setLoadingState(LoadingState.LOADING_FAIL);
    };

    this.integration.read({
      intent: LOAD_REGISTRATION_ITEMS_VALIDATION,
      urlParams,
      onSuccess,
      onFailure,
    });
  };

  resetState = () => {
    this.store.dispatch({
      intent: RESET_STATE,
    });
  };

  setInitialState = (context) => {
    this.store.dispatch({
      intent: SET_INITIAL_STATE,
      context,
    });
  };

  unsubscribeFromStore = () => {
    this.store.unsubscribeAll();
  };

  run(context) {
    this.setInitialState(context);
    this.render();
  }

  render = () => {
    const wrappedView = (
      <Provider store={this.store}>
        <StpGetStartedView
          onGetStartedClick={this.handleGetStarted}
          onModalCancelClick={this.closeModal}
          onViewErrorsButtonClick={this.goToErrorsPage}
        />
      </Provider>
    );

    this.setRootView(wrappedView);
  };
}
