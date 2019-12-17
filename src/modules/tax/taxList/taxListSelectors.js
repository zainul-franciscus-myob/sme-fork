import { createSelector } from 'reselect';

import getRegionToDialectText from '../../../dialect/getRegionToDialectText';

export const getBusinessId = state => state.businessId;

export const getTableEntries = state => state.entries;

export const getIsLoading = state => state.isLoading;

const getRegion = state => state.region;

export const getTableHeaderTexts = createSelector(
  getRegion,
  (region) => {
    const getText = getRegionToDialectText(region);

    return {
      taxCode: getText('Tax code'),
      collectedAccountName: `Account for ${getText('tax collected')}`,
      paidAccountName: `Account for ${getText('tax paid')}`,
    };
  },
);

export const getPageHead = createSelector(
  getRegion,
  region => getRegionToDialectText(region)('Tax codes'),
);
