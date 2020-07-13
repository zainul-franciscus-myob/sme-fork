import { loadInvoiceHistory } from '../InvoiceHistoryReducer';
import InvoiceHistoryStatus from '../../types/InvoiceHistoryStatus';

describe('InvoiceHistoryReducer', () => {
  const event = {
    [InvoiceHistoryStatus.CREATED]: {
      status: 'CREATED',
      date: '2019-12-01',
      description: '',
    },
    [InvoiceHistoryStatus.PAYMENT_RECEIVED]: {
      status: 'PAYMENT_RECEIVED',
      date: '2019-12-01',
      description: '',
    },
    [InvoiceHistoryStatus.INVOICE_REVERSED]: {
      status: 'INVOICE_REVERSED',
      date: '2019-12-01',
      description: '',
    },
    [InvoiceHistoryStatus.EXPORTED_TO_PDF]: {
      status: 'EXPORTED_TO_PDF',
      date: '2019-12-01',
      description: '',
    },
    [InvoiceHistoryStatus.CREDIT_APPLIED]: {
      status: 'CREDIT_APPLIED',
      date: '2019-12-01',
      description: '',
    },

    [InvoiceHistoryStatus.VIEWED_ONLINE]: {
      status: 'VIEWED_ONLINE',
      date: '2019-12-01T23:59:59.999Z',
      description: '',
    },
    [InvoiceHistoryStatus.DOWNLOADED]: {
      status: 'DOWNLOADED',
      date: '2019-12-01T23:59:59.999Z',
      description: '',
    },
    [InvoiceHistoryStatus.PRINTED]: {
      status: 'PRINTED',
      date: '2019-12-01T23:59:59.999Z',
      description: '',
    },
    [InvoiceHistoryStatus.PAID_ONLINE]: {
      status: 'PAID_ONLINE',
      date: '2019-12-01T23:59:59.999Z',
      description: '',
    },
    [InvoiceHistoryStatus.PAID_IN_BULK_ONLINE]: {
      status: 'PAID_IN_BULK_ONLINE',
      date: '2019-12-01T23:59:59.999Z',
      description: '',
    },
    [InvoiceHistoryStatus.PAYMENT_DECLINED]: {
      status: 'PAYMENT_DECLINED',
      date: '2019-12-01T23:59:59.999Z',
      description: '',
    },
    [InvoiceHistoryStatus.BULK_PAYMENT_DECLINED]: {
      status: 'BULK_PAYMENT_DECLINED',
      date: '2019-12-01T23:59:59.999Z',
      description: '',
    },
  };

  it(`${InvoiceHistoryStatus.CREATED} event is always last`, () => {
    const invoiceHistory = [
      event[InvoiceHistoryStatus.CREATED],
      event[InvoiceHistoryStatus.INVOICE_REVERSED],
      event[InvoiceHistoryStatus.VIEWED_ONLINE],
    ];
    const state = { invoiceHistory };

    const actual = loadInvoiceHistory(state, { invoiceHistory });

    expect(actual.invoiceHistory[2].status).toEqual(
      InvoiceHistoryStatus.CREATED
    );
  });

  it('events are sorted by descending date', () => {
    const invoiceHistory = [
      {
        ...event[InvoiceHistoryStatus.INVOICE_REVERSED],
        date: '2019-12-01',
      },
      {
        ...event[InvoiceHistoryStatus.PAYMENT_RECEIVED],
        date: '2019-12-02',
      },
      {
        ...event[InvoiceHistoryStatus.VIEWED_ONLINE],
        date: '2019-12-03T23:59:59.999Z',
      },
      {
        ...event[InvoiceHistoryStatus.PRINTED],
        date: '2019-12-04T23:59:59.999Z',
      },
    ];

    const state = { invoiceHistory };

    const actual = loadInvoiceHistory(state, { invoiceHistory });

    expect(actual.invoiceHistory[0].status).toEqual(
      InvoiceHistoryStatus.PRINTED
    );
    expect(actual.invoiceHistory[1].status).toEqual(
      InvoiceHistoryStatus.VIEWED_ONLINE
    );
    expect(actual.invoiceHistory[2].status).toEqual(
      InvoiceHistoryStatus.PAYMENT_RECEIVED
    );
    expect(actual.invoiceHistory[3].status).toEqual(
      InvoiceHistoryStatus.INVOICE_REVERSED
    );
  });

  it('payment events on the same day should be sorted by BusinessEventId', () => {
    const invoiceHistory = [
      {
        ...event[InvoiceHistoryStatus.INVOICE_REVERSED],
        journalId: 1,
        date: '2019-12-01',
        description: '🦒',
      },
      {
        ...event[InvoiceHistoryStatus.INVOICE_REVERSED],
        journalId: 2,
        date: '2019-12-01',
        description: '🐧',
      },
    ];

    const state = { invoiceHistory };

    const actual = loadInvoiceHistory(state, { invoiceHistory });

    expect(actual.invoiceHistory[0].description).toEqual('🐧');
    expect(actual.invoiceHistory[1].description).toEqual('🦒');
  });

  it('payment received events are the last event of that day', () => {
    const invoiceHistory = [
      {
        ...event[InvoiceHistoryStatus.PAYMENT_RECEIVED],
        date: '2019-12-01',
      },
      {
        ...event[InvoiceHistoryStatus.INVOICE_REVERSED],
        date: '2019-11-31',
      },
      {
        ...event[InvoiceHistoryStatus.VIEWED_ONLINE],
        date: '2019-12-01T23:59:59.999Z',
      },
      {
        ...event[InvoiceHistoryStatus.PRINTED],
        date: '2019-12-02T23:59:59.999Z',
      },
    ];

    const state = { invoiceHistory };

    const actual = loadInvoiceHistory(state, { invoiceHistory });

    expect(actual.invoiceHistory[0].status).toEqual(
      InvoiceHistoryStatus.PRINTED
    );
    expect(actual.invoiceHistory[1].status).toEqual(
      InvoiceHistoryStatus.PAYMENT_RECEIVED
    );
    expect(actual.invoiceHistory[2].status).toEqual(
      InvoiceHistoryStatus.VIEWED_ONLINE
    );
    expect(actual.invoiceHistory[3].status).toEqual(
      InvoiceHistoryStatus.INVOICE_REVERSED
    );
  });

  describe('when exported to pdf', () => {
    const invoiceHistory = [
      event[InvoiceHistoryStatus.CREATED],
      event[InvoiceHistoryStatus.EXPORTED_TO_PDF],
      event[InvoiceHistoryStatus.VIEWED_ONLINE],
    ];

    it(`places "${InvoiceHistoryStatus.EXPORTED_TO_PDF}" event after created`, () => {
      const state = { invoiceHistory };

      const actual = loadInvoiceHistory(state, { invoiceHistory });

      expect(actual.invoiceHistory[0].status).toEqual(
        InvoiceHistoryStatus.VIEWED_ONLINE
      );
      expect(actual.invoiceHistory[1].status).toEqual(
        InvoiceHistoryStatus.EXPORTED_TO_PDF
      );
      expect(actual.invoiceHistory[2].status).toEqual(
        InvoiceHistoryStatus.CREATED
      );
    });
  });
});
