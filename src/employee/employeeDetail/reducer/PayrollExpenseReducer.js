const setPayrollExpenseState = (state, partialExpenseDetails) => ({
  ...state,
  payrollDetails: {
    ...state.payrollDetails,
    employerExpenseDetails: {
      ...state.payrollDetails.employerExpenseDetails,
      ...partialExpenseDetails,
    },
  },
  isPageEdited: true,
});

export const addPayrollExpensePayItem = (state, { payItem }) => {
  const updatedPayItems = [
    ...state.payrollDetails.employerExpenseDetails.expensePayItems,
    payItem,
  ];
  const partialExpenseDetails = { expensePayItems: updatedPayItems };

  return setPayrollExpenseState(state, partialExpenseDetails);
};

export const removePayrollExpensePayItem = (state, action) => {
  const updatedPayItems = state.payrollDetails.employerExpenseDetails.expensePayItems
    .filter(payItem => payItem.id !== action.id);
  const partialExpenseDetails = { expensePayItems: updatedPayItems };

  return setPayrollExpenseState(state, partialExpenseDetails);
};
