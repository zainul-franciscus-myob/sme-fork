import { FORMAT_TABLE_AMOUNT_INPUT, UPDATE_TABLE_AMOUNT_INPUT } from '../ApplyToSaleIntents';
import { SET_INITIAL_STATE } from '../../SystemIntents';
import applyToSaleReducer from '../applyToSaleReducer';

describe('applyToSaleReducer', () => {
  describe('SET_INITIAL_STATE', () => {
    it('set applyToSaleId to default on create', () => {
      const state = {};

      const action = {
        intent: SET_INITIAL_STATE,
        context: {
          applyToSaleId: undefined,
        },
      };

      const actual = applyToSaleReducer(state, action);

      expect(actual.applyToSaleId).toEqual('');
    });

    it('set customerReturnId to default on read', () => {
      const state = {};

      const action = {
        intent: SET_INITIAL_STATE,
        context: {
          customerReturnId: undefined,
        },
      };

      const actual = applyToSaleReducer(state, action);

      expect(actual.customerReturnId).toEqual('');
    });
  });

  describe('UPDATE_TABLE_AMOUNT_INPUT', () => {
    const state = {
      invoices: [{}, {}],
    };

    const action = {
      intent: UPDATE_TABLE_AMOUNT_INPUT,
      index: 1,
    };

    [{
      key: 'discount',
      displayKey: 'displayDiscount',
    }, {
      key: 'amountApplied',
      displayKey: 'displayAmountApplied',
    }].forEach((test) => {
      it(`casts ${test.key} from string to number`, () => {
        const testAction = {
          ...action,
          key: test.key,
          value: '0.25',
        };

        const actual = applyToSaleReducer(state, testAction);
        expect(actual.invoices[1][test.key]).toEqual(0.25);
      });

      it(`saves value to ${test.displayKey}`, () => {
        const testAction = {
          ...action,
          key: test.key,
          value: 'a',
        };

        const actual = applyToSaleReducer(state, testAction);
        expect(actual.invoices[1][test.displayKey]).toEqual('a');
      });

      it(`casts ${test.key} from negative symbol "-" to 0`, () => {
        const testAction = {
          ...action,
          key: test.key,
          value: '-',
        };

        const actual = applyToSaleReducer(state, testAction);
        expect(actual.invoices[1][test.key]).toEqual(0);
      });
    });
  });

  describe('FORMAT_TABLE_AMOUNT_INPUT', () => {
    const action = {
      intent: FORMAT_TABLE_AMOUNT_INPUT,
      index: 1,
    };


    it('formats both displayDiscount and displayAmountApplied', () => {
      const state = {
        invoices: [{}, {
          displayDiscount: '12',
          displayAmountApplied: '14',
        }],
      };

      const actual = applyToSaleReducer(state, action);
      expect(actual.invoices[1].displayDiscount).toEqual('12.00');
      expect(actual.invoices[1].displayAmountApplied).toEqual('14.00');
    });

    [{
      displayKey: 'displayDiscount',
    },
    {
      displayKey: 'displayAmountApplied',
    }].forEach((test) => {
      it(`empties ${test.displayKey} when value is "-"`, () => {
        const state = {
          invoices: [{}, {
            [test.displayKey]: '-',
          }],
        };

        const actual = applyToSaleReducer(state, action);
        expect(actual.invoices[1][test.displayKey]).toEqual('');
      });
    });
  });
});
