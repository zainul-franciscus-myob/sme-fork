import { allocateTransaction } from './index';
import { formatAmount, getFilterOptions } from '../bankingSelectors';
import { loadOpenEntry } from './openEntryHandlers';
import { tabIds } from '../tabItems';

export const loadTransferMoney = (state, action) => {
  const transfer = {
    ...action.transfer,
  };
  const isCreating = false;
  return loadOpenEntry(state, action.index, tabIds.transfer, transfer, isCreating);
};

export const loadNewTransferMoney = (state, action) => {
  const openedEntry = state.entries[action.index];

  const isWithdrawal = !!openedEntry.withdrawal;

  const { bankAccount } = getFilterOptions(state);

  const amount = formatAmount(Number(openedEntry.withdrawal || openedEntry.deposit));

  const transfer = {
    transferFrom: isWithdrawal ? bankAccount : '',
    transferTo: isWithdrawal ? '' : bankAccount,
    amount,
  };

  const isCreating = true;
  return loadOpenEntry(state, action.index, tabIds.transfer, transfer, isCreating);
};

export const updateTransferMoney = (state, action) => ({
  ...state,
  openEntry: {
    ...state.openEntry,
    isEdited: true,
    transfer: {
      ...state.openEntry.transfer,
      [action.key]: action.value,
    },
  },
});

export const saveTransferMoney = (state, action) => ({
  ...allocateTransaction(state, action),
});
