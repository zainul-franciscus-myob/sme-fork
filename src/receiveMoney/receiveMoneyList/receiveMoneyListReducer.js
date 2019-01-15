import dateFormat from 'dateformat';

import ReceiveMoneyIntents from '../ReceiveMoneyIntents';
import SystemIntents from '../../SystemIntents';
import createReducer from '../../store/createReducer';

const convertToDateString = time => dateFormat(Number(time), 'yyyy-mm-dd');
const getDefaultDateRange = () => new Date().setMonth(new Date().getMonth() - 3);

const getInitialState = () => ({
  entries: [],
  filterOptions: {
    dateFrom: convertToDateString(getDefaultDateRange()),
    dateTo: convertToDateString(Date.now()),
    keywords: '',
  },
  sortOrder: '',
  alert: undefined,
  isLoading: true,
  isTableLoading: false,
});

const resetState = () => (getInitialState());

const loadReceiveMoneyEntries = (state, action) => ({
  ...state,
  entries: action.entries,
  sortOrder: action.sortOrder,
  isLoading: action.isLoading,
});

const filterReceiveMoneyEntries = (state, action) => ({
  ...state,
  entries: action.entries,
});

const isDateFilterChange = filterName => filterName === 'dateTo' || filterName === 'dateFrom';

const updateFilterOptions = (state, action) => ({
  ...state,
  filterOptions: {
    ...state.filterOptions,
    [action.filterName]: isDateFilterChange(action.filterName)
      ? convertToDateString(action.value)
      : action.value,
  },
});

const sortReceiveMoneyEntries = (state, action) => ({
  ...state,
  entries: action.entries,
  sortOrder: action.sortOrder,
});

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

const handlers = {
  [ReceiveMoneyIntents.LOAD_RECEIVE_MONEY_ENTRIES]: loadReceiveMoneyEntries,
  [ReceiveMoneyIntents.FILTER_RECEIVE_MONEY_ENTRIES]: filterReceiveMoneyEntries,
  [ReceiveMoneyIntents.UPDATE_FILTER_OPTIONS]: updateFilterOptions,
  [ReceiveMoneyIntents.SORT_RECEIVE_MONEY_ENTRIES]: sortReceiveMoneyEntries,
  [ReceiveMoneyIntents.SET_TABLE_LOADING_STATE]: setTableLoadingState,
  [ReceiveMoneyIntents.SET_LOADING_STATE]: setLoadingState,
  [ReceiveMoneyIntents.SET_ALERT]: setAlert,
  [SystemIntents.RESET_STATE]: resetState,
};

const receiveMoneyReducer = createReducer(getInitialState(), handlers);

export default receiveMoneyReducer;
