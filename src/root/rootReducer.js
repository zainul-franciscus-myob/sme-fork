import {
  GET_ACTIVITIES_LIST, LOAD_SETTINGS, SAVE_SETTINGS,
  SET_BUSINESS_ID, SET_LOADING_STATE, SET_REGION,
  SET_VIEW_DATA, UPDATE_ACTIVITIES, UPDATE_ACTIVITY,
} from './rootIntents';
import createReducer from '../store/createReducer';
import shouldShowOnboarding from './services/shouldShowOnboarding';

const getDefaultState = () => ({
  activities: [],
  settings: [],
  businessName: '',
  isLoading: false,
  areOnboardingSettingsLoaded: false,
});

const setBusinessId = (state, { businessId }) => ({
  ...state,
  businessId,
});

const setRegion = (state, { region }) => ({
  ...state,
  region,
});

const setLoading = (state, action) => ({
  ...state,
  isLoading: action.isLoading,
});

const setOnboarding = (state, action) => ({
  ...state,
  ...action.settings,
  shouldShowOnboarding: shouldShowOnboarding(action.settings),
  areOnboardingSettingsLoaded: true,
});

const setViewData = (state, action) => ({
  ...state,
  ...action.data,
});

const loadActivities = (state, action) => ({
  ...state,
  activities: action.payload,
});

const updateActivity = (state, action) => {
  const { payload } = action;

  const activities = state.activities.map((activity) => {
    if (activity.id === payload.id) return { ...activity, ...payload };
    return activity;
  });

  return { ...state, activities };
};

const updateActivities = (state, { activities: updatedActivities }) => {
  const currentActivities = state.activities;

  const newActivities = currentActivities.map((currentActivity) => {
    const activityToUpdate = updatedActivities.find(
      updatedActivity => updatedActivity.id === currentActivity.id,
    );

    if (activityToUpdate) return activityToUpdate;

    return currentActivity;
  });

  return { ...state, activities: newActivities };
};

const handlers = {
  [SET_LOADING_STATE]: setLoading,
  [LOAD_SETTINGS]: setOnboarding,
  [SAVE_SETTINGS]: setOnboarding,
  [SET_VIEW_DATA]: setViewData,
  [GET_ACTIVITIES_LIST]: loadActivities,
  [UPDATE_ACTIVITY]: updateActivity,
  [UPDATE_ACTIVITIES]: updateActivities,
  [SET_BUSINESS_ID]: setBusinessId,
  [SET_REGION]: setRegion,
};

const onboardingReducer = createReducer(getDefaultState(), handlers);

export default onboardingReducer;
