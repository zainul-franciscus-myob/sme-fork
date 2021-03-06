import {
  ADD_PAYROLL_EXPENSE_PAY_ITEM,
  REMOVE_PAYROLL_EXPENSE_PAY_ITEM,
} from '../../../EmployeeIntents';

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

const addPayrollExpensePayItem = (state, { payItem }) => {
  const updatedPayItems = [
    ...state.payrollDetails.employerExpenseDetails.expensePayItems,
    payItem,
  ];
  const partialExpenseDetails = { expensePayItems: updatedPayItems };

  return setPayrollExpenseState(state, partialExpenseDetails);
};

const removePayrollExpensePayItem = (state, action) => {
  const updatedPayItems = state.payrollDetails.employerExpenseDetails.expensePayItems.filter(
    (payItem) => payItem.id !== action.id
  );
  const partialExpenseDetails = { expensePayItems: updatedPayItems };

  return setPayrollExpenseState(state, partialExpenseDetails);
};

export default {
  [ADD_PAYROLL_EXPENSE_PAY_ITEM]: addPayrollExpensePayItem,
  [REMOVE_PAYROLL_EXPENSE_PAY_ITEM]: removePayrollExpensePayItem,
};
