import {
  getAccounts,
  getHeaderOptions,
  getIndexOfLastLine,
  getLineData,
  getTotals,
} from '../GeneralJournalDetailSelectors';
import generalJournalDetail from './fixtures/generalJournalDetail';

describe('GeneralJournalDetailSelectors', () => {
  describe('getHeaderOptions', () => {
    it('returns header options object', () => {
      expect(getHeaderOptions(generalJournalDetail)).toEqual({
        referenceId: 'JE0000002',
        date: '1533045600000',
        gstReportingMethod: 'purchase',
        isEndOfYearAdjustment: false,
        isTaxInclusive: true,
        description: 'Cry havoc',
      });
    });
  });

  describe('getTotals', () => {
    it('should return correct totals', () => {
      const totals = {
        totalDebit: '$210.10',
        totalCredit: '$210.66',
        totalTax: '$42.08',
        totalOutOfBalance: '-$0.56',
      };
      expect(getTotals(generalJournalDetail)).toEqual(totals);
    });
  });

  describe('getAccounts', () => {
    it('should return a subset of the account object', () => {
      expect(getAccounts(generalJournalDetail)).toEqual([
        {
          id: '123',
          displayName: ' My Sales Account 1',
          accountType: 'Sales',
        },
        {
          id: '456',
          displayName: ' My Assets Account 1',
          accountType: 'Assets',
        },
      ]);
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
          accountId: '123',
          debitDisplayAmount: '110.00',
          creditDisplayAmount: '',
          description: 'Cry havoc 1',
          taxCodeId: '123',
          displayTaxAmount: '11.00',
          selectedAccountIndex: 0,
          selectedTaxCodeIndex: 0,
          taxCodes: [
            {
              id: '123',
              displayName: 'GST',
              rate: '10%',
            },
            {
              id: '124',
              displayName: 'RTR',
              rate: '5%',
            },
          ],
          isCreditDisabled: true,
          isDebitDisabled: false,
        },
        {
          accountId: '123',
          debitDisplayAmount: '100.10',
          creditDisplayAmount: '',
          description: 'Cry havoc 2',
          taxCodeId: '123',
          displayTaxAmount: '10.01',
          selectedAccountIndex: 0,
          selectedTaxCodeIndex: 0,
          taxCodes: [
            {
              id: '123',
              displayName: 'GST',
              rate: '10%',
            },
            {
              id: '124',
              displayName: 'RTR',
              rate: '5%',
            },
          ],
          isCreditDisabled: true,
          isDebitDisabled: false,
        },
        {
          accountId: '123',
          debitDisplayAmount: '',
          creditDisplayAmount: '110.33',
          description: 'Cry havoc 3',
          taxCodeId: '123',
          displayTaxAmount: '11.03',
          selectedAccountIndex: 0,
          selectedTaxCodeIndex: 0,
          taxCodes: [
            {
              id: '123',
              displayName: 'GST',
              rate: '10%',
            },
            {
              id: '124',
              displayName: 'RTR',
              rate: '5%',
            },
          ],
          isCreditDisabled: false,
          isDebitDisabled: true,
        },
        {
          accountId: '123',
          debitDisplayAmount: '',
          creditDisplayAmount: '100.33',
          description: 'Cry havoc 4',
          taxCodeId: '123',
          displayTaxAmount: '10.03',
          selectedAccountIndex: 0,
          selectedTaxCodeIndex: 0,
          taxCodes: [
            {
              id: '123',
              displayName: 'GST',
              rate: '10%',
            },
            {
              id: '124',
              displayName: 'RTR',
              rate: '5%',
            },
          ],
          isCreditDisabled: false,
          isDebitDisabled: true,
        },
      ]);
    });
  });
});
