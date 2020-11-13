import { RESET_STATE, SET_INITIAL_STATE } from '../../../SystemIntents';
import {
  SET_LOADING_STATE,
  SET_NEW_BANK_FEEDS_ACCESS,
  SET_SERIAL_NUMBER,
} from './bankingLearnIntents';
import LoadingState from '../../../components/PageView/LoadingState';
import createReducer from '../../../store/createReducer';

const getDefaultState = () => ({
  businessId: '',
  region: '',
  serialNumber: '',
  loadingState: LoadingState.LOADING,
  accessToNewBankFeeds: false,
});

const resetState = () => getDefaultState();

const setInitialState = (state, action) => ({
  ...state,
  ...action.context,
});

const setSerialNumber = (state, { serialNumber }) => ({
  ...state,
  serialNumber,
});

const setLoadingState = (state, { isLoading }) => ({
  ...state,
  isLoading,
});

const setAccessToNewBankFeeds = (state, { accessToNewBankFeeds }) => ({
  ...state,
  accessToNewBankFeeds,
});

const handlers = {
  [SET_INITIAL_STATE]: setInitialState,
  [RESET_STATE]: resetState,
  [SET_SERIAL_NUMBER]: setSerialNumber,
  [SET_LOADING_STATE]: setLoadingState,
  [SET_NEW_BANK_FEEDS_ACCESS]: setAccessToNewBankFeeds,
};

export default createReducer(getDefaultState(), handlers);
