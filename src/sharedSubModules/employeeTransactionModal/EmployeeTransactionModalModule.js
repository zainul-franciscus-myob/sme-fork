import React from 'react';

import {
  LOAD_EMPLOYEE_PAY_DETAIL,
  SET_DELETE_POPOVER_IS_OPEN,
  SET_IS_MODAL_LOADING,
} from './EmployeeTransactionModalIntents';
import { SET_INITIAL_STATE } from '../../SystemIntents';
import { getUrlParams } from './EmployeeTransactionModalSelectors';
import EmployeePayDetailModal from './components/EmployeePayDetailModal';

export default class EmployeeTransactionModalModule {
  constructor({
    integration, store,
  }) {
    this.integration = integration;
    this.store = store;
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
      intent: SET_INITIAL_STATE,
      context,
    });
  }

  getView(onBackButtonClick) {
    return (
      <EmployeePayDetailModal
        onBackButtonClick={onBackButtonClick}
        onDeleteButtonClick={this.openDeletePopover}
        onDeletePopoverCancel={this.closeDeletePopover}
        onDeletePopoverDelete={() => {}}
        deletePopoverIsOpen={false}
      />
    );
  }

  run = (context) => {
    this.setInitialState(context);
    this.loadEmployeePayDetail();
  }
}
