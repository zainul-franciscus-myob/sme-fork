import { UPDATE_WAGE_DETAIL } from './salaryAndWagesIntents';

const updateWageDetails = (state, { key, value }) => ({
  ...state,
  isPageEdited: true,
  payrollDetails: {
    ...state.payrollDetails,
    wage: {
      ...state?.payrollDetails?.wage,
      [key]: value,
    },
  },
});

export default {
  [UPDATE_WAGE_DETAIL]: updateWageDetails,
};
