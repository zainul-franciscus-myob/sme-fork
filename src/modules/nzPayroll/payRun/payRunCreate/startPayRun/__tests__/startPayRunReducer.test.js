import { SET_PAY_PERIOD_DETAILS, START_NEW_PAY_RUN } from '../../PayRunIntents';
import { calculateEndDate } from '../startPayRunReducer';
import payRunReducer from '../../payRunReducer';
import startNewPayRun from '../../../mappings/data/payRun/startNewPayRun.json';

describe('startPayRunReducer', () => {
  describe('startNewPayRun', () => {
    it('should set default start date', () => {
      const state = {
        startPayRun: {
          currentEditingPayRun: {
            paymentFrequency: '',
            paymentDate: '',
            payPeriodStart: '',
            payPeriodEnd: '',
          },
        },
      };

      const action = {
        intent: START_NEW_PAY_RUN,
        ...startNewPayRun,
      };

      const expected = {
        startPayRun: {
          currentEditingPayRun: {
            paymentFrequency: 'Weekly',
            paymentDate: '',
            payPeriodStart: '',
            payPeriodEnd: '',
          },
          regularPayCycleOptions:
            startNewPayRun.newPayRunDetails.regularPayCycleOptions,
        },
      };

      const actual = payRunReducer(state, action);
      expect(actual).toEqual(expected);
    });
  });

  describe('setPayPeriodDetails', () => {
    it('should clear all date fields when the payment frequency is changed', () => {
      const state = {
        startPayRun: {
          currentEditingPayRun: {
            paymentFrequency: '',
            paymentDate: '2019-08-01',
            payPeriodStart: '2019-08-01',
            payPeriodEnd: '2019-08-01',
          },
        },
      };
      const action = {
        intent: SET_PAY_PERIOD_DETAILS,
        key: 'paymentFrequency',
        value: 'Weekly',
      };

      const result = payRunReducer(state, action);

      expect(result.startPayRun.currentEditingPayRun.paymentDate).toEqual('');
      expect(result.startPayRun.currentEditingPayRun.payPeriodStart).toEqual(
        ''
      );
      expect(result.startPayRun.currentEditingPayRun.payPeriodEnd).toEqual('');
    });

    it('should update only end date when modifying end date', () => {
      const state = {
        startPayRun: {
          currentEditingPayRun: {
            paymentFrequency: 'weekly',
            paymentDate: '2019-08-01',
            payPeriodStart: '2019-08-01',
            payPeriodEnd: '2019-08-01',
          },
        },
      };
      const action = {
        intent: SET_PAY_PERIOD_DETAILS,
        key: 'payPeriodEnd',
        value: '2019-08-02',
      };

      const result = payRunReducer(state, action);

      expect(result.startPayRun.currentEditingPayRun.payPeriodEnd).toEqual(
        '2019-08-02'
      );

      expect(result.startPayRun.currentEditingPayRun.payPeriodStart).toEqual(
        '2019-08-01'
      );
      expect(result.startPayRun.currentEditingPayRun.paymentDate).toEqual(
        '2019-08-01'
      );
      expect(result.startPayRun.currentEditingPayRun.paymentFrequency).toEqual(
        'weekly'
      );
    });

    describe('payment date', () => {
      it('Setting the start date should set end date and payment date', () => {
        const state = {
          startPayRun: {
            currentEditingPayRun: {
              paymentFrequency: 'FourWeekly',
              paymentDate: '',
              payPeriodStart: '',
              payPeriodEnd: '',
            },
          },
        };
        const action = {
          intent: SET_PAY_PERIOD_DETAILS,
          key: 'payPeriodStart',
          value: '2019-08-01',
        };

        const result = payRunReducer(state, action);

        expect(result.startPayRun.currentEditingPayRun.payPeriodEnd).toEqual(
          '2019-08-28'
        );
        expect(result.startPayRun.currentEditingPayRun.paymentDate).toEqual(
          '2019-08-29'
        );
      });
    });
  });

  describe('calculateEndDate', () => {
    describe('weekly pay period', () => {
      it('sets the end date 6 days forward', () => {
        const endDate = calculateEndDate('Weekly', '2019-07-26');

        expect(endDate).toEqual('2019-08-01');
      });
    });

    describe('Fortnightly pay period', () => {
      it('sets the end date 13 days forward', () => {
        const endDate = calculateEndDate('Fortnightly', '2019-07-19');

        expect(endDate).toEqual('2019-08-01');
      });
    });

    describe('Monthly pay period', () => {
      it('sets the end date to 1 day before the start date in the following month', () => {
        const endDate = calculateEndDate('Monthly', '2019-07-11');

        expect(endDate).toEqual('2019-08-10');
      });

      it('sets the end date to the last day of the month when the start date is the 1st', () => {
        const endDate = calculateEndDate('Monthly', '2019-08-01');

        expect(endDate).toEqual('2019-08-31');
      });

      it('sets the end date to the last day of a 30 day month when the start date is the 1st', () => {
        const endDate = calculateEndDate('Monthly', '2019-06-01');

        expect(endDate).toEqual('2019-06-30');
      });

      it('sets the end date to the last day of a 29 day month when the start date is the 1st', () => {
        const endDate = calculateEndDate('Monthly', '2020-02-01');

        expect(endDate).toEqual('2020-02-29');
      });

      it('sets the end date to the last day of a 28 day month when the start date is the 1st', () => {
        const endDate = calculateEndDate('Monthly', '2019-02-01');

        expect(endDate).toEqual('2019-02-28');
      });

      it('sets the end date to the first day of the next month when the start date is the second day', () => {
        const endDate = calculateEndDate('Monthly', '2019-02-02');

        expect(endDate).toEqual('2019-03-01');
      });
    });

    describe('Four weekly pay period', () => {
      it('adds 27 days to any given date', () => {
        const startDate = '2019-02-01';

        const endDate = calculateEndDate('FourWeekly', startDate);

        expect(endDate).toEqual('2019-02-28');
      });

      it('calculates end date in the following year', () => {
        const startDate = '2019-12-31';

        const endDate = calculateEndDate('FourWeekly', startDate);

        expect(endDate).toEqual('2020-01-27');
      });

      it('calculates end date the next month given a leap year', () => {
        const startDate = '2020-02-29';

        const endDate = calculateEndDate('FourWeekly', startDate);

        expect(endDate).toEqual('2020-03-27');
      });
    });
  });
});
