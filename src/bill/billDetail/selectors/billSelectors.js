
import { createSelector } from 'reselect';

import getRegionToDialectText from '../../../dialect/getRegionToDialectText';

export const getBillId = state => state.billId;

export const getDuplicatedBillId = state => state.duplicatedBillId;

export const getInTrayDocumentId = state => state.inTrayDocumentId;

export const getIsCreating = createSelector(
  getBillId,
  billId => billId === 'new',
);

export const getIsCreatingFromInTray = createSelector(
  getIsCreating,
  state => state.inTrayDocumentId,
  (isCreating, inTrayDocumentId) => isCreating && inTrayDocumentId,
);

export const getIsLoading = state => state.isLoading;

export const getIsLineAmountPendingCalculation = state => state.isLineAmountPendingCalculation;

export const getTotalTaxLabel = state => getRegionToDialectText(state.region)('Tax');

export const getAmountPaid = state => state.bill.amountPaid;

export const getSubTotal = state => state.totals.subTotal;

export const getTotalTax = state => state.totals.totalTax;

export const getTotalAmount = state => state.totals.totalAmount;

export const getDisplayAmountPaid = state => state.bill.displayAmountPaid;

export const getAmountDue = state => state.totals.amountDue;

export const getBillNumber = state => state.bill.billNumber;

export const getStatus = state => state.bill.status;

export const getBusinessId = state => state.businessId;

export const getRegion = state => state.region;

export const getLayout = state => state.layout;

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

export const getIsLineWithoutItemFromInTray = () => false;

export const getInTrayDocumentFileUrl = state => state.inTrayDocument.fileUrl;

export const getIntrayDocumentThumbnailUrl = state => state.inTrayDocument.thumbnailUrl;

export const getInTrayDocumentUploadedDate = state => state.inTrayDocument.uploadedDate;

export const getHasInTrayDocument = state => Boolean(state.inTrayDocument);

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

export const getIsPageEdited = state => state.isPageEdited;

export const getLines = state => state.bill.lines;

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

export const getNewLineIndex = createSelector(
  getBillLinesLength,
  billLinesLength => billLinesLength - 1,
);