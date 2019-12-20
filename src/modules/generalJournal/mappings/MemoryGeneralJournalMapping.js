import {
  CREATE_GENERAL_JOURNAL,
  DELETE_GENERAL_JOURNAL,
  GET_CALCULATED_TOTALS,
  LOAD_GENERAL_JOURNAL_DETAIL,
  LOAD_NEW_GENERAL_JOURNAL,
  UPDATE_GENERAL_JOURNAL,
} from '../GeneralJournalIntents';
import generalJournalDetail from './data/generalJournalDetailEntry';
import generalJournalDetailNew from './data/generalJournalDetailNewEntry';
import successResponse from './data/success.json';
import totalsResponse from './data/generalJournalDetailTotalsResponse';

const readGeneralJournalDetail = ({ onSuccess }) => onSuccess(generalJournalDetail);

const newGeneralJournalDetail = ({ onSuccess }) => onSuccess(generalJournalDetailNew);

const deleteGeneralJournalDetail = ({ onSuccess }) => onSuccess(successResponse);

const saveGeneralJournalDetail = ({ onSuccess }) => onSuccess(successResponse);

const getCalculatedTotals = ({ onSuccess }) => onSuccess(totalsResponse);

const MemoryGeneralJournalMapping = {
  [LOAD_GENERAL_JOURNAL_DETAIL]: readGeneralJournalDetail,
  [LOAD_NEW_GENERAL_JOURNAL]: newGeneralJournalDetail,
  [DELETE_GENERAL_JOURNAL]: deleteGeneralJournalDetail,
  [CREATE_GENERAL_JOURNAL]: saveGeneralJournalDetail,
  [UPDATE_GENERAL_JOURNAL]: saveGeneralJournalDetail,
  [GET_CALCULATED_TOTALS]: getCalculatedTotals,
};

export default MemoryGeneralJournalMapping;
