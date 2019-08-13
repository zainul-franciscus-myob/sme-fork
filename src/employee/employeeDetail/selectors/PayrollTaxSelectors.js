import { createSelector } from 'reselect';

const getTaxPayItemOptions = state => state.taxPayItemOptions;

export const getTaxPayItems = state => (
  state.payrollDetails.tax.taxPayItems
);

export const getFilteredTaxPayItemOptions = createSelector(
  getTaxPayItemOptions,
  getTaxPayItems,
  (taxPayItemOptions, taxPayItems) => taxPayItemOptions
    .filter(taxPayItemOption => (
      !taxPayItems.some(taxPayItem => taxPayItem.id === taxPayItemOption.id)
    )),
);

export const getSelectedTaxPayItems = createSelector(
  getTaxPayItemOptions,
  getTaxPayItems,
  (taxPayItemOptions, taxPayItems) => taxPayItemOptions
    .filter(taxPayItemOption => (
      taxPayItems.some(taxPayItem => taxPayItem.id === taxPayItemOption.id)
    )),
);

export const getTaxTableOptions = state => state.taxTableOptions;

export const getTaxDetails = state => ({
  extraTax: state.payrollDetails.tax.extraTax,
  taxFileNumber: state.payrollDetails.tax.taxFileNumber,
  totalRebates: state.payrollDetails.tax.totalRebates,
  withholdingVariationRate: state.payrollDetails.tax.withholdingVariationRate,
});

export const getSelectedTaxTable = state => (
  state.taxTableOptions.find(taxTable => taxTable.id === state.payrollDetails.tax.taxTableId) || {}
);

export const getTaxPayItemModal = state => state.taxPayItemModal;
export const getTaxPayItemModalLoading = state => state.taxPayItemModal.isLoading;
export const getTaxPayItemModalSubmitting = state => state.taxPayItemModal.isSubmitting;
export const getTaxPayItemModalAlertMessage = state => state.taxPayItemModal.alertMessage;

export const getTaxPayItemDetail = state => state.taxPayItemModal.tax;
export const getTaxPayItemAccounts = state => state.taxPayItemModal.accounts;
export const getTaxPayItemAtoReportingCategoryList = state => (
  state.taxPayItemModal.atoReportingCategoryList
);

export const getTaxPayItemPayload = state => ({
  atoReportingCategory: state.taxPayItemModal.tax.atoReportingCategory,
  accountId: state.taxPayItemModal.tax.accountId,
});
