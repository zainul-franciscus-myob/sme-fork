import { FILTER_GENERAL_JOURNAL_ENTRIES, LOAD_GENERAL_JOURNAL_ENTRIES, UPDATE_FILTER_OPTIONS } from './JournalIntents';

const initialState = {
  entries: [],
  filterOptions: {
    dateFrom: '',
    dateTo: '',
    descriptionSearchText: '',
  },
};

export default (state = initialState, action) => {
  switch (action.intent) {
    case LOAD_GENERAL_JOURNAL_ENTRIES:
      return {
        ...state,
        entries: action.entries,
        filterOptions: {
          ...state.filterOptions,
          ...action.filterOptions,
        },
      };

    case FILTER_GENERAL_JOURNAL_ENTRIES:
      return {
        ...state,
        entries: action.entries,
      };

    case UPDATE_FILTER_OPTIONS:
      return {
        ...state,
        filterOptions: {
          ...state.filterOptions,
          [action.filterName]: action.value,
        },
      };

    default:
      return state;
  }
};
