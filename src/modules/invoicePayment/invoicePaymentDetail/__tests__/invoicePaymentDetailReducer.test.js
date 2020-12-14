import {
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

      expect(invoicePaymentDetailReducer(state, action)).toEqual(expected);
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
          { id: '1234', balanceDue: '50.00' },
          { id: '3214', balanceDue: '25.00' },
        ],
      };

      const expected = {
        paymentAmount: '12.34',
        applyPaymentToInvoiceId: '1234',
        entries: [
          { id: '1234', paidAmount: '12.34', balanceDue: '50.00' },
          { id: '3214', paidAmount: '25.00', balanceDue: '25.00' },
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
          { id: '1234', balanceDue: '' },
          { id: '3214', balanceDue: '' },
        ],
      };

      const expected = {
        entries: [
          { id: '1234', paidAmount: '', balanceDue: '' },
          { id: '3214', paidAmount: '', balanceDue: '' },
        ],
      };
      const actual = invoicePaymentDetailReducer(state, action);
      expect(actual).toEqual(expected);
    });
  });

  it('initializes paidAmount with balanceDue when paymentAmount and invoiceID are empty', () => {
    const state = {
      paymentAmount: '',
      applyPaymentToInvoiceId: '',
    };
    const action = {
      intent: LOAD_INVOICE_LIST,
      entries: [
        { id: '1234', balanceDue: '50' },
        { id: '3214', balanceDue: '' },
      ],
    };

    const expected = {
      paymentAmount: '',
      applyPaymentToInvoiceId: '',
      entries: [
        { id: '1234', paidAmount: '50', balanceDue: '50' },
        { id: '3214', paidAmount: '', balanceDue: '' },
      ],
    };
    const actual = invoicePaymentDetailReducer(state, action);
    expect(actual).toEqual(expected);
  });
});
