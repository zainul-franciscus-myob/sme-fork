import { createSelector } from 'reselect';

import OCRStatus from '../OCRStatus';
import uploadStatuses from '../uploadStatuses';

const uploadFileTypes = [
  'application/pdf',
  'image/png',
  'image/jpeg',
  'image/tiff',
];

export const getIsLoading = (state) => state.inTrayList.isLoading;

export const getIsTableLoading = (state) => state.inTrayList.isTableLoading;

export const getActiveEntryId = (state) => state.inTrayList.activeEntryId;

export const getFilterOptions = (state) => state.inTrayList.filterOptions;

export const getSortOrder = (state) => state.inTrayList.sortOrder;

export const getOrderBy = (state) => state.inTrayList.orderBy;

export const getEntries = (state) => state.inTrayList.entries;

const getEntryById = (entries, id) => entries.find((entry) => entry.id === id);

export const getIsEntryUploadingDone = (state, entryId) => {
  const entry = getEntryById(getEntries(state), entryId);

  const uploadState = entry && entry.uploadStatus;

  return uploadState !== uploadStatuses.inProgress;
};

export const getTableEntries = createSelector(
  getEntries,
  getActiveEntryId,
  (entries, activeEntryId) =>
    entries.map((entry) => {
      const { ocrStatus, uploadStatus, isSubmitting = false } = entry;
      const isUploading = uploadStatus === uploadStatuses.inProgress;
      const isOcrInProgress = ocrStatus === OCRStatus.InProgress;
      return {
        ...entry,
        isUploading,
        isOcrInProgress,
        isSubmitting,
        showInvoiceDetails: !isOcrInProgress && !isUploading && !isSubmitting,
        showActions: !isUploading && !isSubmitting,
        isActive: entry.id === activeEntryId,
      };
    })
);

export const getAllowedActions = (state) => state.inTrayList.allowedActions;

export const getIsDetailShown = (state) => Boolean(getActiveEntryId(state));

export const getIsTableEmpty = (state) =>
  (state.inTrayList.entries || []).length === 0;

export const getOrder = (state) => ({
  column: getOrderBy(state),
  descending: getSortOrder(state) === 'desc',
});

const flipSortOrder = ({ inTrayList: { sortOrder } }) =>
  sortOrder === 'desc' ? 'asc' : 'desc';

export const getNewSortOrder = (orderBy) => (state) =>
  orderBy === getOrderBy(state) ? flipSortOrder(state) : 'asc';

export const getIsEntryLoading = createSelector(getEntries, (entries) =>
  entries.some(
    ({ isSubmitting, uploadStatus }) =>
      isSubmitting || uploadStatus === uploadStatuses.inProgress
  )
);

const validateFileSize = (size) => size <= 10000000;

const validateFileType = (type) => uploadFileTypes.includes(type);

export const getUploadingErrorMessage = (file) => {
  if (!validateFileType(file.type)) {
    return "You can't attach a file of this format. Please use PDF, JPG, TIFF or PNG files.";
  }

  if (!validateFileSize(file.size)) {
    return 'The file is too large. Please choose a file under 10MB.';
  }

  return undefined;
};

export const getUploadingEntry = (index) => {
  const uploadId = `upload-${Date.now().valueOf()}-${index}`;

  return { uploadId, uploadStatus: uploadStatuses.inProgress };
};

export const getUploadedEntry = (uploadId, entry) => ({
  ...entry,
  uploadId,
  uploadStatus: uploadStatuses.done,
});

export const getAddedEntries = (state, entry) => {
  const entries = getEntries(state);

  return [entry, ...entries];
};

export const getUpdatedEntriesByKey = (state, key, value, partialEntry) => {
  const entries = getEntries(state);

  return entries.map((entry) =>
    entry[key] === value ? { ...entry, ...partialEntry } : entry
  );
};

export const getFilteredEntriesByKey = (state, key, value) => {
  const entries = getEntries(state);

  return entries.filter((entry) => entry[key] !== value);
};

export const getUploadCompleteAlert = (results) => {
  const isAllSuccess = results.every((result) => result.success);
  if (isAllSuccess) {
    const [
      {
        response: { message },
      },
    ] = results;

    return { message, type: 'success' };
  }

  const errorMessage = results.reduce(
    (acc, { success, response: { message } }) =>
      success ? acc : `${acc} ${message}`.trim(),
    ''
  );

  return { message: errorMessage, type: 'danger' };
};

export const getActiveEntry = createSelector(
  getEntries,
  getActiveEntryId,
  (entries, activeEntryId) => {
    const activeEntry = getEntryById(entries, activeEntryId);

    return {
      activeEntryId,
      uploadedDate:
        activeEntry && activeEntry.uploadedDate ? activeEntry.uploadedDate : '',
    };
  }
);

export const getDocumentIds = createSelector(getEntries, (entries) =>
  entries.map((entry) => entry.id)
);

export const getShouldPolling = (state) =>
  getEntries(state).filter((entry) => entry.ocrStatus === OCRStatus.InProgress)
    .length > 0;
