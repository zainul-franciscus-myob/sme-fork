import { RESET_STATE, SET_INITIAL_STATE } from '../../../SystemIntents';
import { SET_LOADING_STATE, SET_SERIAL_NUMBER } from './bankingLearnIntents';
import createReducer from '../../../store/createReducer';

const getDefaultState = () => ({ serialNumber: null });

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

const handlers = {
  [SET_INITIAL_STATE]: setInitialState,
  [RESET_STATE]: resetState,
  [SET_SERIAL_NUMBER]: setSerialNumber,
  [SET_LOADING_STATE]: setLoadingState,
};

export default createReducer(getDefaultState(), handlers);
