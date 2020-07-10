import { createSelector, createStructuredSelector } from 'reselect';
import { isBefore } from 'date-fns';

import {
  LOAD_NEW_DUPLICATE_TRANSFER_MONEY,
  LOAD_NEW_TRANSFER_MONEY,
  LOAD_TRANSFER_MONEY_DETAIL,
} from '../TransferMoneyIntents';
import ModalType from '../ModalType';

export const getTransferMoneyId = (state) => state.transferMoneyId;
const getReferenceId = (state) => state.transferMoney.referenceId;
const getOriginalReferenceId = (state) =>
  state.transferMoney.originalReferenceId;
const getDate = (state) => state.transferMoney.date;
const getAmount = (state) => state.transferMoney.amount;
const getAccounts = (state) => state.transferMoney.accounts;
const getSelectedTransferFromAccountId = (state) =>
  state.transferMoney.selectedTransferFromAccountId;
const getSelectedTransferToAccountId = (state) =>
  state.transferMoney.selectedTransferToAccountId;
const getDescription = (state) => state.transferMoney.description;
const getStartOfFinancialYearDate = (state) => state.startOfFinancialYearDate;

export const getTransferMoneyProperties = createStructuredSelector({
  referenceId: getReferenceId,
  originalReferenceId: getOriginalReferenceId,
  date: getDate,
  amount: getAmount,
  accounts: getAccounts,
  selectedTransferFromAccountId: getSelectedTransferFromAccountId,
  selectedTransferToAccountId: getSelectedTransferToAccountId,
  description: getDescription,
});

const formatNumber = (amount) =>
  Intl.NumberFormat('en-AU', {
    style: 'decimal',
    minimumFractionDigits: '2',
    maximumFractionDigits: '2',
  }).format(amount);

const formatBalance = (balance) => {
  if (balance === undefined || Number.isNaN(balance)) {
    return '-';
  }

  const formattedBalance = formatNumber(Math.abs(balance));
  return balance < 0 ? `-$${formattedBalance}` : `$${formattedBalance}`;
};

const getCalculatedBalance = ({
  currentBalance,
  amount,
  direction,
  isLiability,
}) => {
  const amountForDirection = direction === 'IN' ? amount : 0 - amount;

  return isLiability
    ? currentBalance - amountForDirection
    : currentBalance + amountForDirection;
};

const getSelectedAccount = (accounts, selectedAccountId) =>
  accounts.find((account) => account.id === selectedAccountId) || {};

const getBalanceForTransferFromAccount = createSelector(
  getAccounts,
  getSelectedTransferFromAccountId,
  getAmount,
  (accounts, selectedAccountId, amount) => {
    const { currentBalance, accountType } = getSelectedAccount(
      accounts,
      selectedAccountId
    );
    const calculatedBalance = getCalculatedBalance({
      currentBalance: Number(currentBalance),
      amount: Number(amount),
      direction: 'OUT',
      isLiability: accountType === 'Liability',
    });

    return {
      currentBalance: formatBalance(currentBalance),
      calculatedBalance: formatBalance(calculatedBalance),
    };
  }
);

const getBalanceForTransferToAccount = createSelector(
  getAccounts,
  getSelectedTransferToAccountId,
  getAmount,
  (accounts, selectedAccountId, amount) => {
    const { currentBalance, accountType } = getSelectedAccount(
      accounts,
      selectedAccountId
    );
    const calculatedBalance = getCalculatedBalance({
      currentBalance: Number(currentBalance),
      amount: Number(amount),
      direction: 'IN',
      isLiability: accountType === 'Liability',
    });

    return {
      currentBalance: formatBalance(currentBalance),
      calculatedBalance: formatBalance(calculatedBalance),
    };
  }
);

export const getBalance = createStructuredSelector({
  transferFrom: getBalanceForTransferFromAccount,
  transferTo: getBalanceForTransferToAccount,
});

export const getCreateTransferMoneyPayload = createSelector(
  getTransferMoneyProperties,
  ({ accounts, originalReferenceId, referenceId, ...rest }) =>
    referenceId === originalReferenceId ? rest : { ...rest, referenceId }
);

export const getIsActionsDisabled = (state) => state.isSubmitting;
export const isPageEdited = (state) => state.isPageEdited;
export const getAlert = (state) => state.alert;
export const getLoadingState = (state) => state.loadingState;
export const getBusinessId = (state) => state.businessId;
export const getRegion = (state) => state.region;
export const getPageTitle = (state) => state.transferMoney.pageTitle;
export const getDuplicateId = (state) => state.duplicateId;

export const getModal = (state) => state.modal;
export const getModalUrl = (state) => (state.modal || {}).url;

export const getTransactionListUrl = createSelector(
  getBusinessId,
  getRegion,
  (businessId, region) => `/#/${region}/${businessId}/transactionList`
);

export const getSaveUrl = (state) => {
  const modalUrl = getModalUrl(state);
  const transactionListUrl = getTransactionListUrl(state);
  return modalUrl || transactionListUrl;
};

export const getIsCreating = createSelector(
  getTransferMoneyId,
  (transferMoneyId) => transferMoneyId === 'new'
);

export const getOpenedModalType = (state) => {
  const modal = getModal(state) || { type: ModalType.NONE };

  return modal.type;
};

export const getLoadTransferMoneyIntent = createSelector(
  getIsCreating,
  getDuplicateId,
  (isCreating, duplicateId) => {
    if (isCreating) {
      return duplicateId
        ? LOAD_NEW_DUPLICATE_TRANSFER_MONEY
        : LOAD_NEW_TRANSFER_MONEY;
    }
    return LOAD_TRANSFER_MONEY_DETAIL;
  }
);

export const getLoadTransferMoneyUrlParams = createSelector(
  getIsCreating,
  getBusinessId,
  getTransferMoneyId,
  getDuplicateId,
  (isCreating, businessId, transferMoneyId, duplicateId) => {
    if (isCreating) {
      return duplicateId ? { duplicateId, businessId } : { businessId };
    }
    return {
      businessId,
      transferMoneyId,
    };
  }
);

export const getDeleteTransferMoneyUrlParams = createSelector(
  getBusinessId,
  getTransferMoneyId,
  (businessId, transferMoneyId) => ({
    businessId,
    transferMoneyId,
  })
);

export const getCreateTransferMoneyUrlParams = createSelector(
  getBusinessId,
  (businessId) => ({
    businessId,
  })
);

export const getCreateNewUrl = createSelector(
  getRegion,
  getBusinessId,
  (region, businessId) => `/#/${region}/${businessId}/transferMoney/new`
);

export const getIsBeforeStartOfFinancialYear = createSelector(
  getDate,
  getStartOfFinancialYearDate,
  (date, startOfFinancialYearDate) =>
    date &&
    startOfFinancialYearDate &&
    isBefore(new Date(date), new Date(startOfFinancialYearDate))
);
