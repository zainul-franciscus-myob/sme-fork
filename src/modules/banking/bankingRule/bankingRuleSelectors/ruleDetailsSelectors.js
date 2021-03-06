import { createSelector } from 'reselect';

import { getBusinessId, getRegion } from './sharedSelectors';
import ApplyTypes from '../ApplyTypes';
import AutomatedRuleTypes from '../AutomatedRuleTypes';
import ContactType from '../../../contact/contactCombobox/types/ContactType';
import DisplayMode from '../../../contact/contactCombobox/types/DisplayMode';
import RuleTypes from '../RuleTypes';
import formatCurrency from '../../../../common/valueFormatters/formatCurrency';
import formatSlashDate from '../../../../common/valueFormatters/formatDate/formatSlashDate';

export const getBankingRule = (state) => state.bankingRule;

export const getIsLoading = (state) => state.isLoading;

export const getIsBankingRuleOpen = (state) => state.isOpen;

export const getBankAccounts = (state) => state.bankAccounts;

export const getBankTransactionDetails = (state) => state.transaction;

export const getIsPaymentReportableForBankRule = (state) => {
  if (
    state.bankingRule.ruleType === RuleTypes.spendMoney &&
    state.contactType === ContactType.SUPPLIER &&
    state.bankingRule.isPaymentReportable === undefined
  ) {
    return false;
  }

  return state.bankingRule.isPaymentReportable;
};

export const getBankingRuleSaveContent = createSelector(
  getBankingRule,
  getIsPaymentReportableForBankRule,
  (bankingRule, isPaymentReportable) => ({
    ...bankingRule,
    isPaymentReportable,
  })
);

export const getIsWithdrawal = createSelector(
  getBankTransactionDetails,
  ({ withdrawal }) => Boolean(withdrawal)
);

export const getBankTransactionSummaryHeader = createSelector(
  getBankTransactionDetails,
  getIsWithdrawal,
  (bankTransactionDetails, isWithdrawal) => {
    const {
      date,
      description,
      accountDisplayName,
      withdrawal,
      deposit,
    } = bankTransactionDetails;
    const amountLabel = isWithdrawal ? 'Withdrawal ($)' : 'Deposit ($)';
    const amount = withdrawal || deposit;
    return {
      date: {
        label: 'Date',
        value: formatSlashDate(new Date(date)),
      },
      account: {
        label: 'Bank account',
        value: accountDisplayName,
      },
      description: {
        label: 'Bank statement description',
        value: description,
      },
      amount: {
        label: amountLabel,
        value: formatCurrency(amount),
      },
    };
  }
);

const getRuleTypes = (isWithdrawal) => {
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

export const getRuleTypeOptions = createSelector(getIsWithdrawal, getRuleTypes);

export const getRuleType = createSelector(
  getBankingRule,
  (bankingRule) => bankingRule.ruleType
);

export const getIsInactive = createSelector(
  getBankingRule,
  (bankingRule) => bankingRule.isInactiveRule
);

export const getApplyToAllAccounts = createSelector(
  getBankingRule,
  (bankingRule) => bankingRule.applyToAllAccounts
);

export const getAlert = (state) => state.alert;

export const getShouldShowBankAccountList = createSelector(
  getApplyToAllAccounts,
  (applyToAllAccounts) => applyToAllAccounts === ApplyTypes.oneBankAccount
);

export const getRuleName = createSelector(
  getBankingRule,
  (bankingRule) => bankingRule.name
);

export const getConditions = createSelector(
  getBankingRule,
  (bankingRule) => bankingRule.conditions
);

export const getContactId = createSelector(
  getBankingRule,
  (bankingRule) => bankingRule.contactId
);

const buildGetContactComboboxContext = (contactType) => (state) => {
  const businessId = getBusinessId(state);
  const region = getRegion(state);
  const contactId = getContactId(state);

  return {
    businessId,
    region,
    contactId,
    contactType,
    displayMode: DisplayMode.NAME_AND_TYPE,
  };
};

export const getCustomerComboboxContext = buildGetContactComboboxContext(
  ContactType.CUSTOMER
);

export const getSupplierComboboxContext = buildGetContactComboboxContext(
  ContactType.SUPPLIER
);

export const getContactComboboxContext = buildGetContactComboboxContext(
  ContactType.ALL
);

export const getAutomatedRuleType = (state) =>
  state.bankingRule.automatedRuleType;

export const getIsNoConditionRuleAllowed = createSelector(
  getRuleType,
  (ruleType) =>
    ruleType === RuleTypes.receiveMoney || ruleType === RuleTypes.spendMoney
);

export const getShowAutomatedRuleType = createSelector(
  getIsNoConditionRuleAllowed,
  (isNoConditionRuleAllowed) => isNoConditionRuleAllowed
);

export const getShowAutomatedRuleDetail = createSelector(
  getAutomatedRuleType,
  (automatedRuleType) => automatedRuleType === AutomatedRuleTypes.AUTOMATED
);

export const getAutomatedRuleTypeOptions = () => [
  { name: 'Automated rule', value: AutomatedRuleTypes.AUTOMATED },
  { name: 'Allocation template', value: AutomatedRuleTypes.MANUAL },
];
