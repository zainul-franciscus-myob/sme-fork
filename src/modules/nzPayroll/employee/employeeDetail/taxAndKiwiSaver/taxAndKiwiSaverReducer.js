import { UPDATE_TAX_DETAIL } from '../EmployeeDetailIntents';

const updateTaxDetails = (state, action) => ({
  ...state,

  userInterface: {
    ...state.userInterface,
    isPageEdited: true,
  },

  payrollDetails: {
    ...state.payrollDetails,
    tax: {
      ...state.payrollDetails.tax,
      [action.key]: action.value,
    },
  },
});

export default {
  [UPDATE_TAX_DETAIL]: updateTaxDetails,
};
