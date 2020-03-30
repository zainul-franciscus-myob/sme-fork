import { RESET_STATE, SET_INITIAL_STATE } from '../../../../SystemIntents';

const createEmployeeListNzDispatcher = store => ({

  setInitialState: (context) => {
    const intent = SET_INITIAL_STATE;
    store.dispatch({ intent, context });
  },

  resetState: () => {
    store.dispatch({
      intent: RESET_STATE,
    });
  },

});

export default createEmployeeListNzDispatcher;
