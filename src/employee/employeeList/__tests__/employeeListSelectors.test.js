import { getLoadMoreButtonStatus } from '../EmployeeListSelectors';
import LoadMoreButtonStatuses from '../components/Pagination/LoadMoreButtonStatuses';

describe('employeeListSelectors', () => {
  describe('getLoadMoreButtonStatus', () => {
    it('returns status LOADING when state.isMoreLoading is true', () => {
      const state = {
        isMoreLoading: true,
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

    it('returns status SHOWN when state.pagination.hasNextPage is true, isMoreLoading and isTableLoading is false', () => {
      const state = {
        isMoreLoading: false,
        isTableLoading: false,
        pagination: {
          hasNextPage: true,
        },
      };

      const actual = getLoadMoreButtonStatus(state);

      expect(actual).toEqual(LoadMoreButtonStatuses.SHOWN);
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
  });
});
