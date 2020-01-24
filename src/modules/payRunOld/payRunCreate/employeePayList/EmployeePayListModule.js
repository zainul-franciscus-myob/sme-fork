import React from 'react';

import { SUCCESSFULLY_SAVED_DRAFT_PAY_RUN } from '../../payRunMessageTypes';
import { getIsPayItemLineDirty, getTotals, isValidEtp } from './EmployeePayListSelectors';
import { getPayRunListUrl } from '../PayRunSelectors';
import AlertType from '../types/AlertType';
import LoadingState from '../../../../components/PageView/LoadingState';
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

  changeEtpCodeCategory = ({ value }) => this.dispatcher.changeEtpCodeCategory({
    etpCodeCategory: value,
  });

  changeEtpCode = ({ value }) => this.dispatcher.changeEtpCode({
    etpCode: value,
  });

  saveEtp = () => {
    this.dispatcher.saveEtp();
    this.dispatcher.closeEtpModal();
  };

  saveDraftAndRedirect = () => {
    const state = this.store.getState();
    this.dispatcher.setLoadingState(LoadingState.LOADING);

    const onSuccess = ({ message }) => {
      this.pushMessage({
        type: SUCCESSFULLY_SAVED_DRAFT_PAY_RUN,
        content: message,
      });
      window.location.href = getPayRunListUrl(state);
      this.dispatcher.setLoadingState(LoadingState.LOADING_SUCCESS);
    };

    const onFailure = () => {
      this.dispatcher.setAlert({
        type: AlertType.ERROR,
        message: 'Failed to save the draft',
      });
      this.dispatcher.setLoadingState(LoadingState.LOADING_SUCCESS);
    };

    this.integrator.saveDraft({ onSuccess, onFailure });
  };

  saveDraft = () => {
    const doNothing = () => {};
    this.integrator.saveDraft({ onSuccess: doNothing, onFailure: doNothing });
  };

  nextStep = () => {
    this.saveDraft();
    return this.validatePayPeriodEmployeeLimit(
      () => this.validateEtp(
        () => this.dispatcher.nextStep(),
      ),
    );
  };

  validatePayPeriodEmployeeLimit = (next) => {
    this.dispatcher.setLoadingState(LoadingState.LOADING);

    const onSuccess = (payPeriodLimit) => {
      this.dispatcher.updatePayPeriodEmployeeLimit(payPeriodLimit);
      if (payPeriodLimit.used > payPeriodLimit.limit) {
        this.dispatcher.showUpgradeModal();
      } else {
        next();
      }
    };

    const onFailure = () => {
      this.dispatcher.setAlert({
        type: AlertType.ERROR,
        message: 'Failed to validate employee payroll eligibility',
      });
      this.dispatcher.setLoadingState(LoadingState.LOADING_SUCCESS);
    };

    this.integrator.validatePayPeriodEmployeeLimit({ onSuccess, onFailure });
  };

  validateEtp = (next) => {
    this.dispatcher.setLoadingState(LoadingState.LOADING);

    const onSuccess = (invalidEtpNames) => {
      if (isValidEtp({ invalidEtpNames })) {
        const state = this.store.getState();
        const { netPay } = getTotals(state);
        this.dispatcher.setTotalNetPay(netPay);
        this.dispatcher.dismissAlert();
        this.dispatcher.setLoadingState(LoadingState.LOADING_SUCCESS);
        next();
      } else {
        this.dispatcher.validateEtp({ invalidEtpNames });
        this.dispatcher.setAlert({ type: AlertType.ETP_REQUIRED });
        this.dispatcher.setLoadingState(LoadingState.LOADING_SUCCESS);
      }
    };

    const onFailure = () => {
      this.dispatcher.setLoadingState(LoadingState.LOADING_SUCCESS);
      this.dispatcher.setAlert({ type: AlertType.ERROR, message: 'Failed to load validate ETP' });
    };

    this.integrator.validateEtp({ onSuccess, onFailure });
  };

  changeEmployeePayItem = ({
    employeeId, payItemId, key, value,
  }) => {
    this.dispatcher.setPayItemLineDirty(true);
    this.dispatcher.updateEmployeePayItem({
      employeeId, payItemId, key, value,
    });
  };

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
  };

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
  };

  redirectToSubscriptionSettings = () => {
    const state = this.store.getState();
    const { businessId } = state;
    const { region } = state;

    window.location.href = `/#/${region}/${businessId}/settings/subscription`;
  };

  getView() {
    return (
      <PayRunListEmployees
        onSelectRow={this.dispatcher.updateIsEmployeeSelected}
        onSelectAllRows={this.dispatcher.updateAreAllEmployeesSelected}
        onEmployeePayItemChange={this.changeEmployeePayItem}
        onEmployeePayItemBlur={this.updateEmployeePay}
        onPreviousButtonClick={this.dispatcher.openPreviousStepModal}
        onChangeEtpCodeCategory={this.changeEtpCodeCategory}
        onChangeEtpCode={this.changeEtpCode}
        onCloseEtpModal={this.dispatcher.closeEtpModal}
        onOpenEtpModal={this.dispatcher.openEtpModal}
        onSaveEtp={this.saveEtp}
        onNextButtonClick={this.nextStep}
        onUpgradeModalUpgradeButtonClick={this.redirectToSubscriptionSettings}
        onUpgradeModalDismiss={this.dispatcher.hideUpgradeModal}
        onSaveAndCloseButtonClick={this.saveDraftAndRedirect}
      />
    );
  }
}
