import { Provider } from 'react-redux';
import React from 'react';

import LoadingState from '../../../components/PageView/LoadingState';
import Store from '../../../store/Store';
import TaxListView from './components/TaxListView';
import createTaxListDispatcher from './createTaxListDispatcher';
import createTaxListIntegrator from './createTaxListIntegrator';
import taxListReducer from './taxListReducer';

class TaxListModule {
  constructor({ integration, setRootView }) {
    this.store = new Store(taxListReducer);
    this.setRootView = setRootView;
    this.dispatcher = createTaxListDispatcher(this.store);
    this.integrator = createTaxListIntegrator(this.store, integration);
  }

  loadTaxList = () => {
    const onSuccess = (response) => {
      this.dispatcher.setLoadingState(LoadingState.LOADING_SUCCESS);
      this.dispatcher.loadTaxList(response);
    };
    const onFailure = () => {
      this.dispatcher.setLoadingState(LoadingState.LOADING_FAIL);
    };

    this.dispatcher.setLoadingState(LoadingState.LOADING);
    this.integrator.loadTaxList({ onSuccess, onFailure });
  };

  unsubscribeFromStore = () => this.store.unsubscribeAll();

  resetState = () => this.dispatcher.resetState();

  render = () =>
    this.setRootView(
      <Provider store={this.store}>
        <TaxListView />
      </Provider>
    );

  run = (context) => {
    this.dispatcher.setInitialState(context);
    this.render();
    this.loadTaxList();
  };
}

export default TaxListModule;
