import {
  CLOSE_SMARTME_REDIRECT_MODAL,
  OPEN_SMARTME_REDIRECT_MODAL,
} from './SmartMeIntents';
import { RESET_STATE, SET_INITIAL_STATE } from '../../../SystemIntents';
import createReducer from '../../../store/createReducer';

const getDefaultState = () => ({
  smartMeRedirectModal: {
    isOpen: false,
  },
});

const resetState = () => getDefaultState();

const setInitialState = (state, action) => ({
  ...state,
  ...action.context,
});

const setSmartMeRedirectModal = (state, { smartMeRedirectModal }) => ({
  ...state,
  smartMeRedirectModal: {
    ...state.smartMeRedirectModal,
    ...smartMeRedirectModal,
  },
});

const handlers = {
  [SET_INITIAL_STATE]: setInitialState,
  [RESET_STATE]: resetState,

  [OPEN_SMARTME_REDIRECT_MODAL]: setSmartMeRedirectModal,
  [CLOSE_SMARTME_REDIRECT_MODAL]: setSmartMeRedirectModal,
};
const smartMeReducer = createReducer(getDefaultState(), handlers);

export default smartMeReducer;
