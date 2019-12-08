import { createSelector } from 'reselect';

import uploadStatuses from './uploadStatuses';

const uploadFileTypes = ['application/pdf', 'image/png', 'image/jpeg', 'image/tiff'];

export const getIsLoading = state => state.isLoading;

export const getIsOpen = state => state.isOpen;

export const getBusinessId = state => state.businessId;

export const getRegion = state => state.region;

export const getAlert = state => state.alert;

export const getIsTableLoading = state => state.isTableLoading;

export const getFilterOptions = state => state.filterOptions;

export const getAppliedFilterOptions = state => state.appliedFilterOptions;

export const getSortOrder = state => state.sortOrder;

export const getOrderBy = state => state.orderBy;

export const getEntries = state => state.entries;

export const getSelectedId = state => state.selectedId;

export const getTableEntries = createSelector(
  getEntries,
  entries => entries.map((entry) => {
    const { ocrStatus, uploadStatus, isSubmitting = false } = entry;
    const isUploading = uploadStatus === uploadStatuses.inProgress;
    const isOcrInProgress = ocrStatus === 'InProgress';

    return {
      ...entry,
      isUploading,
      isOcrInProgress,
      isSubmitting,
      showInvoiceDetails: !isOcrInProgress && !isUploading && !isSubmitting,
      showActions: !isUploading && !isSubmitting,
    };
  }),
);

export const getOrder = state => ({
  column: getOrderBy(state),
  descending: getSortOrder(state) === 'desc',
});

const flipSortOrder = ({ sortOrder }) => (sortOrder === 'desc' ? 'asc' : 'desc');

export const getNewSortOrder = orderBy => state => (orderBy === getOrderBy(state)
  ? flipSortOrder(state)
  : 'asc');

export const getIsEntryLoading = createSelector(
  getEntries,
  entries => entries
    .some(({ isSubmitting, uploadStatus }) => (
      isSubmitting || uploadStatus === uploadStatuses.inProgress
    )),
);

const validateFileSize = size => (size <= 10000000);

const validateFileType = type => uploadFileTypes.includes(type);

export const getUploadingErrorMessage = (file) => {
  if (!validateFileType(file.type)) {
    return 'You can\'t attach a file of this format. Please use PDF, JPG, TIFF or PNG files.';
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

  return entries.map(entry => (entry[key] === value
    ? { ...entry, ...partialEntry }
    : entry));
};

export const getFilteredEntriesByKey = (state, key, value) => {
  const entries = getEntries(state);

  return entries.filter(entry => entry[key] !== value);
};

export const getUploadCompleteAlert = (results) => {
  const isAllSuccess = results.every(result => result.success);
  if (isAllSuccess) {
    const [{ response: { message } }] = results;

    return { message, type: 'success' };
  }

  const errorMessage = results
    .reduce((acc, { success, response: { message } }) => (
      success ? acc : `${acc} ${message}`.trim()
    ), '');

  return { message: errorMessage, type: 'danger' };
};

export const getIsActionDisabled = createSelector(
  getIsLoading,
  getIsTableLoading,
  getIsEntryLoading,
  (isLoading, isTableLoading, isEntryLoading) => isLoading || isTableLoading || isEntryLoading,
);

export const getIsLinkActionDisabled = createSelector(
  getIsActionDisabled,
  getSelectedId,
  (isActionDisabled, selectId) => isActionDisabled || !selectId,
);
