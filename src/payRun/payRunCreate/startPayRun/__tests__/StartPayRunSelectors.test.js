import {
  getCurrentEditingPayRun,
  getDateOfPayment,
  getDraftPayRun,
  getPayPeriodEnd,
  getPayPeriodStart,
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

  describe('getCurrentEditingPayRun', () => {
    it('returns the current editing pay run', () => {
      const state = {
        startPayRun: {
          currentEditingPayRun: {
            something: 'something',
          },
        },
      };
      const expected = { something: 'something' };

      const actual = getCurrentEditingPayRun(state);

      expect(actual).toEqual(expected);
    });
  });
});
