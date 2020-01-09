import { UPDATE_TEMPLATE_OPTION } from '../TemplateIntents';
import templateReducer from '../templateReducer';

describe('templateReducer', () => {
  describe('UPDATE_TEMPLATE_OPTION', () => {
    it('updating common options', () => {
      const state = {
        template: {},
      };

      const action = {
        intent: UPDATE_TEMPLATE_OPTION,
        key: 'foo',
        value: 'bar',
      };

      const actual = templateReducer(state, action);
      const expected = {
        hasChange: true,
        template: {
          foo: 'bar',
        },
      };

      expect(actual).toEqual(expected);
    });
  });
});
