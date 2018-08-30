import intentMapping from './memoryMapping/rootMapper';

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
