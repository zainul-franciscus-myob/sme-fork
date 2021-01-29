import { createSelector } from 'reselect';

import Config from '../../Config';
import Region from '../../common/types/Region';

export const getBusinessId = (state) => state.businessId;
export const getLoadingState = (state) => state.loadingState;
export const getRegion = (state) => state.region;
export const getSerialNumber = (state) => state.serialNumber;

export const getMoveToMYOBUrl = createSelector(getRegion, (region) =>
  region === Region.au ? Config.MOVE_TO_MYOB_URL_AU : Config.MOVE_TO_MYOB_URL_NZ
);
