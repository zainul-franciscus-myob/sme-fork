import { CHANGE_EMPLOYMENT_CLASSIFICATION_DETAIL } from '../../PayrollSettingsIntents';
import payrollSettingsReducer from '../payrollSettingsReducer';

describe('employmentClassificationDetailReducer', () => {
  describe('changeEmploymentClassificationDetail', () => {
    it('changes value for given key', () => {
      const state = {
        employmentClassificationDetail: {
          a: 'a',
        },
      };

      const action = {
        intent: CHANGE_EMPLOYMENT_CLASSIFICATION_DETAIL,
        key: 'a',
        value: 'b',
      };

      const actual = payrollSettingsReducer(state, action);

      expect(actual).toEqual({
        employmentClassificationDetail: {
          a: 'b',
        },
      });
    });
  });
});
