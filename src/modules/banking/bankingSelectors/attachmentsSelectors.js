import { createSelector } from 'reselect';

import { getBusinessId, getOpenTransactionLine, getRegion } from './index';

export const getIsAttachmentsLoading = state => state.openEntry.isAttachmentsLoading;

export const getAttachments = createSelector(
  state => state.openEntry.attachments,
  attachments => attachments.map(attachment => ({
    id: attachment.id,
    name: attachment.name,
    size: attachment.size,
    loaded: attachment.uploadProgress ? Math.round(attachment.size * attachment.uploadProgress) : 0,
    state: attachment.state || 'default',
    error: attachment.error,
    canOperate: !['queued', 'loading'].includes(attachment.state),
    isInProgress: attachment.isInProgress,
    file: attachment.file,
  })),
);

export const getFilesForUpload = (state, files) => (
  files.filter(file => state.openEntry.attachments.find(
    attachment => attachment.file === file,
  ).state === 'queued')
);

export const getRemoveDocumentParams = createSelector(
  getOpenTransactionLine,
  openTransaction => ({ uid: openTransaction.transactionUid }),
);

export const getInTrayModalContext = createSelector(
  getBusinessId,
  getRegion,
  (businessId, region) => ({ businessId, region, isUploadAllowed: false }),
);
