import { createSelector, createStructuredSelector } from 'reselect';

import { allocationTypeOptions } from './AllocationTypes';
import ModalType from './ModalType';
import RuleTypes from './RuleTypes';
import formatNumberWithDecimalScaleRange from '../../../common/valueFormatters/formatNumberWithDecimalScaleRange';
import getRegionToDialectText from '../../../dialect/getRegionToDialectText';

const getApplyToAllAccounts = state => state.applyToAllAccounts;
const getAllocations = state => state.allocations;
const getAllocationsLength = state => getAllocations(state).length;
const getAccountId = state => state.accountId;
const getConditions = state => state.conditions;

export const getAllocationLabel = state => (state.allocationType === allocationTypeOptions.percent
  ? 'Percent (%)'
  : 'Amount ($)');

export const getIsCreating = state => state.bankingRuleId === 'new';
export const getBusinessId = state => state.businessId;
export const getBankingRuleId = state => state.bankingRuleId;
export const getRegion = state => state.region;
export const getLoadingState = state => state.loadingState;
export const getModal = state => state.modal;
export const getModalUrl = state => ((state.modal || {}).url);
export const getIsPagedEdited = state => state.isPageEdited;
export const getAlertMessage = state => state.alertMessage;
export const getIsAlertShown = createSelector(
  getAlertMessage,
  message => Boolean(message),
);

export const getIsInactiveRule = state => state.isInactiveRule;
export const getName = state => state.name;
export const getPageTitle = state => state.title;
export const getAllocationAccounts = state => state.allocationAccounts;
export const getBankAccounts = state => state.bankAccounts;
export const getTaxCodes = state => state.taxCodes;
export const getContactId = state => state.contactId;
export const getContacts = state => state.contacts;
export const getSupplierId = state => state.supplierId;
export const getSuppliers = state => state.suppliers;
export const getCustomerId = state => state.customerId;
export const getCustomers = state => state.customers;
export const getTransactionDescription = state => state.transactionDescription;
export const getAllocationType = state => state.allocationType;

export const getIsSelectRuleTypeDisabled = state => !getIsCreating(state);

export const getBankingRuleType = state => state.ruleType;
export const getShowAllocationTable = createSelector(
  getBankingRuleType,
  ruleType => ruleType === RuleTypes.spendMoney
  || ruleType === RuleTypes.receiveMoney,
);

export const getShowIsPaymentReportableCheckbox = createSelector(
  getBankingRuleType,
  getRegion,
  (bankingRuleType, region) => bankingRuleType === RuleTypes.spendMoney && region === 'au',
);

export const getContactLabel = createSelector(
  getBankingRuleType,
  bankingRuleType => (bankingRuleType === RuleTypes.spendMoney ? 'Contact (payee)' : 'Contact (payer)'),
);

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

export const getBankingSection = createStructuredSelector({
  applyToAllAccounts: getApplyToAllAccounts,
  accountId: getAccountId,
  bankAccounts: getBankAccounts,
});

export const getDescriptionSection = createStructuredSelector({
  applyToAllAccounts: getApplyToAllAccounts,
  accountId: getAccountId,
  bankAccounts: getBankAccounts,
});

export const getConditionsSection = createSelector(
  getConditions,
  conditions => conditions,
);

export const getConditionLabel = createSelector(
  getBankingRuleType,
  (bankingRuleType) => {
    if (bankingRuleType === RuleTypes.spendMoney || bankingRuleType === RuleTypes.bill) {
      return 'When money spent on the bank statement matches these conditions';
    }
    return 'When money received on the bank statement matches these conditions';
  },
);

export const getTableData = createSelector(
  getAllocationsLength,
  length => Array(length).fill({}),
);

export const getTableRow = (state, { index }) => {
  const row = getAllocations(state)[index];
  return row || state.newAllocationLine;
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

  if (getAllocationType(state) === allocationTypeOptions.percent) {
    return false;
  }
  if (isOnly) {
    return true;
  }

  return isLast;
};

export const getIsPaymentReportable = state => state.isPaymentReportable;
const getSelectedContact = createSelector(
  getContacts,
  getContactId,
  (contacts, contactId) => contacts.find(({ id }) => id === contactId) || {},
);
export const getIsPaymentReportableCheckboxDisabled = createSelector(
  getSelectedContact,
  contact => contact.contactType !== 'Supplier',
);
export const getSaveBankingRuleContent = createStructuredSelector({
  name: getName,
  isInactiveRule: getIsInactiveRule,
  ruleType: getBankingRuleType,
  applyToAllAccounts: getApplyToAllAccounts,
  transactionDescription: getTransactionDescription,
  accountId: getAccountId,
  contactId: getContactId,
  supplierId: getSupplierId,
  customerId: getCustomerId,
  allocationType: getAllocationType,
  allocations: getAllocations,
  conditions: getConditions,
  isPaymentReportable: getIsPaymentReportable,
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

export const getSaveUrl = (state) => {
  const modalUrl = getModalUrl(state);
  const bankingRuleListUrl = getBankingRuleListUrl(state);
  return modalUrl || bankingRuleListUrl;
};

export const getTaxCodeLabel = state => getRegionToDialectText(state.region)('Tax code');

export const getOpenedModalType = (state) => {
  const modal = getModal(state) || { type: ModalType.NONE };

  return modal.type;
};
