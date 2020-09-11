import { Decimal } from 'decimal.js';
import { createSelector } from 'reselect';
import { isBefore } from 'date-fns';

import BillLayout from '../types/BillLayout';
import BillLineType from '../types/BillLineType';
import ContactType from '../../../contact/contactCombobox/types/ContactType';
import DisplayMode from '../../../contact/contactCombobox/types/DisplayMode';
import ItemTypes from '../../../inventory/itemCombobox/ItemTypes';
import Region from '../../../../common/types/Region';
import buildAbnLink from '../../../../common/links/buildAbnLink';
import calculateLineTotals from '../../../../common/taxCalculator/calculateLineTotals';
import getRegionToDialectText from '../../../../dialect/getRegionToDialectText';

export const getBusinessId = (state) => state.businessId;
export const getRegion = (state) => state.region;
export const getBillId = (state) => state.billId;
export const getBillLayout = (state) => state.bill.layout;
export const getBillUid = (state) => state.bill.uid;
export const getDuplicateId = (state) => state.duplicateId;
export const getRedirectUrl = (state) => state.redirectUrl;

export const getSupplierId = (state) => state.bill.supplierId;
export const getSupplierAddress = (state) => state.bill.supplierAddress;
export const getExpenseAccountId = (state) => state.bill.expenseAccountId;
export const getNote = (state) => state.bill.note;
export const getBillNumber = (state) => state.bill.billNumber;
export const getSupplierInvoiceNumber = (state) =>
  state.bill.supplierInvoiceNumber;
export const getIssueDate = (state) => state.bill.issueDate;
export const getExpirationTerm = (state) => state.bill.expirationTerm;
export const getExpirationDays = (state) => state.bill.expirationDays;
export const getIsTaxInclusive = (state) => state.bill.isTaxInclusive;
export const getIsReportable = (state) => state.bill.isReportable;
export const getAmountPaid = (state) => state.bill.amountPaid;
export const getLines = (state) => state.bill.lines;
const getBillLinesLength = (state) => state.bill.lines.length;
const getTaxExclusiveFreightAmount = (state) =>
  state.bill.taxExclusiveFreightAmount;
const getFreightTaxAmount = (state) => state.bill.freightTaxAmount;
const getFreightTaxCodeId = (state) => state.bill.freightTaxCodeId;
export const getHasFreightAmount = (state) =>
  !!Number(state.bill.taxExclusiveFreightAmount);
export const getIsForeignCurrency = (state) => state.bill.isForeignCurrency;

export const getAbn = (state) => state.abn;
export const getAccountOptions = (state) => state.accountOptions;
export const getExpirationTermOptions = (state) => state.expirationTermOptions;
export const getTaxCodeOptions = (state) => state.taxCodeOptions;

export const getLoadingState = (state) => state.loadingState;
export const getIsBlocking = (state) => state.isBlocking;
export const getIsModalBlocking = (state) => state.isModalBlocking;
export const getIsSupplierBlocking = (state) => state.isSupplierBlocking;
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

const getConversionDate = (state) => state.conversionDate;
const getStartOfFinancialYearDate = (state) => state.startOfFinancialYearDate;

export const getIsCreating = createSelector(
  getBillId,
  (billId) => billId === 'new'
);

export const getIsCreatingFromInTray = createSelector(
  getIsCreating,
  (state) => state.source,
  (isCreating, source) => isCreating && source === 'inTray'
);

export const getPageTitle = createSelector(
  getIsCreatingFromInTray,
  getIsCreating,
  (state) => state.bill.billNumber,
  (isCreatingFromInTray, isCreating, billNumber) => {
    if (isCreatingFromInTray) {
      return 'Create bill from In Tray';
    }
    if (isCreating) {
      return 'Create bill';
    }
    return `Bill ${billNumber}`;
  }
);

export const getHasLineBeenPrefilled = (state, index) => {
  const line = state.bill.lines.find((_, lineIndex) => lineIndex === index);
  return Boolean(line.prefillStatus);
};

export const getHasNoteBeenPrefilled = (state) => state.prefillStatus.note;

export const getIsLinesEmpty = createSelector(
  getLines,
  (lines) => lines.length === 0
);

export const getPrefillButtonText = createSelector(
  getIsCreating,
  (isCreating) =>
    isCreating ? 'Prefill from a source document' : 'Link a source document'
);

export const getIsBillJobColumnEnabled = (state) =>
  state.isBillJobColumnEnabled;

export const getTableData = createSelector(getBillLinesLength, (len) =>
  Array(len).fill({})
);

export const getBillLine = (state, { index }) => {
  const line = state.bill.lines[index];
  const { newLine } = state;

  if (line) {
    return line.type === BillLineType.SUB_TOTAL
      ? { ...line, description: 'Subtotal' }
      : line;
  }

  return newLine;
};

export const getIsNewLine = createSelector(
  getBillLinesLength,
  (_, props) => props,
  (newLineIndex, { index }) => newLineIndex <= index
);

export const getNewLineIndex = getBillLinesLength;

export const getContextForInventoryModal = (state) => {
  const businessId = getBusinessId(state);
  const region = getRegion(state);

  return {
    businessId,
    region,
    isBuying: true,
    isSelling: false,
  };
};

export const getUniqueSelectedItemIds = (state) => {
  if (
    state.bill.layout === BillLayout.ITEM_AND_SERVICE &&
    state.bill.lines.length > 0
  ) {
    const selectedItemIds = state.bill.lines.reduce((itemIds, line) => {
      if (line.itemId) {
        itemIds.push(line.itemId);
      }
      return itemIds;
    }, []);
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

export const getShouldShowAccountCode = getIsCreatingFromInTray;

export const getIsSupplierDisabled = createSelector(
  getIsCreating,
  (isCreating) => !isCreating
);

export const getCreateSupplierContactModalContext = (state) => {
  const businessId = getBusinessId(state);
  const region = getRegion(state);

  return { businessId, region, contactType: 'Supplier' };
};

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
  [BillLineType.SERVICE, BillLineType.ITEM].includes(line.type);

const getIsLayoutSupported = createSelector(getBillLayout, (layout) =>
  [BillLayout.SERVICE, BillLayout.ITEM_AND_SERVICE].includes(layout)
);

export const getShowExportPdfButton = createSelector(
  getBillLayout,
  getIsForeignCurrency,
  (layout, isForeignCurrency) =>
    [BillLayout.SERVICE, BillLayout.ITEM_AND_SERVICE].includes(layout) &&
    !isForeignCurrency
);

export const getIsLinesSupported = createSelector(getLines, (lines) =>
  lines.every((line) => getIsLineTypeSupported(line))
);

export const getIsReadOnly = createSelector(
  getIsLayoutSupported,
  getIsLinesSupported,
  getHasFreightAmount,
  getIsForeignCurrency,
  (isLayoutSupported, isLinesSupported, hasFreightAmount, isForeignCurrency) =>
    !isLayoutSupported ||
    !isLinesSupported ||
    hasFreightAmount ||
    isForeignCurrency
);

const capitalise = (word) =>
  word && word.length ? word[0].toUpperCase() + word.slice(1) : 'bill';

export const getReadOnlyMessage = createSelector(
  getIsLayoutSupported,
  getBillLayout,
  getHasFreightAmount,
  getIsForeignCurrency,
  (isLayoutSupported, layout, hasFreightAmount, isForeignCurrency) => {
    if (!isLayoutSupported) {
      return `This bill is read only because the ${capitalise(
        layout
      )} layout isn't supported in the browser. Switch to AccountRight desktop to edit this bill.`;
    }

    if (hasFreightAmount) {
      return "This bill is read only because freight isn't supported in the browser. Switch to AccountRight desktop to edit this bill.";
    }

    if (isForeignCurrency) {
      return "This bill is read only because multi-currency isn't supported int the browser. Switch to AccountRight desktop to edit this bill.";
    }

    return 'This bill is read only because it contains unsupported features. Switch to AccountRight desktop to edit this bill.';
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
  [BillLineType.SERVICE, BillLineType.ITEM].includes(line.type);

export const calculateTotals = ({
  lines,
  isTaxInclusive,
  taxExclusiveFreightAmount,
  freightTaxAmount,
}) => {
  const calculableLines = lines.filter((line) => getIsCalculableLine(line));
  const lineTotals = calculateLineTotals({
    isTaxInclusive,
    lines: calculableLines,
  });

  return {
    totalTax: lineTotals.totalTax.plus(freightTaxAmount).valueOf(),
    totalAmount: lineTotals.totalAmount
      .plus(taxExclusiveFreightAmount)
      .plus(freightTaxAmount)
      .valueOf(),
    subTotal: lineTotals.subTotal.valueOf(),
  };
};

export const getTotals = createSelector(
  getLines,
  getIsTaxInclusive,
  getTaxExclusiveFreightAmount,
  getFreightTaxAmount,
  (lines, isTaxInclusive, taxExclusiveFreightAmount, freightTaxAmount) =>
    calculateTotals({
      lines,
      isTaxInclusive,
      taxExclusiveFreightAmount,
      freightTaxAmount,
    })
);

export const calculateAmountDue = (totalAmount, amountPaid) => {
  const total = Decimal(totalAmount);
  const paid = Decimal(amountPaid || '0');
  return total.minus(paid).valueOf();
};

export const getAmountDue = createSelector(
  getTotals,
  getAmountPaid,
  ({ totalAmount }, amountPaid) => calculateAmountDue(totalAmount, amountPaid)
);

export const getFreightAmount = createSelector(
  getTaxExclusiveFreightAmount,
  getFreightTaxAmount,
  getIsTaxInclusive,
  (taxExclusiveFreightAmount, freightTaxAmount, isTaxInclusive) =>
    isTaxInclusive
      ? Decimal(taxExclusiveFreightAmount)
          .add(Decimal(freightTaxAmount))
          .valueOf()
      : taxExclusiveFreightAmount
);

export const getFreightTaxCode = createSelector(
  getFreightTaxCodeId,
  getTaxCodeOptions,
  (freightTaxCodeId, taxCodeOptions) =>
    taxCodeOptions.find((taxCode) => taxCode.id === freightTaxCodeId)
      ?.displayName
);

const getIsBeforeConversionDate = createSelector(
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
