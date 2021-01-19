import {
  getDefaultAccountId,
  getIsBeforeStartOfFinancialYear,
  getIsElectronicPayment,
  getPurchaseEntries,
  getSaveSupplierPaymentPayload,
  getShouldDisableSupplier,
  getShouldShowSupplierPopover,
} from '../SupplierPaymentDetailSelectors';

describe('SupplierPaymentSelector', () => {
  describe('getPurchaseEntries', () => {
    it('returns the right shape for purchase entries', () => {
      const state = {
        region: 'au',
        businessId: '123',
        entries: [
          {
            id: '378',
            purchaseNumber: '0000024',
            status: 'Closed',
            date: '27/03/2019',
            purchaseAmount: '2500.00',
            discountAmount: '100.00',
            paidAmount: '3000.00',
          },
          {
            id: '379',
            purchaseNumber: '0000025',
            status: 'Order',
            date: '14/01/2021',
            purchaseAmount: '7.00',
            discountAmount: '1.00',
            paidAmount: '0',
          },
        ],
      };

      const expected = [
        {
          id: '378',
          purchaseNumber: '0000024',
          status: 'Closed',
          date: '27/03/2019',
          purchaseAmount: '2,500.00',
          discountAmount: '100.00',
          paidAmount: '3000.00',
          balanceOwed: '2,400.00',
          overAmount: '600.00',
          link: '/#/au/123/bill/378',
          labelColour: 'green',
        },
        {
          id: '379',
          purchaseNumber: '0000025',
          status: 'Order',
          date: '14/01/2021',
          purchaseAmount: '7.00',
          discountAmount: '1.00',
          paidAmount: '0',
          balanceOwed: '6.00',
          link: '/#/au/123/purchaseOrder/379',
          labelColour: 'light-grey',
        },
      ];

      const actual = getPurchaseEntries(state);
      expect(actual).toEqual(expected);
    });

    it('calculates balance owed from purchaseAmount and discountAmount', () => {
      const state = {
        entries: [
          {
            status: 'Open',
            purchaseAmount: '2500.00',
            discountAmount: '1000.00',
            paidAmount: '',
          },
        ],
      };

      const actual = getPurchaseEntries(state);
      expect(actual[0].balanceOwed).toEqual('1,500.00');
    });

    describe('overAmount', () => {
      it('calculates overAmount if there is a paidAmount', () => {
        const state = {
          entries: [
            {
              status: 'Open',
              purchaseAmount: '1000',
              discountAmount: '100',
              paidAmount: '2000',
            },
          ],
        };

        const actual = getPurchaseEntries(state);
        expect(actual[0].overAmount).toEqual('1,100.00');
      });

      it('returns undefined for overAmount if there is no paidAmount', () => {
        const state = {
          entries: [
            {
              status: 'Open',
              purchaseAmount: '1000',
              discountAmount: '100',
              paidAmount: '',
            },
          ],
        };

        const actual = getPurchaseEntries(state);
        expect(actual[0].overAmount).toBeUndefined();
      });
    });

    it('builds entry link for each entry', () => {
      const state = {
        region: 'au',
        businessId: '123',
        entries: [
          {
            id: '1',
            status: 'Open',
            purchaseAmount: '2500.00',
            discountAmount: '1000.00',
            paidAmount: '',
          },
          {
            id: '2',
            status: 'Order',
            purchaseAmount: '35.00',
            discountAmount: '0',
            paidAmount: '0',
          },
        ],
      };

      const actual = getPurchaseEntries(state);
      expect(actual[0].link).toEqual('/#/au/123/bill/1');
      expect(actual[1].link).toEqual('/#/au/123/purchaseOrder/2');
    });

    it('sets the colour of the purchase entry status', () => {
      const state = {
        entries: [
          {
            status: 'Open',
            purchaseAmount: '2500.00',
            discountAmount: '1000.00',
            paidAmount: '',
          },
          {
            status: 'Closed',
            purchaseAmount: '2500.00',
            discountAmount: '1000.00',
            paidAmount: '',
          },
          {
            status: 'Order',
            purchaseAmount: '23.00',
            discountAmount: '0',
            paidAmount: '',
          },
        ],
      };

      const actual = getPurchaseEntries(state);
      expect(actual[0].labelColour).toEqual('light-grey');
      expect(actual[1].labelColour).toEqual('green');
      expect(actual[2].labelColour).toEqual('light-grey');
    });
  });

  describe('getSaveSupplierPaymentPayload', () => {
    it('Should return create payload when creating', () => {
      const state = {
        supplierPaymentId: 'new',
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
            status: 'Open',
          },
          {
            paidAmount: '13.54',
            id: '357',
            discountAmount: '0',
            status: 'Order',
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
            billId: '356',
            discountAmount: '20.85',
          },
          {
            paidAmount: '13.54',
            purchaseOrderId: '357',
            discountAmount: '0',
          },
        ],
      };

      const actual = getSaveSupplierPaymentPayload(state);
      expect(actual).toEqual(expected);
    });

    it('Should return create payload of entries with paidAmount applied when creating', () => {
      const state = {
        supplierPaymentId: 'new',
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
            status: 'Open',
            discountAmount: '20.85',
          },
          {
            paidAmount: '200.00',
            id: '355',
            status: 'Open',
            discountAmount: '20.05',
          },
        ],
      };

      const expected = [
        {
          paidAmount: '200.00',
          billId: '355',
          discountAmount: '20.05',
        },
      ];

      const actual = getSaveSupplierPaymentPayload(state).entries;
      expect(actual).toEqual(expected);
    });

    it('Should return update payload when updating', () => {
      const state = {
        supplierPaymentId: '1',
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

      const actual = getSaveSupplierPaymentPayload(state);
      expect(actual).toEqual(expected);
    });

    it('should use bank statement text in state if selected account is electronic cleared account', () => {
      const state = {
        supplierPaymentId: 'new',
        bankStatementText: 'SOME-TEXT',
        entries: [],
        accountId: '1',
        electronicClearingAccountId: '1',
      };

      const actual = getSaveSupplierPaymentPayload(state);

      expect(actual.bankStatementText).toEqual('SOME-TEXT');
    });

    it('should have empty bank statement text when the selected account is not electronic clearing', () => {
      const state = {
        supplierPaymentId: 'new',
        bankStatementText: 'SOME-TEXT',
        entries: [],
        accountId: '2',
        electronicClearingAccountId: '1',
      };

      const actual = getSaveSupplierPaymentPayload(state);

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
    it('enable supplier on creating new supplier payment', () => {
      const actual = getShouldDisableSupplier.resultFunc(true, '');

      expect(actual).toBeFalsy();
    });

    it('disable supplier on editing supplier payment', () => {
      const actual = getShouldDisableSupplier.resultFunc(false, '');

      expect(actual).toBeTruthy();
    });

    it('disable supplier on creating supplier payment from a bill', () => {
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
