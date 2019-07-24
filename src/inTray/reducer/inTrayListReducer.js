const updateInTrayListState = (state, inTrayListState) => ({
  ...state,
  inTrayList: {
    ...state.inTrayList,
    ...inTrayListState,
  },
});

export const sortAndFilterInTrayList = (state, action) => updateInTrayListState(state, {
  appliedFilterOptions: action.isSort
    ? state.inTrayList.appliedFilterOptions
    : state.inTrayList.filterOptions,
  entries: action.entries,
});

export const setInTrayListFilterOption = (state, action) => updateInTrayListState(state, {
  filterOptions: {
    ...state.inTrayList.filterOptions,
    [action.key]: action.value,
  },
});

export const setInTrayListSortOrder = (state, action) => updateInTrayListState(state, {
  orderBy: action.orderBy,
  sortOrder: action.sortOrder,
});

export const setInTrayListTableLoadingState = (state, action) => updateInTrayListState(
  state,
  { isTableLoading: action.isTableLoading },
);
