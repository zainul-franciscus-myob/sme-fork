import { createSelector } from 'reselect';

import getRegionToDialectText from '../dialect/getRegionToDialectText';

export const getBusinessId = state => state.businessId;
export const getRegion = state => state.region;

export const getLodgeStatementLink = createSelector(
  getBusinessId,
  getRegion,
  (businessId, region) => (
    region.toLowerCase() === 'nz'
      ? 'https://lodge.myob.com/#/dashboard/arl/nz/egst/'
      : `https://lodge.myob.com/#/dashboard/arl/${region}/bas/${businessId}?client=sme-web`
  ),
);

export const getPageHead = createSelector(
  getRegion,
  region => getRegionToDialectText(region)('Prepare BAS or IAS'),
);
