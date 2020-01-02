import { getLoadMoreButtonStatus } from '../quoteListSelector';
import LoadMoreButtonStatuses from '../../../employee/employeeList/components/Pagination/LoadMoreButtonStatuses';

describe('quoteListSelector', () => {
  describe('getLoadMoreButtonStatus', () => {
    it('returns status LOADING when state.isLoadingMore is true', () => {
      const state = {
        isLoadingMore: true,
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

    it('returns status SHOWN when state.pagination.hasNextPage is true, isLoadingMore and isTableLoading is false', () => {
      const state = {
        isLoadingMore: false,
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
