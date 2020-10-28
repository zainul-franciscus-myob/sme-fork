import {
  getAllocationAccounts,
  getIsInputField,
  getIsNoConditionRuleAllowed,
  getIsPaymentReportable,
  getIsPaymentReportableCheckboxDisabled,
  getRemainingPercentage,
} from '../bankingRuleDetailSelectors';
import RuleTypes from '../RuleTypes';

describe('bankingRuleDetailSelectors', () => {
  describe('getIsInputField', () => {
    const state = {
      allocations: [],
    };

    it("is false when it's percent allocation type", () => {
      const modifiedState = {
        ...state,
        allocations: [{}],
        allocationType: 'Percent',
      };

      const actual = getIsInputField(modifiedState, { index: 0 });

      expect(actual).toEqual(false);
    });

    it('is true when there is only 1 row item when allocation type is amount', () => {
      const modifiedState = {
        ...state,
        allocations: [{}],
      };

      const actual = getIsInputField(modifiedState, { index: 0 });

      expect(actual).toEqual(true);
    });

    it('is true when last row item when allocation type is amount', () => {
      const modifiedState = {
        ...state,
        allocations: [{}, {}],
      };

      const actual = getIsInputField(modifiedState, { index: 1 });

      expect(actual).toEqual(true);
    });

    it("is false when it's not the last element given that the list has more than one element when allocation type is amount", () => {
      const modifiedState = {
        ...state,
        allocations: [{}, {}],
      };

      const actual = getIsInputField(modifiedState, { index: 0 });

      expect(actual).toEqual(false);
    });
  });

  describe('getRemainingPercentage', () => {
    it('the initial remaining percentage should be 100.00%', () => {
      const state = {
        allocations: [],
      };

      const actual = getRemainingPercentage(state);

      expect(actual).toEqual('100.00%');
    });

    it('should calculate the remaining percentage', () => {
      const state = {
        allocations: [
          {
            value: '10',
          },
        ],
      };

      const actual = getRemainingPercentage(state);

      expect(actual).toEqual('90.00%');
    });

    it("should handle the scenario if the value isn't a number", () => {
      const state = {
        allocations: [
          {
            value: '-',
          },
          {
            value: '55.55',
          },
        ],
      };

      const actual = getRemainingPercentage(state);

      expect(actual).toEqual('44.45%');
    });
  });

  describe('getIsPaymentReportableCheckboxDisabled', () => {
    it('enabled when supplier', () => {
      const state = {
        contactType: 'Supplier',
      };

      const actual = getIsPaymentReportableCheckboxDisabled(state);

      expect(actual).toEqual(false);
    });

    it('disabled when not supplier', () => {
      const state = {
        contactType: 'Customer',
      };

      const actual = getIsPaymentReportableCheckboxDisabled(state);

      expect(actual).toEqual(true);
    });
  });

  describe('getIsNoConditionRuleAllowed', () => {
    it.each([
      ['on', true, RuleTypes.spendMoney, true],
      ['on', true, RuleTypes.receiveMoney, true],
      ['on', true, RuleTypes.bill, false],
      ['on', true, RuleTypes.invoice, false],
      ['off', false, RuleTypes.spendMoney, false],
      ['off', false, RuleTypes.receiveMoney, false],
      ['off', false, RuleTypes.bill, false],
      ['off', false, RuleTypes.invoice, false],
    ])(
      'With banklink-payee feature toggle %s, it should return %s',
      (_, isFeatureToggleOn, ruleType, expected) => {
        const state = {
          bankingRuleId: 'new',
          isNoConditionRuleEnabled: isFeatureToggleOn,
          ruleType,
        };

        const actual = getIsNoConditionRuleAllowed(state);
        expect(actual).toEqual(expected);
      }
    );
  });

  describe('getAllocationAccounts', () => {
    const state = {
      withdrawalAccounts: [
        {
          id: '🦕',
        },
      ],
      depositAccounts: [
        {
          id: '🙅‍♀️',
        },
      ],
    };

    [
      {
        ruleType: RuleTypes.bill,
        expected: state.withdrawalAccounts,
      },
      {
        ruleType: RuleTypes.spendMoney,
        expected: state.withdrawalAccounts,
      },
      {
        ruleType: RuleTypes.invoice,
        expected: state.depositAccounts,
      },
      {
        ruleType: RuleTypes.receiveMoney,
        expected: state.depositAccounts,
      },
    ].forEach(({ ruleType, expected }) => {
      it(`return correct accounts when ${ruleType}`, () => {
        const modifiedState = {
          ...state,
          ruleType,
        };

        const actual = getAllocationAccounts(modifiedState);

        expect(actual).toEqual(expected);
      });
    });
  });

  describe('getIsPaymentReportable', () => {
    it('supplier without paymentReport', () => {
      const state = {
        contactType: 'Supplier',
        ruleType: 'SpendMoney',
        isPaymentReportable: undefined,
      };

      const actual = getIsPaymentReportable(state);

      expect(actual).toEqual(false);
    });

    it('supplier with paymentReport', () => {
      const state = {
        contactType: 'Supplier',
        ruleType: 'SpendMoney',
        isPaymentReportable: true,
      };

      const actual = getIsPaymentReportable(state);

      expect(actual).toEqual(true);
    });

    it('Customer with paymentReport', () => {
      const state = {
        contactType: 'Customer',
        ruleType: 'SpendMoney',
        isPaymentReportable: undefined,
      };

      const actual = getIsPaymentReportable(state);

      expect(actual).toEqual(undefined);
    });
  });
});
