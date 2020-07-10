import {
  LOAD_BANKING_RULE_LIST,
  SORT_AND_FILTER_BANKING_RULE_LIST,
} from '../BankingRuleListIntents';
import filterBankingRuleListPayload from './data/filterBankingRuleList.json';
import loadBankRuleListPayload from './data/loadBankingRuleList.json';

const loadBankRuleList = ({ onSuccess }) => {
  onSuccess(loadBankRuleListPayload);
};
const filterBankRuleList = ({ onSuccess }) => {
  onSuccess(filterBankingRuleListPayload);
};

const MemoryBankingRuleMapping = {
  [LOAD_BANKING_RULE_LIST]: loadBankRuleList,
  [SORT_AND_FILTER_BANKING_RULE_LIST]: filterBankRuleList,
};

export default MemoryBankingRuleMapping;
