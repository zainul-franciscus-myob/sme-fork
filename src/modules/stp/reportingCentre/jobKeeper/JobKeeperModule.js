import { Provider } from 'react-redux';
import React from 'react';

import { SUCCESSFULLY_UPDATED_JOB_KEEPER_PAYMENTS } from '../../../../common/types/MessageTypes';
import {
  getFlipSortOrder,
  getIsDirty,
  getStpDeclarationContext,
  getStpReportTabUrl,
} from './JobKeeperSelector';
import EmployeeBenefitReportModal from './components/EmployeeBenefitReportModal';
import JobKeeperView from './components/JobKeeperView';
import LoadingState from '../../../../components/PageView/LoadingState';
import Store from '../../../../store/Store';
import StpDeclarationModalModule from '../../stpDeclarationModal/StpDeclarationModalModule';
import createJobKeeperDispatcher from './createJobKeeperDispatcher';
import createJobKeeperIntegrator from './createJobKeeperIntegrator';
import jobKeeperReducer from './JobKeeperReducer';
import openBlob from '../../../../common/blobOpener/openBlob';

export default class JobKeeperModule {
  constructor({ integration, context, setAlert, pushMessage, featureToggles }) {
    this.store = new Store(jobKeeperReducer);
    this.integration = integration;
    this.dispatcher = createJobKeeperDispatcher(this.store);
    this.integrator = createJobKeeperIntegrator(this.store, integration);
    this.stpDeclarationModule = new StpDeclarationModalModule({ integration });
    this.setAlert = setAlert;
    this.pushMessage = pushMessage;
    this.featureToggles = featureToggles;
    this.dispatcher.setInitialState(context);
  }

  loadInitialEmployeesAndHeaderDetails = () => {
    this.dispatcher.setLoadingState(LoadingState.LOADING);

    const onSuccess = (response) => {
      this.dispatcher.setLoadingState(LoadingState.LOADING_SUCCESS);
      this.dispatcher.setInitialJobKeeper(response);
    };

    const onFailure = () => {
      this.dispatcher.setLoadingState(LoadingState.LOADING_FAIL);
    };

    this.integrator.loadInitialEmployeesAndHeaderDetails({
      onSuccess,
      onFailure,
    });
  };

  filterEmployeesByYear = (payrollYear) => {
    this.dispatcher.setSelectedPayrollYear(payrollYear);
    this.dispatcher.clearEmployees();
    this.dispatcher.setTableLoadingState(true);

    const onSuccess = (response) => {
      this.dispatcher.setTableLoadingState(false);
      this.dispatcher.setFilteredEmployees(response);
    };

    const onFailure = ({ message }) => {
      this.dispatcher.setTableLoadingState(false);
      this.dispatcher.clearEmployees();
      this.setAlert({ type: 'danger', message });
    };

    this.integrator.filterEmployees({ onSuccess, onFailure });
  };

  sortEmployees = (orderBy) => {
    const state = this.store.getState();
    const newSortOrder = getFlipSortOrder(state);

    this.dispatcher.setTableLoadingState(true);

    const onSuccess = (employees) => {
      this.dispatcher.setTableLoadingState(false);
      this.dispatcher.setSort({
        orderBy,
        sortOrder: newSortOrder,
      });
      this.dispatcher.setSortedEmployees(employees);
    };

    const onFailure = () => {
      this.dispatcher.setTableLoadingState(false);
    };

    this.integrator.sortEmployees({
      onSuccess,
      onFailure,
      orderBy,
      sortOrder: newSortOrder,
    });
  };

  redirectToReportTab = () => {
    const state = this.store.getState();
    window.location.href = getStpReportTabUrl(state);
  };

  updateJobKeeperPayments = () => {
    this.dispatcher.setLoadingState(LoadingState.LOADING);

    const onSuccess = ({ message }) => {
      this.dispatcher.setLoadingState(LoadingState.LOADING_SUCCESS);
      this.dispatcher.setNewEventId();
      this.pushMessage({
        type: SUCCESSFULLY_UPDATED_JOB_KEEPER_PAYMENTS,
        content: message,
      });
      this.redirectToReportTab();
    };

    const onFailure = ({ message }) => {
      this.dispatcher.setLoadingState(LoadingState.LOADING_SUCCESS);
      this.setAlert({ type: 'danger', message });
    };

    this.integrator.updateJobKeeperPayments({ onSuccess, onFailure });
  };

  openStpDeclarationModal = () => {
    const context = getStpDeclarationContext(this.store.getState());
    this.stpDeclarationModule.run(context, this.updateJobKeeperPayments);
  };

  updateEmployeeRow = ({ key, value, rowId }) => {
    this.dispatcher.updateEmployeeRow({ key, value, rowId });
  };

  tryToNavigate = (navigationFunction) => {
    const isDirty = getIsDirty(this.store.getState());
    if (!isDirty) {
      navigationFunction();
    } else {
      this.openUnsavedChangesModal(navigationFunction);
    }
  };

  openUnsavedChangesModal = (navigationFunction) => {
    this.pendingNavigationFunction = navigationFunction;

    this.dispatcher.setUnsavedChangesModal(true);
  };

  closeUnsavedChangesModal = () => {
    this.dispatcher.setUnsavedChangesModal(false);
    this.pendingNavigationFunction = null;
  };

  onUnsavedChangesCancel = () => {
    this.closeUnsavedChangesModal();
  };

  onUnsavedChangesConfirm = () => {
    this.pendingNavigationFunction();
    this.dispatcher.setUnsavedChangesModal(false);
    this.dispatcher.resetDirtyFlag();
    this.pendingNavigationFunction = null;
  };

  onPayrollYearChange = (payrollYear) => {
    this.tryToNavigate(() => this.filterEmployeesByYear(payrollYear));
  };

  onOpenJobKeeperReport = (month) => {
    const onSuccess = (response) => {
      openBlob({ blob: response });
    };

    const onError = (message) =>
      this.dispatcher.setAlert({ type: 'danger', message });

    this.integrator.onOpenJobKeeperReport({
      onSuccess,
      onError,
      month,
    });
  };

  dismissInitWarning = () => {
    this.dispatcher.dismissInitWarning();
  };

  onOpenEmployeeBenefitModal = () => {
    this.dispatcher.selectAllEmployees(true);
    this.dispatcher.showEmployeeBenefitReportModal();
  };

  onCloseEmployeeBenefitModal = () => {
    this.dispatcher.hideEmployeeBenefitReportModal();
  };

  onSelectEmployee = (item, value) => {
    this.dispatcher.selectEmployee(item, value);
  };

  onSelectAllEmployees = (isSelected) => {
    this.dispatcher.selectAllEmployees(isSelected);
  };

  onViewEmployeeBenefitReport = () => {
    this.dispatcher.setLoadingState(LoadingState.LOADING);

    const onSuccess = (response) => {
      openBlob({ blob: response });
      this.dispatcher.setLoadingState(LoadingState.LOADING_SUCCESS);
      this.dispatcher.selectAllEmployees(false);
      this.dispatcher.hideEmployeeBenefitReportModal();
      this.dispatcher.setAlertMessage(response.message);
    };

    const onFailure = (response) => {
      this.dispatcher.setLoadingState(LoadingState.LOADING_FAIL);
      this.dispatcher.setAlertMessage(response.message);
    };

    this.integrator.loadEmployeeBenefitReport({
      onSuccess,
      onFailure,
    });
  };

  run = () => {
    this.loadInitialEmployeesAndHeaderDetails();
  };

  getView() {
    const declarationModal = this.stpDeclarationModule.getView();

    return (
      <Provider store={this.store}>
        {declarationModal}
        <JobKeeperView
          onNotifyAtoClick={this.openStpDeclarationModal}
          onPayrollYearChange={this.onPayrollYearChange}
          onSort={this.sortEmployees}
          onEmployeeChange={this.updateEmployeeRow}
          onOpenJobKeeperReport={this.onOpenJobKeeperReport}
          unsavedChangesModalListeners={{
            onCancel: this.onUnsavedChangesCancel,
            onConfirm: this.onUnsavedChangesConfirm,
          }}
          featureToggles={this.featureToggles}
          dismissInitWarning={this.dismissInitWarning}
          onOpenEmployeeBenefitReport={this.onOpenEmployeeBenefitModal}
        />
        <EmployeeBenefitReportModal
          onCloseModal={this.onCloseEmployeeBenefitModal}
          onSelectEmployee={this.onSelectEmployee}
          onSelectAllEmployees={this.onSelectAllEmployees}
          onViewReport={this.onViewEmployeeBenefitReport}
        />
      </Provider>
    );
  }
}
