import GeneralJournalIntents from '../../generalJournal/GeneralJournalIntents';
import generalJournalDetail from '../data/generalJournalDetail/generalJournalDetailEntry';
import generalJournalDetailNew from '../data/generalJournalDetail/generalJournalDetailNewEntry';
import taxResponse from '../data/generalJournalDetail/generalJournalDetailTotalsResponse';


const readGeneralJournalDetail = ({ onSuccess }) => onSuccess(generalJournalDetail);

const newGeneralJournalDetail = ({ onSuccess }) => onSuccess(generalJournalDetailNew);

const deleteGeneralJournalDetail = ({ onSuccess }) => onSuccess();

const saveGeneralJournalDetail = ({ onSuccess }) => onSuccess();

const getCalculatedTax = ({ onSuccess }) => onSuccess(taxResponse);

const GeneralJournalMapping = {
  [GeneralJournalIntents.LOAD_GENERAL_JOURNAL_DETAIL]: readGeneralJournalDetail,
  [GeneralJournalIntents.LOAD_NEW_GENERAL_JOURNAL_DETAIL]: newGeneralJournalDetail,
  [GeneralJournalIntents.DELETE_GENERAL_JOURNAL_DETAIL]: deleteGeneralJournalDetail,
  [GeneralJournalIntents.CREATE_GENERAL_JOURNAL_DETAIL]: saveGeneralJournalDetail,
  [GeneralJournalIntents.SAVE_GENERAL_JOURNAL_DETAIL]: saveGeneralJournalDetail,
  [GeneralJournalIntents.GET_CALCULATED_TAX]: getCalculatedTax,
};

export default GeneralJournalMapping;
