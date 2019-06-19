const updateSuperFundListState = (state, superFundListState) => ({
  ...state,
  superFundList: {
    ...state.superFundList,
    ...superFundListState,
  },
});

export const loadSuperFundList = (state, action) => updateSuperFundListState(state, {
  entries: action.entries,
  sortOrder: action.sortOrder,
  orderBy: action.orderBy,
});

export const sortAndFilterSuperFundList = (state, action) => updateSuperFundListState(state, {
  appliedFilterOptions: action.isSort
    ? state.superFundList.appliedFilterOptions
    : state.superFundList.filterOptions,
  entries: action.entries,
});

export const setSuperFundListFilterOption = (state, action) => updateSuperFundListState(state, {
  filterOptions: {
    ...state.superFundList.filterOptions,
    [action.key]: action.value,
  },
});

export const setSuperFundListSortOrder = (state, action) => updateSuperFundListState(state, {
  orderBy: action.orderBy,
  sortOrder: action.sortOrder,
});

export const setSuperFundListLoadingState = (state, action) => updateSuperFundListState(state, {
  isLoading: action.isLoading,
});

export const setSuperFundListTableLoadingState = (state, action) => updateSuperFundListState(
  state,
  { isTableLoading: action.isTableLoading },
);
