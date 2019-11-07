import {
  getDisplayName, getEntries, getFilterOptions, getIsOpenEntryCreating, getOpenTransactionLine,
} from '.';

const getTransfer = state => state.openEntry.transfer;

export const getFormattedTransfer = (state) => {
  const accountList = state.transferAccounts;
  const transfer = getTransfer(state);
  const { withdrawal } = getOpenTransactionLine(state);
  const isWithdrawal = !!withdrawal;
  const isCreating = getIsOpenEntryCreating(state);

  let transferDisplayType = 'readOnly';
  if (isCreating) {
    transferDisplayType = isWithdrawal ? 'transferTo' : 'transferFrom';
  }

  return {
    ...transfer,
    accountList,
    transferDisplayType,
    transferFromDisplayName: getDisplayName(transfer.transferFrom, accountList),
    transferToDisplayName: getDisplayName(transfer.transferTo, accountList),
  };
};

export const getTransferMoneyPayload = (state, index) => {
  const entries = getEntries(state);
  const openedEntry = entries[index];

  const {
    transactionId, date, deposit, withdrawal,
  } = openedEntry;

  const { bankAccount: bankAccountId } = getFilterOptions(state);
  const amount = withdrawal || deposit;

  const transfer = getTransfer(state);
  return {
    bankAccountId,
    transactionId,
    date,
    amount,
    transferFrom: transfer.transferFrom,
    transferTo: transfer.transferTo,
  };
};
