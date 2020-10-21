import { UPDATE_HOLIDAY_PAY, UPDATE_LEAVE_DETAILS } from '../leaveIntents';
import leaveReducer from '../leaveReducer';

describe('leaveReducer', () => {
  it('should format the holiday pay', () => {
    const reducer = leaveReducer[UPDATE_HOLIDAY_PAY];
    const state = { payrollDetails: { leave: { holidayPayRate: '23' } } };

    const action = { key: 'holidayPayRate', value: '46.5' };
    expect(reducer(state, action)).toMatchObject({
      payrollDetails: { leave: { holidayPayRate: '46.50' } },
    });
    expect(reducer(state, action)).toMatchObject({
      isPageEdited: true,
    });
  });

  it('should update the leave details for given prop', () => {
    const reducer = leaveReducer[UPDATE_LEAVE_DETAILS];
    const state = {
      payrollDetails: { leave: { sickLeaveOpeningBalance: 'value' } },
    };

    const action = {
      intent: UPDATE_LEAVE_DETAILS,
      key: 'sickLeaveOpeningBalance',
      value: 'new value',
    };

    expect(reducer(state, action)).toMatchObject({
      payrollDetails: { leave: { sickLeaveOpeningBalance: 'new value' } },
    });
    expect(reducer(state, action)).toMatchObject({
      isPageEdited: true,
    });
  });
});
