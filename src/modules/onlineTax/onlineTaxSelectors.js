import { createSelector } from 'reselect';

import Config from '../../Config';

export const getBusinessId = state => state.businessId;
export const getRegion = state => state.region;

const pathMapping = {
  au: 'bas',
  nz: 'egst',
};

export const getLodgeStatementLink = createSelector(
  getBusinessId,
  getRegion,
  (businessId, region) => `${Config.ONLINE_TAX_BASE_URL}/#/dashboard/arl/${region}/${pathMapping[region.toLowerCase()]}/${businessId}`,
);
