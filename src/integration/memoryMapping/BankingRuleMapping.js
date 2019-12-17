import {
  LOAD_BANKING_RULE_LIST,
  SORT_AND_FILTER_BANKING_RULE_LIST,
} from '../../modules/bankingRules/bankingRuleList/BankingRuleListIntents';
import filterBankingRuleListPayload from '../data/bankingRule/filterBankingRuleList.json';
import loadBankRuleListPayload from '../data/bankingRule/loadBankingRuleList.json';

const loadBankRuleList = ({ onSuccess }) => { onSuccess(loadBankRuleListPayload); };
const filterBankRuleList = ({ onSuccess }) => { onSuccess(filterBankingRuleListPayload); };

const BankingRuleMapping = {
  [LOAD_BANKING_RULE_LIST]: loadBankRuleList,
  [SORT_AND_FILTER_BANKING_RULE_LIST]: filterBankRuleList,
};

export default BankingRuleMapping;
