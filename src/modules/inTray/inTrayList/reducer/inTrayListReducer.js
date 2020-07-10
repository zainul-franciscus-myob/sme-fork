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

export const sortAndFilterInTrayList = (state, action) => {
  const { entries } = action;
  const { activeEntryId } = state;
  const isActiveEntryIdExist = entries.some(
    (entry) => entry.id === activeEntryId
  );
  return updateInTrayListState(state, {
    entries,
    activeEntryId: isActiveEntryIdExist ? activeEntryId : undefined,
  });
};

export const setInTrayListFilterOption = (state, action) =>
  updateInTrayListState(state, {
    filterOptions: {
      ...state.inTrayList.filterOptions,
      [action.key]: action.value,
    },
  });

export const setInTrayActiveEntry = (state, { entryId }) =>
  updateInTrayListState(state, {
    activeEntryId: entryId,
  });

export const unsetInTrayActiveEntry = (state) =>
  updateInTrayListState(state, {
    activeEntryId: undefined,
  });

export const setInTrayListSortOrder = (state, action) =>
  updateInTrayListState(state, {
    orderBy: action.orderBy,
    sortOrder: action.sortOrder,
  });

export const setInTrayListTableLoadingState = (state, action) =>
  updateInTrayListState(state, { isTableLoading: action.isTableLoading });

export const createInTrayDocument = (state, { uploadId, entry }) => {
  const uploadedEntry = getUploadedEntry(uploadId, entry);

  return updateInTrayListState(state, {
    entries: getUpdatedEntriesByKey(state, 'uploadId', uploadId, uploadedEntry),
  });
};

export const deleteInTrayDocument = (state, { id }) =>
  updateInTrayListState(state, {
    entries: getFilteredEntriesByKey(state, 'id', id),
    activeEntryId: state.activeEntryId === id ? undefined : state.activeEntryId,
  });

export const addInTrayListEntry = (state, { entry }) =>
  updateInTrayListState(state, { entries: getAddedEntries(state, entry) });

export const removeInTrayListEntry = (state, { uploadId }) =>
  updateInTrayListState(state, {
    entries: getFilteredEntriesByKey(state, 'uploadId', uploadId),
  });

export const setInTrayListEntrySubmittingState = (
  state,
  { id, isSubmitting }
) =>
  updateInTrayListState(state, {
    entries: getUpdatedEntriesByKey(state, 'id', id, { isSubmitting }),
  });

export const pollInTrayList = (state, { entries }) =>
  updateInTrayListState(state, {
    entries: state.inTrayList.entries.map((stateEntry) => {
      const pollEntry =
        entries.find((entry) => entry.id === stateEntry.id) || stateEntry;
      return {
        ...stateEntry,
        ...pollEntry,
      };
    }),
  });
