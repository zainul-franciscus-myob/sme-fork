import { RESET_STATE, SET_INITIAL_STATE } from '../../SystemIntents';
import {
  SET_ALERT,
  SET_BUSINESS_NAME,
  SET_BUSINESS_ROLE,
  SET_INDUSTRY,
  SET_LOADING_STATE,
  SET_ONBOARDING_DETAILS,
  SET_USING_COMPETITOR_PRODUCT,
} from './OnboardingIntents';
import LoadingState from '../../components/PageView/LoadingState';
import createReducer from '../../store/createReducer';

const getDefaultState = () => ({
  alert: undefined,
  businessId: '',
  businessName: '',
  businessRole: '',
  businessRoles: [],
  industryId: '',
  industries: [],
  region: '',
  loadingState: LoadingState.LOADING,
  isMoveToMyobEnabled: false,
  isBusinessNameEdited: false,
  isIndustryEdited: false,
  isBusinessRoleEdited: false,
  usingCompetitorProduct: false,
});

const resetState = () => getDefaultState();

const setBusinessName = (state, { businessName }) => ({
  ...state,
  businessName,
  isBusinessNameEdited: true,
});

const setBusinessRole = (state, { businessRole }) => ({
  ...state,
  businessRole,
  isBusinessRoleEdited: true,
});

const setIndustry = (state, { industryId }) => ({
  ...state,
  industryId,
  isIndustryEdited: true,
});

const setInitialState = (state, action) => ({
  ...state,
  ...action.context,
});

const loadOnboardingDetails = (state, action) => ({
  ...state,
  ...action.onboardingDetails,
});

const setLoadingState = (state, { loadingState }) => ({
  ...state,
  loadingState,
});

const setUsingCompetitorProduct = (state, { usingCompetitorProduct }) => ({
  ...state,
  usingCompetitorProduct,
});

const setAlert = (state, { alert }) => ({
  ...state,
  alert,
});

const handlers = {
  [RESET_STATE]: resetState,
  [SET_ALERT]: setAlert,
  [SET_BUSINESS_NAME]: setBusinessName,
  [SET_ONBOARDING_DETAILS]: loadOnboardingDetails,
  [SET_INITIAL_STATE]: setInitialState,
  [SET_LOADING_STATE]: setLoadingState,
  [SET_INDUSTRY]: setIndustry,
  [SET_BUSINESS_ROLE]: setBusinessRole,
  [SET_USING_COMPETITOR_PRODUCT]: setUsingCompetitorProduct,
};

const onboardingReducer = createReducer(getDefaultState(), handlers);

export default onboardingReducer;
