import RootMapping from './memoryMapping/RootMapping';

const sleep = duration => new Promise(resolve => setTimeout(resolve, duration));

const retrieveIntegrationFunction = (mapping, intent) => {
  const integrationFunction = mapping[intent];

  if (!integrationFunction) {
    throw Error(`Intent '${intent.toString()}' cannot be found in the memory RootMapping

    Make sure:
     * you have a MemoryMapping for your module
     * '${intent.toString()}' has been included in the module mapping
     * the module mapping has been included in the memory RootMapping`);
  }

  return integrationFunction;
};

const writeFormData = ({
  intent, urlParams, content, onSuccess, onFailure,
}) => {
  const integrationFunction = retrieveIntegrationFunction(RootMapping, intent);
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
    const integrationFunction = retrieveIntegrationFunction(RootMapping, intent);

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
    const integrationFunction = retrieveIntegrationFunction(RootMapping, intent);
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
    const integrationFunction = retrieveIntegrationFunction(RootMapping, intent);
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
