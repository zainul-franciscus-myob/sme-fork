import {
  LOAD_PURCHASE_SETTINGS,
  SET_ALERT,
  SET_LOADING_STATE,
  UPDATE_DEFAULT_REMITTANCE_ADVICE_EMAIL_FIELD,
} from './purchaseSettingsIntents';
import { RESET_STATE, SET_INITIAL_STATE } from '../../SystemIntents';
import createReducer from '../../store/createReducer';

const getDefaultState = () => ({
  shouldDisplayCustomTemplateList: false,
  defaultRemittanceAdviceEmailSettings: {},
  alert: {},
  templateList: [],
});

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
  shouldDisplayCustomTemplateList,
  templateList,
  defaultRemittanceAdviceEmailSettings: {
    ...state.defaultRemittanceAdviceEmailSettings,
    ...emailSettings,
  },
});

const updateDefaultRemittanceAdviceEmailField = (state, { key, value }) => ({
  ...state,
  defaultRemittanceAdviceEmailSettings: {
    ...state.defaultRemittanceAdviceEmailSettings,
    [key]: value,
  },
});

const setAlert = (state, action) => ({
  ...state,
  alert: action.alert,
});

const handlers = {
  [SET_INITIAL_STATE]: setInitialState,
  [RESET_STATE]: resetState,
  [SET_LOADING_STATE]: setLoadingState,
  [LOAD_PURCHASE_SETTINGS]: loadPurchaseSettings,
  [UPDATE_DEFAULT_REMITTANCE_ADVICE_EMAIL_FIELD]: updateDefaultRemittanceAdviceEmailField,
  [SET_ALERT]: setAlert,
};

const purchaseSettingsReducer = createReducer(getDefaultState(), handlers);

export default purchaseSettingsReducer;
