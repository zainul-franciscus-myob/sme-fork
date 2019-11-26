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
    it('merges new account payload into account options', () => {
      const state = {
        accountOptions: [{ thisIsAnAccount: true }],
      };

      const action = {
        intent: LOAD_ACCOUNT_AFTER_CREATE,
        thisIsAnAccount: false,
      };

      const actual = invoiceReducer(state, action);

      expect(actual.accountOptions).toEqual([
        { thisIsAnAccount: false },
        { thisIsAnAccount: true },
      ]);
    });
    it('sets page state to edited', () => {
      const state = {
        accountOptions: [{ thisIsAnAccount: true }],
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
