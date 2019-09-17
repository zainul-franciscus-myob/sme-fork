import { createSelector } from 'reselect';

export const getExpensePayItemOptions = state => state.expensePayItemOptions;

export const getExpensePayItems = state => (
  state.payrollDetails.employerExpenseDetails.expensePayItems
);

export const getFilteredExpensePayItemOptions = createSelector(
  getExpensePayItemOptions,
  getExpensePayItems,
  (expensePayItemOptions, expensePayItems) => expensePayItemOptions
    .filter(expensePayItemOption => !expensePayItems
      .some(expensePayItem => expensePayItem.id === expensePayItemOption.id)),
);
