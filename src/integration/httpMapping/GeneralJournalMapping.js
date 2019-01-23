import GeneralJournalIntents from '../../generalJournal/GeneralJournalIntents';

const GeneralJournalMapping = {
  [GeneralJournalIntents.LOAD_GENERAL_JOURNAL_DETAIL]: {
    method: 'GET',
    getPath: ({ businessId, generalJournalId }) => `/${businessId}/generalJournal/load_general_journal_detail/${generalJournalId}`,
  },
  [GeneralJournalIntents.LOAD_NEW_GENERAL_JOURNAL]: {
    method: 'GET',
    getPath: ({ businessId }) => `/${businessId}/generalJournal/load_new_general_journal_detail`,
  },
  [GeneralJournalIntents.CREATE_GENERAL_JOURNAL]: {
    method: 'POST',
    getPath: ({ businessId }) => `/${businessId}/generalJournal/create_general_journal_detail`,
  },
  [GeneralJournalIntents.UPDATE_GENERAL_JOURNAL]: {
    method: 'PUT',
    getPath: ({ businessId, generalJournalId }) => `/${businessId}/generalJournal/update_general_journal_detail/${generalJournalId}`,
  },
  [GeneralJournalIntents.DELETE_GENERAL_JOURNAL]: {
    method: 'DELETE',
    getPath: ({ businessId, generalJournalId }) => `/${businessId}/generalJournal/delete_general_journal_detail/${generalJournalId}`,
  },
  [GeneralJournalIntents.GET_CALCULATED_TOTALS]: {
    method: 'POST',
    getPath: ({ businessId }) => `/${businessId}/generalJournal/calculate_totals`,
  },
};

export default GeneralJournalMapping;
