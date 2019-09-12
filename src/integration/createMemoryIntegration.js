import RootMapping from './memoryMapping/RootMapping';

const sleep = duration => () => new Promise((resolve) => {
  setTimeout(resolve, duration);
});

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
  writeFormData: async ({
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
});

export default createMemoryIntegration;
