import { createStructuredSelector } from 'reselect';

export const getIsLoading = state => state.isLoading;
export const getAlertMessage = state => state.alertMessage;
export const getIsSubmitting = state => state.isSubmitting;
export const getAlert = state => state.alert;

export const getIsRegionAu = state => state.businessDetails.region === 'AU';

export const getBusinessForUpdate = createStructuredSelector({
  organisationName: state => state.businessDetails.organisationName,
  abn: state => state.businessDetails.abn,
  nzbn: state => state.businessDetails.nzbn,
  irdNumber: state => state.businessDetails.irdNumber,
  gstBranchNumber: state => state.businessDetails.gstBranchNumber,
  acn: state => state.businessDetails.acn,
  payeeNumber: state => state.businessDetails.payeeNumber,
  phoneNumber: state => state.businessDetails.phoneNumber,
  fax: state => state.businessDetails.fax,
  email: state => state.businessDetails.email,
  address: state => state.businessDetails.address,
});

export const getBusinessDetails = createStructuredSelector({
  serialNumber: state => state.businessDetails.serialNumber,
  organisationName: state => state.businessDetails.organisationName,
  region: state => state.businessDetails.region,
});

export const getAuTaxDetails = createStructuredSelector({
  abn: state => state.businessDetails.abn,
  gstBranchNumber: state => state.businessDetails.gstBranchNumber,
  acn: state => state.businessDetails.acn,
  payeeNumber: state => state.businessDetails.payeeNumber,
});

export const getNzTaxDetails = createStructuredSelector({
  irdNumber: state => state.businessDetails.irdNumber,
  nzbn: state => state.businessDetails.nzbn,
});

export const getContactDetails = createStructuredSelector({
  phoneNumber: state => state.businessDetails.phoneNumber,
  fax: state => state.businessDetails.fax,
  email: state => state.businessDetails.email,
  address: state => state.businessDetails.address,
});

export const getFinancialYearDetails = createStructuredSelector({
  financialYear: state => state.businessDetails.financialYear,
  lastMonthInFinancialYear: state => state.businessDetails.lastMonthInFinancialYear,
  accountingPeriods: state => state.businessDetails.accountingPeriods,
  openingBalanceDate: state => state.businessDetails.openingBalanceDate,
});
