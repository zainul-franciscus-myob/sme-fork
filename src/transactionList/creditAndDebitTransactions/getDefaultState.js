import LoadMoreButtonStatuses from '../../components/PaginatedListTemplate/LoadMoreButtonStatuses';
import Periods from '../../components/PeriodPicker/Periods';

const getDefaultState = () => ({
  entries: [],
  sourceJournalFilters: [],
  accountList: [],
  filterOptions: {
    accountId: 'All',
    sourceJournal: 'All',
    keywords: '',
    period: Periods.thisMonth,
  },
  appliedFilterOptions: {
    accountId: 'All',
    sourceJournal: 'All',
    keywords: '',
    period: Periods.thisMonth,
  },
  sortOrder: 'desc',
  orderBy: 'Date',
  isLoading: true,
  isTableLoading: false,
  loadMoreButtonStatus: LoadMoreButtonStatuses.HIDDEN,
  pagination: {},
});

export default getDefaultState;
