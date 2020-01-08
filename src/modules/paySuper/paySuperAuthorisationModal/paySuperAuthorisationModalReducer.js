import { RESET_STATE } from '../../../SystemIntents';
import {
  SET_ACCESS_TOKEN,
  SET_ALERT,
  SET_IS_LOADING,
  SET_IS_OPEN,
  SET_OPENING_CONTEXT,
  UPDATE_AUTHORISATION_CODE,
  UPDATE_AUTHORISATION_INFORMATION,
} from './paySuperAuthorisationModalIntents';
import createReducer from '../../../store/createReducer';

const getDefaultState = () => ({
  isLoading: true,
  isOpen: false,
  batchPaymentId: '',
  businessId: '',
  alert: null,
  accessToken: '',
  authorisationInfo: {
    authorisationId: '',
    authorisationEmail: '',
    authorisationCode: '',
  },
});

const setIsLoading = (state, { isLoading }) => ({
  ...state,
  isLoading,
});

const setIsOpen = (state, { isOpen }) => ({
  ...state,
  isOpen,
});

const updateAuthorisationInfo = (state, { response }) => ({
  ...state,
  authorisationInfo: {
    ...state.authorisationInfo,
    authorisationId: response.authorisationId,
    authorisationEmail: response.authorisationEmail,
  },
});

const updateAuthorisationCode = (state, { authorisationCode }) => ({
  ...state,
  authorisationInfo: {
    ...state.authorisationInfo,
    authorisationCode,
  },
});

const setOpeningContext = (state, { context }) => ({
  ...state,
  ...context,
});

const setAlert = (state, { alert }) => ({
  ...state,
  alert,
});

const resetState = () => ({
  ...getDefaultState(),
});

const setAccessToken = (state, { accessToken }) => ({
  ...state,
  accessToken,
});

const handlers = {
  [RESET_STATE]: resetState,
  [SET_IS_OPEN]: setIsOpen,
  [UPDATE_AUTHORISATION_INFORMATION]: updateAuthorisationInfo,
  [UPDATE_AUTHORISATION_CODE]: updateAuthorisationCode,
  [SET_OPENING_CONTEXT]: setOpeningContext,
  [SET_ALERT]: setAlert,
  [SET_ACCESS_TOKEN]: setAccessToken,
  [SET_IS_LOADING]: setIsLoading,
};

const paySuperAuthorisationReducer = createReducer(getDefaultState(), handlers);

export default paySuperAuthorisationReducer;
