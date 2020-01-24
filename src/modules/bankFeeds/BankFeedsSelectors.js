import { createSelector } from 'reselect';

import Config from '../../Config';
import getQueryFromParams from '../../common/getQueryFromParams/getQueryFromParams';

export const getAlert = state => state.alert;
export const getModalType = state => state.modalType;
export const getLoadingState = state => state.loadingState;
export const getIsSubmitting = state => state.isSubmitting;

export const getBusinessId = state => state.businessId;
export const getRegion = state => state.region;
export const getSerialNumber = state => state.serialNumber;

export const getBankFeedsLoginDetails = state => state.loginDetails;
export const getIsTableLoading = state => state.isTableLoading;

export const getBankFeedsBankAccounts = state => state.bankFeeds.bankAccounts;
export const getBankFeedsCreditCards = state => state.bankFeeds.creditCards;

export const getNotImportedBankAccounts = createSelector(
  getBankFeedsBankAccounts,
  bankAccounts => bankAccounts.filter(account => !account.isCreatedFromImport),
);
export const getNotImportedCreditCards = createSelector(
  getBankFeedsCreditCards,
  creditCards => creditCards.filter(creditCard => !creditCard.isCreatedFromImport),
);

export const getIsActionDisabled = createSelector(
  getIsTableLoading,
  getIsSubmitting,
  (isTableLoading, isSubmitting) => isSubmitting || isTableLoading,
);

export const getBankFeedsUrlParams = state => ({
  businessId: getBusinessId(state),
});

const getBankFeedAccountToBeDeleted = state => state.accountToBeDeleted;
export const getDeleteBankFeedUrlParams = createSelector(
  getBusinessId,
  getBankFeedAccountToBeDeleted,
  (businessId, accountToBeDeleted) => ({
    businessId,
    id: accountToBeDeleted.id,
  }),
);

const getBankFeedAccountDetailForPayload = account => ({
  id: account.id,
  linkedAccountId: account.linkedAccountId,
});
const getBankFeedAccountsWithLinkedAccount = accounts => (
  accounts.filter(account => account.linkedAccountId !== '')
    .map(getBankFeedAccountDetailForPayload)
);
export const getSaveBankFeedsPayload = (state) => {
  const bankAccountsPayload = getBankFeedAccountsWithLinkedAccount(
    getBankFeedsBankAccounts(state),
  );
  const creditCardsPayload = getBankFeedAccountsWithLinkedAccount(
    getBankFeedsCreditCards(state),
  );

  return bankAccountsPayload.concat(creditCardsPayload);
};
export const getIsBankAccountsEmpty = createSelector(
  getNotImportedBankAccounts,
  bankAccounts => bankAccounts.length === 0,
);
export const getIsCreditCardsEmpty = createSelector(
  getNotImportedCreditCards,
  creditCards => creditCards.length === 0,
);
export const getIsBankFeedsEmpty = createSelector(
  getIsBankAccountsEmpty,
  getIsCreditCardsEmpty,
  (isBankAccountsEmpty, isCreditCardsEmpty) => isBankAccountsEmpty && isCreditCardsEmpty,
);

const getBankFeedsAction = state => (getIsBankFeedsEmpty(state) ? 'app' : 'admin');
export const getCreateBankFeedsUrl = createSelector(
  getBusinessId,
  getSerialNumber,
  getBankFeedsAction,
  (businessId, serialNumber, bankFeedsAction) => {
    const baseUrl = Config.MANAGE_BANK_FEEDS_BASE_URL;
    const queryParams = getQueryFromParams({
      SerialNumber: serialNumber,
      CdfId: businessId,
      Action: bankFeedsAction,
    });
    return `${baseUrl}${queryParams}`;
  },
);

export const getLearnMoreBankFeedsLink = createSelector(
  getBusinessId,
  getRegion,
  (businessId, region) => `/#/${region}/${businessId}/banking`,
);
