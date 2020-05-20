import { RESET_STATE, SET_INITIAL_STATE } from '../../../SystemIntents';
import { SET_COPY_ALERT_STATE, SET_COPY_ALERT_TEXT, SET_LOADING_STATE } from './BankFeedsConnectIntents';

const BankFeedsConnectDispatcher = store => ({
  resetState: () => store.dispatch({ intent: RESET_STATE }),

  setInitialState: context => store.dispatch({
    intent: SET_INITIAL_STATE,
    context,
  }),

  setLoadingState: loadingState => store.dispatch({
    intent: SET_LOADING_STATE,
    loadingState,
  }),

  setCopyAlertState: copyAlertState => store.dispatch({
    intent: SET_COPY_ALERT_STATE,
    copyAlertState,
  }),

  setCopyAlertText: copyAlertText => store.dispatch({
    intent: SET_COPY_ALERT_TEXT,
    copyAlertText,
  }),
});

export default BankFeedsConnectDispatcher;
