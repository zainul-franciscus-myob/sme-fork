import { Provider } from 'react-redux';
import React from 'react';

import {
  LOAD_CONTEXT,
  LOAD_INITIAL_TIMESHEET,
  SET_SELECTED_EMPLOYEE,
} from './timesheetIntents';
import { RESET_STATE } from '../../SystemIntents';
import { getPayrollSettingsUrl } from './timesheetSelectors';
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
    const intent = LOAD_INITIAL_TIMESHEET;

    const onSuccess = (response) => {
      this.store.dispatch({
        intent,
        response,
      });
    };

    const onFailure = ({ message }) => {
      console.log(message);
    };

    this.integration.read({
      intent,
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

  redirectToPayrollSettings = () => {
    const state = this.store.getState();
    window.location.href = getPayrollSettingsUrl(state);
  }

  render = () => {
    const view = (
      <Provider store={this.store}>
        <TimesheetView
          onEmptyStateLinkClick={this.redirectToPayrollSettings}
          onEmployeeChange={this.setSelectedEmployee}
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
