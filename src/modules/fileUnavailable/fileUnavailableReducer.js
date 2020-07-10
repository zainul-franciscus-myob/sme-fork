import { LOAD_FILE_UNAVAILABLE } from './FileUnavailableIntents';
import { SET_INITIAL_STATE } from '../../SystemIntents';
import createReducer from '../../store/createReducer';

const getDefaultState = () => ({
  isOnlineOnly: true,
});

const setInitialState = (state, action) => ({
  ...state,
  ...action.context,
});

const load = (state, { context }) => {
  const { isOnlineOnly } = context;
  return {
    ...state,
    isOnlineOnly,
  };
};

const handlers = {
  [SET_INITIAL_STATE]: setInitialState,
  [LOAD_FILE_UNAVAILABLE]: load,
};

const fileUnavailableReducer = createReducer(getDefaultState(), handlers);

export default fileUnavailableReducer;
