import { Provider } from 'react-redux';
import React from 'react';

import { SUCCESSFULLY_COMBINED_TAX_CODES } from '../../../common/types/MessageTypes';
import { getTaxCodeListUrl } from './taxCombineSelectors';
import AlertType from '../../../common/types/AlertType';
import LoadingState from '../../../components/PageView/LoadingState';
import Store from '../../../store/Store';
import TaxCombineView from './components/TaxCombineView';
import createTaxCombineDispatcher from './createTaxCombineDispatcher';
import createTaxCombineIntegrator from './createTaxCombineIntegrator';
import taxCombineReducer from './taxCombineReducer';

class TaxCombineModule {
  constructor({ integration, setRootView, navigateTo, pushMessage }) {
    this.store = new Store(taxCombineReducer);
    this.setRootView = setRootView;
    this.dispatcher = createTaxCombineDispatcher(this.store);
    this.integrator = createTaxCombineIntegrator(this.store, integration);
    this.navigateTo = navigateTo;
    this.pushMessage = pushMessage;
  }

  loadTaxCombine = () => {
    this.dispatcher.setLoadingState(LoadingState.LOADING);

    const onSuccess = (payload) => {
      this.dispatcher.setLoadingState(LoadingState.LOADING_SUCCESS);
      this.dispatcher.loadTaxCombine(payload);
    };

    const onFailure = () => {
      this.dispatcher.setLoadingState(LoadingState.LOADING_FAIL);
    };

    this.integrator.loadTaxCombine({
      onSuccess,
      onFailure,
    });
  };

  updateCombineField = ({ key, value }) => {
    this.dispatcher.updateCombineField(key, value);
  };

  combineTaxCodes = () => {
    this.dispatcher.closeModal();
    this.dispatcher.setIsSubmitting(true);

    const onSuccess = ({ message }) => {
      this.pushMessage({
        type: SUCCESSFULLY_COMBINED_TAX_CODES,
        content: message,
      });

      this.redirectToTaxCodeList();
    };

    const onFailure = ({ message }) => {
      this.dispatcher.setIsSubmitting(false);
      this.dispatcher.setAlert({ type: AlertType.DANGER, message });
    };

    this.integrator.combineTaxCodes({ onSuccess, onFailure });
  };

  redirectToTaxCodeList = () => {
    const state = this.store.getState();
    const url = getTaxCodeListUrl(state);

    this.navigateTo(url);
  };

  redirectToUrl = (url) => {
    if (url) {
      this.navigateTo(url);
    } else {
      this.redirectToTaxCodeList();
    }
  };

  unsubscribeFromStore = () => this.store.unsubscribeAll();

  resetState = () => this.dispatcher.resetState();

  render = () =>
    this.setRootView(
      <Provider store={this.store}>
        <TaxCombineView
          onCancelButtonClick={this.redirectToTaxCodeList}
          onCombineButtonClick={this.dispatcher.openModal}
          onCloseModal={this.dispatcher.closeModal}
          onConfirmCombine={this.combineTaxCodes}
          onDismissAlert={this.dispatcher.dismissAlert}
          onChange={this.updateCombineField}
        />
      </Provider>
    );

  run = (context) => {
    this.dispatcher.setInitialState(context);
    this.render();
    this.loadTaxCombine();
  };

  handlePageTransition = (url) => {
    this.redirectToUrl(url);
  };
}

export default TaxCombineModule;
