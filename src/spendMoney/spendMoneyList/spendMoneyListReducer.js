import SpendMoneyIntents from '../SpendMoneyIntents';
import SystemIntents from '../../SystemIntents';
import createReducer from '../../store/createReducer';

const initialState = {
  entries: [],
  filterOptions: {
    dateFrom: '',
    dateTo: '',
    keywords: '',
  },
  sortOrder: '',
  alert: undefined,
  isLoading: true,
  isTableLoading: false,
};

const resetState = () => (initialState);

const convertToDateString = unixTime => new Date(Number(unixTime)).toISOString().substring(0, 10);

const getDefaultDateRange = () => new Date().setMonth(new Date().getMonth() - 3);

const loadSpendMoneyEntries = (state, action) => ({
  ...state,
  entries: action.entries,
  filterOptions: {
    ...state.filterOptions,
    dateFrom: convertToDateString(getDefaultDateRange()),
    dateTo: convertToDateString(Date.now()),
    keywords: action.keywords,
  },
  sortOrder: action.sortOrder,
  isLoading: action.isLoading,
});

const isDateFilterChange = filterName => filterName === 'dateTo' || filterName === 'dateFrom';

const filterSpendMoneyEntries = (state, action) => ({
  ...state,
  entries: action.entries,
});

const updateFilterOptions = (state, action) => ({
  ...state,
  filterOptions: {
    ...state.filterOptions,
    [action.filterName]: isDateFilterChange(action.filterName)
      ? convertToDateString(action.value)
      : action.value,
  },
});

const sortSpendMoneyEntries = (state, action) => ({
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
  [SpendMoneyIntents.LOAD_SPEND_MONEY_ENTRIES]: loadSpendMoneyEntries,
  [SpendMoneyIntents.FILTER_SPEND_MONEY_ENTRIES]: filterSpendMoneyEntries,
  [SpendMoneyIntents.UPDATE_FILTER_OPTIONS]: updateFilterOptions,
  [SpendMoneyIntents.SORT_SPEND_MONEY_ENTRIES]: sortSpendMoneyEntries,
  [SpendMoneyIntents.SET_TABLE_LOADING_STATE]: setTableLoadingState,
  [SpendMoneyIntents.SET_LOADING_STATE]: setLoadingState,
  [SpendMoneyIntents.SET_ALERT]: setAlert,
  [SystemIntents.RESET_STATE]: resetState,
};

const spendMoneyReducer = createReducer(initialState, handlers);

export default spendMoneyReducer;
