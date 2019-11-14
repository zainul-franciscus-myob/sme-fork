import { createSelector } from 'reselect';

import getRegionToDialectText from '../dialect/getRegionToDialectText';

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

export const getPageHead = createSelector(
  getRegion,
  region => getRegionToDialectText(region)('Prepare BAS or IAS'),
);
