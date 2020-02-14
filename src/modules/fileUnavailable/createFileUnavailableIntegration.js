import { LOAD_FILE_UNAVAILABLE } from './FileUnavailableIntents';

const createFileUnavailableIntegration = (integration) => {
  const read = urlParams => new Promise((resolve, reject) => {
    integration.read({
      intent: LOAD_FILE_UNAVAILABLE,
      urlParams,
      onSuccess: (payload) => { resolve(payload); },
      onFailure: (error) => { reject(error); },
    });
  });

  return {
    read,
  };
};

export default createFileUnavailableIntegration;
