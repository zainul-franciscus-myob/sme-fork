import { GET_BUSINESS_ROLES, GET_INDUSTRIES, SET_LOADING_STATE } from './onboardingIntents';
import { RESET_STATE, SET_INITIAL_STATE } from '../SystemIntents';
import createReducer from '../store/createReducer';

const getDefaultState = () => ({
  settings: [],
  isLoading: false,
});

const setInitialState = (state, action) => ({
  ...getDefaultState(),
  ...action.context,
});

const resetState = () => (getDefaultState());

const setLoading = (state, action) => ({
  ...state,
  isLoading: action.isLoading,
});

const setIndustries = (state, action) => {
  const industriesList = action.industries;
  const industries = industriesList && industriesList.map(industry => ({ industry }));

  return {
    ...state,
    industries,
  };
};

const setBusinessRole = (state, action) => {
  const businessRolesList = action.businessRoles;
  const businessRoles = businessRolesList && businessRolesList
    .map(businessRole => ({ businessRole }));

  return {
    ...state,
    businessRoles,
  };
};

const handlers = {
  [SET_INITIAL_STATE]: setInitialState,
  [SET_LOADING_STATE]: setLoading,
  [RESET_STATE]: resetState,
  [GET_BUSINESS_ROLES]: setBusinessRole,
  [GET_INDUSTRIES]: setIndustries,
};

const onboardingReducer = createReducer(getDefaultState(), handlers);

export default onboardingReducer;
