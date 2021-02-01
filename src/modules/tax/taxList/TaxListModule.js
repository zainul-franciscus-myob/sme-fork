import { Provider } from 'react-redux';
import React from 'react';

import { SUCCESSFULLY_SAVED_TAX_CODE } from '../../../common/types/MessageTypes';
import { isToggleOn } from '../../../splitToggle';
import AlertType from '../../../common/types/AlertType';
import FeatureToggle from '../../../FeatureToggles';
import LoadingState from '../../../components/PageView/LoadingState';
import Store from '../../../store/Store';
import TaxListView from './components/TaxListView';
import createTaxListDispatcher from './createTaxListDispatcher';
import createTaxListIntegrator from './createTaxListIntegrator';
import taxListReducer from './taxListReducer';

const messageTypes = [SUCCESSFULLY_SAVED_TAX_CODE];

class TaxListModule {
  constructor({ integration, setRootView, popMessages }) {
    this.store = new Store(taxListReducer);
    this.setRootView = setRootView;
    this.dispatcher = createTaxListDispatcher(this.store);
    this.integrator = createTaxListIntegrator(this.store, integration);
    this.messageTypes = messageTypes;
    this.popMessages = popMessages;
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
        <TaxListView onDismissAlert={this.dispatcher.dismissAlert} />
      </Provider>
    );

  readMessages = () => {
    const [successMessage] = this.popMessages(this.messageTypes);
    if (successMessage) {
      const { content: message } = successMessage;
      this.dispatcher.setAlert({ type: AlertType.SUCCESS, message });
    }
  };

  run = (context) => {
    const isTaxDetailEnabled = isToggleOn(FeatureToggle.TaxCodesDetail);

    this.dispatcher.setInitialState({ ...context, isTaxDetailEnabled });
    this.readMessages();
    this.render();
    this.loadTaxList();
  };
}

export default TaxListModule;
