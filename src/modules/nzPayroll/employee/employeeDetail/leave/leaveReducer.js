import { UPDATE_HOLIDAY_PAY, UPDATE_LEAVE_DETAILS } from './leaveIntents';
import formatNumberWithDecimalScaleRange from '../../../../../common/valueFormatters/formatNumberWithDecimalScaleRange';

const setLeaveDetails = (state, partialLeaveDetails) => ({
  ...state,
  isPageEdited: true,
  payrollDetails: {
    ...state.payrollDetails,
    leave: {
      ...state.payrollDetails.leave,
      ...partialLeaveDetails,
    },
  },
});

const updateLeaveDetails = (state, { key, value }) => {
  const partialLeaveDetails = {
    [key]: value,
  };
  return setLeaveDetails(state, partialLeaveDetails);
};

const updateHolidayPay = (state, { value }) => {
  const partialLeaveDetails = {
    holidayPayRate: formatNumberWithDecimalScaleRange(value, 2, 2),
  };
  return setLeaveDetails(state, partialLeaveDetails);
};

export default {
  [UPDATE_LEAVE_DETAILS]: updateLeaveDetails,
  [UPDATE_HOLIDAY_PAY]: updateHolidayPay,
};
