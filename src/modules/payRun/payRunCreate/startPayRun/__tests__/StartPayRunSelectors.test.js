import {
  getDateOfPayment,
  getDraftPayRun,
  getLoadEmployeePaysRequestContent,
  getPayPeriodEnd,
  getPayPeriodStart,
  getTimesheetRequiredFieldsFilled,
} from '../StartPayRunSelectors';

describe('StartPayRunSelectors', () => {
  describe('getDraftPayRun', () => {
    it('returns draft pay run', () => {
      const state = {
        startPayRun: {
          draftPayRun: {
            something: 'something',
          },
        },
      };
      const expected = { something: 'something' };

      const actual = getDraftPayRun(state);

      expect(actual).toEqual(expected);
    });
  });

  describe('getPayPeriodStart', () => {
    it('returns pay period start', () => {
      const state = {
        startPayRun: {
          draftPayRun: {
            payPeriodStart: 'payPeriodStart',
          },
        },
      };
      const expected = 'payPeriodStart';

      const actual = getPayPeriodStart(state);

      expect(actual).toEqual(expected);
    });
  });

  describe('getPayPeriodEnd', () => {
    it('returns pay period end', () => {
      const state = {
        startPayRun: {
          draftPayRun: {
            payPeriodEnd: 'payPeriodEnd',
          },
        },
      };
      const expected = 'payPeriodEnd';

      const actual = getPayPeriodEnd(state);

      expect(actual).toEqual(expected);
    });
  });


  describe('getDateOfPayment', () => {
    it('returns date of payment', () => {
      const state = {
        startPayRun: {
          draftPayRun: {
            paymentDate: 'paymentDate',
          },
        },
      };
      const expected = 'paymentDate';

      const actual = getDateOfPayment(state);

      expect(actual).toEqual(expected);
    });
  });

  describe('getLoadEmployeePaysRequestContent', () => {
    it('returns request content of loadEmployeePays endpoint', () => {
      const state = {
        startPayRun: {
          currentEditingPayRun: {
            something: 'something',
          },
        },
        unprocessedTimesheetLines: [
          {
            timesheetLine: 'timesheetLine',
          },
        ],
      };
      const expected = {
        something: 'something',
        unprocessedTimesheetLines: [{
          timesheetLine: 'timesheetLine',
        }],
      };

      const actual = getLoadEmployeePaysRequestContent(state);

      expect(actual).toEqual(expected);
    });
  });

  describe('getTimesheetRequiredFieldsFilled', () => {
    const state = {
      startPayRun: {
        currentEditingPayRun: {
          paymentFrequency: 'Weekly',
          paymentDate: '2020-03-13',
          payPeriodStart: '2020-03-13',
          payPeriodEnd: '2020-03-13',
        },
      },
    };

    it('returns true if all four fields are populated', () => {
      const actual = getTimesheetRequiredFieldsFilled(state);

      expect(actual).toBeTruthy();
    });

    it.each([
      'paymentFrequency',
      'paymentDate',
      'payPeriodStart',
      'payPeriodEnd',
    ])('returns false if %s is missing', (missingFieldName) => {
      const stateWithMissingField = {
        startPayRun: {
          currentEditingPayRun: {
            ...state.startPayRun.currentEditingPayRun,
            [missingFieldName]: '',
          },
        },
      };

      const actual = getTimesheetRequiredFieldsFilled(stateWithMissingField);

      expect(actual).toBeFalsy();
    });
  });
});
