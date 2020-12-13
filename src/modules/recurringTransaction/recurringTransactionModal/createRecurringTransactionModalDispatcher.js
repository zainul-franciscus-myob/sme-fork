import {
  LOAD_NEW_RECURRING_TRANSACTION,
  SET_ALERT,
  SET_LOADING_STATE,
  SET_SUBMITTING_STATE,
  UPDATE_SCHEDULE_OPTIONS,
} from './RecurringTransactionModalIntents';
import { RESET_STATE, SET_INITIAL_STATE } from '../../../SystemIntents';

const createRecurringTransactionModalDispatcher = (store) => ({
  setInitialState: (context) => {
    store.dispatch({ intent: SET_INITIAL_STATE, context });
  },
  resetState: () => {
    store.dispatch({ intent: RESET_STATE });
  },
  setAlert: (alert) => {
    store.dispatch({ intent: SET_ALERT, alert });
  },
  dismissAlert: () => {
    store.dispatch({ intent: SET_ALERT, alert: undefined });
  },
  setLoadingState: (isLoading) => {
    store.dispatch({ intent: SET_LOADING_STATE, isLoading });
  },
  setSubmittingState: (isSubmitting) => {
    store.dispatch({ intent: SET_SUBMITTING_STATE, isSubmitting });
  },
  loadNewRecurringTransaction: (response) => {
    store.dispatch({ intent: LOAD_NEW_RECURRING_TRANSACTION, ...response });
  },
  updateScheduleOptions: ({ key, value }) => {
    store.dispatch({ intent: UPDATE_SCHEDULE_OPTIONS, key, value });
  },
});

export default createRecurringTransactionModalDispatcher;
