import {
  getBalanceDue,
  getOptions,
  getPaymentAllocationBody,
  getPaymentAllocationPayload,
  getPaymentTypeUrlParam,
  getRemainingBalance,
  getTableOptions,
} from '../paymentAllocationSelectors';

describe('paymentAllocationSelector', () => {
  describe('getPaymentAllocationPayload', () => {
    it('should transform state to payload', () => {
      const state = {
        entries: [{ transactionId: '2', date: '2019-01-01' }],
        filterOptions: { bankAccount: '1' },
        openEntry: {
          payment: {
            isBillPayment: true,
            filterOptions: {
              contactId: '3',
            },
            entries: [
              {
                id: '4',
                referenceId: '755',
                status: 'Open',
                date: '2018-12-23',
                amount: '100.00',
                discountAmount: '10.05',
                appliedAmount: '',
              },
              {
                id: '5',
                referenceId: '755',
                status: 'Open',
                date: '2018-12-23',
                amount: '100.00',
                discountAmount: '50',
                appliedAmount: '1000',
              }],
          },
        },
      };

      const expected = {
        bankAccountId: '1',
        transactionId: '2',
        sourceJournal: 'PayBill',
        date: '2019-01-01',
        contactId: '3',
        entries: [
          { id: '5', appliedAmount: 1000, discountAmount: 50 },
        ],
      };

      const actual = getPaymentAllocationPayload(state, 0);

      expect(actual).toEqual(expected);
    });
  });

  describe('getPaymentAllocationBody', () => {
    const getIsCreatingResult = true;
    const getIsBillPaymentResult = true;
    const getContactsResult = [{
      contactType: 'Supplier',
      displayName: 'A-Z Stationery Supplies',
      id: '1',
      displayId: 'SUP000001',
    },
    {
      contactType: 'Supplier',
      displayName: 'Macro Vending',
      id: '2',
      displayId: 'SUP000003',
    }];
    const getContactIdResult = '1';

    it('should return isCreating as is', () => {
      const actual = getPaymentAllocationBody.resultFunc(
        getIsCreatingResult,
        getIsBillPaymentResult,
        getContactsResult,
        getContactIdResult,
      );

      const { isCreating } = actual;

      expect(isCreating).toEqual(getIsCreatingResult);
    });

    it('should return label for supplier on bill payment', () => {
      const actual = getPaymentAllocationBody.resultFunc(
        getIsCreatingResult,
        true,
        getContactsResult,
        getContactIdResult,
      );

      const { contactLabel } = actual;

      expect(contactLabel).toEqual('Supplier');
    });

    it('should return label for customer on invoice payment', () => {
      const actual = getPaymentAllocationBody.resultFunc(
        getIsCreatingResult,
        false,
        getContactsResult,
        getContactIdResult,
      );

      const { contactLabel } = actual;

      expect(contactLabel).toEqual('Customer');
    });

    it('should return contact name if contact exists in contact list', () => {
      const actual = getPaymentAllocationBody.resultFunc(
        getIsCreatingResult,
        getIsBillPaymentResult,
        getContactsResult,
        getContactIdResult,
      );

      const { contactName } = actual;

      expect(contactName).toEqual('A-Z Stationery Supplies');
    });

    it('should return undefined if contact does not exists in contact list', () => {
      const actual = getPaymentAllocationBody.resultFunc(
        getIsCreatingResult,
        getIsBillPaymentResult,
        getContactsResult,
        '',
      );

      const { contactName } = actual;

      expect(contactName).toBeUndefined();
    });
  });

  describe('getPaymentTypeUrlParam', () => {
    it('should return bill url parameter for bill payment', () => {
      const state = { entries: [{ withdrawal: 123 }] };
      const index = 0;
      const expected = 'bill';

      const actual = getPaymentTypeUrlParam(state, index);

      expect(actual).toEqual(expected);
    });

    it('should return bill url parameter for invoice payment', () => {
      const state = { entries: [{ withdrawal: undefined }] };
      const index = 0;

      const expected = 'invoice';

      const actual = getPaymentTypeUrlParam(state, index);

      expect(actual).toEqual(expected);
    });
  });

  describe('getOptions', () => {
    const getContactsResult = [];
    const getPaymentAllocationContactIdResult = '';
    const getShowPaidResult = false;
    const getIsBillPaymentResult = true;

    it('should return contacts, contactId, and showPaid as is', () => {
      const actual = getOptions.resultFunc(
        getContactsResult,
        getPaymentAllocationContactIdResult,
        getShowPaidResult,
        getIsBillPaymentResult,
      );
      const { contacts, contactId, showPaid } = actual;

      expect(contacts).toEqual(getContactsResult);
      expect(contactId).toEqual(getPaymentAllocationContactIdResult);
      expect(showPaid).toEqual(getShowPaidResult);
    });

    it('should get bill payment options', () => {
      const actual = getOptions.resultFunc(
        getContactsResult,
        getPaymentAllocationContactIdResult,
        getShowPaidResult,
        true,
      );
      const { contactLabel, showPaidLabel } = actual;

      expect(contactLabel).toEqual('Supplier');
      expect(showPaidLabel).toEqual('Show paid bills');
    });

    it('should get bill payment options', () => {
      const actual = getOptions.resultFunc(
        getContactsResult,
        getPaymentAllocationContactIdResult,
        getShowPaidResult,
        false,
      );
      const { contactLabel, showPaidLabel } = actual;

      expect(contactLabel).toEqual('Customer');
      expect(showPaidLabel).toEqual('Show paid invoices');
    });
  });

  describe('getTableOptions', () => {
    describe('when bill payment', () => {
      const getIsCreatingResult = true;
      const getIsBillPaymentResult = true;
      const getIsTableLoadingResult = false;
      const getIsTableEmptyResult = false;
      const getContactIdResult = '1';

      it('should return isCreating, isTableLoading, and isTableEmpty as is', () => {
        const actual = getTableOptions.resultFunc(
          getIsCreatingResult,
          getIsBillPaymentResult,
          getIsTableLoadingResult,
          getIsTableEmptyResult,
          getContactIdResult,
        );

        const {
          isCreating,
          isTableLoading,
          isTableEmpty,
        } = actual;

        expect(isCreating).toEqual(getIsCreatingResult);
        expect(isTableLoading).toEqual(getIsTableLoadingResult);
        expect(isTableEmpty).toEqual(getIsTableEmptyResult);
      });

      it('should return label options for bill payment', () => {
        const actual = getTableOptions.resultFunc(
          getIsCreatingResult,
          getIsBillPaymentResult,
          getIsTableLoadingResult,
          getIsTableEmptyResult,
          getContactIdResult,
        );

        const {
          referenceIdLabel,
          amountPaidLabel,
        } = actual;

        expect(referenceIdLabel).toEqual('Bill number');
        expect(amountPaidLabel).toEqual('Amount paid ($)');
      });

      describe('when table is empty', () => {
        it('should return empty message on create if supplier is selected', () => {
          const actual = getTableOptions.resultFunc(
            getIsCreatingResult,
            getIsBillPaymentResult,
            getIsTableLoadingResult,
            true,
            getContactIdResult,
          );

          const { tableEmptyMessage } = actual;

          expect(tableEmptyMessage).toEqual('No results.');
        });

        it('should return instruction message on create if supplier is not selected', () => {
          const actual = getTableOptions.resultFunc(
            getIsCreatingResult,
            getIsBillPaymentResult,
            getIsTableLoadingResult,
            true,
            '',
          );

          const { tableEmptyMessage } = actual;

          expect(tableEmptyMessage).toEqual('Please select a supplier.');
        });

        it('should return empty message on read if supplier is provided', () => {
          const actual = getTableOptions.resultFunc(
            false,
            getIsBillPaymentResult,
            getIsTableLoadingResult,
            true,
            getContactIdResult,
          );

          const { tableEmptyMessage } = actual;

          expect(tableEmptyMessage).toEqual('No results.');
        });

        it('should return empty message on read if supplier is not provided', () => {
          const actual = getTableOptions.resultFunc(
            false,
            getIsBillPaymentResult,
            getIsTableLoadingResult,
            true,
            '',
          );

          const { tableEmptyMessage } = actual;

          expect(tableEmptyMessage).toEqual('No results.');
        });
      });
    });

    describe('when invoice payment', () => {
      const getIsCreatingResult = true;
      const getIsBillPaymentResult = false;
      const getIsTableLoadingResult = false;
      const getIsTableEmptyResult = false;
      const getContactIdResult = '1';

      it('should return isCreating, isTableLoading, and isTableEmpty as is', () => {
        const actual = getTableOptions.resultFunc(
          getIsCreatingResult,
          getIsBillPaymentResult,
          getIsTableLoadingResult,
          getIsTableEmptyResult,
          getContactIdResult,
        );

        const {
          isCreating,
          isTableLoading,
          isTableEmpty,
        } = actual;

        expect(isCreating).toEqual(getIsCreatingResult);
        expect(isTableLoading).toEqual(getIsTableLoadingResult);
        expect(isTableEmpty).toEqual(getIsTableEmptyResult);
      });

      it('should return label options for invoice payment', () => {
        const actual = getTableOptions.resultFunc(
          getIsCreatingResult,
          getIsBillPaymentResult,
          getIsTableLoadingResult,
          getIsTableEmptyResult,
          getContactIdResult,
        );

        const {
          referenceIdLabel,
          amountPaidLabel,
        } = actual;

        expect(referenceIdLabel).toEqual('Invoice number');
        expect(amountPaidLabel).toEqual('Amount received ($)');
      });

      describe('when table is empty', () => {
        it('should return empty message on create if customer is selected', () => {
          const actual = getTableOptions.resultFunc(
            getIsCreatingResult,
            getIsBillPaymentResult,
            getIsTableLoadingResult,
            true,
            getContactIdResult,
          );

          const { tableEmptyMessage } = actual;

          expect(tableEmptyMessage).toEqual('No results.');
        });

        it('should return instruction message on create if customer is not selected', () => {
          const actual = getTableOptions.resultFunc(
            getIsCreatingResult,
            getIsBillPaymentResult,
            getIsTableLoadingResult,
            true,
            '',
          );

          const { tableEmptyMessage } = actual;

          expect(tableEmptyMessage).toEqual('Please select a customer.');
        });

        it('should return empty message on read if supplier is provided', () => {
          const actual = getTableOptions.resultFunc(
            false,
            getIsBillPaymentResult,
            getIsTableLoadingResult,
            true,
            getContactIdResult,
          );

          const { tableEmptyMessage } = actual;

          expect(tableEmptyMessage).toEqual('No results.');
        });

        it('should return empty message on read if customer is not provided', () => {
          const actual = getTableOptions.resultFunc(
            false,
            getIsBillPaymentResult,
            getIsTableLoadingResult,
            true,
            '',
          );

          const { tableEmptyMessage } = actual;

          expect(tableEmptyMessage).toEqual('No results.');
        });
      });
    });
  });

  describe('getBalanceDue', () => {
    [
      ['should return positive value', '100', '10', '90.00'],
      ['should return negative value', '10', '100', '-90.00'],
      ['should return amount when discount amount is invalid', '100', '-', '100.00'],
      ['should return 0.00 when amount and discount amount are empty', '', '', '0.00'],
    ].forEach((args) => {
      const [scenario, ...rest] = args;

      it(scenario, () => {
        const [amount, discountAmount, expected] = rest;

        const actual = getBalanceDue(amount, discountAmount);

        expect(actual).toEqual(expected);
      });
    });
  });

  describe('getRemainingBalance', () => {
    [
      ['should return positive value', '100', [{ appliedAmount: '5' }, { appliedAmount: '5' }], '$90.00'],
      ['should return negative value', '100', [{ appliedAmount: '10' }, { appliedAmount: '100' }], '-$10.00'],
      ['should return total amount when applied amount is invalid', '100', [{ appliedAmount: '-' }], '$100.00'],
      ['should calculate only on valid amount', '100', [{ appliedAmount: '' }, { appliedAmount: '10' }], '$90.00'],
    ].forEach((args) => {
      const [scenario, ...rest] = args;

      it(scenario, () => {
        const [getTotalAmountResult, getPaymentAllocationEntriesResult, expected] = rest;

        const actual = getRemainingBalance.resultFunc(
          getTotalAmountResult,
          getPaymentAllocationEntriesResult,
        );

        expect(actual).toEqual(expected);
      });
    });
  });
});
