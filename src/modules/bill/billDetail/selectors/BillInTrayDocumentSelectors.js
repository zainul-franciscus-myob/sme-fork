import { createSelector } from 'reselect';

import {
  getBusinessId,
  getIsCreating,
  getIsPreConversion,
  getIsReadOnly,
  getRegion,
} from './billSelectors';

export const getInTrayDocument = (state) =>
  state.inTrayDocument || {
    thumbnailUrl: '',
    uploadedDate: '',
  };

export const getInTrayDocumentId = (state) => state.inTrayDocumentId;

export const getAttachmentId = (state) => state.attachmentId;

export const getInTrayDocumentUrl = (state) => state.inTrayDocumentUrl;

export const getPrefillStatus = (state) => state.prefillStatus;

export const getShowPrefillInfo = (state) => state.showPrefillInfo;

export const getIsDocumentLoading = (state) => state.isDocumentLoading;

export const getHasInTrayDocumentId = (state) =>
  Boolean(state.inTrayDocumentId || state.attachmentId);

export const getHasInTrayDocumentUrl = (state) =>
  Boolean(state.inTrayDocumentUrl);

export const getShowSplitView = (state) => state.showSplitView;

export const getInTrayModalContext = createSelector(
  getBusinessId,
  getRegion,
  (businessId, region) => ({ businessId, region })
);

export const getShouldLinkInTrayDocument = createSelector(
  getIsCreating,
  getIsPreConversion,
  getHasInTrayDocumentId,
  (isCreating, isPreConversion, hasInTrayDocumentId) =>
    isCreating && !isPreConversion && hasInTrayDocumentId
);

export const getShouldShowInTrayDocument = createSelector(
  getIsReadOnly,
  getIsPreConversion,
  getHasInTrayDocumentId,
  (isReadOnly, isPreConversion, hasInTrayDocumentId) =>
    !isPreConversion && (!isReadOnly || (isReadOnly && hasInTrayDocumentId))
);
