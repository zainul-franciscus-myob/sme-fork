import { SET_INITIAL_STATE } from '../../../SystemIntents';
import { SET_LOADING_STATE, SET_SERIAL_NUMBER } from '../bankingLearnIntents';

const createLearnBankingDispatcher = store => ({
  setInitialState: (context) => {
    store.dispatch({
      intent: SET_INITIAL_STATE,
      context,
    });
  },
  setLoading: (isLoading) => {
    store.dispatch({
      intent: SET_LOADING_STATE,
      isLoading,
    });
  },
  setSerialNumber: ({ serialNumber }) => {
    store.dispatch({
      intent: SET_SERIAL_NUMBER,
      serialNumber,
    });
  },
});

export default createLearnBankingDispatcher;
