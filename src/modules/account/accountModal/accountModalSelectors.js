import { createSelector } from 'reselect';

import accountTypeToCashFlowClassificationMapping from '../accountTypeToCashFlowClassificationMapping.json';
import getRegionToDialectText from '../../../dialect/getRegionToDialectText';

export const getAlertMessage = (state) => state.alertMessage;

export const getIsLoading = (state) => state.isLoading;

export const getIsFlexAccount = (state) => state.isFlexAccount;

export const getAccount = (state) => state.detail;

export const getAccountClassifications = (state) =>
  state.accountClassifications;
export const getTaxCodes = (state) => state.taxCodes;
export const getCashFlowClassifications = (state) =>
  state.cashFlowClassifications;
export const getHeaderAccounts = (state) => state.headerAccounts;

export const getAccountNumberPrefix = (state) =>
  state.readonly.accountNumberPrefix;

export const getAccountClassification = (state) =>
  state.detail.accountClassification;
export const getAccountType = (state) => state.detail.accountType;
export const getAccountNumber = (state) => state.detail.accountNumber;
export const getAccountName = (state) => state.detail.accountName;
export const getNotes = (state) => state.detail.notes;
export const getParentAccount = (state) => state.detail.parentAccountId;
export const getLevel = (state) => state.detail.level;
export const getIsSubtotalReportable = (state) =>
  state.header.isSubtotalReportable;
export const getTaxCodeId = (state) => state.detail.taxCodeId;
export const getOpeningBalance = (state) => state.detail.openingBalance;
export const getTaxCodeLabel = (state) =>
  getRegionToDialectText(state.region)('Tax code');
export const getCashFlowClassification = (state) =>
  state.detail.cashFlowClassification;

export const getBankAccountBsb = (state) => state.detail.bankingDetails.bsb;
export const getBankAccountNameNz = (state) =>
  state.detail.bankingDetails.accountNameNz;
export const getBankAccountNameAu = (state) =>
  state.detail.bankingDetails.accountNameAu;
export const getBankAccountNumberAu = (state) =>
  state.detail.bankingDetails.accountNumberAu;
export const getBankAccountNumberNz = (state) =>
  state.detail.bankingDetails.accountNumberNz;
export const getBankCode = (state) => state.detail.bankingDetails.bankCode;
export const getStatementCode = (state) =>
  state.detail.bankingDetails.statementCode;
export const getBankTradingName = (state) =>
  state.detail.bankingDetails.companyTradingName;
export const getCreateABABank = (state) =>
  state.detail.bankingDetails.createABABank;
export const getDirectEntryUserId = (state) =>
  state.detail.bankingDetails.directEntryUserId;
export const getSelfBalancingTransaction = (state) =>
  state.detail.bankingDetails.isSelfBalancingTransaction;
export const getStatementParticulars = (state) =>
  state.detail.bankingDetails.statementParticulars;
export const getStatementReference = (state) =>
  state.detail.bankingDetails.statementReference;

export const getShowCashFlow = (state) =>
  Object.keys(accountTypeToCashFlowClassificationMapping).includes(
    getAccountType(state)
  );

export const getIsAccountNumberDisabled = createSelector(
  getAccountClassification,
  getIsFlexAccount,
  (classification, isFlexAccount) => {
    switch (true) {
      case !isFlexAccount && !classification:
        return true;
      default:
        return false;
    }
  }
);

export const getIsParentHeaderDisabled = createSelector(
  getAccountClassification,
  (accountClassification) => !accountClassification
);

export const getAccountClassificationforDisplay = createSelector(
  getAccountClassification,
  getAccountClassifications,
  (selectedClassification, classifications) =>
    (
      classifications.find(
        (classification) => classification.value === selectedClassification
      ) || { displayName: '-' }
    ).displayName
);

export const getParentAccountsForType = createSelector(
  getHeaderAccounts,
  getAccountClassification,
  (headers, classification) =>
    headers.filter((header) => {
      const isClassification = header.accountClassification === classification;
      return isClassification;
    })
);

export const getShowBankDetails = createSelector(getAccountType, (type) =>
  ['Bank', 'CreditCard'].includes(type)
);

export const getAccountForRequest = createSelector(
  getAccount,
  getShowBankDetails,
  (account, showBankDetails) => {
    if (showBankDetails) {
      return account;
    }
    const { bankingDetails, ...request } = account;
    return request;
  }
);

export const isPageEdited = (state) => state.isPageEdited;

export const getBusinessId = (state) => state.businessId;

export const getRegion = (state) => state.region;

export const getIsOpen = (state) => state.isOpen;

export const getIsSubmitting = (state) => state.isSubmitting;

export const getIsActionDisabled = createSelector(
  getIsSubmitting,
  getIsLoading,
  (isSubmitting, isLoading) => isSubmitting || isLoading
);
