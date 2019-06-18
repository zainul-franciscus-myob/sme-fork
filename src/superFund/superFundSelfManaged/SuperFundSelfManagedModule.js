import { Provider } from 'react-redux';
import React from 'react';

import {
  RESET_STATE,
  SET_INITIAL_STATE,
} from '../../SystemIntents';
import { SET_ALERT_MESSAGE, SET_SUBMITTING_STATE } from '../SuperFundIntents';
import Store from '../../store/Store';
import superFundSelfManagedReducer from './superFundSelfManagedReducer';

export default class SuperFundSelfManagedModule {
  constructor({
    integration, setRootView, pushMessage,
  }) {
    this.integration = integration;
    this.setRootView = setRootView;
    this.pushMessage = pushMessage;
    this.store = new Store(superFundSelfManagedReducer);
  }

  displayAlert = errorMessage => this.store.dispatch({
    intent: SET_ALERT_MESSAGE,
    alertMessage: errorMessage,
  });

  dismissAlert = () => this.store.dispatch({
    intent: SET_ALERT_MESSAGE,
    alertMessage: '',
  });

  setSubmittingState = isSubmitting => this.store.dispatch({
    intent: SET_SUBMITTING_STATE,
    isSubmitting,
  });

  render = () => {
    const superFundSelfManagedView = (
      <div>View</div>
    );

    const wrappedView = (
      <Provider store={this.store}>
        {superFundSelfManagedView}
      </Provider>
    );
    this.setRootView(wrappedView);
  }

  unsubscribeFromStore = () => {
    this.store.unsubscribeAll();
  };

  setInitialState = (context, payload) => {
    const intent = SET_INITIAL_STATE;

    this.store.dispatch({
      intent,
      context,
      ...payload,
    });
  };

  run({ context, payload }) {
    this.setInitialState(context, payload);
    this.render();
  }

  resetState = () => {
    const intent = RESET_STATE;
    this.store.dispatch({
      intent,
    });
  };
}
