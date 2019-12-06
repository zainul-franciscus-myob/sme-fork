import {
  getAddedEntries,
  getFilteredEntriesByKey,
  getUpdatedEntriesByKey,
  getUploadedEntry,
} from '../selectors/InTrayListSelectors';

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

export const setInTrayActiveEntry = (state, { entryId }) => updateInTrayListState(state, {
  activeEntryId: entryId,
});

export const unsetInTrayActiveEntry = state => updateInTrayListState(state, {
  activeEntryId: undefined,
});

export const setInTrayListSortOrder = (state, action) => updateInTrayListState(state, {
  orderBy: action.orderBy,
  sortOrder: action.sortOrder,
});

export const setInTrayListTableLoadingState = (state, action) => updateInTrayListState(
  state,
  { isTableLoading: action.isTableLoading },
);

export const createInTrayDocument = (state, { uploadId, entry }) => {
  const uploadedEntry = getUploadedEntry(uploadId, entry);

  return updateInTrayListState(
    state,
    { entries: getUpdatedEntriesByKey(state, 'uploadId', uploadId, uploadedEntry) },
  );
};

export const deleteInTrayDocument = (state, { id }) => updateInTrayListState(
  state,
  { entries: getFilteredEntriesByKey(state, 'id', id) },
);

export const addInTrayListEntry = (state, { entry }) => updateInTrayListState(
  state,
  { entries: getAddedEntries(state, entry) },
);

export const removeInTrayListEntry = (state, { uploadId }) => updateInTrayListState(
  state,
  { entries: getFilteredEntriesByKey(state, 'uploadId', uploadId) },
);

export const setInTrayListEntrySubmittingState = (state, { id, isSubmitting }) => (
  updateInTrayListState(
    state,
    { entries: getUpdatedEntriesByKey(state, 'id', id, { isSubmitting }) },
  )
);
