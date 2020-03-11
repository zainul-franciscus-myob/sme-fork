import {
  DISMISS_TASK, GET_TASKS_LIST, LOAD_SETTINGS,
  SAVE_SETTINGS, SET_BUSINESS_ID, SET_LOADING_STATE,
  SET_REGION, SET_VIEW_DATA, UPDATE_TASKS,
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


const updateTasks = (state, { tasks: newTasks }) => {
  const oldTasks = state.tasks;

  const mergedTasks = oldTasks.map((oldTask) => {
    const newTaskIndex = newTasks.findIndex(t => t.key === oldTask.key);

    if (newTaskIndex < 0) return oldTask;

    const newTask = newTasks[newTaskIndex];
    newTasks.splice(newTaskIndex, 1);
    return newTask;
  });

  if (newTasks.length > 0) {
    mergedTasks.push(...newTasks);
  }

  return { ...state, tasks: mergedTasks };
};

const dismissTask = (state, { taskKey }) => {
  const tasks = state.tasks.filter(task => task.key !== taskKey);

  return {
    ...state,
    tasks,
  };
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
  [DISMISS_TASK]: dismissTask,
};

const rootReducer = createReducer(getDefaultState(), handlers);

export default rootReducer;
