import {
  ADD_ALLOCATED_LEAVE_ITEM,
  ADD_PAYROLL_DEDUCTION_PAY_ITEM,
  REMOVE_ALLOCATED_LEAVE_ITEM,
  REMOVE_PAYROLL_DEDUCTION_PAY_ITEM,
  SET_ALLOCATED_LEAVE_ITEM_MODAL,
  SET_SHOW_DEDUCTION_PAY_ITEM,
  SET_SHOW_LEAVE_PAY_ITEM,
  UPDATE_ALLOCATED_LEAVE_ITEM_CARRY_OVER,
  UPDATE_PAYROLL_EMPLOYMENT_DETAIL,
} from '../../../EmployeeIntents';

const updatePayrollEmployeeDetail = (state, action) => ({
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

const addPayrollDeductionPayItem = (state, { payItem }) => {
  const updatedPayItems = [
    ...state.payrollDetails.deductionDetails.deductionPayItems,
    payItem,
  ];
  const partialDeductionDetails = { deductionPayItems: updatedPayItems };

  return setPayrollDeductionState(state, partialDeductionDetails);
};

const removePayrollDeductionPayItem = (state, action) => {
  const updatedPayItems = state.payrollDetails.deductionDetails.deductionPayItems
    .filter(payItem => payItem.id !== action.id);
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
  const updatedLeaveItems = [
    ...state.payrollDetails.leaveDetails.allocatedLeavePayItems,
    {
      payItemId: leaveItem.id, name: leaveItem.name, carryOver: '0',
    },
  ];
  const partialAllocatedLeave = { allocatedLeavePayItems: updatedLeaveItems };

  return setPayrollAllocatedLeaveState(state, partialAllocatedLeave);
};

const removeAllocatedLeaveItem = (state, action) => {
  const updatedLeaveItems = state.payrollDetails.leaveDetails.allocatedLeavePayItems
    .filter(leaveItem => leaveItem.payItemId !== action.payItemId);
  const partialAllocatedLeave = { allocatedLeavePayItems: updatedLeaveItems };

  return setPayrollAllocatedLeaveState(state, partialAllocatedLeave);
};

const updateAllocatedLeaveItemCarryOver = (state, action) => {
  const { payItemId, value } = action;
  const updatedLeaveItems = state.payrollDetails.leaveDetails.allocatedLeavePayItems.map(
    item => (item.payItemId === payItemId ? { ...item, carryOver: value } : item),
  );
  const partialAllocatedLeave = { allocatedLeavePayItems: updatedLeaveItems };

  return setPayrollAllocatedLeaveState(state, partialAllocatedLeave);
};

const setAllocatedLeaveItemModal = (state, action) => (
  setPayrollAllocatedLeaveState(state, { modal: action.modal })
);

const toggleShowAddDeductionPayItem = (state, action) => ({
  ...state,
  payrollDetails: {
    ...state.payrollDetails,
    deductionDetails: {
      ...state.payrollDetails.deductionDetails,
      showAddDeductionPayItem: action.showDropdown,
    },
  },
});

const showAddLeavePayItemButtonDropdown = (state, action) => ({
  ...state,
  payrollDetails: {
    ...state.payrollDetails,
    leaveDetails: {
      ...state.payrollDetails.leaveDetails,
      showAddLeavePayItemButton: action.showDropdown,
    },
  },
});

export default {
  [UPDATE_PAYROLL_EMPLOYMENT_DETAIL]: updatePayrollEmployeeDetail,
  [ADD_PAYROLL_DEDUCTION_PAY_ITEM]: addPayrollDeductionPayItem,
  [REMOVE_PAYROLL_DEDUCTION_PAY_ITEM]: removePayrollDeductionPayItem,
  [ADD_ALLOCATED_LEAVE_ITEM]: addAllocatedLeaveItem,
  [REMOVE_ALLOCATED_LEAVE_ITEM]: removeAllocatedLeaveItem,
  [UPDATE_ALLOCATED_LEAVE_ITEM_CARRY_OVER]: updateAllocatedLeaveItemCarryOver,
  [SET_ALLOCATED_LEAVE_ITEM_MODAL]: setAllocatedLeaveItemModal,
  [SET_SHOW_DEDUCTION_PAY_ITEM]: toggleShowAddDeductionPayItem,
  [SET_SHOW_LEAVE_PAY_ITEM]: showAddLeavePayItemButtonDropdown,
};
