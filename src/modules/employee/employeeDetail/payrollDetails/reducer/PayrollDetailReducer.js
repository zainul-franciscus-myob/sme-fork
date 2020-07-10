import {
  ADD_ALLOCATED_LEAVE_ITEM,
  ADD_PAYROLL_DEDUCTION_PAY_ITEM,
  REMOVE_ALLOCATED_LEAVE_ITEM,
  REMOVE_PAYROLL_DEDUCTION_PAY_ITEM,
  SET_ALLOCATED_LEAVE_ITEM_MODAL,
  SET_SHOW_ADD_PAY_ITEM_BUTTON,
  UPDATE_ALLOCATE_LEAVE_ITEM_BALANCE_ADJUSTMENT,
  UPDATE_PAYROLL_EMPLOYMENT_DETAIL,
} from '../../../EmployeeIntents';

const isTerminationDateNewlySet = (state, action) => {
  if (action.key === 'terminationDate' && action.value === '') {
    return false;
  }

  if (
    action.key === 'terminationDate' &&
    !state.payrollDetails.employmentDetails.terminationDate
  ) {
    return true;
  }

  return state.payrollDetails.employmentDetails.terminationDateNewlySet;
};

const updatePayrollEmployeeDetail = (state, action) => ({
  ...state,
  payrollDetails: {
    ...state.payrollDetails,
    employmentDetails: {
      ...state.payrollDetails.employmentDetails,
      [action.key]: action.value,
      terminationDateNewlySet: isTerminationDateNewlySet(state, action),
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

const addPayrollDeductionPayItem = (state, { payItem }) => {
  const updatedPayItems = [
    ...state.payrollDetails.deductionDetails.deductionPayItems,
    payItem,
  ];
  const partialDeductionDetails = { deductionPayItems: updatedPayItems };

  return setPayrollDeductionState(state, partialDeductionDetails);
};

const removePayrollDeductionPayItem = (state, action) => {
  const updatedPayItems = state.payrollDetails.deductionDetails.deductionPayItems.filter(
    (payItem) => payItem.id !== action.id
  );
  const partialDeductionDetails = { deductionPayItems: updatedPayItems };

  return setPayrollDeductionState(state, partialDeductionDetails);
};

const setPayrollAllocatedLeaveState = (state, partialAllocatedLeave) => ({
  ...state,
  payrollDetails: {
    ...state.payrollDetails,
    leaveDetails: {
      ...state.payrollDetails.leaveDetails,
      ...partialAllocatedLeave,
    },
  },
  isPageEdited: true,
});

const addAllocatedLeaveItem = (state, action) => {
  const { leaveItem } = action;
  const allLeavePayItems =
    state.payrollDetails.leaveDetails.allLeavePayItems ?? [];

  const correspondingLeavePayItem = allLeavePayItems.find(
    (leavePayItem) => leavePayItem.payItemId === leaveItem.id
  ) ?? {
    // if can't find them, meaning the item was just added
    payItemId: leaveItem.id,
    carryOver: '0',
    balanceAdjustment: '0',
    yearToDate: '0',
    name: leaveItem.name,
    carryLeaveOverToNextYear: leaveItem.carryLeaveOverToNextYear,
  };

  const updatedLeaveItems = [
    ...state.payrollDetails.leaveDetails.allocatedLeavePayItems,
    {
      ...correspondingLeavePayItem,
    },
  ];
  const partialAllocatedLeave = { allocatedLeavePayItems: updatedLeaveItems };

  return setPayrollAllocatedLeaveState(state, partialAllocatedLeave);
};

const removeAllocatedLeaveItem = (state, action) => {
  const updatedLeaveItems = state.payrollDetails.leaveDetails.allocatedLeavePayItems.filter(
    (leaveItem) => leaveItem.payItemId !== action.payItemId
  );
  const partialAllocatedLeave = { allocatedLeavePayItems: updatedLeaveItems };

  return setPayrollAllocatedLeaveState(state, partialAllocatedLeave);
};

const updateAllocatedLeaveItemBalanceAdjustment = (state, action) => {
  const { payItemId, value } = action;
  const updatedLeaveItems = state.payrollDetails.leaveDetails.allocatedLeavePayItems.map(
    (item) =>
      item.payItemId === payItemId
        ? { ...item, balanceAdjustment: value }
        : item
  );
  const partialAllocatedLeave = { allocatedLeavePayItems: updatedLeaveItems };
  return setPayrollAllocatedLeaveState(state, partialAllocatedLeave);
};

const setAllocatedLeaveItemModal = (state, action) =>
  setPayrollAllocatedLeaveState(state, { modal: action.modal });

const setShowAddPayItemButton = (state, action) => ({
  ...state,
  showAddPayItemButton: action.showAddPayItemButton,
});

export default {
  [UPDATE_PAYROLL_EMPLOYMENT_DETAIL]: updatePayrollEmployeeDetail,
  [ADD_PAYROLL_DEDUCTION_PAY_ITEM]: addPayrollDeductionPayItem,
  [REMOVE_PAYROLL_DEDUCTION_PAY_ITEM]: removePayrollDeductionPayItem,
  [ADD_ALLOCATED_LEAVE_ITEM]: addAllocatedLeaveItem,
  [REMOVE_ALLOCATED_LEAVE_ITEM]: removeAllocatedLeaveItem,
  [UPDATE_ALLOCATE_LEAVE_ITEM_BALANCE_ADJUSTMENT]: updateAllocatedLeaveItemBalanceAdjustment,
  [SET_ALLOCATED_LEAVE_ITEM_MODAL]: setAllocatedLeaveItemModal,
  [SET_SHOW_ADD_PAY_ITEM_BUTTON]: setShowAddPayItemButton,
};
