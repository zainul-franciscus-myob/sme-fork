import { getSaveAmountDueWarningModalBody, shouldShowSaveAmountDueWarningModal } from '../BillSaveSelectors';
import BillLineType from '../../types/BillLineType';

describe('BillSaveSelectors', () => {
  const baseState = {
    bill: {
      lines: [],
      taxExclusiveFreightAmount: '0',
      freightTaxAmount: '0',
    },
    originalAmountDue: '0',
    isPageEdited: true,
  };

  describe('shouldShowSaveAmountDueWarningModal', () => {
    it('returns true if editing a closed bill', () => {
      const state = {
        ...baseState,
        bill: {
          ...baseState.bill,
          status: 'Closed',
        },
        originalAmountDue: '10',
      };

      const actual = shouldShowSaveAmountDueWarningModal(state);
      expect(actual).toBeTruthy();
    });

    it('returns true if editing an open bill and the amount due was changed from positive to negative', () => {
      const state = {
        ...baseState,
        bill: {
          ...baseState.bill,
          status: 'Open',
          amountPaid: '10',
        },
        originalAmountDue: '8.5',
      };

      const actual = shouldShowSaveAmountDueWarningModal(state);
      expect(actual).toBeTruthy();
    });

    it('returns true if creating a new bill and amount due is negative', () => {
      const state = {
        ...baseState,
        billId: 'new',
        bill: {
          ...baseState.bill,
          status: 'Open',
          amountPaid: '1',
        },
      };

      const actual = shouldShowSaveAmountDueWarningModal(state);
      expect(actual).toBeTruthy();
    });
  });

  describe('getSaveAmountDueWarningModalBody', () => {
    describe('editing a closed bill', () => {
      it('returns message about payment already recorded against bill if amount due remains 0', () => {
        const state = {
          ...baseState,
          bill: {
            ...baseState.bill,
            status: 'Closed',
            amountPaid: '0',
          },
          originalAmountDue: '0',
        };

        const actual = getSaveAmountDueWarningModalBody(state);
        const expected = 'There is a payment recorded against this bill. Are you sure you want to save the changes?';

        expect(actual).toEqual(expected);
      });

      it('returns message about change in status to open if amount due is changed to positive', () => {
        const state = {
          ...baseState,
          bill: {
            ...baseState.bill,
            status: 'Closed',
            lines: [
              { type: BillLineType.SERVICE, taxExclusiveAmount: '0.99', taxAmount: '0.01' },
            ],
            amountPaid: '0.5',
          },
        };

        const actual = getSaveAmountDueWarningModalBody(state);
        const expected = 'If you save, you\'ll be changing the bill status to open as there is now a balance due.';

        expect(actual).toEqual(expected);
      });

      it('returns message about supplier debit created if amount due is changed to negative', () => {
        const state = {
          ...baseState,
          bill: {
            ...baseState.bill,
            status: 'Closed',
            lines: [
              { type: BillLineType.SERVICE, taxExclusiveAmount: '0.99', taxAmount: '0.01' },
            ],
            amountPaid: '2',
          },
        };

        const actual = getSaveAmountDueWarningModalBody(state);
        const expected = 'If you save, you\'ll be creating a supplier debit as the balance due is negative.';

        expect(actual).toEqual(expected);
      });
    });

    describe('editing an open bill', () => {
      it('returns message about supplier debit created if amount due is changed from negative to positive', () => {
        const state = {
          ...baseState,
          billId: '1',
          bill: {
            ...baseState.bill,
            status: 'Open',
            amountPaid: '11',
          },
          originalAmountDue: '10',
        };

        const actual = getSaveAmountDueWarningModalBody(state);
        const expected = 'If you save, you\'ll be creating a supplier debit as the balance due is negative.';

        expect(actual).toEqual(expected);
      });
    });

    describe('creating a new bill', () => {
      it('returns message about supplier debit created if amount due is negative', () => {
        const state = {
          ...baseState,
          billId: 'new',
          bill: {
            ...baseState.bill,
            status: 'Open',
            amountPaid: '10',
          },
        };

        const actual = getSaveAmountDueWarningModalBody(state);
        const expected = 'If you save, you\'ll be creating a supplier debit as the balance due is negative.';

        expect(actual).toEqual(expected);
      });
    });
  });
});
