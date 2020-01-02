import { DELETE_TEMPLATE } from '../../../SalesSettingsIntents';
import saleSettingsDetailReducer from '../../salesSettingsDetailReducer';

describe('saleSettingsDetailReducer', () => {
  describe('delete template', () => {
    it('removes the slw template', () => {
      const state = {
        pendingDeleteTemplate: '',
        templateSettings: {
          templates: [
            {
              name: 'Long template',
              isDefault: false,
            },
            {
              name: 'Special template for special people',
              isDefault: true,
            },
          ],
        },
      };

      const action = {
        intent: DELETE_TEMPLATE,
        templateName: 'Long template',
      };

      const actual = saleSettingsDetailReducer(state, action);
      const expected = {
        pendingDeleteTemplate: '',
        templateSettings: {
          templates: [
            {
              name: 'Special template for special people',
              isDefault: true,
            },
          ],
        },
      };

      expect(actual).toEqual(expected);
    });
  });
});
