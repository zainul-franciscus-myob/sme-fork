import { RESET_STATE } from '../../SystemIntents';
import {
  SET_ALERT,
  SET_IS_OPEN,
  SET_MODAL_TYPE,
  SET_OPENING_CONTEXT,
  UPDATE_AUTHORISATION_CODE,
  UPDATE_AUTHORISATION_INFORMATION,
  UPDATE_LOGIN_INFO,
} from './paySuperAuthorisationModalIntents';
import ModalType from './ModalType';
import createReducer from '../../store/createReducer';

const getDefaultState = () => ({
  isOpen: false,
  modalType: ModalType.LOGIN,
  batchPaymentId: '',
  businessId: '',
  authorisationInfo: {
    authorisationId: '',
    authorisationEmail: '',
    authorisationCode: '',
  },
  email: '',
  password: '',
  alert: null,
});

const setIsOpen = (state, { isOpen }) => ({
  ...state,
  isOpen,
});

const setModalType = (state, { modalType }) => ({
  ...state,
  modalType,
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

const updateLoginInfo = (state, { input }) => ({
  ...state,
  [input.key]: input.value,
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

const handlers = {
  [RESET_STATE]: resetState,
  [SET_IS_OPEN]: setIsOpen,
  [UPDATE_AUTHORISATION_INFORMATION]: updateAuthorisationInfo,
  [UPDATE_AUTHORISATION_CODE]: updateAuthorisationCode,
  [UPDATE_LOGIN_INFO]: updateLoginInfo,
  [SET_MODAL_TYPE]: setModalType,
  [SET_OPENING_CONTEXT]: setOpeningContext,
  [SET_ALERT]: setAlert,
};

const paySuperAuthorisationReducer = createReducer(getDefaultState(), handlers);

export default paySuperAuthorisationReducer;
