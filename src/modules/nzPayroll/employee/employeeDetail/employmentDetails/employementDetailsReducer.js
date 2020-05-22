import { UPDATE_EMPLOYMENT_DETAIL } from '../EmployeeDetailIntents';

const updateEmploymentDetails = (state, action) => ({
  ...state,

  userInterface: {
    ...state.userInterface,
    isPageEdited: true,
  },

  payrollDetails: {
    ...state.payrollDetails,
    employmentDetails: {
      ...state.payrollDetails.employmentDetails,
      [action.key]: action.value,
    },
  },
});

export default {
  [UPDATE_EMPLOYMENT_DETAIL]: updateEmploymentDetails,
};
