import {
  LOAD_NAVIGATION_CONFIG,
  SET_ROUTE_INFO,
} from './NavigationIntents';
import createReducer from '../store/createReducer';

const getDefaultState = () => ({
  businessName: '',
  enabledFeatures: [],
  isReadOnly: false,
  urls: {},
  routeParams: {},
  currentRouteName: '',
});

const loadBusinessDetails = (state, action) => ({
  ...state,
  businessName: action.businessName,
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
