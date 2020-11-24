import { getFlipSortOrder, shouldShowEmptyState } from '../payRunListSelectors';

describe('payRunListSelectors', () => {
  describe('getEmptyState', () => {
    describe('shouldShowEmptyState', () => {
      describe('when registered', () => {
        it('should return true if entries is empty', () => {
          const state = {
            entries: [],
          };

          expect(shouldShowEmptyState(state)).toEqual(true);
        });

        it('should return false if there is at one entry', () => {
          const state = {
            entries: [{}],
          };

          expect(shouldShowEmptyState(state)).toEqual(false);
        });
      });

      describe('when connection is lost', () => {
        it('should return true if entries is empty', () => {
          const state = {
            entries: [],
          };

          expect(shouldShowEmptyState(state)).toEqual(true);
        });
      });
    });

    describe('getFlipSortOrder', () => {
      it('should return desc when sort order is asc', () => {
        const state = {
          sortOrder: 'asc',
        };
        const actual = getFlipSortOrder(state);
        expect(actual).toEqual('desc');
      });

      it('should return asc when sort order is desc', () => {
        const state = {
          sortOrder: 'desc',
        };
        const actual = getFlipSortOrder(state);
        expect(actual).toEqual('asc');
      });
    });
  });
});
