import {
  getEntries,
  getSaveContent,
  getTableEmptyMessage,
  getTotalReceived,
  getWasRedirectedFromInvoiceDetail,
} from '../invoicePaymentDetailSelectors';

describe('invoicePaymentDetailSelectors', () => {
  describe('getEntries', () => {
    const state = {
      businessId: '1',
      region: 'au',
      invoicePaymentId: '123',
      entries: [
        {
          id: '378',
          invoiceNumber: '0000023',
          status: 'Open',
          date: '27/03/2019',
          balanceDue: '0',
          paidAmount: '2500.05',
          discountAmount: '0',
        },
      ],
    };

    const expected = [
      {
        id: '378',
        invoiceNumber: '0000023',
        status: 'Open',
        date: '27/03/2019',
        balanceDue: '0.00',
        paidAmount: '2500.05',
        discountedBalance: '0',
        discountAmount: '0',
        link: '/#/au/1/invoice/378',
        statusColor: 'light-grey',
      },
    ];

    it('default discountedBalance to 0 when read', () => {
      const actual = getEntries(state);
      expect(actual)
        .toEqual(expected);
    });

    it('calculates discountedBalance when creating', () => {
      const modifiedState = {
        ...state,
        invoicePaymentId: 'new',
        entries: state.entries.map(entry => ({
          ...entry,
          balanceDue: '2500.00',
          discountAmount: '1000.00',
        })),
      };

      const modifiedExpected = expected.map(entry => ({
        ...entry,
        balanceDue: '2,500.00',
        paidAmount: '2500.05',
        discountedBalance: '1,500.00',
        discountAmount: '1000.00',
      }));

      const actual = getEntries(modifiedState);
      expect(actual).toEqual(modifiedExpected);
    });

    it('set status color for closed entry', () => {
      const modifiedState = {
        ...state,
        entries: state.entries.map(entry => ({
          ...entry,
          status: 'Closed',
        })),
      };

      const modifiedExpected = expected.map(entry => ({
        ...entry,
        status: 'Closed',
        statusColor: 'green',
      }));

      const actual = getEntries(modifiedState);
      expect(actual).toEqual(modifiedExpected);
    });
  });

  describe('getTotalReceived', () => {
    it('calculates total received', () => {
      const state = {
        entries: [
          {
            id: '378',
            invoiceNumber: '0000023',
            status: 'Open',
            date: '27/03/2019',
            balanceDue: '0',
            paidAmount: '2500.05',
            discountAmount: '0',
          },
          {
            id: '379',
            invoiceNumber: '0000024',
            status: 'Open',
            date: '27/03/2019',
            balanceDue: '0',
            paidAmount: '1000.05',
            discountAmount: '0',
          },
        ],
      };

      expect(getTotalReceived(state))
        .toBe('$3,500.10');
    });

    it('calculates total received when paidAmount is undefined', () => {
      const state = {
        entries: [
          {
            id: '378',
            invoiceNumber: '0000023',
            status: 'Open',
            date: '27/03/2019',
            balanceDue: '0',
            paidAmount: undefined,
            discountAmount: '0',
          },
        ],
      };

      expect(getTotalReceived(state))
        .toBe('$0.00');
    });
  });

  describe('getSaveContent', () => {
    let state;

    beforeEach(() => {
      state = {
        date: '2019-04-27',
        referenceId: 'referenceId',
        description: 'description',
        accountId: 'accountId',
        customerId: '102',
        customers: [{ id: '102', displayName: 'Name, Customer' }],
        entries: [
          {
            id: '378',
            paidAmount: '2500.05',
            discountAmount: '0',
          },
          {
            id: '379',
            discountAmount: '0',
          },
          {
            id: '380',
            paidAmount: '',
            discountAmount: '0',
          },
        ],
      };
    });

    describe('when creating', () => {
      beforeEach(() => {
        state = {
          ...state,
          invoicePaymentId: 'new',
        };
      });

      it('return create content with only paid entries', () => {
        expect(getSaveContent(state)).toEqual({
          date: '2019-04-27',
          referenceId: 'referenceId',
          description: 'description',
          accountId: 'accountId',
          customerId: '102',
          customerName: 'Name, Customer',
          entries: [
            {
              invoiceId: '378',
              paidAmount: '2500.05',
              discountAmount: '0',
            },
          ],
        });
      });

      it('return undefined referenceId when the field is clean', () => {
        state = {
          ...state,
          originalReferenceId: state.referenceId,
        };

        expect(getSaveContent(state).referenceId).toEqual(undefined);
      });
    });

    describe('when updating', () => {
      beforeEach(() => {
        state = {
          ...state,
          invoicePaymentId: '123',
        };
      });

      it('return update content', () => {
        expect(getSaveContent(state)).toEqual({
          date: '2019-04-27',
          referenceId: 'referenceId',
          description: 'description',
          accountId: 'accountId',
        });
      });
    });
  });

  describe('getEmptyTableMessage', () => {
    let state;

    beforeEach(() => {
      state = {
        customerId: '123',
        entries: [1, 2, 3],
        isTableLoading: false,
      };
    });

    it('returns customer message when there is no customer selected', () => {
      state = {
        ...state,
        customerId: '',
      };

      expect(getTableEmptyMessage(state)).toEqual('Select the customer who paid you');
    });

    it('otherwise returns default', () => {
      expect(getTableEmptyMessage(state)).toEqual('There are no invoices');
    });
  });

  describe('getWasRedirectedFromInvoiceDetail', () => {
    it('returns true when the invoice payment id is set from context', () => {
      const state = {
        applyPaymentToInvoiceId: '1234',
      };
      expect(getWasRedirectedFromInvoiceDetail(state)).toBe(true);
    });
    it('returns false when the invoice payment id is the default blank string', () => {
      const state = {
        applyPaymentToInvoiceId: '',
      };
      expect(getWasRedirectedFromInvoiceDetail(state)).toBe(false);
    });
  });
});
