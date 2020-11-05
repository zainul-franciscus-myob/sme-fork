import { createSelector } from 'reselect';

import {
  getAmountDue,
  getBillId,
  getBusinessId,
  getRegion,
  getSupplierId,
} from './billSelectors';
import getQueryFromParams from '../../../../common/getQueryFromParams/getQueryFromParams';

export const getBillListUrl = createSelector(
  getRegion,
  getBusinessId,
  (region, businessId) => `/#/${region}/${businessId}/bill`
);

export const getInTrayUrl = createSelector(
  getRegion,
  getBusinessId,
  (region, businessId) => `/#/${region}/${businessId}/inTray`
);

export const getCreateNewBillUrl = createSelector(
  getRegion,
  getBusinessId,
  (region, businessId) => `/#/${region}/${businessId}/bill/new`
);

const getBaseUrl = (state) => {
  const businessId = getBusinessId(state);
  const region = getRegion(state);

  return `/#/${region}/${businessId}`;
};

const isNegativeAmount = (amount) => amount[0] === '-';

export const getBillPaymentUrl = (state) => {
  const baseUrl = getBaseUrl(state);
  const amountDue = getAmountDue(state);
  const redirectParams = {
    supplierId: getSupplierId(state),
    paymentAmount: isNegativeAmount(amountDue) ? amountDue.slice(1) : amountDue,
    applyPaymentToBillId: getBillId(state),
  };

  const urlParams = getQueryFromParams(redirectParams);

  return `${baseUrl}/billPayment/new${urlParams}`;
};

export const getSupplierLink = createSelector(
  getBusinessId,
  getRegion,
  getSupplierId,
  (businessId, region, supplierId) =>
    `/#/${region}/${businessId}/contact/${supplierId}`
);
