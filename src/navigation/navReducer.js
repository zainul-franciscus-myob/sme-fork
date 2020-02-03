import { LOAD_CONFIG, LOAD_NAVIGATION_CONFIG, SET_ROUTE_INFO } from './NavigationIntents';
import createReducer from '../store/createReducer';

const getDefaultState = () => ({
  serialNumber: '',
  userEmail: '',
  enabledFeatures: [],
  isReadOnly: false,
  urls: {},
  routeParams: {},
  currentRouteName: '',
  selfServicePortalUrl: '',
  myReportsUrl: '',
  isCurrentUserAdvisor: false,
});

const loadBusinessDetails = (state, action) => ({
  ...state,
  serialNumber: action.serialNumber,
  userEmail: action.userEmail,
  enabledFeatures: action.enabledFeatures,
  isReadOnly: action.isReadOnly,
  trialEndDate: action.trialEndDate,
  isCurrentUserAdvisor: action.isCurrentUserAdvisor,
});

const setRouteInfo = (state, action) => ({
  ...state,
  urls: action.urls,
  currentRouteName: action.currentRouteName,
  routeParams: action.routeParams,
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
  [LOAD_NAVIGATION_CONFIG]: loadBusinessDetails,
  [SET_ROUTE_INFO]: setRouteInfo,
  [LOAD_CONFIG]: loadConfig,
};

const navReducer = createReducer(getDefaultState(), handlers);

export default navReducer;
