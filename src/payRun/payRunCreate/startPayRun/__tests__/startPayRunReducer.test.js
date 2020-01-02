import { SET_PAY_PERIOD_DETAILS, START_NEW_PAY_RUN } from '../../PayRunIntents';
import payRunReducer from '../../payRunReducer';
import startNewPayRun from '../../../../integration/data/payRun/startNewPayRun.json';

describe('startPayRunReducer', () => {
  describe('startNewPayRun', () => {
    it('should set default start date', () => {
      const state = {
        startPayRun: {
          currentEditingPayRun: {
            paymentFrequency: '',
            paymentDate: '2019-08-01',
            payPeriodStart: '',
            payPeriodEnd: '2019-08-01',
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
            paymentDate: '2019-08-01',
            payPeriodStart: '2019-07-19',
            payPeriodEnd: '2019-08-01',
          },
          regularPayCycleOptions: startNewPayRun.newPayRunDetails.regularPayCycleOptions,
          draftPayRun: startNewPayRun.draftPayRun,
        },
      };

      const actual = payRunReducer(state, action);
      expect(actual).toEqual(expected);
    });
  });

  describe('setPayPeriodDetails should calculate period start date', () => {
    const buildState = (payPeriodEnd, paymentFrequency = '') => ({
      startPayRun: {
        currentEditingPayRun: {
          paymentFrequency,
          paymentDate: payPeriodEnd,
          payPeriodStart: '',
          payPeriodEnd,
        },
      },
    });

    const buildAction = (key, value) => ({
      intent: SET_PAY_PERIOD_DETAILS,
      key,
      value,
    });

    it('should reset period start date when cleared', () => {
      const state = buildState('2019-08-01', 'Weekly');
      const action = buildAction('payPeriodStart', '');

      const actual = payRunReducer(state, action);

      expect(actual.startPayRun.currentEditingPayRun.payPeriodStart).toEqual('2019-07-26');
    });

    it.each([
      ['6 days backward for weekly', '2019-08-01', 'Weekly', '2019-07-26'],
      ['13 days backward for fortnightly', '2019-08-01', 'Fortnightly', '2019-07-19'],
      ['last month when 1 day after the same day in last month exists for monthly', '2019-08-10', 'Monthly', '2019-07-11'],
      ['the start of the month when 1 day after the same day in last month not exists for monthly', '2019-08-31', 'Monthly', '2019-08-01'],
      ['14 days backward for the first half of the month for twice a month', '2019-08-10', 'TwiceAMonth', '2019-07-27'],
      ['15 days backward for the second half of 31 days month for twice a month', '2019-08-30', 'TwiceAMonth', '2019-08-15'],
      ['14 days backward for the second half of 30 days month for twice a month', '2019-06-30', 'TwiceAMonth', '2019-06-16'],
      ['14 days backward for the second half of Feb in leap year for twice a month', '2020-02-20', 'TwiceAMonth', '2020-02-06'],
      ['13 days backward for the second half of Feb in non leap year for twice a month', '2019-02-20', 'TwiceAMonth', '2019-02-07'],
    ])('should set period start date to %s', (_, payPeriodEnd, actionValue, expected) => {
      const state = buildState(payPeriodEnd);
      const action = buildAction('paymentFrequency', actionValue);

      const actual = payRunReducer(state, action);

      expect(actual.startPayRun.currentEditingPayRun.payPeriodStart).toEqual(expected);
    });
  });
});
