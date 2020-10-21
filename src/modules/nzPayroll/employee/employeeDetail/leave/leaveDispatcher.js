import { UPDATE_HOLIDAY_PAY, UPDATE_LEAVE_DETAILS } from './leaveIntents';

const leaveDispatcher = (store) => ({
  updateLeaveDetails: ({ key, value }) => {
    const intent = UPDATE_LEAVE_DETAILS;
    store.dispatch({
      intent,
      key,
      value,
    });
  },
  updateHolidayPay: ({ key, value }) => {
    const intent = UPDATE_HOLIDAY_PAY;
    store.dispatch({
      intent,
      key,
      value,
    });
  },
});

export default leaveDispatcher;
