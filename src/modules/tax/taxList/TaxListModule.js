import { Provider } from 'react-redux';
import React from 'react';

import { LOAD_TAX_LIST, SET_LOADING_STATE } from '../TaxIntents';
import { RESET_STATE, SET_INITIAL_STATE } from '../../../SystemIntents';
import { getBusinessId } from './taxListSelectors';
import LoadingState from '../../../components/PageView/LoadingState';
import Store from '../../../store/Store';
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

  setLoadingState = loadingState => this.store.dispatch({
    intent: SET_LOADING_STATE,
    loadingState,
  });

  loadTaxList = () => {
    const intent = LOAD_TAX_LIST;
    const urlParams = {
      businessId: getBusinessId(this.store.getState()),
    };
    const onSuccess = ({ entries }) => {
      this.setLoadingState(LoadingState.LOADING_SUCCESS);
      this.store.dispatch({
        intent,
        entries,
      });
    };
    const onFailure = () => {
      this.setLoadingState(LoadingState.LOADING_FAIL);
    };

    this.setLoadingState(LoadingState.LOADING);
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
