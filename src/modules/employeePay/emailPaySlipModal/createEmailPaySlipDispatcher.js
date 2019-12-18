import {
  NEXT_EMPLOYEE,
  SET_EMPLOYEE_ERRORED,
  SET_EMPLOYEE_SUCCEEDED,
  SET_LOADING_STATE,
} from './EmailPaySlipModalIntents';
import { RESET_STATE, SET_INITIAL_STATE } from '../../../SystemIntents';

const createEmailPaySlipDispatcher = store => ({
  setInitialState: context => store.dispatch({ intent: SET_INITIAL_STATE, context }),

  resetState: () => store.dispatch({ intent: RESET_STATE }),

  setLoadingState: isLoading => store.dispatch({ intent: SET_LOADING_STATE, isLoading }),

  setNextEmployee: () => store.dispatch({ intent: NEXT_EMPLOYEE }),

  setEmployeeErrored: () => store.dispatch({ intent: SET_EMPLOYEE_ERRORED }),

  setEmployeeSucceeded: () => store.dispatch({ intent: SET_EMPLOYEE_SUCCEEDED }),
});

export default createEmailPaySlipDispatcher;
