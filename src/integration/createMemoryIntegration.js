import RootMapping from './memoryMapping/RootMapping';

const sleep = duration => () => new Promise((resolve) => {
  setTimeout(resolve, duration);
});

const writeFormData = async ({
  intent, params, content, onSuccess, onFailure,
}) => {
  const integrationFunction = RootMapping[intent];
  Promise.resolve()
    .then(sleep(200))
    .then(() => {
      integrationFunction({
        params, content, onSuccess, onFailure,
      });
    });
};

const createMemoryIntegration = () => ({
  read: async ({
    intent, params, onSuccess, onFailure, urlParams,
  }) => {
    const integrationFunction = RootMapping[intent];
    Promise.resolve()
      .then(sleep(200))
      .then(() => {
        integrationFunction({
          urlParams, params, onSuccess, onFailure,
        });
      });
  },
  write: async ({
    intent, params, content, onSuccess, onFailure,
  }) => {
    const integrationFunction = RootMapping[intent];
    Promise.resolve()
      .then(sleep(200))
      .then(() => {
        integrationFunction({
          params, content, onSuccess, onFailure,
        });
      });
  },
  writeFormData,
  writeManyFormData: async ({
    intent, params, contents, onSuccess, onFailure, onComplete,
  }) => {
    const requests = contents.map((content, index) => new Promise(resolve => writeFormData({
      intent,
      params,
      content,
      onSuccess: (response) => {
        onSuccess(response, index);
        resolve({ success: true, response });
      },
      onFailure: (response) => {
        onFailure(response, index);
        resolve({ success: false, response });
      },
    })));

    Promise.all(requests).then(onComplete);
  },
});

export default createMemoryIntegration;
