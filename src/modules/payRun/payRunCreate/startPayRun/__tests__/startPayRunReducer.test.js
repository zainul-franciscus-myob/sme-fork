import {
  SET_PAY_PERIOD_DETAILS,
  SET_UNPROCESSED_TIMESHEET_LINES,
  START_NEW_PAY_RUN,
} from '../../PayRunIntents';
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
          draftPayRun: null,
        },
      };

      const action = {
        intent: START_NEW_PAY_RUN,
        ...startNewPayRun,
      };

      const expected = {
        startPayRun: {
          currentEditingPayRun: {
            paymentFrequency: 'Fortnightly',
            paymentDate: '',
            payPeriodStart: '',
            payPeriodEnd: '',
          },
          regularPayCycleOptions:
            startNewPayRun.newPayRunDetails.regularPayCycleOptions,
          draftPayRun: startNewPayRun.draftPayRun,
          isTimesheetUsed: true,
          startOfFinancialYearDate: '2019-07-01T00:00:00',
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
              paymentFrequency: 'TwiceAMonth',
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
          '2019-08-15'
        );
        expect(result.startPayRun.currentEditingPayRun.paymentDate).toEqual(
          '2019-08-16'
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

    describe('Twice a month pay period', () => {
      it('adds 14 days to dates before the 15th of the month', () => {
        const startDate = '2019-02-01';

        const endDate = calculateEndDate('TwiceAMonth', startDate);

        expect(endDate).toEqual('2019-02-15');
      });

      it('adds 12 days to dates after the 15th on a 28 day month', () => {
        const endDate = calculateEndDate('TwiceAMonth', '2019-02-16');

        expect(endDate).toEqual('2019-02-28');
      });

      it('adds 13 days to dates after the 15th on a 29 day month', () => {
        const endDate = calculateEndDate('TwiceAMonth', '2020-02-18');

        expect(endDate).toEqual('2020-03-02');
      });

      it('adds 14 days to dates after the 15th on a 30 day month', () => {
        const endDate = calculateEndDate('TwiceAMonth', '2019-09-20');

        expect(endDate).toEqual('2019-10-04');
      });

      it('adds 15 days to dates after the 15th on a 31 day month', () => {
        const endDate = calculateEndDate('TwiceAMonth', '2019-08-16');

        expect(endDate).toEqual('2019-08-31');
      });
    });
  });

  describe('setUnprocessedTimesheetLines', () => {
    it('sets unprocessed timesheet lines', () => {
      const state = {
        unprocessedTimesheetLines: [],
        timesheets: [
          {
            isSelected: true,
            timesheetLines: [
              {
                one: 'one',
              },
              {
                two: 'two',
              },
            ],
          },
          {
            isSelected: false,
            timesheetLines: [
              {
                three: 'three',
              },
            ],
          },
          {
            isSelected: true,
            timesheetLines: [
              {
                four: 'four',
              },
            ],
          },
        ],
      };
      const expected = {
        ...state,
        unprocessedTimesheetLines: [
          {
            one: 'one',
          },
          {
            two: 'two',
          },
          {
            four: 'four',
          },
        ],
      };

      const actual = payRunReducer(state, {
        intent: SET_UNPROCESSED_TIMESHEET_LINES,
      });

      expect(actual).toEqual(expected);
    });
  });
});
