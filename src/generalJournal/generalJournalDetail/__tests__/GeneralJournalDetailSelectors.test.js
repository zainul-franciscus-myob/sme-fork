import {
  getDefaultTaxCodeId,
  getGeneralJournalForCreatePayload,
  getHeaderOptions,
  getIndexOfLastLine,
  getLineData,
  getTaxCalculatorPayload,
  getTotals,
} from '../GeneralJournalDetailSelectors';
import generalJournalDetail from './fixtures/generalJournalDetail';

describe('GeneralJournalDetailSelectors', () => {
  describe('getGeneralJournalForCreatePayload', () => {
    it('should exclude reference IDs from payloads when the value is unchanged', () => {
      const actual = {
        generalJournal: {
          referenceId: 'identical',
          originalReferenceId: 'identical',
        },
      };
      const expected = {};
      expect(getGeneralJournalForCreatePayload(actual)).toEqual(expected);
    });
  });

  describe('getHeaderOptions', () => {
    it('returns header options object', () => {
      expect(getHeaderOptions(generalJournalDetail)).toEqual({
        referenceId: 'JE0000002',
        date: '1533045600000',
        gstReportingMethod: 'purchase',
        isEndOfYearAdjustment: false,
        isTaxInclusive: false,
        description: 'Cry havoc',
      });
    });
  });

  describe('getTotals', () => {
    it('should return correct totals when tax is exclusive', () => {
      const totals = {
        totalDebit: '$210.10',
        totalCredit: '$210.66',
        totalTax: '-$0.05',
        totalOutOfBalance: '$0.61',
      };
      expect(getTotals(generalJournalDetail)).toEqual(totals);
    });

    it('should return the correct totals when tax is inclusive', () => {
      const detail = {
        ...generalJournalDetail,
        generalJournal: {
          ...generalJournalDetail.generalJournal,
          isTaxInclusive: true,
        },
      };

      const totals = {
        totalDebit: '$231.11',
        totalCredit: '$231.72',
        totalTax: '-$0.05',
        totalOutOfBalance: '$0.61',
      };
      expect(getTotals(detail)).toEqual(totals);
    });
  });

  describe('getDefaultTaxCodeId', () => {
    it('should return the default tax code id of an account given a line with an account id', () => {
      const { accounts } = generalJournalDetail.newLine;

      expect(getDefaultTaxCodeId({ accountId: '456', accounts })).toEqual('124');
    });
    it('should return an empty string if the accountId is undefined', () => {
      const { accounts } = generalJournalDetail.newLine;
      expect(getDefaultTaxCodeId({ accountId: undefined, accounts })).toEqual('');
    });
  });

  describe('getIndexOfLastLine', () => {
    it('should get the index of the last line in the given journal', () => {
      expect(getIndexOfLastLine(generalJournalDetail)).toEqual(3);
    });
  });

  describe('getLineData', () => {
    it('should get the formatted line data', () => {
      expect(getLineData(generalJournalDetail)).toEqual([
        {
          id: '123',
          accountId: '123',
          creditAmount: '',
          debitAmount: '110.00',
          creditInputAmount: '',
          debitInputAmount: '110.00',
          description: 'Cry havoc 1',
          isCreditDisabled: true,
          isDebitDisabled: false,
          selectedAccountIndex: 0,
          selectedTaxCodeIndex: 0,
          taxAmount: '11.00',
          taxCodeId: '123',
          accounts: [
            {
              id: '123',
              displayName: ' My Sales Account 1',
              accountType: 'Sales',
              taxCodeId: '123',
              displayId: '1-123',
            },
            {
              id: '456',
              displayName: ' My Assets Account 1',
              accountType: 'Assets',
              taxCodeId: '124',
              displayId: '2-124',
            },
          ],
          taxCodes: [{
            displayName: 'GST', description: 'Goods & Service Tax', id: '123', displayRate: '10%',
          }, {
            displayName: 'RTR', description: 'GST Free', id: '124', displayRate: '5%',
          }],
        }, {
          id: '124',
          accountId: '123',
          creditAmount: '',
          debitAmount: '100.10',
          creditInputAmount: '',
          debitInputAmount: '100.10',
          description: 'Cry havoc 2',
          isCreditDisabled: true,
          isDebitDisabled: false,
          selectedAccountIndex: 0,
          selectedTaxCodeIndex: 0,
          taxAmount: '10.01',
          taxCodeId: '123',
          accounts: [
            {
              id: '123',
              displayName: ' My Sales Account 1',
              accountType: 'Sales',
              taxCodeId: '123',
              displayId: '1-123',
            },
            {
              id: '456',
              displayName: ' My Assets Account 1',
              accountType: 'Assets',
              taxCodeId: '124',
              displayId: '2-124',
            },
          ],
          taxCodes: [{
            displayName: 'GST', id: '123', description: 'Goods & Service Tax', displayRate: '10%',
          }, {
            displayName: 'RTR', description: 'GST Free', id: '124', displayRate: '5%',
          }],
        }, {
          id: '125',
          accountId: '123',
          creditAmount: '110.33',
          debitAmount: '',
          creditInputAmount: '110.33',
          debitInputAmount: '',
          description: 'Cry havoc 3',
          isCreditDisabled: false,
          isDebitDisabled: true,
          selectedAccountIndex: 0,
          selectedTaxCodeIndex: 0,
          taxAmount: '11.03',
          taxCodeId: '123',
          accounts: [
            {
              id: '123',
              displayName: ' My Sales Account 1',
              accountType: 'Sales',
              taxCodeId: '123',
              displayId: '1-123',
            },
            {
              id: '456',
              displayName: ' My Assets Account 1',
              accountType: 'Assets',
              taxCodeId: '124',
              displayId: '2-124',
            },
          ],
          taxCodes: [{
            displayName: 'GST', id: '123', description: 'Goods & Service Tax', displayRate: '10%',
          }, {
            displayName: 'RTR', description: 'GST Free', id: '124', displayRate: '5%',
          }],
        }, {
          id: '126',
          accountId: '123',
          creditAmount: '100.33',
          debitAmount: '',
          creditInputAmount: '100.33',
          debitInputAmount: '',
          description: 'Cry havoc 4',
          isCreditDisabled: false,
          isDebitDisabled: true,
          selectedAccountIndex: 0,
          selectedTaxCodeIndex: 0,
          taxAmount: '10.03',
          taxCodeId: '123',
          accounts: [
            {
              id: '123',
              displayName: ' My Sales Account 1',
              accountType: 'Sales',
              taxCodeId: '123',
              displayId: '1-123',
            },
            {
              id: '456',
              displayName: ' My Assets Account 1',
              accountType: 'Assets',
              taxCodeId: '124',
              displayId: '2-124',
            },
          ],
          taxCodes: [{
            displayName: 'GST', id: '123', description: 'Goods & Service Tax', displayRate: '10%',
          }, {
            displayName: 'RTR', description: 'GST Free', id: '124', displayRate: '5%',
          }],
        }]);
    });
  });

  describe('getTaxCalculatorPayload', () => {
    it('returns payload for tax calculator with tax inclusive', () => {
      const state = {
        generalJournal: {
          isTaxInclusive: true,
          gstReportingMethod: 'sale',
          lines: [
            {
              debitAmount: '',
              debitInputAmount: '',
              creditAmount: '123',
              creditInputAmount: '133.00',
              taxAmount: '10',
            },
          ],
        },
      };

      const expected = {
        isTaxInclusive: true,
        gstReportingMethod: 'sale',
        lines: [
          {
            debitAmount: '',
            creditAmount: '133.00',
          },
        ],
      };

      expect(getTaxCalculatorPayload(state)).toEqual(expected);
    });

    it('returns payload for tax calculator with tax exclusive', () => {
      const state = {
        generalJournal: {
          isTaxInclusive: false,
          gstReportingMethod: 'sale',
          lines: [
            {
              debitAmount: '123',
              debitInputAmount: '123.00',
              creditAmount: '',
              creditInputAmount: '',
              taxAmount: '10',
            },
          ],
        },
      };

      const expected = {
        isTaxInclusive: false,
        gstReportingMethod: 'sale',
        lines: [
          {
            debitAmount: '123.00',
            creditAmount: '',
          },
        ],
      };

      expect(getTaxCalculatorPayload(state)).toEqual(expected);
    });
  });
});
