import { Provider } from 'react-redux';
import React from 'react';

import {
  RESET_STATE,
  SET_INITIAL_STATE,
} from '../../SystemIntents';
import { getRegion } from './prepareBasSelectors';
import RegionToTaxActivityViewMapping from './RegionToTaxActivityViewMapping';
import Store from '../../store/Store';
import prepareBasOrIasReducer from './prepareBasOrIasReducer';

export default class PrepareBasOrIasModule {
  constructor({
    integration, setRootView,
  }) {
    this.integration = integration;
    this.setRootView = setRootView;
    this.store = new Store(prepareBasOrIasReducer);
  }

  render = () => {
    const state = this.store.getState();
    const region = getRegion(state);

    const TaxActivityView = RegionToTaxActivityViewMapping[region];

    const wrappedView = (
      <Provider store={this.store}>
        <TaxActivityView />
      </Provider>
    );

    this.setRootView(wrappedView);
  }

  unsubscribeFromStore = () => {
    this.store.unsubscribeAll();
  }

  setInitialState = (context) => {
    const intent = SET_INITIAL_STATE;

    this.store.dispatch({
      intent,
      context,
    });
  }

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
