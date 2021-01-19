import { createSelector } from 'reselect';

export const getRegion = (state) => state.region;

export const getBusinessId = (state) => state.businessId;

export const getIsOpen = (state) => state.isOpen;

export const getEmail = (state) => state.email;

export const getIsConfirmingEmailGeneration = (state) =>
  state.isConfirmingEmailGeneration;

export const getIsUploadOptionsLoading = (state) =>
  state.isUploadOptionsLoading;

export const getUploadOptionsAlert = (state) => state.uploadOptionsAlert;

export const getAppStoreLink = createSelector(
  getRegion,
  (region) => `https://apps.apple.com/${region}/app/myob-capture/id1442167388`
);

export const getGooglePlayLink =
  'https://play.google.com/store/apps/details?id=com.myob.snap';

export const getSuppliersWikiLink =
  'https://help.myob.com/wiki/display/myob/Automating+supplier+invoices';
