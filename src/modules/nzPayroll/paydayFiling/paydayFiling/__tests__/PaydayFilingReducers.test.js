import { SET_INITIAL_STATE } from '../../../../../SystemIntents';
import { SET_TAB } from '../PaydayFilingIntents';
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

      expect(result).toEqual({ tab: tabIds.submissionsList });
    });
  });

  describe('SET_TAB', () => {
    it('should set tab if its valid', () => {
      const state = { tab: tabIds.irdSettings };

      const action = {
        intent: SET_TAB,
        tab: tabIds.submissionsList,
      };

      const result = PaydayFilingReducer(state, action);

      expect(result).toEqual({
        tab: tabIds.submissionsList,
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

      expect(result).toEqual({ tab: tabIds.submissionsList });
    });
  });
});
