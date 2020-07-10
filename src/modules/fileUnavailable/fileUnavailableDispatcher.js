import { LOAD_FILE_UNAVAILABLE } from './FileUnavailableIntents';
import { SET_INITIAL_STATE } from '../../SystemIntents';

const createFileUnavailableDispatcher = (store) => ({
  resetState: () => {},

  setInitialState: (context) => {
    const intent = SET_INITIAL_STATE;
    store.dispatch({ intent, context });
  },

  load: (context) => {
    store.dispatch({ intent: LOAD_FILE_UNAVAILABLE, context });
  },
});

export default createFileUnavailableDispatcher;
