import { HeaderBusinessDetailStyle } from '../templateOptions';
import {
  REMOVE_TEMPLATE_IMAGE,
  UPDATE_TEMPLATE_IMAGE,
  UPDATE_TEMPLATE_OPTION,
} from '../TemplateIntents';
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
  describe('UPDATE_TEMPLATE_IMAGE', () => {
    it('updating logo image', () => {
      const state = {
        tempFile: 'abc',
        template: {
          headerBusinessDetailsStyle:
            HeaderBusinessDetailStyle.logoAndBusinessDetails,
          headerImage: undefined,
          logoImage: undefined,
        },
      };

      const action = {
        intent: UPDATE_TEMPLATE_IMAGE,
      };

      const actual = templateReducer(state, action);
      const expected = {
        tempFile: 'abc',
        hasChange: true,
        template: {
          headerBusinessDetailsStyle:
            HeaderBusinessDetailStyle.logoAndBusinessDetails,
          headerImage: undefined,
          logoImage: 'abc',
        },
      };

      expect(actual).toEqual(expected);
    });
    it('updating header image', () => {
      const state = {
        tempFile: 'abc',
        template: {
          headerBusinessDetailsStyle:
            HeaderBusinessDetailStyle.fullWidthHeaderImage,
          headerImage: undefined,
          logoImage: undefined,
        },
      };

      const action = {
        intent: UPDATE_TEMPLATE_IMAGE,
      };

      const actual = templateReducer(state, action);
      const expected = {
        tempFile: 'abc',
        hasChange: true,
        template: {
          headerBusinessDetailsStyle:
            HeaderBusinessDetailStyle.fullWidthHeaderImage,
          logoImage: undefined,
          headerImage: 'abc',
        },
      };

      expect(actual).toEqual(expected);
    });
  });
  describe('REMOVE_TEMPLATE_IMAGE', () => {
    it('updating logo image', () => {
      const state = {
        tempFile: 'abc',
        template: {
          headerBusinessDetailsStyle:
            HeaderBusinessDetailStyle.logoAndBusinessDetails,
          headerImage: 'def',
          logoImage: 'gg',
        },
      };

      const action = {
        intent: REMOVE_TEMPLATE_IMAGE,
      };

      const actual = templateReducer(state, action);
      const expected = {
        tempFile: 'abc',
        hasChange: true,
        template: {
          headerBusinessDetailsStyle:
            HeaderBusinessDetailStyle.logoAndBusinessDetails,
          headerImage: 'def',
          logoImage: undefined,
        },
      };

      expect(actual).toEqual(expected);
    });
  });
});
