import { allocateTransaction } from '../../reducers/allocateHandlers';
import { loadOpenEntry } from '../../reducers/openEntryHandlers';
import TabItems from '../../types/TabItems';
import formatAmount from '../../../../common/valueFormatters/formatAmount';
import getDefaultState from '../../reducers/getDefaultState';

export const loadTransferMoney = (state, action) => {
  const defaultState = getDefaultState();

  const transfer = {
    ...defaultState.openEntry.transfer,
    ...action.transfer,
  };
  const isCreating = false;
  return loadOpenEntry(
    state,
    action.index,
    TabItems.transfer,
    transfer,
    isCreating
  );
};

export const loadMatchTransferMoney = (state, action) => {
  const defaultState = getDefaultState();

  const {
    withdrawal,
    deposit,
    date,
    description,
    bankAccountId,
  } = state.entries[action.index];

  const isWithdrawal = !!withdrawal;

  const amount = formatAmount(Number(withdrawal || deposit));

  const transfer = {
    ...defaultState.openEntry.transfer,
    isWithdrawal,
    entries: action.entries,
    transferFrom: isWithdrawal ? bankAccountId : '',
    transferTo: isWithdrawal ? '' : bankAccountId,
    amount,
    date,
    description,
  };

  const isCreating = true;

  return loadOpenEntry(
    state,
    action.index,
    TabItems.transfer,
    transfer,
    isCreating
  );
};

const updateTransferMoneyState = (state, partialTransferMoney) => ({
  ...state,
  openEntry: {
    ...state.openEntry,
    transfer: {
      ...state.openEntry.transfer,
      ...partialTransferMoney,
    },
  },
});

export const sortMatchTransferMoney = (state, action) =>
  updateTransferMoneyState(state, { entries: action.entries });

export const setMatchTransferMoneySortOrder = (state, action) =>
  updateTransferMoneyState(state, {
    orderBy: action.orderBy,
    sortOrder: action.sortOrder,
  });

export const setMatchTransferMoneySelection = (state, action) =>
  updateTransferMoneyState(state, {
    entries: state.openEntry.transfer.entries.map((entry, index) => ({
      ...entry,
      selected: index === Number(action.index),
    })),
  });

export const setMatchTransferMoneyLoadingState = (state, action) =>
  updateTransferMoneyState(state, { isTableLoading: action.isTableLoading });

export const updateTransferMoney = (state, action) =>
  updateTransferMoneyState(state, { [action.key]: action.value });

export const saveTransferMoney = (state, action) => ({
  ...allocateTransaction(state, action),
});
