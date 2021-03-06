import { createStructuredSelector } from 'reselect';

export const getAlert = (state) => state.alert;
export const getBusinessId = (state) => state.businessId;
export const getIsLoading = (state) => state.isLoading;
export const getIsPageEdited = (state) => state.isPageEdited;
export const getIsSubmitting = (state) => state.isSubmitting;
export const getModal = (state) => state.modal;
export const getModalUrl = (state) => state.modal && state.modal.url;
export const getPageTitle = (state) => state.pageTitle;
export const getRegion = (state) => state.region;
export const getIsRegionAu = (state) => state.businessDetails.region === 'AU';

export const getBusinessForUpdate = createStructuredSelector({
  organisationName: (state) => state.businessDetails.organisationName,
  abn: (state) => state.businessDetails.abn,
  nzbn: (state) => state.businessDetails.nzbn,
  irdNumber: (state) => state.businessDetails.irdNumber,
  gstBranchNumber: (state) => state.businessDetails.gstBranchNumber,
  acn: (state) => state.businessDetails.acn,
  phoneNumber: (state) => state.businessDetails.phoneNumber,
  fax: (state) => state.businessDetails.fax,
  email: (state) => state.businessDetails.email,
  address: (state) => state.businessDetails.address,
  lastMonthInFinancialYear: (state) =>
    state.businessDetails.lastMonthInFinancialYear,
  openingBalanceDate: (state) => state.businessDetails.openingBalanceDate,
  financialYear: (state) => state.businessDetails.financialYear,
  hasLockPeriod: (state) => state.businessDetails.hasLockPeriod,
  lockDate: (state) => state.businessDetails.lockDate,
  tradingName: (state) => state.businessDetails.tradingName,
  website: (state) => state.businessDetails.website,
});

export const getBusinessDetails = createStructuredSelector({
  serialNumber: (state) => state.businessDetails.serialNumber,
  organisationName: (state) => state.businessDetails.organisationName,
  tradingName: (state) => state.businessDetails.tradingName,
  region: (state) => state.businessDetails.region,
});

export const getContactDetails = createStructuredSelector({
  phoneNumber: (state) => state.businessDetails.phoneNumber,
  fax: (state) => state.businessDetails.fax,
  website: (state) => state.businessDetails.website,
  email: (state) => state.businessDetails.email,
  address: (state) => state.businessDetails.address,
});

export const getAuTaxDetails = createStructuredSelector({
  abn: (state) => state.businessDetails.abn,
  gstBranchNumber: (state) => state.businessDetails.gstBranchNumber,
  acn: (state) => state.businessDetails.acn,
});

export const getNzTaxDetails = createStructuredSelector({
  irdNumber: (state) => state.businessDetails.irdNumber,
  nzbn: (state) => state.businessDetails.nzbn,
});

export const getRegionTaxDetails = (state) =>
  getIsRegionAu(state) ? getAuTaxDetails(state) : getNzTaxDetails(state);
