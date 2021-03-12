import {
  CLOSE_MODAL,
  LOAD_PURCHASE_SETTINGS,
  OPEN_MODAL,
  SAVE_TAB_DATA,
  SET_ALERT,
  SET_LOADING_STATE,
  SET_PENDING_TAB,
  SET_REDIRECT_URL,
  SET_TAB,
  UPDATE_EMAIL_SETTINGS_FIELD,
} from './purchaseSettingsIntents';
import { RESET_STATE, SET_INITIAL_STATE } from '../../SystemIntents';
import { mainTabIds } from './tabItems';
import createReducer from '../../store/createReducer';

const getDefaultState = () => ({
  shouldDisplayCustomTemplateList: false,
  emailSettings: {
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
  modalType: '',
  tabData: {},
  selectedTab: mainTabIds.emailDefaults,
  pendingTab: '',
});

const setInitialState = (state, action) => {
  const { selectedTab } = action.context;
  const isKnownTabId = Object.keys(mainTabIds).includes(selectedTab);

  return {
    ...state,
    ...action.context,
    selectedTab: isKnownTabId ? selectedTab : mainTabIds.emailDefaults,
  };
};

const resetState = () => getDefaultState();

const setLoadingState = (state, { loadingState }) => ({
  ...state,
  loadingState,
});

const getTabData = (selectedTab, state) =>
  ({ emailDefaults: state.emailSettings }[selectedTab]);

const loadPurchaseSettings = (state, action) => ({
  ...state,
  shouldDisplayCustomTemplateList: action.shouldDisplayCustomTemplateList,
  templateList: action.templateList,
  emailSettings: {
    ...state.emailSettings,
    ...action.emailSettings,
  },
  tabData: { ...getTabData(state.selectedTab, action) },
});

const updateEmailSettingsField = (state, { key, value }) => ({
  ...state,
  tabData: {
    ...state.tabData,
    [key]: value,
  },
  isPageEdited: true,
});

const getDataType = (selectedTab) =>
  ({
    emailDefaults: 'emailSettings',
  }[selectedTab]);

const saveTabData = (state) => ({
  ...state,
  [getDataType(state.selectedTab)]: state.tabData,
  isPageEdited: false,
});

const setTab = (state, action) => ({
  ...state,
  selectedTab: action.selectedTab,
  pendingTab: '',
  tabData: { ...getTabData(action.selectedTab, state) },
  isPageEdited: false,
});

const setPendingTab = (state, action) => ({
  ...state,
  pendingTab: action.pendingTab,
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
  modalType: '',
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
  [SAVE_TAB_DATA]: saveTabData,
  [SET_TAB]: setTab,
  [SET_PENDING_TAB]: setPendingTab,
};

const purchaseSettingsReducer = createReducer(getDefaultState(), handlers);

export default purchaseSettingsReducer;
