import {
  CLOSE_MODAL,
  GENERATE_IN_TRAY_EMAIL,
  LOAD_IN_TRAY,
  OPEN_MODAL,
  SET_CONFIRMING_EMAIL_GENERATION,
  SET_LOADING_STATE,
  SET_UPLOAD_OPTIONS_ALERT,
  SET_UPLOAD_OPTIONS_LOADING_STATE,
} from './InTrayIntents';
import { RESET_STATE, SET_INITIAL_STATE } from '../SystemIntents';
import createReducer from '../store/createReducer';

const getDefaultState = () => ({
  isLoading: true,
  businessId: '',
  email: '',
  modalType: '',
  isConfirmingEmailGeneration: false,
  isUploadOptionsLoading: false,
  uploadOptionsAlert: undefined,
});

const loadInTray = (state, { email }) => ({
  ...state,
  email,
});

const resetState = () => ({ ...getDefaultState() });

const setLoadingState = (state, { isLoading }) => ({
  ...state,
  isLoading,
});

const setInitialState = (state, { context }) => ({
  ...state,
  ...context,
});

const openModal = (state, { modalType }) => ({
  ...state,
  modalType,
});

const closeModal = state => ({
  ...state,
  modalType: '',
});

const setConfirmingEmailGeneration = (state, { isConfirmingEmailGeneration }) => ({
  ...state,
  isConfirmingEmailGeneration,
});

const generateInTrayEmail = (state, { email }) => ({
  ...state,
  email,
});

const setUploadOptionLoadingState = (state, { isUploadOptionsLoading }) => ({
  ...state,
  isUploadOptionsLoading,
});

const setUploadOptionsAlert = (state, { uploadOptionsAlert }) => ({
  ...state,
  uploadOptionsAlert,
});

const handlers = {
  [LOAD_IN_TRAY]: loadInTray,
  [RESET_STATE]: resetState,
  [SET_LOADING_STATE]: setLoadingState,
  [SET_INITIAL_STATE]: setInitialState,
  [OPEN_MODAL]: openModal,
  [CLOSE_MODAL]: closeModal,
  [SET_CONFIRMING_EMAIL_GENERATION]: setConfirmingEmailGeneration,
  [GENERATE_IN_TRAY_EMAIL]: generateInTrayEmail,
  [SET_UPLOAD_OPTIONS_LOADING_STATE]: setUploadOptionLoadingState,
  [SET_UPLOAD_OPTIONS_ALERT]: setUploadOptionsAlert,
};

const inTrayReducer = createReducer(getDefaultState(), handlers);

export default inTrayReducer;
