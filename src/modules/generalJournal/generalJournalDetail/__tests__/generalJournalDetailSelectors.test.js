import {
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
      lines: [{ a: 'foo' }],
    },
  };

  describe('getGeneralJournalForUpdatePayload', () => {
    it('removes extraneous fields from the update payload', () => {
      const actual = getGeneralJournalForUpdatePayload(generalJournalPayloadInput);
      expect(actual.depositIntoAccounts).toBeUndefined();
      expect(actual.payFromContacts).toBeUndefined();
      expect(actual.originalReferenceId).toBeUndefined();
    });
  });

  describe('getGeneralJournalForCreatePayload', () => {
    it('removes extraneous fields from the create payload', () => {
      const actual = getGeneralJournalForCreatePayload(generalJournalPayloadInput);
      expect(actual.depositIntoAccounts).toBeUndefined();
      expect(actual.payFromContacts).toBeUndefined();
      expect(actual.originalReferenceId).toBeUndefined();
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
