import {
  LOAD_NEW_RECURRING_TRANSACTION,
  SET_ALERT,
  SET_LOADING_STATE,
  SET_SUBMITTING_STATE,
  UPDATE_SCHEDULE_OPTIONS,
} from './RecurringTransactionModalIntents';
import { RESET_STATE, SET_INITIAL_STATE } from '../../../SystemIntents';
import { getScheduleRemainingTimes } from '../recurringInvoice/selectors/RecurringInvoiceSelectors';
import createReducer from '../../../store/createReducer';
import formatIsoDate from '../../../common/valueFormatters/formatDate/formatIsoDate';

const getDefaultState = () => ({
  businessId: '',
  transactionType: '',
  schedule: {
    name: '',
    frequency: '',
    recurrence: '',
    isAutomaticallyRecorded: false,
    nextDueDate: formatIsoDate(new Date()),
    secondDueDate: '',
    endDate: '',
    numberOfTimes: '',
    remainingTimes: '',
    shouldNotifyUser: false,
    notifyUserId: '',
    shouldUseCustomNumber: false,
    customNumber: '',
  },
  transaction: undefined,
  isOpen: false,
  isLoading: true,
});

const setInitialState = (state, { context }) => {
  const defaultState = getDefaultState();

  return {
    ...defaultState,
    businessId: context.businessId,
    transactionType: context.transactionType,
    transaction: context.transaction,
    isOpen: true,
  };
};

const resetState = () => getDefaultState();

const setAlert = (state, action) => ({
  ...state,
  alert: action.alert,
});

const setLoadingState = (state, action) => ({
  ...state,
  isLoading: action.isLoading,
});

const setSubmittingState = (state, { isSubmitting }) => ({
  ...state,
  isSubmitting,
});

const loadNewRecurringTransaction = (state, action) => ({
  ...state,
  schedule: {
    ...state.schedule,
    ...action.schedule,
  },
});

const updateScheduleOptions = (state, { key, value }) => {
  const remainingTimes =
    key === 'numberOfTimes' ? value : getScheduleRemainingTimes(state);

  return {
    ...state,
    schedule: {
      ...state.schedule,
      [key]: value,
      remainingTimes,
    },
  };
};

const handlers = {
  [SET_INITIAL_STATE]: setInitialState,
  [RESET_STATE]: resetState,
  [SET_ALERT]: setAlert,
  [SET_LOADING_STATE]: setLoadingState,
  [SET_SUBMITTING_STATE]: setSubmittingState,

  [LOAD_NEW_RECURRING_TRANSACTION]: loadNewRecurringTransaction,
  [UPDATE_SCHEDULE_OPTIONS]: updateScheduleOptions,
};

export default createReducer(getDefaultState(), handlers);
