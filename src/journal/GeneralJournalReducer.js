import { LOAD_GENERAL_JOURNAL_ENTRIES } from './JournalIntents';

export default (state = { entries: [] }, action) => {
  switch (action.intent) {
    case LOAD_GENERAL_JOURNAL_ENTRIES:
      return {
        ...state,
        entries: action.entries,
      };

    default:
      return state;
  }
};
