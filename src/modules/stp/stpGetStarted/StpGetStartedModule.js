import { Provider } from 'react-redux';
import React from 'react';

import { LOAD_REGISTRATION_ITEMS_VALIDATION, SET_MODAL } from './stpGetStartedIntents';
import { RESET_STATE, SET_INITIAL_STATE } from '../../../SystemIntents';
import { getBusinessId, getStpErrorsUrl } from './stpGetStartedSelectors';
import ModalType from './ModalType';
import Store from '../../../store/Store';
import StpGetStartedView from './components/StpGetStartedView';
import stpGetStartedReducer from './stpGetStartedReducer';

export default class StpGetStartedModule {
  constructor({
    integration, setRootView,
  }) {
    this.integration = integration;
    this.setRootView = setRootView;
    this.store = new Store(stpGetStartedReducer);
  }

  openModal = () => {
    this.store.dispatch({
      intent: SET_MODAL,
      modal: ModalType.REGISTRATION_ERRORS,
    });
  }

  closeModal = () => {
    this.store.dispatch({
      intent: SET_MODAL,
      modal: null,
    });
  }

  goToStpSetUp = () => {
    // TODO: fill in the url
  }

  goToErrorsPage = () => {
    const state = this.store.getState();
    const stpErrorsUrl = getStpErrorsUrl(state);
    window.location.href = stpErrorsUrl;
  }

  handleGetStarted = () => {
    const intent = LOAD_REGISTRATION_ITEMS_VALIDATION;

    const state = this.store.getState();
    const urlParams = {
      businessId: getBusinessId(state),
    };

    const onSuccess = (registrationItems) => {
      if (registrationItems.hasRegistrationErrors) {
        this.openModal();
      } else {
        this.goToStpSetUp();
      }
    };

    const onFailure = () => {};

    this.integration.read({
      intent,
      urlParams,
      onSuccess,
      onFailure,
    });
  }

  render = () => {
    const stpGetStartedView = (
      <StpGetStartedView
        onGetStartedClick={this.handleGetStarted}
        onModalCancelClick={this.closeModal}
        onViewErrorsButtonClick={this.goToErrorsPage}
      />
    );

    const wrappedView = (
      <Provider store={this.store}>
        {stpGetStartedView}
      </Provider>
    );

    this.setRootView(wrappedView);
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

  unsubscribeFromStore = () => {
    this.store.unsubscribeAll();
  }

  run(context) {
    this.setInitialState(context);
    this.render();
  }
}
