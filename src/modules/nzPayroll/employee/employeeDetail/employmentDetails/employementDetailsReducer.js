import { UPDATE_EMPLOYMENT_DETAIL } from './employementDetailsIntents';

const updateEmploymentDetails = (state, action) => ({
  ...state,
  isPageEdited: true,
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
