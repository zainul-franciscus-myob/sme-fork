import getDefaultState from './getDefaultState';

export const setNewEmploymentClassificationInitialState = (state) => ({
  ...state,
  employmentClassificationDetail: {
    ...getDefaultState().employmentClassificationDetail,
  },
});

export const setEmploymentClassificationInitialState = (state, action) => ({
  ...state,
  employmentClassificationDetail: {
    ...getDefaultState().employmentClassificationDetail,
    id: action.context.id,
  },
});

export const setEmploymentClassificationDetailIsLoading = (state, action) => ({
  ...state,
  employmentClassificationDetail: {
    ...state.employmentClassificationDetail,
    isLoading: action.isLoading,
  },
});

export const setEmploymentClassificationDetailAlert = (state, action) => ({
  ...state,
  employmentClassificationDetail: {
    ...state.employmentClassificationDetail,
    alert: action.alert,
  },
});

export const loadEmploymentClassificationDetail = (state, action) => ({
  ...state,
  employmentClassificationDetail: {
    ...state.employmentClassificationDetail,
    id: action.employmentClassification.id,
    description: action.employmentClassification.description,
  },
});

export const loadNewEmploymentClassificationDetail = (state, action) => ({
  ...state,
  employmentClassificationDetail: {
    ...state.employmentClassificationDetail,
    description: action.employmentClassification.description,
  },
});

export const changeEmploymentClassificationDetail = (state, action) => ({
  ...state,
  employmentClassificationDetail: {
    ...state.employmentClassificationDetail,
    [action.key]: action.value,
  },
});
