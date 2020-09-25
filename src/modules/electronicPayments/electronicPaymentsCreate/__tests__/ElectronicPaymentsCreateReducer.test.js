import { LOAD_ACCOUNTS_AND_TRANSACTIONS } from '../ElectronicPaymentsCreateIntents';
import { SET_INITIAL_STATE } from '../../../../SystemIntents';
import electronicPaymentsCreateReducer from '../electronicPaymentsCreateReducer';
import expectedLoadAccountsAndTransactions from './fixtures/expectedLoadAccountsAndTransactions';
import loadAccountsAndTransactionsResponse from '../mappings/data/loadAccountsAndElectronicPayments';

describe('ElectronicPaymentsCreateReducer', () => {
  describe('loadAccountsAndTransactions', () => {
    it('should set the payment type from the context if the isSpendMoneyEnabled toggle is true', () => {
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
    it.each([
      [
        [
          { name: 'All', value: 'All' },
          { name: 'Pay Bills', value: 'PayBills' },
          { name: 'Pay Employees', value: 'PayEmployees' },
          { name: 'Spend Money', value: 'SpendMoney' },
        ],
        true,
        true,
      ],
      [
        [
          { name: 'All', value: 'All' },
          { name: 'Pay Bills', value: 'PayBills' },
          { name: 'Pay Employees', value: 'PayEmployees' },
        ],
        true,
        false,
      ],
      [
        [
          { name: 'Pay Employees', value: 'PayEmployees' },
          { name: 'Spend Money', value: 'SpendMoney' },
        ],
        false,
        true,
      ],
      [[{ name: 'Pay Employees', value: 'PayEmployees' }], false, false],
    ])(
      `options should be %s when isElectronicPaymentEnabled is %s and isSpendMoneyEnabled is %s`,
      (options, isElectronicPaymentEnabled, isSpendMoneyEnabled) => {
        const state = {
          filterOptions: {
            paymentType: '',
          },
        };

        const action = {
          intent: SET_INITIAL_STATE,
          context: {
            isElectronicPaymentEnabled,
            isSpendMoneyEnabled,
            paymentType: 'PayEmployees',
          },
        };

        expect(electronicPaymentsCreateReducer(state, action)).toEqual({
          isElectronicPaymentEnabled,
          isSpendMoneyEnabled,
          paymentType: 'PayEmployees',
          filterOptions: {
            paymentType: 'PayEmployees',
          },
          paymentTypes: options,
        });
      }
    );

    it('set selected payment type to the first valid one when url param is invalid', () => {
      const state = {
        filterOptions: {
          paymentType: '',
        },
      };

      const action = {
        intent: SET_INITIAL_STATE,
        context: {
          isElectronicPaymentEnabled: true,
          isSpendMoneyEnabled: true,
          paymentType: 'Invalid',
        },
      };

      expect(electronicPaymentsCreateReducer(state, action)).toEqual({
        isElectronicPaymentEnabled: true,
        isSpendMoneyEnabled: true,
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
