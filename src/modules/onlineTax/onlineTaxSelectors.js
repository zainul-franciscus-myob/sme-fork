import { createSelector } from 'reselect';

import Config from '../../Config';

export const getBusinessId = (state) => state.businessId;
export const getRegion = (state) => state.region;
export const getIsRegisteredForGst = (state) => state.isRegisteredForGst;
export const getIsCustomizedForNonGstEnabled = (state) =>
  state.isCustomizedForNonGstEnabled;
export const getLoadingState = (state) => state.loadingState;

const pathMapping = {
  au: 'bas',
  nz: 'egst',
};

export const getLodgeStatementLink = createSelector(
  getBusinessId,
  getRegion,
  (businessId, region) =>
    `${Config.ONLINE_TAX_BASE_URL}/#/dashboard/arl/${region}/${
      pathMapping[region.toLowerCase()]
    }/${businessId}`
);

export const getAUTitleAndStatement = createSelector(
  getIsRegisteredForGst,
  getIsCustomizedForNonGstEnabled,
  (isRegisteredForGst, isCustomizedForNonGstEnabled) =>
    isCustomizedForNonGstEnabled && !isRegisteredForGst
      ? {
          statement: 'Instalment Activity Statement (IAS)',
          title: 'Prepare IAS',
        }
      : {
          statement: 'activity statement (BAS or IAS)',
          title: 'Prepare BAS or IAS',
        }
);
