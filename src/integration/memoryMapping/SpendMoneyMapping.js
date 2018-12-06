import SpendMoneyIntents from '../../spendMoney/SpendMoneyIntents';
import spendMoneyCalculatedTotals from '../data/spendMoney/spendMoneyDetailTotalsResponse';
import spendMoneyNewEntry from '../data/spendMoney/spendMoneyDetailNewEntry';
import spendMoneyReferenceId from '../data/spendMoney/spendMoneyDetailReferenceId';
import successResponse from '../data/success.json';

const newSpendMoney = ({ onSuccess }) => onSuccess(spendMoneyNewEntry);

const saveSpendMoney = ({ onSuccess }) => onSuccess(successResponse);

const getSpendMoneyNextReferenceId = ({ onSuccess }) => onSuccess(spendMoneyReferenceId);

const getCalculatedTotals = ({ onSuccess }) => onSuccess(spendMoneyCalculatedTotals);

const SpendMoneyMapping = {
  [SpendMoneyIntents.LOAD_NEW_SPEND_MONEY]: newSpendMoney,
  [SpendMoneyIntents.CREATE_SPEND_MONEY]: saveSpendMoney,
  [SpendMoneyIntents.LOAD_REFERENCE_ID]: getSpendMoneyNextReferenceId,
  [SpendMoneyIntents.GET_CALCULATED_TOTALS]: getCalculatedTotals,
};

export default SpendMoneyMapping;
