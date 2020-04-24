import {
  LOAD_EMPLOYEE_DETAIL, SET_LOADING_STATE, SET_MAIN_TAB, SET_SUB_TAB,
} from '../EmployeeNzIntents';
import { RESET_STATE, SET_INITIAL_STATE } from '../../../../SystemIntents';

const createEmployeeDetailNzDispatcher = ({ store }) => ({

  setInitialState: (context) => {
    const intent = SET_INITIAL_STATE;
    store.dispatch({ intent, context });
  },

  resetState: () => {
    const intent = RESET_STATE;
    store.dispatch({ intent });
  },

  loadEmployeeDetails: (response) => {
    const intent = LOAD_EMPLOYEE_DETAIL;
    store.dispatch({ intent, payload: response });
  },

  setLoadingState: (loadingState) => {
    const intent = SET_LOADING_STATE;
    store.dispatch({ intent, loadingState });
  },

  setMainTab: (mainTab) => {
    const intent = SET_MAIN_TAB;
    store.dispatch({ intent, mainTab });
  },

  setSubTab: (mainTab, subTab) => store.dispatch({
    intent: SET_SUB_TAB,
    mainTab,
    subTab,
  }),

});

export default createEmployeeDetailNzDispatcher;
