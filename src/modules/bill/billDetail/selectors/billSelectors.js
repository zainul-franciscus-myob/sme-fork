import { createSelector } from 'reselect';

import ModalType from '../types/ModalType';
import getRegionToDialectText from '../../../../dialect/getRegionToDialectText';

export const getBillId = state => state.billId;

export const getBillUid = state => state.bill.uid;

export const getDuplicatedBillId = state => state.duplicatedBillId;

export const getOpenExportPdfQueryParam = state => state.openExportPdf;

export const getIsCreating = createSelector(
  getBillId,
  billId => billId === 'new',
);

export const getIsCreatingFromInTray = createSelector(
  getIsCreating,
  state => state.source,
  (isCreating, source) => isCreating && source === 'inTray',
);

export const getLoadingState = state => state.loadingState;

export const getTotalTaxLabel = state => getRegionToDialectText(state.region)('Tax');

export const getAmountPaid = state => state.bill.amountPaid;

export const getSubTotal = state => state.totals.subTotal;

export const getTotalTax = state => state.totals.totalTax;

export const getTotalAmount = state => state.totals.totalAmount;

export const getDisplayAmountPaid = state => state.bill.displayAmountPaid;

export const getAmountDue = state => state.totals.amountDue;

export const getBillNumber = state => state.bill.billNumber;

export const getBusinessId = state => state.businessId;

export const getRegion = state => state.region;

export const getBillLayout = state => state.layout;

export const getExpirationTerm = state => state.bill.expirationTerm;

export const getExpirationTermOptions = state => state.expirationTermOptions;

export const getExpirationDays = state => state.bill.expirationDays;

export const getPageTitle = createSelector(
  getIsCreatingFromInTray,
  getIsCreating,
  state => state.bill.displayBillNumber,
  (isCreatingFromInTray, isCreating, displayBillNumber) => {
    if (isCreatingFromInTray) {
      return 'Create bill from In Tray';
    }
    if (isCreating) {
      return 'Create bill';
    }
    return `Bill ${displayBillNumber}`;
  },
);

export const getIsBlocking = state => state.isBlocking;

export const getIsModalBlocking = state => state.isModalBlocking;

export const getModalType = state => state.modalType;

export const getIsModalShown = state => Boolean(state.modalType);

export const getAlertType = state => state.alert.type;

export const getAlertMessage = state => state.alert.message;

export const getIsAlertShown = state => Boolean(state.alert);

export const getSupplierInvoiceNumber = state => state.bill.supplierInvoiceNumber;

export const getIssueDate = state => state.bill.issueDate;

export const getIsTaxInclusive = state => state.bill.isTaxInclusive;

export const getTaxInclusiveLabel = state => getRegionToDialectText(state.region)('Tax inclusive');

export const getTaxExclusiveLabel = state => getRegionToDialectText(state.region)('Tax exclusive');

export const getSupplierOptions = state => state.supplierOptions;

export const getSupplierId = state => state.bill.supplierId;

export const getSupplierAddress = state => state.bill.supplierAddress;

export const getIsReportable = state => state.bill.isReportable;

export const getExpenseAccountId = state => state.bill.expenseAccountId;

export const getIsPageEdited = state => state.isPageEdited;

export const getIsLineEdited = state => state.isLineEdited;

export const getHasLineBeenPrefilled = (state, index) => {
  const line = state.bill.lines.find((_, lineIndex) => lineIndex === index);
  return Boolean(line.prefillStatus);
};

export const getLines = state => state.bill.lines;

export const getNote = state => state.bill.note;

export const getIsLinesEmpty = createSelector(
  getLines,
  lines => lines.length === 0,
);

const getBillLinesLength = state => state.bill.lines.length;

export const getTableData = createSelector(
  getBillLinesLength,
  len => Array(len).fill({}),
);

export const getTaxCodeLabel = state => getRegionToDialectText(state.region)('Tax code');

export const getBillLine = (state, { index }) => {
  const line = state.bill.lines[index];
  const { newLine } = state;

  if (line) {
    return line;
  }
  return newLine;
};

export const getAccountOptions = state => state.accountOptions;

export const getTaxCodeOptions = state => state.taxCodeOptions;

export const getItemOptions = state => state.itemOptions;

export const getIsNewLine = createSelector(
  getBillLinesLength,
  (_, props) => props,
  (newLineIndex, { index }) => newLineIndex <= index,
);

export const getNewLineIndex = getBillLinesLength;

const getShouldOpenExportPdfModal = (state) => {
  const isCreating = getIsCreating(state);
  const openExportPdf = getOpenExportPdfQueryParam(state);

  return !isCreating && openExportPdf === 'true';
};

export const getLoadBillModalType = (state) => {
  const shouldOpenExportPdfModal = getShouldOpenExportPdfModal(state);
  if (shouldOpenExportPdfModal) {
    return ModalType.ExportPdf;
  }

  return ModalType.None;
};

export const getContextForInventoryModal = (state) => {
  const businessId = getBusinessId(state);
  const region = getRegion(state);

  return ({
    businessId, region, isBuying: true, isSelling: false,
  });
};

export const getRouteUrlParams = state => ({
  openExportPdf: getOpenExportPdfQueryParam(state),
});

export const getAccountModalContext = (state) => {
  const businessId = getBusinessId(state);
  const region = getRegion(state);

  return { businessId, region };
};

export const getIsSupplierBlocking = state => state.isSupplierBlocking;


export const getIsSupplierDisabled = createSelector(
  getIsCreating,
  getIsSupplierBlocking,
  (isCreating, isSupplierBlocking) => !isCreating || isSupplierBlocking,
);

export const getUpdatedSupplierOptions = (state, updatedOption) => {
  const supplierOptions = getSupplierOptions(state);

  return supplierOptions.some(option => option.id === updatedOption.id)
    ? supplierOptions.map(option => (option.id === updatedOption.id ? updatedOption : option))
    : [updatedOption, ...supplierOptions];
};

export const getCreateSupplierContactModalContext = (state) => {
  const businessId = getBusinessId(state);
  const region = getRegion(state);

  return { businessId, region, contactType: 'Supplier' };
};

export const getLinesForTaxCalculation = createSelector(
  getLines,
  lines => lines.map(line => ({
    ...line,
    lineTypeId: line.lineSubTypeId,
  })),
);

export const getIsLineAmountsTaxInclusive = (isTaxInclusive, isSwitchingTaxInclusive) => (
  isSwitchingTaxInclusive ? !isTaxInclusive : isTaxInclusive
);
