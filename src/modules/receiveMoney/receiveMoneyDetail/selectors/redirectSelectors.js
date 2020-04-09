import { createSelector } from 'reselect';

import {
  getBusinessId,
  getDuplicateReceiveMoneyIdQueryParam,
  getIsCreating,
  getModalUrl,
  getReceiveMoneyId,
  getRegion,
} from './receiveMoneyDetailSelectors';

export const getTransactionListUrl = createSelector(
  getBusinessId,
  getRegion,
  (businessId, region) => `/#/${region}/${businessId}/transactionList`,
);

export const getDuplicateReceiveMoneyUrl = (state) => {
  const businessId = getBusinessId(state);
  const region = getRegion(state);
  const id = getReceiveMoneyId(state);

  return `/#/${region}/${businessId}/receiveMoney/new?duplicateReceiveMoneyId=${id}`;
};

export const getCreateReceiveMoneyUrl = (state) => {
  const businessId = getBusinessId(state);
  const region = getRegion(state);

  return `/#/${region}/${businessId}/receiveMoney/new`;
};

export const getShouldReload = (state) => {
  const isCreating = getIsCreating(state);
  const duplicateReceiveMoneyId = getDuplicateReceiveMoneyIdQueryParam(state);

  return isCreating && !duplicateReceiveMoneyId;
};

export const getSaveUrl = (state) => {
  const modalUrl = getModalUrl(state);
  const transactionListUrl = getTransactionListUrl(state);
  return modalUrl || transactionListUrl;
};
