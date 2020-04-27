import {
  DISMISS_ALERT, LOAD_EMPLOYEE_LIST, SET_ALERT, SET_LOADING_STATE,
} from '../EmployeeNzIntents';
import { RESET_STATE, SET_INITIAL_STATE } from '../../../../SystemIntents';

const createEmployeeListNzDispatcher = ({ store }) => ({

  setInitialState: (context) => {
    const intent = SET_INITIAL_STATE;
    store.dispatch({ intent, context });
  },

  resetState: () => {
    const intent = RESET_STATE;
    store.dispatch({ intent });
  },

  loadEmployeeList: (response) => {
    const intent = LOAD_EMPLOYEE_LIST;
    store.dispatch({ intent, ...response });
  },

  setLoadingState: (loadingState) => {
    const intent = SET_LOADING_STATE;
    store.dispatch({ intent, loadingState });
  },

  setAlert: ({ type, message }) => {
    const intent = SET_ALERT;
    store.dispatch({ intent, alert: { type, message } });
  },

  dismissAlert: () => {
    const intent = DISMISS_ALERT;
    store.dispatch({ intent });
  },

});

export default createEmployeeListNzDispatcher;
