import { addDays } from 'date-fns';

import {
  getLoadMoreButtonStatus,
  getTableBodyState,
  getTableEntries,
} from '../purchaseOrderListSelectors';
import LoadMoreButtonStatuses from '../../../../components/PaginatedListTemplate/LoadMoreButtonStatuses';
import TableBodyType from '../TableBodyType';
import formatIsoDate from '../../../../common/valueFormatters/formatDate/formatIsoDate';
import formatSlashDate from '../../../../common/valueFormatters/formatDate/formatSlashDate';

describe('purchaseOrderListSelectors', () => {
  describe('getTableEntries', () => {
    const today = new Date();

    const buildState = ({ promisedDate }) => ({
      businessId: '123',
      region: 'au',
      entries: [
        {
          id: '1',
          number: '00000034',
          invoiceNumber: '126',
          supplier: 'Footloose Dance Studio',
          dateIssued: '01/03/2019',
          purchaseOrderAmount: '2,000.00',
          balanceDue: 1000,
          promisedDate,
        },
      ],
    });

    const buildExpected = ({ promisedDate }) => [
      {
        id: '1',
        number: '00000034',
        invoiceNumber: '126',
        supplier: 'Footloose Dance Studio',
        dateIssued: '01/03/2019',
        purchaseOrderAmount: '2,000.00',
        balanceDue: 1000,
        balanceDueDisplayValue: '1,000.00',
        promisedDate,
        link: '/#/au/123/purchaseOrder/1',
      },
    ];

    describe('format entry', () => {
      it('formats entry', () => {
        const promisedDate = addDays(today, 1);
        const state = buildState({ promisedDate: formatIsoDate(promisedDate) });
        const expected = buildExpected({
          promisedDate: formatSlashDate(promisedDate),
        });

        const actual = getTableEntries(state);

        expect(actual).toEqual(expected);
      });

      it('keeps promisedDate string when it is not a date', () => {
        const promisedDate = 'COD';
        const state = buildState({ promisedDate });
        const expected = buildExpected({ promisedDate });

        const actual = getTableEntries(state);

        expect(actual).toEqual(expected);
      });
    });
  });

  describe('getTableBodyState', () => {
    it('returns table when entries not empty', () => {
      const state = {
        defaultFilterOptions: {
          supplierId: undefined,
        },
        filterOptions: {
          supplierId: undefined,
        },
        entries: [1],
      };

      const actual = getTableBodyState(state);

      expect(actual).toEqual(TableBodyType.TABLE);
    });

    it('returns empty when no entries with default filters', () => {
      const state = {
        entries: [],
        defaultFilterOptions: {
          supplierId: undefined,
        },
        filterOptions: {
          supplierId: undefined,
        },
      };

      const actual = getTableBodyState(state);

      expect(actual).toEqual(TableBodyType.EMPTY);
    });

    it('returns noResults when no entries with customized filters', () => {
      const state = {
        entries: [],
        defaultFilterOptions: {
          supplierId: undefined,
        },
        filterOptions: {
          supplierId: '🐸',
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
