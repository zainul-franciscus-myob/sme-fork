import { createSelector } from 'reselect';

import getRegionToDialectText from '../../../dialect/getRegionToDialectText';

const getRegion = (state) => state.region;
export const getBusinessId = (state) => state.businessId;

export const getIsTaxDetailEnabled = (state) => state.isTaxDetailEnabled;

const getTaxDetailUrl = (state, id) => {
  const region = getRegion(state);
  const businessId = getBusinessId(state);
  return `/#/${region}/${businessId}/tax/${id}`;
};

export const getTableEntries = (state) =>
  state.entries.map((entry) => ({
    ...entry,
    link: getTaxDetailUrl(state, entry.id),
  }));

export const getLoadingState = (state) => state.loadingState;

export const getTableHeaderTexts = createSelector(getRegion, (region) => {
  const getText = getRegionToDialectText(region);

  return {
    taxCode: getText('Tax code'),
    collectedAccountName: `Account for ${getText('tax collected')}`,
    paidAccountName: `Account for ${getText('tax paid')}`,
  };
});

export const getPageHead = createSelector(getRegion, (region) =>
  getRegionToDialectText(region)('Tax codes')
);
