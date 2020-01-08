import { createSelector } from 'reselect';

import Config from '../../Config';

export const getAlert = state => state.alert;
export const getModalType = state => state.modalType;
export const getIsLoading = state => state.isLoading;
const getIsSubmitting = state => state.isSubmitting;

export const getBusinessId = state => state.businessId;
export const getRegion = state => state.region;
export const getSerialNumber = state => state.serialNumber;

export const getBankFeedsLoginDetails = state => state.loginDetails;
export const getIsTableLoading = state => state.isTableLoading;

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
    state.bankFeeds.bankAccounts,
  );
  const creditCardsPayload = getBankFeedAccountsWithLinkedAccount(
    state.bankFeeds.creditCards,
  );

  return bankAccountsPayload.concat(creditCardsPayload);
};
export const getIsBankFeedsEmpty = state => (
  state.bankFeeds.bankAccounts.length === 0
  && state.bankFeeds.creditCards.length === 0
);

export const getBankFeedsBankAccounts = state => state.bankFeeds.bankAccounts;
export const getIsBankAccountsEmpty = state => (
  state.bankFeeds.bankAccounts.length === 0
);

export const getBankFeedsCreditCards = state => state.bankFeeds.creditCards;
export const getIsCreditCardsEmpty = state => (
  state.bankFeeds.creditCards.length === 0
);

const getQueryFromParams = (params = {}) => {
  const encode = encodeURIComponent;
  const query = Object.keys(params)
    .map(key => `${encode(key)}=${encode(params[key])}`)
    .join('&');
  return `?${query}`;
};

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
