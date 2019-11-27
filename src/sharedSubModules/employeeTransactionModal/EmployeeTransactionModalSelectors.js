import { createSelector } from 'reselect';

export const getState = state => state.employeeTransactionModal;

export const getUrlParams = createSelector(
  getState,
  state => ({
    businessId: state.businessId,
    payRunId: state.payRunId,
    transactionId: state.transactionId,
  }),
);
export const getEmployeeName = state => getState(state).employeeName;
export const getModalEmployeeDetails = state => getState(state).employeeDetails;
export const getIsLoading = state => getState(state).isLoading;
export const getDeletePopoverIsOpen = state => getState(state).deletePopoverIsOpen;
