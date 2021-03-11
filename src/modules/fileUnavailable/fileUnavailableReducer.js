import {
  LOAD_FILE_UNAVAILABLE,
  SET_IS_POLLING,
  SET_UPDATE_FILE_SUCCESS,
} from './FileUnavailableIntents';
import { SET_INITIAL_STATE } from '../../SystemIntents';
import createReducer from '../../store/createReducer';

const getDefaultState = () => ({
  isOnlineOnly: true,
  updateFileSuccess: false,
  isPolling: false,
});

const setInitialState = (state, action) => ({
  ...state,
  ...action.context,
});

const loadFileUnavailable = (state, { context }) => {
  const { isOnlineOnly } = context;
  return {
    ...state,
    isOnlineOnly,
  };
};

const setIsPolling = (state, { isPolling }) => ({
  ...state,
  isPolling,
});

const setUpdateFileSuccess = (state, { updateFileSuccess }) => ({
  ...state,
  updateFileSuccess,
});

const handlers = {
  [SET_INITIAL_STATE]: setInitialState,
  [LOAD_FILE_UNAVAILABLE]: loadFileUnavailable,
  [SET_IS_POLLING]: setIsPolling,
  [SET_UPDATE_FILE_SUCCESS]: setUpdateFileSuccess,
};

const fileUnavailableReducer = createReducer(getDefaultState(), handlers);

export default fileUnavailableReducer;
