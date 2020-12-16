import { Decimal } from 'decimal.js';
import { createSelector } from 'reselect';
import { format, isBefore } from 'date-fns';

import ContactType from '../../../contact/contactCombobox/types/ContactType';
import DisplayMode from '../../../contact/contactCombobox/types/DisplayMode';
import ItemTypes from '../../../inventory/itemCombobox/ItemTypes';
import PurchaseOrderLayout from '../types/PurchaseOrderLayout';
import PurchaseOrderLineType from '../types/PurchaseOrderLineType';
import Region from '../../../../common/types/Region';
import buildAbnLink from '../../../../common/links/buildAbnLink';
import calculateLineTotals from '../../../../common/taxCalculator/calculateLineTotals';
import getRegionToDialectText from '../../../../dialect/getRegionToDialectText';

export const getBusinessId = (state) => state.businessId;
export const getRegion = (state) => state.region;
export const getShippingAddress = (state) =>
  state.purchaseOrder.shippingAddress;
export const getPurchaseOrderId = (state) => state.purchaseOrderId;
export const getPurchaseOrderLayout = (state) => state.purchaseOrder.layout;
export const getDuplicateId = (state) => state.duplicateId;
export const getRedirectUrl = (state) => state.redirectUrl;

export const getSupplierId = (state) => state.purchaseOrder.supplierId;
export const getNote = (state) => state.purchaseOrder.note;
export const getPurchaseOrderNumber = (state) =>
  state.purchaseOrder.purchaseOrderNumber;
export const getSupplierInvoiceNumber = (state) =>
  state.purchaseOrder.supplierInvoiceNumber;
export const getIssueDate = (state) => state.purchaseOrder.issueDate;
export const getPromisedDate = (state) => state.purchaseOrder.promisedDate;
export const getExpirationTerm = (state) => state.purchaseOrder.expirationTerm;
export const getExpirationDays = (state) => state.purchaseOrder.expirationDays;
export const getIsTaxInclusive = (state) => state.purchaseOrder.isTaxInclusive;
export const getIsReportable = (state) => state.purchaseOrder.isReportable;
export const getAmountPaid = (state) => state.purchaseOrder.amountPaid;
export const getLines = (state) => state.purchaseOrder.lines;
const getPurchaseOrderLinesLength = (state) => state.purchaseOrder.lines.length;
export const getIsForeignCurrency = (state) =>
  state.purchaseOrder.isForeignCurrency;

export const getAbn = (state) => state.abn;
export const getAccountOptions = (state) => state.accountOptions;
export const getExpirationTermOptions = (state) => state.expirationTermOptions;
export const getTaxCodeOptions = (state) => state.taxCodeOptions;

export const getLoadingState = (state) => state.loadingState;
export const getIsBlocking = (state) => state.isBlocking;
export const getIsModalBlocking = (state) => state.isModalBlocking;
export const getIsAbnLoading = (state) => state.isAbnLoading;
export const getIsPageEdited = (state) => state.isPageEdited;
export const getIsLineEdited = (state) => state.isLineEdited;
export const getModalType = (state) => state.modalType;
export const getAlertType = (state) => state.alert.type;
export const getAlertMessage = (state) => state.alert.message;

export const getTotalTaxLabel = (state) =>
  getRegionToDialectText(state.region)('Tax');
export const getTaxCodeLabel = (state) =>
  getRegionToDialectText(state.region)('Tax code');
export const getTaxInclusiveLabel = (state) =>
  getRegionToDialectText(state.region)('Tax inclusive');
export const getTaxExclusiveLabel = (state) =>
  getRegionToDialectText(state.region)('Tax exclusive');

export const getIsModalShown = (state) => Boolean(state.modalType);
export const getIsAlertShown = (state) => Boolean(state.alert);

export const getConversionDate = (state) => state.conversionDate;

export const getConversionMonthYear = (state) => {
  const { conversionDate } = state;
  return format(new Date(conversionDate), 'MMMM yyyy');
};

const getStartOfFinancialYearDate = (state) => state.startOfFinancialYearDate;

export const getIsCreating = createSelector(
  getPurchaseOrderId,
  (purchaseOrderId) => purchaseOrderId === 'new'
);

export const getPageTitle = createSelector(
  getIsCreating,
  (state) => state.purchaseOrder.purchaseOrderNumber,
  (isCreating, purchaseOrderNumber) => {
    if (isCreating) {
      return 'Create purchase order';
    }
    return `Purchase Order ${purchaseOrderNumber}`;
  }
);

export const getHasLineBeenPrefilled = (state, index) => {
  const line = state.purchaseOrder.lines.find(
    (_, lineIndex) => lineIndex === index
  );
  return Boolean(line.prefillStatus);
};

export const getHasNoteBeenPrefilled = (state) => state.prefillStatus.note;

export const getIsLinesEmpty = createSelector(
  getLines,
  (lines) => lines.length === 0
);

export const getTableData = createSelector(getPurchaseOrderLinesLength, (len) =>
  Array(len).fill({})
);

export const getPurchaseOrderLine = (state, { index }) => {
  const line = state.purchaseOrder.lines[index];
  const { newLine } = state;

  if (line) {
    return line.type === PurchaseOrderLineType.SUB_TOTAL
      ? { ...line, description: 'Subtotal' }
      : line;
  }

  return newLine;
};

export const getIsNewLine = createSelector(
  getPurchaseOrderLinesLength,
  (_, props) => props,
  (newLineIndex, { index }) => newLineIndex <= index
);

export const getNewLineIndex = getPurchaseOrderLinesLength;

export const getUniqueSelectedItemIds = (state) => {
  if (
    state.purchaseOrder.layout === PurchaseOrderLayout.ITEM_AND_SERVICE &&
    state.purchaseOrder.lines.length > 0
  ) {
    const selectedItemIds = state.purchaseOrder.lines.reduce(
      (itemIds, line) => {
        if (line.itemId) {
          itemIds.push(line.itemId);
        }
        return itemIds;
      },
      []
    );
    return [...new Set([...selectedItemIds])];
  }

  return [];
};

export const getItemComboboxContext = (state) => {
  const businessId = getBusinessId(state);
  const region = getRegion(state);

  return {
    businessId,
    region,
    itemType: ItemTypes.Bought,
  };
};

export const getModalContext = (state) => {
  const businessId = getBusinessId(state);
  const region = getRegion(state);

  return { businessId, region };
};

export const getIsSupplierDisabled = createSelector(
  getIsCreating,
  (isCreating) => !isCreating
);

export const getLinesForTaxCalculation = createSelector(getLines, (lines) =>
  lines.map((line) => ({
    ...line,
    lineTypeId: line.lineSubTypeId,
  }))
);

export const getIsLineAmountsTaxInclusive = (
  isTaxInclusive,
  isSwitchingTaxInclusive
) => (isSwitchingTaxInclusive ? !isTaxInclusive : isTaxInclusive);

const getIsLineTypeSupported = (line) =>
  [PurchaseOrderLineType.SERVICE, PurchaseOrderLineType.ITEM].includes(
    line.type
  );

const getIsLayoutSupported = createSelector(getPurchaseOrderLayout, (layout) =>
  [PurchaseOrderLayout.SERVICE, PurchaseOrderLayout.ITEM_AND_SERVICE].includes(
    layout
  )
);

export const getShowExportPdfButton = createSelector(
  getPurchaseOrderLayout,
  getIsForeignCurrency,
  (layout, isForeignCurrency) =>
    [
      PurchaseOrderLayout.SERVICE,
      PurchaseOrderLayout.ITEM_AND_SERVICE,
    ].includes(layout) && !isForeignCurrency
);

export const getIsLinesSupported = createSelector(getLines, (lines) =>
  lines.every((line) => getIsLineTypeSupported(line))
);

export const getIsReadOnly = createSelector(
  getIsLayoutSupported,
  getIsLinesSupported,
  getIsForeignCurrency,
  (isLayoutSupported, isLinesSupported, isForeignCurrency) =>
    !isLayoutSupported || !isLinesSupported || isForeignCurrency
);

const capitalise = (word) =>
  word && word.length
    ? word[0].toUpperCase() + word.slice(1)
    : 'purchase order';

export const getReadOnlyMessage = createSelector(
  getIsLayoutSupported,
  getPurchaseOrderLayout,
  getIsForeignCurrency,
  (isLayoutSupported, layout, isForeignCurrency) => {
    if (!isLayoutSupported) {
      return `This purchase order is read only because the ${capitalise(
        layout
      )} layout isn't supported in the browser. Switch to AccountRight desktop to edit this purchase order.`;
    }

    if (isForeignCurrency) {
      return "This purchase order is read only because multi-currency isn't supported int the browser. Switch to AccountRight desktop to edit this purchase order.";
    }

    return 'This purchase order is read only because it contains unsupported features. Switch to AccountRight desktop to edit this purchase order.';
  }
);

export const getShouldShowAbn = createSelector(
  getRegion,
  getSupplierId,
  (region, supplierId) => region === Region.au && supplierId
);

export const getAbnLink = createSelector(getAbn, (abn) =>
  abn ? buildAbnLink(abn.abn) : ''
);

export const getSupplierLink = createSelector(
  getBusinessId,
  getRegion,
  getSupplierId,
  (businessId, region, supplierId) =>
    `/#/${region}/${businessId}/contact/${supplierId}`
);

export const getIsCalculableLine = (line) =>
  [PurchaseOrderLineType.SERVICE, PurchaseOrderLineType.ITEM].includes(
    line.type
  );

export const calculateTotals = ({ lines, isTaxInclusive }) => {
  const calculableLines = lines.filter((line) => getIsCalculableLine(line));
  const lineTotals = calculateLineTotals({
    isTaxInclusive,
    lines: calculableLines,
  });

  return {
    totalTax: lineTotals.totalTax.valueOf(),
    totalAmount: lineTotals.totalAmount.valueOf(),
    subTotal: lineTotals.subTotal.valueOf(),
  };
};

export const getTotals = createSelector(
  getLines,
  getIsTaxInclusive,
  (lines, isTaxInclusive) =>
    calculateTotals({
      lines,
      isTaxInclusive,
    })
);

const calculateAmountDue = (totalAmount, amountPaid) => {
  const total = Decimal(totalAmount);
  const paid = Decimal(amountPaid || '0');
  return total.minus(paid).valueOf();
};

export const getAmountDue = createSelector(
  getTotals,
  getAmountPaid,
  ({ totalAmount }, amountPaid) => calculateAmountDue(totalAmount, amountPaid)
);

export const getIsBeforeConversionDate = createSelector(
  getIssueDate,
  getConversionDate,
  (issueDate, conversionDate) =>
    issueDate &&
    conversionDate &&
    isBefore(new Date(issueDate), new Date(conversionDate))
);

const getIsBeforeStartOfFinancialYear = createSelector(
  getIssueDate,
  getStartOfFinancialYearDate,
  (issueDate, startOfFinancialYearDate) =>
    issueDate &&
    startOfFinancialYearDate &&
    isBefore(new Date(issueDate), new Date(startOfFinancialYearDate))
);

export const getIsBeforeFYAndAfterConversionDate = createSelector(
  getIsBeforeConversionDate,
  getIsBeforeStartOfFinancialYear,
  (isBeforeConversionDate, isBeforeStartOfFinancialYear) =>
    !isBeforeConversionDate && isBeforeStartOfFinancialYear
);

export const getContactComboboxContext = (state) => {
  const businessId = getBusinessId(state);
  const region = getRegion(state);
  const supplierId = getSupplierId(state);

  return {
    businessId,
    region,
    contactId: supplierId,
    contactType: ContactType.SUPPLIER,
    displayMode: DisplayMode.NAME_ONLY,
  };
};

export const getViewedAccountToolTip = (state) => state.viewedAccountToolTip;
