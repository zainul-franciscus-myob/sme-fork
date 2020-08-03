import getDefaultState from './getDefaultState';

const updateEmploymentClassificationListState = (
  state,
  employmentClassificationListState
) => ({
  ...state,
  employmentClassificationList: {
    ...state.employmentClassificationList,
    ...employmentClassificationListState,
  },
});

export const loadEmploymentClassificationList = (state, action) =>
  updateEmploymentClassificationListState(state, {
    entries: action.entries,
    sortOrder: action.sortOrder,
    orderBy: action.orderBy,
  });

export const sortAndFilterEmploymentClassificationList = (state, action) =>
  updateEmploymentClassificationListState(state, {
    entries: action.entries,
  });

export const setEmploymentClassificationListFilterOption = (state, action) =>
  updateEmploymentClassificationListState(state, {
    filterOptions: {
      ...state.employmentClassificationList.filterOptions,
      [action.key]: action.value,
    },
  });

export const resetEmploymentClassificationListFilterOption = (state) =>
  updateEmploymentClassificationListState(state, {
    filterOptions: getDefaultState().employmentClassificationList.filterOptions,
  });

export const setEmploymentClassificationListSortOrder = (state, action) =>
  updateEmploymentClassificationListState(state, {
    orderBy: action.orderBy,
    sortOrder: action.sortOrder,
  });

export const setEmploymentClassificationListLoadingState = (
  state,
  { loadingState }
) =>
  updateEmploymentClassificationListState(state, {
    loadingState,
  });

export const setEmploymentClassificationListTableLoadingState = (
  state,
  action
) =>
  updateEmploymentClassificationListState(state, {
    isTableLoading: action.isTableLoading,
  });
