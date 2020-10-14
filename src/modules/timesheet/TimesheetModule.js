import { Provider } from 'react-redux';
import React from 'react';

import {
  getFormattedHours,
  getModalContext,
  getPayrollSettingsUrl,
  getSelectedEmployeeId,
  getTimesheetIsDirty,
  getUnsavedChangesModalAction,
} from './timesheetSelectors';
import JobModalModule from '../job/jobModal/JobModalModule';
import LoadingState from '../../components/PageView/LoadingState';
import ModalType from './ModalType';
import Store from '../../store/Store';
import TimesheetView from './components/TimesheetView';
import UnsavedChangesModalActions from './UnsavedChangesModalActions';
import createTimesheetDispatcher from './timesheetDispatcher';
import createTimesheetIntegrator from './timesheetIntegrator';
import reducer from './timesheetReducer';

export default class TimesheetModule {
  constructor({ setRootView, integration }) {
    this.store = new Store(reducer);
    this.setRootView = setRootView;
    this.jobModalModule = new JobModalModule({
      integration,
    });
    this.dispatcher = createTimesheetDispatcher(this.store);
    this.integrator = createTimesheetIntegrator(this.store, integration);
  }

  loadInitialTimesheet = () => {
    this.dispatcher.setLoadingState(LoadingState.LOADING);

    const onSuccess = (response) => {
      this.dispatcher.setLoadingState(LoadingState.LOADING_SUCCESS);
      this.dispatcher.loadInitialTimesheet(response);
    };

    const onFailure = () => {
      this.dispatcher.setLoadingState(LoadingState.LOADING_FAIL);
    };

    this.integrator.loadInitialTimesheet({ onSuccess, onFailure });
  };

  openJobModal = (onChange) => {
    const state = this.store.getState();
    const jobModalContext = getModalContext(state);
    this.jobModalModule.run({
      context: jobModalContext,
      onSaveSuccess: (payload) => this.loadJobAfterCreate(payload, onChange),
      onLoadFailure: (message) =>
        this.dispatcher.setAlert({
          type: 'danger',
          message,
        }),
    });
  };

  loadJobAfterCreate = ({ message, id }, onChange) => {
    this.dispatcher.setAlert({
      type: 'success',
      message,
    });
    this.dispatcher.startBlockingTable();
    this.jobModalModule.close();

    const onSuccess = (payload) => {
      this.dispatcher.stopBlockingTable();
      this.dispatcher.loadJobAfterCreate({
        ...payload,
        id,
      });
      onChange({
        ...payload,
        id,
      });
    };

    const onFailure = () => {
      this.dispatcher.stopBlockingTable();
    };

    this.integrator.loadJobAfterCreate({ id, onSuccess, onFailure });
  };

  redirectToPayrollSettings = () => {
    const state = this.store.getState();
    window.location.href = getPayrollSettingsUrl(state);
  };

  clearAlert = () => {
    this.dispatcher.setAlert({
      type: null,
      message: null,
    });
  };

  onSelectedEmployeeChange = ({ value }) => {
    const state = this.store.getState();
    if (getTimesheetIsDirty(state)) {
      this.openUnsavedChangesModal({
        action: UnsavedChangesModalActions.EMPLOYEE_CHANGE,
        employeeId: value,
      });
    } else {
      this.loadSelectedEmployeeTimesheet({ value });
    }
  };

  loadSelectedEmployeeTimesheet = ({ value }) => {
    this.clearAlert();
    this.dispatcher.setSelectedEmployee(value);

    this.dispatcher.setLoadingState(LoadingState.LOADING);

    const onSuccess = ({ timesheetRows, allowedPayItems }) => {
      this.dispatcher.setLoadingState(LoadingState.LOADING_SUCCESS);
      this.dispatcher.loadSelectedEmployeeTimesheet({
        timesheetRows,
        allowedPayItems,
      });
    };

    const onFailure = ({ message }) => {
      this.dispatcher.setLoadingState(LoadingState.LOADING_SUCCESS);
      this.dispatcher.setAlert({
        type: 'danger',
        message,
      });
    };

    this.integrator.loadSelectedEmployeeTimesheet({
      value,
      onSuccess,
      onFailure,
    });
  };

  onSelectedDateChange = ({ value }) => {
    const state = this.store.getState();
    if (getTimesheetIsDirty(state)) {
      this.openUnsavedChangesModal({
        action: UnsavedChangesModalActions.DATE_CHANGE,
        newDate: value,
      });
    } else {
      this.changeSelectedDate({ value });
    }
  };

  changeSelectedDate = ({ value }) => {
    this.clearAlert();
    this.dispatcher.setSelectedDate(value);
    const state = this.store.getState();
    this.dispatcher.setLoadingState(LoadingState.LOADING);
    const onSuccess = (response) => {
      this.dispatcher.setLoadingState(LoadingState.LOADING_SUCCESS);
      this.dispatcher.loadTimesheet(response);
      this.dispatcher.clearTimesheetRows();

      const selectedEmployeeId = getSelectedEmployeeId(state);
      if (
        selectedEmployeeId &&
        response.employeeList.filter((e) => e.id === selectedEmployeeId)
      ) {
        this.loadSelectedEmployeeTimesheet({ value: selectedEmployeeId });
      } else {
        this.dispatcher.setSelectedEmployee(null);
      }
    };
    const onFailure = ({ message }) => {
      this.dispatcher.setLoadingState(LoadingState.LOADING_SUCCESS);
      this.dispatcher.setAlert({
        type: 'danger',
        message,
      });
    };

    this.integrator.loadTimesheet({ value, onSuccess, onFailure });
  };

  saveTimesheet = ({ onSuccess = () => {}, onFailure = () => {} }) => {
    this.dispatcher.setLoadingState(LoadingState.LOADING);
    const onSuccessFunc = ({ message }) => {
      this.dispatcher.setLoadingState(LoadingState.LOADING_SUCCESS);
      this.dispatcher.setAlert({
        type: 'success',
        message,
      });
      this.dispatcher.clearTimesheetRows();
      this.dispatcher.setSelectedEmployee(0);
      onSuccess();
    };

    const onFailureFunc = ({ message }) => {
      this.dispatcher.setLoadingState(LoadingState.LOADING_SUCCESS);
      this.dispatcher.setAlert({
        type: 'danger',
        message,
      });
      onFailure();
    };

    this.integrator.saveTimesheet({ onSuccessFunc, onFailureFunc });
  };

  deleteTimesheet = () => {
    this.dispatcher.setLoadingState(LoadingState.LOADING);
    this.dispatcher.closeModal();

    const onSuccess = ({ message }) => {
      this.dispatcher.setLoadingState(LoadingState.LOADING_SUCCESS);
      this.dispatcher.setAlert({
        type: 'success',
        message,
      });
      this.dispatcher.clearTimesheetRows();
      this.dispatcher.setSelectedEmployee(0);
    };

    const onFailure = ({ message }) => {
      this.dispatcher.setLoadingState(LoadingState.LOADING_SUCCESS);
      this.dispatcher.setAlert({
        type: 'danger',
        message,
      });
    };

    this.integrator.deleteTimesheet({ onSuccess, onFailure });
  };

  onHoursBlur = (index, name, value) => {
    this.dispatcher.setTimesheetCell(index, name, getFormattedHours(value));
  };

  openDeleteModal = () => {
    this.dispatcher.setModal(ModalType.DELETE);
  };

  openUnsavedChangesModal = (action) => {
    this.dispatcher.setModal(ModalType.UNSAVED, action);
  };

  unsavedChangesModalSave = () => {
    const state = this.store.getState();
    const modalAction = getUnsavedChangesModalAction(state);
    this.dispatcher.closeUnsavedChangesModal();
    this.saveTimesheet({
      onSuccess: () => {
        this.handleUnsavedChangeModalAction(modalAction);
      },
    });
  };

  unsavedChangesModalDiscard = () => {
    const state = this.store.getState();
    const modalAction = getUnsavedChangesModalAction(state);
    this.dispatcher.closeUnsavedChangesModal();
    this.handleUnsavedChangeModalAction(modalAction);
  };

  handleUnsavedChangeModalAction = (modalAction) => {
    switch (modalAction.action) {
      case UnsavedChangesModalActions.NAVIGATION:
        this.redirectToUrl(modalAction.url);
        break;
      case UnsavedChangesModalActions.EMPLOYEE_CHANGE:
        this.loadSelectedEmployeeTimesheet({ value: modalAction.employeeId });
        break;
      case UnsavedChangesModalActions.DATE_CHANGE:
        this.changeSelectedDate({ value: modalAction.newDate });
        break;
      default:
        throw Error(`Invalid modal action '${modalAction.action}'`);
    }
  };

  render = () => {
    const jobModal = this.jobModalModule.render();

    const view = (
      <Provider store={this.store}>
        <TimesheetView
          jobModal={jobModal}
          onEmptyStateLinkClick={this.redirectToPayrollSettings}
          onEmployeeChange={this.onSelectedEmployeeChange}
          onSelectedDateChange={this.onSelectedDateChange}
          onRowChange={this.dispatcher.setTimesheetCell}
          onRemoveRow={this.dispatcher.removeRow}
          onAddRow={this.dispatcher.addRow}
          onHoursBlur={this.onHoursBlur}
          onSaveClick={() => this.saveTimesheet({})}
          onDeleteClick={this.openDeleteModal}
          onModalDelete={this.deleteTimesheet}
          onModalCancel={this.dispatcher.closeModal}
          unsavedModalListeners={{
            onCancel: this.dispatcher.closeUnsavedChangesModal,
            onUnsave: this.unsavedChangesModalDiscard,
            onSave: this.unsavedChangesModalSave,
          }}
          onDisplayStartStopTimesChange={
            this.dispatcher.toggleDisplayStartStopTimes
          }
          onCreateJobClick={this.openJobModal}
        />
      </Provider>
    );
    return this.setRootView(view);
  };

  run = (context) => {
    this.dispatcher.loadContext(context);
    this.render();
    this.loadInitialTimesheet();
  };

  unsubscribeFromStore = () => {
    this.store.unsubscribeAll();
  };

  resetState = () => {
    this.dispatcher.resetState();
  };

  redirectToUrl = (url) => {
    window.location.href = url;
  };

  handlePageTransition = (url) => {
    const state = this.store.getState();
    if (getTimesheetIsDirty(state)) {
      this.openUnsavedChangesModal({
        action: UnsavedChangesModalActions.NAVIGATION,
        url,
      });
    } else {
      this.redirectToUrl(url);
    }
  };
}
