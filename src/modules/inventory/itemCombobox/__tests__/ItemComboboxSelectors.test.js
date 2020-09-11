import {
  getItemModalContext,
  getLoadItemOptionByIdContent,
  getLoadItemOptionsParams,
  getLoadItemOptionsUrlParams,
  getSearchItemParams,
} from '../ItemComboboxSelectors';
import ItemTypes from '../ItemTypes';

describe('ItemComboboxSelectors', () => {
  describe('getLoadItemOptionsUrlParams', () => {
    it('returns the businessId', () => {
      const state = { businessId: 'bizId' };
      const actual = getLoadItemOptionsUrlParams(state);
      expect(actual).toEqual({
        businessId: 'bizId',
      });
    });
  });

  describe('getLoadItemOptionsParams', () => {
    it('returns offset and itemType', () => {
      const state = {
        pagination: {
          offset: 5,
        },
        itemType: ItemTypes.Bought,
      };

      const actual = getLoadItemOptionsParams(state);
      expect(actual).toEqual({
        offset: 5,
        itemType: 'Bought',
      });
    });
  });

  describe('getLoadItemOptionByIdContent', () => {
    it('transforms id into an array of a single id', () => {
      const actual = getLoadItemOptionByIdContent('1');
      expect(actual).toEqual(['1']);
    });
  });

  describe('getSearchItemParams', () => {
    const state = {
      pagination: {
        offset: 10,
      },
      itemType: ItemTypes.Bought,
    };

    it('always returns offset as 0', () => {
      const keywords = 'Romeo';
      const actual = getSearchItemParams(keywords, state);
      expect(actual.offset).toEqual(0);
    });

    it('returns keywords and itemType', () => {
      const keywords = 'Romeo';
      const actual = getSearchItemParams(keywords, state);
      expect(actual.keywords).toEqual('Romeo');
      expect(actual.itemType).toEqual('Bought');
    });
  });

  describe('getItemModalContext', () => {
    it('returns the businessId and region', () => {
      const state = {
        businessId: 'bizId',
        region: 'au',
      };

      const actual = getItemModalContext(state);
      expect(actual).toEqual({
        businessId: 'bizId',
        region: 'au',
      });
    });
  });
});
