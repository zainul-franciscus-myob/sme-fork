import {
  CLOSE_MODAL,
  LOAD_PURCHASE_SETTINGS,
  OPEN_MODAL,
  SET_ALERT,
  SET_LOADING_STATE,
  SET_REDIRECT_URL,
  UPDATE_EMAIL_SETTINGS_FIELD,
} from './purchaseSettingsIntents';
import { RESET_STATE, SET_INITIAL_STATE } from '../../SystemIntents';
import createReducer from '../../store/createReducer';
import modalTypes from './modalTypes';

const getDefaultState = () => ({
  shouldDisplayCustomTemplateList: false,
  defaultPurchasesEmailSettings: {
    remittanceAdviceEmailBody: '',
    remittanceAdviceEmailSubject: '',
    fromName: '',
    fromEmail: '',
    purchaseOrderEmailBody: '',
    purchaseOrderEmailSubject: '',
    isPurchaseOrderNumberIncluded: 'true',
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
  defaultPurchasesEmailSettings: {
    ...state.defaultPurchasesEmailSettings,
    ...emailSettings,
  },
});

const updateEmailSettingsField = (state, { key, value }) => ({
  ...state,
  ...pageEdited,
  defaultPurchasesEmailSettings: {
    ...state.defaultPurchasesEmailSettings,
    [key]: value,
  },
});

const setAlert = (state, action) => ({
  ...state,
  alert: action.alert,
  isPageEdited: action.alert.type !== 'success',
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
  [UPDATE_EMAIL_SETTINGS_FIELD]: updateEmailSettingsField,
  [SET_ALERT]: setAlert,
};

const purchaseSettingsReducer = createReducer(getDefaultState(), handlers);

export default purchaseSettingsReducer;
