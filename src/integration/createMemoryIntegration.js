import RootMapping from './memoryMapping/RootMapping';

const createMemoryIntegration = () => ({
  read: async ({
    intent, params, onSuccess, onFailure,
  }) => {
    const integrationFunction = RootMapping[intent];
    await Promise.resolve();
    integrationFunction({ params, onSuccess, onFailure });
  },
  write: async ({
    intent, params, onSuccess, onFailure,
  }) => {
    const integrationFunction = RootMapping[intent];
    await Promise.resolve();
    integrationFunction({ params, onSuccess, onFailure });
  },
});

export default createMemoryIntegration;
