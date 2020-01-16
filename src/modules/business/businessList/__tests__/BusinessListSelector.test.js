import { getBusinesses } from '../BusinessListSelector';

describe('BusinessListSelector', () => {
  describe('getBusinesses', () => {
    it('filters business that includes keyword', () => {
      const state = {
        keyword: '💩',
        businesses: [
          { businessName: 'hello 💩 test' },
          { businessName: '💩 test 2' },
          { businessName: 'test 3' },
        ],
      };
      const actual = getBusinesses(state);
      expect(actual).toEqual([
        { businessName: '💩 test 2' },
        { businessName: 'hello 💩 test' },
      ]);
    });

    it('sorts business in descending order', () => {
      const state = {
        keyword: '',
        sortOrder: 'desc',
        businesses: [
          { businessName: 'a' },
          { businessName: 'b' },
          { businessName: 'c' },
        ],
      };
      const actual = getBusinesses(state);
      expect(actual).toEqual([
        { businessName: 'c' },
        { businessName: 'b' },
        { businessName: 'a' },
      ]);
    });

    it('sorts business in ascending order', () => {
      const state = {
        keyword: '',
        sortOrder: 'asc',
        businesses: [
          { businessName: 'a' },
          { businessName: 'b' },
          { businessName: 'c' },
        ],
      };
      const actual = getBusinesses(state);
      expect(actual).toEqual([
        { businessName: 'a' },
        { businessName: 'b' },
        { businessName: 'c' },
      ]);
    });
  });
});
