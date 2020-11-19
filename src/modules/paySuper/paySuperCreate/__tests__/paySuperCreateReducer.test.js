import { SET_INLINE_ALERT_MESSAGE } from '../paySuperCreateIntents';
import createReducer from '../paySuperCreateReducer';

describe('PaySuperCreateReducer', () => {
  it('should set inlinError for employee payments mapped to error response', () => {
    const expectedErrorEmp1 = 'First JobKeeper fortnight should not be empty.';
    const expectedErrorEmp2 = 'Final JobKeeper fortnight should not be empty.';
    const expectedErrors = {
      950: expectedErrorEmp1,
      956: expectedErrorEmp2,
      957: expectedErrorEmp1,
    };
    const action = {
      intent: SET_INLINE_ALERT_MESSAGE,
      inlineErrors: [
        {
          employeeId: 1,
          message: expectedErrorEmp1,
        },
        {
          employeeId: 2,
          message: expectedErrorEmp2,
        },
      ],
    };

    const state = {
      superPayments: [
        {
          amount: 210.22,
          date: '25/05/2019',
          employeeName: 'John Smith',
          employeeId: 1,
          employeePaymentEventId: 950,
          employeePaymentEventLineId: 4980,
          payItemName: 'Superannuation Guarantee',
          superannuationFundId: 6,
          superannuationFundName: 'Friday Superannuation Fund',
          accountId: 46,
          inlineError: 'some error from previous action',
        },
        {
          amount: 179.68,
          date: '14/06/2019',
          employeeName: 'Grey Skilmaster',
          employeeId: 2,
          employeePaymentEventId: 956,
          employeePaymentEventLineId: 4986,
          payItemName: 'Superannuation Guarantee',
          superannuationFundId: 5,
          superannuationFundName: 'Monday Superannuation Fund',
          accountId: 23,
        },
        {
          amount: 210.22,
          date: '25/06/2019',
          employeeName: 'John Smith',
          employeeId: 1,
          employeePaymentEventId: 957,
          employeePaymentEventLineId: 4987,
          payItemName: 'Superannuation Guarantee',
          superannuationFundId: 6,
          superannuationFundName: 'Friday Superannuation Fund',
          accountId: 46,
          inlineError: 'some error from previous action',
        },
      ],
    };

    const result = createReducer(state, action);

    result.superPayments.forEach((payment) => {
      expect(payment.inlineError).toBe(
        expectedErrors[payment.employeePaymentEventId]
      );
    });
  });
});
