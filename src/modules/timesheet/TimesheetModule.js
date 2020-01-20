import { Provider } from 'react-redux';
import React from 'react';

import {
  ADD_ROW,
  CLEAR_TIMESHEET_ROWS,
  LOAD_CONTEXT,
  LOAD_EMPLOYEE_TIMESHEET,
  LOAD_INITIAL_TIMESHEET,
  LOAD_TIMESHEET,
  REMOVE_ROW,
  SET_LOADING_STATE,
  SET_SELECTED_EMPLOYEE,
  SET_TIMESHEET_CELL,
  TOGGLE_DISPLAY_START_STOP_TIMES,
} from './timesheetIntents';
import { RESET_STATE } from '../../SystemIntents';
import {
  getBusinessId, getPayrollSettingsUrl, getSelectedEmployeeId, getWeekStartDate,
} from './timesheetSelectors';
import LoadingState from '../../components/PageView/LoadingState';
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

    const onFailure = ({ message }) => {
      this.setLoadingState(LoadingState.LOADING_FAIL);

      console.log(message);
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

    const onSuccess = ({ timesheetRows }) => {
      this.setLoadingState(LoadingState.LOADING_SUCCESS);
      this.store.dispatch({
        intent,
        timesheetRows,
      });
    };

    const onFailure = ({ message }) => {
      console.log(message);
      this.setLoadingState(LoadingState.LOADING_FAIL);
    };

    this.integration.read({
      intent,
      urlParams,
      params,
      onSuccess,
      onFailure,
    });
  }

  onWeekStartDateChange = ({ value }) => {
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
      this.setLoadingState(LoadingState.LOADING_FAIL);
      console.log(message);
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

  render = () => {
    const view = (
      <Provider store={this.store}>
        <TimesheetView
          onEmptyStateLinkClick={this.redirectToPayrollSettings}
          onEmployeeChange={this.loadSelectedEmployeeTimesheet}
          onWeekStartDateChange={this.onWeekStartDateChange}
          onRowChange={this.onRowChange}
          onRemoveRow={this.removeRow}
          onAddRow={this.addRow}
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
