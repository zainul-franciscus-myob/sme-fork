import { createSelector } from 'reselect';

export const getUrlParams = state => ({
  businessId: state.businessId,
  transactionId: state.transactionId,
});
export const getLoadingState = state => state.loadingState;
export const getEmployeePay = state => state.employeePay;
export const getAlert = state => state.alert;
export const getIsDeleteModalOpen = state => state.isDeleteModalOpen;
export const getBusinessId = state => state.businessId;
export const getRegion = state => state.region;

export const getPageTitle = (state) => {
  const {
    employeeFirstName,
    employeeLastName,
    referenceNumber,
  } = state.employeePay;

  return `${employeeFirstName} ${employeeLastName} ${referenceNumber}`;
};
export const getElectronicPaymentLink = state => `/#/${state.region}/${state.businessId}/electronicPayments/${state.employeePay.parentBusinessEventId}`;

export const getTransactionListUrl = (state) => {
  const businessId = getBusinessId(state);
  const region = getRegion(state);

  return `/#/${region}/${businessId}/transactionList`;
};

export const getPayRunId = state => state.payrunId;

export const getReversalEmployeePayContent = state => ({
  transactionId: state.transactionId,
  payRunId: state.payrunId,
});
export const getPayRunListUrl = state => {
  const businessId = getBusinessId(state);
  const region = getRegion(state);

  return `/#/${region}/${businessId}/payRun`;
};

export const getStpDeclarationContext = createSelector(
  getBusinessId,
  getPayRunId,
  (businessId, payRunId) => ({
    businessId,
    eventId: payRunId,
  }),
);
