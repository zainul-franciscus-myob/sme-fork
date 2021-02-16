import { createSelector } from 'reselect';

export const getBusinessId = (state) => state.businessId;
export const getRegion = (state) => state.region;
export const getSerialNumber = (state) => state.serialNumber;
export const getNewBankFeedsAccess = (state) => state.accessToNewBankFeeds;

export const getCreateBankFeedsUrl = createSelector(
  getRegion,
  getBusinessId,
  (region, businessId) => {
    return `#/${region}/${businessId}/bankFeeds/create`;
  }
);
