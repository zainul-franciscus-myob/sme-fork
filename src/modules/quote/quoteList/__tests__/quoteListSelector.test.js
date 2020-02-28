import { getLoadMoreButtonStatus } from '../quoteListSelectors';
import LoadMoreButtonStatuses from '../../../employee/employeeList/components/Pagination/LoadMoreButtonStatuses';

describe('quoteListSelector', () => {
  describe('getLoadMoreButtonStatus', () => {
    it('returns status LOADING when state.isNextPageLoading is true', () => {
      const state = {
        isNextPageLoading: true,
        pagination: {
          hasNextPage: true,
        },
      };

      const actual = getLoadMoreButtonStatus(state);

      expect(actual).toEqual(LoadMoreButtonStatuses.LOADING);
    });

    it('returns status HIDDEN when state.isTableLoading is true', () => {
      const state = {
        isTableLoading: true,
        pagination: {
          hasNextPage: true,
        },
      };

      const actual = getLoadMoreButtonStatus(state);

      expect(actual).toEqual(LoadMoreButtonStatuses.HIDDEN);
    });

    it('returns status HIDDEN when state.pagination.hasNextPage is false', () => {
      const state = {
        pagination: {
          hasNextPage: false,
        },
      };

      const actual = getLoadMoreButtonStatus(state);

      expect(actual).toEqual(LoadMoreButtonStatuses.HIDDEN);
    });

    it('returns status SHOWN when state.pagination.hasNextPage is true, isNextPageLoading and isTableLoading is false', () => {
      const state = {
        isNextPageLoading: false,
        isTableLoading: false,
        pagination: {
          hasNextPage: true,
        },
      };

      const actual = getLoadMoreButtonStatus(state);

      expect(actual).toEqual(LoadMoreButtonStatuses.SHOWN);
    });
  });
});
