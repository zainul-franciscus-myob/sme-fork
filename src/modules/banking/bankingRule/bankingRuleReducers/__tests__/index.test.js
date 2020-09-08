import { SET_INITIAL_STATE } from '../../BankingRuleIntents';
import { setInitialState } from '../index';
import RuleTypes from '../../RuleTypes';
import TabItems from '../../../types/TabItems';
import getDefaultState from '../getDefaultState';

describe('index', () => {
  describe('setInitialState', () => {
    it.each([
      [TabItems.match, true, RuleTypes.spendMoney],
      [TabItems.match, false, RuleTypes.receiveMoney],
      [TabItems.allocate, true, RuleTypes.spendMoney],
      [TabItems.allocate, false, RuleTypes.receiveMoney],
      [TabItems.transfer, true, RuleTypes.bill],
      [TabItems.transfer, false, RuleTypes.invoice],
    ])(
      'if activeTabId is %s and isWithdrawal is %s, ruleType is %s',
      (tabId, isWithdrawal, expected) => {
        const state = getDefaultState();
        const actual = setInitialState(state, {
          intent: SET_INITIAL_STATE,
          description: 'hello',
          activeTabId: tabId,
          isWithdrawal,
        });
        expect(actual.bankingRule.ruleType).toEqual(expected);
      }
    );
  });
});
