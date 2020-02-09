import {
  ADD_PAYROLL_SUPER_PAY_ITEM,
  REMOVE_PAYROLL_SUPER_PAY_ITEM,
  SET_SHOW_ADD_SUPER_PAY_ITEM,
  UPDATE_PAYROLL_DETAILS_SUPERANNUATION_DETAILS,
} from '../../../EmployeeIntents';

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

const addPayrollSuperPayItem = (state, action) => {
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

const removePayrollSuperPayItem = (state, action) => {
  const updatedPayItems = state.payrollDetails.superannuationDetails.allocatedPayItems.filter(
    payItem => payItem.id !== action.id,
  );
  const partialSuperDetails = { allocatedPayItems: updatedPayItems };

  return setPayrollSuperDetailsState(state, partialSuperDetails);
};

const updatePayrollDetailsSuperannuationDetails = (state, action) => ({
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

const showAddSuperPayItemDropdown = (state, action) => ({
  ...state,
  payrollDetails: {
    ...state.payrollDetails,
    superannuationDetails: {
      ...state.payrollDetails.superannuationDetails,
      showAddSuperPayItemButton: action.showDropdown,
    },
  },
});

export default {
  [UPDATE_PAYROLL_DETAILS_SUPERANNUATION_DETAILS]: updatePayrollDetailsSuperannuationDetails,
  [ADD_PAYROLL_SUPER_PAY_ITEM]: addPayrollSuperPayItem,
  [REMOVE_PAYROLL_SUPER_PAY_ITEM]: removePayrollSuperPayItem,
  [SET_SHOW_ADD_SUPER_PAY_ITEM]: showAddSuperPayItemDropdown,
};
