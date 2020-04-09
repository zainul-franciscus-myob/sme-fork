import { LOAD_DUPLICATE_RECEIVE_MONEY, LOAD_NEW_RECEIVE_MONEY, LOAD_RECEIVE_MONEY_DETAIL } from '../../ReceiveMoneyIntents';
import {
  getBusinessId,
  getDuplicateReceiveMoneyIdQueryParam,
  getIsCreating,
  getReceiveMoney,
} from './receiveMoneyDetailSelectors';

export const getLoadReceiveMoneyIntent = (state) => {
  const isCreating = getIsCreating(state);

  if (isCreating) {
    const duplicateReceiveMoneyId = getDuplicateReceiveMoneyIdQueryParam(state);
    if (duplicateReceiveMoneyId) {
      return LOAD_DUPLICATE_RECEIVE_MONEY;
    }

    return LOAD_NEW_RECEIVE_MONEY;
  }

  return LOAD_RECEIVE_MONEY_DETAIL;
};

export const getLoadAddedAccountUrlParams = (state, accountId) => {
  const businessId = getBusinessId(state);

  return { businessId, accountId };
};

export const getLoadAddedContactUrlParams = (state, contactId) => {
  const businessId = getBusinessId(state);

  return { businessId, contactId };
};

export const getReceiveMoneyForCreatePayload = (state) => {
  const {
    referenceId,
    originalReferenceId,
    ...rest
  } = getReceiveMoney(state);

  const referenceIdForPayload = referenceId === originalReferenceId ? undefined : referenceId;

  return {
    ...rest,
    referenceId: referenceIdForPayload,
  };
};

export const getReceiveMoneyForUpdatePayload = (state) => {
  const {
    originalReferenceId,
    ...rest
  } = getReceiveMoney(state);

  return rest;
};

export const getUrlParams = (state) => {
  const businessId = getBusinessId(state);
  const isCreating = getIsCreating(state);
  const receiveMoneyId = isCreating ? undefined : state.receiveMoneyId;
  const duplicateReceiveMoneyId = isCreating
    ? getDuplicateReceiveMoneyIdQueryParam(state)
    : undefined;

  return {
    businessId,
    receiveMoneyId,
    duplicateReceiveMoneyId,
  };
};
