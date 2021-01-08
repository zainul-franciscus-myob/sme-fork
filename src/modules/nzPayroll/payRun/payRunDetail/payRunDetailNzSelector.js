import { createSelector } from 'reselect';

import LoadingState from '../../../../components/PageView/LoadingState';
import formatAmount from '../../../../common/valueFormatters/formatAmount';
import formatDate from '../../../../common/valueFormatters/formatDate/formatDate';

export const getUrlParams = (state) => ({
  businessId: state.businessId,
  payRunId: state.payRunId,
  region: state.region,
});
export const getPaymentPeriodStart = (state) =>
  formatDate(new Date(state.paymentPeriodStart), 'iii dd/MM/yyyy');

export const getPaymentPeriodEnd = (state) =>
  formatDate(new Date(state.paymentPeriodEnd), 'iii dd/MM/yyyy');

export const getPaymentDate = (state) =>
  formatDate(new Date(state.paymentDate), 'iii dd/MM/yyyy');

export const getTotalTakeHomePay = (state) => state.totalTakeHomePay;
export const getLoadingState = (state) => state.loadingState;
export const getEmployeeList = (state) => state.employeeList;
export const getIsTableEmpty = (state) =>
  state.employeeList ? state.employeeList.length === 0 : true;
export const getIsTableLoading = (state) =>
  state.loadingState === LoadingState.LOADING;
export const getBusinessId = (state) => state.businessId;
export const getRegion = (state) => state.region;
export const getPayRunListUrl = (state) => {
  const businessId = getBusinessId(state);
  const region = getRegion(state);

  return `/#/${region}/${businessId}/payRun`;
};

export const getEmployeeEntries = createSelector(getEmployeeList, (employees) =>
  employees.map((employee) => ({
    ...employee,
    takeHomePay: formatAmount(employee.takeHomePay),
  }))
);
