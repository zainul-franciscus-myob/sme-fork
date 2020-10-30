import Decimal from 'decimal.js';

import {
  GET_TAX_CALCULATIONS,
  LOAD_ACCOUNT_AFTER_CREATE,
} from '../../GeneralJournalIntents';
import generalJournalReducer from '../generalJournalDetailReducer';

describe('generalJournalDetailReducer', () => {
  describe('getTaxCalculations', () => {
    it('should update lines and totals', () => {
      const taxCalculations = {
        lines: [
          {
            taxExclusiveAmount: Decimal(50),
            taxAmount: Decimal(5),
            amount: Decimal(55),
            isCredit: true,
          },
          {
            taxExclusiveAmount: Decimal(100),
            taxAmount: Decimal(10),
            amount: Decimal(110),
            isCredit: false,
          },
        ],
        totals: {
          totalCredit: Decimal(55),
          totalDebit: Decimal(110),
          totalOutOfBalance: Decimal(55),
          totalTax: Decimal(5),
        },
      };
      const state = {
        generalJournal: {
          gstReportingMethod: 'purchase',
          isTaxInclusive: true,
          lines: [
            {
              accountId: '1',
              debitAmount: '',
              creditAmount: '40',
              quantity: '1',
              description: '',
              taxCodeId: '1',
              taxAmount: '4',
              lineTypeId: '37',
              displayCreditAmount: '40',
              displayDebitAmount: '',
            },
            {
              accountId: '2',
              debitAmount: '90',
              creditAmount: '',
              quantity: '1',
              description: '',
              taxCodeId: '1',
              taxAmount: '49',
              lineTypeId: '37',
              displayCreditAmount: '90',
              displayDebitAmount: '',
            },
          ],
        },
      };

      const action = {
        intent: GET_TAX_CALCULATIONS,
        taxCalculations,
      };

      const actual = generalJournalReducer(state, action);

      const expected = {
        generalJournal: {
          gstReportingMethod: 'purchase',
          isTaxInclusive: true,
          lines: [
            {
              accountId: '1',
              creditAmount: '55',
              debitAmount: '',
              description: '',
              displayCreditAmount: '55.00',
              displayDebitAmount: '',
              lineTypeId: '37',
              quantity: '1',
              taxAmount: '4',
              taxCodeId: '1',
            },
            {
              accountId: '2',
              creditAmount: '',
              debitAmount: '110',
              description: '',
              displayCreditAmount: '90',
              displayDebitAmount: '110.00',
              lineTypeId: '37',
              quantity: '1',
              taxAmount: '49',
              taxCodeId: '1',
            },
          ],
        },
        isPageEdited: true,
        totals: {
          totalCredit: '$55.00',
          totalDebit: '$110.00',
          totalOutOfBalance: '$55.00',
          totalTax: '$5.00',
        },
      };
      expect(actual).toEqual(expected);
    });

    it('should set totals tax to negative, if gstReportingMethod is sale', () => {
      const taxCalculations = {
        lines: [
          {
            taxExclusiveAmount: Decimal(50),
            taxAmount: Decimal(5),
            amount: Decimal(55),
            isCredit: true,
          },
        ],
        totals: {
          totalCredit: Decimal(55),
          totalDebit: Decimal(110),
          totalOutOfBalance: Decimal(55),
          totalTax: Decimal(5),
        },
      };
      const state = {
        generalJournal: {
          gstReportingMethod: 'sale',
          isTaxInclusive: true,
          lines: [
            {
              accountId: '1',
              debitAmount: '',
              creditAmount: '40',
              quantity: '1',
              description: '',
              taxCodeId: '1',
              taxAmount: '4',
              lineTypeId: '37',
              displayCreditAmount: '40',
              displayDebitAmount: '',
            },
          ],
        },
      };

      const action = {
        intent: GET_TAX_CALCULATIONS,
        taxCalculations,
      };

      const actual = generalJournalReducer(state, action);

      expect(actual.totals.totalTax).toEqual('-$5.00');
    });
  });

  describe('loadAccountAfterCreate', () => {
    it('adds newly created account into the accounts list', () => {
      const state = {
        accountOptions: [
          {
            id: '1',
          },
        ],
      };

      const createdAccount = {
        id: '123',
        displayName: 'My quick account',
        accountType: 'Asset',
        taxCodeId: '123',
        displayId: '1-9944',
      };

      const action = {
        intent: LOAD_ACCOUNT_AFTER_CREATE,
        ...createdAccount,
      };

      const actual = generalJournalReducer(state, action);

      const expected = {
        accountOptions: [
          {
            id: '123',
            displayName: 'My quick account',
            accountType: 'Asset',
            taxCodeId: '123',
            displayId: '1-9944',
          },
          {
            id: '1',
          },
        ],
        isPageEdited: true,
      };

      expect(actual).toEqual(expected);
    });
  });
});
