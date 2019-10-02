import { createSelector, createStructuredSelector } from 'reselect';

const getReferenceId = state => state.transferMoney.referenceId;
const getOriginalReferenceId = state => state.transferMoney.originalReferenceId;
const getDate = state => state.transferMoney.date;
const getAmount = state => state.transferMoney.amount;
const getAccounts = state => state.transferMoney.accounts;
const getSelectedTransferFromAccountId = state => state.transferMoney.selectedTransferFromAccountId;
const getSelectedTransferToAccountId = state => state.transferMoney.selectedTransferToAccountId;
const getDescription = state => state.transferMoney.description;

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

const formatNumber = amount => Intl.NumberFormat('en-AU',
  { style: 'decimal', minimumFractionDigits: '2', maximumFractionDigits: '2' }).format(amount);

const formatBalance = (balance) => {
  if (balance === undefined || Number.isNaN(balance)) { return '-'; }

  const formattedBalance = formatNumber(Math.abs(balance));
  return balance < 0 ? `-$${formattedBalance}` : `$${formattedBalance}`;
};

const getCalculatedBalance = ({
  currentBalance, amount, direction, isLiability,
}) => {
  const amountForDirection = direction === 'IN'
    ? amount
    : 0 - amount;

  return isLiability
    ? currentBalance - amountForDirection
    : currentBalance + amountForDirection;
};

const getSelectedAccount = (accounts, selectedAccountId) => (
  accounts.find(account => account.id === selectedAccountId) || {});

const getBalanceForTransferFromAccount = createSelector(
  getAccounts,
  getSelectedTransferFromAccountId,
  getAmount,
  (accounts, selectedAccountId, amount) => {
    const { currentBalance, accountType } = getSelectedAccount(accounts, selectedAccountId);
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
  },
);

const getBalanceForTransferToAccount = createSelector(
  getAccounts,
  getSelectedTransferToAccountId,
  getAmount,
  (accounts, selectedAccountId, amount) => {
    const { currentBalance, accountType } = getSelectedAccount(accounts, selectedAccountId);
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
  },
);

export const getBalance = createStructuredSelector({
  transferFrom: getBalanceForTransferFromAccount,
  transferTo: getBalanceForTransferToAccount,
});

export const getCreateTransferMoneyPayload = createSelector(
  getTransferMoneyProperties,
  ({
    accounts, originalReferenceId, referenceId, ...rest
  }) => (referenceId === originalReferenceId ? rest : { ...rest, referenceId }),
);

export const getIsActionsDisabled = state => state.isSubmitting;
export const isPageEdited = state => state.isPageEdited;
export const getAlertMessage = state => state.alertMessage;
export const getModalType = state => state.modalType;
export const getIsLoading = state => state.isLoading;
export const getBusinessId = state => state.businessId;
export const getRegion = state => state.region;
export const getPageTitle = state => state.transferMoney.pageTitle;
