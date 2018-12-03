import RootMapping from './memoryMapping/RootMapping';

const createMemoryIntegration = () => ({
  read: ({
    intent, params, onSuccess, onFailure,
  }) => {
    const integrationFunction = RootMapping[intent];
    integrationFunction({ params, onSuccess, onFailure });
  },
  write: ({
    intent, params, onSuccess, onFailure,
  }) => RootMapping[intent]({
    params, onSuccess, onFailure,
  }),
});

export default createMemoryIntegration;
