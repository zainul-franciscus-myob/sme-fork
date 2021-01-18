import {
  DISMISS_TASK,
  GET_TASKS_LIST,
  GET_TASKS_LIST_FAILURE,
  LOAD_SETTINGS,
  LOAD_SETTINGS_FAILURE,
  LOAD_SHARED_INFO,
  LOAD_SUBSCRIPTION,
  SAVE_SETTINGS,
  SAVE_SETTINGS_FAILURE,
  SET_BROWSER_ALERT,
  SET_BUSINESS_ID,
  SET_HAS_CHECKED_BROWSER_ALERT,
  SET_LOADING_STATE,
  SET_REGION,
  SET_VIEW_DATA,
  UPDATE_TASKS,
  UPDATE_TASKS_FAILURE,
} from './rootIntents';
import { LOAD_GLOBAL_BUSINESS_DETAILS } from './services/businessDetails/BusinessDetailsIntents';
import createReducer from '../store/createReducer';
import shouldShowOnboarding from './services/shouldShowOnboarding';

const getDefaultState = () => ({
  tasks: [],
  settings: [],
  businessDetails: {},
  currentUser: {},
  subscription: {},
  isLoading: false,
  browserAlert: undefined,
  hasCheckedBrowserAlert: false,
  areOnboardingSettingsLoaded: false,
  proposedBusinessName: '',
  updateTasksFailure: false,
  getTasksListFailure: false,
  getOnboardingSettingsFailure: false,
  updateOnboardingSettingsFailure: false,
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
  getOnboardingSettingsFailure: false,
});

const setViewData = (state, action) => ({
  ...state,
  ...action.data,
});

const loadTasks = (state, action) => {
  return {
    ...state,
    tasks: action.payload,
    getTasksListFailure: false,
  };
};

const updateTasks = (state, { tasks: newTasks }) => {
  const oldTasks = state.tasks;

  if (newTasks) {
    const mergedTasks = oldTasks.map((oldTask) => {
      const newTaskIndex = newTasks.findIndex((t) => t.key === oldTask.key);

      if (newTaskIndex < 0) return oldTask;

      const newTask = newTasks[newTaskIndex];
      newTasks.splice(newTaskIndex, 1);
      return newTask;
    });

    if (newTasks.length > 0) {
      mergedTasks.push(...newTasks);
    }

    return {
      ...state,
      tasks: mergedTasks,
      updateTasksFailure: false,
    };
  }

  return { ...state, tasks: oldTasks };
};

const setUpdateTasksFailure = (state, { updateTasksFailure }) => {
  return {
    ...state,
    updateTasksFailure,
  };
};

const setUpdateOnboardingSettingsFailure = (
  state,
  { updateOnboardingSettingsFailure }
) => {
  return {
    ...state,
    updateOnboardingSettingsFailure,
  };
};

const setGetTasksListFailure = (state, { getTasksListFailure }) => {
  return {
    ...state,
    getTasksListFailure,
  };
};

const setGetOnboardingSettingsFailure = (
  state,
  { getOnboardingSettingsFailure }
) => {
  return {
    ...state,
    getOnboardingSettingsFailure,
    shouldShowOnboarding: false,
    areOnboardingSettingsLoaded: false,
  };
};

const dismissTask = (state, { taskKey }) => {
  const tasks = state.tasks.filter((task) => task.key !== taskKey);

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

const loadSharedInfo = (state, { sharedInfo }) => ({
  ...state,
  ...sharedInfo,
});

const loadSubscription = (state, { subscription }) => ({
  ...state,
  subscription,
});

const setBrowserAlert = (state, { alert }) => ({
  ...state,
  browserAlert: alert,
});

const setHasCheckedBrowserAlert = (state) => ({
  ...state,
  hasCheckedBrowserAlert: true,
});

const handlers = {
  [SET_LOADING_STATE]: setLoading,
  [LOAD_SETTINGS]: setOnboarding,
  [LOAD_SETTINGS_FAILURE]: setGetOnboardingSettingsFailure,
  [SAVE_SETTINGS]: setOnboarding,
  [SAVE_SETTINGS_FAILURE]: setUpdateOnboardingSettingsFailure,
  [SET_VIEW_DATA]: setViewData,
  [SET_BUSINESS_ID]: setBusinessId,
  [SET_REGION]: setRegion,
  [GET_TASKS_LIST]: loadTasks,
  [GET_TASKS_LIST_FAILURE]: setGetTasksListFailure,
  [UPDATE_TASKS]: updateTasks,
  [UPDATE_TASKS_FAILURE]: setUpdateTasksFailure,
  [LOAD_GLOBAL_BUSINESS_DETAILS]: loadBusinessDetails,
  [DISMISS_TASK]: dismissTask,
  [LOAD_SHARED_INFO]: loadSharedInfo,
  [LOAD_SUBSCRIPTION]: loadSubscription,
  [SET_BROWSER_ALERT]: setBrowserAlert,
  [SET_HAS_CHECKED_BROWSER_ALERT]: setHasCheckedBrowserAlert,
};

const rootReducer = createReducer(getDefaultState(), handlers);

export default rootReducer;
