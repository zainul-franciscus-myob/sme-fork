import { createSelector } from 'reselect';

import { getBusinessId, getRegion } from './DashboardSelectors';

const uploadFileTypes = [
  'application/pdf',
  'image/png',
  'image/jpeg',
  'image/tiff',
];

export const getInTrayAlert = (state) => state.inTray.alert;

export const getHasError = (state) => state.inTray.hasError;

export const getIsLoading = (state) => state.inTray.isLoading;

export const getIsUploading = (state) => state.inTray.isUploading;

export const getEntries = (state) => state.inTray.entries;

export const getEmail = (state) => state.inTray.email;

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

export const getInTrayLink = createSelector(
  getBusinessId,
  getRegion,
  (businessId, region) => `/#/${region}/${businessId}/inTray`
);

export const getInTrayUploadOptionsModalContext = createSelector(
  getBusinessId,
  getRegion,
  getEmail,
  (businessId, region, email) => ({ businessId, region, email })
);

const uploadStatuses = {
  inProgress: 'inProgress',
  done: 'done',
};

export const getUploadingEntry = (index) => {
  const uploadId = `upload-${Date.now().valueOf()}-${index}`;

  return { uploadId, uploadStatus: uploadStatuses.inProgress };
};

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

export const getUploadedEntry = (uploadId, entry) => ({
  ...entry,
  uploadId,
  uploadStatus: uploadStatuses.done,
});

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
