import {
  getBillEntries,
  getDefaultAccountId,
  getIsBeforeStartOfFinancialYear,
  getIsElectronicPayment,
  getSaveBillPaymentPayload,
  getShouldDisableSupplier,
  getShouldLoadBillList,
  getShouldShowSupplierPopover,
} from '../BillPaymentDetailSelectors';

describe('BillPaymentSelector', () => {
  describe('getShouldLoadBillList', () => {
    it('Should load pay list if a supplier is selected', () => {
      const key = 'supplierId';
      const value = '1';
      const state = {
        supplierId: '',
        showPaidBills: false,
      };

      const expected = true;
      const actual = getShouldLoadBillList(key, value, state);

      expect(actual).toBe(expected);
    });

    it('Should load pay list if showPaidBills is selected and a supplierId had been selected', () => {
      const key = 'showPaidBills';
      const value = true;
      const state = {
        supplierId: '1',
        showPaidBills: false,
      };

      const expected = true;
      const actual = getShouldLoadBillList(key, value, state);

      expect(actual).toBe(expected);
    });

    it('Should not load pay list if showPaidBills is selected and a supplierId has not been selected', () => {
      const key = 'showPaidBills';
      const value = true;
      const state = {
        supplierId: '',
        showPaidBills: false,
      };

      const expected = false;
      const actual = getShouldLoadBillList(key, value, state);

      expect(actual).toBe(expected);
    });
  });

  describe('getBillEntries', () => {
    it('returns the right shape for bill entries', () => {
      const state = {
        region: 'au',
        businessId: '123',
        entries: [
          {
            id: '378',
            billNumber: '0000024',
            status: 'Closed',
            date: '27/03/2019',
            billAmount: '2500.00',
            discountAmount: '100.00',
            paidAmount: '3000.00',
          },
        ],
      };

      const expected = [
        {
          id: '378',
          billNumber: '0000024',
          status: 'Closed',
          date: '27/03/2019',
          billAmount: '2,500.00',
          discountAmount: '100.00',
          paidAmount: '3000.00',
          balanceOwed: '2,400.00',
          overAmount: '600.00',
          link: '/#/au/123/bill/378',
          labelColour: 'green',
        },
      ];

      const actual = getBillEntries(state);
      expect(actual).toEqual(expected);
    });

    it('calculates balance owed from billAmount and discountAmount', () => {
      const state = {
        entries: [
          {
            status: 'Open',
            billAmount: '2500.00',
            discountAmount: '1000.00',
            paidAmount: '',
          },
        ],
      };

      const actual = getBillEntries(state);
      expect(actual[0].balanceOwed).toEqual('1,500.00');
    });

    describe('overAmount', () => {
      it('calculates overAmount if there is a paidAmount', () => {
        const state = {
          entries: [
            {
              status: 'Open',
              billAmount: '1000',
              discountAmount: '100',
              paidAmount: '2000',
            },
          ],
        };

        const actual = getBillEntries(state);
        expect(actual[0].overAmount).toEqual('1,100.00');
      });

      it('returns undefined for overAmount if there is no paidAmount', () => {
        const state = {
          entries: [
            {
              status: 'Open',
              billAmount: '1000',
              discountAmount: '100',
              paidAmount: '',
            },
          ],
        };

        const actual = getBillEntries(state);
        expect(actual[0].overAmount).toBeUndefined();
      });
    });

    it('builds entry link for each entry', () => {
      const state = {
        region: 'au',
        businessId: '123',
        entries: [
          {
            id: 'id',
            status: 'Open',
            billAmount: '2500.00',
            discountAmount: '1000.00',
            paidAmount: '',
          },
        ],
      };

      const actual = getBillEntries(state);
      expect(actual[0].link).toEqual('/#/au/123/bill/id');
    });

    it('sets the colour of the bill entry status', () => {
      const state = {
        entries: [
          {
            status: 'Open',
            billAmount: '2500.00',
            discountAmount: '1000.00',
            paidAmount: '',
          },
          {
            status: 'Closed',
            billAmount: '2500.00',
            discountAmount: '1000.00',
            paidAmount: '',
          },
        ],
      };

      const actual = getBillEntries(state);
      expect(actual[0].labelColour).toEqual('light-grey');
      expect(actual[1].labelColour).toEqual('green');
    });
  });

  describe('getSaveBillPaymentPayload', () => {
    it('Should return create payload when creating', () => {
      const state = {
        billPaymentId: 'new',
        date: '2018-11-26',
        referenceId: '000012',
        description: 'Payment to Thi and Cameo',
        accountId: '37',
        supplierId: '102',
        accounts: [],
        entries: [
          {
            paidAmount: '100.05',
            id: '356',
            discountAmount: '20.85',
          },
        ],
      };

      const expected = {
        date: '2018-11-26',
        referenceId: '000012',
        description: 'Payment to Thi and Cameo',
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
      };

      const actual = getSaveBillPaymentPayload(state);
      expect(actual).toEqual(expected);
    });

    it('Should return create payload of entries with paidAmount applied when creating', () => {
      const state = {
        billPaymentId: 'new',
        date: '2018-11-26',
        referenceId: '000012',
        description: 'Payment to Thi and Cameo',
        accountId: '37',
        supplierId: '102',
        accounts: [],
        entries: [
          {
            paidAmount: '',
            id: '356',
            discountAmount: '20.85',
          },
          {
            paidAmount: '200.00',
            id: '355',
            discountAmount: '20.05',
          },
        ],
      };

      const expected = [
        {
          paidAmount: '200.00',
          id: '355',
          discountAmount: '20.05',
        },
      ];

      const actual = getSaveBillPaymentPayload(state).entries;
      expect(actual).toEqual(expected);
    });

    it('Should return update payload when updating', () => {
      const state = {
        billPaymentId: '1',
        date: '2018-11-26',
        referenceId: '000012',
        description: 'Payment to Thi and Cameo',
        accountId: '37',
        supplierId: '102',
        entries: [
          {
            paidAmount: '100.05',
            id: '356',
            discountAmount: '20.85',
          },
        ],
        accounts: [],
      };

      const expected = {
        date: '2018-11-26',
        referenceId: '000012',
        bankStatementText: '',
        description: 'Payment to Thi and Cameo',
        accountId: '37',
      };

      const actual = getSaveBillPaymentPayload(state);
      expect(actual).toEqual(expected);
    });

    it('should use bank statement text in state if selected account is electronic cleared account', () => {
      const state = {
        billPaymentId: 'new',
        bankStatementText: 'SOME-TEXT',
        entries: [],
        accountId: '1',
        electronicClearingAccountId: '1',
      };

      const actual = getSaveBillPaymentPayload(state);

      expect(actual.bankStatementText).toEqual('SOME-TEXT');
    });

    it('should have empty bank statement text when the selected account is not electronic clearing', () => {
      const state = {
        billPaymentId: 'new',
        bankStatementText: 'SOME-TEXT',
        entries: [],
        accountId: '2',
        electronicClearingAccountId: '1',
      };

      const actual = getSaveBillPaymentPayload(state);

      expect(actual.bankStatementText).toEqual('');
    });
  });

  describe('getIsElectronicPayment', () => {
    it('should be true when selected account is electronics clearing account', () => {
      const state = {
        accountId: '4',
        electronicClearingAccountId: '4',
      };

      const isElectronicPayment = getIsElectronicPayment(state);

      expect(isElectronicPayment).toEqual(true);
    });

    it('should be false when selected account is not electronics clearing account', () => {
      const state = {
        accountId: '1',
        electronicClearingAccountId: '4',
      };

      const isElectronicPayment = getIsElectronicPayment(state);

      expect(isElectronicPayment).toEqual(false);
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
          date,
          startOfFinancialYearDate,
        };

        const actual = getIsBeforeStartOfFinancialYear(state);

        expect(actual).toEqual(expected);
      }
    );
  });

  describe('getShouldDisableSupplier', () => {
    it('enable supplier on creating new bill payment', () => {
      const actual = getShouldDisableSupplier.resultFunc(true, '');

      expect(actual).toBeFalsy();
    });

    it('disable supplier on editing bill payment', () => {
      const actual = getShouldDisableSupplier.resultFunc(false, '');

      expect(actual).toBeTruthy();
    });

    it('disable supplier on creating bill payment from a bill', () => {
      const actual = getShouldDisableSupplier.resultFunc(false, true, '12');

      expect(actual).toBeTruthy();
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

  describe('getDefaultAccountId', () => {
    it('returns accountId when electronic clearing account is difference', () => {
      const state = {
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
      };

      const actual = getDefaultAccountId(state);

      expect(actual).toEqual('1');
    });

    it('returns other accountId when electronic clearing account and default account are the same', () => {
      const state = {
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
      };

      const actual = getDefaultAccountId(state);

      expect(actual).toEqual('2');
    });

    it('returns undefined when electronic clearing account is the only account', () => {
      const state = {
        defaultAccountId: '1',
        electronicClearingAccountId: '1',
        accounts: [
          {
            id: '1',
            displayName: 'Electronic Clearing Account',
          },
        ],
      };

      const actual = getDefaultAccountId(state);

      expect(actual).toBeUndefined();
    });
  });
});
