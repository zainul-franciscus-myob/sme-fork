import { UPDATE_WAGE_DETAIL } from '../EmployeeDetailIntents';

const updateWageDetails = (state, { key, value }) => ({
  ...state,

  userInterface: {
    ...state.userInterface,
    isPageEdited: true,
  },

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
