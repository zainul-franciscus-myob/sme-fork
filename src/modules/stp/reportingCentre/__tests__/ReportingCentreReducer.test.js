import { SET_INITIAL_STATE } from '../../../../SystemIntents';
import { SET_TAB } from '../ReportingCentreIntents';
import { tabIds } from '../TabItems';
import ReportingCentreReducer from '../ReportingCentreReducer';

describe('ReportingCentreReducer', () => {
  describe('SET_INITIAL_STATE', () => {
    it('should set tab from the context into the state', () => {
      const state = { tab: '' };

      const action = {
        intent: SET_INITIAL_STATE,
        context: {
          businessId: '123',
          tab: tabIds.finalisation,
        },
      };

      const result = ReportingCentreReducer(state, action);

      expect(result).toEqual({
        businessId: '123',
        tab: tabIds.finalisation,
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

      const result = ReportingCentreReducer(state, action);

      expect(result).toEqual({ tab: tabIds.reports });
    });
  });

  describe('SET_TAB', () => {
    it('should set tab if its valid', () => {
      const state = { tab: tabIds.reports };

      const action = {
        intent: SET_TAB,
        tab: tabIds.terminations,
      };

      const result = ReportingCentreReducer(state, action);

      expect(result).toEqual({
        tab: tabIds.terminations,
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

      const result = ReportingCentreReducer(state, action);

      expect(result).toEqual({ tab: tabIds.reports });
    });
  });
});
