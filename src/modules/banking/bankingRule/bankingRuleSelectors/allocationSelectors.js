import { createSelector } from 'reselect';

import {
  getBankingRule,
  getBankingRuleModal,
  getContactId,
  getContacts,
  getRuleType,
} from './ruleDetailsSelectors';
import AllocationTypes from '../AllocationTypes';
import RuleTypes from '../RuleTypes';
import formatNumberWithDecimalScaleRange from '../../../../common/valueFormatters/formatNumberWithDecimalScaleRange';
import getRegionToDialectText from '../../../../dialect/getRegionToDialectText';

export const getTaxCodes = createSelector(
  getBankingRuleModal,
  ({ taxCodes }) => taxCodes
);

export const getAllocationType = createSelector(
  getBankingRule,
  (bankingRule) => bankingRule.allocationType
);

export const getAllocations = createSelector(
  getBankingRule,
  (bankingRule) => bankingRule.allocations
);

const getWithdrawalAccounts = createSelector(
  getBankingRuleModal,
  ({ withdrawalAccounts }) => withdrawalAccounts
);

const getDepositAccounts = createSelector(
  getBankingRuleModal,
  ({ depositAccounts }) => depositAccounts
);

export const getAllocationAccounts = createSelector(
  getWithdrawalAccounts,
  getDepositAccounts,
  getRuleType,
  (withdrawalAccounts, depositAccounts, ruleType) =>
    ruleType === 'SpendMoney' ? withdrawalAccounts : depositAccounts
);

export const getAllocationLabel = createSelector(
  getAllocationType,
  (allocationType) =>
    allocationType === AllocationTypes.percent ? 'Percent (%)' : 'Amount ($)'
);

const getAllocationsLength = (state) => getAllocations(state).length;

export const getTableData = createSelector(getAllocationsLength, (length) =>
  Array(length).fill({})
);

export const getTableRow = (state, { index }) => {
  const row = getAllocations(state)[index];
  return (
    row || {
      accountId: '',
      value: '',
      taxCodeId: '',
    }
  );
};

export const getIsFieldDisabled = (state, { index }) => {
  const rowCount = getAllocationsLength(state);
  return rowCount <= index;
};

export const getIsAccountFieldDisabled = (state, { index }) => {
  const rowCount = getAllocationsLength(state) + 1;
  return rowCount <= index;
};

export const getIsInputField = (state, { index }) => {
  const rowCount = getAllocationsLength(state);
  const isOnly = rowCount === 1;
  const isLast = index === rowCount - 1;

  if (getAllocationType(state) === AllocationTypes.percent) {
    return false;
  }
  if (isOnly) {
    return true;
  }

  return isLast;
};

export const getShowRemainingPercentage = createSelector(
  getAllocationType,
  getAllocationsLength,
  (allocationType, length) =>
    allocationType === AllocationTypes.percent && length !== 0
);

const calculatePercentageRemaining = (state) =>
  getAllocations(state).reduce(
    (acc, allocation) => acc - (Number(allocation.value) || 0),
    100
  );

export const getRemainingPercentage = createSelector(
  calculatePercentageRemaining,
  (percentageRemaining) => {
    const formattedPercentage = formatNumberWithDecimalScaleRange(
      percentageRemaining,
      2,
      2
    );
    return `${formattedPercentage}%`;
  }
);

export const getIsPercentageRed = createSelector(
  calculatePercentageRemaining,
  (percentageRemaining) => percentageRemaining === 0
);

export const getIsPaymentReportable = createSelector(
  getBankingRule,
  (bankingRule) => bankingRule.isPaymentReportable
);

const getSelectedContact = createSelector(
  getContacts,
  getContactId,
  (contacts, contactId) => contacts.find(({ id }) => id === contactId) || {}
);

export const getRegion = (state) => state.region;

export const getShouldShowReportableCheckbox = createSelector(
  getSelectedContact,
  getRegion,
  (contact, region) => contact.contactType === 'Supplier' && region === 'au'
);

export const getDescription = createSelector(
  getBankingRule,
  (bankingRule) => bankingRule.transactionDescription
);

export const getShouldShowAllocationSection = createSelector(
  getRuleType,
  (ruleType) =>
    [RuleTypes.spendMoney, RuleTypes.receiveMoney].includes(ruleType)
);

export const getTaxCodeLabel = (state) =>
  getRegionToDialectText(state.region)('Tax code');
