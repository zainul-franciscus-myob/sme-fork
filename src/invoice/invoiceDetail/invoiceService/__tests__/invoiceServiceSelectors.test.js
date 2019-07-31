import {
  getDisplayDaysForMonth,
  getExpirationTermsLabel,
  getExpiredDate,
  getInvoiceOptions,
  getInvoicePayload,
  getPaymentTermsPopoverLabel,
  getShowExpirationDaysAmountInput,
  getShowExpiryDaysOptions,
  getTotalsAndAmounts,
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
        isAllowOnlinePayments: true,
        hasSetUpOnlinePayments: false,
        setUpOnlinePaymentsLink: 'https://paydirectonline.myob.com/payments?cdf=abc&sn=000000000000',
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
    it('returns correct shape for invoice payload for create and update', () => {
      const expected = {
        id: '1',
        contactId: '3',
        contactName: 'Cow Feed 3',
        expirationTerm: 'Prepaid',
        expirationDays: 0,
        chargeForLatePayment: 123.12,
        discountForEarlyPayment: 3546.34,
        numberOfDaysForDiscount: 10,
        isAllowOnlinePayments: true,
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
  describe('getPaymentTermsPopoverLabel', () => {
    it('Returns the text label when the term is Prepaid', () => {
      const expDateState = {
        invoice: {
          issueDate: '2019-02-04',
          expirationTerm: 'Prepaid',
        },
        expirationTermOptions: [
          {
            value: 'Prepaid',
            name: 'Prepaid',
          },
        ],
      };
      const expected = 'Prepaid';
      const actual = getPaymentTermsPopoverLabel(expDateState);

      expect(actual).toBe(expected);
    });
    it('Returns the text label when the term is Cash on Delivery', () => {
      const expDateState = {
        invoice: {
          issueDate: '2019-02-04',
          expirationTerm: 'CashOnDelivery',
        },
        expirationTermOptions: [
          {
            value: 'CashOnDelivery',
            name: 'C.O.D.',
          },
        ],
      };
      const expected = 'C.O.D.';
      const actual = getPaymentTermsPopoverLabel(expDateState);

      expect(actual).toBe(expected);
    });
    it('Returns the expiration date as the label when the term is not COD or Prepaid', () => {
      const expDateState = {
        invoice: {
          issueDate: '2019-02-04',
          expirationTerm: 'SomeOtherExpirationTerm',
        },
      };
      const expected = '04/02/2019';
      const actual = getPaymentTermsPopoverLabel(expDateState);

      expect(actual).toBe(expected);
    });
  });
  describe('getShowExpiryDaysOptions', () => {
    [
      ['OnADayOfTheMonth', true],
      ['InAGivenNumberOfDays', true],
      ['DayOfMonthAfterEOM', true],
      ['NumberOfDaysAfterEOM', true],
      ['CashOnDelivery', false],
      ['Prepaid', false],
    ].forEach((args) => {
      const [expirationTerm, expected] = args;
      it('returns true when the expiry days input should be displayed', () => {
        const invoiceState = {
          invoice: {
            expirationTerm,
          },
        };
        const actual = getShowExpiryDaysOptions(invoiceState);
        expect(actual).toBe(expected);
      });
    });
  });
  describe('getExpirationTermsLabel', () => {
    it('returns the label for the expiration terms popover input', () => {
      const invoiceState = {
        invoice: {
          expirationTerm: 'InAGivenNumberOfDays',
        },
      };
      const expected = 'days after the issue date';
      const actual = getExpirationTermsLabel(invoiceState);
      expect(actual).toEqual(expected);
    });
  });
  describe('getDisplayDaysForCurrentMonth', () => {
    [
      ['1st', '1'],
      ['2nd', '2'],
      ['10th', '10'],
      ['21st', '21'],
    ].forEach((args) => {
      it('returns a display value for days of the current month when the term is On a day of the month', () => {
        const [displayDay, day] = args;
        const invoiceState = {
          invoice: {
            expirationTerm: 'OnADayOfTheMonth',
          },
        };
        const displayDays = getDisplayDaysForMonth(invoiceState);
        const actualDay = displayDays.find(dayItem => dayItem.value === day);
        expect(actualDay.name).toEqual(displayDay);
      });
    });
  });
  describe('getDisplayDaysForNextMonth', () => {
    [
      ['1st', '1'],
      ['2nd', '2'],
      ['10th', '10'],
      ['21st', '21'],
    ].forEach((args) => {
      it('returns a display value for days of the next month when term is day of next month', () => {
        const [displayDay, day] = args;
        const invoiceState = {
          invoice: {
            expirationTerm: 'DayOfMonthAfterEOM',
          },
        };
        const displayDays = getDisplayDaysForMonth(invoiceState);
        const actualDay = displayDays.find(dayItem => dayItem.value === day);
        expect(actualDay.name).toEqual(displayDay);
      });
    });
  });
  describe('getShowExpiryDays', () => {
    it('returns true when the payment term is Due on a date of this month', () => {
      const invoiceState = {
        invoice: {
          expirationTerm: 'OnADayOfTheMonth',
        },
      };
      expect(getShowExpirationDaysAmountInput(invoiceState)).toBeFalsy();
    });
    it('returns true when the payment term is Due on a date of next month', () => {
      const invoiceState = {
        invoice: {
          expirationTerm: 'DayOfMonthAfterEOM',
        },
      };
      expect(getShowExpirationDaysAmountInput(invoiceState)).toBeFalsy();
    });
    it('returns false when the payment term is due in a number of days after the issue date', () => {
      const invoiceState = {
        invoice: {
          expirationTerm: 'InAGivenNumberOfDays',
        },
      };
      expect(getShowExpirationDaysAmountInput(invoiceState)).toBeTruthy();
    });
    it('returns false when the payment term is due in a number of days after the end of the month', () => {
      const invoiceState = {
        invoice: {
          expirationTerm: 'NumberOfDaysAfterEOM',
        },
      };
      expect(getShowExpirationDaysAmountInput(invoiceState)).toBeTruthy();
    });
  });
});
