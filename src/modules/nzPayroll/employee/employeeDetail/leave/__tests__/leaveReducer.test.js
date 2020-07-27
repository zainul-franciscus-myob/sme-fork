import { UPDATE_LEAVE_DETAILS } from '../leaveIntents';
import leaveReducer from '../leaveReducer';

describe('leaveReducer', () => {
  const reducer = leaveReducer[UPDATE_LEAVE_DETAILS];

  it('should update the leave details for given prop', () => {
    const state = { payrollDetails: { leave: { holidayPay: 'value' } } };

    const action = { key: 'holidayPay', value: 'new value' };

    expect(reducer(state, action)).toMatchObject({
      payrollDetails: { leave: { holidayPay: 'new value' } },
    });
    expect(reducer(state, action)).toMatchObject({
      isPageEdited: true,
    });
  });
});
