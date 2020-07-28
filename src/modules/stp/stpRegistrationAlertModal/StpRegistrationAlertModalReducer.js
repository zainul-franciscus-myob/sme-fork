import { RESET_STATE, SET_INITIAL_STATE } from '../../../SystemIntents';
import {
  SET_LOADING_STATE,
  SET_MODAL_IS_OPEN,
} from './StpRegistrationAlertModalIntents';
import createReducer from '../../../store/createReducer';

const getDefaultState = () => ({
  isOpen: false,
  isLoading: false,
});

const resetState = () => ({
  ...getDefaultState(),
});

const setInitialState = (state, { context }) => ({
  ...getDefaultState(),
  ...context,
});

const setModalIsOpen = (state, { isOpen }) => ({
  ...state,
  isOpen,
});

const setLoadingState = (state, { isLoading }) => ({
  ...state,
  isLoading,
});

const handlers = {
  [RESET_STATE]: resetState,
  [SET_INITIAL_STATE]: setInitialState,
  [SET_MODAL_IS_OPEN]: setModalIsOpen,
  [SET_LOADING_STATE]: setLoadingState,
};

const StpRegistrationAlertModalReducer = createReducer(
  getDefaultState(),
  handlers
);

export default StpRegistrationAlertModalReducer;
