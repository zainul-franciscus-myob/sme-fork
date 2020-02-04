import {
  getAllocationAccounts,
  getAllocationLabel,
  getIsInputField,
  getRemainingPercentage,
  getShouldShowReportableCheckbox,
} from '../allocationSelectors';
import AllocationTypes from '../../AllocationTypes';
import RuleTypes from '../../RuleTypes';

describe('allocationSelectors', () => {
  describe('getIsInputField', () => {
    it('is false when it\'s percent allocation type', () => {
      const state = {
        bankingRuleModal: {
          bankingRule: {
            allocations: [
              {},
            ],
            allocationType: 'Percent',
          },
        },
      };

      const actual = getIsInputField(state, { index: 0 });

      expect(actual).toEqual(false);
    });

    it('is true when there is only 1 row item when allocation type is amount', () => {
      const state = {
        bankingRuleModal: {
          bankingRule: {
            allocations: [
              {},
            ],
            allocationType: 'Amount',
          },
        },
      };

      const actual = getIsInputField(state, { index: 0 });

      expect(actual).toEqual(true);
    });

    it('is true when last row item when allocation type is amount', () => {
      const state = {
        bankingRuleModal: {
          bankingRule: {
            allocations: [
              {},
              {},
            ],
            allocationType: 'Amount',
          },
        },
      };

      const actual = getIsInputField(state, { index: 1 });

      expect(actual).toEqual(true);
    });

    it('is false when it\'s not the last element given that the list has more than one element when allocation type is amount', () => {
      const state = {
        bankingRuleModal: {
          bankingRule: {
            allocations: [
              {},
              {},
            ],
            allocationType: 'Amount',
          },
        },
      };

      const actual = getIsInputField(state, { index: 0 });

      expect(actual).toEqual(false);
    });
  });

  describe('getRemainingPercentage', () => {
    it('the initial remaining percentage should be 100.00%', () => {
      const state = {
        bankingRuleModal: {
          bankingRule: {
            allocations: [],
          },
        },
      };

      const actual = getRemainingPercentage(state);

      expect(actual).toEqual('100.00%');
    });

    it('should calculate the remaining percentage', () => {
      const state = {
        bankingRuleModal: {
          bankingRule: {
            allocations: [
              {
                value: '10',
              },
            ],
          },
        },
      };

      const actual = getRemainingPercentage(state);

      expect(actual).toEqual('90.00%');
    });

    it('should handle the scenario if the value isn\'t a number', () => {
      const state = {
        bankingRuleModal: {
          bankingRule: {
            allocations: [
              {
                value: '-',
              },
              {
                value: '55.55',
              },
            ],
          },
        },
      };

      const actual = getRemainingPercentage(state);

      expect(actual).toEqual('44.45%');
    });
  });

  describe('getShouldShowReportableCheckbox', () => {
    it('should return true when region is au and selected contact is supplier', () => {
      const state = {
        region: 'au',
        bankingRuleModal: {
          bankingRule: {
            contactId: '1',
          },
          contacts: [
            { id: '1', contactType: 'Supplier' },
          ],
        },
      };

      const actual = getShouldShowReportableCheckbox(state);

      expect(actual).toEqual(true);
    });

    it('should return false when region is not au', () => {
      const state = {
        region: 'nz',
        bankingRuleModal: {
          bankingRule: {
            contactId: '1',
          },
          contacts: [
            { id: '1', contactType: 'Supplier' },
          ],
        },
      };

      const actual = getShouldShowReportableCheckbox(state);

      expect(actual).toEqual(false);
    });

    it('should return false when region is au and selected contact is not supplier', () => {
      const state = {
        region: 'au',
        bankingRuleModal: {
          bankingRule: {
            contactId: '1',
          },
          contacts: [
            { id: '1', contactType: 'Customer' },
          ],
        },
      };

      const actual = getShouldShowReportableCheckbox(state);

      expect(actual).toEqual(false);
    });
  });

  describe('getAllocationLabel', () => {
    it('should return `Percent (%)` when allocate type is percent', () => {
      const state = {
        bankingRuleModal: {
          bankingRule: {
            allocationType: AllocationTypes.percent,
          },
        },
      };

      const actual = getAllocationLabel(state);

      expect(actual).toEqual('Percent (%)');
    });

    it('should return `Amount ($)` when allocate type is amount', () => {
      const state = {
        bankingRuleModal: {
          bankingRule: {
            allocationType: AllocationTypes.amount,
          },
        },
      };

      const actual = getAllocationLabel(state);

      expect(actual).toEqual('Amount ($)');
    });
  });

  describe('getAllocationAccounts', () => {
    const withdrawalAccounts = [{ id: '1' }];
    const depositAccounts = [{ id: '2' }];
    it('should return withdrawal accounts when ruleType is `SpendMoney`', () => {
      const state = {
        bankingRuleModal: {
          bankingRule: {
            ruleType: RuleTypes.spendMoney,
          },
          withdrawalAccounts,
          depositAccounts,
        },
      };

      const actual = getAllocationAccounts(state);

      expect(actual).toEqual(withdrawalAccounts);
    });

    it('should return deposit accounts when ruleType is `ReceiveMoney`', () => {
      const state = {
        bankingRuleModal: {
          bankingRule: {
            ruleType: RuleTypes.receiveMoney,
          },
          withdrawalAccounts,
          depositAccounts,
        },
      };

      const actual = getAllocationAccounts(state);

      expect(actual).toEqual(depositAccounts);
    });
  });
});
