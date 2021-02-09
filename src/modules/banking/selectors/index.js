import { createSelector } from 'reselect';

import { ALL_BANK_ACCOUNTS } from '../types/BankAccountEnums';
import { businessEventTypes } from '../../../common/types/BusinessEventTypeMap';
import BankingViewCodes from '../BankingViewCodes';
import Config from '../../../Config';
import FocusLocations from '../types/FocusLocations';
import LoadMoreButtonStatuses from '../../../components/PaginatedListTemplate/LoadMoreButtonStatuses';
import MatchTransactionShowType from '../types/MatchTransactionShowType';
import Region from '../../../common/types/Region';
import RuleTypes from '../bankingRule/RuleTypes';
import StatusTypes, {
  isStatusUnapproved,
} from '../types/BankTransactionStatusTypes';
import TabItems from '../types/TabItems';
import formatAmount from '../../../common/valueFormatters/formatAmount';
import formatCurrency from '../../../common/valueFormatters/formatCurrency';
import formatSlashDate from '../../../common/valueFormatters/formatDate/formatSlashDate';
import getRegionToDialectText from '../../../dialect/getRegionToDialectText';

export const getOrderBy = ({ orderBy }) => orderBy;

export const getSortOrder = ({ sortOrder }) => sortOrder;

export const getOrder = createSelector(
  getSortOrder,
  getOrderBy,
  (sortOrder, orderBy) => ({
    column: orderBy,
    descending: sortOrder === 'desc',
  })
);
export const getFlipSortOrder = ({ sortOrder }) =>
  sortOrder === 'desc' ? 'asc' : 'desc';

export const getAlert = ({ alert }) => alert;

export const getModalAlert = (state) => state.modalAlert;

export const getBankAccounts = (state) => state.bankAccounts;

export const getActiveBankAccounts = (state) => {
  return state.bankAccounts.filter(({ isInactive }) => !isInactive);
};

export const getEntries = (state) => state.entries;

export const getBusinessId = (state) => state.businessId;
export const getRegion = (state) => state.region;
export const getIsLoadingAccount = (state) => state.isLoadingAccount;

export const getWithdrawalAccounts = (state) => state.withdrawalAccounts;
export const getDepositAccounts = (state) => state.depositAccounts;
export const getTransferAccounts = (state) => state.transferAccounts;

export const getBankTableData = createSelector(
  (state) => state.entries.length,
  (len) => Array(len).fill({})
);

export const getBankEntryByIndexSelector = () =>
  createSelector(
    (state, props) => state.entries[props.index],
    getWithdrawalAccounts,
    getDepositAccounts,
    getBankAccounts,
    (entry, withdrawalAccounts, depositAccounts, bankAccounts) => {
      const accountList = entry.deposit ? depositAccounts : withdrawalAccounts;
      const bankAccount =
        bankAccounts.find((account) => account.id === entry.bankAccountId) ||
        {};

      return {
        ...entry,
        bankAccountName: bankAccount.displayName,
        isInactive: bankAccount.isInactive,
        deposit: entry.deposit && formatAmount(entry.deposit),
        withdrawal: entry.withdrawal && formatAmount(entry.withdrawal),
        displayDate: formatSlashDate(new Date(entry.date)),
        accountList,
        isLineDisabled: entry.isLoading,
      };
    }
  );

export const getFilterOptions = (state) => state.filterOptions;

export const getBankAccount = (state) => state.filterOptions.bankAccount;

export const getBankAccountForPageHead = createSelector(
  getBankAccount,
  (bankAccount) => (bankAccount === ALL_BANK_ACCOUNTS ? undefined : bankAccount)
);

export const getIsAllBankAccountsSelected = createSelector(
  getBankAccount,
  (bankAccount) => bankAccount === ALL_BANK_ACCOUNTS
);

export const getIsTableEmpty = ({ entries }) => entries.length === 0;

export const getIsTableLoading = (state) => state.isTableLoading;

export const getIsTransactionsView = (state) =>
  state.viewCode === BankingViewCodes.TRANSACTIONS_VIEW;

export const getIsCantLoadTransactionsView = (state) =>
  state.viewCode === BankingViewCodes.EMPTY_TABLE_VIEW;

export const getIsSetupBankFeedsView = (state) =>
  state.viewCode === BankingViewCodes.SET_UP_BANK_FEEDS_VIEW;

export const getLoadingState = (state) => state.loadingState;

export const getMyMyobLink = createSelector(getRegion, (region) =>
  region === Region.nz ? Config.MY_MYOB_NZ_URL : Config.MY_MYOB_AU_URL
);

export const getTransactionTypes = createSelector(
  (state) => state.transactionTypes,
  (transactionTypes) =>
    transactionTypes.map((transactionType) => ({
      label: transactionType.name,
      value: transactionType.value,
    }))
);

export const getBalances = (state) => state.balances;

export const getAllocationPayload = (index, selectedAccount, state) => {
  const entries = getEntries(state);
  const entry = entries[index];
  const description = entry.note || entry.description;

  const { id: accountId, taxCodeId } = selectedAccount;

  return {
    bankAccountId: entry.bankAccountId,
    transactionId: entry.transactionId,
    deposit: entry.deposit,
    withdrawal: entry.withdrawal,
    date: entry.date,
    accountId,
    description,
    taxCodeId,
  };
};

export const getUnallocationPayload = (index, state) => {
  const entries = getEntries(state);
  const entry = entries[index];

  return {
    bankAccountId: entry.bankAccountId,
    entries: entry.journals.map((journal) => ({
      transactionId: entry.transactionId,
      journalLineId: journal.journalLineId,
    })),
  };
};

export const getModalType = (state) => state.modalType;

export const getOpenPosition = (state) => state.openPosition;

export const getIsOpenEntryLoading = (state) => state.isOpenEntryLoading;

export const getIsOpenEntryCreating = (state) => state.openEntry.isCreating;

export const getIsOpenEntryEdited = (state) => state.openEntry.isEdited;

export const getOpenEntryActiveTabId = (state) => state.openEntry.activeTabId;

export const getDefaultOpenPosition = () => -1;

export const getIsEntryLoading = createSelector(
  getIsOpenEntryLoading,
  getEntries,
  (isOpenEntryLoading, entries) =>
    isOpenEntryLoading || entries.some(({ isLoading }) => isLoading)
);

export const getOpenEntryDefaultTabId = ({ type, journals }) => {
  if (
    type === StatusTypes.splitMatched ||
    type === StatusTypes.paymentRuleMatched
  ) {
    return TabItems.match;
  }

  const sourceJournal = journals[0]?.sourceJournal;
  if (
    type === StatusTypes.unmatched ||
    sourceJournal === businessEventTypes.spendMoney ||
    sourceJournal === businessEventTypes.receiveMoney
  ) {
    return TabItems.allocate;
  }

  if (sourceJournal === businessEventTypes.transferMoney) {
    return TabItems.transfer;
  }
  return TabItems.match;
};

export const getShowCreateBankingRuleButton = (state) =>
  [TabItems.allocate, TabItems.payment, TabItems.match].includes(
    state.openEntry.activeTabId
  );

export const getShowCreateTransferMoneyButton = (state) =>
  [TabItems.transfer].includes(state.openEntry.activeTabId);

export const getBankTransactionLineByIndex = (state, index) => {
  const entries = getEntries(state);
  return entries[index];
};

export const getSpendMoneyUid = (journals) =>
  journals[0]?.sourceJournal === businessEventTypes.spendMoney
    ? journals[0].journalUid
    : undefined;

export const getIsAllocated = ({ type, journals }) =>
  !!(
    (type === StatusTypes.singleAllocation ||
      type === StatusTypes.splitAllocation ||
      type === StatusTypes.transfer) &&
    journals[0]?.journalId
  );

export const getLastAllocatedAccount = ({ lastAllocatedAccount }) =>
  lastAllocatedAccount;

export const getIsSplitAllocationSelected = (state) =>
  getOpenEntryActiveTabId(state) === TabItems.allocate;

export const getIsBalancesInvalid = ({
  bankBalance,
  myobBalance,
  unallocated,
}) =>
  bankBalance === undefined ||
  myobBalance === undefined ||
  unallocated === undefined;

export const getDisplayBalances = createSelector(getBalances, (balances) => {
  if (!balances) {
    const undefinedBalanceTooltip = '';
    return {
      bankBalance: '$--',
      myobBalance: '$--',
      unallocated: '$--',
      undefinedBalanceTooltip,
    };
  }
  const { bankBalance, myobBalance, unallocated, bankBalanceDate } = balances;

  const balanceTooltip = bankBalanceDate
    ? `Closing account balance as at ${bankBalanceDate}`
    : "Your bank hasn't provided the account's balance, so we can't show these amounts.";

  if (getIsBalancesInvalid(balances)) {
    return {
      bankBalance: '$--',
      myobBalance: '$--',
      unallocated: '$--',
      balanceTooltip,
    };
  }

  return {
    bankBalance: formatCurrency(bankBalance),
    myobBalance: formatCurrency(myobBalance),
    unallocated: formatCurrency(unallocated),
    balanceTooltip,
  };
});

export const getOpenTransactionLine = createSelector(
  getEntries,
  getOpenPosition,
  (entries, openPosition) => entries[openPosition]
);

const getIsAllocateDisabled = ({ journals, type }) => {
  const sourceJournal = journals[0]?.sourceJournal || '';
  return (
    (sourceJournal !== businessEventTypes.spendMoney &&
      sourceJournal !== businessEventTypes.receiveMoney &&
      sourceJournal !== '') ||
    type === StatusTypes.splitMatched
  );
};

const getIsTransferDisabled = ({ journals, type }) => {
  const sourceJournal = journals[0]?.sourceJournal || '';
  return (
    (sourceJournal !== businessEventTypes.transferMoney &&
      sourceJournal !== '') ||
    type === StatusTypes.splitMatched
  );
};

export const getIsTransactionLineTabDisabled = (
  transactionLine,
  tabToExpandTo
) => {
  if (tabToExpandTo === TabItems.allocate) {
    return getIsAllocateDisabled(transactionLine);
  }

  if (tabToExpandTo === TabItems.transfer) {
    return getIsTransferDisabled(transactionLine);
  }

  return false;
};

export const getIsTabDisabled = (state, tabToExpandTo) => {
  const transactionLine = getOpenTransactionLine(state);

  return getIsTransactionLineTabDisabled(transactionLine, tabToExpandTo);
};

export const getTabItems = createSelector(
  getOpenTransactionLine,
  (openTransactionLine) => {
    const isTransferDisabled = getIsTransferDisabled(openTransactionLine);
    const isAllocateDisabled = getIsAllocateDisabled(openTransactionLine);

    return [
      {
        id: TabItems.transfer,
        label: 'Transfer money',
        isDisabled: isTransferDisabled,
        toolTip:
          isTransferDisabled &&
          'Unmatch this transaction before creating a new one',
      },
      {
        id: TabItems.allocate,
        label: 'Allocate',
        isDisabled: isAllocateDisabled,
        toolTip:
          isAllocateDisabled &&
          'Unmatch this transaction before creating a new one',
      },
      {
        id: TabItems.match,
        label: 'Match transaction',
      },
    ];
  }
);

export const getDefaultTabFocusLocation = (tabId) => {
  switch (tabId) {
    case TabItems.transfer:
    case TabItems.match:
    case TabItems.allocate:
    default:
      return {
        location: FocusLocations.SPLIT_ALLOCATION_ACCOUNT_COMBOBOX,
        index: 0,
      };
  }
};

export const getDisplayName = (id, accountList) => {
  const selectedAccount = accountList.find((account) => account.id === id);

  if (!selectedAccount) {
    return id;
  }

  const { displayId, displayName } = selectedAccount || {};

  return `${displayId} ${displayName}`;
};

export const getTaxCodes = (state) => state.taxCodes;

export const getJobs = (state) => state.jobs;

export const getTitle = (state) => getRegionToDialectText(state.region)('Tax');

export const getBankingRuleModuleContext = createSelector(
  getBusinessId,
  getRegion,
  getOpenTransactionLine,
  getBankAccounts,
  getOpenEntryActiveTabId,
  getJobs,
  getTaxCodes,
  getWithdrawalAccounts,
  getDepositAccounts,
  (
    businessId,
    region,
    openTransactionLine,
    bankAccounts,
    activeTabId,
    jobs,
    taxCodes,
    withdrawalAccounts,
    depositAccounts
  ) => {
    const {
      date,
      withdrawal,
      deposit,
      description,
      bankAccountId,
    } = openTransactionLine;
    const ruleType = (() => {
      if (withdrawal) {
        if (activeTabId === TabItems.allocate) {
          return RuleTypes.spendMoney;
        }
        return RuleTypes.bill;
      }

      if (activeTabId === TabItems.allocate) {
        return RuleTypes.receiveMoney;
      }

      return RuleTypes.invoice;
    })();

    return {
      businessId,
      region,
      transaction: {
        accountId: bankAccountId,
        accountDisplayName: getDisplayName(bankAccountId, bankAccounts),
        date,
        description,
        withdrawal,
        deposit,
      },
      ruleType,
      bankAccounts,
      jobs,
      taxCodes,
      withdrawalAccounts,
      depositAccounts,
    };
  }
);

export const getIsEditingNote = (state, index) =>
  state.editingNotePosition === index;

export const getIsSubmittingNote = (state, index) =>
  state.editingNotePosition === index && state.isSubmittingNote;

export const getPendingNote = (state) => state.pendingNote;

const getEditingNotePosition = (state) => state.editingNotePosition;

export const getEditingNoteTransaction = createSelector(
  getEntries,
  getEditingNotePosition,
  (entries, position) => entries[position]
);

export const getShouldShowNote = (state, index) => {
  const entries = getEntries(state);
  return (
    entries[index].note && entries[index].note !== entries[index].description
  );
};

export const getAccountModalContext = (state) => {
  const businessId = getBusinessId(state);
  const region = getRegion(state);

  return { businessId, region };
};

export const getOffset = (state) => state.pagination.offset;

export const getLoadMoreButtonStatus = (state) => {
  const isTableLoading = getIsTableLoading(state);
  const isError = !getIsTransactionsView(state);
  const { isLoadingMore } = state;
  const isLastPage = !state.pagination?.hasNextPage;

  if (isLastPage || isTableLoading || isError) {
    return LoadMoreButtonStatuses.HIDDEN;
  }

  if (isLoadingMore) {
    return LoadMoreButtonStatuses.LOADING;
  }
  return LoadMoreButtonStatuses.SHOWN;
};

export const getLoadBankBalancesUrlParams = createSelector(
  getBusinessId,
  getBankAccount,
  (businessId, bankAccount) => ({ businessId, bankAccount })
);

export const getLoadBankTransactionsParams = createSelector(
  getFilterOptions,
  getSortOrder,
  getOrderBy,
  (filterOptions, sortOrder, orderBy) => ({
    ...filterOptions,
    sortOrder,
    orderBy,
  })
);

export const getLoadBankTransactionsUrlParams = createSelector(
  getBusinessId,
  (businessId) => ({ businessId })
);

export const getLoadBankTransactionsNextPageUrlParams = createSelector(
  getBusinessId,
  (businessId) => ({ businessId })
);
export const getLoadBankTransactionsNextPageParams = createSelector(
  getFilterOptions,
  getSortOrder,
  getOrderBy,
  getOffset,
  (filterOptions, sortOrder, orderBy, offset) => ({
    ...filterOptions,
    sortOrder,
    orderBy,
    offset,
  })
);

export const getFilterBankTransactionsUrlParams = createSelector(
  getBusinessId,
  (businessId) => ({ businessId })
);
export const getFilterBankTransactionsParams = createSelector(
  getFilterOptions,
  getSortOrder,
  getOrderBy,
  (filterOptions, sortOrder, orderBy) => ({
    ...filterOptions,
    sortOrder,
    orderBy,
    offset: 0,
  })
);

export const getSortBankTransactionsUrlParams = createSelector(
  getBusinessId,
  (businessId) => ({ businessId })
);
export const getSortBankTransactionsParams = (state, orderBy) => ({
  ...state.filterOptions,
  sortOrder: getFlipSortOrder(state),
  orderBy,
  offset: 0,
});

export const getIsSelected = (state, index) =>
  getEntries(state)[index].selected;
export const getIsHovering = (state, index) => state.hoverIndex === index;
export const getIsFocused = (state, index, location) =>
  state.focus.index === index &&
  state.focus.location === location &&
  state.focus.isFocused;

export const getLocationOfTransactionLine = (state, index) => {
  const entries = getEntries(state);
  if (index >= entries.length) {
    return undefined;
  }

  return FocusLocations.MATCHED_OR_ALLOCATED_ELEMENT;
};

export const getIndexOfNextUnapprovedLine = (state, startIndex = 0) => {
  const entries = getEntries(state);
  return entries.findIndex(
    (entry, index) => index >= startIndex && isStatusUnapproved(entry.type)
  );
};

export const getURLParams = createSelector(
  getFilterOptions,
  ({ transactionType, dateFrom, dateTo, bankAccount, keywords }) => {
    return {
      transactionType,
      dateFrom,
      dateTo,
      bankAccount,
      keywords,
    };
  }
);

export const getIsOpenTransactionWithdrawal = (state) => {
  const openPosition = getOpenPosition(state);
  const { withdrawal } = getBankTransactionLineByIndex(state, openPosition);
  return Boolean(withdrawal);
};

const getShowTypeFromBankTransaction = (bankTransaction) => {
  switch (bankTransaction.type) {
    case StatusTypes.matched:
    case StatusTypes.unmatched:
      return MatchTransactionShowType.CLOSE_MATCHES;
    case StatusTypes.paymentRuleMatched:
      return MatchTransactionShowType.ALL;
    default:
      return MatchTransactionShowType.SELECTED;
  }
};

const getAppliedPaymentRuleContactId = ({ appliedRule = {} }) =>
  ['Invoice', 'Bill'].includes(appliedRule.ruleType)
    ? String(appliedRule.contactId)
    : undefined;

export const getMatchTransactionsContext = (state, index) => {
  const bankTransaction = getBankTransactionLineByIndex(state, index);
  const isWithdrawal = !!bankTransaction.withdrawal;
  const accounts = isWithdrawal
    ? getWithdrawalAccounts(state)
    : getDepositAccounts(state);

  return {
    businessId: getBusinessId(state),
    region: getRegion(state),
    contactId: getAppliedPaymentRuleContactId(state),
    taxCodes: getTaxCodes(state),
    jobs: getJobs(state),
    accounts,
    bankAccountId: bankTransaction.bankAccountId,
    showType: getShowTypeFromBankTransaction(bankTransaction),
    transaction: {
      id: bankTransaction.transactionId,
      amount: bankTransaction.withdrawal || bankTransaction.deposit,
      date: bankTransaction.date,
      isWithdrawal,
      description: bankTransaction.description,
      note: bankTransaction.note,
    },
  };
};

export const getLastMonthInFinancialYear = (state) =>
  state.lastMonthInFinancialYear;
