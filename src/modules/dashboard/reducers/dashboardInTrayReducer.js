import {
  ADD_IN_TRAY_ENTRY,
  CREATE_IN_TRAY_DOCUMENT,
  LOAD_IN_TRAY,
  REMOVE_IN_TRAY_ENTRY,
  SET_IN_TRAY_ALERT,
  SET_IN_TRAY_ERROR_STATE,
  SET_IN_TRAY_LOADING_STATE,
  SET_IN_TRAY_UPLOADING_STATE,
} from '../DashboardIntents';
import {
  getAddedEntries,
  getFilteredEntriesByKey,
  getUpdatedEntriesByKey,
  getUploadedEntry,
} from '../selectors/DashboardInTraySelectors';

const setInTrayState = (state, partialInTrayState) => ({
  ...state,
  inTray: {
    ...state.inTray,
    ...partialInTrayState,
  },
});

const addInTrayEntry = (state, { entry }) =>
  setInTrayState(state, { entries: getAddedEntries(state, entry) });

const createInTrayDocument = (state, { uploadId, entry }) =>
  setInTrayState(state, {
    entries: getUpdatedEntriesByKey(
      state,
      'uploadId',
      uploadId,
      getUploadedEntry(uploadId, entry)
    ),
  });

const loadInTray = (state, inTray) => setInTrayState(state, inTray);

const setInTrayLoadingState = (state, { isLoading }) =>
  setInTrayState(state, { isLoading });

const setInTrayUploadingState = (state, { isUploading }) =>
  setInTrayState(state, { isUploading });

const setInTrayErrorState = (state, { hasError }) =>
  setInTrayState(state, { hasError });

const setInTrayAlert = (state, { alert }) => setInTrayState(state, { alert });

export const removeEntry = (state, { uploadId }) => ({
  ...state,
  entries: getFilteredEntriesByKey(state, 'uploadId', uploadId),
});

export default {
  [ADD_IN_TRAY_ENTRY]: addInTrayEntry,
  [CREATE_IN_TRAY_DOCUMENT]: createInTrayDocument,
  [REMOVE_IN_TRAY_ENTRY]: removeEntry,
  [LOAD_IN_TRAY]: loadInTray,
  [SET_IN_TRAY_LOADING_STATE]: setInTrayLoadingState,
  [SET_IN_TRAY_ERROR_STATE]: setInTrayErrorState,
  [SET_IN_TRAY_ALERT]: setInTrayAlert,
  [SET_IN_TRAY_UPLOADING_STATE]: setInTrayUploadingState,
};
