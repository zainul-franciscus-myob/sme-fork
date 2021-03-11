import {
  FETCH_FILE_UPDATE_STATUS,
  LOAD_FILE_UNAVAILABLE,
  TRIGGER_FILE_UPDATE,
} from '../FileUnavailableIntents';

const HttpFileUnavailableMapping = {
  [LOAD_FILE_UNAVAILABLE]: {
    method: 'GET',
    getPath: ({ businessId }) =>
      `/${businessId}/fileUnavailable/load_file_unavailable`,
  },

  [FETCH_FILE_UPDATE_STATUS]: {
    method: 'GET',
    getPath: ({ businessId }) =>
      `/${businessId}/fileUnavailable/fetch_file_update_status`,
  },

  [TRIGGER_FILE_UPDATE]: {
    method: 'POST',
    getPath: ({ businessId }) =>
      `/${businessId}/fileUnavailable/trigger_file_update`,
  },
};

export default HttpFileUnavailableMapping;
