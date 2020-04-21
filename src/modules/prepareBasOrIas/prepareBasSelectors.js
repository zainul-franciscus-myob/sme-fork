import { createSelector } from 'reselect';

export const getBusinessId = state => state.businessId;
export const getRegion = state => state.region;

const pathMapping = {
  au: 'bas',
  nz: 'egst',
};

export const getLodgeStatementLink = createSelector(
  getBusinessId,
  getRegion,
  (businessId, region) => `https://lodge.myob.com/#/dashboard/arl/${region}/${pathMapping[region.toLowerCase()]}/${businessId}?client=sme-web`,
);
