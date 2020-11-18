import { LOAD_ACCOUNTS_AND_TRANSACTIONS } from '../ElectronicPaymentsCreateIntents';
import { SET_INITIAL_STATE } from '../../../../SystemIntents';
import electronicPaymentsCreateReducer from '../electronicPaymentsCreateReducer';
import expectedLoadAccountsAndTransactions from './fixtures/expectedLoadAccountsAndTransactions';
import loadAccountsAndTransactionsResponse from '../mappings/data/loadAccountsAndElectronicPayments';

describe('ElectronicPaymentsCreateReducer', () => {
  describe('loadAccountsAndTransactions', () => {
    it('should set the payment type from the context', () => {
      const state = {};

      const action = {
        intent: LOAD_ACCOUNTS_AND_TRANSACTIONS,
        response: loadAccountsAndTransactionsResponse,
      };

      expect(electronicPaymentsCreateReducer(state, action)).toEqual(
        expectedLoadAccountsAndTransactions
      );
    });
  });
  describe('setInitialState', () => {
    it('set selected payment type to the first valid one when url param is invalid', () => {
      const state = {
        filterOptions: {
          paymentType: '',
        },
      };

      const action = {
        intent: SET_INITIAL_STATE,
        context: {
          paymentType: 'Invalid',
        },
      };

      expect(electronicPaymentsCreateReducer(state, action)).toEqual({
        paymentType: 'Invalid',
        filterOptions: {
          paymentType: 'All',
        },
        paymentTypes: [
          {
            name: 'All',
            value: 'All',
          },
          {
            name: 'Pay Bills',
            value: 'PayBills',
          },
          {
            name: 'Pay Employees',
            value: 'PayEmployees',
          },
          {
            name: 'Spend Money',
            value: 'SpendMoney',
          },
        ],
      });
    });
  });
});
