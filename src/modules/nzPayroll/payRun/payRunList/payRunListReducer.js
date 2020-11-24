import { addYears } from 'date-fns';

import {
  FLIP_SORT_ORDER,
  RESET_FILTER_OPTIONS,
  SET_ALERT,
  SET_LOADING_STATE,
  SET_SORT_ORDER,
  SET_TABLE_LOADING_STATE,
  SORT_AND_FILTER_PAY_RUN_LIST,
  UPDATE_FILTER_OPTIONS,
} from './PayRunListIntents';
import { RESET_STATE, SET_INITIAL_STATE } from '../../../../SystemIntents';
import { getFlipSortOrder } from './payRunListSelectors';
import createReducer from '../../../../store/createReducer';
import formatIsoDate from '../../../../common/valueFormatters/formatDate/formatIsoDate';

const getDefaultDateRange = () => addYears(new Date(), -1);

export const getDefaultState = () => ({
  entries: [],
  filtersTouched: false,
  sortOrder: 'desc',
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

const resetState = () => ({ ...getDefaultState() });

const setTableLoadingState = (state, { isTableLoading }) => ({
  ...state,
  isTableLoading,
});

const setLoadingState = (state, { isLoading }) => ({
  ...state,
  isLoading,
});

const setAlert = (state, { alert }) => ({
  ...state,
  alert,
});

const setInitialState = (state, { context }) => ({
  ...state,
  ...context,
});

const updateFilterOptions = (state, { filterName, value }) => ({
  ...state,
  filterOptions: {
    ...state.filterOptions,
    [filterName]: value,
  },
});

const resetFilterOptions = (state) => ({
  ...state,
  filterOptions: getDefaultState().filterOptions,
});

const setSortOrder = (state, { sortOrder }) => ({
  ...state,
  sortOrder,
});

const flipSortOrder = (state) => ({
  ...state,
  sortOrder: getFlipSortOrder(state),
});

const sortAndFilterPayRunList = (state, { entries, sortOrder }) => ({
  ...state,
  entries,
  sortOrder,
});

const handlers = {
  [SET_TABLE_LOADING_STATE]: setTableLoadingState,
  [SET_LOADING_STATE]: setLoadingState,
  [SET_ALERT]: setAlert,
  [RESET_STATE]: resetState,
  [SET_INITIAL_STATE]: setInitialState,
  [UPDATE_FILTER_OPTIONS]: updateFilterOptions,
  [RESET_FILTER_OPTIONS]: resetFilterOptions,
  [SET_SORT_ORDER]: setSortOrder,
  [FLIP_SORT_ORDER]: flipSortOrder,
  [SORT_AND_FILTER_PAY_RUN_LIST]: sortAndFilterPayRunList,
};

const payRunListReducer = createReducer(getDefaultState(), handlers);

export default payRunListReducer;
