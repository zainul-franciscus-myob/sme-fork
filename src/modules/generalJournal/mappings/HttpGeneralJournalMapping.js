import {
  CREATE_GENERAL_JOURNAL,
  DELETE_GENERAL_JOURNAL,
  LOAD_ACCOUNT_AFTER_CREATE,
  LOAD_GENERAL_JOURNAL_DETAIL,
  LOAD_NEW_GENERAL_JOURNAL,
  UPDATE_GENERAL_JOURNAL,
} from '../GeneralJournalIntents';

const HttpGeneralJournalMapping = {
  [LOAD_GENERAL_JOURNAL_DETAIL]: {
    method: 'GET',
    getPath: ({ businessId, generalJournalId }) => `/${businessId}/generalJournal/load_general_journal_detail/${generalJournalId}`,
  },
  [LOAD_NEW_GENERAL_JOURNAL]: {
    method: 'GET',
    getPath: ({ businessId }) => `/${businessId}/generalJournal/load_new_general_journal_detail`,
  },
  [CREATE_GENERAL_JOURNAL]: {
    method: 'POST',
    getPath: ({ businessId }) => `/${businessId}/generalJournal/create_general_journal_detail`,
  },
  [UPDATE_GENERAL_JOURNAL]: {
    method: 'PUT',
    getPath: ({ businessId, generalJournalId }) => `/${businessId}/generalJournal/update_general_journal_detail/${generalJournalId}`,
  },
  [DELETE_GENERAL_JOURNAL]: {
    method: 'DELETE',
    getPath: ({ businessId, generalJournalId }) => `/${businessId}/generalJournal/delete_general_journal_detail/${generalJournalId}`,
  },
  [LOAD_ACCOUNT_AFTER_CREATE]: {
    method: 'GET',
    getPath: ({ businessId, accountId }) => `/${businessId}/generalJournal/load_account/${accountId}`,
  },
};

export default HttpGeneralJournalMapping;
