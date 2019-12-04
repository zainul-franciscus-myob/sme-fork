import RootMapping from './memoryMapping/RootMapping';

const sleep = duration => new Promise(resolve => setTimeout(resolve, duration));

const writeFormData = ({
  intent, urlParams, content, onSuccess, onFailure,
}) => {
  const integrationFunction = RootMapping[intent];
  sleep(200)
    .then(() => {
      integrationFunction({
        urlParams, content, onSuccess, onFailure,
      });
    });
};

const createMemoryIntegration = () => ({
  read: ({
    intent, params, onSuccess, onFailure, urlParams,
  }) => {
    const integrationFunction = RootMapping[intent];
    sleep(200)
      .then(() => {
        integrationFunction({
          urlParams, params, onSuccess, onFailure,
        });
      });
  },
  readFile: ({
    intent, params, onSuccess, onFailure, urlParams,
  }) => {
    const integrationFunction = RootMapping[intent];
    sleep(200)
      .then(() => {
        integrationFunction({
          urlParams, params, onSuccess, onFailure,
        });
      });
  },
  write: ({
    intent, urlParams, content, onSuccess, onFailure,
  }) => {
    const integrationFunction = RootMapping[intent];
    sleep(200)
      .then(() => {
        integrationFunction({
          urlParams, content, onSuccess, onFailure,
        });
      });
  },
  writeFormData: ({
    intent, urlParams, content, onSuccess, onFailure,
  }) => writeFormData({
    intent, urlParams, content, onSuccess, onFailure,
  }),
  writeManyFormData: ({
    intent, urlParams, contents, onSuccess, onFailure, onComplete,
  }) => {
    const requests = contents.map((content, index) => new Promise(resolve => writeFormData({
      intent,
      urlParams,
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
