import { Provider } from 'react-redux';
import React from 'react';

import { getIsDirty, getSelectedPayrollYear, getStpDeclarationContext } from './FinalisationSelector';
import FinalisationView from './components/FinalisationView';
import LoadingState from '../../../../components/PageView/LoadingState';
import Store from '../../../../store/Store';
import StpDeclarationModalModule from '../../stpDeclarationModal/StpDeclarationModalModule';
import createFinalisationDispatcher from './createFinalisationDispatcher';
import createFinalisationIntegrator from './createFinalisationIntegrator';
import finalisationReducer from './FinalisationReducer';
import openBlob from '../../../../common/blobOpener/openBlob';

export default class FinalisationModule {
  constructor({
    integration,
    context,
    setAlert,
  }) {
    this.integration = integration;
    this.store = new Store(finalisationReducer);
    this.dispatcher = createFinalisationDispatcher(this.store);
    this.integrator = createFinalisationIntegrator(this.store, integration);
    this.dispatcher.setInitialState(context);
    this.stpDeclarationModalModule = new StpDeclarationModalModule({ integration });
    this.setAlert = setAlert;
  }

  loadEmployeesAndHeaderDetailsForYear = (year) => {
    this.dispatcher.setLoadingState(LoadingState.LOADING);

    const onSuccess = (response) => {
      this.dispatcher.setLoadingState(LoadingState.LOADING_SUCCESS);
      this.dispatcher.loadHeadersAndEmployeesForYear(response);
    };

    const onFailure = () => {
      this.dispatcher.setLoadingState(LoadingState.LOADING_FAIL);
    };

    this.integrator.loadHeadersAndEmployeesForYear({
      year,
      onSuccess,
      onFailure,
    });
  }

  loadInitialEmployeesAndHeaderDetails = () => {
    this.dispatcher.setLoadingState(LoadingState.LOADING);

    const onSuccess = (response) => {
      this.dispatcher.setLoadingState(LoadingState.LOADING_SUCCESS);
      this.dispatcher.loadInitialInformation(response);
    };

    const onFailure = () => {
      this.dispatcher.setLoadingState(LoadingState.LOADING_FAIL);
    };

    this.integrator.loadInitialEmployeesAndHeaderDetails({ onSuccess, onFailure });
  };

  setIsRFBAEnabled = ({ value }) => {
    this.dispatcher.setIsRFBAEnabled(value);
  };

  onPayrollYearChange = (payrollYear) => {
    this.dispatcher.setSelectedPayrollYear(payrollYear);
    this.loadEmployeesAndHeaderDetailsForYear(payrollYear);
  }

  selectAllEmployees = (isSelected) => {
    this.dispatcher.selectAllEmployees(isSelected);
  }

  selectEmployeesItem = (item, isSelected) => {
    this.dispatcher.selectEmployeesItem(item, isSelected);
  }

  updateEmployeeRow = ({ key, value, rowId }) => {
    this.dispatcher.updateEmployeeRow({ key, value, rowId });
  }

  submitEmployeesFinalisation = () => {
    this.dispatcher.setLoadingState(LoadingState.LOADING);
    const onSuccess = ({ message }) => {
      const state = this.store.getState();
      this.setAlert({
        type: 'success',
        message,
      });
      this.loadEmployeesAndHeaderDetailsForYear(getSelectedPayrollYear(state));
      this.dispatcher.resetEventId();
    };

    const onFailure = ({ message }) => {
      this.dispatcher.setLoadingState(LoadingState.LOADING_SUCCESS);
      this.setAlert({
        type: 'danger',
        message,
      });
    };

    this.integrator.submitEmployeesFinalisation({
      onSuccess,
      onFailure,
    });
  }

  submitEmployeesRemoveFinalisation = () => {
    this.dispatcher.setLoadingState(LoadingState.LOADING);

    const onSuccess = ({ message }) => {
      const state = this.store.getState();
      this.setAlert({
        type: 'success',
        message,
      });
      this.loadEmployeesAndHeaderDetailsForYear(getSelectedPayrollYear(state));
      this.dispatcher.resetEventId();
    };

    const onFailure = ({ message }) => {
      this.dispatcher.setLoadingState(LoadingState.LOADING_SUCCESS);
      this.setAlert({
        type: 'danger',
        message,
      });
    };

    this.integrator.submitEmployeesRemoveFinalisation({
      onSuccess,
      onFailure,
    });
  }

  onFinaliseClick = () => {
    const state = this.store.getState();
    this.stpDeclarationModalModule.run(
      getStpDeclarationContext(state),
      this.submitEmployeesFinalisation,
    );
  }

  onRemoveFinalisationClick = () => {
    const state = this.store.getState();
    this.stpDeclarationModalModule.run(
      getStpDeclarationContext(state),
      this.submitEmployeesRemoveFinalisation,
    );
  }

  run = () => {
    this.loadInitialEmployeesAndHeaderDetails();
  };

  tryToNavigate = (navigationFunction) => {
    const isDirty = getIsDirty(this.store.getState());
    if (!isDirty) {
      navigationFunction();
    } else {
      this.openUnsavedChangesModal(navigationFunction);
    }
  }

  openUnsavedChangesModal = (navigationFunction) => {
    this.pendingNavigationFunction = navigationFunction;

    this.dispatcher.setUnsavedChangesModal(true);
  }

  closeUnsavedChangesModal = () => {
    this.dispatcher.setUnsavedChangesModal(false);
    this.pendingNavigationFunction = null;
  }

  onUnsavedChangesCancel = () => {
    this.closeUnsavedChangesModal();
  }

  onUnsavedChangesConfirm = () => {
    this.pendingNavigationFunction();
    this.dispatcher.setUnsavedChangesModal(false);
    this.dispatcher.resetDirtyFlag();
    this.pendingNavigationFunction = null;
  }

  openYtdVerificationReport = () => {
    this.dispatcher.setLoadingState(LoadingState.LOADING);

    const onSuccess = (blob) => {
      this.dispatcher.setLoadingState(LoadingState.LOADING_SUCCESS);
      openBlob({ blob });
    };

    const onFailure = () => {
      this.dispatcher.setLoadingState(LoadingState.LOADING_FAIL);
    };

    this.integrator.openYtdVerificationReport({
      onSuccess,
      onFailure,
    });
  }

  openEmployeeSummaryReport = (employeeId) => {
    this.dispatcher.setLoadingState(LoadingState.LOADING);

    const onSuccess = (blob) => {
      this.dispatcher.setLoadingState(LoadingState.LOADING_SUCCESS);
      openBlob({ blob });
    };
    const onFailure = () => {
      this.dispatcher.setLoadingState(LoadingState.LOADING_FAIL);
    };

    this.integrator.openEmployeeSummaryReport({
      onSuccess,
      onFailure,
      employeeId,
    });
  }

  getView() {
    const stpModal = this.stpDeclarationModalModule.getView();

    return (
      <Provider store={this.store}>
        {stpModal}
        <FinalisationView
          onIsRFBAEnabledClick={this.setIsRFBAEnabled}
          onPayrollYearChange={this.onPayrollYearChange}
          selectAllEmployees={this.selectAllEmployees}
          selectEmployeesItem={this.selectEmployeesItem}
          onEmployeeChange={this.updateEmployeeRow}
          onFinaliseClick={this.onFinaliseClick}
          onRemoveFinalisationClick={this.onRemoveFinalisationClick}
          unsavedChangesModalListeners={{
            onCancel: this.onUnsavedChangesCancel,
            onConfirm: this.onUnsavedChangesConfirm,
          }}
          onVerificationReportClick={this.openYtdVerificationReport}
          onEmployeeSummaryReportClick={this.openEmployeeSummaryReport}
        />
      </Provider>
    );
  }
}
