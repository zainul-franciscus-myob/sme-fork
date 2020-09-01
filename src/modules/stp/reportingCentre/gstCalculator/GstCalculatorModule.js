import { Provider } from 'react-redux';
import React from 'react';

import GstCalculatorView from './component/GstCalculatorView';
import LoadingState from '../../../../components/PageView/LoadingState';
import Store from '../../../../store/Store';
import createGstCalculatorDispatcher from './createGstCalculatorDispatcher';
import createGstCalculatorIntegrator from './createGstCalculatorIntegrator';
import gstCalculatorReducer from './GstCalculatorReducer';

export default class GstCalculatorModule {
  constructor({ integration, context, setAlert, pushMessage }) {
    this.store = new Store(gstCalculatorReducer);

    this.dispatcher = createGstCalculatorDispatcher(this.store);
    this.integrator = createGstCalculatorIntegrator(this.store, integration);
    this.setAlert = setAlert;
    this.pushMessage = pushMessage;
    this.dispatcher.setInitialState(context);
  }

  run = () => {};

  calculateTurnover = () => {
    this.dispatcher.setLoadingState(LoadingState.LOADING);
    this.dispatcher.setDirtyFlag();

    const onSuccess = (response) => {
      this.dispatcher.setTurnoverResult(response);
      this.dispatcher.setLoadingState(LoadingState.LOADING_SUCCESS);
    };

    const onFailure = ({ message }) => {
      this.dispatcher.setLoadingState(LoadingState.LOADING_SUCCESS);
      this.setAlert({ type: 'danger', message });
    };

    this.integrator.calculateTurnover({ onSuccess, onFailure });
  };

  getView() {
    return (
      <Provider store={this.store}>
        <GstCalculatorView
          onCalculate={this.calculateTurnover}
          onFormChange={this.dispatcher.updateFormData}
        />
      </Provider>
    );
  }
}
