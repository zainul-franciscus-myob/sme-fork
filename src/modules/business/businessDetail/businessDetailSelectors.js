import { addMonths, addYears, endOfMonth, format } from 'date-fns';
import { createSelector, createStructuredSelector } from 'reselect';

export const getLoadingState = (state) => state.loadingState;
export const getAlertMessage = (state) => state.alertMessage;
export const getIsSubmitting = (state) => state.isSubmitting;
export const getIsLoading = (state) => state.isLoading;
export const getAlert = (state) => state.alert;
export const getModal = (state) => state.modal;
export const getModalUrl = (state) => state.modal && state.modal.url;

export const getIsRegionAu = (state) => state.businessDetails.region === 'AU';
export const getIsPageEdited = (state) => state.isPageEdited;
export const getPageTitle = (state) => state.pageTitle;
export const getRegion = (state) => state.region;
export const getBusinessId = (state) => state.businessId;
export const getFinancialYearModal = (state) => state.financialYearModal;
export const getFinancialYear = (state) => state.businessDetails.financialYear;
export const getLastMonthInFinancialYear = (state) =>
  state.businessDetails.lastMonthInFinancialYear;

const getLastMonthIndex = (state) =>
  state.businessDetails.lastMonthInFinancialYear - 1;
export const getLastMonthInFY = (state) =>
  state.monthOptions[getLastMonthIndex(state)];

const getOpeningBalanceDate = (state) => {
  const { openingBalanceMonth, openingBalanceYear } = state.businessDetails;

  return `${openingBalanceYear}-${openingBalanceMonth}-01`;
};

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
  openingBalanceDate: (state) => getOpeningBalanceDate(state),
  financialYear: (state) => state.businessDetails.financialYear,
  hasLockPeriod: (state) => state.businessDetails.hasLockPeriod,
  lockDate: (state) => state.businessDetails.lockDate,
  tradingName: (state) => state.businessDetails.tradingName,
  website: (state) => state.businessDetails.website,
  clientCode: (state) => state.businessDetails.clientCode,
});

export const getBusinessDetails = createStructuredSelector({
  serialNumber: (state) => state.businessDetails.serialNumber,
  organisationName: (state) => state.businessDetails.organisationName,
  tradingName: (state) => state.businessDetails.tradingName,
  region: (state) => state.businessDetails.region,
  clientCode: (state) => state.businessDetails.clientCode,
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

export const getContactDetails = createStructuredSelector({
  phoneNumber: (state) => state.businessDetails.phoneNumber,
  fax: (state) => state.businessDetails.fax,
  website: (state) => state.businessDetails.website,
  email: (state) => state.businessDetails.email,
  address: (state) => state.businessDetails.address,
});

export const getOpeningBalanceYear = (state) => {
  const { openingBalanceDate } = state.businessDetails;

  return new Date(openingBalanceDate).getFullYear();
};

export const getOpeningBalanceMonth = (state) => {
  const { openingBalanceDate } = state.businessDetails;

  return new Date(openingBalanceDate).getMonth() + 1;
};

export const getFinancialYearDateRange = createSelector(
  getLastMonthInFinancialYear,
  getFinancialYear,
  (lastMonthInFinancialYearValue, financialYear) => {
    const financialYearDateFormat = 'd MMM yyyy';

    const lastMonthInFYIndex = Number(lastMonthInFinancialYearValue) - 1;

    const startOfFY = addYears(
      addMonths(new Date(financialYear, lastMonthInFYIndex, 1), 1),
      -1
    );

    const endOfFY = endOfMonth(new Date(financialYear, lastMonthInFYIndex, 1));

    const financialYearDateRange = {
      start: format(startOfFY, financialYearDateFormat),
      end: format(endOfFY, financialYearDateFormat),
    };
    return financialYearDateRange;
  }
);

export const getCannotRecordTransactionBeforeDate = (state) => {
  const financialYearDateFormat = 'd MMM yyyy';
  const { openingBalanceMonth, openingBalanceYear } = state.businessDetails;
  const openingBalanceMonthIndex = Number(openingBalanceMonth) - 1;
  const cannotRecordTransactionBeforeDate = new Date(
    openingBalanceYear,
    openingBalanceMonthIndex,
    1
  );
  return format(cannotRecordTransactionBeforeDate, financialYearDateFormat);
};

export const getFinancialYearDetails = createStructuredSelector({
  financialYear: (state) => state.businessDetails.financialYear,
  lastMonthInFinancialYear: (state) =>
    state.businessDetails.lastMonthInFinancialYear,
  openingBalanceYear: (state) => state.businessDetails.openingBalanceYear,
  openingBalanceMonth: (state) => state.businessDetails.openingBalanceMonth,
  openingBalanceDate: (state) => state.businessDetails.openingBalanceDate,
  isFinancialYearClosed: (state) => state.businessDetails.isFinancialYearClosed,
  isStartNewFinancialYearEnabled: (state) =>
    state.isStartNewFinancialYearEnabled,
  isFinancialYearSectionReadOnly: (state) =>
    state.isFinancialYearSectionReadOnly,
  financialYearOptions: (state) => state.financialYearOptions,
  lastMonthInFY: (state) => getLastMonthInFY(state),
  monthOptions: (state) => state.monthOptions,
  financialYearDateRange: (state) => getFinancialYearDateRange(state),
  cannotRecordTransactionBeforeDate: (state) =>
    getCannotRecordTransactionBeforeDate(state),
  isFinancialYearSettingsChanged: (state) =>
    state.isFinancialYearSettingsChanged,
});

export const getLockDateDetails = createStructuredSelector({
  hasLockPeriod: (state) => state.businessDetails.hasLockPeriod,
  lockDate: (state) => state.businessDetails.lockDate,
});

export const getMonthOptions = (state) => state.monthOptions;

export const getLastMonthInNewFinancialYear = (state) =>
  state.businessDetails.lastMonthInNewFinancialYear;

export const getNewFinancialYearDetails = createSelector(
  getLastMonthInNewFinancialYear,
  getFinancialYear,
  (lastMonthInNewFinancialYear, financialYear) => {
    const lastMonthOfFY = Number(lastMonthInNewFinancialYear) - 1;
    const startOfFY = addMonths(new Date(financialYear, lastMonthOfFY, 1), 1);
    const endOfFY = addYears(
      endOfMonth(new Date(financialYear, lastMonthOfFY, 1)),
      1
    );

    return {
      startOfNewFinancialYear: format(startOfFY, 'dd/MM/yyyy'),
      endOfNewFinancialYear: format(endOfFY, 'dd/MM/yyyy'),
      lastMonthInNewFinancialYear,
    };
  }
);

export const getDashboardUrl = createSelector(
  getBusinessId,
  getRegion,
  (businessId, region) => `/#/${region}/${businessId}/dashboard`
);
