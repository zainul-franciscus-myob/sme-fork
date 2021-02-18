import { Decimal } from 'decimal.js';
import { createSelector } from 'reselect';

import ContactType from '../../../contact/contactCombobox/types/ContactType';
import DisplayMode from '../../../contact/contactCombobox/types/DisplayMode';
import ItemTypes from '../../../inventory/itemCombobox/ItemTypes';
import PurchaseLayout from '../types/PurchaseLayout';
import PurchaseLineType from '../types/PurchaseLineType';
import Region from '../../../../common/types/Region';
import buildAbnLink from '../../../../common/links/buildAbnLink';
import calculateLineTotals from '../../../../common/taxCalculator/calculateLineTotals';
import getRegionToDialectText from '../../../../dialect/getRegionToDialectText';

export const getBusinessId = (state) => state.businessId;
export const getRegion = (state) => state.region;
export const getRecurringTransactionId = (state) =>
  state.recurringTransactionId;
export const getTransactionType = (state) => state.transactionType;

const getIsRecurringTransactionEnabled = (state) =>
  state.isRecurringTransactionEnabled;

export const getBill = (state) => state.bill;
export const getRecurringBillLayout = (state) => state.bill.layout;

export const getSchedule = (state) => state.schedule;
export const getScheduleName = (state) => state.schedule.name;
export const getScheduleRemainingTimes = (state) =>
  state.schedule.remainingTimes;

export const getSupplierId = (state) => state.bill.supplierId;
export const getSupplierAddress = (state) => state.bill.supplierAddress;
export const getNote = (state) => state.bill.note;
export const getExpirationTerm = (state) => state.bill.expirationTerm;
export const getExpirationDays = (state) => state.bill.expirationDays;
export const getIsTaxInclusive = (state) => state.bill.isTaxInclusive;
export const getIsReportable = (state) => state.bill.isReportable;
export const getAmountPaid = (state) => state.bill.amountPaid;
export const getLines = (state) => state.bill.lines;
const getRecurringBillLinesLength = (state) => state.bill.lines.length;
const getTaxExclusiveFreightAmount = (state) =>
  state.bill.taxExclusiveFreightAmount;
const getFreightTaxAmount = (state) => state.bill.freightTaxAmount;
const getFreightTaxCodeId = (state) => state.bill.freightTaxCodeId;
export const getHasFreightAmount = (state) =>
  !!Number(state.bill.taxExclusiveFreightAmount);

export const getAbn = (state) => state.abn;
export const getAccountOptions = (state) => state.accountOptions;
export const getExpirationTermOptions = (state) => state.expirationTermOptions;
export const getTaxCodeOptions = (state) => state.taxCodeOptions;

export const getLoadingState = (state) => state.loadingState;
export const getIsSubmitting = (state) => state.isSubmitting;
export const getIsSupplierBlocking = (state) => state.isSupplierBlocking;
export const getIsAbnLoading = (state) => state.isAbnLoading;
export const getIsPageEdited = (state) => state.isPageEdited;
export const getIsLineEdited = (state) => state.isLineEdited;
export const getModalType = (state) => state.modalType;
export const getAlert = (state) => state.alert;
export const getRedirectUrl = (state) => state.redirectUrl;

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

export const getIsCreating = createSelector(
  getRecurringTransactionId,
  (recurringTransactionId) => recurringTransactionId === 'new'
);

export const getIsLinesEmpty = createSelector(
  getLines,
  (lines) => lines.length === 0
);

export const getTitle = createSelector(
  getIsCreating,
  getScheduleName,
  (isCreating, transactionName) =>
    isCreating ? 'Create recurring transaction' : transactionName
);

export const getTableData = createSelector(getRecurringBillLinesLength, (len) =>
  Array(len).fill({})
);

export const getBillLine = (state, { index }) => {
  const line = state.bill.lines[index];
  const { newLine } = state;

  if (line) {
    return line.type === PurchaseLineType.SUB_TOTAL
      ? { ...line, description: 'Subtotal' }
      : line;
  }

  return newLine;
};

export const getIsNewLine = createSelector(
  getRecurringBillLinesLength,
  (_, props) => props,
  (newLineIndex, { index }) => newLineIndex <= index
);

export const getNewLineIndex = getRecurringBillLinesLength;

export const getUniqueSelectedItemIds = (state) => {
  if (
    state.bill.layout === PurchaseLayout.ITEM_AND_SERVICE &&
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

export const getAccountModalContext = (state) => {
  const businessId = getBusinessId(state);
  const region = getRegion(state);

  return { businessId, region };
};

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
  [PurchaseLineType.SERVICE, PurchaseLineType.ITEM].includes(line.type);

const getIsLayoutSupported = createSelector(getRecurringBillLayout, (layout) =>
  [PurchaseLayout.SERVICE, PurchaseLayout.ITEM_AND_SERVICE].includes(layout)
);

export const getIsLinesSupported = createSelector(getLines, (lines) =>
  lines.every((line) => getIsLineTypeSupported(line))
);

export const getIsReadOnly = createSelector(
  getIsLayoutSupported,
  getIsLinesSupported,
  getHasFreightAmount,
  (isLayoutSupported, isLinesSupported, hasFreightAmount) =>
    !isLayoutSupported || !isLinesSupported || hasFreightAmount
);

const capitalise = (word) =>
  word && word.length ? word[0].toUpperCase() + word.slice(1) : 'bill';

export const getReadOnlyMessage = createSelector(
  getIsLayoutSupported,
  getRecurringBillLayout,
  getHasFreightAmount,
  (isLayoutSupported, layout, hasFreightAmount) => {
    if (!isLayoutSupported) {
      return `This recurring transaction is read only because the ${capitalise(
        layout
      )} layout isn't supported in the browser. Switch to AccountRight desktop to edit this recurring transaction.`;
    }

    if (hasFreightAmount) {
      return "This recurring transaction is read only because freight isn't supported in the browser. Switch to AccountRight desktop to edit this recurring transaction.";
    }

    return 'This recurring transaction is read only because it contains unsupported features. Switch to AccountRight desktop to edit this recurring transaction.';
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
  [PurchaseLineType.SERVICE, PurchaseLineType.ITEM].includes(line.type);

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

export const getJobModalContext = (state) => {
  const businessId = getBusinessId(state);
  const region = getRegion(state);

  return { businessId, region };
};

export const getUniqueSelectedJobIds = (state) => {
  const lines = getLines(state);

  if (lines.length > 0) {
    const selectedJobIds = lines.reduce((jobIds, line) => {
      if (line.jobId) {
        jobIds.push(line.jobId);
      }
      return jobIds;
    }, []);
    return [...new Set([...selectedJobIds])];
  }

  return [];
};

export const getIsDisabled = createSelector(
  getIsSubmitting,
  getIsReadOnly,
  (isSubmitting, isReadOnly) => isSubmitting || isReadOnly
);

export const getRecurringScheduleOptions = createSelector(
  getSchedule,
  getTransactionType,
  getIsDisabled,
  (schedule, transactionType, isDisabled) => ({
    ...schedule,
    transactionType,
    isDisabled,
    showTransactionType: true,
  })
);

export const getIsFeatureAvailable = createSelector(
  getIsRecurringTransactionEnabled,
  (isRecurringTransactionEnabled) => isRecurringTransactionEnabled
);

export const getRecurringTransactionListUrl = createSelector(
  getRegion,
  getBusinessId,
  (region, businessId) => `/#/${region}/${businessId}/recurringTransaction`
);
