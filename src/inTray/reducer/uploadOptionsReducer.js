export const setConfirmingEmailGeneration = (state, { isConfirmingEmailGeneration }) => ({
  ...state,
  isConfirmingEmailGeneration,
});

export const generateInTrayEmail = (state, { email }) => ({
  ...state,
  email,
});

export const setUploadOptionsLoadingState = (state, { isUploadOptionsLoading }) => ({
  ...state,
  isUploadOptionsLoading,
});

export const setUploadOptionsAlert = (state, { uploadOptionsAlert }) => ({
  ...state,
  uploadOptionsAlert,
});
