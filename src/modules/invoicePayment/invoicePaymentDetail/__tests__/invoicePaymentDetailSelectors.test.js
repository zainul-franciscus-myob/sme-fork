import {
  getEntries,
  getIsBeforeStartOfFinancialYear,
  getSaveContent,
  getTotalReceived,
  getUrlParams,
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
        overAmount: '2,500.05',
        link: '/#/au/1/invoice/378',
        statusColor: 'light-grey',
      },
    ];

    it('default discountedBalance to 0 when read', () => {
      const actual = getEntries(state);
      expect(actual).toEqual(expected);
    });

    it('calculates discountedBalance when creating', () => {
      const modifiedState = {
        ...state,
        invoicePaymentId: 'new',
        entries: state.entries.map((entry) => ({
          ...entry,
          balanceDue: '2500.00',
          discountAmount: '1000.00',
        })),
      };

      const modifiedExpected = expected.map((entry) => ({
        ...entry,
        balanceDue: '2,500.00',
        paidAmount: '2500.05',
        discountedBalance: '1,500.00',
        discountAmount: '1000.00',
        overAmount: '1,000.05',
      }));

      const actual = getEntries(modifiedState);
      expect(actual).toEqual(modifiedExpected);
    });

    it('set status color for closed entry', () => {
      const modifiedState = {
        ...state,
        entries: state.entries.map((entry) => ({
          ...entry,
          status: 'Closed',
        })),
      };

      const modifiedExpected = expected.map((entry) => ({
        ...entry,
        status: 'Closed',
        statusColor: 'green',
      }));

      const actual = getEntries(modifiedState);
      expect(actual).toEqual(modifiedExpected);
    });

    describe('overAmount', () => {
      it('calculates overAmount if there is a paidAmount', () => {
        const modifiedState = {
          businessId: '1',
          region: 'au',
          invoicePaymentId: '123',
          entries: [
            {
              id: '378',
              invoiceNumber: '0000023',
              status: 'Open',
              date: '27/03/2019',
              balanceDue: '1000',
              paidAmount: '2000',
              discountAmount: '100',
            },
          ],
        };

        const actual = getEntries(modifiedState);
        expect(actual[0].overAmount).toEqual('1,100.00');
      });

      it('returns undefined for overAmount if there is no paidAmount', () => {
        const modifiedState = {
          ...state,
          entries: state.entries.map((entry) => ({
            ...entry,
            paidAmount: '',
          })),
        };

        const actual = getEntries(modifiedState);
        expect(actual[0].overAmount).toBeUndefined();
      });
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

      expect(getTotalReceived(state)).toBe('$3,500.10');
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

      expect(getTotalReceived(state)).toBe('$0.00');
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

  describe('getUrlParams', () => {
    it('build url params for create', () => {
      const state = {
        invoicePaymentId: 'new',
        businessId: '123',
      };

      const actual = getUrlParams(state);

      expect(actual).toEqual({
        businessId: '123',
      });
    });

    it('build url params for non create', () => {
      const state = {
        invoicePaymentId: '1',
        businessId: '123',
      };

      const actual = getUrlParams(state);

      expect(actual).toEqual({
        invoicePaymentId: '1',
        businessId: '123',
      });
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
});
