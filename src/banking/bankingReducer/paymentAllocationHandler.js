import { allocateTransaction } from './index';
import { getAppliedPaymentRuleContactId } from '../bankingSelectors';
import { getCustomers, getPaymentAllocationEntries, getSuppliers } from '../bankingSelectors/paymentAllocationSelectors';
import { loadOpenEntry } from './openEntryHandlers';
import { tabIds } from '../tabItems';
import getDefaultState from './getDefaultState';

export const loadPaymentAllocation = (state, action) => {
  const defaultState = getDefaultState();

  const openedEntry = state.entries[action.index];

  const isBillPayment = !!openedEntry.withdrawal;

  const totalAmount = Number(openedEntry.withdrawal || openedEntry.deposit);

  const contacts = isBillPayment ? getSuppliers(state) : getCustomers(state);

  const { entries, contactId } = action.payment;

  const payment = {
    ...defaultState.openEntry.payment,
    totalAmount,
    contacts,
    isBillPayment,
    filterOptions: {
      ...defaultState.openEntry.payment.filterOptions,
      contactId,
    },
    entries,
  };

  return loadOpenEntry(state, action.index, tabIds.payment, payment, false);
};

export const loadPaymentAllocationOptions = (state, action) => {
  const defaultState = getDefaultState();

  const openedEntry = state.entries[action.index];

  const contactId = getAppliedPaymentRuleContactId(openedEntry);

  const isBillPayment = !!openedEntry.withdrawal;

  const totalAmount = Number(openedEntry.withdrawal || openedEntry.deposit);

  const contacts = isBillPayment ? getSuppliers(state) : getCustomers(state);

  const payment = {
    ...defaultState.openEntry.payment,
    filterOptions: {
      ...defaultState.openEntry.payment.filterOptions,
      contactId,
    },
    totalAmount,
    contacts,
    isBillPayment,
  };

  return loadOpenEntry(state, action.index, tabIds.payment, payment, true);
};

export const loadPaymentAllocationLines = (state, action) => ({
  ...state,
  openEntry: {
    ...state.openEntry,
    payment: {
      ...state.openEntry.payment,
      ...action.payment,
    },
  },
});

export const savePaymentAllocation = (state, action) => ({
  ...allocateTransaction(state, action),
});

export const updatePaymentAllocationOptions = (state, action) => ({
  ...state,
  openEntry: {
    ...state.openEntry,
    payment: {
      ...state.openEntry.payment,
      filterOptions: {
        ...state.openEntry.payment.filterOptions,
        [action.key]: action.value,
      },
    },
  },
});

export const updatePaymentAllocationLine = (state, action) => {
  const entries = getPaymentAllocationEntries(state);

  const updatedEntries = entries.map((entry, index) => (index === action.index
    ? { ...entry, [action.key]: action.value }
    : entry));

  return {
    ...state,
    openEntry: {
      ...state.openEntry,
      isEdited: true,
      payment: {
        ...state.openEntry.payment,
        entries: updatedEntries,
      },
    },
  };
};

export const setPaymentAllocationLoadingState = (state, action) => ({
  ...state,
  openEntry: {
    ...state.openEntry,
    payment: {
      ...state.openEntry.payment,
      isTableLoading: action.isLoading,
    },
  },
});
