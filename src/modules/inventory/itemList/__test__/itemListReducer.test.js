import { getLoadMoreButtonStatus } from '../itemListSelectors';
import LoadMoreButtonStatuses from '../../../../components/PaginatedListTemplate/LoadMoreButtonStatuses';

describe('itemListReducer', () => {
  describe('getLoadMoreButtonStatus', () => {
    it('should return HIDDEN when page is loading', () => {
      const state = {
        isTableLoading: true,
        pagination: {
          hasNextPage: true,
        },
      };
      expect(getLoadMoreButtonStatus(state)).toEqual(LoadMoreButtonStatuses.HIDDEN);
    });
    it('should return HIDDEN when react last page', () => {
      const state = {
        isTableLoading: false,
        pagination: {
          hasNextPage: false,
        },
      };
      expect(getLoadMoreButtonStatus(state)).toEqual(LoadMoreButtonStatuses.HIDDEN);
    });
    it('should return LOADING when loading next page', () => {
      const state = {
        isTableLoading: false,
        isNextPageLoading: true,
        pagination: {
          hasNextPage: true,
        },
      };
      expect(getLoadMoreButtonStatus(state)).toEqual(LoadMoreButtonStatuses.LOADING);
    });
    it('should return SHOWN when page loaded and not last page', () => {
      const state = {
        isTableLoading: false,
        isNextPageLoading: false,
        pagination: {
          hasNextPage: true,
        },
      };
      expect(getLoadMoreButtonStatus(state)).toEqual(LoadMoreButtonStatuses.SHOWN);
    });
  });
});
