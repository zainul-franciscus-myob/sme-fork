import { Provider } from 'react-redux';
import React from 'react';

import { SET_AGENT_ROLE, SET_ERROR_MESSAGE } from './StpAddClientsIntents';
import Store from '../../../../../store/Store';
import StpAddClientsView from './components/StpAddClientsView';
import stpAddClientsReducer from './stpAddClientsReducer';

export default class StpAddClientsModule {
  constructor({ onFinish, onPrevious }) {
    this.onFinishFunc = onFinish;
    this.onPreviousFunc = onPrevious;
    this.store = new Store(stpAddClientsReducer);
  }

  setAgentRole = (agentRole) => {
    this.store.dispatch({
      intent: SET_AGENT_ROLE,
      agentRole,
    });
  };

  showError = ({ message }) => {
    this.store.dispatch({
      intent: SET_ERROR_MESSAGE,
      errorMessage: message,
    });
  };

  getView() {
    return (
      <Provider store={this.store}>
        <StpAddClientsView
          onNextClick={this.onFinishFunc}
          onPreviousClick={this.onPreviousFunc}
        />
      </Provider>
    );
  }
}
