import GeneralJournalIntents from './GeneralJournalIntents';

const initialState = {
  generalJournal: {
    id: '',
    referenceId: '',
    date: '',
    gstReportingMethod: '',
    isEndOfYearAdjustment: false,
    isTaxInclusive: false,
    description: '',
    lines: [],
  },
  accounts: [],
};

const generalJournalDetailReducer = (state = initialState, action) => {
  switch (action.intent) {
    case GeneralJournalIntents.LOAD_GENERAL_JOURNAL_DETAIL:
      return {
        ...state,
        generalJournal: { ...state.generalJournal, ...action.generalJournal },
        accounts: action.accounts,
      };
    default:
      return state;
  }
};
export default generalJournalDetailReducer;
