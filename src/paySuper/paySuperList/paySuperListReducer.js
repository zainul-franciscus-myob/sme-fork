import {
  LOAD_PAY_SUPER_LIST, SET_ALERT, SET_IS_LOADING, SET_IS_TABLE_LOADING, SET_SORT_ORDER,
} from './paySuperIntents';
import { RESET_STATE, SET_INITIAL_STATE } from '../../SystemIntents';
import createReducer from '../../store/createReducer';

export const getDefaultState = () => ({
  businessId: null,
  isRegistered: null,
  superPayments: [],
  isLoading: true,
  isTableLoading: false,
  sortDescending: true,
  orderBy: 'date',
  alert: null,
});

export const resetState = () => getDefaultState();

export const setInitialState = (state, { context }) => ({
  ...state,
  ...context,
});

const setIsLoading = (state, { isLoading }) => ({
  ...state,
  isLoading,
});

const setIsTableLoading = (state, { isTableLoading }) => ({
  ...state,
  isTableLoading,
});

const loadPaySuperList = (state, { response }) => ({
  ...state,
  isRegistered: response.isRegistered,
  superPayments: response.superPayments,
});

const setAlert = (state, { alert }) => ({
  ...state,
  alert,
});

const sortColumnUnchanged = (clickedColumn, currentColumn) => clickedColumn === currentColumn;
const DESCENDING = true;

const setSortOrder = (state, { orderBy }) => {
  const sortDescending = sortColumnUnchanged(orderBy, state.orderBy)
    ? !state.sortDescending
    : DESCENDING;

  return {
    ...state,
    orderBy,
    sortDescending,
  };
};

const handlers = {
  [RESET_STATE]: resetState,
  [SET_INITIAL_STATE]: setInitialState,
  [SET_IS_LOADING]: setIsLoading,
  [LOAD_PAY_SUPER_LIST]: loadPaySuperList,
  [SET_IS_TABLE_LOADING]: setIsTableLoading,
  [SET_SORT_ORDER]: setSortOrder,
  [SET_ALERT]: setAlert,
};

const paySuperListReducer = createReducer(getDefaultState(), handlers);

export default paySuperListReducer;
