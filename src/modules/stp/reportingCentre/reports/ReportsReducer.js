import { RESET_STATE, SET_INITIAL_STATE } from '../../../../SystemIntents';
import {
  SET_DETAILS_LOADING_STATE,
  SET_FILTERED_PAY_EVENTS,
  SET_LOADING_STATE,
  SET_PAY_EVENTS,
  SET_PAY_EVENT_DETAILS,
  SET_SELECTED_PAYROLL_YEAR,
  SET_SELECTED_PAY_EVENT,
  SET_TABLE_LOADING_STATE,
} from './ReportsIntents';
import LoadingState from '../../../../components/PageView/LoadingState';
import createReducer from '../../../../store/createReducer';

export const getDefaultState = () => ({
  loadingState: LoadingState.LOADING,
  isTableLoading: false,
  detailsLoadingState: LoadingState.LOADING,
  payrollYears: [],
  selectedPayrollYear: '',
  payEvents: [],
  selectedPayEvent: null,
});

const setInitialState = (state, { context }) => ({
  ...state,
  ...context,
});

const resetState = () => ({
  ...getDefaultState(),
});

const setLoadingState = (state, { loadingState }) => ({
  ...state,
  loadingState,
});

const setIsTableLoading = (state, { isTableLoading }) => ({
  ...state,
  isTableLoading,
});

const setIsDetailsLoading = (state, { detailsLoadingState }) => ({
  ...state,
  detailsLoadingState,
});

const setPayEvents = (state, { response }) => ({
  ...state,
  ...response,
  selectedPayrollYear:
    (response.payrollYears &&
      response.payrollYears[0] &&
      response.payrollYears[0].year) ||
    '',
});

const setFilteredPayEvents = (state, { response }) => ({
  ...state,
  ...response,
});

const setSelectedPayrollYear = (state, { selectedPayrollYear }) => ({
  ...state,
  selectedPayrollYear,
});

const setSelectedPayEvent = (state, { selectedPayEventId }) => ({
  ...state,
  selectedPayEvent: state.payEvents.find((p) => p.id === selectedPayEventId),
});

const setPayEventDetails = (state, { response }) => ({
  ...state,
  selectedPayEvent: {
    ...state.selectedPayEvent,
    ...response,
  },
  payEvents: state.payEvents.map((payEvent) =>
    payEvent.id === response.id
      ? {
          ...payEvent,
          status: response.status,
        }
      : payEvent
  ),
});

const handlers = {
  [SET_INITIAL_STATE]: setInitialState,
  [RESET_STATE]: resetState,
  [SET_LOADING_STATE]: setLoadingState,
  [SET_TABLE_LOADING_STATE]: setIsTableLoading,
  [SET_DETAILS_LOADING_STATE]: setIsDetailsLoading,
  [SET_PAY_EVENTS]: setPayEvents,
  [SET_FILTERED_PAY_EVENTS]: setFilteredPayEvents,
  [SET_SELECTED_PAYROLL_YEAR]: setSelectedPayrollYear,
  [SET_SELECTED_PAY_EVENT]: setSelectedPayEvent,
  [SET_PAY_EVENT_DETAILS]: setPayEventDetails,
};

const reportsReducer = createReducer(getDefaultState(), handlers);

export default reportsReducer;
