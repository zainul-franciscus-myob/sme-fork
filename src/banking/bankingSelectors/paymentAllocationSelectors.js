import { createSelector } from 'reselect';

import { businessEventTypes } from '../businessEventTypes';
import {
  formatAmount,
  formatCurrency,
  getBusinessId,
  getEntries,
  getFilterOptions,
  getIsOpenEntryCreating,
  getRegion,
} from './index';

export const getSuppliers = state => state.suppliers;

export const getCustomers = state => state.customers;

export const getIsTableLoading = state => state.openEntry.payment.isTableLoading;

export const getIsBillPayment = state => state.openEntry.payment.isBillPayment;

const getTotalAmount = state => state.openEntry.payment.totalAmount;

const getContacts = state => state.openEntry.payment.contacts;

export const getPaymentAllocationFilterOptions = state => state.openEntry.payment.filterOptions;

export const getPaymentAllocationContactId = state => (
  state.openEntry.payment.filterOptions.contactId
);

const getShowPaid = state => state.openEntry.payment.filterOptions.showPaid;

export const getPaymentAllocationEntries = state => state.openEntry.payment.entries;

const getLength = state => state.openEntry.payment.entries.length;

export const getPaymentAllocationPayload = (state, index) => {
  const bankTransactions = getEntries(state);
  const bankTransaction = bankTransactions[index];
  const { transactionId, date } = bankTransaction;

  const { bankAccount: bankAccountId } = getFilterOptions(state);

  const isBillPayment = getIsBillPayment(state);
  const sourceJournal = isBillPayment
    ? businessEventTypes.billPayment
    : businessEventTypes.invoicePayment;

  const contactId = getPaymentAllocationContactId(state);

  const entries = getPaymentAllocationEntries(state);
  const filteredEntries = entries
    .filter(({ appliedAmount }) => appliedAmount)
    .map(({ id, discountAmount, appliedAmount }) => ({
      id,
      discountAmount: Number(discountAmount),
      appliedAmount: Number(appliedAmount),
    }));

  return {
    bankAccountId,
    transactionId,
    sourceJournal,
    date,
    contactId,
    entries: filteredEntries,
  };
};

export const getIsTableEmpty = createSelector(
  getLength,
  len => len === 0,
);

export const getPaymentTypeUrlParam = (state, index) => {
  const entries = getEntries(state);
  const isBillPayment = !!entries[index].withdrawal;
  return isBillPayment ? 'bill' : 'invoice';
};

export const getPaymentAllocationBody = createSelector(
  getIsOpenEntryCreating,
  getIsBillPayment,
  getContacts,
  getPaymentAllocationContactId,
  (isCreating, isBillPayment, contacts, contactId) => {
    const { displayName } = contacts.find(({ id }) => id === contactId) || {};

    return {
      isCreating,
      contactLabel: isBillPayment ? 'Supplier' : 'Customer',
      contactName: displayName,
    };
  },
);

export const getOptions = createSelector(
  getContacts,
  getPaymentAllocationContactId,
  getShowPaid,
  getIsBillPayment,
  (contacts, contactId, showPaid, isBillPayment) => ({
    contacts,
    contactId,
    showPaid,
    contactLabel: isBillPayment ? 'Supplier' : 'Customer',
    showPaidLabel: isBillPayment ? 'Show paid bills' : 'Show paid invoices',
  }),
);

export const getTableOptions = createSelector(
  getIsOpenEntryCreating,
  getIsBillPayment,
  getIsTableLoading,
  getIsTableEmpty,
  getPaymentAllocationContactId,
  (isCreating, isBillPayment, isTableLoading, isTableEmpty, contactId) => {
    const tableEmptyMessage = !isCreating || contactId
      ? 'No results.'
      : `Please select a ${isBillPayment ? 'supplier' : 'customer'}.`;

    return {
      isCreating,
      isTableLoading,
      isTableEmpty,
      referenceIdLabel: isBillPayment ? 'Bill number' : 'Invoice number',
      amountLabel: isBillPayment ? 'Bill amount ($)' : 'Invoice amount ($)',
      amountPaidLabel: isBillPayment ? 'Amount paid ($)' : 'Amount received ($)',
      tableEmptyMessage,
    };
  },
);

const getEntryLink = (entry, businessId, region, isBillPayment) => {
  const { id } = entry;
  const feature = isBillPayment ? 'billPayment' : 'invoicePayment';

  return `/#/${region}/${businessId}/${feature}/${id}`;
};

export const getBalanceDue = (amount = '', discountAmount = '') => formatAmount(
  Number(amount) - (Number(discountAmount) || 0),
);

export const getEntryByIndexSelector = () => createSelector(
  (state, props) => state.openEntry.payment.entries[props.index],
  getRegion,
  getBusinessId,
  getIsBillPayment,
  ((entry, region, businessId, isBillPayment) => {
    const {
      amount,
      discountAmount,
    } = entry;

    return {
      ...entry,
      link: getEntryLink(entry, region, businessId, isBillPayment),
      balanceDue: getBalanceDue(amount, discountAmount),
    };
  }),
);

export const getRemainingBalance = createSelector(
  getTotalAmount,
  getPaymentAllocationEntries,
  (totalAmount = 0, entries) => {
    const totalAppliedAmount = entries.reduce(
      (accumulator, currentValue) => accumulator + (Number(currentValue.appliedAmount) || 0),
      0,
    );
    const remainingBalance = totalAmount - totalAppliedAmount;

    return formatCurrency(remainingBalance);
  },
);
