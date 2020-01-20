import { LOAD_NAVIGATION_CONFIG, SET_ROUTE_INFO } from './NavigationIntents';
import Config from '../Config';
import createReducer from '../store/createReducer';

const getDefaultState = () => ({
  businessName: '',
  serialNumber: '',
  userEmail: '',
  enabledFeatures: [],
  isReadOnly: false,
  urls: {},
  routeParams: {},
  currentRouteName: '',
  selfServicePortalUrl: Config.SELF_SERVICE_PORTAL_URL,
  myReportsUrl: Config.MY_REPORTS_URL,
});

const loadBusinessDetails = (state, action) => ({
  ...state,
  businessName: action.businessName,
  serialNumber: action.serialNumber,
  userEmail: action.userEmail,
  enabledFeatures: action.enabledFeatures,
  isReadOnly: action.isReadOnly,
});

const setRouteInfo = (state, action) => ({
  ...state,
  urls: action.urls,
  currentRouteName: action.currentRouteName,
  routeParams: action.routeParams,
});

const handlers = {
  [LOAD_NAVIGATION_CONFIG]: loadBusinessDetails,
  [SET_ROUTE_INFO]: setRouteInfo,
};

const navReducer = createReducer(getDefaultState(), handlers);

export default navReducer;
