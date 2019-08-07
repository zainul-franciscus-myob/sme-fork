import {
  getEntries, getSaveContent, getTableEmptyMessage, getTotalReceived,
} from '../invoicePaymentDetailSelectors';

describe('invoicePaymentDetailSelectors', () => {
  describe('getEntries', () => {
    it('default balanceDue to 0 when read', () => {
      const state = {
        invoicePaymentId: '123',
        entries: [
          {
            id: '378',
            invoiceNumber: '0000023',
            status: 'Open',
            date: '27/03/2019',
            invoiceAmount: '0',
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
          invoiceAmount: '0.00',
          paidAmount: '2500.05',
          balanceDue: '0',
          discountAmount: '0',
        },
      ];

      const actual = getEntries(state);
      expect(actual)
        .toEqual(expected);
    });

    it('calculates balanceDue when creating', () => {
      const state = {
        invoicePaymentId: 'new',
        entries: [
          {
            id: '378',
            invoiceNumber: '0000023',
            status: 'Open',
            date: '27/03/2019',
            invoiceAmount: '2500.00',
            paidAmount: '2500.05',
            discountAmount: '1000.00',
          },
        ],
      };

      const expected = [
        {
          id: '378',
          invoiceNumber: '0000023',
          status: 'Open',
          date: '27/03/2019',
          invoiceAmount: '2,500.00',
          paidAmount: '2500.05',
          balanceDue: '1,500.00',
          discountAmount: '1000.00',
        },
      ];

      const actual = getEntries(state);
      expect(actual)
        .toEqual(expected);
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
            invoiceAmount: '0',
            paidAmount: '2500.05',
            discountAmount: '0',
          },
          {
            id: '379',
            invoiceNumber: '0000024',
            status: 'Open',
            date: '27/03/2019',
            invoiceAmount: '0',
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
            invoiceAmount: '0',
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

      expect(getTableEmptyMessage(state)).toEqual('Please select a customer.');
    });

    it('otherwise returns default', () => {
      expect(getTableEmptyMessage(state)).toEqual('There are no invoices.');
    });
  });
});
