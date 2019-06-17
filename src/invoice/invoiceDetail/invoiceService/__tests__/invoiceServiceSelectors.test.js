import {
  getExpiredDate, getInvoiceOptions, getInvoicePayload, getTotalsAndAmounts,
} from '../invoiceServiceSelectors';
import state from './fixtures/state.json';

describe('InvoiceServiceSelectors', () => {
  describe('getInvoiceOptions', () => {
    it('returns correct shape for InvoiceServiceOptions component', () => {
      const expected = {
        id: '1',
        contactOptions: [
          { name: 'Cow Feed 1', value: '1' },
          { name: 'Cow Feed 2', value: '2' },
          { name: 'Cow Feed 3', value: '3' },
        ],
        contactId: '3',
        expirationTerm: 'Prepaid',
        expirationDays: 0,
        chargeForLatePayment: 123.12,
        discountForEarlyPayment: 3546.34,
        numberOfDaysForDiscount: 10,
        taxInclusive: true,
        amountPaid: '10.00',
        number: '0000012334563456',
        address: 'Patrick Bateman\n34 Bailey Avenue\nMoorabbin Victoria 3025\nAustralia',
        issueDate: '2018-11-02',
        expiredDate: '02/11/2018',
        orderNumber: '123',
        notes: 'Thank you!',
        expirationTermOptions: [
          { value: 'OnADayOfTheMonth', name: 'On a day of the month' },
          { value: 'InAGivenNumberOfDays', name: 'In a given no. of days' },
          { value: 'DayOfMonthAfterEOM', name: 'Day of month after EOM' },
          { value: 'NumberOfDaysAfterEOM', name: 'No. of days after EOM' },
          { value: 'Prepaid', name: 'Prepaid' },
          { value: 'CashOnDelivery', name: 'C.O.D.' },
        ],
        isCreating: false,
      };
      const actual = getInvoiceOptions(state);

      expect(actual).toEqual(expected);
    });
  });

  describe('getExpiredDate with term', () => {
    describe('OnADayOfTheMonth', () => {
      it('returns a day of next month when exp days bigger than issue date', () => {
        const expDateState = {
          invoice: {
            issueDate: '2019-04-26',
            expirationTerm: 'OnADayOfTheMonth',
            expirationDays: '25',
          },
        };
        const expected = '25/05/2019';
        const actual = getExpiredDate(expDateState);

        expect(actual).toBe(expected);
      });

      it('returns a day of current month when exp days smaller than issue date', () => {
        const expDateState = {
          invoice: {
            issueDate: '2019-04-24',
            expirationTerm: 'OnADayOfTheMonth',
            expirationDays: '25',
          },
        };
        const expected = '25/04/2019';
        const actual = getExpiredDate(expDateState);

        expect(actual).toBe(expected);
      });
    });

    describe('InAGivenNumberOfDays', () => {
      it('returns correct expired date', () => {
        const expDateState = {
          invoice: {
            issueDate: '2019-02-04',
            expirationTerm: 'InAGivenNumberOfDays',
            expirationDays: '27',
          },
        };
        const expected = '03/03/2019';
        const actual = getExpiredDate(expDateState);

        expect(actual).toBe(expected);
      });
    });

    describe('DayOfMonthAfterEOM', () => {
      it('returns correct expired date', () => {
        const expDateState = {
          invoice: {
            issueDate: '2019-04-30',
            expirationTerm: 'DayOfMonthAfterEOM',
            expirationDays: '32',
          },
        };
        const expected = '31/05/2019';
        const actual = getExpiredDate(expDateState);

        expect(actual).toBe(expected);
      });
    });

    describe('NumberOfDaysAfterEOM', () => {
      it('returns correct expired date', () => {
        const expDateState = {
          invoice: {
            issueDate: '2019-04-30',
            expirationTerm: 'NumberOfDaysAfterEOM',
            expirationDays: '32',
          },
        };
        const expected = '01/06/2019';
        const actual = getExpiredDate(expDateState);

        expect(actual).toBe(expected);
      });
    });

    describe('Prepaid', () => {
      it('returns issueDate', () => {
        const expDateState = {
          invoice: {
            issueDate: '2019-04-30',
            expirationTerm: 'Prepaid',
            expirationDays: '32',
          },
        };
        const expected = '30/04/2019';
        const actual = getExpiredDate(expDateState);

        expect(actual).toBe(expected);
      });
    });

    describe('CashOnDelivery', () => {
      it('returns issueDate', () => {
        const expDateState = {
          invoice: {
            issueDate: '2019-04-30',
            expirationTerm: 'CashOnDelivery',
            expirationDays: '32',
          },
        };
        const expected = '30/04/2019';
        const actual = getExpiredDate(expDateState);

        expect(actual).toBe(expected);
      });
    });
  });

  describe('getInvoice Payload', () => {
    it('should return correct shape for invoice payload for create and update', () => {
      const expected = {
        id: '1',
        contactId: '3',
        contactName: 'Cow Feed 3',
        expirationTerm: 'Prepaid',
        expirationDays: 0,
        chargeForLatePayment: 123.12,
        discountForEarlyPayment: 3546.34,
        numberOfDaysForDiscount: 10,
        taxInclusive: true,
        amountPaid: '10.00',
        number: '0000012334563456',
        address: 'Patrick Bateman\n34 Bailey Avenue\nMoorabbin Victoria 3025\nAustralia',
        issueDate: '2018-11-02',
        orderNumber: '123',
        notes: 'Thank you!',
        lines: [
          {
            id: '345',
            description: 'Yak shaving - 1/2 an hour',
            allocatedAccountId: '123',
            amount: '48.50',
            taxCodeId: '124',
          },
        ],
      };

      const actual = getInvoicePayload(state);

      expect(actual).toEqual(expected);
    });
  });

  describe('getTotalsAndAmounts', () => {
    it('should calculate amount due correctly', () => {
      const expected = {
        subTotal: '$123.55',
        totalTax: '-$4.45',
        totalAmount: '$128.00',
        amountPaid: '$10.00',
        amountDue: '$118.00',
      };
      const actual = getTotalsAndAmounts(state);

      expect(actual).toEqual(expected);
    });
  });
});
