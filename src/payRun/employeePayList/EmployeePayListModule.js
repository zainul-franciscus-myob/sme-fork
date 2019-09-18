import React from 'react';

import { getIsPayItemLineDirty, isValidEtp } from './EmployeePayListSelectors';
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
        this.dispatcher.dismissAlert();
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

  changeEmployeePayItem = ({
    employeeId, payItemId, key, value,
  }) => {
    this.dispatcher.setPayItemLineDirty(true);
    this.dispatcher.updateEmployeePayItem({
      employeeId, payItemId, key, value,
    });
  }

  updateEmployeePay = ({
    employeeId, payItemId, key, value,
  }) => {
    const state = this.store.getState();
    const isPayItemLineDirty = getIsPayItemLineDirty(state);

    if (isPayItemLineDirty) {
      this.dispatcher.formatEmployeePayItem({
        employeeId, payItemId, key, value,
      });
      this.recalculateEmployeePay({
        employeeId, payItemId, key,
      });
    }
  }

  recalculateEmployeePay = ({
    employeeId, payItemId, key,
  }) => {
    this.dispatcher.setSubmittingState(true);
    const onSuccess = (recalculatedEmployeePay) => {
      this.dispatcher.setSubmittingState(false);
      this.dispatcher.setPayItemLineDirty(false);
      this.dispatcher.updateEmployeeLineAfterRecalculation({ employeeId, recalculatedEmployeePay });
    };

    const onFailure = ({ message }) => {
      this.dispatcher.setSubmittingState(false);
      this.dispatcher.setPayItemLineDirty(false);
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
        onEmployeePayItemChange={this.changeEmployeePayItem}
        onEmployeePayItemBlur={this.updateEmployeePay}
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
