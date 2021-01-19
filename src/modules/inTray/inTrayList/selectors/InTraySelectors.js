import { createSelector } from 'reselect';

import { getEmail } from './UploadOptionsSelectors';

export const getLoadingState = (state) => state.loadingState;

export const getBusinessId = (state) => state.businessId;

export const getRegion = (state) => state.region;

export const getAlert = (state) => state.alert;

export const getDeleteModal = (state) => state.deleteModal;

export const getDocumentViewerUrl = (state) => state.documentViewerUrl;

export const getIsUploadPopoverOpen = (state) => state.isUploadPopoverOpen;

export const getInTrayUploadOptionsModalContext = createSelector(
  getBusinessId,
  getRegion,
  getEmail,
  (businessId, region, email) => ({ businessId, region, email })
);
