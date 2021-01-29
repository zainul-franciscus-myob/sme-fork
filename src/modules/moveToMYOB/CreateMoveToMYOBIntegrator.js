import { GET_SERIAL_NUMBER } from './MoveToMYOBIntents';
import { getBusinessId } from './MoveToMYOBSelectors';

const createMoveToMYOBIntegrator = (store, integration) => ({
  getSerialNumber: ({ onSuccess, onFailure }) => {
    const state = store.getState();
    const intent = GET_SERIAL_NUMBER;
    const urlParams = { businessId: getBusinessId(state) };

    integration.read({
      intent,
      urlParams,
      onSuccess,
      onFailure,
    });
  },
});

export default createMoveToMYOBIntegrator;
