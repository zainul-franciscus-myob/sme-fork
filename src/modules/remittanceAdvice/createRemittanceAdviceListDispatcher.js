import { RESET_STATE, SET_INITIAL_STATE } from '../../SystemIntents';

const createRemittanceAdviceListDispatcher = (store) => ({
  setInitialState: (context) => {
    const intent = SET_INITIAL_STATE;
    store.dispatch({
      intent,
      context,
    });
  },

  resetState: () => {
    const intent = RESET_STATE;
    store.dispatch({ intent });
  },
});

export default createRemittanceAdviceListDispatcher;
