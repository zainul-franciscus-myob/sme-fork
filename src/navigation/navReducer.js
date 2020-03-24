import {
  LOAD_CONFIG, LOAD_NAVIGATION_CONFIG, SET_LOADING_STATE, SET_ROUTE_INFO, SET_URLS,
} from './NavigationIntents';
import createReducer from '../store/createReducer';

const getDefaultState = () => ({
  isLoading: false,
  serialNumber: '',
  userEmail: '',
  enabledFeatures: [],
  isReadOnly: false,
  urls: {},
  routeParams: {},
  currentRouteName: '',
  selfServicePortalUrl: '',
  myReportsUrl: '',
  subscriptionType: '',
  isCurrentUserAdvisor: false,
  isTrial: false,
  trialEndDate: undefined,
});

const setLoadingState = (state, { isLoading }) => ({
  ...state,
  isLoading,
});

const loadBusinessDetails = (state, action) => ({
  ...state,
  serialNumber: action.serialNumber,
  userEmail: action.userEmail,
  enabledFeatures: action.enabledFeatures,
  isReadOnly: action.isReadOnly,
  isTrial: action.isTrial,
  trialEndDate: action.trialEndDate,
  isCurrentUserAdvisor: action.isCurrentUserAdvisor,
  subscriptionType: action.subscriptionType,
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

const loadConfig = (state, {
  selfServicePortalUrl,
  myReportsUrl,
}) => ({
  ...state,
  selfServicePortalUrl,
  myReportsUrl,
});

const handlers = {
  [SET_LOADING_STATE]: setLoadingState,
  [LOAD_NAVIGATION_CONFIG]: loadBusinessDetails,
  [SET_ROUTE_INFO]: setRouteInfo,
  [SET_URLS]: setUrls,
  [LOAD_CONFIG]: loadConfig,
};

const navReducer = createReducer(getDefaultState(), handlers);

export default navReducer;
