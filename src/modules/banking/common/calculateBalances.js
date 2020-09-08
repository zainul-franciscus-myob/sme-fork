import { getIsBalancesInvalid } from '../bankingSelectors';
import BankTransactionAccountTypes from './BankTransactionAccountTypes';

const getSelectedBankAccount = (bankAccounts, selectedBankAccountId) =>
  bankAccounts.find((b) => b.id === selectedBankAccountId) || {};

const calculateBalance = ({
  balances,
  amount,
  bankAccounts,
  selectedBankAccountId,
}) => {
  if (getIsBalancesInvalid(balances)) {
    return balances;
  }

  const selectedBankAccount = getSelectedBankAccount(
    bankAccounts,
    selectedBankAccountId
  );
  const { bankBalance, myobBalance, unallocated } = balances;

  if (
    selectedBankAccount.accountType === BankTransactionAccountTypes.LIABILITY
  ) {
    return {
      ...balances,
      bankBalance,
      myobBalance: myobBalance + amount,
      unallocated: unallocated - amount,
    };
  }

  // Selected bank account type is an asset
  return {
    ...balances,
    bankBalance,
    myobBalance: myobBalance - amount,
    unallocated: unallocated + amount,
  };
};

export default calculateBalance;
