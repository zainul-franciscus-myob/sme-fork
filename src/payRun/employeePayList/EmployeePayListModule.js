import React from 'react';

import { isValidEtp } from './EmployeePayListSelectors';
import AlertType from '../types/AlertType';
import PayRunListEmployees from './components/PayRunListEmployees';
import createEmployeePayListDispatcher from './createEmployeePayListDispatcher';
import createEmployeePayListIntegrator from './createEmployeePayListIntegrator';

export default class EmployeePayListModule {
  constructor({ integration, store, pushMessage }) {
    this.store = store;
    this.pushMessage = pushMessage;
    this.dispatcher = createEmployeePayListDispatcher(store);
    this.integrator = createEmployeePayListIntegrator(store, integration);
  }

  openPreviousStepModal = () => this.dispatcher.openModal({
    type: 'previousStep',
  });

  changeEtpCodeCategory = ({ value }) => this.dispatcher.changeEtpCodeCategory({
    etpCodeCategory: value,
  });

  changeEtpCode = ({ value }) => this.dispatcher.changeEtpCode({
    etpCode: value,
  });

  saveEtp = () => {
    this.dispatcher.saveEtp();
    this.dispatcher.closeEtpModal();
  }

  nextStep = () => {
    const onSuccess = (invalidEtpNames) => {
      if (isValidEtp({ invalidEtpNames })) {
        this.dispatcher.nextStep();
      } else {
        this.dispatcher.validateEtp({ invalidEtpNames });
        this.dispatcher.setAlert({ type: AlertType.ETP_REQUIRED });
      }
    };

    const onFailure = () => {
      this.dispatcher.setAlert({ type: AlertType.ERROR, message: 'Failed to load validate ETP' });
    };

    this.integrator.validateEtp({ onSuccess, onFailure });
  }

  formatPayItemAndSendRecalculatePayRequest = ({
    employeeId, payItemId, key, value,
  }) => {
    this.dispatcher.formatEmployeePayItem({
      employeeId, payItemId, key, value,
    });

    this.dispatcher.setSubmittingState(true);
    const onSuccess = (recalculatedEmployeePay) => {
      this.dispatcher.setSubmittingState(false);
      this.dispatcher.updateEmployeeLineAfterRecalculation({ employeeId, recalculatedEmployeePay });
    };

    const onFailure = ({ message }) => {
      this.dispatcher.setSubmittingState(false);
      this.dispatcher.setAlert({ type: AlertType.ERROR, message });
    };

    this.integrator.recalculatePay({
      employeeId, payItemId, key, onSuccess, onFailure,
    });
  }

  getView() {
    return (
      <PayRunListEmployees
        onSelectRow={this.dispatcher.updateIsEmployeeSelected}
        onSelectAllRows={this.dispatcher.updateAreAllEmployeesSelected}
        onEmployeePayItemChange={this.dispatcher.updateEmployeePayItem}
        onEmployeePayItemBlur={this.formatPayItemAndSendRecalculatePayRequest}
        onPreviousButtonClick={this.openPreviousStepModal}
        onChangeEtpCodeCategory={this.changeEtpCodeCategory}
        onChangeEtpCode={this.changeEtpCode}
        onCloseEtpModal={this.dispatcher.closeEtpModal}
        onOpenEtpModal={this.dispatcher.openEtpModal}
        onSaveEtp={this.saveEtp}
        onNextButtonClick={this.nextStep}
      />
    );
  }
}
