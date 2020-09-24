import {
  getJobModalContext,
  getLoadJobOptionByIdContent,
  getLoadJobOptionsParams,
  getLoadJobOptionsUrlParams,
  getSearchJobParams,
} from '../JobComboboxSelectors';

describe('JobComboboxSelectors', () => {
  describe('getLoadJobOptionsUrlParams', () => {
    it('returns the businessId', () => {
      const state = { businessId: 'bizId' };
      const actual = getLoadJobOptionsUrlParams(state);
      expect(actual).toEqual({
        businessId: 'bizId',
      });
    });
  });

  describe('getLoadJobOptionsParams', () => {
    it('returns offset and jobType', () => {
      const state = {
        pagination: {
          offset: 5,
        },
      };

      const actual = getLoadJobOptionsParams(state);
      expect(actual).toEqual({ offset: 5 });
    });
  });

  describe('getLoadJobOptionByIdContent', () => {
    it('transforms id into an array of a single id', () => {
      const actual = getLoadJobOptionByIdContent('1');
      expect(actual).toEqual(['1']);
    });
  });

  describe('getSearchJobParams', () => {
    it('always returns offset as 0', () => {
      const keywords = 'Romeo';
      const actual = getSearchJobParams(keywords);
      expect(actual.offset).toEqual(0);
    });

    it('returns keywords and jobType', () => {
      const keywords = 'Romeo';
      const actual = getSearchJobParams(keywords);
      expect(actual.keywords).toEqual('Romeo');
    });
  });

  describe('getJobModalContext', () => {
    it('returns the businessId and region', () => {
      const state = {
        businessId: 'bizId',
        region: 'au',
      };

      const actual = getJobModalContext(state);
      expect(actual).toEqual({
        businessId: 'bizId',
        region: 'au',
      });
    });
  });
});
