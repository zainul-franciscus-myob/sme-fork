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
  };

  describe('getQuoteHistoryTable', () => {
    it('returns the created quote history table', () => {
      const expected = [
        {
          id: 1,
          status: QuoteHistoryStatus.CREATED,
          displayDate: '31/01/2020',
          displayTime: '',
        },
      ];
      const actual = getQuoteHistoryTable(state);

      expect(actual).toEqual(expected);
    });

    it('returns the emailed quote history table', () => {
      const expected = [
        {
          id: 2,
          status: QuoteHistoryStatus.EMAILED,
        },
        {
          id: 1,
          status: QuoteHistoryStatus.CREATED,
          displayDate: '31/01/2020',
          displayTime: '',
        },
      ];
      const newState = { ...state };
      newState.quote = {
        ...state.quote,
        emailStatus: 'Emailed',
      };

      const actual = getQuoteHistoryTable(newState);

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
      const expected = QuoteHistoryStatus.CREATED;
      const actual = getMostRecentStatus(state);

      expect(actual).toEqual(expected);
    });
  });
});
