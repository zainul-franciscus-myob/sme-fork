import { createSelector } from 'reselect';

import Config from '../../../Config';
import getQueryFromParams from '../../../common/getQueryFromParams/getQueryFromParams';

export const getBusinessId = (state) => state.businessId;
export const getRegion = (state) => state.region;
export const getSerialNumber = (state) => state.serialNumber;
export const getNewBankFeedsAccess = (state) => state.accessToNewBankFeeds;

export const getCreateBankFeedsUrl = createSelector(
  getRegion,
  getBusinessId,
  getSerialNumber,
  getNewBankFeedsAccess,
  (region, businessId, serialNumber, accessToNewBankFeeds) => {
    const baseUrl = Config.MANAGE_BANK_FEEDS_BASE_URL;
    const queryParams = getQueryFromParams({
      SerialNumber: serialNumber,
      CdfId: businessId,
      Action: 'app',
    });
    return accessToNewBankFeeds
      ? `#/${region}/${businessId}/bankFeeds/create`
      : `${baseUrl}${queryParams}`;
  }
);
