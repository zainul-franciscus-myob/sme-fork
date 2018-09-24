import GeneralJournalIntents from './GeneralJournalIntents';

const initialState = {
  entries: [],
  filterOptions: {
    dateFrom: '',
    dateTo: '',
    descriptionSearchText: '',
  },
};

const generalJournalReducer = (state = initialState, action) => {
  switch (action.intent) {
    case GeneralJournalIntents.LOAD_GENERAL_JOURNAL_ENTRIES:
      return {
        ...state,
        entries: action.entries,
        filterOptions: {
          ...state.filterOptions,
          ...action.filterOptions,
        },
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

    default:
      return state;
  }
};

export default generalJournalReducer;
