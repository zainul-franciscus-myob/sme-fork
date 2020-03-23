import {
  getIsDefaultFilters, getLoadMoreButtonStatus, getTableEntries,
} from '../invoiceListSelectors';
import LoadMoreButtonStatuses from '../../../../components/PaginatedListTemplate/LoadMoreButtonStatuses';

describe('invoiceListReducer', () => {
  describe('getTableEntries', () => {
    it('returns green status colour when the status is closed', () => {
      const closedState = {
        entries: [{
          status: 'Closed',
        }],
      };
      const expectedStatusColour = 'green';
      const actual = getTableEntries(closedState);

      expect(actual[0].statusColor).toEqual(expectedStatusColour);
    });

    it('returns grey status colour when the status is open', () => {
      const openState = {
        entries: [{
          status: 'Open',
        }],
      };
      const expectedStatusColour = 'light-grey';
      const actual = getTableEntries(openState);

      expect(actual[0].statusColor).toEqual(expectedStatusColour);
    });

    it('returns red status colour when the status is open and has overdue', () => {
      const overdueState = {
        entries: [{
          status: 'Open',
          dateDue: '06/06/1999',
          dateDueDisplay: '06/06/1999',
        }],
      };
      const expectedStatusColour = 'red';
      const actual = getTableEntries(overdueState);

      expect(actual[0].statusColor).toEqual(expectedStatusColour);
    });

    it('returns red due date colour when the status is open and has overdue', () => {
      const overdueState = {
        entries: [{
          status: 'Open',
          dateDue: '06/06/1999',
          dateDueDisplay: '06/06/1999',
        }],
      };
      const expectedDueDateColour = 'red';
      const actual = getTableEntries(overdueState);

      expect(actual[0].dueDateColor).toEqual(expectedDueDateColour);
    });

    it('returns black due date colour when displayDateDue is COD', () => {
      const overdueState = {
        entries: [{
          status: 'Open',
          dateDue: '06/06/1999',
          dateDueDisplay: 'COD',
        }],
      };
      const expectedDueDateColour = 'black';
      const actual = getTableEntries(overdueState);

      expect(actual[0].dueDateColor).toEqual(expectedDueDateColour);
    });
  });

  describe('getIsDefaultFilters', () => {
    it('should return false when default filters arent applied', () => {
      const state = {
        defaultFilterOptions: { keywords: 'not', type: 'abc' },
        filterOptions: { keywords: 'the same', type: 'abc' },
      };
      const expected = false;
      const actual = getIsDefaultFilters(state);

      expect(actual).toEqual(expected);
    });
    it('should return true when default filters are applied', () => {
      const state = {
        defaultFilterOptions: { keywords: 'the same', type: 'abc' },
        filterOptions: { keywords: 'the same', type: 'abc' },
      };
      const expected = true;
      const actual = getIsDefaultFilters(state);

      expect(actual).toEqual(expected);
    });
  });

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
    it('should return HIDDEN when reach last page', () => {
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
