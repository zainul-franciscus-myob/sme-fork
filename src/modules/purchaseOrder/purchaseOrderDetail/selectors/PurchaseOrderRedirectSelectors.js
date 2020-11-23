import { createSelector } from 'reselect';

import { getBusinessId, getRegion } from './purchaseOrderSelectors';

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
