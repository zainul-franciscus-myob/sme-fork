import GeneralJournalIntents from '../../generalJournal/GeneralJournalIntents';
import generalJournalEntries from '../data/generalJournalEntries';

const readGeneralJournalEntries = ({ onSuccess }) => {
  onSuccess(generalJournalEntries);
};

const filterGeneralJournalEntries = ({ onSuccess }) => {
  onSuccess(generalJournalEntries);
};

const GeneralJournalMapping = {
  [GeneralJournalIntents.LOAD_GENERAL_JOURNAL_ENTRIES]: readGeneralJournalEntries,
  [GeneralJournalIntents.FILTER_GENERAL_JOURNAL_ENTRIES]: filterGeneralJournalEntries,
};

export default GeneralJournalMapping;
