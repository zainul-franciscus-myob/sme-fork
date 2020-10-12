import {
  LOAD_PURCHASE_SETTINGS,
  SET_ALERT,
  SET_LOADING_STATE,
  UPDATE_DEFAULT_REMITTANCE_EMAIL_FIELD,
} from './purchaseSettingsIntents';
import { RESET_STATE, SET_INITIAL_STATE } from '../../SystemIntents';
import createReducer from '../../store/createReducer';

const getDefaultState = () => ({
  defaultRemittanceEmailSettings: {},
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
  { intent, emailSettings, templateList, displayTemplateList, ...rest }
) => ({
  ...state,
  ...rest,
  defaultRemittanceEmailSettings: {
    ...state.defaultRemittanceEmailSettings,
    ...emailSettings,
  },
  templateList,
  displayTemplateList,
});

const updateDefaultRemittanceEmailField = (state, { key, value }) => ({
  ...state,
  defaultRemittanceEmailSettings: {
    ...state.defaultRemittanceEmailSettings,
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
  [UPDATE_DEFAULT_REMITTANCE_EMAIL_FIELD]: updateDefaultRemittanceEmailField,
  [SET_ALERT]: setAlert,
};

const purchaseSettingsReducer = createReducer(getDefaultState(), handlers);

export default purchaseSettingsReducer;
