import GeneralJournalIntents from '../../generalJournal/GeneralJournalIntents';
import generalJournalDetail from '../data/generalJournalEntryDetail';
import generalJournalEntries from '../data/generalJournalEntries';

const readGeneralJournalEntries = ({ onSuccess }) => {
  onSuccess(generalJournalEntries);
};

const filterGeneralJournalEntries = ({ onSuccess }) => {
  onSuccess(generalJournalEntries);
};

const sortGeneralJournalEntries = ({ onSuccess }) => {
  onSuccess(generalJournalEntries);
};

const readGeneralJournalDetail = ({ onSuccess }) => {
  onSuccess(generalJournalDetail);
};

const deleteGeneralJournalDetail = ({ onSuccess }) => {
  onSuccess();
};

const saveGeneralJournalDetail = ({ onSuccess }) => {
  onSuccess();
};

const GeneralJournalMapping = {
  [GeneralJournalIntents.LOAD_GENERAL_JOURNAL_ENTRIES]: readGeneralJournalEntries,
  [GeneralJournalIntents.FILTER_GENERAL_JOURNAL_ENTRIES]: filterGeneralJournalEntries,
  [GeneralJournalIntents.SORT_GENERAL_JOURNAL_ENTRIES]: sortGeneralJournalEntries,
  [GeneralJournalIntents.LOAD_GENERAL_JOURNAL_DETAIL]: readGeneralJournalDetail,
  [GeneralJournalIntents.DELETE_GENERAL_JOURNAL_DETAIL]: deleteGeneralJournalDetail,
  [GeneralJournalIntents.SAVE_GENERAL_JOURNAL_DETAIL]: saveGeneralJournalDetail,
};

export default GeneralJournalMapping;
