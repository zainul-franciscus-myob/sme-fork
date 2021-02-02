import {
  LOAD_PAYDAY_USER_SESSION,
  SET_IS_BUSINESS_ONBOARDED,
  SET_TAB,
} from '../PaydayFilingIntents';
import { SET_INITIAL_STATE } from '../../../../../SystemIntents';
import { tabIds } from '../TabItems';
import PaydayFilingReducer from '../PaydayFilingReducer';

describe('PaydayFilingReducer', () => {
  describe('SET_INITIAL_STATE', () => {
    it('should set tab from the context into the state', () => {
      const state = { tab: '' };

      const action = {
        intent: SET_INITIAL_STATE,
        context: {
          businessId: '123',
          tab: tabIds.irdSettings,
        },
      };

      const result = PaydayFilingReducer(state, action);

      expect(result).toEqual({
        businessId: '123',
        tab: tabIds.irdSettings,
      });
    });

    it('should set tab to reports when the url param is invalid', () => {
      const state = { tab: '' };

      const action = {
        intent: SET_INITIAL_STATE,
        context: {
          tab: 'random',
        },
      };

      const result = PaydayFilingReducer(state, action);

      expect(result).toEqual({ tab: tabIds.eiSubmissions });
    });
  });

  describe('SET_TAB', () => {
    it('should set tab if its valid', () => {
      const state = { tab: tabIds.irdSettings };

      const action = {
        intent: SET_TAB,
        tab: tabIds.eiSubmissions,
      };

      const result = PaydayFilingReducer(state, action);

      expect(result).toEqual({
        tab: tabIds.eiSubmissions,
      });
    });

    it('should set tab to reports when the tab is invalid', () => {
      const state = { tab: tabIds.reports };

      const action = {
        intent: SET_INITIAL_STATE,
        context: {
          tab: 'random',
        },
      };

      const result = PaydayFilingReducer(state, action);

      expect(result).toEqual({ tab: tabIds.eiSubmissions });
    });
  });
  describe('setIsBusinessOnboarded', () => {
    it('should set the onboarded status', () => {
      const state = {
        isBusinessOnboarded: '',
      };

      const action = {
        intent: SET_IS_BUSINESS_ONBOARDED,
        isBusinessOnboarded: true,
      };

      const result = PaydayFilingReducer(state, action);

      expect(result).toEqual({
        isBusinessOnboarded: true,
      });
    });
  });

  describe('setUserSession', () => {
    it('should set userSession from dispatcher into the state', () => {
      const state = { userSession: null };

      const action = {
        intent: LOAD_PAYDAY_USER_SESSION,
        userSession: {
          userGuid: 'eacef4d8-7f5c-4936-a2f8-4383c333304d',
          onboarded: true,
          validEhSession: false,
        },
      };

      const expected = {
        userSession: {
          userGuid: 'eacef4d8-7f5c-4936-a2f8-4383c333304d',
          onboarded: true,
          validEhSession: false,
        },
      };

      const result = PaydayFilingReducer(state, action);

      expect(result).toEqual(expected);
    });
  });
});
