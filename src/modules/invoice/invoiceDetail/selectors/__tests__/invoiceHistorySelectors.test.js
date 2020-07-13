import {
  getDate,
  getMostRecentStatus,
  getMostRecentStatusColor,
  getTime,
} from '../invoiceHistorySelectors';
import InvoiceHistoryAccordionStatus from '../../types/InvoiceHistoryAccordionStatus';
import InvoiceHistoryStatus from '../../types/InvoiceHistoryStatus';

describe('invoiceHistorySelectors', () => {
  describe('getMostRecentStatus', () => {
    it('returns status of top element in invoiceHistory array', () => {
      const state = {
        invoiceHistory: [
          {
            status: 'VIEWED_ONLINE',
          },
          {
            status: 'DOWNLOADED',
          },
        ],
      };

      const expected = 'VIEWED_ONLINE';

      const actual = getMostRecentStatus(state);

      expect(actual).toEqual(expected);
    });
  });

  describe('getMostRecentStatusColor', () => {
    const addMostRecentStatusToState = (state, mostRecentStatus) => ({
      ...state,
      invoiceHistory: [{ status: mostRecentStatus }],
    });

    it('when accordion open, returns "light-grey" for all statuses, ', () => {
      let state = {
        invoiceHistoryAccordionStatus: InvoiceHistoryAccordionStatus.OPEN,
      };
      state = addMostRecentStatusToState(
        state,
        InvoiceHistoryStatus.PAYMENT_RECEIVED
      );

      const expected = 'light-grey';
      const actual = getMostRecentStatusColor(state);

      expect(actual).toEqual(expected);
    });

    it('when accordion closed, returns "green" for Payment Received status', () => {
      let state = {
        invoiceHistoryAccordionStatus: InvoiceHistoryAccordionStatus.CLOSED,
      };

      state = addMostRecentStatusToState(
        state,
        InvoiceHistoryStatus.PAYMENT_RECEIVED
      );

      const expected = 'green';
      const actual = getMostRecentStatusColor(state);

      expect(actual).toEqual(expected);
    });

    it('when accordion closed, returns "red" for Payment Declined, Bulk Payment Declined, & Delivery Failed statuses', () => {
      let state = {
        invoiceHistoryAccordionStatus: InvoiceHistoryAccordionStatus.CLOSED,
      };

      const expected = 'red';

      state = addMostRecentStatusToState(
        state,
        InvoiceHistoryStatus.PAYMENT_DECLINED
      );
      expect(getMostRecentStatusColor(state)).toEqual(expected);

      state = addMostRecentStatusToState(
        state,
        InvoiceHistoryStatus.BULK_PAYMENT_DECLINED
      );
      expect(getMostRecentStatusColor(state)).toEqual(expected);

      state = addMostRecentStatusToState(
        state,
        InvoiceHistoryStatus.DELIVERY_FAILED
      );
      expect(getMostRecentStatusColor(state)).toEqual(expected);
    });

    it('when accordion closed, returns "light-grey" for all other statuses', () => {
      let state = {
        invoiceHistoryAccordionStatus: InvoiceHistoryAccordionStatus.CLOSED,
      };

      const expected = 'light-grey';

      state = addMostRecentStatusToState(state, InvoiceHistoryStatus.CREATED);
      expect(getMostRecentStatusColor(state)).toEqual(expected);

      state = addMostRecentStatusToState(
        state,
        InvoiceHistoryStatus.VIEWED_ONLINE
      );
      expect(getMostRecentStatusColor(state)).toEqual(expected);

      state = addMostRecentStatusToState(
        state,
        InvoiceHistoryStatus.DOWNLOADED
      );
      expect(getMostRecentStatusColor(state)).toEqual(expected);

      state = addMostRecentStatusToState(state, InvoiceHistoryStatus.PRINTED);
      expect(getMostRecentStatusColor(state)).toEqual(expected);

      state = addMostRecentStatusToState(
        state,
        InvoiceHistoryStatus.EXPORTED_TO_PDF
      );
      expect(getMostRecentStatusColor(state)).toEqual(expected);

      state = addMostRecentStatusToState(
        state,
        InvoiceHistoryStatus.PAID_ONLINE
      );
      expect(getMostRecentStatusColor(state)).toEqual(expected);

      state = addMostRecentStatusToState(
        state,
        InvoiceHistoryStatus.PAID_IN_BULK_ONLINE
      );
      expect(getMostRecentStatusColor(state)).toEqual(expected);

      state = addMostRecentStatusToState(
        state,
        InvoiceHistoryStatus.INVOICE_REVERSED
      );
      expect(getMostRecentStatusColor(state)).toEqual(expected);

      state = addMostRecentStatusToState(state, InvoiceHistoryStatus.EMAILED);
      expect(getMostRecentStatusColor(state)).toEqual(expected);
    });
  });

  describe('getDate', () => {
    it('returns nothing when there is no date', () => {
      const expected = '';
      const row = {};

      const actual = getDate(row);

      expect(actual).toEqual(expected);
    });

    it('returns the date when there is no time component', () => {
      const expected = '11/12/2019';
      const row = { date: '2019-12-11' };

      const actual = getDate(row);

      expect(actual).toEqual(expected);
    });

    it('returns a date when given a utc date string', () => {
      const expected = '12/12/2019';
      const row = { date: '2019-12-12T01:00:00.000Z' };

      const actual = getDate(row);

      expect(actual).toEqual(expected);
    });
  });

  describe('getTime', () => {
    it('returns nothing when there is no utcDate or date', () => {
      const expected = '';
      const row = {};

      const actual = getTime(row);

      expect(actual).toEqual(expected);
    });

    it('returns a formatted time when given a utc date string', () => {
      // expect 1:00am because tests run with a universal locale (not AU)
      const expected = '1:00am';
      const row = { date: '2019-12-12T01:00:00.000Z' };

      const actual = getTime(row);

      expect(actual).toEqual(expected);
    });
  });
});
