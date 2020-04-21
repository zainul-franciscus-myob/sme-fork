import { createSelector } from 'reselect';

import {
  getBusinessId,
  getModalUrl,
  getRegion,
} from './receiveMoneyDetailSelectors';

export const getTransactionListUrl = createSelector(
  getBusinessId,
  getRegion,
  (businessId, region) => `/#/${region}/${businessId}/transactionList`,
);

export const getCreateReceiveMoneyUrl = (state) => {
  const businessId = getBusinessId(state);
  const region = getRegion(state);

  return `/#/${region}/${businessId}/receiveMoney/new`;
};

export const getSaveUrl = (state) => {
  const modalUrl = getModalUrl(state);
  const transactionListUrl = getTransactionListUrl(state);
  return modalUrl || transactionListUrl;
};
