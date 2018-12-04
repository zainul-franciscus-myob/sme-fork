import GeneralJournalIntents from '../GeneralJournalIntents';
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
  alertMessage: '',
  isLoading: true,
  isTableLoading: false,
};

const resetState = () => (initialState);

const loadGeneralJournalEntries = (state, action) => ({
  ...state,
  entries: action.entries,
  filterOptions: {
    ...state.filterOptions,
    ...action.filterOptions,
  },
  sortOrder: action.sortOrder,
  isLoading: action.isLoading,
});

const filterGeneralJournalEntries = (state, action) => ({
  ...state,
  entries: action.entries,
});

const updateFilterOptions = (state, action) => ({
  ...state,
  filterOptions: {
    ...state.filterOptions,
    [action.filterName]: action.value,
  },
});

const sortGeneralJournalEntries = (state, action) => ({
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

const setAlertMessage = (state, action) => ({
  ...state,
  alertMessage: action.alertMessage,
});

const handlers = {
  [GeneralJournalIntents.LOAD_GENERAL_JOURNAL_ENTRIES]: loadGeneralJournalEntries,
  [GeneralJournalIntents.FILTER_GENERAL_JOURNAL_ENTRIES]: filterGeneralJournalEntries,
  [GeneralJournalIntents.UPDATE_FILTER_OPTIONS]: updateFilterOptions,
  [GeneralJournalIntents.SORT_GENERAL_JOURNAL_ENTRIES]: sortGeneralJournalEntries,
  [GeneralJournalIntents.SET_TABLE_LOADING_STATE]: setTableLoadingState,
  [GeneralJournalIntents.SET_LOADING_STATE]: setLoadingState,
  [GeneralJournalIntents.SET_ALERT_MESSAGE]: setAlertMessage,
  [SystemIntents.RESET_STATE]: resetState,
};

const generalJournalReducer = createReducer(initialState, handlers);

export default generalJournalReducer;
