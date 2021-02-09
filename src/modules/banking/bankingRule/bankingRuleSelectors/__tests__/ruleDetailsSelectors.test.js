import {
  getIsNoConditionRuleAllowed,
  getIsPaymentReportableForBankRule,
  getShowAutomatedRuleDetail,
} from '../ruleDetailsSelectors';
import AutomatedRuleTypes from '../../AutomatedRuleTypes';
import RuleTypes from '../../RuleTypes';

describe('ruleDetailsSelectors', () => {
  describe('getIsPaymentReportableForBankRule', () => {
    it('supplier without paymentReport', () => {
      const state = {
        contactType: 'Supplier',
        bankingRule: {
          isPaymentReportable: undefined,
          ruleType: 'SpendMoney',
        },
      };

      const actual = getIsPaymentReportableForBankRule(state);

      expect(actual).toEqual(false);
    });

    it('supplier with paymentReport', () => {
      const state = {
        contactType: 'Supplier',
        bankingRule: {
          isPaymentReportable: true,
          ruleType: 'SpendMoney',
        },
      };

      const actual = getIsPaymentReportableForBankRule(state);

      expect(actual).toEqual(true);
    });

    it('Customer with paymentReport', () => {
      const state = {
        contactType: 'Customer',
        bankingRule: {
          isPaymentReportable: undefined,
          ruleType: 'SpendMoney',
        },
      };

      const actual = getIsPaymentReportableForBankRule(state);

      expect(actual).toEqual(undefined);
    });
  });

  describe('getIsNoConditionRuleAllowed', () => {
    it.each([
      [
        'allows on receive money when no condition rule is allowed',
        RuleTypes.receiveMoney,
        true,
      ],
      [
        'allows on spend money when no condition rule is allowed',
        RuleTypes.spendMoney,
        true,
      ],
      ['does not allow on bill', RuleTypes.bill, false],
      ['does not allow on invoice', RuleTypes.invoice, false],
    ])('%s', (_, ruleType, expected) => {
      const actual = getIsNoConditionRuleAllowed.resultFunc(ruleType);

      expect(actual).toEqual(expected);
    });
  });

  describe('getShowAutomatedRuleDetail', () => {
    it('shows automated rule details when banking rule is automated', () => {
      const actual = getShowAutomatedRuleDetail.resultFunc(
        AutomatedRuleTypes.AUTOMATED
      );

      expect(actual).toBeTruthy();
    });

    it('hides automated rule details when banking rule is manual', () => {
      const actual = getShowAutomatedRuleDetail.resultFunc(
        AutomatedRuleTypes.MANUAL
      );

      expect(actual).toBeFalsy();
    });
  });
});
