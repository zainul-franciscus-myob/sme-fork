import { createSelector, createStructuredSelector } from 'reselect';

import InvoiceDetailModalType from '../InvoiceDetailModalType';
import InvoiceLayout from '../InvoiceLayout';
import formatCurrency from '../../../valueFormatters/formatCurrency';

export const getBusinessId = state => state.businessId;
export const getRegion = state => state.region;
export const getInvoiceId = state => state.invoiceId;
export const getQuoteIdQueryParam = state => state.quoteId;
export const getDuplicatedInvoiceIdQueryParam = state => state.duplicatedInvoiceId;
export const getOpenSendEmailQueryParam = state => state.openSendEmail;
export const getOpenExportPdfQueryParam = state => state.openExportPdf;
export const getLayoutQueryParam = state => state.layout;

export const getIsLoading = state => state.isLoading;
export const getIsActionsDisabled = state => state.isSubmitting;
export const getIsPageEdited = state => state.isPageEdited;
export const getAlert = state => state.alert;
export const getModalType = state => state.modalType;
export const getModalAlert = state => state.modalAlert;
export const getIsModalActionDisabled = state => state.isModalSubmitting;

export const getInvoice = state => state.invoice;
export const getLayout = state => state.invoice.layout;
export const getContactId = state => state.invoice.contactId;
const getAddress = state => state.invoice.address;
const getNote = state => state.invoice.note;
const getInvoiceNumber = state => state.invoice.invoiceNumber;
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
export const getSerialNumber = state => state.serialNumber;

export const getAreLinesCalculating = state => state.areLinesCalculating;
export const getIsLineAmountDirty = state => state.isLineAmountDirty;

export const getTemplateOptions = state => state.templateOptions;

export const getIsCreating = createSelector(getInvoiceId, invoiceId => invoiceId === 'new');

export const getIsServiceLayout = createSelector(
  getLayout,
  layout => layout === InvoiceLayout.SERVICE,
);

const getCommentOptions = state => state.comments.map(comment => ({ value: comment }));

export const getIsCustomerDisabled = createSelector(
  getIsCreating,
  getQuoteIdQueryParam,
  (isCreating, quoteId) => !isCreating || (isCreating && Boolean(quoteId)),
);

export const getShowOnlinePayment = createSelector(getRegion, region => region === 'au');

export const getInvoiceDetailOptions = createStructuredSelector({
  contactId: getContactId,
  invoiceNumber: getInvoiceNumber,
  address: getAddress,
  purchaseOrderNumber: getPurchaseOrderNumber,
  issueDate: getIssueDate,
  isTaxInclusive: getIsTaxInclusive,
  note: getNote,
  contactOptions: getContactOptions,
  commentOptions: getCommentOptions,
  isCustomerDisabled: getIsCustomerDisabled,
  isTaxInclusiveDisabled: getAreLinesCalculating,
  showOnlinePayment: getShowOnlinePayment,
});

export const calculateAmountDue = (totalAmount, amountPaid) => (
  (Number(totalAmount) - Number(amountPaid)).toFixed(2)
);

export const getInvoiceDetailTotals = createSelector(
  getTotals,
  getAmountPaid,
  getIsCreating,
  (totals, amountPaid, isCreating) => ({
    subTotal: formatCurrency(totals.subTotal),
    totalTax: formatCurrency(totals.totalTax),
    totalAmount: formatCurrency(totals.totalAmount),
    amountPaid: isCreating ? amountPaid : formatCurrency(amountPaid),
    amountDue: formatCurrency(calculateAmountDue(totals.totalAmount, amountPaid)),
    isCreating,
  }),
);

export const getInvoiceDetailTotalHeader = createSelector(
  getTotals,
  getAmountPaid,
  getIsCreating,
  (totals, amountPaid, isCreating) => ({
    totalAmount: formatCurrency(totals.totalAmount),
    amountPaid: formatCurrency(amountPaid),
    amountDue: formatCurrency(calculateAmountDue(totals.totalAmount, amountPaid)),
    isCreating,
  }),
);

export const getAmountDue = state => (
  calculateAmountDue(getTotals(state).totalAmount, getAmountPaid(state))
);

export const getDefaultTaxCodeId = ({ accountId, accountOptions }) => {
  const account = accountOptions.find(({ id }) => id === accountId);
  return account === undefined ? '' : account.taxCodeId;
};

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

export const getIsTableEmpty = createSelector(getLength, len => len === 0);

export const getRouteURLParams = state => ({
  openSendEmail: getOpenSendEmailQueryParam(state),
});

export const getShouldReload = (state) => {
  const isCreating = getIsCreating(state);
  const duplicatedInvoiceId = getDuplicatedInvoiceIdQueryParam(state);

  return isCreating && !duplicatedInvoiceId;
};
