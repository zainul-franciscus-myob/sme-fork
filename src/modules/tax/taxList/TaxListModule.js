import { Provider } from 'react-redux';
import React from 'react';

import {
  SUCCESSFULLY_COMBINED_TAX_CODES,
  SUCCESSFULLY_SAVED_TAX_CODE,
} from '../../../common/types/MessageTypes';
import { getTaxCombineUrl } from './taxListSelectors';
import { isToggleOn } from '../../../splitToggle';
import AlertType from '../../../common/types/AlertType';
import FeatureToggle from '../../../FeatureToggles';
import LoadingState from '../../../components/PageView/LoadingState';
import Store from '../../../store/Store';
import TaxListView from './components/TaxListView';
import createTaxListDispatcher from './createTaxListDispatcher';
import createTaxListIntegrator from './createTaxListIntegrator';
import taxListReducer from './taxListReducer';

const messageTypes = [
  SUCCESSFULLY_SAVED_TAX_CODE,
  SUCCESSFULLY_COMBINED_TAX_CODES,
];

class TaxListModule {
  constructor({ integration, setRootView, popMessages, navigateTo }) {
    this.store = new Store(taxListReducer);
    this.setRootView = setRootView;
    this.dispatcher = createTaxListDispatcher(this.store);
    this.integrator = createTaxListIntegrator(this.store, integration);
    this.messageTypes = messageTypes;
    this.popMessages = popMessages;
    this.navigateTo = navigateTo;
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

  redirectToCombineTaxCodes = () => {
    const state = this.store.getState();
    const url = getTaxCombineUrl(state);

    this.navigateTo(url);
  };

  unsubscribeFromStore = () => this.store.unsubscribeAll();

  resetState = () => this.dispatcher.resetState();

  render = () =>
    this.setRootView(
      <Provider store={this.store}>
        <TaxListView
          onDismissAlert={this.dispatcher.dismissAlert}
          onCombineButtonClick={this.redirectToCombineTaxCodes}
        />
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
    const isTaxCombineEnabled = isToggleOn(FeatureToggle.TaxCodesCombine);

    this.dispatcher.setInitialState({
      ...context,
      isTaxDetailEnabled,
      isTaxCombineEnabled,
    });
    this.readMessages();
    this.render();
    this.loadTaxList();
  };
}

export default TaxListModule;
