import {
  getBillPaymentOptions,
  getCreateBillPaymentPayload,
  getDefaultAccountId,
  getIsBeforeStartOfFinancialYear,
  getIsElectronicPayment,
  getShouldShowSupplierPopover,
} from '../BillRecordPaymentSelectors';
import BillLineType from '../../types/BillLineType';

describe('BillInTrayDocumentSelectors', () => {
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
          recordBillPayment: {
            paymentDate: date,
            startOfFinancialYearDate,
          },
        };

        const actual = getIsBeforeStartOfFinancialYear(state);

        expect(actual).toEqual(expected);
      }
    );
  });

  describe('getIsElectronicPayment', () => {
    it('should be true when selected account is electronics clearing account', () => {
      const state = {
        recordBillPayment: {
          accountId: '4',
          electronicClearingAccountId: '4',
        },
      };

      const isElectronicPayment = getIsElectronicPayment(state);

      expect(isElectronicPayment).toEqual(true);
    });

    it('should be false when selected account is not electronics clearing account', () => {
      const state = {
        recordBillPayment: {
          accountId: '1',
          electronicClearingAccountId: '4',
        },
      };

      const isElectronicPayment = getIsElectronicPayment(state);

      expect(isElectronicPayment).toEqual(false);
    });
  });

  describe('getShouldShowSupplierPopover', () => {
    it('shows supplier popover when supplier selected and electronic payment checked', () => {
      const actual = getShouldShowSupplierPopover.resultFunc(true, true, true);

      expect(actual).toBeTruthy();
    });

    it('should not show supplier popover when supplier is not selected', () => {
      const actual = getShouldShowSupplierPopover.resultFunc(false, true, true);

      expect(actual).toBeFalsy();
    });

    it('should not show supplier popover when electronic payment is not enabled', () => {
      const actual = getShouldShowSupplierPopover.resultFunc(
        true,
        false,
        false
      );

      expect(actual).toBeFalsy();
    });

    it('should not show supplier popover when electronic payment is not checked', () => {
      const actual = getShouldShowSupplierPopover.resultFunc(true, true, false);

      expect(actual).toBeFalsy();
    });
  });

  describe('getSaveBillPaymentPayload', () => {
    it('Should return create payload', () => {
      const state = {
        billId: '356',
        bill: {
          supplierId: '102',
        },
        recordBillPayment: {
          billPaymentId: 'new',
          paymentDate: '2018-11-26',
          referenceId: '000012',
          description: '',
          accountId: '37',
          accounts: [],
          paidAmount: '100.05',
          discountAmount: '20.85',
        },
      };

      const expected = {
        date: '2018-11-26',
        referenceId: '000012',
        description: '',
        accountId: '37',
        supplierId: '102',
        bankStatementText: '',
        entries: [
          {
            paidAmount: '100.05',
            id: '356',
            discountAmount: '20.85',
          },
        ],
        sendRemittanceAdvice: false,
      };

      const actual = getCreateBillPaymentPayload(state);
      expect(actual).toEqual(expected);
    });

    it('Should return create payload of entries with paidAmount applied when creating', () => {
      const state = {
        billId: '356',
        bill: {
          supplierId: '102',
        },
        recordBillPayment: {
          billPaymentId: 'new',
          paymentDate: '2018-11-26',
          referenceId: '000012',
          description: '',
          accountId: '37',
          accounts: [],
          paidAmount: '',
          discountAmount: '20.85',
        },
      };

      const expected = [];

      const actual = getCreateBillPaymentPayload(state).entries;
      expect(actual).toEqual(expected);
    });

    it('should use bank statement text in state if selected account is electronic cleared account', () => {
      const state = {
        bill: {
          supplierId: '102',
        },
        recordBillPayment: {
          billPaymentId: 'new',
          bankStatementText: 'SOME-TEXT',
          accountId: '1',
          electronicClearingAccountId: '1',
        },
      };

      const actual = getCreateBillPaymentPayload(state);

      expect(actual.bankStatementText).toEqual('SOME-TEXT');
    });

    it('should have empty bank statement text when the selected account is not electronic clearing', () => {
      const state = {
        bill: {
          supplierId: '102',
        },
        recordBillPayment: {
          billPaymentId: 'new',
          bankStatementText: 'SOME-TEXT',
          entries: [],
          accountId: '2',
          electronicClearingAccountId: '1',
        },
      };

      const actual = getCreateBillPaymentPayload(state);

      expect(actual.bankStatementText).toEqual('');
    });
  });

  describe('getDefaultAccountId', () => {
    it('returns accountId when electronic clearing account is difference', () => {
      const state = {
        recordBillPayment: {
          defaultAccountId: '1',
          electronicClearingAccountId: '2',
          accounts: [
            {
              id: '1',
              displayName: 'Account',
            },
            {
              id: '2',
              displayName: 'Electronic Clearing Account',
            },
          ],
        },
      };

      const actual = getDefaultAccountId(state);

      expect(actual).toEqual('1');
    });

    it('returns other accountId when electronic clearing account and default account are the same', () => {
      const state = {
        recordBillPayment: {
          defaultAccountId: '1',
          electronicClearingAccountId: '1',
          accounts: [
            {
              id: '1',
              displayName: 'Account',
            },
            {
              id: '2',
              displayName: 'Other Account',
            },
          ],
        },
      };

      const actual = getDefaultAccountId(state);

      expect(actual).toEqual('2');
    });

    it('returns undefined when electronic clearing account is the only account', () => {
      const state = {
        recordBillPayment: {
          defaultAccountId: '1',
          electronicClearingAccountId: '1',
          accounts: [
            {
              id: '1',
              displayName: 'Electronic Clearing Account',
            },
          ],
        },
      };

      const actual = getDefaultAccountId(state);

      expect(actual).toBeUndefined();
    });
  });

  describe('getBillPaymentOptions', () => {
    it('should return correct bill payment options', () => {
      const state = {
        region: 'au',
        billId: '356',
        bill: {
          billNumber: '000005',
          supplierId: '102',
          issueDate: '2015-01-01',
          amountPaid: '0',
          isTaxInclusive: true,
          lines: [
            {
              type: BillLineType.SERVICE,
              taxExclusiveAmount: '9.99',
              taxAmount: '0.01',
            },
            {
              type: BillLineType.SUB_TOTAL,
              taxExclusiveAmount: '99',
              taxAmount: '1',
            },
          ],
          taxExclusiveFreightAmount: '0',
          freightTaxAmount: '0',
        },
        recordBillPayment: {
          supplierName: 'SUPPLIER 1',
          billPaymentId: 'new',
          paymentDate: '2018-11-26',
          referenceId: '000012',
          description: '',
          accountId: '1',
          paidAmount: '11',
          discountAmount: '2',
          bankStatementText: 'WAWA',
          defaultAccountId: '1',
          electronicClearingAccountId: '2',
          isElectronicPaymentEnabled: true,
          startOfFinancialYearDate: '2017-11-26',
          accounts: [
            {
              id: '1',
              displayName: 'Account',
            },
            {
              id: '2',
              displayName: 'Electronic Clearing Account',
            },
          ],
        },
      };

      const expected = {
        accounts: [
          {
            id: '1',
            displayName: 'Account',
          },
          {
            id: '2',
            displayName: 'Electronic Clearing Account',
          },
        ],
        accountId: '1',
        balanceDue: '10',
        billNumber: '000005',
        description: '',
        issueDate: '01/01/2015',
        supplierId: '102',
        referenceId: '000012',
        paidAmount: '11',
        discountedBalance: 8,
        overAmount: '3.00',
        discountAmount: '2',
        paymentDate: '2018-11-26',
        isElectronicPayment: false,
        isBeforeStartOfFinancialYear: false,
        showElectronicPayments: true,
        shouldShowSupplierPopover: false,
        supplierName: 'SUPPLIER 1',
      };

      const actual = getBillPaymentOptions(state);
      expect(actual).toEqual(expected);
    });
  });
});
