import { getSaveAmountDueWarningModalBody, shouldShowSaveAmountDueWarningModal } from '../invoiceSaveSelectors';

describe('InvoiceSaveSelectors', () => {
  describe('shouldShowSaveAmountDueWarningModal', () => {
    it('returns true if editing a closed invoice', () => {
      const state = {
        invoice: {
          status: 'Closed',
          amountPaid: '10',
        },
        totals: {
          totalAmount: '20',
          originalAmountDue: '10',
        },
        isPageEdited: true,
      };

      const actual = shouldShowSaveAmountDueWarningModal(state);
      expect(actual).toBeTruthy();
    });

    it('returns true if editing an open invoice and the amount due was changed from positive to negative', () => {
      const state = {
        invoice: {
          status: 'Open',
          amountPaid: '10',
        },
        totals: {
          totalAmount: '5',
          originalAmountDue: '10',
        },
        isPageEdited: true,
      };

      const actual = shouldShowSaveAmountDueWarningModal(state);
      expect(actual).toBeTruthy();
    });

    it('returns true if creating a new invoice and amount due is negative', () => {
      const state = {
        invoiceId: 'new',
        invoice: {
          status: 'Open',
          amountPaid: '10',
        },
        totals: {
          totalAmount: '5',
          originalAmountDue: '0',
        },
        isPageEdited: true,
      };

      const actual = shouldShowSaveAmountDueWarningModal(state);
      expect(actual).toBeTruthy();
    });
  });

  describe('getSaveAmountDueWarningModalBody', () => {
    it('returns message about payment recorded against invoice if editing a closed invoice but amount due remains 0', () => {
      const state = {
        invoice: {
          status: 'Closed',
          amountPaid: '10',
        },
        totals: {
          totalAmount: '10',
          originalAmountDue: '0',
        },
        isPageEdited: true,
      };

      const actual = getSaveAmountDueWarningModalBody(state);
      const expected = 'There is a payment recorded against this invoice. Are you sure you want to save the changes?';

      expect(actual).toEqual(expected);
    });

    it('returns message about change in status to open if editing a closed invoice and amount due has changed', () => {
      const state = {
        invoice: {
          status: 'Closed',
          amountPaid: '10',
        },
        totals: {
          totalAmount: '15',
          originalAmountDue: '0',
        },
        isPageEdited: true,
      };

      const actual = getSaveAmountDueWarningModalBody(state);
      const expected = 'If you save, you\'ll be changing the invoice status to open as there is now a balance due.';

      expect(actual).toEqual(expected);
    });

    it('returns message about customer credit created if create a new invoice and amount due is negative', () => {
      const state = {
        invoiceId: 'new',
        invoice: {
          status: 'Open',
          amountPaid: '10',
        },
        totals: {
          totalAmount: '5',
          originalAmountDue: '0',
        },
        isPageEdited: true,
      };

      const actual = getSaveAmountDueWarningModalBody(state);
      const expected = 'If you save, you\'ll be creating a customer credit as the balance due is negative.';

      expect(actual).toEqual(expected);
    });

    it('returns message about customer credit created if editing an open invoice and amount due is changed from negative to positive', () => {
      const state = {
        invoiceId: '1',
        invoice: {
          status: 'Open',
          amountPaid: '10',
        },
        totals: {
          totalAmount: '5',
          originalAmountDue: '10',
        },
        isPageEdited: true,
      };

      const actual = getSaveAmountDueWarningModalBody(state);
      const expected = 'If you save, you\'ll be creating a customer credit as the balance due is negative.';

      expect(actual).toEqual(expected);
    });
  });
});
