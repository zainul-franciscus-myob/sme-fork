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
  pagination: {},
  sortOrder: 'desc',
  orderBy: 'Date',
  isLoading: true,
  isTableLoading: false,
  isNextPageLoading: false,
});

export default getDefaultState;
