import * as JournalIntents from '../../journal/JournalIntents';
import generalJournalEntries from '../data/generalJournalEntries';

const readGeneralJournalEntries = (onSuccess) => {
  onSuccess(generalJournalEntries);
};

export default {
  [JournalIntents.LOAD_GENERAL_JOURNAL_ENTRIES]: readGeneralJournalEntries,
};
