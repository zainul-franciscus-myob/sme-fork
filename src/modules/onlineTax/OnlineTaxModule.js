import { Provider } from 'react-redux';
import React from 'react';

import { RESET_STATE, SET_INITIAL_STATE } from '../../SystemIntents';
import { getRegion } from './onlineTaxSelectors';
import RegionToOnlineTaxViewMapping from './RegionToOnlineTaxViewMapping';
import Store from '../../store/Store';
import onlineTaxReducer from './onlineTaxReducer';

export default class OnlineTaxModule {
  constructor({ integration, setRootView }) {
    this.integration = integration;
    this.setRootView = setRootView;
    this.store = new Store(onlineTaxReducer);
  }

  render = () => {
    const state = this.store.getState();
    const region = getRegion(state);

    const OnlineTaxView = RegionToOnlineTaxViewMapping[region];

    const wrappedView = (
      <Provider store={this.store}>
        <OnlineTaxView />
      </Provider>
    );

    this.setRootView(wrappedView);
  };

  unsubscribeFromStore = () => {
    this.store.unsubscribeAll();
  };

  setInitialState = (context) => {
    const intent = SET_INITIAL_STATE;

    this.store.dispatch({
      intent,
      context,
    });
  };

  run(context) {
    this.setInitialState(context);
    this.render();
  }

  resetState = () => {
    const intent = RESET_STATE;
    this.store.dispatch({
      intent,
    });
  };
}
