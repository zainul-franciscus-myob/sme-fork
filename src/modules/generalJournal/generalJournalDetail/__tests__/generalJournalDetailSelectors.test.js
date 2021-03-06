import {
  CREATE_GENERAL_JOURNAL,
  LOAD_GENERAL_JOURNAL_DETAIL,
  LOAD_NEW_GENERAL_JOURNAL,
  UPDATE_GENERAL_JOURNAL,
} from '../../GeneralJournalIntents';
import {
  getIsActionsDisabled,
  getIsBeforeStartOfFinancialYear,
  getIsOutOfBalanced,
  getLoadGeneralJournalRequest,
  getSaveGeneralJournalRequest,
  getUniqueSelectedJobIds,
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

  describe('getSaveGeneralJournalRequest', () => {
    it('gets create request', () => {
      const state = {
        ...generalJournalPayloadInput,
        generalJournalId: 'new',
        businessId: '🦵🏾',
      };
      const actual = getSaveGeneralJournalRequest(state);
      expect(actual).toEqual({
        intent: CREATE_GENERAL_JOURNAL,
        content: {
          date: '12-1-2017',
          description: 'txt',
          isReportable: 'true',
          isTaxInclusive: 'false',
          lines: [{ a: 'foo' }],
          referenceId: 'foo',
          selectedPayFromAccountId: 'bar',
          selectedPayToContactId: 'contactId',
        },
        urlParams: {
          businessId: '🦵🏾',
        },
      });
    });

    it('gets update request', () => {
      const state = {
        ...generalJournalPayloadInput,
        generalJournalId: '123',
        businessId: '🦵🏾',
      };
      const actual = getSaveGeneralJournalRequest(state);
      expect(actual).toEqual({
        intent: UPDATE_GENERAL_JOURNAL,
        content: {
          date: '12-1-2017',
          description: 'txt',
          isReportable: 'true',
          isTaxInclusive: 'false',
          lines: [{ a: 'foo' }],
          referenceId: 'foo',
          selectedPayFromAccountId: 'bar',
          selectedPayToContactId: 'contactId',
          depositIntoAccounts: [1, 2, 3, 4],
          originalReferenceId: '1234',
          payFromContacts: [1, 2, 3, 4],
        },
        urlParams: {
          businessId: '🦵🏾',
          generalJournalId: '123',
        },
      });
    });
  });

  describe('getLoadGeneralJournalRequest', () => {
    it('gets load new request', () => {
      const state = {
        ...generalJournalPayloadInput,
        generalJournalId: 'new',
        businessId: '🦵🏾',
      };
      const actual = getLoadGeneralJournalRequest(state);
      expect(actual).toEqual({
        intent: LOAD_NEW_GENERAL_JOURNAL,
        urlParams: {
          businessId: '🦵🏾',
        },
      });
    });

    it('gets load existing request', () => {
      const state = {
        ...generalJournalPayloadInput,
        generalJournalId: '123',
        businessId: '🦵🏾',
      };
      const actual = getLoadGeneralJournalRequest(state);
      expect(actual).toEqual({
        intent: LOAD_GENERAL_JOURNAL_DETAIL,
        urlParams: {
          businessId: '🦵🏾',
          generalJournalId: '123',
        },
      });
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

  describe('getIsActionsDisabled', () => {
    it('returns true when isSubmitting ', () => {
      const state = {
        isSubmitting: true,
        isCreatedAccountLoading: false,
      };

      const actual = getIsActionsDisabled(state);
      expect(actual).toBe(true);
    });

    it('returns true when newly created account is loading', () => {
      const state = {
        isSubmitting: false,
        isCreatedAccountLoading: true,
      };

      const actual = getIsActionsDisabled(state);
      expect(actual).toBe(true);
    });

    it('returns false if NOT isSubmitting AND newly created account is NOT loading', () => {
      const state = {
        isSubmitting: false,
        isCreatedAccountLoading: false,
      };

      const actual = getIsActionsDisabled(state);
      expect(actual).toBe(false);
    });
  });

  describe('getIsBeforeStartOfFinancialYear', () => {
    it.each([
      ['2014-07-01', '2010-01-01', true],
      ['2014-07-01', '2014-06-30', true],
      ['2014-07-01', '2014-07-01', false],
      ['2014-07-01', '2014-07-02', false],
      ['2014-07-01', '2015-01-01', false],
    ])(
      'when start of financial year date is %s and issue date is %s, should return %s',
      (startOfFinancialYearDate, date, expected) => {
        const state = {
          generalJournal: { date },
          startOfFinancialYearDate,
        };

        const actual = getIsBeforeStartOfFinancialYear(state);

        expect(actual).toEqual(expected);
      }
    );
  });

  describe('getUniqueSelectedJobIds', () => {
    it('returns a list of unique selected job ids excluding empty ids', () => {
      const state = {
        generalJournal: {
          lines: [
            { jobId: '1' },
            { jobId: '2' },
            { jobId: '' },
            { jobId: '1' },
          ],
        },
      };

      const actual = getUniqueSelectedJobIds(state);

      expect(actual).toEqual(['1', '2']);
    });
  });
});
