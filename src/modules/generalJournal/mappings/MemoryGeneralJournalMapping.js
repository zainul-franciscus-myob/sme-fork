import {
  CREATE_GENERAL_JOURNAL,
  DELETE_GENERAL_JOURNAL,
  LOAD_ACCOUNT_AFTER_CREATE,
  LOAD_DUPLICATE_GENERAL_JOURNAL,
  LOAD_GENERAL_JOURNAL_DETAIL,
  LOAD_JOB_AFTER_CREATE,
  LOAD_NEW_GENERAL_JOURNAL,
  UPDATE_GENERAL_JOURNAL,
} from '../GeneralJournalIntents';
import createGeneralJournalResponse from './data/createGeneralJournal';
import createdAccountResponse from './data/createdAccount';
import createdJobResponse from './data/createdJob';
import duplicateGeneralJournalEntry from './data/duplicateGeneralJournalEntry';
import generalJournalDetail from './data/generalJournalDetailEntry';
import generalJournalDetailNew from './data/generalJournalDetailNewEntry';
import successResponse from './data/success';

const readGeneralJournalDetail = ({ onSuccess }) =>
  onSuccess(generalJournalDetail);

const newGeneralJournalDetail = ({ onSuccess }) =>
  onSuccess(generalJournalDetailNew);

const deleteGeneralJournalDetail = ({ onSuccess }) =>
  onSuccess(successResponse);

const createGeneralJournal = ({ onSuccess }) =>
  onSuccess(createGeneralJournalResponse);

const updateGeneralJournal = ({ onSuccess }) => onSuccess(successResponse);

const loadCreatedAccount = ({ onSuccess }) => onSuccess(createdAccountResponse);

const loadCreatedJob = ({ onSuccess }) => onSuccess(createdJobResponse);

const loadDuplicateGeneralJournal = ({ onSuccess }) =>
  onSuccess(duplicateGeneralJournalEntry);

const MemoryGeneralJournalMapping = {
  [LOAD_GENERAL_JOURNAL_DETAIL]: readGeneralJournalDetail,
  [LOAD_NEW_GENERAL_JOURNAL]: newGeneralJournalDetail,
  [DELETE_GENERAL_JOURNAL]: deleteGeneralJournalDetail,
  [CREATE_GENERAL_JOURNAL]: createGeneralJournal,
  [UPDATE_GENERAL_JOURNAL]: updateGeneralJournal,
  [LOAD_ACCOUNT_AFTER_CREATE]: loadCreatedAccount,
  [LOAD_JOB_AFTER_CREATE]: loadCreatedJob,
  [LOAD_DUPLICATE_GENERAL_JOURNAL]: loadDuplicateGeneralJournal,
};

export default MemoryGeneralJournalMapping;
