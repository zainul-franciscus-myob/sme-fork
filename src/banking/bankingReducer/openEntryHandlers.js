import getDefaultState from './getDefaultState';

export const collapseTransactionLine = (state) => {
  const defaultState = getDefaultState();

  return ({
    ...state,
    openPosition: defaultState.openPosition,
    isOpenEntryLoading: defaultState.isOpenEntryLoading,
    openEntry: defaultState.openEntry,
  });
};

export const loadOpenEntry = (state, index, propName, propValue, isCreating) => ({
  ...state,
  openPosition: index,
  openEntry: {
    ...getDefaultState().openEntry,
    isCreating,
    activeTabId: propName,
    [propName]: propValue,
  },
});

export const setOpenEntryLoadingState = (state, action) => ({
  ...state,
  isOpenEntryLoading: action.isLoading,
});

export const setOpenPosition = (state, action) => ({
  ...state,
  openPosition: action.index,
});
