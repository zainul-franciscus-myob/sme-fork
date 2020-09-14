import {
  getDate,
  getMostRecentStatus,
  getQuoteHistoryTable,
  getTime,
} from '../QuoteHistorySelectors';
import QuoteHistoryStatus from '../../types/QuoteHistoryStatus';

describe('QuoteHistorySelectors', () => {
  const state = {
    quote: {
      issueDate: '2020-01-31T01:00:00.000Z',
    },
    activityHistory: [
      {
        date: '2018-12-03T00:00:00',
        id: 'Invoiced919',
        invoiceId: 919,
        referenceNo: '00000767',
        status: 'CREATED_INVOICE',
      },
      {
        date: '2018-12-03T00:00:00',
        id: 'Created',
        status: 'CREATED',
      },
    ],
  };

  describe('getQuoteHistoryTable', () => {
    it('returns the created quote history table', () => {
      const expected = [
        {
          date: '2018-12-03T00:00:00',
          id: 'Invoiced919',
          invoiceId: 919,
          referenceNo: '00000767',
          status: 'CREATED_INVOICE',
          displayDate: '03/12/2018',
          displayTime: '',
        },
        {
          date: '2018-12-03T00:00:00',
          id: 'Created',
          status: 'CREATED',
          displayDate: '03/12/2018',
          displayTime: '',
        },
      ];
      const actual = getQuoteHistoryTable(state);
      expect(actual).toEqual(expected);
    });
  });

  describe('getDate', () => {
    it('returns formatted date', () => {
      const expected = '31/01/2020';
      const actual = getDate('2020-01-31T01:00:00.000Z');

      expect(actual).toEqual(expected);
    });

    it('returns empty if date is undefined', () => {
      const expected = '';
      const actual = getDate(undefined);

      expect(actual).toEqual(expected);
    });
  });

  describe('getTime', () => {
    it('returns empty if the status is created', () => {
      const expected = '';
      const actual = getTime({
        date: '2020-01-31T01:00:00.000Z',
        status: QuoteHistoryStatus.CREATED,
      });

      expect(actual).toEqual(expected);
    });

    it('returns empty if the status is created invoice', () => {
      const expected = '';
      const actual = getTime({
        date: '2020-01-31T01:00:00.000Z',
        status: QuoteHistoryStatus.CREATED_INVOICE,
      });

      expect(actual).toEqual(expected);
    });

    it('returns formatted time', () => {
      const expected = '1:00am';
      const actual = getTime({
        date: '2020-01-31T01:00:00.000Z',
        status: QuoteHistoryStatus.EMAILED,
      });
      expect(actual).toEqual(expected);
    });

    it('returns empty if date is undefined', () => {
      const expected = '';
      const actual = getTime({
        date: undefined,
        status: QuoteHistoryStatus.EMAILED,
      });
      expect(actual).toEqual(expected);
    });

    it('returns time if status is undefined', () => {
      const expected = '1:00am';
      const actual = getTime({
        date: '2020-01-31T01:00:00.000Z',
        status: undefined,
      });
      expect(actual).toEqual(expected);
    });

    it('returns empty if date and status is undefined', () => {
      const expected = '';
      const actual = getTime({
        date: undefined,
        status: undefined,
      });
      expect(actual).toEqual(expected);
    });
  });

  describe('getMostRecentStatus', () => {
    it('return first record status', () => {
      const expected = QuoteHistoryStatus.CREATED_INVOICE;
      const actual = getMostRecentStatus(state);

      expect(actual).toEqual(expected);
    });
  });
});
