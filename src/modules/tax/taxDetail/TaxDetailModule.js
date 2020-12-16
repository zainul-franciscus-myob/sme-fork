import { Provider } from 'react-redux';
import React from 'react';

import { getContactComboboxContext } from './taxDetailSelectors';
import ContactComboboxModule from '../../contact/contactCombobox/ContactComboboxModule';
import LoadingState from '../../../components/PageView/LoadingState';
import Store from '../../../store/Store';
import TaxDetailView from './components/TaxDetailView';
import createTaxDetailDispatcher from './createTaxDetailDispatcher';
import createTaxDetailIntegrator from './createTaxDetailIntegrator';
import taxDetailReducer from './taxDetailReducer';

class TaxDetailModule {
  constructor({ integration, setRootView }) {
    this.store = new Store(taxDetailReducer);
    this.setRootView = setRootView;
    this.dispatcher = createTaxDetailDispatcher(this.store);
    this.integrator = createTaxDetailIntegrator(this.store, integration);
    this.contactComboboxModule = new ContactComboboxModule({
      integration,
    });
  }

  loadTaxDetail = () => {
    this.dispatcher.setLoadingState(LoadingState.LOADING);

    const onSuccess = (payload) => {
      this.dispatcher.setLoadingState(LoadingState.LOADING_SUCCESS);
      this.dispatcher.loadTaxDetail(payload);
    };

    const onFailure = () => {
      this.dispatcher.setLoadingState(LoadingState.LOADING_FAIL);
    };

    this.integrator.loadTaxDetail({
      onSuccess,
      onFailure,
    });
  };

  loadContactCombobox = () => {
    const state = this.store.getState();
    const context = getContactComboboxContext(state);
    this.contactComboboxModule.run(context);
  };

  renderContactCombobox = (props) => {
    return this.contactComboboxModule
      ? this.contactComboboxModule.render(props)
      : null;
  };

  unsubscribeFromStore = () => this.store.unsubscribeAll();

  resetState = () => {
    this.contactComboboxModule.resetState();
    this.dispatcher.resetState();
  };

  render = () =>
    this.setRootView(
      <Provider store={this.store}>
        <TaxDetailView renderContactCombobox={this.renderContactCombobox} />
      </Provider>
    );

  run = (context) => {
    this.dispatcher.setInitialState(context);
    this.render();
    this.loadTaxDetail();
    this.loadContactCombobox();
  };
}

export default TaxDetailModule;
