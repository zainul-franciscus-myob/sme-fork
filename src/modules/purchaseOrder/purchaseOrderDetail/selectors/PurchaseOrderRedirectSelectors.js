import { createSelector } from 'reselect';

import {
  getBusinessId,
  getPurchaseOrderId,
  getRegion,
} from './purchaseOrderSelectors';

export const getPurchaseOrderListUrl = createSelector(
  getRegion,
  getBusinessId,
  (region, businessId) => `/#/${region}/${businessId}/purchaseOrder`
);

export const getCreateNewPurchaseOrderUrl = createSelector(
  getRegion,
  getBusinessId,
  (region, businessId) => `/#/${region}/${businessId}/purchaseOrder/new`
);

const getBaseUrl = createSelector(
  getRegion,
  getBusinessId,
  (region, businessId) => `/#/${region}/${businessId}`
);

export const getCreateBillFromOrderUrl = createSelector(
  getBaseUrl,
  getPurchaseOrderId,
  (baseUrl, orderId) => `${baseUrl}/bill/new?orderId=${orderId}`
);

export const getPurchasesSettingsUrl = (state) => {
  const baseUrl = getBaseUrl(state);

  return `${baseUrl}/purchasesSettings`;
};
