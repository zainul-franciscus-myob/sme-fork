import React from 'react';

import { SUCCESSFULLY_SAVED_DRAFT_PAY_RUN } from '../../payRunMessageTypes';
import {
  getIsPageEdited,
  getIsPayItemLineDirty,
  getJobAmount,
  getJobListModalLoadingState,
  getJobOptions,
  getSelectedEmployeeId,
  getSelectedPayItem,
  getTotals,
  isValidEtp,
} from './EmployeePayListSelectors';
import { getPayRunListUrl } from '../PayRunSelectors';
import AlertType from '../types/AlertType';
import LoadingState from '../../../../components/PageView/LoadingState';
import PayRunListEmployees from './components/PayRunListEmployees';
import createEmployeePayListDispatcher from './createEmployeePayListDispatcher';
import createEmployeePayListIntegrator from './createEmployeePayListIntegrator';

export default class EmployeePayListModule {
  constructor({
    integration, store, pushMessage, subscribeOrUpgrade,
  }) {
    this.store = store;
    this.pushMessage = pushMessage;
    this.dispatcher = createEmployeePayListDispatcher(store);
    this.integrator = createEmployeePayListIntegrator(store, integration);
    this.pendingNavigateFunction = null;
    this.subscribeOrUpgrade = subscribeOrUpgrade;
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
      this.dispatcher.setLoadingState(LoadingState.LOADING_SUCCESS);
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

  loadDetailJobList = () => {
    const state = this.store.getState();
    if (getJobListModalLoadingState(state) === LoadingState.LOADING) {
      const onSuccess = (payload) => {
        this.dispatcher.setJobListModalLoadingState(LoadingState.LOADING_SUCCESS);
        this.dispatcher.loadDetailJobList(payload);
      };

      const onFailure = () => {
        this.dispatcher.setJobListModalLoadingState(LoadingState.LOADING_FAIL);
      };

      this.integrator.loadDetailJobList({ onSuccess, onFailure });
    }
  }

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

  openJobListModal = ({ payItem, employeeId }) => {
    this.dispatcher.openJobListModal({ payItem, employeeId });
    this.loadDetailJobList();
  };

  setEmployeeNote = ({ employeeId, note }) => {
    this.dispatcher.updateEmployeeNote({
      employeeId, note,
    });
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
        onUpgradeModalUpgradeButtonClick={this.subscribeOrUpgrade}
        onUpgradeModalDismiss={this.dispatcher.hideUpgradeModal}
        onSaveAndCloseButtonClick={this.saveDraftAndRedirect}
        onUnsavedModalSave={this.saveDraftAndNavigateAway}
        onUnsavedModalDiscard={this.onUnsavedModalDiscard}
        onUnsavedModalCancel={this.closeUnsavedModal}
        onAddJob={this.openJobListModal}
        onAddJobSave={this.jobListEditSave}
        onAddJobCancel={this.dispatcher.closeJobListModal}
        onAddJobCheckboxChange={this.onAddJobCheckboxChange}
        onAddJobAmountChange={this.onAddJobAmountChange}
        onAddJobAmountBlur={this.onAddJobAmountBlur}
        onAllJobsCheckboxChange={this.onAllJobsCheckboxChange}
        onEmployeeNoteBlur={this.setEmployeeNote}
      />
    );
  }

  jobListEditSave = () => {
    const state = this.store.getState();
    const employeeId = getSelectedEmployeeId(state);
    const payItem = getSelectedPayItem(state);
    payItem.jobs = payItem.jobs.filter(q => Number(q.amount) !== 0);
    this.dispatcher.savePayItemJobs(payItem, employeeId);
    this.dispatcher.closeJobListModal();
  }

  getAmount = (payItem, id, index) => {
    if (payItem.jobs.length > 0) {
      const obj = payItem.jobs.find(q => q.jobId === id);
      if (!obj) {
        return '0.00';
      }
      return obj.amount;
    }
    if (index === 0) {
      return payItem.amount;
    }
    return '0.00';
  };

  onAllJobsCheckboxChange = (status) => {
    const state = this.store.getState();
    const jobOptions = getJobOptions(state);
    const payItem = getSelectedPayItem(state);
    if (status && status.value && jobOptions.length > 0) {
      this.dispatcher.editPayItemJobs({
        ...payItem,
        jobs: (jobOptions.map((job, index) => ({
          jobId: job.id,
          amount: this.getAmount(payItem, job.id, index),
        }))),
      });
    } else {
      this.dispatcher.editPayItemJobs({ ...payItem, jobs: [] });
    }
  }

  updateJobs = ({ id, amount, isSelected }, jobs) => {
    if (isSelected) {
      return ([
        ...jobs.filter(q => q.jobId !== id),
        {
          jobId: id,
          amount,
        },
      ]);
    }
    return ([
      ...jobs.filter(q => q.jobId !== id),
    ]);
  }

  addOrEditJobList = (value) => {
    const state = this.store.getState();
    const payItem = getSelectedPayItem(state);
    const jobs = this.updateJobs(value, payItem.jobs);
    this.dispatcher.editPayItemJobs({ jobs });
  }

  getIsSelected = (value) => {
    if (value && value.length > 0 && Number(value) !== 0) {
      return true;
    }
    return false;
  }

  onAddJobAmountBlur = (value) => {
    this.addOrEditJobList({
      ...value,
      isSelected: this.getIsSelected(value.amount),
      amount: Number(value.amount).toFixed(2),
    });
  }

  onAddJobAmountChange = (value) => {
    this.addOrEditJobList({
      ...value,
      isSelected: this.getIsSelected(value.amount),
    });
  }

  getUnallocatedAmount = () => {
    const state = this.store.getState();
    const jobAmount = getJobAmount(state);
    return jobAmount.unallocated;
  }

  onAddJobCheckboxChange = (value) => {
    this.addOrEditJobList({
      ...value,
      amount: value.isSelected
        ? Number(this.getUnallocatedAmount()).toFixed(2)
        : Number(value.amount).toFixed(2),
    });
  }

  saveDraftAndNavigateAway = () => {
    this.saveDraft();
    this.closeUnsavedModal();
    this.pendingNavigateFunction();
  }

  onUnsavedModalDiscard = () => {
    this.closeUnsavedModal();
    this.pendingNavigateFunction();
  }

  openUnsavedModal = () => {
    this.dispatcher.setEmployeePayListIsUnsavedModalOpen({
      isOpen: true,
    });
  }

  closeUnsavedModal = () => {
    this.dispatcher.setEmployeePayListIsUnsavedModalOpen({
      isOpen: false,
    });
  }

  tryToNavigate = (navigateFunction) => {
    const state = this.store.getState();
    this.pendingNavigateFunction = navigateFunction;
    if (getIsPageEdited(state)) {
      this.openUnsavedModal();
    } else {
      navigateFunction();
    }
  }
}
