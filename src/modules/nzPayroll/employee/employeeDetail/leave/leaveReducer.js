
import { UPDATE_LEAVE_DETAILS } from '../EmployeeDetailIntents';

const updateLeaveDetails = (state, action) => ({
  ...state,

  userInterface: {
    ...state.userInterface,
    isPageEdited: true,
  },

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
