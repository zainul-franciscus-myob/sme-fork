import { Provider } from 'react-redux';
import React from 'react';

import {
  LOAD_EMPLOYEE_PAY_DETAIL,
  SET_DELETE_POPOVER_IS_OPEN,
  SET_INITIAL_MODAL_STATE,
  SET_IS_MODAL_LOADING,
  SET_MODAL_IS_OPEN,
} from './EmployeeTransactionModalIntents';
import { getUrlParams } from './EmployeeTransactionModalSelectors';
import EmployeePayDetailModal from './components/EmployeePayDetailModal';
import Store from '../../store/Store';
import employeeTransactionModalReducer from './employeeTransactionModalReducer';

export default class EmployeeTransactionModalModule {
  constructor({
    integration,
  }) {
    this.integration = integration;
    this.store = new Store(employeeTransactionModalReducer);
    this.setInitialState({});
  }

  loadEmployeePayDetail = () => {
    this.setIsModalLoading(true);
    const state = this.store.getState();
    const urlParams = getUrlParams(state);
    const onSuccess = (employeeDetails) => {
      this.store.dispatch({
        intent: LOAD_EMPLOYEE_PAY_DETAIL,
        employeeDetails,
      });
      this.setIsModalLoading(false);
    };

    const onFailure = message => console.log(message);

    this.integration.read({
      onSuccess,
      onFailure,
      urlParams,
      intent: LOAD_EMPLOYEE_PAY_DETAIL,
    });
  };

  setIsModalLoading = (isLoading) => {
    this.store.dispatch({
      intent: SET_IS_MODAL_LOADING,
      isLoading,
    });
  }

  setIsOpen = (isOpen) => {
    this.store.dispatch({
      intent: SET_MODAL_IS_OPEN,
      isOpen,
    });
  }

  openModal = ({ transactionId, businessId, employeeName }) => {
    this.setInitialState({ transactionId, businessId, employeeName });
    this.loadEmployeePayDetail();
    this.setIsOpen(true);
  }

  closeModal = () => this.setIsOpen(false);

  closeDeletePopover = () => {
    this.store.dispatch({
      intent: SET_DELETE_POPOVER_IS_OPEN,
      deletePopoverIsOpen: false,
    });
  }

  openDeletePopover = () => {
    this.store.dispatch({
      intent: SET_DELETE_POPOVER_IS_OPEN,
      deletePopoverIsOpen: true,
    });
  }

  setInitialState = (context) => {
    this.store.dispatch({
      intent: SET_INITIAL_MODAL_STATE,
      context,
    });
  }

  getView() {
    return (
      <Provider store={this.store}>
        <EmployeePayDetailModal
          onBackButtonClick={this.closeModal}
          onDeleteButtonClick={this.openDeletePopover}
          onDeletePopoverCancel={this.closeDeletePopover}
          onDeletePopoverDelete={() => {}}
          deletePopoverIsOpen={false}
        />
      </Provider>
    );
  }
}
