import { addMonths } from 'date-fns';

import { RESET_STATE, SET_INITIAL_STATE } from '../../../SystemIntents';
import {
  SET_ALERT,
  SET_LOADING_STATE,
  SET_SORT_ORDER,
  SET_TABLE_LOADING_STATE,
  SORT_AND_FILTER_PAY_RUN_LIST,
  UPDATE_FILTER_OPTIONS,
} from './PayRunListIntents';
import createReducer from '../../../store/createReducer';
import formatIsoDate from '../../../common/valueFormatters/formatDate/formatIsoDate';

const getDefaultDateRange = () => addMonths(new Date(), -3);

const getDefaultState = () => ({
  entries: [],
  filtersTouched: false,
  sortOrder: 'desc',
  stpRegistrationStatus: 'notRegistered',
  alert: undefined,
  isLoading: true,
  isTableLoading: false,
  businessId: '',
  region: '',
  filterOptions: {
    dateFrom: formatIsoDate(getDefaultDateRange()),
    dateTo: formatIsoDate(new Date()),
  },
});

const resetState = () => getDefaultState();

const setTableLoadingState = (state, action) => ({
  ...state,
  isTableLoading: action.isTableLoading,
});

const setLoadingState = (state, action) => ({
  ...state,
  isLoading: action.isLoading,
});

const setAlert = (state, action) => ({
  ...state,
  alert: action.alert,
});

const setInitialState = (state, action) => ({
  ...state,
  ...action.context,
});

const updateFilterOptions = (state, action) => ({
  ...state,
  filterOptions: {
    ...state.filterOptions,
    [action.filterName]: action.value,
  },
});

const setSortOrder = (state, action) => ({
  ...state,
  sortOrder: action.sortOrder,
});

const sortAndFilterPayRunList = (state, action) => ({
  ...state,
  entries: action.entries,
  sortOrder: action.sortOrder,
  stpRegistrationStatus: action.stpRegistrationStatus,
});

const handlers = {
  [SET_TABLE_LOADING_STATE]: setTableLoadingState,
  [SET_LOADING_STATE]: setLoadingState,
  [SET_ALERT]: setAlert,
  [RESET_STATE]: resetState,
  [SET_INITIAL_STATE]: setInitialState,
  [UPDATE_FILTER_OPTIONS]: updateFilterOptions,
  [SET_SORT_ORDER]: setSortOrder,
  [SORT_AND_FILTER_PAY_RUN_LIST]: sortAndFilterPayRunList,
};

const payRunListReducer = createReducer(getDefaultState(), handlers);

export default payRunListReducer;
