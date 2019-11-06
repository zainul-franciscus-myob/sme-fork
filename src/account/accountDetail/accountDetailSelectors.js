import { createSelector } from 'reselect';

import accountTypeToCashFlowClassificationMapping from './accountTypeToCashFlowClassificationMapping.json';
import getRegionToDialectText from '../../dialect/getRegionToDialectText';

export const getAccountId = state => state.accountId;

export const getIsCreating = state => state.accountId === 'new';

export const getAlertMessage = state => state.alertMessage;

export const getModalType = state => state.modalType;

export const getIsLoading = state => state.isLoading;

export const getIsFlexAccount = state => state.isFlexAccount;

const getAccountKey = state => (state.isHeader ? 'header' : 'detail');
export const getAccount = state => state[getAccountKey(state)];

export const getAccountClassifications = state => state.accountClassifications;
export const getTaxCodes = state => state.taxCodes;
export const getCashFlowClassifications = state => state.cashFlowClassifications;
export const getHeaderAccounts = state => state.headerAccounts;

export const getAccountNumberPrefix = state => state.readonly.accountNumberPrefix;

export const getIsHeader = state => state.isHeader;

export const getAccountClassification = createSelector(
  getAccount,
  account => account.accountClassification,
);
export const getAccountType = state => state.detail.accountType;
export const getAccountNumber = createSelector(
  getAccount,
  account => account.accountNumber,
);
export const getAccountName = createSelector(
  getAccount,
  account => account.accountName,
);

export const getNotes = createSelector(
  getAccount,
  account => account.notes,
);
export const getParentAccount = createSelector(
  getAccount,
  account => account.parentAccountId,
);
export const getLevel = createSelector(
  getAccount,
  account => account.level,
);

export const getIsSubtotalReportable = state => state.header.isSubtotalReportable;

export const getTaxCodeId = state => state.detail.taxCodeId;
export const getOpeningBalance = state => state.detail.openingBalance;
export const getTaxCodeLabel = state => getRegionToDialectText(state.region)('Tax code');
export const getCashFlowClassification = state => state.detail.cashFlowClassification;
export const getIsActive = state => state.detail.isActive;
export const getBankAccountBsb = state => state.detail.bankingDetails.bsb;
export const getBankAccountNameNz = state => state.detail.bankingDetails.accountNameNz;
export const getBankAccountNameAu = state => state.detail.bankingDetails.accountNameAu;
export const getBankAccountNumberAu = state => state.detail.bankingDetails.accountNumberAu;
export const getBankAccountNumberNz = state => state.detail.bankingDetails.accountNumberNz;
export const getBankCode = state => state.detail.bankingDetails.bankCode;
export const getStatementCode = state => state.detail.bankingDetails.statementCode;
export const getBankTradingName = state => state.detail.bankingDetails.companyTradingName;
export const getCreateABABank = state => state.detail.bankingDetails.createABABank;
export const getDirectEntryUserId = state => state.detail.bankingDetails.directEntryUserId;
export const getSelfBalancingTransaction = state => state
  .detail.bankingDetails.isSelfBalancingTransaction;
export const getStatementParticulars = state => state.detail.bankingDetails.statementParticulars;
export const getStatementReference = state => state.detail.bankingDetails.statementReference;

export const getCurrentBalance = state => state.readonly.currentBalance;
export const getLinkedAccounts = state => state.readonly.linkedAccount;
export const getLinkedAccountsForDisplay = state => state.readonly.linkedAccount || '-';

export const getIsClassificationHeaderAccount = createSelector(
  getIsHeader,
  getLevel,
  (isHeader, level) => isHeader && level === 1,
);

export const getIsReadOnlyHeaderAccountType = createSelector(
  getIsCreating,
  isCreating => !isCreating,
);

export const getIsParentHeaderDisabled = createSelector(
  getAccountClassification,
  getIsClassificationHeaderAccount,
  (accountClassification, isClassificationHeader) => !accountClassification
  || isClassificationHeader,
);

export const getIsAccountCategoryDisabled = createSelector(
  getLinkedAccounts,
  getIsClassificationHeaderAccount,
  (linkedAccounts, isClassificationHeader) => !!linkedAccounts || isClassificationHeader,
);

export const getShowCashFlow = state => Object
  .keys(accountTypeToCashFlowClassificationMapping).includes(
    getAccountType(state),
  );

export const getIsAccountNumberDisabled = createSelector(
  getAccountClassification,
  getIsFlexAccount,
  getIsClassificationHeaderAccount,
  (classification, isFlexAccount, isClassificationHeader) => {
    switch (true) {
      case isClassificationHeader:
      case !isFlexAccount && !classification:
        return true;
      default:
        return false;
    }
  },
);

export const getAccountClassificationforDisplay = createSelector(
  getAccountClassification,
  getAccountClassifications,
  (selectedClassification, classifications) => (
    classifications.find(
      classification => classification.value === selectedClassification,
    ) || { displayName: '-' }
  ).displayName,
);
export const getShowReadOnlyAccountType = createSelector(
  getIsCreating,
  getAccountClassification,
  (isCreating, classification) => !isCreating && !['Asset', 'Liability'].includes(classification),
);
export const getAccountTypeforDisplay = createSelector(
  getAccountType,
  getAccountClassifications,
  (selecteAccountType, classifications) => {
    const currentClassification = classifications.find(
      classification => classification.value === selecteAccountType
          || (classification.type
            && classification.type.some(type => type.value === selecteAccountType)),
    ) || {};
    const currentType = currentClassification.type
      ? currentClassification.type.find(
        type => type.value === selecteAccountType,
      )
      : currentClassification;
    return currentType.displayName || '-';
  },
);

export const getParentAccountsForType = createSelector(
  getHeaderAccounts,
  getIsHeader,
  getAccountClassification,
  getAccountId,
  (headers, isHeader, classification, id) => headers.filter((header) => {
    const isClassification = header.accountClassification === classification;
    const isCorrectLevel = isHeader ? header.level < 3 : header.level < 4;
    const isCurrentAccount = header.id === id;
    return !isCurrentAccount && isCorrectLevel && isClassification;
  }),
);

export const getShowBankDetails = createSelector(
  getAccountType,
  type => ['Bank', 'CreditCard'].includes(type),
);

export const getAccountClassificationsForDetail = createSelector(
  getIsCreating,
  getAccountClassifications,
  getAccountClassification,
  (isCreating, classifications, accountClassification) => {
    if (isCreating) {
      return classifications;
    }
    return classifications.filter(
      classification => classification.value === accountClassification,
    );
  },
);

export const getIsActionsDisabled = state => state.isSubmitting;

export const isPageEdited = state => state.isPageEdited;

export const getBusinessId = state => state.businessId;

export const getRegion = state => state.region;
