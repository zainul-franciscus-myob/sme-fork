import { SET_INITIAL_STATE } from '../../../SystemIntents';
import {
  SET_IS_LOADING,
  SET_NEW_BANK_FEEDS_ACCESS,
  SET_SERIAL_NUMBER,
} from './bankingLearnIntents';

const createLearnBankingDispatcher = (store) => ({
  setInitialState: (context) => {
    store.dispatch({
      intent: SET_INITIAL_STATE,
      context,
    });
  },
  setLoadingState: (loadingState) =>
    store.dispatch({
      intent: SET_IS_LOADING,
      loadingState,
    }),

  setSerialNumber: (serialNumber) => {
    store.dispatch({
      intent: SET_SERIAL_NUMBER,
      serialNumber,
    });
  },
  setNewBankFeedsAccess: (accessToNewBankFeeds) =>
    store.dispatch({
      intent: SET_NEW_BANK_FEEDS_ACCESS,
      accessToNewBankFeeds,
    }),
});

export default createLearnBankingDispatcher;
