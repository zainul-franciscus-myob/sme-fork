import { createSelector, createStructuredSelector } from 'reselect';

const getUnixTime = date => new Date(date).getTime().toString();
const formatNumber = num => num.toFixed(2);

const getReferenceId = state => state.transferMoney.referenceId;
const getDate = state => state.transferMoney.date;
const getAmount = state => state.transferMoney.amount;
const getAccounts = state => state.transferMoney.accounts;
const getSelectedTransferFromAccountId = state => state.transferMoney.selectedTransferFromAccountId;
const getSelectedTransferToAccountId = state => state.transferMoney.selectedTransferToAccountId;
const getDescription = state => state.transferMoney.description;

const getTransferMoneyProperties = createStructuredSelector({
  referenceId: getReferenceId,
  date: getDate,
  amount: getAmount,
  accounts: getAccounts,
  selectedTransferFromAccountId: getSelectedTransferFromAccountId,
  selectedTransferToAccountId: getSelectedTransferToAccountId,
  description: getDescription,
});

export const getTransferMoneyData = createSelector(getTransferMoneyProperties,
  (transferMoneyProps) => {
    const {
      accounts,
      selectedTransferFromAccountId,
      selectedTransferToAccountId,
      date,
      ...rest
    } = transferMoneyProps;

    const selectedTransferFromAccountIndex = accounts.findIndex(
      account => account.id === selectedTransferFromAccountId,
    );
    const selectedTransferToAccountIndex = accounts.findIndex(
      account => account.id === selectedTransferToAccountId,
    );

    return {
      ...rest,
      accounts,
      selectedTransferFromAccountIndex,
      selectedTransferToAccountIndex,
      date: getUnixTime(date),
    };
  });

const formatBalance = (balance) => {
  const num = parseFloat(balance);

  if (Number.isNaN(num)) { return '-'; }

  return num < 0 ? `-$${formatNumber(Math.abs(num))}` : `$${formatNumber(num)}`;
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
  ({ accounts, ...rest }) => ({ ...rest }),
);

export const getIsActionsDisabled = state => state.isSubmitting;
export const isPageEdited = state => state.isPageEdited;
export const getAlertMessage = state => state.alertMessage;
export const getModalType = state => state.modalType;
export const getIsLoading = state => state.isLoading;
