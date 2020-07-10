import { Provider } from 'react-redux';
import React from 'react';

import { SUCCESSFULLY_DELETED_ELECTRONIC_PAYMENT } from '../electronicPaymentMesssageTypes';
import { getTransactionListUrl } from './ElectronicPaymentsReadSelector';
import ElectronicPaymentsReadView from './components/ElectronicPaymentsReadView';
import LoadingState from '../../../components/PageView/LoadingState';
import Store from '../../../store/Store';
import createElectronicPaymentsReadDispatcher from './createElectronicPaymentsReadDispatcher';
import createElectronicPaymentsReadIntegrator from './createEelctronicPaymentsReadIntegrator';
import electronicPaymentReadReducer from './electronicPaymentsReadReducer';

export default class ElectronicPaymentsReadModule {
  constructor({ setRootView, integration, pushMessage }) {
    this.setRootView = setRootView;
    this.integration = integration;
    this.pushMessage = pushMessage;
    this.store = new Store(electronicPaymentReadReducer);
    this.integrator = createElectronicPaymentsReadIntegrator(
      this.store,
      this.integration
    );
    this.dispatcher = createElectronicPaymentsReadDispatcher(this.store);
  }

  goBack = () => {
    window.history.back();
  };

  loadElectronicPaymentDetails = () => {
    this.dispatcher.setLoadingState(LoadingState.LOADING);

    const onSuccess = (response) => {
      this.dispatcher.setElectronicPayment(response);
      this.dispatcher.setLoadingState(LoadingState.LOADING_SUCCESS);
    };

    const onFailure = () => {
      this.dispatcher.setLoadingState(LoadingState.LOADING_FAIL);
    };

    this.integrator.loadElectronicPaymentDetails({ onSuccess, onFailure });
  };

  deleteElectronicPayment = () => {
    this.dispatcher.closeDeleteModal();
    this.dispatcher.setLoadingState(LoadingState.LOADING);

    const onSuccess = ({ message }) => {
      this.pushMessage({
        type: SUCCESSFULLY_DELETED_ELECTRONIC_PAYMENT,
        content: message,
      });
      window.location.href = getTransactionListUrl(this.store.getState());
    };

    const onFailure = ({ message }) => {
      this.dispatcher.setAlertMessage(message);
      this.dispatcher.setLoadingState(LoadingState.LOADING_FAIL);
    };

    this.integrator.deleteElectronicPayment({ onSuccess, onFailure });
  };

  setInitialState = (context) => {
    this.dispatcher.setInitialState(context);
  };

  unsubscribeFromStore = () => {
    this.store.unsubscribeAll();
  };

  resetState = () => {
    this.dispatcher.resetState();
  };

  run(context) {
    this.setInitialState(context);
    this.render();
    this.loadElectronicPaymentDetails();
  }

  render = () => {
    const wrappedView = (
      <Provider store={this.store}>
        <ElectronicPaymentsReadView
          onGoBackClick={this.goBack}
          onDeleteButtonClick={this.dispatcher.openDeleteModal}
          onDeleteConfirmButtonClick={this.deleteElectronicPayment}
          onDeleteCancelButtonClick={this.dispatcher.closeDeleteModal}
          onDismissAlert={this.dispatcher.dismissAlert}
        />
      </Provider>
    );

    this.setRootView(wrappedView);
  };
}
