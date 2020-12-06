import { createSelector, createStructuredSelector } from 'reselect';
import Decimal from 'decimal.js';

import {
  TaxCalculatorTypes,
  createTaxCalculator,
} from '../../../../common/taxCalculator';
import ContactType from '../../../contact/contactCombobox/types/ContactType';
import DisplayMode from '../../../contact/contactCombobox/types/DisplayMode';
import ItemTypes from '../../../inventory/itemCombobox/ItemTypes';
import Region from '../../../../common/types/Region';
import SalesLayout from '../../types/SalesLayout';
import SalesLineType from '../../types/SalesLineType';
import buildAbnLink from '../../../../common/links/buildAbnLink';
import calculateLineTotals from '../../../../common/taxCalculator/calculateLineTotals';
import getRegionToDialectText from '../../../../dialect/getRegionToDialectText';

const calculate = createTaxCalculator(TaxCalculatorTypes.invoice);

export const getBusinessId = (state) => state.businessId;
export const getRegion = (state) => state.region;
export const getRecurringTransactionId = (state) =>
  state.recurringTransactionId;

export const getLoadingState = (state) => state.loadingState;
export const getIsSubmitting = (state) => state.isSubmitting;
export const getIsPageEdited = (state) => state.isPageEdited;
export const getIsAbnLoading = (state) => state.isAbnLoading;
export const getAlert = (state) => state.alert;
export const getModalType = (state) => state.modalType;

export const getTransactionType = (state) => state.transactionType;

export const getSchedule = (state) => state.schedule;
export const getScheduleName = (state) => state.schedule.name;

export const getInvoice = (state) => state.invoice;
export const getLayout = (state) => state.invoice.layout;
export const getCustomerId = (state) => state.invoice.customerId;
const getAddress = (state) => state.invoice.address;
const getExpirationDays = (state) => state.invoice.expirationDays;
const getExpirationTerm = (state) => state.invoice.expirationTerm;
const getNote = (state) => state.invoice.note;
export const getIsTaxInclusive = (state) => state.invoice.isTaxInclusive;
export const getIsAllowOnlinePayments = (state) =>
  state.invoice.isAllowOnlinePayments;
export const getLines = (state) => state.invoice.lines;
export const getLength = (state) => state.invoice.lines.length;
export const getNewLine = (state) => state.newLine;
export const getIsLineAmountDirty = (state) => state.isLineAmountDirty;
const getTaxExclusiveFreightAmount = (state) =>
  state.invoice.taxExclusiveFreightAmount;
const getFreightTaxAmount = (state) => state.invoice.freightTaxAmount;
const getFreightTaxCodeId = (state) => state.invoice.freightTaxCodeId;

export const getAbn = (state) => state.abn;

const getExpirationTermOptions = (state) => state.expirationTermOptions;
export const getTaxCodeOptions = (state) => state.taxCodeOptions;
export const getAccountOptions = (state) => state.accountOptions;
export const getTransactionTypeOptions = (state) =>
  state.transactionTypeOptions;

const getIsRecurringTransactionEnabled = (state) =>
  state.isRecurringTransactionEnabled;

export const getHasFreightAmount = createSelector(
  getTaxExclusiveFreightAmount,
  (taxExclusiveFreightAmount) => !!Number(taxExclusiveFreightAmount)
);

const getFreightInfo = createStructuredSelector({
  taxExclusiveFreightAmount: getTaxExclusiveFreightAmount,
  freightTaxAmount: getFreightTaxAmount,
  freightTaxCodeId: getFreightTaxCodeId,
  isTaxInclusive: getIsTaxInclusive,
});

export const getIsCalculableLine = (line) =>
  [SalesLineType.SERVICE, SalesLineType.ITEM].includes(line.type);

export const calculateTotals = ({
  lines,
  isTaxInclusive,
  taxExclusiveFreightAmount = 0,
  freightTaxAmount = 0,
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
  getFreightInfo,
  (lines, isTaxInclusive, { taxExclusiveFreightAmount, freightTaxAmount }) =>
    calculateTotals({
      lines,
      isTaxInclusive,
      taxExclusiveFreightAmount,
      freightTaxAmount,
    })
);

export const getIsCreating = createSelector(
  getRecurringTransactionId,
  (recurringTransactionId) => recurringTransactionId === 'new'
);

export const getIsServiceLayout = createSelector(
  getLayout,
  (layout) => layout === SalesLayout.SERVICE
);

const getIsLineTypeSupported = (line) =>
  [SalesLineType.SERVICE, SalesLineType.ITEM].includes(line.type);

const getIsLayoutSupported = createSelector(getLayout, (layout) =>
  [SalesLayout.SERVICE, SalesLayout.ITEM_AND_SERVICE].includes(layout)
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

export const getLayoutDisplayName = (layout) =>
  ({
    [SalesLayout.SERVICE]: 'Services',
    [SalesLayout.ITEM_AND_SERVICE]: 'Services and items',
    [SalesLayout.PROFESSIONAL]: 'Professional',
    [SalesLayout.TIME_BILLING]: 'Time billing',
    [SalesLayout.MISCELLANEOUS]: 'Miscellaneous',
  }[layout] || layout);

export const getReadOnlyMessage = createSelector(
  getIsLayoutSupported,
  getLayout,
  getHasFreightAmount,
  (isLayoutSupported, layout, hasFreightAmount) => {
    if (!isLayoutSupported) {
      return `This invoice is read only because the ${getLayoutDisplayName(
        layout
      )} layout isn't supported in the browser. Switch to AccountRight desktop to edit this invoice.`;
    }

    if (hasFreightAmount) {
      return "This invoice is read only because freight isn't supported in the browser. Switch to AccountRight desktop to edit this invoice.";
    }

    return 'This invoice is read only because it contains unsupported features. Switch to AccountRight desktop to edit this invoice.';
  }
);

const getCommentOptions = (state) =>
  state.commentOptions.map((comment) => ({ value: comment }));

const createRegionDialectSelector = (text) =>
  createSelector(getRegion, (region) => getRegionToDialectText(region)(text));

export const getTaxCodeLabel = createRegionDialectSelector('Tax code');

export const getTaxInclusiveLabel = createRegionDialectSelector(
  'Tax inclusive'
);

export const getTaxExclusiveLabel = createRegionDialectSelector(
  'Tax exclusive'
);

export const getShouldShowAbn = createSelector(
  getRegion,
  getCustomerId,
  (region, customerId) => region === Region.au && customerId
);

export const getShouldShowOnlinePayment = createSelector(
  getRegion,
  (region) => region === Region.au
);

export const getRecurringInvoiceOptions = createStructuredSelector({
  customerId: getCustomerId,
  address: getAddress,
  expirationDays: getExpirationDays,
  expirationTerm: getExpirationTerm,
  expirationTermOptions: getExpirationTermOptions,
  isTaxInclusive: getIsTaxInclusive,
  isSubmitting: getIsSubmitting,
  taxInclusiveLabel: getTaxInclusiveLabel,
  taxExclusiveLabel: getTaxExclusiveLabel,
  isReadOnly: getIsReadOnly,
  shouldShowAbn: getShouldShowAbn,
  shouldShowOnlinePayment: getShouldShowOnlinePayment,
});

export const getRecurringInvoiceNotes = createStructuredSelector({
  note: getNote,
  commentOptions: getCommentOptions,
  isSubmitting: getIsSubmitting,
  isReadOnly: getIsReadOnly,
});

export const calculateFreightAmount = ({
  taxExclusiveFreightAmount,
  freightTaxAmount,
  isTaxInclusive,
}) =>
  isTaxInclusive
    ? Decimal(taxExclusiveFreightAmount)
        .add(Decimal(freightTaxAmount))
        .valueOf()
    : taxExclusiveFreightAmount;

export const getTaxLabel = createRegionDialectSelector('Tax');

export const getRecurringInvoiceTotals = createSelector(
  getTotals,
  getIsCreating,
  getFreightInfo,
  getTaxCodeOptions,
  getHasFreightAmount,
  getTaxLabel,
  (
    totals,
    isCreating,
    freightInfo,
    taxCodeOptions,
    hasFreightAmount,
    taxLabel
  ) => ({
    subTotal: totals.subTotal,
    totalTax: totals.totalTax,
    totalAmount: totals.totalAmount,
    taxLabel,
    showFreight: hasFreightAmount,
    freightAmount: calculateFreightAmount(freightInfo),
    freightTaxCode: taxCodeOptions.find(
      (taxCode) => taxCode.id === freightInfo.freightTaxCodeId
    )?.displayName,
  })
);

export const getTitle = createSelector(
  getIsCreating,
  getScheduleName,
  (isCreating, transactionName) =>
    isCreating ? 'Create recurring transaction' : transactionName
);

export const getTableData = createSelector(getLength, (len) =>
  Array(len).fill({})
);

export const getIsTableEmpty = createSelector(getLength, (len) => len === 0);

export const getNewLineIndex = (state) => getLength(state);

const getInvoiceLineByIndex = (state, props) =>
  state.invoice.lines[props.index];

export const getInvoiceLine = createSelector(
  getNewLine,
  getInvoiceLineByIndex,
  (newLine, line) => {
    if (line) {
      return line.type === SalesLineType.SUB_TOTAL
        ? { ...line, description: 'Subtotal' }
        : line;
    }

    return newLine;
  }
);

export const getTaxCalculations = (state, isSwitchingTaxInclusive) => {
  const isTaxInclusive = getIsTaxInclusive(state);
  const isLineAmountsTaxInclusive = isSwitchingTaxInclusive
    ? !isTaxInclusive
    : isTaxInclusive;
  const lines = getLines(state);
  const taxCodes = getTaxCodeOptions(state);
  return calculate({
    lines,
    taxCodes,
    isTaxInclusive,
    isLineAmountsTaxInclusive,
  });
};

export const getShouldSaveAndReload = (state) => {
  const isCreating = getIsCreating(state);
  const isPageEdited = getIsPageEdited(state);

  return isCreating || isPageEdited;
};

export const getAbnLink = createSelector(getAbn, (abn) =>
  abn ? buildAbnLink(abn.abn) : ''
);

export const getCustomerLink = createSelector(
  getBusinessId,
  getRegion,
  getCustomerId,
  (businessId, region, customerId) =>
    `/#/${region}/${businessId}/contact/${customerId}`
);

export const getContactComboboxContext = (state) => {
  const businessId = getBusinessId(state);
  const region = getRegion(state);
  const customerId = getCustomerId(state);

  return {
    businessId,
    region,
    contactId: customerId,
    contactType: ContactType.CUSTOMER,
    displayMode: DisplayMode.NAME_ONLY,
  };
};

export const getItemComboboxContext = (state) => {
  const businessId = getBusinessId(state);
  const region = getRegion(state);

  return {
    businessId,
    region,
    itemType: ItemTypes.Sold,
  };
};

export const getUniqueSelectedItemIds = (state) => {
  const layout = getLayout(state);
  const lines = getLines(state);

  if (layout === SalesLayout.ITEM_AND_SERVICE && lines.length > 0) {
    const selectedItemIds = lines.reduce((itemIds, line) => {
      if (line.itemId) {
        itemIds.push(line.itemId);
      }
      return itemIds;
    }, []);
    return [...new Set([...selectedItemIds])];
  }

  return [];
};

export const getJobComboboxContext = (state) => {
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

export const getAccountModalContext = (state) => {
  const businessId = getBusinessId(state);
  const region = getRegion(state);

  return { businessId, region };
};

export const getRecurringTransactionRedirectParams = (
  state,
  transactionType
) => {
  const businessId = getBusinessId(state);
  const region = getRegion(state);
  const recurringTransactionId = getRecurringTransactionId(state);

  return { businessId, region, recurringTransactionId, transactionType };
};

export const getRecurringTransactionListUrl = (state) => {
  const businessId = getBusinessId(state);
  const region = getRegion(state);

  return `/#/${region}/${businessId}/recurringTransaction`;
};

export const getRedirectState = ({ redirectUrl, isOpenInNewTab }) => ({
  redirectUrl,
  isOpenInNewTab,
});

const getIsDisabled = createSelector(
  getIsSubmitting,
  getIsReadOnly,
  (isSubmitting, isReadOnly) => isSubmitting || isReadOnly
);

export const getRecurringScheduleOptions = createStructuredSelector({
  name: getScheduleName,
  transactionType: getTransactionType,
  transactionTypeOptions: getTransactionTypeOptions,
  isDisabled: getIsDisabled,
});

export const getIsFeatureAvailable = createSelector(
  getIsRecurringTransactionEnabled,
  (isRecurringTransactionEnabled) => isRecurringTransactionEnabled
);
