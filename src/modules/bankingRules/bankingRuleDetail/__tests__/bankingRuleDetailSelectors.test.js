import {
  getIsInputField,
  getIsPaymentReportableCheckboxDisabled,
  getRemainingPercentage,
  getShouldLoadContact,
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
    it('enabled when supplier and not loading', () => {
      const state = {
        isContactLoading: false,
        contactType: 'Supplier',
      };

      const actual = getIsPaymentReportableCheckboxDisabled(state);

      expect(actual).toEqual(false);
    });

    it('disabled when not supplier', () => {
      const state = {
        isContactLoading: false,
        contactType: 'Customer',
      };

      const actual = getIsPaymentReportableCheckboxDisabled(state);

      expect(actual).toEqual(true);
    });

    it('disabled when still loading contact', () => {
      const state = {
        isContactLoading: true,
        contactType: 'Supplier',
      };

      const actual = getIsPaymentReportableCheckboxDisabled(state);

      expect(actual).toEqual(true);
    });
  });

  describe('getShouldLoadContact', () => {
    it('should load when is spend money with contact', () => {
      const state = {
        ruleType: RuleTypes.spendMoney,
        contactId: '1',
      };

      const actual = getShouldLoadContact(state);

      expect(actual).toEqual(true);
    });

    it('should not load when no contact', () => {
      const state = {
        ruleType: RuleTypes.spendMoney,
        contactId: '',
      };

      const actual = getShouldLoadContact(state);

      expect(actual).toEqual(false);
    });

    it('should not load when not spend money', () => {
      const state = {
        ruleType: RuleTypes.receiveMoney,
        contactId: '1',
      };

      const actual = getShouldLoadContact(state);

      expect(actual).toEqual(false);
    });
  });
});
