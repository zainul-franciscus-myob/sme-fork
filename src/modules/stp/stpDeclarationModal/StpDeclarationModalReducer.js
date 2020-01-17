import { RESET_STATE, SET_INITIAL_STATE } from '../../../SystemIntents';
import {
  SET_ALERT_MESSAGE,
  SET_DECLARATION_NAME,
  SET_LOADING_STATE,
  SET_MODAL_IS_OPEN,
} from './StpDeclarationModalIntents';
import createReducer from '../../../store/createReducer';

const getDefaultState = () => ({
  isOpen: false,
  isLoading: false,
  eventId: '',
  alertMessage: '',
  name: '',
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

const setAlertMessage = (state, { alertMessage }) => ({
  ...state,
  alertMessage,
});

const setDeclarationName = (state, { name }) => ({
  ...state,
  name,
});

const handlers = {
  [RESET_STATE]: resetState,
  [SET_INITIAL_STATE]: setInitialState,
  [SET_MODAL_IS_OPEN]: setModalIsOpen,
  [SET_LOADING_STATE]: setLoadingState,
  [SET_DECLARATION_NAME]: setDeclarationName,
  [SET_ALERT_MESSAGE]: setAlertMessage,
};

const StpDeclarationModalReducer = createReducer(getDefaultState(), handlers);

export default StpDeclarationModalReducer;
