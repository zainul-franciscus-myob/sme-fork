import { addDays, subDays } from 'date-fns';

import {
  getDefaultDateRange,
  getLoadMoreButtonStatus,
  getTableBodyState,
  getTableEntries,
} from '../billListSelectors';
import LoadMoreButtonStatuses from '../../../components/PaginatedListTemplate/LoadMoreButtonStatuses';
import TableBodyType from '../TableBodyType';
import formatIsoDate from '../../../common/valueFormatters/formatDate/formatIsoDate';
import formatSlashDate from '../../../common/valueFormatters/formatDate/formatSlashDate';

describe('billListSelectors', () => {
  describe('getTableEntries', () => {
    const today = new Date();

    const buildState = ({ dateDue, status = 'Open' }) => ({
      businessId: '123',
      region: 'au',
      entries: [
        {
          id: '1',
          number: '00000034',
          invoiceNumber: '126',
          supplier: 'Footloose Dance Studio',
          dateIssued: '01/03/2019',
          billAmount: '2,000.00',
          balanceDue: 1000,
          status,
          dateDue,
          hasAttachment: true,
        },
      ],
    });

    const buildExpected = ({ dateDue, isOverdue = false, status = 'Open' }) => ([{
      id: '1',
      number: '00000034',
      invoiceNumber: '126',
      supplier: 'Footloose Dance Studio',
      dateIssued: '01/03/2019',
      billAmount: '2,000.00',
      balanceDue: 1000,
      balanceDueDisplayValue: '1,000.00',
      status,
      dateDue,
      isOverdue,
      hasAttachment: true,
      link: '/#/au/123/bill/1',
      badgeColor: 'light-grey',
    }]);

    describe('format entry', () => {
      it('formats entry', () => {
        const dateDue = addDays(today, 1);
        const state = buildState({ dateDue: formatIsoDate(dateDue) });
        const expected = buildExpected({ dateDue: formatSlashDate(dateDue), isOverdue: false });

        const actual = getTableEntries(state);

        expect(actual).toEqual(expected);
      });

      it('keeps dateDue string when it is not a date', () => {
        const dateDue = 'COD';
        const state = buildState({ dateDue });
        const expected = buildExpected({ dateDue, isOverdue: false });

        const actual = getTableEntries(state);

        expect(actual).toEqual(expected);
      });
    });

    describe('isOverdue', () => {
      it('overdue when status is Open and dueDate is before today', () => {
        const dateDue = subDays(today, 1);
        const state = buildState({ dateDue: formatIsoDate(dateDue) });

        const actual = getTableEntries(state)[0].isOverdue;

        expect(actual).toBe(true);
      });

      it('not overdue when dueDate is today', () => {
        const dateDue = today;
        const state = buildState({ dateDue: formatIsoDate(dateDue) });

        const actual = getTableEntries(state)[0].isOverdue;

        expect(actual).toBe(false);
      });

      it('not overdue when status is Closed', () => {
        const dateDue = subDays(today, 1);
        const state = buildState({ dateDue: formatIsoDate(dateDue), status: 'Closed' });

        const actual = getTableEntries(state)[0].isOverdue;

        expect(actual).toBe(false);
      });

      it('not overdue when status is Debit', () => {
        const dateDue = subDays(today, 1);
        const state = buildState({ dateDue: formatIsoDate(dateDue), status: 'Debit' });

        const actual = getTableEntries(state)[0].isOverdue;

        expect(actual).toBe(false);
      });

      it('not overdue when dueDate is not a date', () => {
        const dateDue = 'COD';
        const state = buildState({ dateDue });

        const actual = getTableEntries(state)[0].isOverdue;

        expect(actual).toBe(false);
      });
    });

    describe('badge color', () => {
      it('sets default color when status Open and not overdue', () => {
        const dateDue = addDays(today, 1);
        const state = buildState({ dateDue: formatIsoDate(dateDue) });

        const actual = getTableEntries(state)[0].badgeColor;

        expect(actual).toEqual('light-grey');
      });

      it('sets red color when status Open and overdue', () => {
        const dateDue = subDays(today, 1);
        const state = buildState({ dateDue: formatIsoDate(dateDue) });

        const actual = getTableEntries(state)[0].badgeColor;

        expect(actual).toEqual('red');
      });

      it('sets blue color when status Debit', () => {
        const dateDue = subDays(today, 1);
        const state = buildState({ dateDue: formatIsoDate(dateDue), status: 'Debit' });

        const actual = getTableEntries(state)[0].badgeColor;

        expect(actual).toEqual('blue');
      });

      it('sets blue color when status Closed', () => {
        const dateDue = subDays(today, 1);
        const state = buildState({ dateDue: formatIsoDate(dateDue), status: 'Closed' });

        const actual = getTableEntries(state)[0].badgeColor;

        expect(actual).toEqual('green');
      });
    });
  });

  describe('getTableBodyState', () => {
    it('returns table when entries not empty', () => {
      const state = {
        entries: [1],
      };

      const actual = getTableBodyState(state);

      expect(actual).toEqual(TableBodyType.TABLE);
    });

    it('returns empty when no entries with default filters', () => {
      const state = {
        entries: [],
        defaultFilterOptions: {
          status: 'All',
          supplierId: 'All',
        },
        appliedFilterOptions: {
          status: 'All',
          supplierId: 'All',
          dateFrom: formatIsoDate(getDefaultDateRange()),
          dateTo: formatIsoDate(new Date()),
          keywords: '',
        },
      };

      const actual = getTableBodyState(state);

      expect(actual).toEqual(TableBodyType.EMPTY);
    });

    it('returns noResults when no entries with customized filters', () => {
      const state = {
        entries: [],
        defaultFilterOptions: {
          status: 'All',
          supplierId: 'All',
        },
        appliedFilterOptions: {
          status: 'Open',
          supplierId: '1',
          dateFrom: '2019-01-01',
          dateTo: '2019-02-01',
          keywords: 'test',
        },
      };

      const actual = getTableBodyState(state);

      expect(actual).toEqual(TableBodyType.NO_RESULTS);
    });
  });

  describe('getLoadMoreButtonStatus', () => {
    it('sets status to hidden when hasNextPage is false', () => {
      const state = {
        pagination: {
          hasNextPage: false,
        },
      };

      const actual = getLoadMoreButtonStatus(state);

      expect(actual).toEqual(LoadMoreButtonStatuses.HIDDEN);
    });

    it('sets status to HIDDEN when isTableLoading is true', () => {
      const state = {
        isTableLoading: true,
      };

      const actual = getLoadMoreButtonStatus(state);

      expect(actual).toEqual(LoadMoreButtonStatuses.HIDDEN);
    });
    it('sets status to SHOWN when hasNextPage is true', () => {
      const state = {
        pagination: {
          hasNextPage: true,
        },
      };

      const actual = getLoadMoreButtonStatus(state);

      expect(actual).toEqual(LoadMoreButtonStatuses.SHOWN);
    });

    it('sets sets status to LOADING when isLoadingMore is true', () => {
      const state = {
        isLoadingMore: true,

      };
      const actual = getLoadMoreButtonStatus(state);

      expect(actual).toEqual(LoadMoreButtonStatuses.LOADING);
    });
  });
});
