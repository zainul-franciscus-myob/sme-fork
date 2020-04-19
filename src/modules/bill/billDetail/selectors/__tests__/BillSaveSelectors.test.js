import { getSaveAmountDueWarningModalBody, shouldShowSaveAmountDueWarningModal } from '../BillSaveSelectors';

describe('BillSaveSelectors', () => {
  describe('shouldShowSaveAmountDueWarningModal', () => {
    it('returns true if editing a closed bill', () => {
      const state = {
        bill: {
          status: 'Closed',
        },
        totals: {
          amountDue: '10',
          originalAmountDue: '10',
        },
        isPageEdited: true,
      };

      const actual = shouldShowSaveAmountDueWarningModal(state);
      expect(actual).toBeTruthy();
    });

    it('returns true if editing an open bill and the amount due was changed from positive to negative', () => {
      const state = {
        bill: {
          status: 'Open',
        },
        totals: {
          amountDue: '-10',
          originalAmountDue: '8.5',
        },
        isPageEdited: true,
      };

      const actual = shouldShowSaveAmountDueWarningModal(state);
      expect(actual).toBeTruthy();
    });

    it('returns true if creating a new bill and amount due is negative', () => {
      const state = {
        billId: 'new',
        bill: {
          status: 'Open',
        },
        totals: {
          amountDue: '-10',
          originalAmountDue: '0',
        },
        isPageEdited: true,
      };

      const actual = shouldShowSaveAmountDueWarningModal(state);
      expect(actual).toBeTruthy();
    });
  });

  describe('getSaveAmountDueWarningModalBody', () => {
    it('returns message about payment recorded against bill if editing a closed bill but amount due remains 0', () => {
      const state = {
        bill: {
          status: 'Closed',
        },
        totals: {
          amountDue: '0',
          originalAmountDue: '0',
        },
        isPageEdited: true,
      };

      const actual = getSaveAmountDueWarningModalBody(state);
      const expected = 'There is a payment recorded against this bill. Are you sure you want to save the changes?';

      expect(actual).toEqual(expected);
    });

    it('returns message about change in status to open if editing a closed bill and amount due has changed', () => {
      const state = {
        bill: {
          status: 'Closed',
        },
        totals: {
          amountDue: '10',
          originalAmountDue: '0',
        },
        isPageEdited: true,
      };

      const actual = getSaveAmountDueWarningModalBody(state);
      const expected = 'If you save, you\'ll be changing the bill status to open as there is now a balance due.';

      expect(actual).toEqual(expected);
    });

    it('returns message about supplier debit created if create a new bill and amount due is negative', () => {
      const state = {
        billId: 'new',
        bill: {
          status: 'Open',
        },
        totals: {
          amountDue: '-10',
          originalAmountDue: '0',
        },
        isPageEdited: true,
      };

      const actual = getSaveAmountDueWarningModalBody(state);
      const expected = 'If you save, you\'ll be creating a supplier debit as the balance due is negative.';

      expect(actual).toEqual(expected);
    });

    it('returns message about supplier debit created if editing an open bill and amount due is changed from negative to positive', () => {
      const state = {
        billId: '1',
        bill: {
          status: 'Open',
        },
        totals: {
          amountDue: '-10',
          originalAmountDue: '10',
        },
        isPageEdited: true,
      };

      const actual = getSaveAmountDueWarningModalBody(state);
      const expected = 'If you save, you\'ll be creating a supplier debit as the balance due is negative.';

      expect(actual).toEqual(expected);
    });
  });
});
