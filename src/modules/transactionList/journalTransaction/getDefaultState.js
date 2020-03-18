import LoadingState from '../../../components/PageView/LoadingState';

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
  loadingState: LoadingState.LOADING,
  isTableLoading: false,
  isNextPageLoading: false,
});

export default getDefaultState;
