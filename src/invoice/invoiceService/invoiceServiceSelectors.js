import {
  addDays, addMonths, endOfMonth, getDaysInMonth, setDate,
} from 'date-fns';
import { createSelector } from 'reselect';
import dateFormat from 'dateformat';

export const getBusinessId = state => state.businessId;
export const getInvoiceId = state => state.invoiceId;

const getAmountPaid = state => state.invoice.amountPaid;
const getTotals = state => state.totals;
export const getTotalsAndAmounts = createSelector(
  getTotals,
  getAmountPaid,
  (totals, amountPaid) => ({
    ...totals,
    amountPaid,
    amountDue: (Number(totals.totalAmount) - Number(amountPaid)).toFixed(2),
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

const formatExpiredDate = date => dateFormat(date, 'dd/mm/yyyy');
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
    return formatExpiredDate(calculatedDate);
  },
);

export const getIsCreating = createSelector(
  getInvoiceId,
  invoiceId => invoiceId === 'newService',
);

const getInvoice = state => state.invoice;
const getContactOptions = state => state.contactOptions;
const getExpirationTermOptions = state => state.expirationTermOptions;
export const getInvoiceOptions = createSelector(
  getInvoice,
  getContactOptions,
  getExpirationTermOptions,
  getExpiredDate,
  getIsCreating,
  (invoice, contactOptions, expirationTermOptions, expiredDate, isCreating) => {
    const { lines, ...invoiceWithoutLines } = invoice;

    return {
      ...invoiceWithoutLines,
      expiredDate,
      contactOptions,
      expirationTermOptions,
      isCreating,
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

export const getContactId = state => state.invoice.contactId;

const getContactName = (contacts, contactId) => {
  const selectedContact = contacts.find(({ value }) => contactId === value) || {};
  return selectedContact.name;
};

export const getInvoicePayload = createSelector(
  getInvoice,
  getContactOptions,
  getContactId,
  (invoice, contacts, contactId) => ({
    ...invoice,
    contactName: getContactName(contacts, contactId),
    lines: getInvoiceServiceLinesForPayload(invoice.lines),
  }),
);

export const getAlertMessage = state => state.alertMessage;
export const getIsActionsDisabled = state => state.isSubmitting;

export const getIsTableEmpty = createSelector(
  getLength,
  len => len === 0,
);
