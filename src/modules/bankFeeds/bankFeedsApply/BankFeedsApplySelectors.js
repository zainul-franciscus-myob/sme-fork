import { createSelector } from 'reselect';

export const getAccountName = state => state.accountName;
export const getAccountNameRequired = state => state.accountNameRequired;
export const getAccountNumber = state => state.accountNumber;
export const getAccountNumberRequired = state => state.accountNumberRequired;
export const getAccountSuffix = state => state.accountSuffix;
export const getAccountSuffixRequired = state => state.accountSuffixRequired;
export const getAccountType = state => state.accountType;
export const getAccountTypeRequired = state => state.accountTypeRequired;
export const getApplicationPreference = state => state.applicationPreference;
export const getBankAccounts = state => state.financialInstitutions.bankAccounts;
export const getBankFeedLoadEmail = state => state.bankFeedLoadEmail;
export const getBranchName = state => state.branchName;
export const getBranchNameRequired = state => state.branchNameRequired;
export const getBsb = state => state.bsb;
export const getBsbBank = state => state.bsbBank;
export const getBsbBankRequired = state => state.bsbBankRequired;
export const getBsbBranch = state => state.bsbBranch;
export const getBsbBranchRequired = state => state.bsbBranchRequired;
export const getBsbRequired = state => state.bsbRequired;
export const getCopyAlertState = state => state.copyAlertState;
export const getCopyAlertText = state => state.copyAlertText;
export const getBusinessId = state => state.businessId;
export const getConfirmedApplication = state => state.confirmedApplication;
export const getCreditCardAccounts = state => state.financialInstitutions.creditCards;
export const getFinancialInstitution = state => state.financialInstitution;
export const getFormAlertState = state => state.formAlertState;
export const getHasOnlineApplication = state => state.hasOnlineApplication;
export const getHasPaperApplication = state => state.hasPaperApplication;
export const getIsModalOpen = state => state.isModalOpen;
export const getLastFourDigits = state => state.lastFourDigits;
export const getLastFourDigitsRequired = state => state.lastFourDigitsRequired;
export const getLoadingState = state => state.loadingState;
export const getNameOnCard = state => state.nameOnCard;
export const getNameOnCardRequired = state => state.nameOnCardRequired;
export const getNotes = state => state.notes;
export const getOnlineBankLink = state => state.links;
export const getReferenceNumber = state => state.referenceNumber;
export const getRegion = state => state.region;
export const getShouldDisplayConnectForm = state => state.shouldDisplayConnectForm;
export const getUserEmail = state => state.userEmail;
export const getIsCreditCard = state => getAccountType(state) === 'Credit card account';
export const getIsBankAccount = state => getAccountType(state) === 'Trading Account';
const websiteLink = createSelector(
  getRegion,
  region => `https://www.myob.com/${region}`,
);
export const getTermsOfUseLink = createSelector(
  websiteLink,
  basePath => `${basePath}/support/customer-service/myob-legal-notices/EssentialsTermsofUse`,
);
export const getPCIDSSLink = createSelector(
  websiteLink,
  basePath => `${basePath}/blog/hell-pci-dss-compliance-important/`,
);

export const getSubmitApplicationBody = (state) => {
  const finIns = getFinancialInstitution(state);
  const applicationPreference = getApplicationPreference(state);

  const getOptional = (getRequired, getValue) => (getRequired(state) ? getValue(state) : undefined);

  const bankAccount = getOptional(getIsBankAccount, () => ({
    accountName: getOptional(getAccountNameRequired, getAccountName),
    bankName: finIns.code,
    branchName: getOptional(getBranchNameRequired, getBranchName),
    BSB: getOptional(getBsbRequired, getBsb),
    BSBBank: getOptional(getBsbBankRequired, getBsbBank),
    BSBBranch: getOptional(getBsbBranchRequired, getBsbBranch),
    accountNumber: getOptional(getAccountNumberRequired, getAccountNumber),
    accountType: getOptional(getAccountTypeRequired, getAccountType),
    accountSuffix: getOptional(getAccountSuffixRequired, getAccountSuffix),
  }));

  const creditCard = getOptional(getIsCreditCard, () => ({
    branchName: getOptional(getBranchNameRequired, getBranchName),
    nameOnCard: getOptional(getNameOnCardRequired, getNameOnCard),
    lastFourDigits: getOptional(getLastFourDigitsRequired, getLastFourDigits),
  }));

  return {
    financialInstitutionId: finIns.id,
    completeOnline: applicationPreference === 'online',
    completeTrusted: false,
    bankAccount,
    creditCard,
  };
};
