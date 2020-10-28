import { getIsPaymentReportableForBankRule } from '../ruleDetailsSelectors';

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
});
