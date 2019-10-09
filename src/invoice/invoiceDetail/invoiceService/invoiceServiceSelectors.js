import {
  addDays, addMonths, eachDay, endOfMonth, getDaysInMonth, setDate, startOfMonth,
} from 'date-fns';
import { createSelector, createStructuredSelector } from 'reselect';

import formatDate from '../../../valueFormatters/formatDate/formatDate';
import formatSlashDate from '../../../valueFormatters/formatDate/formatSlashDate';

export const getBusinessId = state => state.businessId;
export const getInvoiceId = state => state.invoiceId;
export const getQuoteId = state => state.quoteId;
export const getContactId = state => state.invoice.contactId;
export const getNewInvoiceUrlParams = state => ({
  businessId: getBusinessId(state),
});
export const getInvoiceUrlParams = state => ({
  businessId: getBusinessId(state),
  invoiceId: getInvoiceId(state),
});
export const getContactUrlParams = state => ({
  businessId: getBusinessId(state),
  contactId: getContactId(state),
});

const getOpenSendEmail = state => state.openSendEmail;
export const getRouteURLParams = createStructuredSelector({
  openSendEmail: getOpenSendEmail,
});

const formatAmount = amount => Intl
  .NumberFormat('en-AU', {
    style: 'decimal',
    minimumFractionDigits: '2',
    maximumFractionDigits: '2',
  })
  .format(amount);

const formatCurrency = (amount) => {
  const formattedAmount = formatAmount(Math.abs(amount));

  return amount < 0 ? `-$${formattedAmount}` : `$${formattedAmount}`;
};

const calculateAmountDue = (totalAmount, amountPaid) => (
  (Number(totalAmount) - Number(amountPaid)).toFixed(2)
);

export const getAmountPaid = state => state.invoice.amountPaid;

const getTotals = state => state.totals;

export const getAmountDue = state => (
  calculateAmountDue(getTotals(state).totalAmount, getAmountPaid(state))
);

export const getTotalsAndAmounts = createSelector(
  getTotals,
  getAmountPaid,
  (totals, amountPaid) => ({
    subTotal: formatCurrency(totals.subTotal),
    totalTax: formatCurrency(totals.totalTax),
    totalAmount: formatCurrency(totals.totalAmount),
    amountPaid: formatCurrency(amountPaid),
    amountDue: formatCurrency(calculateAmountDue(totals.totalAmount, amountPaid)),
  }),
);

const getNewLine = state => state.newLine;
export const getLineByIndex = (state, props) => state.invoice.lines[props.index];
export const getInvoiceLine = createSelector(
  getNewLine,
  getLineByIndex,
  (newLine, line) => line || newLine,
);

const getLength = state => state.invoice.lines.length;
export const getTableData = createSelector(
  getLength,
  len => Array(len).fill({}),
);

const getIssueDate = state => state.invoice.issueDate;
const getExpirationTerm = state => state.invoice.expirationTerm;
const getExpirationDays = state => Number(state.invoice.expirationDays);
const getExpiredDateOnADayOfTheMonth = (issueDate, expirationDays) => {
  const date = new Date(issueDate);
  const month = expirationDays < date.getDate() ? addMonths(date, 1) : date;
  const daysInMonth = getDaysInMonth(month);

  if (expirationDays > daysInMonth) {
    return endOfMonth(month);
  }

  return setDate(month, expirationDays);
};
const getExpiredDateInAGivenNumberOfDays = (issueDate, expirationDays) => {
  const date = new Date(issueDate);

  return addDays(date, expirationDays);
};
const getExpiredDateDayOfMonthAfterEOM = (issueDate, expirationDays) => {
  const date = addMonths(new Date(issueDate), 1);
  const daysInMonth = getDaysInMonth(date);

  if (expirationDays > daysInMonth) {
    return endOfMonth(date);
  }
  return setDate(date, expirationDays);
};
const getExpiredDateNumberOfDaysAfterEOM = (issueDate, expirationDays) => {
  const date = endOfMonth(new Date(issueDate));

  return addDays(date, expirationDays);
};

const calculateDate = (issueDate, expirationTerm, expirationDays) => {
  if (expirationTerm === 'OnADayOfTheMonth') {
    return getExpiredDateOnADayOfTheMonth(issueDate, expirationDays);
  }
  if (expirationTerm === 'InAGivenNumberOfDays') {
    return getExpiredDateInAGivenNumberOfDays(issueDate, expirationDays);
  }
  if (expirationTerm === 'DayOfMonthAfterEOM') {
    return getExpiredDateDayOfMonthAfterEOM(issueDate, expirationDays);
  }
  if (expirationTerm === 'NumberOfDaysAfterEOM') {
    return getExpiredDateNumberOfDaysAfterEOM(issueDate, expirationDays);
  }

  return issueDate;
};

export const getExpiredDate = createSelector(
  getIssueDate,
  getExpirationTerm,
  getExpirationDays,
  (issueDate, expirationTerm, expirationDays) => {
    const calculatedDate = calculateDate(issueDate, expirationTerm, expirationDays);
    return formatSlashDate(new Date(calculatedDate));
  },
);

export const getIsCreating = createSelector(
  getInvoiceId,
  invoiceId => invoiceId === 'newService',
);

const getInvoice = state => state.invoice;
const getContactOptions = state => state.contactOptions;
const getExpirationTermOptions = state => state.expirationTermOptions;
const getIsAllowOnlinePayments = state => state.invoice.isAllowOnlinePayments;

const getHasSetUpOnlinePayments = state => state.payDirect.isRegistered;
const getSerialNumber = state => state.payDirect.serialNumber;
const getSetUpOnlinePaymentsBaseUrl = state => state.payDirect.baseUrl;
const getSetUpOnlinePaymentsLink = createSelector(
  getBusinessId,
  getSerialNumber,
  getSetUpOnlinePaymentsBaseUrl,
  (businessId, serialNumber, baseUrl) => `${baseUrl}?cdf=${businessId}&sn=${serialNumber}`,
);
export const getInvoiceOptions = createSelector(
  getInvoice,
  getContactOptions,
  getExpirationTermOptions,
  getSetUpOnlinePaymentsLink,
  getExpiredDate,
  getIsCreating,
  getQuoteId,
  getHasSetUpOnlinePayments,
  getIsAllowOnlinePayments,
  (invoice,
    contactOptions,
    expirationTermOptions,
    setUpOnlinePaymentsLink,
    expiredDate,
    isCreating,
    quoteId,
    hasSetUpOnlinePayments,
    isAllowOnlinePayments) => {
    const { lines, ...invoiceWithoutLines } = invoice;

    return {
      ...invoiceWithoutLines,
      expiredDate,
      contactOptions,
      expirationTermOptions,
      setUpOnlinePaymentsLink,
      isCustomerDisabled: !isCreating || (isCreating && Boolean(quoteId)),
      hasSetUpOnlinePayments,
      isAllowOnlinePayments,
    };
  },
);

export const getDefaultTaxCodeId = ({ accountId, accounts }) => {
  const account = accounts.find(({ id }) => id === accountId);
  return account === undefined ? '' : account.taxCodeId;
};

export const getCalculatedTotalsPayload = createSelector(
  getInvoice,
  invoice => ({
    taxInclusive: invoice.taxInclusive,
    lines: invoice.lines.map(({ allocatedAccountId, amount, taxCodeId }) => ({
      allocatedAccountId, amount, taxCodeId,
    })),
  }),
);

export const isPageEdited = state => state.isPageEdited;
export const getRegion = state => state.region;
export const getModalType = state => state.modalType;

const getInvoiceServiceLinesForPayload = lines => lines.map((line) => {
  const { accounts, taxCodes, ...rest } = line;
  return rest;
});

const getContactName = (contacts, contactId) => {
  const selectedContact = contacts.find(({ value }) => contactId === value) || {};
  return selectedContact.name;
};

export const getInvoicePayload = (state) => {
  const {
    lines,
    ...restOfInvoice
  } = getInvoice(state);

  const contacts = getContactOptions(state);
  const contactId = getContactId(state);

  return {
    ...restOfInvoice,
    contactName: getContactName(contacts, contactId),
    lines: getInvoiceServiceLinesForPayload(lines),
  };
};

export const getAlert = state => state.alert;
export const getModalAlert = state => state.modalAlert;
export const getIsActionsDisabled = state => state.isSubmitting;

export const getIsTableEmpty = createSelector(
  getLength,
  len => len === 0,
);

export const getPaymentTermsPopoverLabel = state => (
  ['Prepaid', 'CashOnDelivery'].includes(state.invoice.expirationTerm)
    ? state.expirationTermOptions.find(term => term.value === state.invoice.expirationTerm).name
    : getExpiredDate(state));

export const getShowExpiryDaysOptions = state => [
  'OnADayOfTheMonth',
  'InAGivenNumberOfDays',
  'DayOfMonthAfterEOM',
  'NumberOfDaysAfterEOM',
].includes(state.invoice.expirationTerm);

export const getExpirationTermsLabel = state => ({
  InAGivenNumberOfDays: 'days after the issue date',
  OnADayOfTheMonth: 'of this month',
  NumberOfDaysAfterEOM: 'days after the end of the month',
  DayOfMonthAfterEOM: 'of next month',
}[state.invoice.expirationTerm]);

export const getDisplayDaysForMonth = (state) => {
  const currentMonth = new Date();
  const nextMonth = addMonths(currentMonth, 1);
  const month = ['OnADayOfTheMonth', 'DayOfMonthAfterEOM'].includes(state.invoice.expirationTerm)
    ? currentMonth
    : nextMonth;
  return eachDay(startOfMonth(month), endOfMonth(month)).map(day => ({
    name: formatDate(day, 'Do'),
    value: formatDate(day, 'D'),
  }));
};

export const getShowExpirationDaysAmountInput = state => [
  'InAGivenNumberOfDays',
  'NumberOfDaysAfterEOM',
].includes(state.invoice.expirationTerm);

export const getComments = state => state.comments.map(comment => ({ value: comment }));

export const getShouldShowEmailModalAfterSave = state => state.shouldShowEmailModalAfterSave;
export const getHasEmailReplyDetails = state => state.emailInvoice.hasEmailReplyDetails;

const getEmailToAddresses = state => state.emailInvoice.toEmail;
const getCcEmailToAddresses = state => state.emailInvoice.ccToEmail;
const getIsEmailMeACopy = state => state.emailInvoice.isEmailMeACopy;
const getEmailSubject = state => state.emailInvoice.subject;
const getEmailMessageBody = state => state.emailInvoice.messageBody;
export const getEmailInvoiceDetail = createSelector(
  getEmailToAddresses,
  getCcEmailToAddresses,
  getIsEmailMeACopy,
  getEmailSubject,
  getEmailMessageBody,
  (emailToAddresses, ccEmailToAddresses, isEmailMeACopy, subject, messageBody) => ({
    emailToAddresses,
    ccEmailToAddresses,
    isEmailMeACopy,
    subject,
    messageBody,
  }),
);

export const getEmailInvoicePayload = (state) => {
  const { hasEmailReplyDetails, ...restOfEmailInvoice } = state.emailInvoice;
  return restOfEmailInvoice;
};

export const getShouldReload = state => state.invoiceId === 'newService' && !state.duplicatedInvoiceId;

export const getInvoiceListURL = createSelector(
  getRegion,
  getBusinessId,
  (region, businessId) => `/#/${region}/${businessId}/invoice`,
);

export const getInvoiceReadUpdateWithEmailModalURL = createSelector(
  getRegion,
  getBusinessId,
  getInvoiceId,
  (region, businessId, invoiceId) => `/#/${region}/${businessId}/invoice/${invoiceId}?openSendEmail=true`,
);

export const getCreateNewInvoiceServiceURL = createSelector(
  getRegion,
  getBusinessId,
  (region, businessId) => `/#/${region}/${businessId}/invoice/newService`,
);

export const getCreateDuplicateInvoiceURL = createSelector(
  getRegion,
  getBusinessId,
  getInvoiceId,
  (region, businessId, invoiceId) => `/#/${region}/${businessId}/invoice/newService?duplicatedInvoiceId=${invoiceId}`,
);
