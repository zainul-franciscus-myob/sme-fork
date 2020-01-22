import { Provider } from 'react-redux';
import React from 'react';

import {
  ADD_ROW,
  CLEAR_TIMESHEET_ROWS,
  DELETE_TIMESHEET,
  LOAD_CONTEXT,
  LOAD_EMPLOYEE_TIMESHEET,
  LOAD_INITIAL_TIMESHEET,
  LOAD_TIMESHEET,
  REMOVE_ROW,
  SAVE_TIMESHEET,
  SET_ALERT,
  SET_LOADING_STATE,
  SET_MODAL,
  SET_SELECTED_DATE,
  SET_SELECTED_EMPLOYEE,
  SET_TIMESHEET_CELL,
  TOGGLE_DISPLAY_START_STOP_TIMES,
} from './timesheetIntents';
import { RESET_STATE } from '../../SystemIntents';
import {
  getBusinessId,
  getDeleteTimesheetContent,
  getFormattedHours,
  getPayrollSettingsUrl,
  getSaveTimesheetContent,
  getSelectedEmployeeId,
  getWeekStartDate,
} from './timesheetSelectors';
import LoadingState from '../../components/PageView/LoadingState';
import ModalType from './ModalType';
import Store from '../../store/Store';
import TimesheetView from './components/TimesheetView';
import reducer from './timesheetReducer';

export default class TimesheetModule {
  constructor({
    setRootView,
    integration,
  }) {
    this.integration = integration;
    this.store = new Store(reducer);
    this.setRootView = setRootView;
  }

  loadInitialTimesheet = () => {
    const state = this.store.getState();
    const intent = LOAD_INITIAL_TIMESHEET;
    this.setLoadingState(LoadingState.LOADING);

    const urlParams = {
      businessId: getBusinessId(state),
    };

    const onSuccess = (response) => {
      this.setLoadingState(LoadingState.LOADING_SUCCESS);
      this.store.dispatch({
        intent,
        response,
      });
    };

    const onFailure = () => {
      this.setLoadingState(LoadingState.LOADING_FAIL);
    };

    this.integration.read({
      intent,
      urlParams,
      onSuccess,
      onFailure,
    });
  }

  setSelectedEmployee = ({ value }) => {
    this.store.dispatch({
      intent: SET_SELECTED_EMPLOYEE,
      selectedEmployeeId: value,
    });
  }

  setLoadingState = (loadingState) => {
    this.store.dispatch({
      intent: SET_LOADING_STATE,
      loadingState,
    });
  }

  redirectToPayrollSettings = () => {
    const state = this.store.getState();
    window.location.href = getPayrollSettingsUrl(state);
  }

  setAlert = ({ type, message }) => {
    this.store.dispatch({
      intent: SET_ALERT,
      type,
      message,
    });
  }

  loadSelectedEmployeeTimesheet = ({ value }) => {
    const state = this.store.getState();
    this.setSelectedEmployee({ value });

    const intent = LOAD_EMPLOYEE_TIMESHEET;
    this.setLoadingState(LoadingState.LOADING);

    const urlParams = {
      businessId: getBusinessId(state),
    };
    const params = {
      date: getWeekStartDate(state),
      employeeId: value,
    };

    const onSuccess = ({ timesheetRows, allowedPayItems }) => {
      this.setLoadingState(LoadingState.LOADING_SUCCESS);
      this.store.dispatch({
        intent,
        timesheetRows,
        allowedPayItems,
      });
    };

    const onFailure = ({ message }) => {
      this.setLoadingState(LoadingState.LOADING_SUCCESS);
      this.setAlert({
        type: 'danger',
        message,
      });
    };

    this.integration.read({
      intent,
      urlParams,
      params,
      onSuccess,
      onFailure,
    });
  }

  onSelectedDateChange = ({ value }) => {
    this.store.dispatch({
      intent: SET_SELECTED_DATE,
      selectedDate: value,
    });
    const intent = LOAD_TIMESHEET;
    const state = this.store.getState();
    const urlParams = {
      businessId: getBusinessId(state),
    };
    const params = {
      weekStartDate: value,
    };
    this.setLoadingState(LoadingState.LOADING);
    const onSuccess = (response) => {
      this.setLoadingState(LoadingState.LOADING_SUCCESS);

      this.store.dispatch({
        intent: LOAD_TIMESHEET,
        response,
      });

      this.store.dispatch({
        intent: CLEAR_TIMESHEET_ROWS,
      });

      const selectedEmployeeId = getSelectedEmployeeId(state);
      if (selectedEmployeeId && response.employeeList.filter(e => e.id === selectedEmployeeId)) {
        this.loadSelectedEmployeeTimesheet({ value: selectedEmployeeId });
      } else {
        this.store.dispatch({
          intent: SET_SELECTED_EMPLOYEE,
          selectedEmployeeId: null,
        });
      }
    };
    const onFailure = ({ message }) => {
      this.setLoadingState(LoadingState.LOADING_SUCCESS);
      this.setAlert({
        type: 'danger',
        message,
      });
    };

    this.integration.read({
      intent,
      urlParams,
      params,
      onSuccess,
      onFailure,
    });
  }

  onRowChange = (index, name, value) => {
    this.store.dispatch({
      intent: SET_TIMESHEET_CELL,
      index,
      name,
      value,
    });
  }

  removeRow = (rowIndex) => {
    this.store.dispatch({
      intent: REMOVE_ROW,
      rowIndex,
    });
  }

  addRow = (rowData) => {
    this.store.dispatch({
      intent: ADD_ROW,
      rowData,
    });
  }

  toggleDisplayStartStopTimes = () => {
    this.store.dispatch({
      intent: TOGGLE_DISPLAY_START_STOP_TIMES,
    });
  }

  saveTimesheet = () => {
    this.setLoadingState(LoadingState.LOADING);
    const state = this.store.getState();
    const intent = SAVE_TIMESHEET;

    const urlParams = {
      businessId: getBusinessId(state),
      employeeId: getSelectedEmployeeId(state),
    };

    const content = getSaveTimesheetContent(state);

    const onSuccess = ({ message }) => {
      this.setLoadingState(LoadingState.LOADING_SUCCESS);
      this.setAlert({
        type: 'success',
        message,
      });
      this.store.dispatch({
        intent: CLEAR_TIMESHEET_ROWS,
      });
      this.store.dispatch({
        intent: SET_SELECTED_EMPLOYEE,
        selectedEmployeeId: 0,
      });
    };

    const onFailure = ({ message }) => {
      this.setLoadingState(LoadingState.LOADING_SUCCESS);
      this.setAlert({
        type: 'danger',
        message,
      });
    };

    this.integration.write({
      intent,
      urlParams,
      content,
      onSuccess,
      onFailure,
    });
  }

  closeModal = () => {
    this.store.dispatch({
      intent: SET_MODAL,
      modal: null,
    });
  }

  deleteTimesheet = () => {
    this.setLoadingState(LoadingState.LOADING);
    this.closeModal();
    const state = this.store.getState();
    const intent = DELETE_TIMESHEET;

    const urlParams = {
      businessId: getBusinessId(state),
      employeeId: getSelectedEmployeeId(state),
    };

    const content = getDeleteTimesheetContent(state);

    const onSuccess = ({ message }) => {
      this.setLoadingState(LoadingState.LOADING_SUCCESS);
      this.setAlert({
        type: 'success',
        message,
      });
      this.store.dispatch({
        intent: CLEAR_TIMESHEET_ROWS,
      });
      this.store.dispatch({
        intent: SET_SELECTED_EMPLOYEE,
        selectedEmployeeId: 0,
      });
    };

    const onFailure = ({ message }) => {
      this.setLoadingState(LoadingState.LOADING_SUCCESS);
      this.setAlert({
        type: 'danger',
        message,
      });
    };

    this.integration.write({
      intent,
      urlParams,
      content,
      onSuccess,
      onFailure,
    });
  }

  onHoursBlur = (index, name, value) => {
    this.store.dispatch({
      intent: SET_TIMESHEET_CELL,
      index,
      name,
      value: getFormattedHours(value),
    });
  }

  openDeleteModal = () => {
    this.store.dispatch({
      intent: SET_MODAL,
      modal: ModalType.DELETE,
    });
  }

  render = () => {
    const view = (
      <Provider store={this.store}>
        <TimesheetView
          onEmptyStateLinkClick={this.redirectToPayrollSettings}
          onEmployeeChange={this.loadSelectedEmployeeTimesheet}
          onSelectedDateChange={this.onSelectedDateChange}
          onRowChange={this.onRowChange}
          onRemoveRow={this.removeRow}
          onAddRow={this.addRow}
          onHoursBlur={this.onHoursBlur}
          onSaveClick={this.saveTimesheet}
          onDeleteClick={this.openDeleteModal}
          onModalDelete={this.deleteTimesheet}
          onModalCancel={this.closeModal}
          onDisplayStartStopTimesChange={this.toggleDisplayStartStopTimes}
        />
      </Provider>
    );
    return this.setRootView(view);
  }

  run = (context) => {
    this.store.dispatch({
      intent: LOAD_CONTEXT,
      context,
    });
    this.render();
    this.loadInitialTimesheet();
  }

  unsubscribeFromStore = () => {
    this.store.unsubscribeAll();
  }

  resetState = () => {
    this.store.dispatch({
      intent: RESET_STATE,
    });
  }
}
