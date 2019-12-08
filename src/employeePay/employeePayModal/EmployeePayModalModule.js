import { Provider } from 'react-redux';
import React from 'react';

import EmployeePayDetailModal from './components/EmployeePayModal';
import Store from '../../store/Store';
import createEmployeePayModalDispatchers from './createEmployeePayModalDispatchers';
import createEmployeePayModalIntegrator from './createEmployeePayModalIntegrator';
import employeePayModalReducer from './employeePayModalReducer';

export default class EmployeePayModalModule {
  constructor({
    integration,
  }) {
    this.store = new Store(employeePayModalReducer);
    this.dispatcher = createEmployeePayModalDispatchers(this.store);
    this.integrator = createEmployeePayModalIntegrator(this.store, integration);
  }

  loadEmployeePayDetail = () => {
    this.dispatcher.setIsModalLoading(true);

    const onSuccess = (response) => {
      this.dispatcher.setEmployeePayDetails(response);
      this.dispatcher.setIsModalLoading(false);
    };

    const onFailure = (message) => {
      console.log(`Failed to load Employee Pay detail ${message}`);
    };

    this.integrator.loadEmployeePayModal({ onSuccess, onFailure });
  };

  openModal = ({
    transactionId,
    businessId,
    employeeName,
    region,
  }) => {
    this.dispatcher.setInitialState({
      transactionId,
      businessId,
      employeeName,
      region,
    });
    this.loadEmployeePayDetail();
    this.dispatcher.setIsOpen(true);
  };

  closeModal = () => {
    this.dispatcher.setIsOpen(false);
  };

  getView() {
    return (
      <Provider store={this.store}>
        <EmployeePayDetailModal
          onBackButtonClick={this.closeModal}
          onDeleteButtonClick={this.dispatcher.openDeletePopover}
          onDeletePopoverCancel={this.dispatcher.closeDeletePopover}
          onDeletePopoverDelete={() => {}}
        />
      </Provider>
    );
  }
}
