import intentMapping from './memoryMappings/rootMappings';

export default () => ({
  read: ({
    intent, params, onSuccess, onFailure,
  }) => intentMapping[intent]({
    params, onSuccess, onFailure,
  }),

  write: ({
    intent, params, onSuccess, onFailure,
  }) => intentMapping[intent]({
    params, onSuccess, onFailure,
  }),
});
