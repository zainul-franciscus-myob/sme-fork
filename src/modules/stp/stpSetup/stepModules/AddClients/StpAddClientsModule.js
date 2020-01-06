import { Provider } from 'react-redux';
import React from 'react';

import { SET_AGENT_ROLE } from './StpAddClientsIntents';
import { getATOInstructionsLink, getAgentPortalLink } from './stpAddClientsSelectors';
import Store from '../../../../../store/Store';
import StpAddClientsView from './components/StpAddClientsView';
import stpAddClientsReducer from './stpAddClientsReducer';

export default class StpAddClientsModule {
  constructor({
    onFinish,
    onPrevious,
  }) {
    this.onFinishFunc = onFinish;
    this.onPreviousFunc = onPrevious;
    this.store = new Store(stpAddClientsReducer);
  }

  setAgentRole = (agentRole) => {
    this.store.dispatch({
      intent: SET_AGENT_ROLE,
      agentRole,
    });
  }

  openAgentPortal = () => {
    const state = this.store.getState();
    const link = getAgentPortalLink(state);
    window.open(link, '_newTab');
  }

  openATOInstructions = () => {
    const state = this.store.getState();
    const link = getATOInstructionsLink(state);
    window.open(link, '_newTab');
  }

  getView() {
    return (
      <Provider store={this.store}>
        <StpAddClientsView
          onNextClick={this.onFinishFunc}
          onPreviousClick={this.onPreviousFunc}
          onPortalLinkClick={this.openAgentPortal}
          onInstructionsLinkClick={this.openATOInstructions}
        />
      </Provider>
    );
  }
}
