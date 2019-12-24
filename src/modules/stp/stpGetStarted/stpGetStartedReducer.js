import { RESET_STATE, SET_INITIAL_STATE } from '../../../SystemIntents';
import { SET_MODAL } from './stpGetStartedIntents';
import createReducer from '../../../store/createReducer';

const getDefaultState = () => ({
  modal: null,
});

const setInitialState = (state, { context }) => ({
  ...state,
  ...context,
});

const setModal = (state, { modal }) => ({
  ...state,
  modal,
});

const resetState = () => ({
  ...getDefaultState(),
});

const handlers = {
  [SET_MODAL]: setModal,
  [SET_INITIAL_STATE]: setInitialState,
  [RESET_STATE]: resetState,
};

const stpGetStartedReducer = createReducer(getDefaultState(), handlers);

export default stpGetStartedReducer;
