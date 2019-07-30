export const updatePayrollEmployeeDetail = (state, action) => ({
  ...state,
  payrollDetails: {
    ...state.payrollDetails,
    employmentDetails: {
      ...state.payrollDetails.employmentDetails,
      [action.key]: action.value,
    },
  },
  isPageEdited: true,
});

const setPayrollDeductionState = (state, partialDeductionDetails) => ({
  ...state,
  payrollDetails: {
    ...state.payrollDetails,
    deductionDetails: {
      ...state.payrollDetails.deductionDetails,
      ...partialDeductionDetails,
    },
  },
  isPageEdited: true,
});

export const addPayrollDeductionPayItem = (state, action) => {
  const updatedPayItems = [
    ...state.payrollDetails.deductionDetails.deductionPayItems,
    { id: action.id, name: action.name, type: action.type },
  ];
  const partialDeductionDetails = { deductionPayItems: updatedPayItems };

  return setPayrollDeductionState(state, partialDeductionDetails);
};

export const removePayrollDeductionPayItem = (state, action) => {
  const updatedPayItems = state.payrollDetails.deductionDetails.deductionPayItems
    .filter(payItem => payItem.id !== action.id);
  const partialDeductionDetails = { deductionPayItems: updatedPayItems };

  return setPayrollDeductionState(state, partialDeductionDetails);
};
