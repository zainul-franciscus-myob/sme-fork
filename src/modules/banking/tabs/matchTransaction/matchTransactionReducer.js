import {
  ADD_MATCH_TRANSACTION_ADJUSTMENT,
  EXPAND_ADJUSTMENT_SECTION,
  LOAD_ACCOUNT_AFTER_CREATE,
  LOAD_JOB_AFTER_CREATE,
  LOAD_MATCH_TRANSACTIONS,
  REMOVE_MATCH_TRANSACTION_ADJUSTMENT,
  RESET_MATCH_TRANSACTION_OPTIONS,
  RESET_MATCH_TRANSACTION_STATE,
  SET_JOB_LOADING_STATE,
  SET_LOADING_SINGLE_ACCOUNT_STATE,
  SET_MATCH_TRANSACTION_INITIAL_STATE,
  SET_MATCH_TRANSACTION_LOADING_STATE,
  SET_MATCH_TRANSACTION_SORT_ORDER,
  SHOW_SELECTED_MATCH_TRANSACTIONS,
  SORT_AND_FILTER_MATCH_TRANSACTIONS,
  TOGGLE_MATCH_TRANSACTION_SELECT_ALL_STATE,
  UPDATE_MATCH_TRANSACTION_ADJUSTMENT,
  UPDATE_MATCH_TRANSACTION_OPTIONS,
  UPDATE_MATCH_TRANSACTION_SELECTION,
  UPDATE_SELECTED_TRANSACTION_DETAILS,
} from './MatchTransactionIntents';
import { getIsAllowCustomAmount } from './matchTransactionSelectors';
import MatchTransactionShowType from '../../types/MatchTransactionShowType';
import createReducer from '../../../../store/createReducer';

export const getMatchTransactionsDefaultState = () => ({
  businessId: '',
  region: '',
  contactId: '',
  bankAccountId: '',
  transaction: {
    id: '',
    isWithdrawal: false,
    amount: 0,
    date: '',
    description: '',
    note: '',
  },
  isOpen: false,
  isTableLoading: true,
  showAdjustmentTable: false,
  totalAmount: 0,
  filterOptions: {
    showType: MatchTransactionShowType.CLOSE_MATCHES,
    contactId: undefined,
    keywords: '',
    includeClosed: false,
  },
  orderBy: '',
  sortOrder: '',
  entries: [],
  adjustments: [],
  accounts: [],
  taxCodes: [],
  jobs: [],
  selectedEntries: {},
  isEdited: false,
  isJobLoading: false,
  isLoadingAccount: false,
});

const setInitialState = (state, action) => {
  const { contactId, showType, transaction, ...rest } = action.context;
  return {
    ...getMatchTransactionsDefaultState(),
    ...rest,
    transaction: {
      ...state.transaction,
      ...transaction,
    },
    filterOptions: {
      ...state.filterOptions,
      showType,
      contactId,
    },
    isOpen: true,
  };
};

const getPrefilledEntries = (state, entries) =>
  entries.map((entry) => {
    const cachedState =
      state.selectedEntries[`${entry.journalId}-${entry.journalLineId}`];
    return cachedState || entry;
  });

const loadMatchTransactions = (state, action) => {
  return {
    ...state,
    isTableLoading: false,
    totalAmount: state.transaction.amount,
    orderBy: action.orderBy,
    sortOrder: action.sortOrder,
    entries: getPrefilledEntries(state, action.entries),
  };
};

const sortAndFilterMatchTransactions = (state, action) => ({
  ...state,
  entries: getPrefilledEntries(state, action.entries),
});

const showSelectedMatchTransactions = (state) => {
  const selectedEntries = state.entries.filter(({ selected }) => selected);
  const entries = selectedEntries.reduce(
    (acc, entry) => ({
      ...acc,
      [`${entry.journalId}-${entry.journalLineId}`]: entry,
    }),
    state.selectedEntries
  );

  return {
    ...state,
    entries: Object.values(entries),
  };
};

const updateMatchTransactionOptions = (state, action) => ({
  ...state,
  filterOptions: {
    ...state.filterOptions,
    [action.key]: action.value,
  },
});

const setMatchTransactionSortOrder = (state, action) => ({
  ...state,
  orderBy: action.orderBy,
  sortOrder: action.sortOrder,
});

const resetMatchTransactionOptions = (state) => ({
  ...state,
  filterOptions: {
    ...getMatchTransactionsDefaultState().filterOptions,
  },
});

const updateMatchEntries = (state, entries) => {
  const selectedEntries = entries.reduce((acc, entry) => {
    if (!entry.selected) {
      const {
        [`${entry.journalId}-${entry.journalLineId}`]: unselectedEntry,
        ...otherEntries
      } = acc;
      return otherEntries;
    }
    return { ...acc, [`${entry.journalId}-${entry.journalLineId}`]: entry };
  }, state.selectedEntries);

  return {
    ...state,
    entries,
    selectedEntries,
  };
};

const updateSelectedTransactionDetails = (state, action) => {
  const { key, value } = action;
  const entries = state.entries.map((entry, index) => {
    if (index === action.index) {
      const selected = key === 'matchAmount' ? true : entry.selected;
      return { ...entry, [key]: value, selected };
    }
    return entry;
  });

  return updateMatchEntries(state, entries);
};

const getMatchAmount = (totalAmount, availableAmount, entry) => {
  // Case: Not allow alteration of the match amount.
  // Return bank transaction total amount.
  const isAllowCustomAmount = getIsAllowCustomAmount(entry);
  if (!isAllowCustomAmount) return totalAmount;

  // Case: No available amount left or in negative.
  if (availableAmount <= 0) return 0;

  // Case: Enough available amount to fulfil transaction (and more).
  // Return full transaction due amount.
  const {
    totalAmount: entryTotalAmount,
    discountAmount: entryDiscountAmount,
  } = entry;
  const entryDueAmount =
    Number(entryTotalAmount) - Number(entryDiscountAmount || 0);
  if (availableAmount >= entryDueAmount) return entryDueAmount;

  // Case: Not enough available amount to fulfil transaction.
  // Return whatever left of the available amount
  return availableAmount;
};

const updateMatchTransactionSelection = (state, action) => {
  const { index, selected } = action;
  const { totalAmount, entries } = state;

  // Case: Unselected. Clear out matchAmount
  if (!selected) {
    const updatedEntries = entries.map((entry, currentIndex) =>
      currentIndex === index ? { ...entry, selected, matchAmount: '' } : entry
    );

    return updateMatchEntries(state, updatedEntries);
  }

  // Case: Selected. Calculate suitable matchAmount
  const sum = entries.reduce(
    (accumulator, { matchAmount }) => accumulator + Number(matchAmount || 0),
    0
  );
  const availableAmount = totalAmount - sum;
  const updatedEntries = entries.map((entry, currentIndex) =>
    index === currentIndex
      ? {
          ...entry,
          selected,
          matchAmount: getMatchAmount(totalAmount, availableAmount, entry),
        }
      : entry
  );

  return updateMatchEntries(state, updatedEntries);
};

const toggleMatchTransactionSelectAllState = (state, action) => {
  const entries = state.entries.map((entry) => ({
    ...entry,
    selected: action.selected,
  }));
  return updateMatchEntries(state, entries);
};

const setMatchTransactionLoadingState = (state, action) => ({
  ...state,
  isTableLoading: action.isLoading,
});

const getTaxCodeId = (state, accountId) => {
  const { accounts } = state;
  const account = accounts.find(({ id }) => id === accountId);
  return account && account.taxCodeId;
};

const addAdjustment = (state, action) => {
  const { key, value } = action;

  const taxCodeId =
    key === 'accountId' ? getTaxCodeId(state, value) : undefined;

  const adjustment = {
    id: action.id,
    taxCodeId,
    [key]: value,
  };

  return {
    ...state,
    isEdited: true,
    adjustments: [...state.adjustments, adjustment],
  };
};

const updateAdjustment = (state, action) => {
  const { key, value } = action;

  const adjustments = state.adjustments.map((adjustment, index) => {
    if (index === action.index) {
      const taxCodeId =
        key === 'accountId' ? getTaxCodeId(state, value) : adjustment.taxCodeId;

      return {
        ...adjustment,
        taxCodeId,
        [key]: value,
      };
    }
    return adjustment;
  });

  return {
    ...state,
    isEdited: true,
    adjustments,
  };
};

const removeAdjustment = (state, action) => ({
  ...state,
  isEdited: true,
  adjustments: state.adjustments.filter((_, index) => index !== action.index),
});

const expandAdjustmentSection = (state) => ({
  ...state,
  showAdjustmentTable: true,
});

const loadAccountAfterCreate = (state, { account }) => ({
  ...state,
  accounts: [account, ...state.accounts],
});

const setLoadingSingleAccountState = (state, { isLoadingAccount }) => {
  return {
    ...state,
    isLoadingAccount,
  };
};

const loadJobAfterCreate = (state, { intent, ...job }) => ({
  ...state,
  jobs: [job, ...state.jobs],
});

const setJobLoadingState = (state, { isJobLoading }) => {
  return {
    ...state,
    isJobLoading,
  };
};

const resetMatchTransactionState = (state) => ({
  ...state,
  ...getMatchTransactionsDefaultState(),
});

const matchTransactionHandlers = {
  [SET_MATCH_TRANSACTION_INITIAL_STATE]: setInitialState,
  [LOAD_MATCH_TRANSACTIONS]: loadMatchTransactions,
  [SORT_AND_FILTER_MATCH_TRANSACTIONS]: sortAndFilterMatchTransactions,
  [SHOW_SELECTED_MATCH_TRANSACTIONS]: showSelectedMatchTransactions,
  [UPDATE_MATCH_TRANSACTION_OPTIONS]: updateMatchTransactionOptions,
  [SET_MATCH_TRANSACTION_SORT_ORDER]: setMatchTransactionSortOrder,
  [RESET_MATCH_TRANSACTION_OPTIONS]: resetMatchTransactionOptions,
  [UPDATE_SELECTED_TRANSACTION_DETAILS]: updateSelectedTransactionDetails,
  [UPDATE_MATCH_TRANSACTION_SELECTION]: updateMatchTransactionSelection,
  [TOGGLE_MATCH_TRANSACTION_SELECT_ALL_STATE]: toggleMatchTransactionSelectAllState,
  [SET_MATCH_TRANSACTION_LOADING_STATE]: setMatchTransactionLoadingState,
  [ADD_MATCH_TRANSACTION_ADJUSTMENT]: addAdjustment,
  [UPDATE_MATCH_TRANSACTION_ADJUSTMENT]: updateAdjustment,
  [REMOVE_MATCH_TRANSACTION_ADJUSTMENT]: removeAdjustment,
  [EXPAND_ADJUSTMENT_SECTION]: expandAdjustmentSection,
  [LOAD_ACCOUNT_AFTER_CREATE]: loadAccountAfterCreate,
  [SET_LOADING_SINGLE_ACCOUNT_STATE]: setLoadingSingleAccountState,
  [LOAD_JOB_AFTER_CREATE]: loadJobAfterCreate,
  [SET_JOB_LOADING_STATE]: setJobLoadingState,
  [RESET_MATCH_TRANSACTION_STATE]: resetMatchTransactionState,
};

const matchTransactionReducer = createReducer(
  getMatchTransactionsDefaultState(),
  matchTransactionHandlers
);

export default matchTransactionReducer;
