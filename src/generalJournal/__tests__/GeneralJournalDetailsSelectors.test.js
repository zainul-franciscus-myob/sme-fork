import {
  calculateTaxForLine,
  getAccounts,
  getHeaderOptions,
  getIndexOfLastLine,
  getLineData,
  getTotals,
} from '../GeneralJournalDetailSelectors';
import generalJournalDetail from './fixtures/generalJournalDetail';

describe('GeneralJournalDetailSelectors', () => {
  describe('caculateTaxForLine', () => {
    it('should calculate the tax amount for a debit line', () => {
      const line = generalJournalDetail.generalJournal.lines[0];
      const { taxCodes } = generalJournalDetail;
      expect(calculateTaxForLine(line, taxCodes).toFixed(2)).toEqual('11.00');
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
        totalTax: '$42.07',
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
        totalDebit: '$210.10',
        totalCredit: '$210.66',
        totalTax: '$42.07',
        totalOutOfBalance: '$0.61',
      };
      expect(getTotals(detail)).toEqual(totals);
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
          creditAmount: '',
          debitAmount: '110.00',
          description: 'Cry havoc 1',
          displayCreditAmount: '',
          displayDebitAmount: '110.00',
          isCreditDisabled: true,
          isDebitDisabled: false,
          selectedAccountIndex: 0,
          selectedTaxCodeIndex: 0,
          taxAmount: '11.00',
          taxCodeId: '123',
          taxCodes: [{ displayName: 'GST', id: '123', rate: '10%' }, { displayName: 'RTR', id: '124', rate: '5%' }],
        }, {
          accountId: '123',
          creditAmount: '',
          debitAmount: '100.10',
          description: 'Cry havoc 2',
          displayCreditAmount: '',
          displayDebitAmount: '100.10',
          isCreditDisabled: true,
          isDebitDisabled: false,
          selectedAccountIndex: 0,
          selectedTaxCodeIndex: 0,
          taxAmount: '10.01',
          taxCodeId: '123',
          taxCodes: [{ displayName: 'GST', id: '123', rate: '10%' }, { displayName: 'RTR', id: '124', rate: '5%' }],
        }, {
          accountId: '123',
          creditAmount: '110.33',
          debitAmount: '',
          description: 'Cry havoc 3',
          displayCreditAmount: '110.33',
          displayDebitAmount: '',
          isCreditDisabled: false,
          isDebitDisabled: true,
          selectedAccountIndex: 0,
          selectedTaxCodeIndex: 0,
          taxAmount: '11.03',
          taxCodeId: '123',
          taxCodes: [{ displayName: 'GST', id: '123', rate: '10%' }, { displayName: 'RTR', id: '124', rate: '5%' }],
        }, {
          accountId: '123',
          creditAmount: '100.33',
          debitAmount: '',
          description: 'Cry havoc 4',
          displayCreditAmount: '100.33',
          displayDebitAmount: '',
          isCreditDisabled: false,
          isDebitDisabled: true,
          selectedAccountIndex: 0,
          selectedTaxCodeIndex: 0,
          taxAmount: '10.03',
          taxCodeId: '123',
          taxCodes: [{ displayName: 'GST', id: '123', rate: '10%' }, { displayName: 'RTR', id: '124', rate: '5%' }],
        }]);
    });
  });
});
