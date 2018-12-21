import SpendMoneyIntents from '../../spendMoney/SpendMoneyIntents';
import spendMoneyCalculatedTotals from '../data/spendMoney/spendMoneyDetailTotalsResponse';
import spendMoneyDetailEntry from '../data/spendMoney/spendMoneyDetailEntry';
import spendMoneyFilterResponse from '../data/spendMoneyList/filterSpendMoneyEntries';
import spendMoneyLoadResponse from '../data/spendMoneyList/loadSpendMoneyEntries';
import spendMoneyNewEntry from '../data/spendMoney/spendMoneyDetailNewEntry';
import spendMoneyReferenceId from '../data/spendMoney/spendMoneyDetailReferenceId';
import successResponse from '../data/success.json';

const newSpendMoney = ({ onSuccess }) => onSuccess(spendMoneyNewEntry);

const saveSpendMoney = ({ onSuccess }) => onSuccess(successResponse);

const deleteSpendMoney = ({ onSuccess }) => onSuccess(successResponse);

const updateSpendMoney = ({ onSuccess }) => onSuccess(successResponse);

const getSpendMoneyNextReferenceId = ({ onSuccess }) => onSuccess(spendMoneyReferenceId);

const getCalculatedTotals = ({ onSuccess }) => onSuccess(spendMoneyCalculatedTotals);

const loadSpendMoneyDetail = ({ onSuccess }) => onSuccess(spendMoneyDetailEntry);

const loadSpendMoneyEntries = ({ onSuccess }) => onSuccess(spendMoneyLoadResponse);

const filterSpendMoneyEntries = ({ onSuccess }) => onSuccess(spendMoneyFilterResponse);

const sortSpendMoneyEntries = ({ onSuccess }) => onSuccess(spendMoneyFilterResponse);

const SpendMoneyMapping = {
  [SpendMoneyIntents.LOAD_NEW_SPEND_MONEY]: newSpendMoney,
  [SpendMoneyIntents.CREATE_SPEND_MONEY]: saveSpendMoney,
  [SpendMoneyIntents.DELETE_SPEND_MONEY]: deleteSpendMoney,
  [SpendMoneyIntents.UPDATE_SPEND_MONEY]: updateSpendMoney,
  [SpendMoneyIntents.LOAD_REFERENCE_ID]: getSpendMoneyNextReferenceId,
  [SpendMoneyIntents.GET_CALCULATED_TOTALS]: getCalculatedTotals,
  [SpendMoneyIntents.LOAD_SPEND_MONEY_DETAIL]: loadSpendMoneyDetail,
  [SpendMoneyIntents.LOAD_SPEND_MONEY_ENTRIES]: loadSpendMoneyEntries,
  [SpendMoneyIntents.SORT_SPEND_MONEY_ENTRIES]: sortSpendMoneyEntries,
  [SpendMoneyIntents.FILTER_SPEND_MONEY_ENTRIES]: filterSpendMoneyEntries,
};

export default SpendMoneyMapping;
