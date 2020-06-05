import { getSaveAmountDueWarningModalBody, shouldShowSaveAmountDueWarningModal } from '../invoiceSaveSelectors';
import InvoiceLineType from '../../types/InvoiceLineType';

describe('InvoiceSaveSelectors', () => {
  describe('shouldShowSaveAmountDueWarningModal', () => {
    it('returns true if editing a closed invoice', () => {
      const state = {
        invoice: {
          status: 'Closed',
          amountPaid: '10',
          lines: [
            { type: InvoiceLineType.SERVICE, taxExclusiveAmount: '9', taxAmount: '1' },
          ],
          taxExclusiveFreightAmount: '0',
          freightTaxAmount: '0',
        },
        originalAmountDue: '10',
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
          lines: [
            { type: InvoiceLineType.SERVICE, taxExclusiveAmount: '4', taxAmount: '1' },
          ],
          taxExclusiveFreightAmount: '0',
          freightTaxAmount: '0',
        },
        originalAmountDue: '10',
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
          lines: [
            { type: InvoiceLineType.SERVICE, taxExclusiveAmount: '4', taxAmount: '1' },
          ],
          taxExclusiveFreightAmount: '0',
          freightTaxAmount: '0',
        },
        originalAmountDue: '0',
        isPageEdited: true,
      };

      const actual = shouldShowSaveAmountDueWarningModal(state);
      expect(actual).toBeTruthy();
    });
  });

  describe('getSaveAmountDueWarningModalBody', () => {
    describe('editing a closed invoice', () => {
      it('returns message about payment already recorded against invoice if the amount due remains 0', () => {
        const state = {
          invoice: {
            status: 'Closed',
            amountPaid: '10',
            lines: [
              { type: InvoiceLineType.SERVICE, taxExclusiveAmount: '9', taxAmount: '1' },
            ],
            taxExclusiveFreightAmount: '0',
            freightTaxAmount: '0',
          },
          originalAmountDue: '0',
          isPageEdited: true,
        };

        const actual = getSaveAmountDueWarningModalBody(state);
        const expected = 'There is a payment recorded against this invoice. Are you sure you want to save the changes?';

        expect(actual).toEqual(expected);
      });

      it('returns message about change in status to open if the amount due is changed to positive', () => {
        const state = {
          invoice: {
            status: 'Closed',
            amountPaid: '10',
            lines: [
              { type: InvoiceLineType.SERVICE, taxExclusiveAmount: '14', taxAmount: '1' },
            ],
            taxExclusiveFreightAmount: '0',
            freightTaxAmount: '0',
          },
          originalAmountDue: '0',
          isPageEdited: true,
        };

        const actual = getSaveAmountDueWarningModalBody(state);
        const expected = 'If you save, you\'ll be changing the invoice status to open as there is now a balance due.';

        expect(actual).toEqual(expected);
      });

      it('returns message about customer credit created if the amount due is changed to negative', () => {
        const state = {
          invoice: {
            status: 'Closed',
            amountPaid: '10',
            lines: [
              { type: InvoiceLineType.SERVICE, taxExclusiveAmount: '4', taxAmount: '1' },
            ],
            taxExclusiveFreightAmount: '0',
            freightTaxAmount: '0',
          },
          originalAmountDue: '0',
          isPageEdited: true,
        };

        const actual = getSaveAmountDueWarningModalBody(state);
        const expected = 'If you save, you\'ll be creating a customer credit as the balance due is negative.';

        expect(actual).toEqual(expected);
      });
    });

    describe('editing an open invoice', () => {
      it('returns message about customer credit created if amount due is changed from negative to positive', () => {
        const state = {
          invoiceId: '1',
          invoice: {
            status: 'Open',
            amountPaid: '10',
            lines: [
              { type: InvoiceLineType.SERVICE, taxExclusiveAmount: '4', taxAmount: '1' },
            ],
            taxExclusiveFreightAmount: '0',
            freightTaxAmount: '0',
          },
          originalAmountDue: '10',
          isPageEdited: true,
        };

        const actual = getSaveAmountDueWarningModalBody(state);
        const expected = 'If you save, you\'ll be creating a customer credit as the balance due is negative.';

        expect(actual).toEqual(expected);
      });
    });

    describe('creating a new invoice', () => {
      it('returns message about customer credit created if amount due is negative', () => {
        const state = {
          invoiceId: 'new',
          invoice: {
            status: 'Open',
            amountPaid: '10',
            lines: [
              { type: InvoiceLineType.SERVICE, taxExclusiveAmount: '4', taxAmount: '1' },
            ],
            taxExclusiveFreightAmount: '0',
            freightTaxAmount: '0',
          },
          originalAmountDue: '0',
          isPageEdited: true,
        };

        const actual = getSaveAmountDueWarningModalBody(state);
        const expected = 'If you save, you\'ll be creating a customer credit as the balance due is negative.';

        expect(actual).toEqual(expected);
      });
    });
  });
});
