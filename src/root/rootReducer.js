import {
  GET_TASKS_LIST, LOAD_SETTINGS, SAVE_SETTINGS,
  SET_BUSINESS_ID, SET_LOADING_STATE, SET_REGION,
  SET_VIEW_DATA, UPDATE_TASKS,
} from './rootIntents';
import { LOAD_GLOBAL_BUSINESS_DETAILS } from './services/businessDetails/BusinessDetailsIntents';
import createReducer from '../store/createReducer';
import shouldShowOnboarding from './services/shouldShowOnboarding';

const getDefaultState = () => ({
  tasks: [],
  settings: [],
  businessDetails: {},
  isLoading: false,
  areOnboardingSettingsLoaded: false,
  proposedBusinessName: '',
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

const loadTasks = (state, action) => ({
  ...state,
  tasks: action.payload,
});


const updateTasks = (state, { tasks: updatedTasks }) => {
  const oldTasks = state.tasks;

  const newTasks = oldTasks.map((oldTask) => {
    const newTask = updatedTasks.find(
      updatedTask => updatedTask.key === oldTask.key,
    );
    return newTask || oldTask;
  });

  return { ...state, tasks: newTasks };
};

const loadBusinessDetails = (state, { businessDetails }) => ({
  ...state,
  proposedBusinessName: businessDetails.organisationName,
  businessDetails,
});

const handlers = {
  [SET_LOADING_STATE]: setLoading,
  [LOAD_SETTINGS]: setOnboarding,
  [SAVE_SETTINGS]: setOnboarding,
  [SET_VIEW_DATA]: setViewData,
  [SET_BUSINESS_ID]: setBusinessId,
  [SET_REGION]: setRegion,
  [GET_TASKS_LIST]: loadTasks,
  [UPDATE_TASKS]: updateTasks,
  [LOAD_GLOBAL_BUSINESS_DETAILS]: loadBusinessDetails,
};

const rootReducer = createReducer(getDefaultState(), handlers);

export default rootReducer;
