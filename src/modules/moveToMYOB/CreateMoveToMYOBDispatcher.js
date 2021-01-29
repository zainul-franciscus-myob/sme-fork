import { RESET_STATE, SET_INITIAL_STATE } from '../../SystemIntents';
import { SET_LOADING_STATE, SET_SERIAL_NUMBER } from './MoveToMYOBIntents';

const createMoveToMYOBDispatcher = (store) => ({
  resetState: () => {
    store.dispatch({ intent: RESET_STATE });
  },
  setInitialState: (context) => {
    store.dispatch({ intent: SET_INITIAL_STATE, context });
  },
  setLoadingState: (loadingState) => {
    store.dispatch({ intent: SET_LOADING_STATE, loadingState });
  },
  setSerialNumber: (serialNumber) => {
    store.dispatch({ intent: SET_SERIAL_NUMBER, serialNumber });
  },
});

export default createMoveToMYOBDispatcher;
