import {
  getCreateExpensePayItemUrlParams,
  getEmployeeOptions,
  getExemptionPayItemOptions,
  getSaveExpensePayItemContent,
  getUpdateExpensePayItemUrlParams,
} from '../ExpensePayItemSelectors';
import CalculationBasis from '../CalculationBasis';
import Limit from '../Limit';

describe('expensePayItemSelectors', () => {
  describe('getEmployeeOptions', () => {
    it('gets all employees except those already allocated', () => {
      const state = {
        allocatedEmployees: [
          {
            id: 'c',
          },
        ],
        employeeOptions: [
          {
            id: 'a',
          },
          {
            id: 'b',
          },
          {
            id: 'c',
          },
        ],
      };

      const actual = getEmployeeOptions(state);

      const expected = [
        {
          id: 'a',
        },
        {
          id: 'b',
        },
      ];

      expect(actual).toEqual(expected);
    });
  });

  describe('getExemptionPayItemOptions', () => {
    it('gets all exemption pay items except those already selected', () => {
      const state = {
        exemptionPayItems: [
          {
            id: 'a',
          },
        ],
        exemptionPayItemOptions: [
          {
            id: 'a',
          },
          {
            id: 'b',
          },
          {
            id: 'c',
          },
        ],
      };

      const actual = getExemptionPayItemOptions(state);

      const expected = [
        {
          id: 'b',
        },
        {
          id: 'c',
        },
      ];

      expect(actual).toEqual(expected);
    });
  });

  describe('getCreateExpensePayItemUrlParams', () => {
    it('gets url params', () => {
      const state = {
        businessId: '1',
      };

      const actual = getCreateExpensePayItemUrlParams(state);

      const expected = {
        businessId: '1',
      };

      expect(actual).toEqual(expected);
    });
  });

  describe('getSaveExpensePayItemContent', () => {
    it('gets content', () => {
      const state = {
        name: 'a',
        linkedExpenseAccountId: '1',
        linkedPayablesAccountId: '2',
        isPrintOnPaySlip: false,
        calculationBasis: CalculationBasis.PERCENT,
        calculationBasisPercentage: '5',
        calculationBasisPayItemId: '3',
        calculationBasisAmount: '0.00',
        calculationBasisPeriod: 'PayPeriod',
        limit: Limit.PERCENT,
        limitPercentage: '6',
        limitPayItemId: '4',
        limitAmount: '0.00',
        limitPeriod: 'PayPeriod',
        threshold: '200.00',
        calculationBasisPayItemOptions: [
          {
            id: '3',
            mappedType: 'WagesGroup',
          },
        ],
        limitPayItemOptions: [
          {
            id: '4',
            mappedType: 'SuperannuationDeductionAfterTax',
          },
        ],
        allocatedEmployees: [
          {
            id: '1',
          },
          {
            id: '2',
          },
        ],
        exemptionPayItems: [
          {
            id: '1',
            mappedType: 'WagesGroup',
          },
          {
            id: '2',
            mappedType: 'Deduction',
          },
        ],
      };

      const actual = getSaveExpensePayItemContent(state);

      const expected = {
        name: 'a',
        linkedExpenseAccountId: '1',
        linkedPayablesAccountId: '2',
        isPrintOnPaySlip: false,
        calculationBasis: CalculationBasis.PERCENT,
        calculationBasisPercentage: '5',
        calculationBasisPayItemId: '3',
        calculationBasisPayItemMappedType: 'WagesGroup',
        calculationBasisAmount: '0.00',
        calculationBasisPeriod: 'PayPeriod',
        limit: Limit.PERCENT,
        limitPercentage: '6',
        limitPayItemId: '4',
        limitPayItemMappedType: 'SuperannuationDeductionAfterTax',
        limitAmount: '0.00',
        limitPeriod: 'PayPeriod',
        threshold: '200.00',
        allocatedEmployees: [
          {
            id: '1',
          },
          {
            id: '2',
          },
        ],
        exemptionPayItems: [
          {
            id: '1',
            mappedType: 'WagesGroup',
          },
          {
            id: '2',
            mappedType: 'Deduction',
          },
        ],
      };

      expect(actual).toEqual(expected);
    });
  });

  describe('getUpdateExpensePayItemUrlParams', () => {
    it('gets url params', () => {
      const state = {
        businessId: '1',
        expensePayItemId: '2',
      };

      const actual = getUpdateExpensePayItemUrlParams(state);

      const expected = {
        businessId: '1',
        expensePayItemId: '2',
      };

      expect(actual).toEqual(expected);
    });
  });
});
