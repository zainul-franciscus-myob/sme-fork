import { Provider } from 'react-redux';
import React from 'react';

import {
  LOAD_PAY_SUPER_READ, SET_ALERT, SET_IS_LOADING, SET_MODAL_TYPE,
} from './paySuperReadIntents';
import { RESET_STATE, SET_INITIAL_STATE } from '../../SystemIntents';
import {
  getBatchPaymentId,
  getBusinessEventId,
  getBusinessId,
  getPaySuperListUrl,
  getRegion,
} from './paySuperReadSelector';
import EmployeePayModalModule from '../../modules/employeePay/employeePayModal/EmployeePayModalModule';
import PaySuperAuthorisationModalModule from '../paySuperAuthorisationModal/PaySuperAuthorisationModalModule';
import PaySuperReadView from './components/PaySuperReadView';
import Store from '../../store/Store';
import paySuperReadReducer from './paySuperReadReducer';

export default class PaySuperReadModule {
  constructor({
    integration, setRootView,
  }) {
    this.integration = integration;
    this.store = new Store(paySuperReadReducer);
    this.setRootView = setRootView;
    this.subModules = {
      employeePayModal: new EmployeePayModalModule({
        integration,
      }),
      authorisationModal: new PaySuperAuthorisationModalModule({
        integration,
        onAuthoriseSuccess: this.onAuthoriseSuccess,
      }),
    };
  }

  onAuthoriseSuccess = (message) => {
    this.setAlert({
      type: 'success',
      message,
    });
    this.loadPaySuperRead();
  }

  setAlert = (alert) => {
    this.store.dispatch({
      intent: SET_ALERT,
      alert,
    });
  }

  setInitialState = (context) => {
    const intent = SET_INITIAL_STATE;
    this.store.dispatch({
      intent,
      context,
    });
  }

  setIsLoading = (isLoading) => {
    this.store.dispatch({
      intent: SET_IS_LOADING,
      isLoading,
    });
  }

  returnToList = () => {
    const state = this.store.getState();
    window.location.href = getPaySuperListUrl(state);
  }

  openModal = (modalType) => {
    this.store.dispatch({
      intent: SET_MODAL_TYPE,
      modalType,
    });
  }

  closeModal = () => {
    this.store.dispatch({
      intent: SET_MODAL_TYPE,
      modalType: null,
    });
  }

  openAuthorisePaySuperModal = () => {
    const state = this.store.getState();
    const context = {
      batchPaymentId: getBatchPaymentId(state),
      businessId: getBusinessId(state),
    };
    this.subModules.authorisationModal.openModal(context);
  }

  reversePaySuperModal = () => {}

  render = () => {
    const employeePayModal = this.subModules.employeePayModal.getView();
    const authorisationModal = this.subModules.authorisationModal.getView();

    const paySuperReadView = (
      <PaySuperReadView
        employeePayModal={employeePayModal}
        authorisationModal={authorisationModal}
        onCancelClick={this.returnToList}
        onAuthoriseClick={this.openAuthorisePaySuperModal}
        onReverseClick={this.reversePaySuper}
        onDateLinkClick={this.openEmployeePayModal}
      />
    );

    const wrappedView = (
      <Provider store={this.store}>
        {paySuperReadView}
      </Provider>
    );

    this.setRootView(wrappedView);
  }

  run = (context) => {
    this.setInitialState(context);
    this.render();
    this.loadPaySuperRead();
  }

  openEmployeePayModal = (transactionId, employeeName) => {
    const state = this.store.getState();
    this.subModules.employeePayModal.openModal({
      transactionId,
      employeeName,
      businessId: getBusinessId(state),
      region: getRegion(state),
    });
  }

  loadPaySuperRead = () => {
    const intent = LOAD_PAY_SUPER_READ;
    const state = this.store.getState();

    const urlParams = {
      businessId: getBusinessId(state),
      businessEventId: getBusinessEventId(state),
    };

    const onSuccess = (response) => {
      this.store.dispatch({
        intent,
        response,
      });
      this.setIsLoading(false);
    };
    const onFailure = ({ message }) => console.log(message);

    this.integration.read({
      intent,
      urlParams,
      onSuccess,
      onFailure,
    });
  }

  unsubscribeFromStore = () => {
    this.store.unsubscribeAll();
  }

  resetState = () => {
    const intent = RESET_STATE;
    this.store.dispatch({
      intent,
    });
  };
}
