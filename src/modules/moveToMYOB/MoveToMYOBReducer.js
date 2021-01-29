import { RESET_STATE, SET_INITIAL_STATE } from '../../SystemIntents';
import { SET_LOADING_STATE, SET_SERIAL_NUMBER } from './MoveToMYOBIntents';
import LoadingState from '../../components/PageView/LoadingState';
import createReducer from '../../store/createReducer';

const getDefaultState = () => ({
  businessId: '',
  region: '',
  loadingState: LoadingState.LOADING,
  serialNumber: '',
});

const resetState = () => getDefaultState();

const setInitialState = (state, action) => ({
  ...state,
  ...action.context,
});

const setLoadingState = (state, { loadingState }) => ({
  ...state,
  loadingState,
});

const setSerialNumber = (state, { serialNumber }) => ({
  ...state,
  serialNumber,
});

const handlers = {
  [RESET_STATE]: resetState,
  [SET_INITIAL_STATE]: setInitialState,
  [SET_LOADING_STATE]: setLoadingState,
  [SET_SERIAL_NUMBER]: setSerialNumber,
};

const moveToMYOBReducer = createReducer(getDefaultState(), handlers);

export default moveToMYOBReducer;
