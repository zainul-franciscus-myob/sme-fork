import { SET_INITIAL_STATE } from '../../../../SystemIntents';
import recurringTransactionListReducer from '../recurringTransactionListReducer';

describe('recurringTransactionListReducer', () => {
  describe('setInitialState', () => {
    const state = {
      filterOptions: {
        type: 'All',
      },
    };

    const context = {
      businessId: 'bizId',
      region: 'au',
      type: 'Invoice',
      isRecurringTransactionEnabled: true,
    };

    const action = {
      intent: SET_INITIAL_STATE,
      context,
    };

    it('should set the businessId and region', () => {
      const actual = recurringTransactionListReducer(state, action);
      expect(actual.businessId).toEqual('bizId');
      expect(actual.region).toEqual('au');
    });

    it('should set feature toggle for recurring transaction', () => {
      const actual = recurringTransactionListReducer(state, action);
      expect(actual.isRecurringTransactionEnabled).toEqual(true);
    });

    it.each([
      ['should', 'Invoice', 'Invoice'],
      ['should', 'invoice', 'Invoice'],
      ['should', 'BilL', 'Bill'],
      ['should', 'bIll', 'Bill'],
      ['should', 'All', 'All'],
      ['should not', 'HELLO', 'All'],
      ['should not', 'Romeo', 'All'],
    ])(
      '%s set the filter options type if the type params is %s',
      (_, type, expected) => {
        const typeAction = {
          intent: SET_INITIAL_STATE,
          context: {
            ...context,
            type,
          },
        };
        const actual = recurringTransactionListReducer(state, typeAction);
        expect(actual.filterOptions.type).toEqual(expected);
      }
    );
  });
});
