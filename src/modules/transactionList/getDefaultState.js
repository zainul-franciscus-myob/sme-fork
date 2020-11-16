import { tabItemIds } from './tabItems';
import LoadMoreButtonStatuses from '../../components/PaginatedListTemplate/LoadMoreButtonStatuses';
import LoadingState from '../../components/PageView/LoadingState';
import Periods from '../../components/PeriodPicker/Periods';

export const JOURNAL_TRANSACTIONS = tabItemIds.journal;
export const DEBITS_AND_CREDITS = tabItemIds.debitsAndCredits;

export const defaultFilterOptions = {
  accountId: undefined,
  sourceJournal: 'All',
  keywords: '',
  period: Periods.thisMonth,
};

export const getDefaultState = () => ({
  activeTab: tabItemIds.debitsAndCredits,
  alert: undefined,
  region: undefined,
  businessId: undefined,
  lastLoadingTab: '',
  accountList: [],
  taxCodeList: [],
  defaultFilterOptions: {
    ...defaultFilterOptions,
  },
  filterOptions: {
    ...defaultFilterOptions,
  },
  sortOrder: 'desc',
  orderBy: 'Date',
  [DEBITS_AND_CREDITS]: {
    entries: [],
    loadingState: LoadingState.LOADING,
    isTableLoading: false,
    isNextPageLoading: false,
    loadMoreButtonStatus: LoadMoreButtonStatuses.HIDDEN,
    pagination: {},
  },
  [JOURNAL_TRANSACTIONS]: {
    entries: [],
    loadingState: LoadingState.LOADING,
    isTableLoading: false,
    isNextPageLoading: false,
    loadMoreButtonStatus: LoadMoreButtonStatuses.HIDDEN,
    pagination: {},
  },
  isFindAndRecodeEnabled: false,
});
