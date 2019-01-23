import GeneralJournalIntents from '../../generalJournal/GeneralJournalIntents';
import generalJournalDetail from '../data/generalJournalDetail/generalJournalDetailEntry';
import generalJournalDetailNew from '../data/generalJournalDetail/generalJournalDetailNewEntry';
import successResponse from '../data/success';
import totalsResponse from '../data/generalJournalDetail/generalJournalDetailTotalsResponse';

const readGeneralJournalDetail = ({ onSuccess }) => onSuccess(generalJournalDetail);

const newGeneralJournalDetail = ({ onSuccess }) => onSuccess(generalJournalDetailNew);

const deleteGeneralJournalDetail = ({ onSuccess }) => onSuccess(successResponse);

const saveGeneralJournalDetail = ({ onSuccess }) => onSuccess(successResponse);

const getCalculatedTotals = ({ onSuccess }) => onSuccess(totalsResponse);

const GeneralJournalMapping = {
  [GeneralJournalIntents.LOAD_GENERAL_JOURNAL_DETAIL]: readGeneralJournalDetail,
  [GeneralJournalIntents.LOAD_NEW_GENERAL_JOURNAL]: newGeneralJournalDetail,
  [GeneralJournalIntents.DELETE_GENERAL_JOURNAL]: deleteGeneralJournalDetail,
  [GeneralJournalIntents.CREATE_GENERAL_JOURNAL]: saveGeneralJournalDetail,
  [GeneralJournalIntents.UPDATE_GENERAL_JOURNAL]: saveGeneralJournalDetail,
  [GeneralJournalIntents.GET_CALCULATED_TOTALS]: getCalculatedTotals,
};

export default GeneralJournalMapping;
