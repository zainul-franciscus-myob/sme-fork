import GeneralJournalIntents from './GeneralJournalIntents';
import SystemIntents from '../SystemIntents';

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

const generalJournalReducer = (state = initialState, action) => {
  switch (action.intent) {
    case SystemIntents.RESET_STATE:
      return {
        ...initialState,
      };
    case GeneralJournalIntents.LOAD_GENERAL_JOURNAL_ENTRIES:
      return {
        ...state,
        entries: action.entries,
        filterOptions: {
          ...state.filterOptions,
          ...action.filterOptions,
        },
        sortOrder: action.sortOrder,
        isLoading: action.isLoading,
      };

    case GeneralJournalIntents.FILTER_GENERAL_JOURNAL_ENTRIES:
      return {
        ...state,
        entries: action.entries,
      };

    case GeneralJournalIntents.UPDATE_FILTER_OPTIONS:
      return {
        ...state,
        filterOptions: {
          ...state.filterOptions,
          [action.filterName]: action.value,
        },
      };

    case GeneralJournalIntents.SORT_GENERAL_JOURNAL_ENTRIES:
      return {
        ...state,
        entries: action.entries,
        sortOrder: action.sortOrder,
      };

    case GeneralJournalIntents.SET_ALERT_MESSAGE:
      return {
        ...state,
        alertMessage: action.alertMessage,
      };
    case GeneralJournalIntents.SET_LOADING_STATE:
      return {
        ...state,
        isLoading: action.isLoading,
      };
    case GeneralJournalIntents.SET_TABLE_LOADING_STATE:
      return {
        ...state,
        isTableLoading: action.isTableLoading,
      };
    default:
      return state;
  }
};

export default generalJournalReducer;
