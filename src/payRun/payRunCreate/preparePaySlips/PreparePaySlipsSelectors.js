export const getBusinessId = state => state.businessId;
export const getSelectedTab = state => state.preparePaySlips.selectedTab;
export const getEmailTabEmployees = state => (
  state.preparePaySlips.recordedPayments.emailPaySlipEmployees
);
export const getPrintTabEmployees = state => (
  state.preparePaySlips.recordedPayments.printPaySlipEmployees
);
