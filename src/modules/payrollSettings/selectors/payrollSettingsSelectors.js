import { createSelector, createStructuredSelector } from 'reselect';

import { tabIds } from '../tabItems';

export const getBusinessId = state => state.businessId;

export const getRegion = state => state.region;

export const getAlert = state => state.alert;

const getStateTab = state => state.tab;

export const getTab = createSelector(
  getStateTab,
  (stateTab) => {
    const tabIdKeys = Object.keys(tabIds);
    const isValidTab = tabIdKeys.includes(stateTab);

    return isValidTab ? stateTab : tabIds.general;
  },
);

export const getTabUrl = (state, tab) => `/#/${state.region}/${state.businessId}/payrollSettings?tab=${tab}`;

export const getIsPageEdited = state => state.isPageEdited;

export const getURLParams = createStructuredSelector({
  tab: getTab,
});

export const getGeneralPayrollInformationUrlParams = state => ({
  businessId: getBusinessId(state),
});

export const getModalType = state => state.modalType;
export const getModal = state => state.modal;
export const getModalUrl = state => ((state.modal || {}).url);

export const getIsCurrentYearProvided = state => (
  state.generalPayrollInformation.isCurrentYearProvided
);
export const getCurrentYear = state => state.generalPayrollInformation.currentYear;
export const getLoadingState = state => state.generalPayrollInformation.loadingState;

export const getGeneralPayrollInformation = createStructuredSelector({
  currentYear: getCurrentYear,
  hoursInWorkWeek: state => state.generalPayrollInformation.hoursInWorkWeek,
  withholdingPayerNumber: state => state.generalPayrollInformation.withholdingPayerNumber,
  roundNetPay: state => state.generalPayrollInformation.roundNetPay,
  taxTableRevisionDate: state => state.generalPayrollInformation.taxTableRevisionDate,
  defaultSuperFund: state => state.generalPayrollInformation.defaultSuperFund,
  defaultSuperFundOptions: state => state.generalPayrollInformation.defaultSuperFundOptions,
  useTimesheets: state => state.generalPayrollInformation.useTimesheets,
  useTimesheetsWeekStarts: state => state.generalPayrollInformation.useTimesheetsWeekStarts,
  isCurrentYearProvided: getIsCurrentYearProvided,
});

export const getUpdateGeneralPayrollInformationContent = createStructuredSelector({
  currentYear: getCurrentYear,
  hoursInWorkWeek: state => state.generalPayrollInformation.hoursInWorkWeek,
  withholdingPayerNumber: state => state.generalPayrollInformation.withholdingPayerNumber,
  roundNetPay: state => state.generalPayrollInformation.roundNetPay,
  defaultSuperFund: state => state.generalPayrollInformation.defaultSuperFund,
  useTimesheets: state => state.generalPayrollInformation.useTimesheets,
  useTimesheetsAction: state => state.generalPayrollInformation.useTimesheetsAction,
  useTimesheetsWeekStarts: state => state.generalPayrollInformation.useTimesheetsWeekStarts,
  isUseTimesheetsChanged: state => state.generalPayrollInformation.isUseTimesheetsChanged,
});
