import React from 'react';

import { SET_UPGRADE_MODAL_SHOWING } from '../PayRunIntents';
import { getIsPayItemLineDirty, getTotals, isValidEtp } from './EmployeePayListSelectors';
import { getPayRunListUrl } from '../../../payRunOld/payRunCreate/PayRunSelectors';
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

  openPreviousStepModal = () => this.dispatcher.openPreviousStepModal();

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

  saveDraftAndRedirect = () => {
    const state = this.store.getState();
    window.location.href = getPayRunListUrl(state);
    // TODO: save the draft - Shohre
  }

  nextStep = () => (
    this.validatePayPeriodEmployeeLimit(
      () => this.validateEtp(
        () => this.dispatcher.nextStep(),
      ),
    )
  )

  validatePayPeriodEmployeeLimit = next => (
    this.integrator.validatePayPeriodEmployeeLimit({
      onSuccess: (payPeriodLimit) => {
        this.dispatcher.updatePayPeriodEmployeeLimit(payPeriodLimit);
        if (payPeriodLimit.used > payPeriodLimit.limit) {
          this.showUpgradeModal();
        } else {
          next();
        }
      },
      onFailure: () => (
        this.dispatcher.setAlert({
          type: AlertType.ERROR,
          message: 'Failed to validate employee payroll eligibility',
        })
      ),
    })
  )

  validateEtp = next => (
    this.integrator.validateEtp({
      onSuccess: (invalidEtpNames) => {
        if (isValidEtp({ invalidEtpNames })) {
          const state = this.store.getState();
          const { netPay } = getTotals(state);
          this.dispatcher.setTotalNetPay(netPay);
          this.dispatcher.dismissAlert();
          next();
        } else {
          this.dispatcher.validateEtp({ invalidEtpNames });
          this.dispatcher.setAlert({ type: AlertType.ETP_REQUIRED });
        }
      },
      onFailure: () => {
        this.dispatcher.setAlert({ type: AlertType.ERROR, message: 'Failed to load validate ETP' });
      },
    })
  )

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

  showUpgradeModal = () => {
    this.store.dispatch({
      intent: SET_UPGRADE_MODAL_SHOWING,
      isUpgradeModalShowing: true,
    });
  };

  hideUpgradeModal = () => {
    this.store.dispatch({
      intent: SET_UPGRADE_MODAL_SHOWING,
      isUpgradeModalShowing: false,
    });
  };

  redirectToSubscriptionSettings = () => {
    const state = this.store.getState();
    const { businessId } = state;
    const { region } = state;

    window.location.href = `/#/${region}/${businessId}/settings/subscription`;
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
        onUpgradeModalUpgradeButtonClick={this.redirectToSubscriptionSettings}
        onUpgradeModalDismiss={this.hideUpgradeModal}
        onSaveAndCloseButtonClick={this.saveDraftAndRedirect}
      />
    );
  }
}
