import { createSelector } from 'reselect';

import Config from '../../../Config';
import getQueryFromParams from '../../../common/getQueryFromParams/getQueryFromParams';

export const getAlert = (state) => state.alert;
export const getModalType = (state) => state.modalType;
export const getLoadingState = (state) => state.loadingState;
export const getIsSubmitting = (state) => state.isSubmitting;

export const getBusinessId = (state) => state.businessId;
export const getRegion = (state) => state.region;
export const getSerialNumber = (state) => state.serialNumber;

export const getBankFeedsLoginDetails = (state) => state.loginDetails;
export const getIsTableLoading = (state) => state.isTableLoading;

export const getIsActionDisabled = createSelector(
  getIsTableLoading,
  getIsSubmitting,
  (isTableLoading, isSubmitting) => isSubmitting || isTableLoading
);

export const getBankFeedsUrlParams = (state) => ({
  businessId: getBusinessId(state),
});

const getBankFeedAccountToBeDeleted = (state) => state.accountToBeDeleted;
export const getDeleteBankFeedUrlParams = createSelector(
  getBusinessId,
  getBankFeedAccountToBeDeleted,
  (businessId, accountToBeDeleted) => ({
    businessId,
    id: accountToBeDeleted.id,
  })
);

const getBankFeedAccountDetailForPayload = (account) => ({
  id: account.id,
  linkedAccountId: account.linkedAccountId,
});
const getBankFeedAccountsWithLinkedAccount = (accounts) =>
  accounts
    .filter((account) => account.linkedAccountId !== '')
    .map(getBankFeedAccountDetailForPayload);
export const getSaveBankFeedsPayload = (state) => {
  const bankAccountsPayload = getBankFeedAccountsWithLinkedAccount(
    state.bankFeeds.bankAccounts
  );
  const creditCardsPayload = getBankFeedAccountsWithLinkedAccount(
    state.bankFeeds.creditCards
  );

  return bankAccountsPayload.concat(creditCardsPayload);
};
export const getIsBankFeedsEmpty = (state) =>
  state.bankFeeds.bankAccounts.length === 0 &&
  state.bankFeeds.creditCards.length === 0;

export const getBankFeedsBankAccounts = (state) => state.bankFeeds.bankAccounts;
export const getIsBankAccountsEmpty = (state) =>
  state.bankFeeds.bankAccounts.length === 0;

export const getBankFeedsCreditCards = (state) => state.bankFeeds.creditCards;
export const getIsCreditCardsEmpty = (state) =>
  state.bankFeeds.creditCards.length === 0;

const getBankFeedsAction = (state) =>
  getIsBankFeedsEmpty(state) ? 'app' : 'admin';
export const getNewBankFeedsAccess = (state) => state.accessToNewBankFeeds;

export const getMyDotBankFeedsUrl = createSelector(
  getRegion,
  getBusinessId,
  getSerialNumber,
  getBankFeedsAction,
  (region, businessId, serialNumber, bankFeedsAction) => {
    const baseUrl = Config.MANAGE_BANK_FEEDS_BASE_URL;
    const queryParams = getQueryFromParams({
      SerialNumber: serialNumber,
      CdfId: businessId,
      Action: bankFeedsAction,
    });

    return `${baseUrl}${queryParams}`;
  }
);

export const getSmeBankFeedUrl = createSelector(
  getRegion,
  getBusinessId,
  (region, businessId) => `/#/${region}/${businessId}/bankFeeds/create`
);

export const getCreateBankFeedsUrl = createSelector(
  getNewBankFeedsAccess,
  getSmeBankFeedUrl,
  getMyDotBankFeedsUrl,
  getBusinessId,
  (hasAccess, smeUrl, myDotUrl, businessId) =>
    hasAccess && businessId === '3aa68c87-7256-4ad6-bb4c-a43ab196636c'
      ? smeUrl
      : myDotUrl
);
