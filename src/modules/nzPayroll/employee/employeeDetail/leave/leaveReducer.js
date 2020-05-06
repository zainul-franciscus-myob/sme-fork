import { UPDATE_LEAVE_DETAILS } from './leaveIntents';

const updateLeaveDetails = (state, action) => ({
  ...state,
  isPageEdited: true,
  payrollDetails: {
    ...state.payrollDetails,
    leave: {
      ...state.payrollDetails.leave,
      [action.key]: action.value,
    },
  },
});

export default {
  [UPDATE_LEAVE_DETAILS]: updateLeaveDetails,
};
