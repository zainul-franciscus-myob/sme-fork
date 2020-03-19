import LoadMoreButtonStatuses from '../../../components/PaginatedListTemplate/LoadMoreButtonStatuses';
import LoadingState from '../../../components/PageView/LoadingState';
import Periods from '../../../components/PeriodPicker/Periods';

const getDefaultState = () => ({
  entries: [],
  sourceJournalFilters: [],
  accountList: [],
  filterOptions: {
    accountId: undefined,
    sourceJournal: 'All',
    keywords: '',
    period: Periods.thisMonth,
  },
  sortOrder: 'desc',
  orderBy: 'Date',
  loadingState: LoadingState.LOADING,
  isTableLoading: false,
  loadMoreButtonStatus: LoadMoreButtonStatuses.HIDDEN,
  pagination: {},
});

export default getDefaultState;
