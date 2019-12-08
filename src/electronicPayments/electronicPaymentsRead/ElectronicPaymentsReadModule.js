import { Provider } from 'react-redux';
import React from 'react';

import {
  DELETE_ELECTRONIC_PAYMENT,
  LOAD_ELECTRONIC_PAYMENT_DETAILS,
} from './ElectronicPaymentsReadIntents';
import { RESET_STATE, SET_INITIAL_STATE } from '../../SystemIntents';
import {
  SET_ALERT,
  SET_LOADING_STATE,
  SET_TABLE_LOADING_STATE,
} from '../ElectronicPaymentsIntents';
import {
  getBusinessId,
  getElectronicPaymentId,
  getRegion,
} from '../ElectronicPaymentsSelector';
import ElectronicPaymentsReadView from './components/ElectronicPaymentsReadView';
import EmployeePayModalModule from '../../employeePay/employeePayModal/EmployeePayModalModule';
import Store from '../../store/Store';
import electronicPaymentReadReducer from './electronicPaymentsReadReducer';

export default class ElectronicPaymentsReadModule {
  constructor({
    setRootView,
    integration,
  }) {
    this.setRootView = setRootView;
    this.store = new Store(electronicPaymentReadReducer);
    this.integration = integration;
    this.employeePayModal = new EmployeePayModalModule({
      integration,
    });
  }

  run(context) {
    this.setInitialState(context);
    this.render();
    this.loadElectronicPaymentDetails();
  }

  setIsLoading(isLoading) {
    this.store.dispatch({
      intent: SET_LOADING_STATE,
      isLoading,
    });
  }

  setIsTableLoading(isTableLoading) {
    this.store.dispatch({
      intent: SET_TABLE_LOADING_STATE,
      isTableLoading,
    });
  }

  goBack = () => {
    window.history.back();
  }

  loadElectronicPaymentDetails = () => {
    this.setIsLoading(true);
    const state = this.store.getState();
    const urlParams = {
      businessId: getBusinessId(state),
      electronicPaymentId: getElectronicPaymentId(state),
    };
    const onSuccess = (response) => {
      this.store.dispatch({
        intent: LOAD_ELECTRONIC_PAYMENT_DETAILS,
        response,
      });
      this.setIsLoading(false);
      this.setIsTableLoading(false);
    };
    const onFailure = () => { };
    this.integration.read({
      urlParams,
      onSuccess,
      onFailure,
      intent: LOAD_ELECTRONIC_PAYMENT_DETAILS,
    });
  }

  redirectToTransactionList = () => {
    const state = this.store.getState();
    const businessId = getBusinessId(state);
    const region = getRegion(state);

    return `/#/${region}/${businessId}/transactionList`;
  };

  setAlertMessage = (alertMessage) => {
    this.store.dispatch({
      intent: SET_ALERT,
      alertMessage,
    });
  }

  deleteElectronicPayment = () => {
    this.setIsLoading(true);
    const state = this.store.getState();
    const urlParams = {
      businessId: getBusinessId(state),
      electronicPaymentId: getElectronicPaymentId(state),
    };
    const onSuccess = () => {
      window.location.href = this.redirectToTransactionList();
    };

    const onFailure = ({ message }) => {
      this.setIsTableLoading(false);
      this.setAlertMessage(message);
    };

    this.integration.write({
      urlParams,
      onSuccess,
      onFailure,
      intent: DELETE_ELECTRONIC_PAYMENT,
    });
  }

  setInitialState = (context) => {
    this.store.dispatch({
      intent: SET_INITIAL_STATE,
      context,
    });
  };

  openEmployeePayModal = (transactionId, employeeName) => {
    const state = this.store.getState();
    this.employeePayModal.openModal({
      transactionId,
      employeeName,
      businessId: getBusinessId(state),
      region: getRegion(state),
    });
  }

  render = () => {
    const modalComponent = this.employeePayModal.getView();

    const view = (
      <ElectronicPaymentsReadView
        onGoBackClick={this.goBack}
        onDeleteButtonClick={this.deleteElectronicPayment}
        employeePayModal={modalComponent}
        onReferenceNumberClick={this.openEmployeePayModal}
      />
    );

    const wrappedView = (
      <Provider store={this.store}>
        {view}
      </Provider>
    );
    this.setRootView(wrappedView);
  }

  unsubscribeFromStore = () => {
    this.store.unsubscribeAll();
  }

  resetState = () => {
    this.store.dispatch({
      intent: RESET_STATE,
    });
  }
}
