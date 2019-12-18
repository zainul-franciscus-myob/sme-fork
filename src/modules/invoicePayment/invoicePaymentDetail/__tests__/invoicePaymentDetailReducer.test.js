import {
  FORMAT_AMOUNT_INPUT,
  LOAD_INVOICE_LIST,
  UPDATE_INVOICE_PAYMENT_ENTRIES,
} from '../../InvoicePaymentIntent';
import invoicePaymentDetailReducer from '../invoicePaymentDetailReducer';

describe('invoicePaymentDetailReducer', () => {
  describe('updateInvoicePaymentEntries', () => {
    it('updates entries with user input', () => {
      const action = {
        intent: UPDATE_INVOICE_PAYMENT_ENTRIES,
        index: 1,
        value: '100',
        name: 'paidAmount',
      };
      const state = {
        entries: [
          {
            paidAmount: '10',
          },
          {
            paidAmount: '50',
          },
        ],
      };
      const expected = {
        isPageEdited: true,
        entries: [
          {
            paidAmount: '10',
          },
          {
            paidAmount: '100',
          },
        ],
      };

      expect(invoicePaymentDetailReducer(state, action))
        .toEqual(expected);
    });
  });

  describe('formatAmountInput', () => {
    it('formats amount input to 2 decimals', () => {
      const name = 'name';
      const value = '10';
      const index = 1;
      const state = {
        entries: [
          {
            [name]: '1',
          },
          {
            [name]: '1',
          },
        ],
      };
      const action = {
        name,
        value,
        index,
        intent: FORMAT_AMOUNT_INPUT,
      };

      const expected = {
        entries: [
          {
            [name]: '1',
          },
          {
            [name]: '10.00',
          },
        ],
      };
      const actual = invoicePaymentDetailReducer(state, action);

      expect(actual)
        .toEqual(expected);
    });

    it('returns empty string value is not a number', () => {
      const name = 'name';
      const value = '-';
      const index = 0;
      const state = {
        entries: [
          {
            [name]: '1',
          },
        ],
      };
      const action = {
        name,
        value,
        index,
        intent: FORMAT_AMOUNT_INPUT,
      };

      const expected = {
        entries: [
          {
            [name]: '',
          },
        ],
      };
      const actual = invoicePaymentDetailReducer(state, action);

      expect(actual)
        .toEqual(expected);
    });
  });
  describe('loadInvoiceList', () => {
    it('sets the paid amount against the correct invoice when it is set', () => {
      const state = {
        paymentAmount: '12.34',
        applyPaymentToInvoiceId: '1234',
      };
      const action = {
        intent: LOAD_INVOICE_LIST,
        entries: [
          { id: '1234' },
          { id: '3214' },
        ],
      };

      const expected = {
        paymentAmount: '12.34',
        applyPaymentToInvoiceId: '1234',
        entries: [
          { id: '1234', paidAmount: '12.34' },
          { id: '3214', paidAmount: '' },
        ],
      };
      const actual = invoicePaymentDetailReducer(state, action);
      expect(actual).toEqual(expected);
    });

    it('does not set the paid amount when there is none set', () => {
      const state = {};
      const action = {
        intent: LOAD_INVOICE_LIST,
        entries: [
          { id: '1234' },
          { id: '3214' },
        ],
      };

      const expected = {
        entries: [
          { id: '1234', paidAmount: '' },
          { id: '3214', paidAmount: '' },
        ],
      };
      const actual = invoicePaymentDetailReducer(state, action);
      expect(actual).toEqual(expected);
    });
  });

  it('initializes blank payment amount when paymentAmount and invoiceID are empty', () => {
    const state = {
      paymentAmount: '',
      applyPaymentToInvoiceId: '',
    };
    const action = {
      intent: LOAD_INVOICE_LIST,
      entries: [
        { id: '1234' },
        { id: '3214' },
      ],
    };

    const expected = {
      paymentAmount: '',
      applyPaymentToInvoiceId: '',
      entries: [
        { id: '1234', paidAmount: '' },
        { id: '3214', paidAmount: '' },
      ],
    };
    const actual = invoicePaymentDetailReducer(state, action);
    expect(actual).toEqual(expected);
  });
});
