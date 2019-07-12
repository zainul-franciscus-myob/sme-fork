import { createSelector } from 'reselect';

export const getBusinessId = state => state.businessId;
export const getRegion = state => state.region;

export const getLodgeStatementLink = createSelector(
  getBusinessId,
  getRegion,
  (businessId, region) => `https://lodge.myob.com/#/dashboard/arl/${region}/bas/${businessId}?client=sme-web`,
);
