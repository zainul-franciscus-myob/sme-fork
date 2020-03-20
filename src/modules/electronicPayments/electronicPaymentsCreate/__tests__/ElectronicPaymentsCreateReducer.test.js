import { SET_INITIAL_STATE } from '../../../../SystemIntents';
import electronicPaymentsCreateReducer from '../electronicPaymentsCreateReducer';

describe('ElectronicPaymentsCreateReducer', () => {
  describe('setInitialState', () => {
    it('should set the payment type from the context if the isSpendMoneyEnabled toggle is true', () => {
      const state = {
        filterOptions: {
          paymentType: '',
        },
      };

      const action = {
        intent: SET_INITIAL_STATE,
        context: {
          paymentType: 'SpendMoney',
          isSpendMoneyEnabled: true,
        },
      };

      const expected = {
        paymentType: 'SpendMoney',
        isSpendMoneyEnabled: true,
        filterOptions: {
          paymentType: 'SpendMoney',
        },
      };

      expect(electronicPaymentsCreateReducer(state, action)).toEqual(expected);
    });

    it('should set the payment type to PayEmployees if the isSpendMoneyEnabled toggle is false', () => {
      const state = {
        filterOptions: {
          paymentType: '',
        },
      };

      const action = {
        intent: SET_INITIAL_STATE,
        context: {
          paymentType: 'SpendMoney',
          isSpendMoneyEnabled: false,
        },
      };

      const expected = {
        paymentType: 'SpendMoney',
        isSpendMoneyEnabled: false,
        filterOptions: {
          paymentType: 'PayEmployees',
        },
      };

      expect(electronicPaymentsCreateReducer(state, action)).toEqual(expected);
    });
  });
});
