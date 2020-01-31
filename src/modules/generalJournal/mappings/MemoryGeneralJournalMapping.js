import {
  CREATE_GENERAL_JOURNAL,
  DELETE_GENERAL_JOURNAL,
  LOAD_GENERAL_JOURNAL_DETAIL,
  LOAD_NEW_GENERAL_JOURNAL,
  UPDATE_GENERAL_JOURNAL,
} from '../GeneralJournalIntents';
import generalJournalDetail from './data/generalJournalDetailEntry';
import generalJournalDetailNew from './data/generalJournalDetailNewEntry';
import successResponse from './data/success.json';

const readGeneralJournalDetail = ({ onSuccess }) => onSuccess(generalJournalDetail);

const newGeneralJournalDetail = ({ onSuccess }) => onSuccess(generalJournalDetailNew);

const deleteGeneralJournalDetail = ({ onSuccess }) => onSuccess(successResponse);

const saveGeneralJournalDetail = ({ onSuccess }) => onSuccess(successResponse);

const MemoryGeneralJournalMapping = {
  [LOAD_GENERAL_JOURNAL_DETAIL]: readGeneralJournalDetail,
  [LOAD_NEW_GENERAL_JOURNAL]: newGeneralJournalDetail,
  [DELETE_GENERAL_JOURNAL]: deleteGeneralJournalDetail,
  [CREATE_GENERAL_JOURNAL]: saveGeneralJournalDetail,
  [UPDATE_GENERAL_JOURNAL]: saveGeneralJournalDetail,
};

export default MemoryGeneralJournalMapping;
