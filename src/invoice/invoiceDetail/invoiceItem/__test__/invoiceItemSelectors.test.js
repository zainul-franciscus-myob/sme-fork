import {
  getAmountDue,
  getDisplayDaysForMonth,
  getExpirationTermsLabel,
  getExpiredDate,
  getPaymentTermsPopoverLabel,
  getShowExpirationDaysAmountInput,
  getShowExpiryDaysOptions,
} from '../invoiceItemSelectors';

describe('InvoiceItemSelectors', () => {
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
  describe('getPaymentTermsPopoverLabel', () => {
    it('Returns the text label when the term is Prepaid', () => {
      const expDateState = {
        invoice: {
          issueDate: '2019-02-04',
          expirationTerm: 'Prepaid',
        },
        expirationTerms: [
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
        expirationTerms: [
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
        const state = {
          invoice: {
            expirationTerm,
          },
        };
        const actual = getShowExpiryDaysOptions(state);
        expect(actual).toBe(expected);
      });
    });
  });
  describe('getExpirationTermsLabel', () => {
    it('returns the label for the expiration terms popover input', () => {
      const state = {
        invoice: {
          expirationTerm: 'InAGivenNumberOfDays',
        },
      };
      const expected = 'days after the issue date';
      const actual = getExpirationTermsLabel(state);
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
        const state = {
          invoice: {
            expirationTerm: 'OnADayOfTheMonth',
          },
        };
        const displayDays = getDisplayDaysForMonth(state);
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
        const state = {
          invoice: {
            expirationTerm: 'DayOfMonthAfterEOM',
          },
        };
        const displayDays = getDisplayDaysForMonth(state);
        const actualDay = displayDays.find(dayItem => dayItem.value === day);
        expect(actualDay.name).toEqual(displayDay);
      });
    });
  });
  describe('getShowExpiryDays', () => {
    it('returns false when the payment term is Due on a date of this month', () => {
      const state = {
        invoice: {
          expirationTerm: 'OnADayOfTheMonth',
        },
      };
      expect(getShowExpirationDaysAmountInput(state)).toBeFalsy();
    });
    it('returns false when the payment term is Due on a date of next month', () => {
      const state = {
        invoice: {
          expirationTerm: 'DayOfMonthAfterEOM',
        },
      };
      expect(getShowExpirationDaysAmountInput(state)).toBeFalsy();
    });
    it('returns true when the payment term is due in a number of days after the issue date', () => {
      const state = {
        invoice: {
          expirationTerm: 'InAGivenNumberOfDays',
        },
      };
      expect(getShowExpirationDaysAmountInput(state)).toBeTruthy();
    });
    it('returns true when the payment term is due in a number of days after the end of the month', () => {
      const state = {
        invoice: {
          expirationTerm: 'NumberOfDaysAfterEOM',
        },
      };
      expect(getShowExpirationDaysAmountInput(state)).toBeTruthy();
    });
  });
  describe('getAmountDue', () => {
    it('removes the currency symbol from the total amount due', () => {
      const state = {
        totals: {
          displayAmountDue: '$152.85',
        },
      };
      expect(getAmountDue(state)).toEqual('152.85');
    });
  });
});
