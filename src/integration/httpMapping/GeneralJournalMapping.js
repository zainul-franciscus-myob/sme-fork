import GeneralJournalIntents from '../../generalJournal/GeneralJournalIntents';

const GeneralJournalMapping = {
  [GeneralJournalIntents.LOAD_GENERAL_JOURNAL_DETAIL]: {
    method: 'GET',
    getPath: ({ businessId, journalId }) => `/${businessId}/generalJournal/load_general_journal_detail/${journalId}`,
  },
  [GeneralJournalIntents.LOAD_NEW_GENERAL_JOURNAL_DETAIL]: {
    method: 'GET',
    getPath: ({ businessId }) => `/${businessId}/generalJournal/load_new_general_journal_detail`,
  },
  [GeneralJournalIntents.CREATE_GENERAL_JOURNAL_DETAIL]: {
    method: 'POST',
    getPath: ({ businessId }) => `/${businessId}/generalJournal/create_general_journal_detail`,
  },
  [GeneralJournalIntents.SAVE_GENERAL_JOURNAL_DETAIL]: {
    method: 'PUT',
    getPath: ({ businessId, journalId }) => `/${businessId}/generalJournal/update_general_journal_detail/${journalId}`,
  },
  [GeneralJournalIntents.DELETE_GENERAL_JOURNAL_DETAIL]: {
    method: 'DELETE',
    getPath: ({ businessId, journalId }) => `/${businessId}/generalJournal/delete_general_journal_detail/${journalId}`,
  },
  [GeneralJournalIntents.GET_CALCULATED_TAX]: {
    method: 'POST',
    getPath: ({ businessId }) => `/${businessId}/generalJournal/tax`,
  },
};

export default GeneralJournalMapping;
