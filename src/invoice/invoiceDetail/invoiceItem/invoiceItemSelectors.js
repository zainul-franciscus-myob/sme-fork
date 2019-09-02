import {
  addDays, addMonths, eachDay, endOfMonth, format, getDaysInMonth, setDate, startOfMonth,
} from 'date-fns';
import { createSelector, createStructuredSelector } from 'reselect/lib/index';
import dateFormat from 'dateformat';

import ExpirationTerm from './enums/ExpirationTerm';
import TaxState from './enums/TaxState';

export const getBusinessId = state => state.businessId;
export const getInvoiceId = state => state.invoiceId;
export const getQuoteId = state => state.quoteId;
export const getRegion = state => state.region;


const getCustomers = state => state.customers;

const getInvoice = state => state.invoice;

const getExpirationTerms = state => state.expirationTerms;

const getExpirationTerm = state => getInvoice(state).expirationTerm;

const getIssueDate = state => getInvoice(state).issueDate;

const getExpirationDays = state => getInvoice(state).expirationDays;

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

const formatExpiredDate = date => dateFormat(date, 'dd/mm/yyyy');

const calculateDate = (issueDate, expirationTerm, expirationDays) => {
  switch (expirationTerm) {
    case ExpirationTerm.onADayOfTheMonth:
      return getExpiredDateOnADayOfTheMonth(issueDate, expirationDays);

    case ExpirationTerm.inAGivenNumberOfDays:
      return getExpiredDateInAGivenNumberOfDays(issueDate, expirationDays);

    case ExpirationTerm.dayOfMonthAfterEOM:
      return getExpiredDateDayOfMonthAfterEOM(issueDate, expirationDays);

    case ExpirationTerm.numberOfDaysAfterEOM:
      return getExpiredDateNumberOfDaysAfterEOM(issueDate, expirationDays);

    default:
      return issueDate;
  }
};

export const getExpiredDate = createSelector(
  getIssueDate,
  getExpirationTerm,
  getExpirationDays,
  (issueDate, expirationTerm, expirationDays) => {
    const calculatedDate = calculateDate(issueDate, expirationTerm, expirationDays);
    return formatExpiredDate(calculatedDate);
  },
);

export const getIsCreating = state => state.invoiceId === 'newItem';

export const areLinesCalculating = state => state.areLinesCalculating;

const getIsSubmitting = state => state.isSubmitting;

export const getTaxInclusiveOption = state => (
  getInvoice(state).isTaxInclusive ? TaxState.taxInclusive : TaxState.taxExclusive
);

const getExpirationDaysForInputField = state => getInvoice(state).expirationDays.toString();
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
export const getComments = state => state.comments.map(comment => ({ value: comment }));

export const getInvoiceOptions = createSelector(
  getInvoice,
  getExpiredDate,
  getExpirationDaysForInputField,
  getTaxInclusiveOption,
  getCustomers,
  getExpirationTerms,
  getIsCreating,
  getQuoteId,
  areLinesCalculating,
  getHasSetUpOnlinePayments,
  getIsAllowOnlinePayments,
  getSetUpOnlinePaymentsLink,
  (
    invoice,
    expiredDate,
    expirationDays,
    taxInclusiveOption,
    customers,
    expirationTerms,
    isCreating,
    quoteId,
    isTaxInclusiveDisabled,
    hasSetUpOnlinePayments,
    isAllowOnlinePayments,
    setUpOnlinePaymentsLink,
  ) => {
    const { lines, isTaxInclusive, ...restOfInvoice } = invoice;

    return {
      ...restOfInvoice,
      expiredDate,
      expirationDays,
      taxInclusiveOption,
      customers,
      expirationTerms,
      isCustomerDisabled: !isCreating || (isCreating && Boolean(quoteId)),
      isTaxInclusiveDisabled,
      hasSetUpOnlinePayments,
      isAllowOnlinePayments,
      setUpOnlinePaymentsLink,
    };
  },
);

export const getAreButtonsDisabled = state => areLinesCalculating(state) || getIsSubmitting(state);
export const getAreModalActionButtonsDisabled = state => getIsSubmitting(state);

export const getModalType = state => state.modalType;

export const getAlert = state => state.alert;
export const getModalAlert = state => state.modalAlert;

export const getTotals = state => state.totals;

export const getAmountDue = state => state.totals.displayAmountDue.replace(/^\$/, '');

const getInvoiceLinesCount = state => getInvoice(state).lines.length;

export const getInvoiceLinesTableData = createSelector(
  getInvoiceLinesCount,
  length => Array(length).fill({}),
);

const getNewLine = state => state.newLine;

export const getInvoiceLineByIndex = (state, { index }) => {
  const invoiceLine = getInvoice(state).lines[index];
  return invoiceLine || getNewLine(state);
};

export const getTaxCodes = state => state.taxCodes;

export const getAreLinesCalculating = state => state.areLinesCalculating;

export const getItems = state => state.items;

export const getShouldLineSelectItem = (state, { index }) => {
  const lineCount = getInvoice(state).lines.length;
  return lineCount <= index;
};

export const getCustomerId = state => getInvoice(state).customerId;

export const getIsLineAmountDirty = state => state.isLineAmountDirty;

export const getIsTableEmpty = state => getInvoiceLinesCount(state) === 0;

export const getAmountPaid = state => state.invoice.amountPaid;

export const getTotalsPayloadForTaxInclusiveChange = (state) => {
  const { lines, isTaxInclusive } = getInvoice(state);
  const { amountPaid } = getAmountPaid(state);

  return {
    lines,
    isTaxInclusive,
    isLineAmountsTaxInclusive: !isTaxInclusive,
    totals: {
      amountPaid,
    },
  };
};

export const getInvoicePayload = (state) => {
  const { amountPaid } = getTotals(state);
  const { hasSetUpOnlinePayments, setUpOnlinePaymentsLink, ...restOfInvoice } = getInvoice(state);

  return {
    invoice: {
      ...restOfInvoice,
    },
    totals: {
      amountPaid,
    },
  };
};

export const getIsPageEdited = state => state.isPageEdited;

export const getTotalsPayloadForLineItemChange = ({ state, index, itemId }) => {
  const { lines, isTaxInclusive } = getInvoice(state);
  const { amountPaid } = getTotals(state);

  return {
    index,
    itemId,
    isTaxInclusive,
    lines,
    totals: {
      amountPaid,
    },
  };
};

export const getTotalsPayloadForLineTaxCodeChange = (state) => {
  const { lines, isTaxInclusive } = getInvoice(state);
  const { amountPaid } = getTotals(state);

  return {
    lines,
    isTaxInclusive,
    totals: {
      amountPaid,
    },
  };
};

export const getTotalsPayloadForLineRemoval = getTotalsPayloadForLineTaxCodeChange;

export const getTotalsPayloadForCalculation = (state, index, key) => {
  const amountInput = state.invoice.lines[index][key];
  const updatedLines = state.invoice.lines.map(
    (line, lineIndex) => (lineIndex === index
      ? { ...line, [key]: amountInput }
      : line),
  );
  const { amountPaid } = getTotals(state);

  return {
    index,
    key,
    lines: updatedLines,
    isTaxInclusive: state.invoice.isTaxInclusive,
    totals: {
      amountPaid,
    },
  };
};

export const getNewLineIndex = state => getInvoiceLinesCount(state) - 1;

export const getIsAnAmountLineInput = key => ['units', 'unitPrice', 'discount', 'amount'].includes(key);

export const getPaymentTermsPopoverLabel = state => (
  ['Prepaid', 'CashOnDelivery'].includes(state.invoice.expirationTerm)
    ? state.expirationTerms.find(term => term.value === state.invoice.expirationTerm).name
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
    name: format(day, 'Do'),
    value: format(day, 'D'),
  }));
};

export const getShowExpirationDaysAmountInput = state => [
  'InAGivenNumberOfDays',
  'NumberOfDaysAfterEOM',
].includes(state.invoice.expirationTerm);

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

const getOpenSendEmail = state => state.openSendEmail;
export const getRouteURLParams = createStructuredSelector({
  openSendEmail: getOpenSendEmail,
});

export const getNewInvoiceUrlParams = state => ({
  businessId: getBusinessId(state),
});
export const getInvoiceUrlParams = state => ({
  businessId: getBusinessId(state),
  invoiceId: getInvoiceId(state),
});

export const getShouldReload = state => state.invoiceId === 'newItem' && !state.duplicatedInvoiceId;

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

export const getCreateNewInvoiceItemURL = createSelector(
  getRegion,
  getBusinessId,
  (region, businessId) => `/#/${region}/${businessId}/invoice/newItem`,
);

export const getCreateDuplicateInvoiceURL = createSelector(
  getRegion,
  getBusinessId,
  getInvoiceId,
  (region, businessId, invoiceId) => `/#/${region}/${businessId}/invoice/newItem?duplicatedInvoiceId=${invoiceId}`,
);
