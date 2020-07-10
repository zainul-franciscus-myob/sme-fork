import {
  getBusinessUrl,
  getBusinesses,
  getShouldRedirect,
} from '../BusinessListSelector';

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

  describe('getShouldRedirect', () => {
    describe('when there is only one business in the business list', () => {
      describe('and it is a New Essentials business', () => {
        it('returns true', () => {
          const state = {
            businesses: [{ businessName: 'a' }],
          };
          const actual = getShouldRedirect(state);

          expect(actual).toEqual(true);
        });
      });

      describe('and it is an Old Essentials business', () => {
        it('returns false', () => {
          const state = {
            businesses: [{ uri: 'https://some-old-essentials-uri' }],
          };

          const actual = getShouldRedirect(state);

          expect(actual).toEqual(false);
        });
      });
    });

    describe('when there is more than one business in the business list', () => {
      it('returns false', () => {
        const state = {
          businesses: [
            { businessName: 'a' },
            { businessName: 'b' },
            { businessName: 'c' },
          ],
        };
        const actual = getShouldRedirect(state);

        expect(actual).toEqual(false);
      });
    });

    describe('when the list is empty', () => {
      it('returns false', () => {
        const state = {
          businesses: [],
        };
        const actual = getShouldRedirect(state);

        expect(actual).toEqual(false);
      });
    });
  });

  describe('getBusinessUrl', () => {
    describe('when the business is a New Essentials business', () => {
      it('returns the dashboard URL for the business', () => {
        const state = {
          businesses: [{ id: 'some-business-id', region: 'au' }],
        };
        expect(getBusinessUrl(state)).toEqual(
          '/#/au/some-business-id/dashboard'
        );
      });
    });

    describe('when the business is an Old Essentials business', () => {
      it('returns the absolute URL for the business in Old Essentials', () => {
        const state = {
          businesses: [{ uri: 'https://some-old-essentials-uri' }],
        };
        expect(getBusinessUrl(state)).toEqual(
          'https://some-old-essentials-uri'
        );
      });
    });
  });
});
