import {
  CLOSE_MODAL,
  LOAD_PURCHASE_SETTINGS,
  OPEN_MODAL,
  SET_ALERT,
  SET_LOADING_STATE,
  SET_REDIRECT_URL,
  UPDATE_DEFAULT_REMITTANCE_ADVICE_EMAIL_FIELD,
} from './purchaseSettingsIntents';
import { RESET_STATE, SET_INITIAL_STATE } from '../../SystemIntents';
import createReducer from '../../store/createReducer';
import modalTypes from './modalTypes';

const getDefaultState = () => ({
  shouldDisplayCustomTemplateList: false,
  defaultRemittanceAdviceEmailSettings: {
    remittanceAdviceEmailBody: '',
    remittanceAdviceEmailSubject: '',
  },
  alert: {},
  templateList: [],
  isPageEdited: false,
  modalType: modalTypes.NONE,
});

const pageEdited = { isPageEdited: true };

const setInitialState = (state, action) => ({
  ...state,
  ...action.context,
});

const resetState = () => getDefaultState();

const setLoadingState = (state, { loadingState }) => ({
  ...state,
  loadingState,
});

const loadPurchaseSettings = (
  state,
  { shouldDisplayCustomTemplateList, templateList, emailSettings }
) => ({
  ...state,
  isPageEdited: false,
  shouldDisplayCustomTemplateList,
  templateList,
  defaultRemittanceAdviceEmailSettings: {
    ...state.defaultRemittanceAdviceEmailSettings,
    ...emailSettings,
  },
});

const updateDefaultRemittanceAdviceEmailField = (state, { key, value }) => ({
  ...state,
  ...pageEdited,
  defaultRemittanceAdviceEmailSettings: {
    ...state.defaultRemittanceAdviceEmailSettings,
    [key]: value,
  },
});

const setAlert = (state, action) => ({
  ...state,
  alert: action.alert,
});

const openModal = (state, action) => ({
  ...state,
  modalType: action.modalType,
});

const closeModal = (state) => ({
  ...state,
  modalType: modalTypes.NONE,
});

const setRedirectUrl = (state, { redirectUrl }) => ({
  ...state,
  redirectUrl,
});

const handlers = {
  [OPEN_MODAL]: openModal,
  [CLOSE_MODAL]: closeModal,
  [SET_REDIRECT_URL]: setRedirectUrl,
  [SET_INITIAL_STATE]: setInitialState,
  [RESET_STATE]: resetState,
  [SET_LOADING_STATE]: setLoadingState,
  [LOAD_PURCHASE_SETTINGS]: loadPurchaseSettings,
  [UPDATE_DEFAULT_REMITTANCE_ADVICE_EMAIL_FIELD]: updateDefaultRemittanceAdviceEmailField,
  [SET_ALERT]: setAlert,
};

const purchaseSettingsReducer = createReducer(getDefaultState(), handlers);

export default purchaseSettingsReducer;
