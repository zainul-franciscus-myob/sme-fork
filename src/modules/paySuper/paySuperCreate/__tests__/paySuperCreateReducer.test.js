import { SET_INLINE_ALERT_MESSAGE } from '../paySuperCreateIntents';
import createReducer from '../paySuperCreateReducer';

describe('PaySuperCreateReducer', () => {
  it('should set inlinError for employee payments mapped to error response', () => {
    const expectedErrorEmp1 = 'Membership should not be empty.';
    const expectedErrorEmp2 = 'Membership number is too long.';
    const expectedErrors = {
      950: expectedErrorEmp1,
      956: expectedErrorEmp2,
      957: expectedErrorEmp1,
      958: undefined,
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
          inlineError: '950: some error from previous action',
          isSelected: true,
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
          isSelected: true,
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
          inlineError: '957: some error from previous action',
          isSelected: true,
        },
        {
          amount: 210.22,
          date: '25/06/2019',
          employeeName: 'John Smith',
          employeeId: 1,
          employeePaymentEventId: 958,
          employeePaymentEventLineId: 4988,
          payItemName: 'Superannuation Guarantee',
          superannuationFundId: 6,
          superannuationFundName: 'Friday Superannuation Fund',
          accountId: 46,
          inlineError: '958: some error from previous action',
          isSelected: false,
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

  it('should clear inlineError for employee payments when no inlineErrors received', () => {
    const action = {
      intent: SET_INLINE_ALERT_MESSAGE,
      inlineErrors: undefined,
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
          isSelected: true,
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
          isSelected: true,
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
          isSelected: true,
        },
      ],
    };

    const result = createReducer(state, action);

    result.superPayments.forEach((payment) => {
      expect(payment.inlineError).toBeUndefined();
    });
  });
});
