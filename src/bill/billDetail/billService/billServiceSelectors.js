import {
  addDays, addMonths, endOfMonth, getDaysInMonth, setDate,
} from 'date-fns';
import { createSelector } from 'reselect';
import dateFormat from 'dateformat';

export const getBusinessId = state => state.businessId;
export const getBillId = state => state.billId;
export const getTotals = state => state.totals;
const getNewLine = state => state.newLine;
export const getLineByIndex = (state, props) => state.bill.lines[props.index];

export const getBillLine = createSelector(
  getNewLine,
  getLineByIndex,
  (newLine, line) => line || newLine,
);

const getLength = state => state.bill.lines.length;
export const getTableData = createSelector(
  getLength,
  len => Array(len).fill({}),
);

const getIssueDate = state => state.bill.issueDate;
const getExpirationTerm = state => state.bill.expirationTerm;
const getExpirationDays = state => Number(state.bill.expirationDays);
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
  getBillId,
  billId => billId === 'new',
);

const getBill = state => state.bill;
const getContactOptions = state => state.contactOptions;
const getExpirationTermOptions = state => state.expirationTermOptions;
export const getBillOptions = createSelector(
  getBill,
  getContactOptions,
  getExpirationTermOptions,
  getExpiredDate,
  getIsCreating,
  (bill, contactOptions, expirationTermOptions, expiredDate, isCreating) => {
    const { lines, issueDate, ...billWithoutLines } = bill;

    return {
      ...billWithoutLines,
      issueDate,
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
  getBill,
  bill => ({
    taxInclusive: bill.taxInclusive,
    lines: bill.lines.map(({ allocatedAccountId, amount, taxCodeId }) => ({
      allocatedAccountId, amount, taxCodeId,
    })),
  }),
);

export const isPageEdited = state => state.isPageEdited;
export const getRegion = state => state.region;
export const getModalType = state => state.modalType;

const getBillServiceLinesForPayload = lines => lines.map((line) => {
  const { accounts, taxCodes, ...rest } = line;
  return rest;
});

export const getContactId = state => state.bill.contactId;

const getContactName = (contacts, contactId) => {
  const selectedContact = contacts.find(({ value }) => contactId === value) || {};
  return selectedContact.name;
};

export const getInTrayDocumentId = state => state.inTrayDocumentId;

export const getBillPayload = createSelector(
  getBill,
  getContactOptions,
  getContactId,
  getInTrayDocumentId,
  (bill, contacts, contactId, inTrayDocumentId) => ({
    ...bill,
    contactName: getContactName(contacts, contactId),
    lines: getBillServiceLinesForPayload(bill.lines),
    inTrayDocumentId,
  }),
);

export const getAlertMessage = state => state.alertMessage;
export const getIsActionsDisabled = state => state.isSubmitting;

export const getIsCreatingFromInTray = state => getIsCreating(state) && state.inTrayDocumentId;

export const getPageTitle = state => (getIsCreatingFromInTray(state) ? 'Create bill from In Tray' : 'Bill');

export const isContactIncludedInContactOptions = (state, contactId) => {
  const contact = getContactOptions(state).find(({ value }) => value === contactId);
  return contact !== undefined;
};

export const getInTrayPrefillDetails = state => state.inTrayPrefillDetails;

export const isAlreadyPrefilledFromInTray = state => getInTrayPrefillDetails(state) === undefined;

export const getContactIdToPrefillFromInTray = (state) => {
  const inTrayPrefillDetails = getInTrayPrefillDetails(state);

  const prefillContactId = inTrayPrefillDetails.bill.contactId;
  const originalContactId = inTrayPrefillDetails.originalBill.contactId;
  const currentContactId = state.bill.contactId;

  const isContactIdEdited = currentContactId !== originalContactId;
  return isContactIdEdited ? currentContactId : prefillContactId;
};

export const getOrderNumberToPrefillFromInTray = (state) => {
  const inTrayPrefillDetails = getInTrayPrefillDetails(state);

  const prefillOrderNumber = inTrayPrefillDetails.bill.orderNumber;
  const originalOrderNumber = inTrayPrefillDetails.originalBill.orderNumber;
  const currentOrderNumber = state.bill.orderNumber;

  const isOrderNumberEdited = currentOrderNumber !== originalOrderNumber;
  return isOrderNumberEdited ? currentOrderNumber : prefillOrderNumber;
};

export const getIssueDateToPrefillFromInTray = (state) => {
  const inTrayPrefillDetails = getInTrayPrefillDetails(state);

  const prefillIssueDate = inTrayPrefillDetails.bill.issueDate;
  const originalIssueDate = inTrayPrefillDetails.originalBill.issueDate;
  const currentIssueDate = state.bill.issueDate;

  const isIssueDateEdited = currentIssueDate !== originalIssueDate;
  return isIssueDateEdited ? currentIssueDate : prefillIssueDate;
};

export const getTaxInclusiveToPrefillFromInTray = (state) => {
  const inTrayPrefillDetails = getInTrayPrefillDetails(state);

  const prefillTaxInclusive = inTrayPrefillDetails.bill.taxInclusive;
  const originalTaxInclusive = inTrayPrefillDetails.originalBill.taxInclusive;
  const currentTaxInclusive = state.bill.taxInclusive;

  const isTaxInclusiveEdited = currentTaxInclusive !== originalTaxInclusive;
  return isTaxInclusiveEdited ? currentTaxInclusive : prefillTaxInclusive;
};

export const getIsTableEmpty = createSelector(
  getLength,
  len => len === 0,
);
