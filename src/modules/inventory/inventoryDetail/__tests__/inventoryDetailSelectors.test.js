import { getUrlParams } from '../inventoryDetailSelectors';

describe('inventoryDetailSelectors', () => {
  describe('getUrlParams', () => {
    it('build url params for create', () => {
      const state = {
        itemId: 'new',
        businessId: '123',
      };

      const actual = getUrlParams(state);

      expect(actual).toEqual({
        businessId: '123',
      });
    });

    it('build url params for non create', () => {
      const state = {
        itemId: '1',
        businessId: '123',
      };

      const actual = getUrlParams(state);

      expect(actual).toEqual({
        businessId: '123',
        itemId: '1',
      });
    });
  });
});
