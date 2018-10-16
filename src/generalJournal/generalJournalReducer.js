import GeneralJournalIntents from './GeneralJournalIntents';

const initialState = {
  entries: [],
  filterOptions: {
    dateFrom: '',
    dateTo: '',
    search: '',
  },
  order: '',
  orderBy: '',
  alertMessage: '',
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
        order: action.order,
        orderBy: action.orderBy,
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
        order: action.order,
        orderBy: action.orderBy,
      };

    case GeneralJournalIntents.SET_ALERT_MESSAGE:
      return {
        ...state,
        alertMessage: action.alertMessage,
      };

    default:
      return state;
  }
};

export default generalJournalReducer;
