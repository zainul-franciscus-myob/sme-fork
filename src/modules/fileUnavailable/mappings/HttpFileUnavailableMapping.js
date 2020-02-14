import { LOAD_FILE_UNAVAILABLE } from '../FileUnavailableIntents';

const HttpFileUnavailableMapping = {
  [LOAD_FILE_UNAVAILABLE]: {
    method: 'GET',
    getPath: ({ businessId }) => `/${businessId}/fileUnavailable/load_file_unavailable`,
  },
};

export default HttpFileUnavailableMapping;
