const setPayrollSuperDetailsState = (state, partialSuperDetails) => ({
  ...state,
  payrollDetails: {
    ...state.payrollDetails,
    superannuationDetails: {
      ...state.payrollDetails.superannuationDetails,
      ...partialSuperDetails,
    },
  },
  isPageEdited: true,
});

export const addPayrollSuperPayItem = (state, action) => {
  const updatedPayItems = [
    ...state.payrollDetails.superannuationDetails.allocatedPayItems,
    {
      id: action.id,
      name: action.name,
      type: action.type,
      displayType: action.displayType,
    },
  ];
  const partialSuperDetails = { allocatedPayItems: updatedPayItems };

  return setPayrollSuperDetailsState(state, partialSuperDetails);
};

export const removePayrollSuperPayItem = (state, action) => {
  const updatedPayItems = state.payrollDetails.superannuationDetails.allocatedPayItems.filter(
    payItem => payItem.id !== action.id,
  );
  const partialSuperDetails = { allocatedPayItems: updatedPayItems };

  return setPayrollSuperDetailsState(state, partialSuperDetails);
};

export const updatePayrollDetailsSuperannuationDetails = (state, action) => ({
  ...state,
  payrollDetails: {
    ...state.payrollDetails,
    superannuationDetails: {
      ...state.payrollDetails.superannuationDetails,
      [action.key]: action.value,
    },
  },
  isPageEdited: true,
});
