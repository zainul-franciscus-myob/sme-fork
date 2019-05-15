import RootMapping from './memoryMapping/RootMapping';

const createMemoryIntegration = () => ({
  read: async ({
    intent, params, onSuccess, onFailure, urlParams,
  }) => {
    const integrationFunction = RootMapping[intent];
    Promise.resolve().then(() => {
      integrationFunction({
        urlParams, params, onSuccess, onFailure,
      });
    });
  },
  write: async ({
    intent, params, onSuccess, onFailure,
  }) => {
    const integrationFunction = RootMapping[intent];
    Promise.resolve().then(() => {
      integrationFunction({ params, onSuccess, onFailure });
    });
  },
});

export default createMemoryIntegration;
