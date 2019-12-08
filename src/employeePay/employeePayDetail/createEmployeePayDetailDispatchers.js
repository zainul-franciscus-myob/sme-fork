import { RESET_STATE, SET_INITIAL_STATE } from '../../SystemIntents';
import { SET_EMPLOYEE_PAY_DETAIL, SET_LOADING_STATE } from './EmployeePayDetailIntents';

const createEmployeePayDetailDispatchers = store => ({
  setInitialState: (context) => {
    store.dispatch({
      intent: SET_INITIAL_STATE,
      context,
    });
  },

  resetState: () => {
    store.dispatch({
      intent: RESET_STATE,
    });
  },

  setLoadingState: (isLoading) => {
    store.dispatch({
      intent: SET_LOADING_STATE,
      isLoading,
    });
  },

  setEmployeePayDetails: (response) => {
    store.dispatch({
      intent: SET_EMPLOYEE_PAY_DETAIL,
      response,
    });
  },
});

export default createEmployeePayDetailDispatchers;
