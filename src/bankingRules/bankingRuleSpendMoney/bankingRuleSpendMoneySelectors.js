import { createSelector, createStructuredSelector } from 'reselect';

import { allocationTypeOptions } from './AllocationTypes';
import formatNumberWithDecimalScaleRange from '../../valueFormatters/formatNumberWithDecimalScaleRange';

export const getAllocationLabel = state => (state.allocationType === allocationTypeOptions.percent
  ? 'Percent (%)'
  : 'Amount ($)');

export const getIsCreating = state => state.bankingRuleId === 'new';
export const getBusinessId = state => state.businessId;
export const getBankingRuleId = state => state.bankingRuleId;
export const getRegion = state => state.region;
export const getIsLoading = state => state.isLoading;
export const getModalType = state => state.modalType;
export const getIsPagedEdited = state => state.isPageEdited;
export const getAlertMessage = state => state.alertMessage;
export const getIsAlertShown = createSelector(
  getAlertMessage,
  message => Boolean(message),
);

export const getIsInactiveRule = state => state.isInactiveRule;
export const getName = state => state.name;
export const getAllocationAccounts = state => state.allocationAccounts;
export const getBankAccounts = state => state.bankAccounts;
export const getTaxCodes = state => state.taxCodes;
export const getContactId = state => state.contactId;
export const getContacts = state => state.contacts;
export const getTransactionDescription = state => state.transactionDescription;
export const getAllocationType = state => state.allocationType;
const getAllocations = state => state.allocations;
const getAllocationsLength = state => state.allocations.length;


export const getShowRemainingPercentage = createSelector(
  getAllocationType,
  getAllocationsLength,
  (allocationType, length) => allocationType === allocationTypeOptions.percent && length !== 0,
);

const calculatePercentageRemaining = state => getAllocations(state).reduce(
  (acc, allocation) => acc - (Number(allocation.value) || 0),
  100,
);

export const getRemainingPercentage = createSelector(
  calculatePercentageRemaining,
  (percentageRemaining) => {
    const formattedPercentage = formatNumberWithDecimalScaleRange(percentageRemaining, 2, 2);
    return `${formattedPercentage}%`;
  },
);

export const getIsPercentageRed = createSelector(
  calculatePercentageRemaining,
  percentageRemaining => percentageRemaining === 0,
);

export const getDescriptionSection = createStructuredSelector({
  applyToAllAccounts: state => state.applyToAllAccounts,
  accountId: state => state.accountId,
  bankAccounts: getBankAccounts,
  containsWords: state => state.conditions.containsWords.value,
  exactWords: state => state.conditions.exactWords.value,
});

export const getTableData = createSelector(
  state => state.allocations.length,
  length => Array(length).fill({}),
);

export const getTableRow = (state, { index }) => {
  const row = state.allocations[index];
  return row || state.newAllocationLine;
};

export const getIsFieldDisabled = (state, { index }) => {
  const rowCount = state.allocations.length;
  return rowCount <= index;
};

export const getIsAccountFieldDisabled = (state, { index }) => {
  const rowCount = state.allocations.length + 1;
  return rowCount <= index;
};

export const getIsInputField = (state, { index }) => {
  const rowCount = state.allocations.length;
  if (rowCount === 1) {
    return true;
  }
  if (index === state.allocations.length - 1) {
    return true;
  }
  return false;
};

export const getSaveBankingRuleContent = state => ({
  name: state.name,
  isInactiveRule: state.isInactiveRule,
  applyToAllAccounts: state.applyToAllAccounts,
  transactionDescription: state.transactionDescription,
  accountId: state.accountId,
  contactId: state.contactId,
  allocationType: state.allocationType,
  allocations: state.allocations,
  conditions: state.conditions,
});

export const getNewBankingRuleParams = state => ({
  businessId: getBusinessId(state),
});

export const getBankingRuleParams = state => ({
  businessId: getBusinessId(state),
  bankingRuleId: getBankingRuleId(state),
});

export const getBankingRuleListUrl = (state) => {
  const businessId = getBusinessId(state);
  const region = getRegion(state);

  return `/#/${region}/${businessId}/bankingRule`;
};
