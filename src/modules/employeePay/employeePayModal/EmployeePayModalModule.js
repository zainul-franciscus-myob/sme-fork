import { Provider } from 'react-redux';
import React from 'react';

import { getPayRunListUrl } from './EmployeePayModalSelectors';
import EmployeePayDetailModal from './components/EmployeePayModal';
import LoadingState from '../../../components/PageView/LoadingState';
import Store from '../../../store/Store';
import createEmployeePayModalDispatchers from './createEmployeePayModalDispatchers';
import createEmployeePayModalIntegrator from './createEmployeePayModalIntegrator';
import employeePayModalReducer from './employeePayModalReducer';

export default class EmployeePayModalModule {
  constructor({ integration, onDelete, featureToggles }) {
    this.store = new Store(employeePayModalReducer);
    this.onDelete = onDelete;
    this.dispatcher = createEmployeePayModalDispatchers(this.store);
    this.integrator = createEmployeePayModalIntegrator(this.store, integration);
    this.featureToggles = featureToggles;
  }

  loadEmployeePayDetail = () => {
    this.dispatcher.setIsModalLoading(LoadingState.LOADING);

    const onSuccess = (response) => {
      this.dispatcher.setEmployeePayDetails(response);
      this.dispatcher.setIsModalLoading(LoadingState.LOADING_SUCCESS);
    };

    const onFailure = () => {
      this.dispatcher.setIsModalLoading(LoadingState.LOADING_FAIL);
    };

    this.integrator.loadEmployeePayModal({ onSuccess, onFailure });
  };

  deleteEmployeePayDetail = () => {
    this.dispatcher.closeDeletePopover();
    this.dispatcher.setIsModalLoading(true);

    const onSuccess = ({ message }) => {
      this.closeModal();
      this.onDelete(message);
    };

    const onFailure = ({ message }) => {
      this.dispatcher.setAlertMessage(message);
      this.dispatcher.setIsModalLoading(false);
    };

    this.integrator.deleteEmployeePayModal({ onSuccess, onFailure });
  };

  loadEmployeePayReversalPreviewDetail = () => {
    this.dispatcher.setIsModalLoading(LoadingState.LOADING);

    const onSuccess = (response) => {
      this.dispatcher.setEmployeePayReversalDetails(response);
      this.dispatcher.setIsModalLoading(LoadingState.LOADING_SUCCESS);
    };

    const onFailure = () => {
      this.dispatcher.setIsModalLoading(LoadingState.LOADING_FAIL);
    };

    this.integrator.loadReversalEmployeePayModal({ onSuccess, onFailure });
  };

  sendReversalEmployeePay = () => {
    this.dispatcher.setIsModalLoading(LoadingState.LOADING);

    const onSuccess = () => {
      this.dispatcher.setIsModalLoading(LoadingState.LOADING_SUCCESS);
      window.location.href = getPayRunListUrl(this.store.getState());
    };

    const onFailure = (message) => {
      this.dispatcher.setAlertMessage(message);
      this.dispatcher.setIsModalLoading(LoadingState.LOADING_FAIL);
    };

    this.integrator.sendReversalEmployeePay({ onSuccess, onFailure });
  };

  openModal = ({
    transactionId, businessId, employeeName, region, readonly,
  }) => {
    this.dispatcher.setInitialState({
      transactionId, businessId, employeeName, region, readonly,
    });
    this.loadEmployeePayDetail();
    this.dispatcher.setIsOpen(true);
  };

  closeModal = () => {
    this.dispatcher.setIsOpen(false);
  };

  resetState = () => {
    this.dispatcher.resetState();
  };

  getView() {
    return (
      <Provider store={this.store}>
        <EmployeePayDetailModal
          onBackButtonClick={this.closeModal}
          onDeleteButtonClick={this.dispatcher.openDeletePopover}
          onDeletePopoverCancel={this.dispatcher.closeDeletePopover}
          onDeletePopoverDelete={this.deleteEmployeePayDetail}
          onReverseButtonClick={this.loadEmployeePayReversalPreviewDetail}
          onRecordReversalButtonClick={this.sendReversalEmployeePay}
          onCancelReversalButtonClick={this.closeModal}
          onDismissAlert={this.dispatcher.dismissAlert}
          featureToggles={this.featureToggles}
        />
      </Provider>
    );
  }
}
