import {
  ADD_ALLOCATED_EMPLOYEE,
  ADD_EXEMPTION_PAY_ITEM,
  CHANGE_EXPENSE_PAY_ITEM_INPUT,
  FORMAT_EXPENSE_PAY_ITEM_AMOUNT_INPUT,
  LOAD_EXPENSE_PAY_ITEM,
  REMOVE_ALLOCATED_EMPLOYEE,
  REMOVE_EXEMPTION_PAY_ITEM,
} from '../ExpensePayItemIntents';
import expensePayItemReducer from '../expensePayItemReducer';
import loadNewExpensePayItemResponse from '../mappings/data/loadNewExpensePayItemResponse';

describe('expensePayItemReducer', () => {
  describe('LOAD_EXPENSE_PAY_ITEM', () => {
    it('loads an expense pay item and saves the original name', () => {
      const state = {};

      const action = {
        intent: LOAD_EXPENSE_PAY_ITEM,
        expensePayItem: loadNewExpensePayItemResponse,
      };

      const actual = expensePayItemReducer(state, action);

      const expected = {
        ...loadNewExpensePayItemResponse,
        originalName: loadNewExpensePayItemResponse.name,
      };

      expect(actual).toEqual(expected);
    });
  });

  describe('CHANGE_EXPENSE_PAY_ITEM_INPUT', () => {
    it('updates the given key with a value', () => {
      const state = {
        a: 1,
      };

      const action = {
        intent: CHANGE_EXPENSE_PAY_ITEM_INPUT,
        key: 'a',
        value: 2,
      };

      const actual = expensePayItemReducer(state, action);

      const expected = {
        a: 2,
      };

      expect(actual).toEqual(expected);
    });
  });

  describe('ADD_ALLOCATED_EMPLOYEE', () => {
    it('adds a given employee to allocatedEmployees', () => {
      const state = {
        allocatedEmployees: [
          {
            id: 'a',
            name: 'nameA',
          },
        ],
        employeeOptions: [
          {
            id: 'b',
            name: 'nameB',
          },
        ],
      };

      const action = {
        intent: ADD_ALLOCATED_EMPLOYEE,
        id: 'b',
      };

      const actual = expensePayItemReducer(state, action);

      expect(actual.allocatedEmployees).toEqual([
        {
          id: 'a',
          name: 'nameA',
        },
        {
          id: 'b',
          name: 'nameB',
        },
      ]);
    });
  });

  describe('REMOVE_ALLOCATED_EMPLOYEE', () => {
    it('removes a given employee from allocatedEmployees', () => {
      const state = {
        allocatedEmployees: [
          {
            id: 'a',
          },
          {
            id: 'b',
          },
        ],
      };

      const action = {
        intent: REMOVE_ALLOCATED_EMPLOYEE,
        id: 'a',
      };

      const actual = expensePayItemReducer(state, action);

      expect(actual.allocatedEmployees).toEqual([
        {
          id: 'b',
        },
      ]);
    });
  });

  describe('ADD_EXEMPTION_PAY_ITEM', () => {
    it('adds a given exemption to exemptionPayItems', () => {
      const state = {
        exemptionPayItems: [
          {
            id: 'a',
            name: 'nameA',
          },
        ],
        exemptionPayItemOptions: [
          {
            id: 'b',
            name: 'nameB',
          },
        ],
      };

      const action = {
        intent: ADD_EXEMPTION_PAY_ITEM,
        id: 'b',
      };

      const actual = expensePayItemReducer(state, action);

      expect(actual.exemptionPayItems).toEqual([
        {
          id: 'a',
          name: 'nameA',
        },
        {
          id: 'b',
          name: 'nameB',
        },
      ]);
    });
  });

  describe('REMOVE_EXEMPTION_PAY_ITEM', () => {
    it('removes a given exemption from exemptionPayItems', () => {
      const state = {
        exemptionPayItems: [
          {
            id: 'a',
          },
          {
            id: 'b',
          },
        ],
      };

      const action = {
        intent: REMOVE_EXEMPTION_PAY_ITEM,
        id: 'a',
      };

      const actual = expensePayItemReducer(state, action);

      expect(actual.exemptionPayItems).toEqual([
        {
          id: 'b',
        },
      ]);
    });
  });

  describe('FORMAT_EXPENSE_PAY_ITEM_AMOUNT_INPUT', () => {
    const state = {
      calculationBasisPercentage: '1',
      calculationBasisAmount: '1.01',
      limitPercentage: '1',
      limitAmount: '1.01',
      threshold: '1.01',
    };

    [
      {
        in: '.',
        out: '0.00',
      },
      {
        in: '1.1',
        out: '1.10',
      },
      {
        in: '1.001',
        out: '1.001',
      },
    ].forEach((test) => {
      it(`formats ${test.key} from ${test.in} to ${test.out}`, () => {
        const modifiedState = {
          ...state,
          limitPercentage: test.in,
          calculationBasisPercentage: test.in,
        };

        const action = {
          intent: FORMAT_EXPENSE_PAY_ITEM_AMOUNT_INPUT,
        };

        const actual = expensePayItemReducer(modifiedState, action);

        expect(actual.calculationBasisPercentage).toEqual(test.out);
        expect(actual.limitPercentage).toEqual(test.out);
      });
    });

    [
      {
        in: '.',
        out: '0.00',
      },
      {
        in: '1.1',
        out: '1.10',
      },
      {
        in: '1.01',
        out: '1.01',
      },
    ].forEach((test) => {
      it(`formats ${test.key} from ${test.in} to ${test.out}`, () => {
        const modifiedState = {
          ...state,
          calculationBasisAmount: test.in,
          limitAmount: test.in,
          threshold: test.in,
        };

        const action = {
          intent: FORMAT_EXPENSE_PAY_ITEM_AMOUNT_INPUT,
        };

        const actual = expensePayItemReducer(modifiedState, action);

        expect(actual.calculationBasisAmount).toEqual(test.out);
        expect(actual.limitAmount).toEqual(test.out);
        expect(actual.threshold).toEqual(test.out);
      });
    });
  });
});
