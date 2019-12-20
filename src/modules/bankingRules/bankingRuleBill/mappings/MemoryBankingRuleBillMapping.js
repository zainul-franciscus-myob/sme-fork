import {
  CREATE_BANKING_RULE_BILL,
  DELETE_BANKING_RULE_BILL,
  LOAD_BANKING_RULE_BILL,
  LOAD_NEW_BANKING_RULE_BILL,
  UPDATE_BANKING_RULE_BILL,
} from '../BankingRuleBillIntents';
import loadBankingRuleBill from './data/loadBankingRuleBill.json';
import loadNewBankingRuleBill from './data/loadNewBankingRuleBill.json';
import successMessage from './data/success.json';

const MemoryBankingRuleBillMapping = {
  [LOAD_NEW_BANKING_RULE_BILL]: ({ onSuccess }) => onSuccess(
    loadNewBankingRuleBill,
  ),
  [LOAD_BANKING_RULE_BILL]: ({ onSuccess }) => onSuccess(loadBankingRuleBill),
  [CREATE_BANKING_RULE_BILL]: ({ onSuccess }) => onSuccess(successMessage),
  [UPDATE_BANKING_RULE_BILL]: ({ onSuccess }) => onSuccess(successMessage),
  [DELETE_BANKING_RULE_BILL]: ({ onSuccess }) => onSuccess(successMessage),
};

export default MemoryBankingRuleBillMapping;
