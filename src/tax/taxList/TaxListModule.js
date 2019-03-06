import { Provider } from 'react-redux';
import React from 'react';

import { LOAD_TAX_LIST, SET_LOADING_STATE } from '../TaxIntents';
import { RESET_STATE, SET_INITIAL_STATE } from '../../SystemIntents';
import { getBusinessId } from './taxListSelectors';
import Store from '../../store/Store';
import TaxListView from './components/TaxListView';
import taxListReducer from './taxListReducer';

class TaxListModule {
  constructor({
    integration, setRootView,
  }) {
    this.integration = integration;
    this.store = new Store(taxListReducer);
    this.setRootView = setRootView;
  }

  setLoadingState = isLoading => this.store.dispatch({
    intent: SET_LOADING_STATE,
    isLoading,
  });

  loadTaxList = () => {
    const intent = LOAD_TAX_LIST;
    const urlParams = {
      businessId: getBusinessId(this.store.getState()),
    };
    const onSuccess = ({ entries }) => {
      this.setLoadingState(false);
      this.store.dispatch({
        intent,
        entries,
      });
    };
    const onFailure = () => {
      console.log('Failed to load tax list entries');
    };

    this.setLoadingState(true);
    this.integration.read({
      intent,
      urlParams,
      onSuccess,
      onFailure,
    });
  }

  unsubscribeFromStore = () => this.store.unsubscribeAll();

  resetState = () => this.store.dispatch({ intent: RESET_STATE });

  setInitialState = (context) => {
    const intent = SET_INITIAL_STATE;

    this.store.dispatch({
      intent,
      context,
    });
  }

  render = () => this.setRootView(
    <Provider store={this.store}>
      <TaxListView />
    </Provider>,
  );

  run = (context) => {
    this.setInitialState(context);
    this.render();
    this.loadTaxList();
  }
}

export default TaxListModule;
