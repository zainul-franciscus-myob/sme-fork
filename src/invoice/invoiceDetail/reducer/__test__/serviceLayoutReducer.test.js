import {
  LOAD_ACCOUNT_AFTER_CREATE,
  SET_ACCOUNT_LOADING_STATE,
} from '../../../InvoiceIntents';
import invoiceReducer from '../invoiceDetailReducer';

describe('invoiceReducer', () => {
  describe('SET_ACCOUNT_LOADING_STATE', () => {
    it('sets state to true', () => {
      const state = {
        isAccountLoading: false,
      };

      const action = {
        intent: SET_ACCOUNT_LOADING_STATE,
        isAccountLoading: true,
      };

      const actual = invoiceReducer(state, action);

      expect(actual).toEqual({
        isAccountLoading: true,
      });
    });
    it('sets state to false', () => {
      const state = {
        isAccountLoading: true,
      };

      const action = {
        intent: SET_ACCOUNT_LOADING_STATE,
        isAccountLoading: false,
      };

      const actual = invoiceReducer(state, action);

      expect(actual).toEqual({
        isAccountLoading: false,
      });
    });
  });
  describe('LOAD_ACCOUNT_AFTER_CREATE', () => {
    it('merges new account payload into state newLine', () => {
      const state = {
        invoice: {
          lines: [],
        },
        newLine: {
          accountOptions: [{ thisIsAnAccount: true }],
        },
      };

      const action = {
        intent: LOAD_ACCOUNT_AFTER_CREATE,
        thisIsAnAccount: false,
      };

      const actual = invoiceReducer(state, action);

      expect(actual.newLine).toEqual({
        accountOptions: [{ thisIsAnAccount: false }, { thisIsAnAccount: true }],
      });
    });
    it('merges new account payload into state all lines', () => {
      const state = {
        invoice: {
          lines: [
            { accountOptions: [{ thisIsAnAccount: true }] },
            { accountOptions: [{ thisIsAnAccount: true }] },
          ],
        },
        newLine: { accountOptions: [] },
      };

      const action = {
        intent: LOAD_ACCOUNT_AFTER_CREATE,
        thisIsAnAccount: false,
      };

      const actual = invoiceReducer(state, action);
      expect(actual.invoice).toEqual({
        lines: [
          {
            accountOptions: [
              { thisIsAnAccount: false },
              { thisIsAnAccount: true },
            ],
          },
          {
            accountOptions: [
              { thisIsAnAccount: false },
              { thisIsAnAccount: true },
            ],
          },
        ],
      });
    });
    it('sets page state to edited', () => {
      const state = {
        invoice: {
          lines: [],
        },
        newLine: {
          accountOptions: [{ thisIsAnAccount: true }],
        },
      };

      const action = {
        intent: LOAD_ACCOUNT_AFTER_CREATE,
        thisIsAnAccount: false,
      };

      const actual = invoiceReducer(state, action);

      expect(actual.isPageEdited).toEqual(true);
    });
  });
});
