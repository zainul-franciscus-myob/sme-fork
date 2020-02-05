import { UPDATE_WAGE_PAY_ITEM_MODAL_AMOUNT } from '../../../../EmployeeIntents';
import wagePayItemModalReducer from '../WagePayItemModalReducer';

describe('WagePayItemModalReducer', () => {
  describe('updateWagePayItemModalAmount', () => {
    it('should set the value to null when it is empty string', () => {
      const state = {
        wagePayItemModal: {
          wage: {
            someKey: '1.0000',
          },
        },
      };
      const action = {
        intent: UPDATE_WAGE_PAY_ITEM_MODAL_AMOUNT,
        key: 'someKey',
        value: '',
      };
      const expected = {
        wagePayItemModal: {
          wage: {
            someKey: null,
          },
        },
      };

      const actual = wagePayItemModalReducer[UPDATE_WAGE_PAY_ITEM_MODAL_AMOUNT](state, action);

      expect(actual).toEqual(expected);
    });

    it('should set the value to null when it is null', () => {
      const state = {
        wagePayItemModal: {
          wage: {
            someKey: '1.0000',
          },
        },
      };
      const action = {
        intent: UPDATE_WAGE_PAY_ITEM_MODAL_AMOUNT,
        key: 'someKey',
        value: null,
      };
      const expected = {
        wagePayItemModal: {
          wage: {
            someKey: null,
          },
        },
      };

      const actual = wagePayItemModalReducer[UPDATE_WAGE_PAY_ITEM_MODAL_AMOUNT](state, action);

      expect(actual).toEqual(expected);
    });

    it('should set the value to zero when it is zero', () => {
      const state = {
        wagePayItemModal: {
          wage: {
            someKey: '1.0000',
          },
        },
      };
      const action = {
        intent: UPDATE_WAGE_PAY_ITEM_MODAL_AMOUNT,
        key: 'someKey',
        value: '0',
      };
      const expected = {
        wagePayItemModal: {
          wage: {
            someKey: '0.0000',
          },
        },
      };

      const actual = wagePayItemModalReducer[UPDATE_WAGE_PAY_ITEM_MODAL_AMOUNT](state, action);

      expect(actual).toEqual(expected);
    });

    it('should format the value', () => {
      const state = {
        wagePayItemModal: {
          wage: {
            someKey: '1.0000',
          },
        },
      };
      const action = {
        intent: UPDATE_WAGE_PAY_ITEM_MODAL_AMOUNT,
        key: 'someKey',
        value: '2',
      };
      const expected = {
        wagePayItemModal: {
          wage: {
            someKey: '2.0000',
          },
        },
      };

      const actual = wagePayItemModalReducer[UPDATE_WAGE_PAY_ITEM_MODAL_AMOUNT](state, action);

      expect(actual).toEqual(expected);
    });
  });
});
