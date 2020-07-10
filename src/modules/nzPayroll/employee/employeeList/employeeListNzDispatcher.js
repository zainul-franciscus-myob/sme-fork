import * as intents from '../EmployeeNzIntents';
import { RESET_STATE, SET_INITIAL_STATE } from '../../../../SystemIntents';

const employeeListNzDispatcher = ({ store }) => ({
  setInitialState: (context) => {
    const intent = SET_INITIAL_STATE;
    store.dispatch({ intent, context });
  },

  resetState: () => {
    const intent = RESET_STATE;
    store.dispatch({ intent });
  },

  loadEmployeeList: (response) => {
    const intent = intents.LOAD_EMPLOYEE_LIST;
    store.dispatch({ intent, ...response });
  },

  setLoadingState: (loadingState) => {
    const intent = intents.SET_LOADING_STATE;
    store.dispatch({ intent, loadingState });
  },

  setAlert: ({ type, message }) => {
    const intent = intents.SET_ALERT;
    store.dispatch({ intent, alert: { type, message } });
  },

  dismissAlert: () => {
    const intent = intents.DISMISS_ALERT;
    store.dispatch({ intent });
  },
});

export default employeeListNzDispatcher;
