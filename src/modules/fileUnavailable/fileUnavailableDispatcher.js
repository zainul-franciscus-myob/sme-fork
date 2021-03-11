import {
  LOAD_FILE_UNAVAILABLE,
  SET_IS_POLLING,
  SET_UPDATE_FILE_SUCCESS,
} from './FileUnavailableIntents';
import { SET_INITIAL_STATE } from '../../SystemIntents';

const createFileUnavailableDispatcher = (store) => ({
  resetState: () => {},

  setInitialState: (context) => {
    const intent = SET_INITIAL_STATE;
    store.dispatch({ intent, context });
  },

  loadFileUnavailable: (context) => {
    const intent = LOAD_FILE_UNAVAILABLE;
    store.dispatch({ intent, context });
  },

  setIsPolling: (isPolling) => {
    const intent = SET_IS_POLLING;
    store.dispatch({ intent, isPolling });
  },

  setUpdateFileSuccess: (updateFileSuccess) => {
    const intent = SET_UPDATE_FILE_SUCCESS;
    store.dispatch({ intent, updateFileSuccess });
  },
});

export default createFileUnavailableDispatcher;
