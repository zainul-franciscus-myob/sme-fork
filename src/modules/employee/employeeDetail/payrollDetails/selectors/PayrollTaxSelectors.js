import { createSelector } from 'reselect';

export const getTaxPayItemOptions = state => state.taxPayItemOptions;

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

const getPayrollDetailsTax = state => state.payrollDetails.tax;
export const getTaxFileNumberStatusOptions = state => (
  state.payrollDetails.tax.taxFileNumberStatusOptions
);
export const getTaxFileNumberStatus = state => state.payrollDetails.tax.taxFileNumberStatus;
export const getTaxPayItemModal = state => state.taxPayItemModal;
export const getTaxPayItemModalLoading = state => state.taxPayItemModal.isLoading;
export const getTaxPayItemModalSubmitting = state => state.taxPayItemModal.isSubmitting;
export const getTaxPayItemModalAlertMessage = state => state.taxPayItemModal.alertMessage;
export const getIsTfnEditable = createSelector(
  getPayrollDetailsTax,
  (payrollDetailTax) => {
    if (!payrollDetailTax.taxFileNumberStatus
      || !payrollDetailTax.taxFileNumberStates[payrollDetailTax.taxFileNumberStatus]) {
      return false;
    }

    return payrollDetailTax.taxFileNumberStates[payrollDetailTax.taxFileNumberStatus].tfnEditable;
  },
);

export const getTaxPayItemDetail = state => state.taxPayItemModal.tax;
export const getTaxPayItemAccounts = state => state.taxPayItemModal.accounts;
export const getTaxPayItemAtoReportingCategoryList = state => (
  state.taxPayItemModal.atoReportingCategoryList
);

export const getTaxPayItemPayload = state => ({
  atoReportingCategory: state.taxPayItemModal.tax.atoReportingCategory,
  accountId: state.taxPayItemModal.tax.accountId,
});

export const getTaxTableCalculations = state => state.payrollDetails.tax.taxTableCalculation;
export const getHasTfn = state => getTaxFileNumberStatus(state) === '';
