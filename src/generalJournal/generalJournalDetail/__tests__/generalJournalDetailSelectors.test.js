import {
  getCalculatedTotalsPayload,
  getGeneralJournalForCreatePayload,
  getGeneralJournalForUpdatePayload,
  getIsOutOfBalanced,
} from '../generalJournalDetailSelectors';

describe('generalJournalSelectors', () => {
  const generalJournalPayloadInput = {
    generalJournal: {
      referenceId: 'foo',
      selectedPayFromAccountId: 'bar',
      selectedPayToContactId: 'contactId',
      depositIntoAccounts: [1, 2, 3, 4],
      payFromContacts: [1, 2, 3, 4],
      date: '12-1-2017',
      description: 'txt',
      isReportable: 'true',
      isTaxInclusive: 'false',
      originalReferenceId: '1234',
      lines: [{ a: 'foo', accounts: [], taxCodes: [] }],
    },
  };

  describe('getGeneralJournalForUpdatePayload', () => {
    it('removes extraneous fields from the update payload', () => {
      const actual = getGeneralJournalForUpdatePayload(generalJournalPayloadInput);
      expect(actual.depositIntoAccounts).toBeUndefined();
      expect(actual.payFromContacts).toBeUndefined();
      expect(actual.originalReferenceId).toBeUndefined();
      expect(actual.lines[0].accounts).toBeUndefined();
      expect(actual.lines[0].taxCodes).toBeUndefined();
    });
  });

  it('getGeneralJournalForCreatePayload', () => {
    it('removes extraneous fields from the create payload', () => {
      const actual = getGeneralJournalForCreatePayload(generalJournalPayloadInput);
      expect(actual.depositIntoAccounts).toBeUndefined();
      expect(actual.payFromContacts).toBeUndefined();
      expect(actual.originalReferenceId).toBeUndefined();
      expect(actual.lines[0].accounts).toBeUndefined();
      expect(actual.lines[0].taxCodes).toBeUndefined();
    });
  });

  describe('getCalculatedTotalsPayload', () => {
    it('removes extraneous fields from the payload', () => {
      const taxCalcInput = {
        generalJournal: {
          isTaxInclusive: true,
          lines: [
            { accounts: [1, 2, 3], taxCodes: [5, 4, 3] },
            { accounts: [1, 2, 3], taxCodes: [5, 4, 3] },
          ],
        },
      };
      const actual = getCalculatedTotalsPayload(taxCalcInput);
      expect(actual.isTaxInclusive).not.toBeUndefined();
      expect(actual.lines[0].accounts).toBeUndefined();
      expect(actual.lines[0].taxCodes).toBeUndefined();
      expect(actual.lines[1].accounts).toBeUndefined();
      expect(actual.lines[1].taxCodes).toBeUndefined();
    });
  });

  describe('getIsOutOfBalance', () => {
    it('returns false if the balance is 0 otherwise returns true', () => {
      const outOfBalanceState = {
        totals: {
          totalOutOfBalance: '$0.00',
        },
      };

      const actual = getIsOutOfBalanced(outOfBalanceState);
      expect(actual).toBe(false);
    });
  });
});
