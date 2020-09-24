import {
  LOAD_JOB_COMBOBOX_OPTIONS,
  LOAD_JOB_COMBOBOX_OPTIONS_BY_IDS,
  LOAD_JOB_COMBOBOX_OPTION_BY_ID,
  SET_JOB_COMBOBOX_LOADING_STATE,
  SET_JOB_COMBOBOX_OPTIONS_LOADING_STATE,
  UPDATE_JOB_COMBOBOX_OPTIONS,
} from '../JobIntents';
import { RESET_STATE, SET_INITIAL_STATE } from '../../../SystemIntents';
import createReducer from '../../../store/createReducer';

const getDefaultState = () => ({
  businessId: '',
  region: '',
  jobOptions: [],
  pagination: {
    hasNextPage: false,
    offset: 0,
  },
  isLoading: false,
  isOptionsLoading: true,
});

const setInitialState = (state, action) => ({
  ...state,
  ...action.context,
});

const resetState = () => getDefaultState();

const setJobComboboxLoadingState = (state, { isLoading }) => ({
  ...state,
  isLoading,
});

const setJobOptionsLoadingState = (state, { isLoading }) => ({
  ...state,
  isOptionsLoading: isLoading,
});

const getUniqueSetOfJobOptions = (topOptions, bottomOptions) => {
  const topOptionIds = new Set(topOptions.map(({ id }) => id));
  return [
    ...topOptions,
    ...bottomOptions.filter(({ id }) => !topOptionIds.has(id)),
  ];
};

const loadJobComboboxOptions = (state, { jobOptions, pagination }) => ({
  ...state,
  jobOptions: getUniqueSetOfJobOptions(state.jobOptions, jobOptions),
  pagination: {
    ...state.pagination,
    ...pagination,
  },
});

const isOptionExisted = (stateOptions, updatedOption) =>
  stateOptions.some((stateOption) => stateOption.id === updatedOption.id);
const getUpdatedJobOptions = (stateOptions, updatedOption) =>
  isOptionExisted(stateOptions, updatedOption)
    ? stateOptions.map((option) =>
        option.id === updatedOption.id ? updatedOption : option
      )
    : [updatedOption, ...stateOptions];

const loadJobComboboxOptionById = (state, { job }) => ({
  ...state,
  jobOptions: getUpdatedJobOptions(state.jobOptions, job),
});

const loadJobComboboxOptionsByIds = (state, { jobs }) => ({
  ...state,
  jobOptions: getUniqueSetOfJobOptions(jobs, state.jobOptions),
});

const updateJobComboboxOptions = (state, { job }) => ({
  ...state,
  jobOptions: getUpdatedJobOptions(state.jobOptions, job),
});

const handlers = {
  [SET_INITIAL_STATE]: setInitialState,
  [RESET_STATE]: resetState,
  [SET_JOB_COMBOBOX_LOADING_STATE]: setJobComboboxLoadingState,
  [SET_JOB_COMBOBOX_OPTIONS_LOADING_STATE]: setJobOptionsLoadingState,
  [LOAD_JOB_COMBOBOX_OPTIONS]: loadJobComboboxOptions,
  [LOAD_JOB_COMBOBOX_OPTION_BY_ID]: loadJobComboboxOptionById,
  [LOAD_JOB_COMBOBOX_OPTIONS_BY_IDS]: loadJobComboboxOptionsByIds,
  [UPDATE_JOB_COMBOBOX_OPTIONS]: updateJobComboboxOptions,
};

export default createReducer(getDefaultState(), handlers);
