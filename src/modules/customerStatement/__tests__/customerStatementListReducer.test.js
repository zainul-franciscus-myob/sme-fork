import { LOAD_CUSTOMER_STATEMENTS, SELECT_CUSTOMER_STATEMENT, TOGGLE_ALL_CUSTOMER_STATEMENTS } from '../CustomerStatementIntents';
import customerStatementListReducer from '../customerStatementListReducer';

describe('customerStatementListReducer', () => {
  describe('loadCustomerStatements', () => {
    it('should not use the initial value of customerOptions if selectedCustomerId exists', () => {
      const state = {
        filterOptions: {
          selectedCustomerId: 'some-id',
        },
      };

      const action = {
        intent: LOAD_CUSTOMER_STATEMENTS,
        payload: {
          customerOptions: [
            {
              value: 'some-value',
            },
          ],
        },
      };

      const actual = customerStatementListReducer(state, action);

      const expected = 'some-id';

      expect(actual.filterOptions.selectedCustomerId).toEqual(expected);
    });
  });

  describe('selectCustomerStatement', () => {
    it('should select a customer statement', () => {
      const state = {
        customerStatements: [
          {
            isSelected: false,
          },
        ],
      };

      const action = {
        intent: SELECT_CUSTOMER_STATEMENT,
        index: 0,
      };

      const actual = customerStatementListReducer(state, action);

      const expected = [
        {
          isSelected: true,
        },
      ];

      expect(actual.customerStatements).toEqual(expected);
    });

    it('should deselect a customer statement', () => {
      const state = {
        customerStatements: [
          {
            isSelected: true,
          },
        ],
      };

      const action = {
        intent: SELECT_CUSTOMER_STATEMENT,
        index: 0,
      };

      const actual = customerStatementListReducer(state, action);

      const expected = [
        {
          isSelected: false,
        },
      ];

      expect(actual.customerStatements).toEqual(expected);
    });
  });

  describe('toggleAllCustomerStatements', () => {
    it('should deselect all customer statements if they\'re already all selected', () => {
      const state = {
        customerStatements: [
          {
            isSelected: true,
          },
          {
            isSelected: true,
          },
        ],
      };

      const action = {
        intent: TOGGLE_ALL_CUSTOMER_STATEMENTS,
      };

      const actual = customerStatementListReducer(state, action);

      const expected = [
        {
          isSelected: false,
        },
        {
          isSelected: false,
        },
      ];

      expect(actual.customerStatements).toEqual(expected);
    });

    it('should select all customer statements if only some are selected', () => {
      const state = {
        customerStatements: [
          {
            isSelected: false,
          },
          {
            isSelected: true,
          },
        ],
      };

      const action = {
        intent: TOGGLE_ALL_CUSTOMER_STATEMENTS,
      };

      const actual = customerStatementListReducer(state, action);

      const expected = [
        {
          isSelected: true,
        },
        {
          isSelected: true,
        },
      ];

      expect(actual.customerStatements).toEqual(expected);
    });
  });
});
