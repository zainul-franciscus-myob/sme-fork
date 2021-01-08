import { LOAD_PAY_RUN_DETAILS } from '../payRunDetailNzIntents';
import payRunListReducer from '../payRunDetailNzReducer';

describe('Pay run detail reducer', () => {
  describe('Load pay run details', () => {
    it('Should update state with pay run details', () => {
      const state = {};

      const action = {
        intent: LOAD_PAY_RUN_DETAILS,
        response: {
          totalTakeHomePay: '5893.45',
          paymentPeriodStart: '2019-07-09',
          paymentPeriodEnd: '2017-06-02',
          paymentDate: '2019-07-03',
          employeeList: [
            {
              id: 124,
              name: 'Lionel Messi',
              takeHomePay: '750.26',
            },
            {
              id: 125,
              name: 'Diego Maradona',
              takeHomePay: '2008.26',
            },
          ],
        },
      };

      const expected = {
        totalTakeHomePay: '5893.45',
        paymentPeriodStart: '2019-07-09',
        paymentPeriodEnd: '2017-06-02',
        paymentDate: '2019-07-03',
        employeeList: [
          {
            id: 124,
            name: 'Lionel Messi',
            takeHomePay: '750.26',
          },
          {
            id: 125,
            name: 'Diego Maradona',
            takeHomePay: '2008.26',
          },
        ],
      };

      const actual = payRunListReducer(state, action);
      expect(actual).toEqual(expected);
    });
  });
});
