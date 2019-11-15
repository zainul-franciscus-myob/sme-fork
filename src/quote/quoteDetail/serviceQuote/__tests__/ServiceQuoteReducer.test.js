import {
  LOAD_ACCOUNT_AFTER_CREATE,
  SET_ACCOUNT_LOADING_STATE,
} from '../ServiceQuoteIntents';
import serviceQuoteReducer from '../serviceQuoteReducer';

describe('serviceQuoteReducer', () => {
  describe('SET_ACCOUNT_LOADING_STATE', () => {
    it('sets state to true', () => {
      const state = {
        isAccountLoading: false,
      };

      const action = {
        intent: SET_ACCOUNT_LOADING_STATE,
        isAccountLoading: true,
      };

      const actual = serviceQuoteReducer(state, action);

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

      const actual = serviceQuoteReducer(state, action);

      expect(actual).toEqual({
        isAccountLoading: false,
      });
    });
  });
  describe('LOAD_ACCOUNT_AFTER_CREATE', () => {
    it('merges new account payload into state newLine', () => {
      const state = {
        quote: {
          lines: [],
        },
        newLine: {
          accounts: [{ thisIsAnAccount: true }],
        },
      };

      const action = {
        intent: LOAD_ACCOUNT_AFTER_CREATE,
        thisIsAnAccount: false,
      };

      const actual = serviceQuoteReducer(state, action);

      expect(actual.newLine).toEqual({
        accounts: [{ thisIsAnAccount: false }, { thisIsAnAccount: true }],
      });
    });
    it('merges new account payload into state all lines', () => {
      const state = {
        quote: {
          lines: [
            { accounts: [{ thisIsAnAccount: true }] },
            { accounts: [{ thisIsAnAccount: true }] },
          ],
        },
        newLine: { accounts: [] },
      };

      const action = {
        intent: LOAD_ACCOUNT_AFTER_CREATE,
        thisIsAnAccount: false,
      };

      const actual = serviceQuoteReducer(state, action);
      expect(actual.quote).toEqual({
        lines: [
          {
            accounts: [{ thisIsAnAccount: false }, { thisIsAnAccount: true }],
          },
          {
            accounts: [{ thisIsAnAccount: false }, { thisIsAnAccount: true }],
          },
        ],
      });
    });
    it('sets page state to edited', () => {
      const state = {
        quote: {
          lines: [],
        },
        newLine: {
          accounts: [{ thisIsAnAccount: true }],
        },
      };

      const action = {
        intent: LOAD_ACCOUNT_AFTER_CREATE,
        thisIsAnAccount: false,
      };

      const actual = serviceQuoteReducer(state, action);

      expect(actual.isPageEdited).toEqual(true);
    });
  });
});
