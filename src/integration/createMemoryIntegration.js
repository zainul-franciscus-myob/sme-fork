import RootMapping from './memoryMapping/RootMapping';

const createMemoryIntegration = () => ({
  read: async ({
    intent, params, onSuccess, onFailure,
  }) => {
    // await Promise.resolve();
    const integrationFunction = RootMapping[intent];
    setTimeout(() => {
      integrationFunction({ params, onSuccess, onFailure });
    }, 1000);
  },
  write: ({
    intent, params, onSuccess, onFailure,
  }) => RootMapping[intent]({
    params, onSuccess, onFailure,
  }),
});

export default createMemoryIntegration;
