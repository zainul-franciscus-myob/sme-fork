import {
  GENERATE_IN_TRAY_EMAIL,
  SET_CONFIRMING_EMAIL_GENERATION,
  SET_UPLOAD_OPTIONS_ALERT,
  SET_UPLOAD_OPTIONS_LOADING_STATE,
} from '../../InTrayIntents';
import { RESET_STATE, SET_INITIAL_STATE } from '../../../../SystemIntents';
import createReducer from '../../../../store/createReducer';

const getDefaultState = () => ({
  isLoading: true,
  businessId: '',
  email: '',
  isOpen: false,
  isConfirmingEmailGeneration: false,
  isUploadOptionsLoading: false,
  region: '',
  uploadOptionsAlert: undefined,
});

const resetState = () => ({ ...getDefaultState() });

const setInitialState = (state, { context }) => ({
  ...state,
  ...context,
  isOpen: true,
});

export const setConfirmingEmailGeneration = (
  state,
  { isConfirmingEmailGeneration }
) => ({
  ...state,
  isConfirmingEmailGeneration,
});

export const generateInTrayEmail = (state, { email }) => ({
  ...state,
  email,
});

export const setUploadOptionsLoadingState = (
  state,
  { isUploadOptionsLoading }
) => ({
  ...state,
  isUploadOptionsLoading,
});

export const setUploadOptionsAlert = (state, { uploadOptionsAlert }) => ({
  ...state,
  uploadOptionsAlert,
});

const handlers = {
  [RESET_STATE]: resetState,
  [SET_INITIAL_STATE]: setInitialState,
  [SET_UPLOAD_OPTIONS_ALERT]: setUploadOptionsAlert,
  [SET_CONFIRMING_EMAIL_GENERATION]: setConfirmingEmailGeneration,
  [SET_UPLOAD_OPTIONS_LOADING_STATE]: setUploadOptionsLoadingState,
  [GENERATE_IN_TRAY_EMAIL]: generateInTrayEmail,
};

const inTrayUploadOptionsModalReducer = createReducer(
  getDefaultState(),
  handlers
);

export default inTrayUploadOptionsModalReducer;
