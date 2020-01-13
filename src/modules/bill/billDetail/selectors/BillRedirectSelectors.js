import { createSelector } from 'reselect';

import {
  getAmountDue,
  getBillId,
  getBusinessId,
  getIsCreatingFromInTray,
  getRegion,
  getSupplierId,
} from './billSelectors';
import getQueryFromParams from '../../../../common/getQueryFromParams/getQueryFromParams';

export const getFinalRedirectUrl = createSelector(
  getIsCreatingFromInTray,
  getBusinessId,
  getRegion,
  (isCreatingFromInTray, businessId, region) => {
    const inTrayUrl = `/#/${region}/${businessId}/inTray`;
    const billListUrl = `/#/${region}/${businessId}/bill`;

    if (isCreatingFromInTray) {
      return inTrayUrl;
    }
    return billListUrl;
  },
);

export const getCreateNewBillUrl = createSelector(
  getRegion,
  getBusinessId,
  (region, businessId) => `/#/${region}/${businessId}/bill/new`,
);

export const getDuplicateBillUrl = createSelector(
  getRegion,
  getBusinessId,
  getBillId,
  (region, businessId, billId) => `/#/${region}/${businessId}/bill/new?duplicatedBillId=${billId}`,
);

export const getReadBillWithExportPdfModalUrl = (state) => {
  const businessId = getBusinessId(state);
  const region = getRegion(state);
  const billId = getBillId(state);

  return `/#/${region}/${businessId}/bill/${billId}?openExportPdf=true`;
};

const getBaseUrl = (state) => {
  const businessId = getBusinessId(state);
  const region = getRegion(state);

  return `/#/${region}/${businessId}`;
};

export const getSubscriptionSettingsUrl = (state) => {
  const baseUrl = getBaseUrl(state);

  return `${baseUrl}/settings/subscription`;
};

export const getBillListUrl = (state) => {
  const baseUrl = getBaseUrl(state);

  return `${baseUrl}/bill`;
};

const isNegativeAmount = amount => amount[0] === '-' && amount[1] === '$';

const removeDollarSign = (amount) => {
  if (amount.length > 0) {
    if (isNegativeAmount(amount)) {
      return amount.slice(2);
    }
    if (amount[0] === '$') {
      return amount.slice(1);
    }
  }
  return amount;
};

export const getBillPaymentUrl = (state) => {
  const baseUrl = getBaseUrl(state);
  const amountDue = getAmountDue(state);
  const formattedAmountDue = removeDollarSign(amountDue);

  const redirectParams = {
    supplierId: getSupplierId(state),
    paymentAmount: formattedAmountDue,
    applyPaymentToBillId: getBillId(state),
  };

  const urlParams = getQueryFromParams(redirectParams);

  return `${baseUrl}/billPayment/new${urlParams}`;
};
