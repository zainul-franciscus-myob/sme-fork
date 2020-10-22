import { createSelector, createStructuredSelector } from 'reselect';
import { format, isBefore } from 'date-fns';
import Decimal from 'decimal.js';

import {
  TaxCalculatorTypes,
  createTaxCalculator,
} from '../../../../common/taxCalculator';
import ContactType from '../../../contact/contactCombobox/types/ContactType';
import DisplayMode from '../../../contact/contactCombobox/types/DisplayMode';
import InvoiceLayout from '../types/InvoiceLayout';
import InvoiceLineType from '../types/InvoiceLineType';
import ItemTypes from '../../../inventory/itemCombobox/ItemTypes';
import Region from '../../../../common/types/Region';
import buildAbnLink from '../../../../common/links/buildAbnLink';
import calculateLineTotals from '../../../../common/taxCalculator/calculateLineTotals';
import getRegionToDialectText from '../../../../dialect/getRegionToDialectText';

const calculate = createTaxCalculator(TaxCalculatorTypes.invoice);

export const getBusinessId = (state) => state.businessId;
export const getRegion = (state) => state.region;
export const getInvoiceId = (state) => state.invoiceId;
export const getQuoteIdQueryParam = (state) => state.quoteId;
export const getDuplicateId = (state) => state.duplicateId;

export const getLoadingState = (state) => state.loadingState;
export const getIsSubmitting = (state) => state.isSubmitting;
export const getIsPageEdited = (state) => state.isPageEdited;
export const getIsAbnLoading = (state) => state.isAbnLoading;
export const getAlert = (state) => state.alert;
export const getModalType = (state) => state.modalType;
export const getModalAlert = (state) => state.modalAlert;
export const getIsModalActionDisabled = (state) => state.isModalSubmitting;

export const getInvoice = (state) => state.invoice;
export const getLayout = (state) => state.invoice.layout;
export const getCustomerId = (state) => state.invoice.customerId;
const getAddress = (state) => state.invoice.address;
const getNote = (state) => state.invoice.note;
export const getInvoiceNumber = (state) => state.invoice.invoiceNumber;
export const getQuoteId = (state) => state.invoice.quoteId;
const getPurchaseOrderNumber = (state) => state.invoice.purchaseOrderNumber;
export const getIssueDate = (state) => state.invoice.issueDate;
export const getIsTaxInclusive = (state) => state.invoice.isTaxInclusive;
export const getExpirationTerm = (state) => state.invoice.expirationTerm;
export const getExpirationDays = (state) =>
  Number(state.invoice.expirationDays);
export const getIsAllowOnlinePayments = (state) =>
  state.invoice.isAllowOnlinePayments;
export const getCanApplySurcharge = (state) => state.invoice.canApplySurcharge;
export const getAmountPaid = (state) => state.invoice.amountPaid;
export const getLines = (state) => state.invoice.lines;
export const getLength = (state) => state.invoice.lines.length;
export const getNewLine = (state) => state.newLine;

export const getExpirationTermOptions = (state) => state.expirationTermOptions;
export const getTaxCodeOptions = (state) => state.taxCodeOptions;
export const getAccountOptions = (state) => state.accountOptions;
export const getSerialNumber = (state) => state.serialNumber;

export const getIsTrial = (state) => state.subscription.isTrial;
export const getIsUpgradeModalShowing = (state) =>
  state.subscription.isUpgradeModalShowing;
export const getMonthlyLimit = (state) => state.subscription.monthlyLimit;

export const getAbn = (state) => state.abn;

export const getIsLineAmountDirty = (state) => state.isLineAmountDirty;

export const getTemplateOptions = (state) => state.template.templateOptions;

export const getIsForeignCurrency = (state) => state.invoice.isForeignCurrency;

export const getHasFreightAmount = (state) =>
  !!Number(state.invoice.taxExclusiveFreightAmount);
const getFreightInfo = ({
  invoice: {
    taxExclusiveFreightAmount,
    freightTaxAmount,
    freightTaxCodeId,
    isTaxInclusive,
  },
}) => ({
  taxExclusiveFreightAmount,
  freightTaxAmount,
  freightTaxCodeId,
  isTaxInclusive,
});

export const getIsCalculableLine = (line) =>
  [InvoiceLineType.SERVICE, InvoiceLineType.ITEM].includes(line.type);

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
  getInvoiceId,
  (invoiceId) => invoiceId === 'new'
);

export const getIsServiceLayout = createSelector(
  getLayout,
  (layout) => layout === InvoiceLayout.SERVICE
);

const getIsLineTypeSupported = (line) =>
  [InvoiceLineType.SERVICE, InvoiceLineType.ITEM].includes(line.type);

const getIsLayoutSupported = createSelector(getLayout, (layout) =>
  [InvoiceLayout.SERVICE, InvoiceLayout.ITEM_AND_SERVICE].includes(layout)
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

export const getLayoutDisplayName = (layout) =>
  ({
    [InvoiceLayout.SERVICE]: 'Services',
    [InvoiceLayout.ITEM_AND_SERVICE]: 'Services and items',
    [InvoiceLayout.PROFESSIONAL]: 'Professional',
    [InvoiceLayout.TIME_BILLING]: 'Time billing',
    [InvoiceLayout.MISCELLANEOUS]: 'Miscellaneous',
  }[layout] || layout);

export const getReadOnlyMessage = createSelector(
  getIsLayoutSupported,
  getLayout,
  getHasFreightAmount,
  getIsForeignCurrency,
  (isLayoutSupported, layout, hasFreightAmount, isForeignCurrency) => {
    if (!isLayoutSupported) {
      return `This invoice is read only because the ${getLayoutDisplayName(
        layout
      )} layout isn't supported in the browser. Switch to AccountRight desktop to edit this invoice.`;
    }

    if (hasFreightAmount) {
      return "This invoice is read only because freight isn't supported in the browser. Switch to AccountRight desktop to edit this invoice.";
    }

    if (isForeignCurrency) {
      return "This invoice is read only because multi-currency isn't supported in the browser. Switch to AccountRight desktop to edit this invoice.";
    }

    return 'This invoice is read only because it contains unsupported features. Switch to AccountRight desktop to edit this invoice.';
  }
);

const getCommentOptions = (state) =>
  state.comments.map((comment) => ({ value: comment }));

export const getIsCustomerDisabled = createSelector(
  getIsCreating,
  getQuoteIdQueryParam,
  (isCreating, quoteId) => !isCreating || (isCreating && Boolean(quoteId))
);

export const getIsPreConversion = (state) => state.isPreConversion;
export const getShowPreConversionAlert = (state) =>
  state.showPreConversionAlert;

export const getShowOnlinePayment = createSelector(
  getRegion,
  getIsPreConversion,
  (region, isPreConversion) => region === 'au' && !isPreConversion
);

const createRegionDialectSelector = (text) =>
  createSelector(getRegion, (region) => getRegionToDialectText(region)(text));

export const getTaxCodeLabel = createRegionDialectSelector('Tax code');

export const getTaxInclusiveLabel = createRegionDialectSelector(
  'Tax inclusive'
);

export const getTaxExclusiveLabel = createRegionDialectSelector(
  'Tax exclusive'
);

export const getInvoiceDetailOptions = createStructuredSelector({
  customerId: getCustomerId,
  invoiceNumber: getInvoiceNumber,
  quoteId: getQuoteId,
  address: getAddress,
  purchaseOrderNumber: getPurchaseOrderNumber,
  issueDate: getIssueDate,
  expirationDays: getExpirationDays,
  expirationTerm: getExpirationTerm,
  expirationTermOptions: getExpirationTermOptions,
  isTaxInclusive: getIsTaxInclusive,
  isCustomerDisabled: getIsCustomerDisabled,
  isSubmitting: getIsSubmitting,
  showOnlinePayment: getShowOnlinePayment,
  taxInclusiveLabel: getTaxInclusiveLabel,
  taxExclusiveLabel: getTaxExclusiveLabel,
});

export const getInvoiceDetailNotes = createStructuredSelector({
  note: getNote,
  commentOptions: getCommentOptions,
});

export const calculateAmountDue = (totalAmount, amountPaid) => {
  const total = Decimal(totalAmount);
  const paid = Decimal(amountPaid || '0');
  return total.minus(paid).valueOf();
};

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

export const getInvoiceDetailTotals = createSelector(
  getTotals,
  getAmountPaid,
  getIsCreating,
  getIsPreConversion,
  getFreightInfo,
  getTaxCodeOptions,
  getHasFreightAmount,
  getTaxLabel,
  (
    totals,
    amountPaid,
    isCreating,
    isPreConversion,
    freightInfo,
    taxCodeOptions,
    hasFreightAmount,
    taxLabel
  ) => ({
    subTotal: totals.subTotal,
    freightAmount: calculateFreightAmount(freightInfo),
    totalTax: totals.totalTax,
    totalAmount: totals.totalAmount,
    amountPaid: amountPaid === '' ? '0.00' : amountPaid,
    amountDue: calculateAmountDue(totals.totalAmount, amountPaid),
    showFreight: hasFreightAmount,
    freightTaxCode: taxCodeOptions.find(
      (taxCode) => taxCode.id === freightInfo.freightTaxCodeId
    )?.displayName,
    isCreating,
    isPreConversion,
    taxLabel,
  })
);

const getTitle = createSelector(
  getInvoiceNumber,
  getIsCreating,
  (invoiceNumber, isCreating) =>
    isCreating ? 'Create invoice' : `Invoice ${invoiceNumber}`
);

export const getInvoiceDetailTotalHeader = createSelector(
  getTotals,
  getAmountPaid,
  getTitle,
  getIsCreating,
  (totals, amountPaid, title, isCreating) => ({
    totalAmount: totals.totalAmount,
    amountPaid,
    amountDue: calculateAmountDue(totals.totalAmount, amountPaid),
    title,
    isCreating,
  })
);

export const getAmountDue = createSelector(
  getTotals,
  getAmountPaid,
  ({ totalAmount }, amountPaid) => calculateAmountDue(totalAmount, amountPaid)
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
      return line.type === InvoiceLineType.SUB_TOTAL
        ? { ...line, description: 'Subtotal' }
        : line;
    }

    return newLine;
  }
);

export const getAccountModalContext = (state) => {
  const businessId = getBusinessId(state);
  const region = getRegion(state);

  return { businessId, region };
};

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

export const getIsBeforeConversionDate = (state) => {
  const { conversionDate, invoice } = state;
  const { issueDate } = invoice;
  return (
    issueDate &&
    conversionDate &&
    isBefore(new Date(issueDate), new Date(conversionDate))
  );
};

export const getConversionMonthYear = (state) => {
  const { conversionDate } = state;
  return format(new Date(conversionDate), 'MMMM yyyy');
};

const getIsBeforeStartOfFinancialYear = (state) => {
  const { startOfFinancialYearDate, invoice } = state;
  const { issueDate } = invoice;
  return (
    issueDate &&
    startOfFinancialYearDate &&
    isBefore(new Date(issueDate), new Date(startOfFinancialYearDate))
  );
};

export const getIsBeforeFYAndAfterConversionDate = createSelector(
  getIsBeforeConversionDate,
  getIsBeforeStartOfFinancialYear,
  (isBeforeConversionDate, isBeforeStartOfFinancialYear) =>
    !isBeforeConversionDate && isBeforeStartOfFinancialYear
);

export const getShouldShowAbn = createSelector(
  getRegion,
  getCustomerId,
  (region, customerId) => region === Region.au && customerId
);

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

  if (layout === InvoiceLayout.ITEM_AND_SERVICE && lines.length > 0) {
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

export const getViewedAccountToolTip = (state) => state.viewedAccountToolTip;
