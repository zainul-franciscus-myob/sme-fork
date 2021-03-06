import {
  LOAD_CONFIG,
  LOAD_NAVIGATION_CONFIG,
  SET_DISPLAY_ACCOUNT_BILLING_MENU_TEXT,
  SET_IS_NON_GST_FEATURE_TOGGLE,
  SET_LOADING_STATE,
  SET_MOVE_TO_MYOB_FEATURE_TOGGLE,
  SET_NZPAYROLL_ACCOUNTING_FEATURE_TOGGLE,
  SET_NZPAYROLL_PAYRUNS_VIEW_FEATURE_TOGGLE,
  SET_PAYDAY_FILING_FEATURE_TOGGLE,
  SET_PURCHASE_ORDER_FEATURE_TOGGLE,
  SET_RECURRING_TRANSACTION_FEATURE_TOGGLE,
  SET_ROUTE_INFO,
  SET_URLS,
} from './NavigationIntents';
import createReducer from '../store/createReducer';

const getDefaultState = () => ({
  currentRouteName: '',
  enabledFeatures: [],
  isCurrentUserAdvisor: false,
  isLoading: false,
  isReadOnly: false,
  isTrial: false,
  isRegisteredForGst: false,
  myReportsUrl: '',
  myobUrl: '',
  myobTeamUrl: '',
  routeParams: {},
  selfServicePortalUrl: '',
  serialNumber: '',
  subscriptionType: '',
  trialEndDate: undefined,
  urls: {},
  userEmail: '',
  isCustomizedForNonGstEnabled: false,
});

const setLoadingState = (state, { isLoading }) => ({
  ...state,
  isLoading,
});

const loadBusinessDetails = (state, action) => ({
  ...state,
  enabledFeatures: action.enabledFeatures,
  isCurrentUserAdvisor: action.isCurrentUserAdvisor,
  isReadOnly: action.isReadOnly,
  isTrial: action.isTrial,
  serialNumber: action.serialNumber,
  subscriptionType: action.subscriptionType,
  trialEndDate: action.trialEndDate,
  userEmail: action.userEmail,
  isRegisteredForGst: action.isRegisteredForGst,
});

const setRouteInfo = (state, action) => ({
  ...state,
  currentRouteName: action.currentRouteName,
  routeParams: action.routeParams,
});

const setUrls = (state, action) => ({
  ...state,
  urls: action.urls,
});

const loadConfig = (
  state,
  { selfServicePortalUrl, myReportsUrl, myobUrl, myobTeamUrl }
) => ({
  ...state,
  selfServicePortalUrl,
  myReportsUrl,
  myobUrl,
  myobTeamUrl,
});

const setRecurringTransactionFeatureToggle = (
  state,
  { isRecurringTransactionEnabled }
) => ({
  ...state,
  isRecurringTransactionEnabled,
});

const setPayRunsViewFeatureToggle = (state, { isNzPayRunsViewEnabled }) => ({
  ...state,
  isNzPayRunsViewEnabled,
});

const setNzPayrollAccountingFeatureToggle = (
  state,
  { isNzPayrollAccountingEnabled }
) => ({
  ...state,
  isNzPayrollAccountingEnabled,
});

const setPaydayFilingFeatureToggle = (state, { isPaydayFilingEnabled }) => ({
  ...state,
  isPaydayFilingEnabled,
});

const setMoveToMyobFeatureToggle = (state, { isMoveToMyobEnabled }) => ({
  ...state,
  isMoveToMyobEnabled,
});

const setIsCustomizedForNonGstFeatureToggle = (
  state,
  { isCustomizedForNonGstEnabled }
) => ({
  ...state,
  isCustomizedForNonGstEnabled,
});

const setAccountBillingMenuTextFeatureToggle = (
  state,
  { shouldDisplayAccountBillingMenuText }
) => ({
  ...state,
  shouldDisplayAccountBillingMenuText,
});

const setPurchaseOrderFeatureToggle = (state, { isPurchaseOrderEnabled }) => ({
  ...state,
  isPurchaseOrderEnabled,
});

const handlers = {
  [SET_LOADING_STATE]: setLoadingState,
  [LOAD_NAVIGATION_CONFIG]: loadBusinessDetails,
  [SET_DISPLAY_ACCOUNT_BILLING_MENU_TEXT]: setAccountBillingMenuTextFeatureToggle,
  [SET_ROUTE_INFO]: setRouteInfo,
  [SET_URLS]: setUrls,
  [LOAD_CONFIG]: loadConfig,
  [SET_RECURRING_TRANSACTION_FEATURE_TOGGLE]: setRecurringTransactionFeatureToggle,
  [SET_NZPAYROLL_PAYRUNS_VIEW_FEATURE_TOGGLE]: setPayRunsViewFeatureToggle,
  [SET_NZPAYROLL_ACCOUNTING_FEATURE_TOGGLE]: setNzPayrollAccountingFeatureToggle,
  [SET_PAYDAY_FILING_FEATURE_TOGGLE]: setPaydayFilingFeatureToggle,
  [SET_PURCHASE_ORDER_FEATURE_TOGGLE]: setPurchaseOrderFeatureToggle,
  [SET_MOVE_TO_MYOB_FEATURE_TOGGLE]: setMoveToMyobFeatureToggle,
  [SET_IS_NON_GST_FEATURE_TOGGLE]: setIsCustomizedForNonGstFeatureToggle,
};

const navReducer = createReducer(getDefaultState(), handlers);

export default navReducer;
