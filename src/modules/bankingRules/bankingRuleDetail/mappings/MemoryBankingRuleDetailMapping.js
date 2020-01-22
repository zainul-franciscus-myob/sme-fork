import {
  CREATE_BANKING_RULE,
  DELETE_BANKING_RULE,
  LOAD_BANKING_RULE,
  LOAD_NEW_BANKING_RULE,
  UPDATE_BANKING_RULE,
} from '../BankingRuleDetailIntents';
import loadBankingRuleDetail from './data/loadBankingRuleDetail.json';
import loadNewBankingRuleDetail from './data/loadNewBankingRuleDetail.json';
import successMessage from './data/success.json';

const MemoryBankingRuleDetailMapping = {
  [LOAD_NEW_BANKING_RULE]: ({ onSuccess }) => onSuccess(loadNewBankingRuleDetail),
  [LOAD_BANKING_RULE]: ({ onSuccess }) => onSuccess(loadBankingRuleDetail),
  [CREATE_BANKING_RULE]: ({ onSuccess }) => onSuccess(successMessage),
  [UPDATE_BANKING_RULE]: ({ onSuccess }) => onSuccess(successMessage),
  [DELETE_BANKING_RULE]: ({ onSuccess }) => onSuccess(successMessage),
};

export default MemoryBankingRuleDetailMapping;
