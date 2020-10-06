import {
  LOAD_BANKING_RULE_COMBOBOX_OPTIONS,
  LOAD_BANKING_RULE_COMBOBOX_OPTION_BY_ID,
  UPDATE_BANKING_RULE_COMBOBOX_OPTIONS,
} from '../BankingRuleComboboxIntents';
import bankingRuleComboboxReducer from '../bankingRuleComboboxReducer';

describe('bankingRuleComboboxReducer', () => {
  describe('loadBankingRuleComboboxOptions', () => {
    it('adds new options to the bottom of the list and removes duplicates', () => {
      const state = {
        bankingRuleOptions: [{ id: '3' }, { id: '4' }],
      };

      const action = {
        intent: LOAD_BANKING_RULE_COMBOBOX_OPTIONS,
        bankingRuleOptions: [{ id: '3' }, { id: '5' }],
      };

      const actual = bankingRuleComboboxReducer(state, action);
      expect(actual.bankingRuleOptions).toEqual([
        { id: '3' },
        { id: '4' },
        { id: '5' },
      ]);
    });
  });

  describe('loadBankingRuleOptionById', () => {
    it('adds the new option to the top of the list', () => {
      const state = { bankingRuleOptions: [{ id: '1' }] };
      const action = {
        intent: UPDATE_BANKING_RULE_COMBOBOX_OPTIONS,
        bankingRule: { id: '2' },
      };

      const actual = bankingRuleComboboxReducer(state, action);
      expect(actual.bankingRuleOptions).toEqual([{ id: '2' }, { id: '1' }]);
    });
    it('updates the existing option with the new details the new option has the same id', () => {
      const state = {
        bankingRuleOptions: [
          { id: '1', name: 'apple' },
          { id: '2', name: 'banana' },
        ],
      };
      const action = {
        intent: LOAD_BANKING_RULE_COMBOBOX_OPTION_BY_ID,
        bankingRule: { id: '2', name: 'pear' },
      };

      const actual = bankingRuleComboboxReducer(state, action);
      expect(actual.bankingRuleOptions).toEqual([
        { id: '1', name: 'apple' },
        { id: '2', name: 'pear' },
      ]);
    });
  });

  describe('updateBankingRuleComboboxOptions', () => {
    it('adds the new option to the top of the list', () => {
      const state = { bankingRuleOptions: [{ id: '1' }] };
      const action = {
        intent: UPDATE_BANKING_RULE_COMBOBOX_OPTIONS,
        bankingRule: { id: '2' },
      };

      const actual = bankingRuleComboboxReducer(state, action);
      expect(actual.bankingRuleOptions).toEqual([{ id: '2' }, { id: '1' }]);
    });
    it('merges new options to the list and removes duplicates', () => {
      const state = {
        bankingRuleOptions: [
          { id: '1', name: 'apple' },
          { id: '2', name: 'banana' },
        ],
      };
      const action = {
        intent: UPDATE_BANKING_RULE_COMBOBOX_OPTIONS,
        bankingRule: { id: '2', name: 'pear' },
      };

      const actual = bankingRuleComboboxReducer(state, action);
      expect(actual.bankingRuleOptions).toEqual([
        { id: '1', name: 'apple' },
        { id: '2', name: 'pear' },
      ]);
    });
  });
});
