import { createSelector } from 'reselect';

import {
  formatCurrency,
  getAppliedFilterOptions,
  getDisplayName,
  getOpenTransactionLine,
} from '../../bankingSelectors';
import ApplyTypes from '../ApplyTypes';
import RuleTypes from '../RuleTypes';
import formatSlashDate from '../../../../common/valueFormatters/formatDate/formatSlashDate';

export const getBankingRuleModal = state => state.bankingRuleModal;

export const getBankingRule = createSelector(
  getBankingRuleModal,
  bankingRuleModal => bankingRuleModal.bankingRule,
);

export const getIsSaving = createSelector(
  getBankingRuleModal,
  bankingRuleModal => bankingRuleModal.isSaving,
);

export const getBankAccounts = createSelector(
  getBankingRuleModal,
  ({ bankAccounts }) => bankAccounts,
);

export const getBankTransactionDetails = createSelector(
  getOpenTransactionLine,
  getAppliedFilterOptions,
  getBankAccounts,
  (transaction, filterOptions, accountList) => {
    const {
      date, withdrawal, deposit, description,
    } = transaction;
    const { bankAccount } = filterOptions;
    return {
      accountId: bankAccount,
      accountDisplayName: getDisplayName(bankAccount, accountList),
      date,
      description,
      withdrawal,
      deposit,
    };
  },
);

export const getIsWithdrawal = createSelector(
  getBankTransactionDetails,
  ({ withdrawal }) => Boolean(withdrawal),
);

export const getBankTransactionSummaryHeader = createSelector(
  getBankTransactionDetails,
  getIsWithdrawal,
  (bankTransactionDetails, isWithdrawal) => {
    const {
      date, description, accountDisplayName, withdrawal, deposit,
    } = bankTransactionDetails;
    const amountLabel = isWithdrawal ? 'Withdrawal ($)' : 'Deposit ($)';
    const amount = withdrawal || deposit;
    return {
      date: {
        label: 'Date', value: formatSlashDate(new Date(date)),
      },
      account: {
        label: 'Bank account', value: accountDisplayName,
      },
      description: {
        label: 'Bank statement description', value: description,
      },
      amount: {
        label: amountLabel, value: formatCurrency(amount),
      },
    };
  },
);

export const getRuleTypes = (isWithdrawal) => {
  const mapping = {
    withdrawal: [
      { name: 'Spend money transaction', value: RuleTypes.spendMoney },
      { name: 'Bill', value: RuleTypes.bill },
    ],
    deposit: [
      { name: 'Receive money transaction', value: RuleTypes.receiveMoney },
      { name: 'Invoice', value: RuleTypes.invoice },
    ],
  };

  return isWithdrawal ? mapping.withdrawal : mapping.deposit;
};

export const getRuleTypeOptions = createSelector(
  getIsWithdrawal,
  getRuleTypes,
);

export const getRuleType = createSelector(
  getBankingRule,
  bankingRule => bankingRule.ruleType,
);

export const getIsInactive = createSelector(
  getBankingRule,
  bankingRule => bankingRule.isInactiveRule,
);

export const getApplyToAllAccounts = createSelector(
  getBankingRule,
  bankingRule => bankingRule.applyToAllAccounts,
);

export const getAlert = createSelector(
  getBankingRuleModal,
  ({ alert }) => alert,
);

export const getShouldShowBankAccountList = createSelector(
  getApplyToAllAccounts,
  applyToAllAccounts => applyToAllAccounts === ApplyTypes.oneBankAccount,
);

export const getRuleName = createSelector(
  getBankingRule,
  bankingRule => bankingRule.name,
);

export const getConditions = createSelector(
  getBankingRule,
  bankingRule => bankingRule.conditions,
);

export const getContacts = createSelector(
  getBankingRuleModal,
  getRuleType,
  ({ contacts }, ruleType) => {
    if (ruleType === RuleTypes.bill) {
      return contacts.filter(({ contactType }) => contactType === 'Supplier');
    }
    if (ruleType === RuleTypes.invoice) {
      return contacts.filter(({ contactType }) => contactType === 'Customer');
    }
    return contacts;
  },
);

export const getContactId = createSelector(
  getBankingRule,
  bankingRule => bankingRule.contactId,
);
