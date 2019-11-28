export const defaultFilterOptions = {
  sourceJournal: 'All',
  keywords: '',
};

const getDefaultState = () => ({
  entries: [],
  sourceJournalFilters: [],
  defaultFilterOptions: {
    ...defaultFilterOptions,
  },
  filterOptions: {
    ...defaultFilterOptions,
  },
  appliedFilterOptions: {
    ...defaultFilterOptions,
  },
  sortOrder: 'desc',
  orderBy: 'Date',
  isLoading: true,
  isTableLoading: false,
});

export default getDefaultState;
