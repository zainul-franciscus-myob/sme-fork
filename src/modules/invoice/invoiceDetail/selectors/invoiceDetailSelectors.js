import { createSelector, createStructuredSelector } from 'reselect';
import Decimal from 'decimal.js';

import { TaxCalculatorTypes, createTaxCalculator } from '../../../../common/taxCalculator';
import InvoiceLayout from '../types/InvoiceLayout';
import InvoiceLineType from '../types/InvoiceLineType';
import getRegionToDialectText from '../../../../dialect/getRegionToDialectText';

const calculate = createTaxCalculator(TaxCalculatorTypes.invoice);

export const getBusinessId = state => state.businessId;
export const getRegion = state => state.region;
export const getInvoiceId = state => state.invoiceId;
export const getQuoteIdQueryParam = state => state.quoteId;
export const getDuplicateId = state => state.duplicateId;

export const getLoadingState = state => state.loadingState;
export const getIsSubmitting = state => state.isSubmitting;
export const getIsPageEdited = state => state.isPageEdited;
export const getIsContactLoading = state => state.isContactLoading;
export const getAlert = state => state.alert;
export const getModalType = state => state.modalType;
export const getModalAlert = state => state.modalAlert;
export const getIsModalActionDisabled = state => state.isModalSubmitting;

export const getInvoice = state => state.invoice;
export const getLayout = state => state.invoice.layout;
export const getContactId = state => state.invoice.contactId;
const getAddress = state => state.invoice.address;
const getNote = state => state.invoice.note;
export const getInvoiceNumber = state => state.invoice.invoiceNumber;
const getPurchaseOrderNumber = state => state.invoice.purchaseOrderNumber;
export const getIssueDate = state => state.invoice.issueDate;
export const getIsTaxInclusive = state => state.invoice.isTaxInclusive;
export const getExpirationTerm = state => state.invoice.expirationTerm;
export const getExpirationDays = state => Number(state.invoice.expirationDays);
export const getIsAllowOnlinePayments = state => state.invoice.isAllowOnlinePayments;
export const getAmountPaid = state => state.invoice.amountPaid;
export const getLines = state => state.invoice.lines;
export const getLength = state => state.invoice.lines.length;
export const getIsInvoiceJobColumnEnabled = state => state.isInvoiceJobColumnEnabled;

export const getNewLine = state => state.newLine;
export const getTotals = state => state.totals;

export const getContactOptions = state => state.contactOptions;
export const getExpirationTermOptions = state => state.expirationTermOptions;
export const getTaxCodeOptions = state => state.taxCodeOptions;
export const getItemOptions = state => state.itemOptions;
export const getAccountOptions = state => state.accountOptions;
export const getJobOptions = state => state.jobOptions;
export const getSerialNumber = state => state.serialNumber;

export const getIsTrial = state => state.subscription.isTrial;

export const getIsUpgradeModalShowing = state => state.subscription.isUpgradeModalShowing;

export const getMonthlyLimit = state => state.subscription.monthlyLimit;

export const getIsLineAmountDirty = state => state.isLineAmountDirty;

export const getTemplateOptions = (state) => {
  if (state.invoice.layout === InvoiceLayout.ITEM_AND_SERVICE) {
    return state.itemTemplate.templateOptions;
  }
  return state.serviceTemplate.templateOptions;
};

export const getIsCreating = createSelector(getInvoiceId, invoiceId => invoiceId === 'new');

export const getIsServiceLayout = createSelector(
  getLayout,
  layout => layout === InvoiceLayout.SERVICE,
);

const getIsLineTypeSupported = line => [
  InvoiceLineType.SERVICE, InvoiceLineType.ITEM,
].includes(line.type);

const getIsLayoutSupported = createSelector(
  getLayout, layout => [
    InvoiceLayout.SERVICE, InvoiceLayout.ITEM_AND_SERVICE,
  ].includes(layout),
);

export const getIsLinesSupported = createSelector(
  getLines,
  lines => lines.every(line => getIsLineTypeSupported(line)),
);

export const getIsReadOnlyLayout = createSelector(
  getIsLayoutSupported,
  getIsLinesSupported,
  (isLayoutSupported, isLinesSupported) => !isLayoutSupported || !isLinesSupported,
);

export const getReadOnlyMessage = createSelector(
  getIsLayoutSupported,
  getLayout,
  (isLayoutSupported, layout) => (
    !isLayoutSupported
      ? `This invoice is missing information because the ${layout} invoice layout isn't supported in the browser. Switch to AccountRight desktop to use this feature.`
      : 'This invoice is read only because it contains unsupported features. Switch to AccountRight desktop to edit this invoice.'
  ),
);

const getCommentOptions = state => state.comments.map(comment => ({ value: comment }));

export const getIsCustomerDisabled = createSelector(
  getIsCreating,
  getIsContactLoading,
  getQuoteIdQueryParam,
  (isCreating, isContactLoading, quoteId) => (
    !isCreating || isContactLoading || (isCreating && Boolean(quoteId))
  ),
);

export const getShowOnlinePayment = createSelector(getRegion, region => region === 'au');

const createRegionDialectSelector = text => createSelector(
  getRegion,
  region => getRegionToDialectText(region)(text),
);

export const getTaxCodeLabel = createRegionDialectSelector('Tax code');

export const getTaxInclusiveLabel = createRegionDialectSelector('Tax inclusive');

export const getTaxExclusiveLabel = createRegionDialectSelector('Tax exclusive');

export const getInvoiceDetailOptions = createStructuredSelector({
  contactId: getContactId,
  invoiceNumber: getInvoiceNumber,
  address: getAddress,
  purchaseOrderNumber: getPurchaseOrderNumber,
  issueDate: getIssueDate,
  expirationDays: getExpirationDays,
  expirationTerm: getExpirationTerm,
  expirationTermOptions: getExpirationTermOptions,
  isTaxInclusive: getIsTaxInclusive,
  contactOptions: getContactOptions,
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
  return (
    total.minus(paid).valueOf()
  );
};

export const getTaxLabel = createRegionDialectSelector('Tax');

export const getInvoiceDetailTotals = createSelector(
  getTotals,
  getAmountPaid,
  getIsCreating,
  getTaxLabel,
  (totals, amountPaid, isCreating, taxLabel) => ({
    subTotal: totals.subTotal,
    totalTax: totals.totalTax,
    totalAmount: totals.totalAmount,
    amountPaid: amountPaid === '' ? '0.00' : amountPaid,
    amountDue: calculateAmountDue(totals.totalAmount, amountPaid),
    isCreating,
    taxLabel,
  }),
);

const getTitle = createSelector(
  getInvoiceNumber,
  getIsCreating,
  (invoiceNumber, isCreating) => (isCreating ? 'Create invoice' : `Invoice ${invoiceNumber}`),
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
  }),
);

export const getAmountDue = state => (
  calculateAmountDue(getTotals(state).totalAmount, getAmountPaid(state))
);

export const getUpdatedContactOptions = (state, updatedOption) => {
  const contactOptions = getContactOptions(state);

  return contactOptions.some(option => option.id === updatedOption.id)
    ? contactOptions.map(option => (option.id === updatedOption.id ? updatedOption : option))
    : [updatedOption, ...contactOptions];
};

export const getTableData = createSelector(getLength, len => Array(len).fill({}));

export const getIsTableEmpty = createSelector(getLength, len => len === 0);

export const getNewLineIndex = state => getLength(state);

const getInvoiceLineByIndex = (state, props) => state.invoice.lines[props.index];

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
  },
);

export const getAccountModalContext = (state) => {
  const businessId = getBusinessId(state);
  const region = getRegion(state);

  return { businessId, region };
};

export const getContactModalContext = (state) => {
  const businessId = getBusinessId(state);
  const region = getRegion(state);

  return { businessId, region, contactType: 'Customer' };
};

export const getContextForInventoryModal = (state) => {
  const businessId = getBusinessId(state);
  const region = getRegion(state);

  return ({
    businessId, region, isBuying: false, isSelling: true,
  });
};

export const getTaxCalculations = (state, isSwitchingTaxInclusive) => {
  const isTaxInclusive = getIsTaxInclusive(state);
  const isLineAmountsTaxInclusive = isSwitchingTaxInclusive ? !isTaxInclusive : isTaxInclusive;
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
