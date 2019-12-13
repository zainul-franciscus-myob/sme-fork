import { LOAD_CUSTOMER_RETURN_LIST } from '../../CustomerReturnIntents';
import customerReturnListReducer from '../customerReturnListReducer';

describe('customerReturnListReducer', () => {
  describe('loadCustomerReturnList', () => {
    it('should use the initial value of customerFilters if customerId doesn\'t exist', () => {
      const state = {
        filterOptions: {
          customerId: '',
        },
        appliedFilterOptions: {
          customerId: '',
        },
      };

      const action = {
        intent: LOAD_CUSTOMER_RETURN_LIST,
        customerFilters: [
          {
            value: 'some value',
          },
          {
            value: 'another value',
          },
        ],
      };

      const actual = customerReturnListReducer(state, action);

      const expected = 'some value';

      expect(actual.filterOptions.customerId).toEqual(expected);
      expect(actual.appliedFilterOptions.customerId).toEqual(expected);
    });

    it('should use the initial value of customerId if customerId exists', () => {
      const state = {
        filterOptions: {
          customerId: 'some customerId',
        },
        appliedFilterOptions: {
          customerId: 'some customerId',
        },
      };

      const action = {
        intent: LOAD_CUSTOMER_RETURN_LIST,
        customerFilters: [
          {
            value: 'some value',
          },
          {
            value: 'another value',
          },
        ],
      };

      const actual = customerReturnListReducer(state, action);

      const expected = 'some customerId';

      expect(actual.filterOptions.customerId).toEqual(expected);
      expect(actual.appliedFilterOptions.customerId).toEqual(expected);
    });
  });
});
