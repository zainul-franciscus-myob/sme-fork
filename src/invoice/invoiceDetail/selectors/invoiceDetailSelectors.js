import { createSelector, createStructuredSelector } from 'reselect';

import InvoiceDetailModalType from '../InvoiceDetailModalType';
import InvoiceLayout from '../InvoiceLayout';
import formatCurrency from '../../../common/valueFormatters/formatCurrency';
import getRegionToDialectText from '../../../dialect/getRegionToDialectText';

export const getBusinessId = state => state.businessId;
export const getRegion = state => state.region;
export const getInvoiceId = state => state.invoiceId;
export const getQuoteIdQueryParam = state => state.quoteId;
export const getDuplicatedInvoiceIdQueryParam = state => state.duplicatedInvoiceId;
export const getOpenSendEmailQueryParam = state => state.openSendEmail;
export const getOpenExportPdfQueryParam = state => state.openExportPdf;

export const getIsLoading = state => state.isLoading;
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

export const getNewLine = state => state.newLine;
export const getTotals = state => state.totals;

export const getContactOptions = state => state.contactOptions;
export const getExpirationTermOptions = state => state.expirationTermOptions;
export const getTaxCodeOptions = state => state.taxCodeOptions;
export const getItemOptions = state => state.itemOptions;
export const getAccountOptions = state => state.accountOptions;
export const getSerialNumber = state => state.serialNumber;

export const getIsUpgradeModalShowing = state => (
  state.monthlyLimit && state.monthlyLimit.used >= state.monthlyLimit.limit
);

export const getMonthlyLimit = ({ monthlyLimit }) => monthlyLimit;

export const getIsLineAmountDirty = state => state.isLineAmountDirty;

export const getTemplateOptions = (state) => {
  if (state.invoice.layout === InvoiceLayout.ITEM) {
    return state.itemTemplate.templateOptions;
  }
  return state.serviceTemplate.templateOptions;
};

export const getIsCreating = createSelector(getInvoiceId, invoiceId => invoiceId === 'new');

export const getIsServiceLayout = createSelector(
  getLayout,
  layout => layout === InvoiceLayout.SERVICE,
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

export const calculateAmountDue = (totalAmount, amountPaid) => (
  (Number(totalAmount) - Number(amountPaid)).toFixed(2)
);

export const getTaxLabel = createRegionDialectSelector('Tax');

export const getInvoiceDetailTotals = createSelector(
  getTotals,
  getAmountPaid,
  getIsCreating,
  getTaxLabel,
  (totals, amountPaid, isCreating, taxLabel) => ({
    subTotal: formatCurrency(totals.subTotal),
    totalTax: formatCurrency(totals.totalTax),
    totalAmount: formatCurrency(totals.totalAmount),
    amountPaid: isCreating ? amountPaid : formatCurrency(amountPaid),
    amountDue: formatCurrency(calculateAmountDue(totals.totalAmount, amountPaid)),
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
    totalAmount: formatCurrency(totals.totalAmount),
    amountPaid: formatCurrency(amountPaid),
    amountDue: formatCurrency(calculateAmountDue(totals.totalAmount, amountPaid)),
    title,
    isCreating,
  }),
);

export const getAmountDue = state => (
  calculateAmountDue(getTotals(state).totalAmount, getAmountPaid(state))
);


const getShouldOpenEmailModal = (state) => {
  const isCreating = getIsCreating(state);
  const openSendEmail = getOpenSendEmailQueryParam(state);

  return !isCreating && openSendEmail === 'true';
};

const getShouldOpenExportPdfModal = (state) => {
  const isCreating = getIsCreating(state);
  const openExportPdf = getOpenExportPdfQueryParam(state);

  return !isCreating && openExportPdf === 'true';
};

export const getLoadInvoiceDetailModalType = (state, emailInvoice) => {
  const shouldOpenEmailModal = getShouldOpenEmailModal(state);
  if (shouldOpenEmailModal) {
    const { hasEmailReplyDetails } = emailInvoice || {};

    return hasEmailReplyDetails
      ? InvoiceDetailModalType.EMAIL_INVOICE
      : InvoiceDetailModalType.EMAIL_SETTINGS;
  }

  const shouldOpenExportPdfModal = getShouldOpenExportPdfModal(state);
  if (shouldOpenExportPdfModal) {
    return InvoiceDetailModalType.EXPORT_PDF;
  }

  return InvoiceDetailModalType.NONE;
};

export const getLoadInvoiceDetailModalAndPageAlert = (state, alertMessage) => {
  const shouldOpenEmailModal = getShouldOpenEmailModal(state);
  const alert = ({ type: 'success', message: alertMessage.content });

  return shouldOpenEmailModal ? { modalAlert: alert } : { pageAlert: alert };
};

export const getLoadInvoiceDetailEmailInvoice = (emailInvoice, invoiceNumber) => (
  emailInvoice
    ? {
      ...emailInvoice,
      toEmail: emailInvoice.toEmail.length > 0 ? emailInvoice.toEmail : [''],
      ccToEmail: emailInvoice.ccToEmail.length > 0 ? emailInvoice.ccToEmail : [''],
      subject: emailInvoice.includeInvoiceNumberInEmail ? `Invoice ${invoiceNumber}; ${emailInvoice.subject}` : emailInvoice.subject,
    }
    : {}
);

export const getUpdatedContactOptions = (state, updatedOption) => {
  const contactOptions = getContactOptions(state);

  return contactOptions.some(option => option.value === updatedOption.value)
    ? contactOptions.map(option => (option.value === updatedOption.value ? updatedOption : option))
    : [updatedOption, ...contactOptions];
};

export const getTableData = createSelector(getLength, len => Array(len).fill({}));

export const getIsTableEmpty = createSelector(getLength, len => len === 0);

export const getNewLineIndex = state => getLength(state);

export const getInvoiceLine = createSelector(
  getNewLine,
  (state, props) => state.invoice.lines[props.index],
  (newLine, line) => line || newLine,
);

export const getRouteURLParams = state => ({
  openSendEmail: getOpenSendEmailQueryParam(state),
});

export const getShouldReload = (state) => {
  const isCreating = getIsCreating(state);
  const duplicatedInvoiceId = getDuplicatedInvoiceIdQueryParam(state);

  return isCreating && !duplicatedInvoiceId;
};

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
