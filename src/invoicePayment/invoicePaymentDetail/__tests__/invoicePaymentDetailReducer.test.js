import { FORMAT_AMOUNT_INPUT, UPDATE_INVOICE_PAYMENT_ENTRIES } from '../../InvoicePaymentIntent';
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
});
