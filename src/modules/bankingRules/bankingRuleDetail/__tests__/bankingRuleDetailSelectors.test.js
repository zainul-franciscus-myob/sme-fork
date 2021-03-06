import {
  getAllocationAccounts,
  getIsAutomatedRuleTypeEnabled,
  getIsInputField,
  getIsNoConditionRuleAllowed,
  getIsPaymentReportable,
  getIsPaymentReportableCheckboxDisabled,
  getRemainingPercentage,
  getShowAutomatedRuleDetail,
} from '../bankingRuleDetailSelectors';
import AutomatedRuleTypes from '../AutomatedRuleTypes';
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
      [RuleTypes.spendMoney, true],
      [RuleTypes.receiveMoney, true],
      [RuleTypes.bill, false],
      [RuleTypes.invoice, false],
    ])('When rule type is %s, it should return %s', (ruleType, expected) => {
      const state = {
        bankingRuleId: 'new',
        ruleType,
      };

      const actual = getIsNoConditionRuleAllowed(state);
      expect(actual).toEqual(expected);
    });
  });

  describe('getAllocationAccounts', () => {
    const state = {
      withdrawalAccounts: [
        {
          id: '????',
        },
      ],
      depositAccounts: [
        {
          id: '?????????????',
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

  describe('getIsAutomatedRuleTypeEnabled', () => {
    it.each([
      [
        'enables automated rule type when no condition rule is allowed',
        true,
        true,
        true,
      ],
      [
        'disable automated rule type when no condition rule is not allowed',
        false,
        true,
        false,
      ],
      ['enables automated rule type on new banking rule', true, true, true],
      [
        'disables automated rule type on existing banking rule',
        true,
        false,
        false,
      ],
    ])('%s', (_, isNoConditionRuleAllowed, isCreating, expected) => {
      const actual = getIsAutomatedRuleTypeEnabled.resultFunc(
        isNoConditionRuleAllowed,
        isCreating
      );

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
