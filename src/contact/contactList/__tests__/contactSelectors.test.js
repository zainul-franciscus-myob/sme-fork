import {
  getIsTableEmpty,
  getLoadMoreButtonStatus,
  getOrder,
  getTableEntries,
  getTypeFilterOptions,
} from '../contactListSelector';
import LoadMoreButtonStatuses from '../../../components/PaginatedListTemplate/LoadMoreButtonStatuses';

describe('contactListSelector', () => {
  describe('getOrder', () => {
    it('when descending is true', () => {
      const state = {
        orderBy: 'column',
        sortOrder: 'desc',
      };

      const expected = { column: 'column', descending: true };
      const actual = getOrder(state);

      expect(actual).toEqual(expected);
    });
    it('when descending is false', () => {
      const state = {
        orderBy: 'column',
        sortOrder: 'asc',
      };

      const expected = { column: 'column', descending: false };
      const actual = getOrder(state);

      expect(actual).toEqual(expected);
    });
  });
  describe('getIsTableEmpty', () => {
    it('should be false  when no entries', () => {
      const state = { entries: [] };
      const expected = true;
      const actual = getIsTableEmpty(state);

      expect(actual).toEqual(expected);
    });
    it('should be true when entries', () => {
      const state = { entries: [{ id: 1 }] };
      const expected = false;
      const actual = getIsTableEmpty(state);

      expect(actual).toEqual(expected);
    });
  });
  describe('getTypeFilterOptions', () => {
    it('should parse filter types', () => {
      const state = {
        typeFilters: [
          { name: 'abc', value: 'def' },
          { name: '123', value: '456' },
        ],
      };

      const expected = [
        { label: 'abc', value: 'def' },
        { label: '123', value: '456' },
      ];
      const actual = getTypeFilterOptions(state);

      expect(actual).toEqual(expected);
    });
  });
  describe('getTableEntries', () => {
    it('should add link for each entry', () => {
      const state = {
        entries: [
          { id: 'abc', value: 'def' },
          { id: '123', value: '456' },
        ],
        businessId: '999',
        region: 'au',
      };

      const expected = [
        { id: 'abc', value: 'def', link: '/#/au/999/contact/abc' },
        { id: '123', value: '456', link: '/#/au/999/contact/123' },
      ];
      const actual = getTableEntries(state);

      expect(actual).toEqual(expected);
    });
  });
  describe('getLoadMoreButtonStatus', () => {
    it('should return LOADING when isNextPageLoading is true', () => {
      const state = {
        isNextPageLoading: true,
      };

      const actual = getLoadMoreButtonStatus(state);

      expect(actual).toEqual(LoadMoreButtonStatuses.LOADING);
    });
    it('should return HIDDEN when isTableLoading is true', () => {
      const state = {
        isTableLoading: true,
      };

      const actual = getLoadMoreButtonStatus(state);

      expect(actual).toEqual(LoadMoreButtonStatuses.HIDDEN);
    });
    it('should return SHOWN when there is a next page and neither next page nor table is loading', () => {
      const state = {
        pagination: {
          hasNextPage: true,
        },
        isNextPageLoading: false,
        isTableLoading: false,
      };

      const actual = getLoadMoreButtonStatus(state);

      expect(actual).toEqual(LoadMoreButtonStatuses.SHOWN);
    });
    it('should return HIDDEN when there is no next page and next page is not loading', () => {
      const state = {
        pagination: {
          hasNextPage: false,
        },
        isNextPageLoading: false,
      };

      const actual = getLoadMoreButtonStatus(state);

      expect(actual).toEqual(LoadMoreButtonStatuses.HIDDEN);
    });
  });
});
