import { SET_INITIAL_STATE } from '../../BankingRuleIntents';
import { setInitialState } from '../index';
import { tabIds } from '../../../tabItems';
import RuleTypes from '../../RuleTypes';
import getDefaultState from '../getDefaultState';

describe('index', () => {
  describe('setInitialState', () => {
    it.each([
      [tabIds.match, true, RuleTypes.spendMoney],
      [tabIds.match, false, RuleTypes.receiveMoney],
      [tabIds.allocate, true, RuleTypes.spendMoney],
      [tabIds.allocate, false, RuleTypes.receiveMoney],
      [tabIds.transfer, true, RuleTypes.bill],
      [tabIds.transfer, false, RuleTypes.invoice],
    ])('if activeTabId is %s and isWithdrawal is %s, ruleType is %s', (tabId, isWithdrawal, expected) => {
      const state = getDefaultState();
      const actual = setInitialState(state, {
        intent: SET_INITIAL_STATE,
        description: 'hello',
        activeTabId: tabId,
        isWithdrawal,
      });
      expect(actual.bankingRule.ruleType).toEqual(expected);
    });
  });
});
