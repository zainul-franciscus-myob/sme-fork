import getSerialNumber from './getSerialNumber';

export default ({ integration, store }) => ({
  getSerialNumber: ({ onSuccess, onFailure }) => {
    getSerialNumber({
      integration,
      context: store.getState(),
      onSuccess,
      onFailure,
    });
  },
});
