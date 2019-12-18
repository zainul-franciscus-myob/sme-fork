import { Provider } from 'react-redux';
import React from 'react';

import { LOAD_PAY_SUPER_READ, SET_IS_LOADING } from './paySuperReadIntents';
import { RESET_STATE, SET_INITIAL_STATE } from '../../SystemIntents';
import {
  getBusinessEventId,
  getBusinessId,
  getPaySuperListUrl,
  getRegion,
} from './paySuperReadSelector';
import EmployeePayModalModule from '../../modules/employeePay/employeePayModal/EmployeePayModalModule';
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
    this.employeePayModal = new EmployeePayModalModule({
      integration,
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

  authorisePaySuperModal = () => {}

  reversePaySuperModal = () => {}

  render = () => {
    const modalComponent = this.employeePayModal.getView();
    const paySuperReadView = (
      <PaySuperReadView
        employeePayModal={modalComponent}
        onCancelClick={this.returnToList}
        onAuthoriseClick={this.authorisePaySuperModal}
        onReverseClick={this.reversePaySuperModal}
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
    this.employeePayModal.openModal({
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
