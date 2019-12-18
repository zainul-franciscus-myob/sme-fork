import { createSelector } from 'reselect';

import {
  getBillId, getBusinessId, getIsCreatingFromInTray, getRegion,
} from './billSelectors';

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
