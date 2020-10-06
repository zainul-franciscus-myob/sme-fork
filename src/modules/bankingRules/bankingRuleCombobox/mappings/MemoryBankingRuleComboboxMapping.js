import {
  LOAD_BANKING_RULE_COMBOBOX_OPTIONS,
  LOAD_BANKING_RULE_COMBOBOX_OPTION_BY_ID,
  SEARCH_COMBOBOX_BANKING_RULE,
} from '../BankingRuleComboboxIntents';
import loadBankingRuleOptionByIdResponse from './data/loadBankingRuleOptionByIdResponse';
import loadComboboxOptionsResponse from './data/loadComboboxOptionsResponse';
import loadItemSearchResponse from './data/loadComboboxSearchResponse';

const MemoryBankingRuleComboboxMapping = {
  [LOAD_BANKING_RULE_COMBOBOX_OPTIONS]: ({ onSuccess }) => {
    const bankingRuleOptions = loadComboboxOptionsResponse.bankingRuleOptions.map(
      (option) => {
        const id = String(Math.floor(Math.random() * 100) + 1);
        return { ...option, id, name: `Banking Rule ${id}` };
      }
    );
    onSuccess({ ...loadComboboxOptionsResponse, bankingRuleOptions });
  },
  [LOAD_BANKING_RULE_COMBOBOX_OPTION_BY_ID]: ({
    urlParams: { bankingRuleId },
    onSuccess,
  }) => onSuccess({ ...loadBankingRuleOptionByIdResponse, id: bankingRuleId }),
  [SEARCH_COMBOBOX_BANKING_RULE]: ({ onSuccess }) =>
    onSuccess(loadItemSearchResponse),
};

export default MemoryBankingRuleComboboxMapping;
