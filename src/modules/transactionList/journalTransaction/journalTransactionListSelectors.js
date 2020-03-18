import { createSelector, createStructuredSelector } from 'reselect';

import { businessEventToFeatureMap } from '../../../common/types/BusinessEventTypeMap';
import { tabItemIds } from '../tabItems';
import LoadMoreButtonStatuses from '../../../components/PaginatedListTemplate/LoadMoreButtonStatuses';
import LoadingState from '../../../components/PageView/LoadingState';
import shallowCompare from '../../../common/shallowCompare/shallowCompare';

const getJournalState = state => state.journalTransactions;

export const getIsActive = state => state.activeTab === tabItemIds.journal;

export const getOrder = createSelector(
  getJournalState,
  ({ sortOrder, orderBy }) => ({
    column: orderBy,
    descending: sortOrder === 'desc',
  }),
);

export const getSortOrder = createSelector(
  getJournalState,
  ({ sortOrder }) => sortOrder,
);

export const getFlipSortOrder = createSelector(
  getJournalState,
  ({ sortOrder }) => (sortOrder === 'desc' ? 'asc' : 'desc'),
);

export const getOrderBy = createSelector(
  getJournalState,
  ({ orderBy }) => orderBy,
);

export const getFilterOptions = createSelector(
  getJournalState,
  ({ filterOptions }) => filterOptions,
);

export const getRequestFilterOptions = createSelector(
  getFilterOptions,
  ({ period, ...requestFilterOptions }) => requestFilterOptions,
);

export const getSourceJournalFilterOptions = createSelector(
  getJournalState,
  ({ sourceJournalFilters }) => sourceJournalFilters.map(
    filter => ({
      label: filter.name,
      value: filter.value,
    }),
  ),
);

export const getEntries = createSelector(
  getJournalState,
  state => state.entries,
);

const getEntryLink = (entry, businessId, region) => {
  const {
    id,
    businessEventType,
  } = entry;
  const feature = businessEventToFeatureMap[businessEventType];

  return feature ? `/#/${region}/${businessId}/${feature}/${id}` : undefined;
};

export const getBusinessId = state => state.businessId;
export const getRegion = state => state.region;

export const getTableEntries = createSelector(
  getEntries,
  getBusinessId,
  getRegion,
  (entries, businessId, region) => entries.map(
    entry => ({
      ...entry,
      link: getEntryLink(entry, businessId, region),
    }),
  ),
);

export const getIsTableEmpty = createSelector(
  getJournalState,
  ({ entries }) => entries.length === 0,
);

export const getIsTableLoading = createSelector(
  getJournalState,
  state => state.isTableLoading,
);

export const getLoadingState = createSelector(
  getJournalState,
  state => state.loadingState,
);

export const getIsLoaded = createSelector(
  getLoadingState,
  loadingState => loadingState !== LoadingState.LOADING,
);

const getSourceJournal = createSelector(
  getJournalState,
  state => state.filterOptions.sourceJournal,
);

export const getURLParams = createStructuredSelector({
  sourceJournal: getSourceJournal,
});

const getDefaultFilterOptions = createSelector(
  getJournalState,
  state => state.defaultFilterOptions,
);

export const getIsDefaultFilters = createSelector(
  getFilterOptions,
  getDefaultFilterOptions,
  (filterOptions, defaultFilterOptions) => shallowCompare(
    filterOptions,
    defaultFilterOptions,
  ),
);

export const getSettings = createSelector(
  getFilterOptions,
  getSortOrder,
  getOrderBy,
  (filterOptions, sortOrder, orderBy) => ({
    filterOptions,
    sortOrder,
    orderBy,
  }),
);

export const getLoadMoreButtonStatus = createSelector(
  getJournalState,
  (state) => {
    const isLastPage = !state.pagination.hasNextPage;
    const { isTableLoading } = state;

    if (isLastPage || isTableLoading) {
      return LoadMoreButtonStatuses.HIDDEN;
    }

    if (state.isNextPageLoading) {
      return LoadMoreButtonStatuses.LOADING;
    }

    return LoadMoreButtonStatuses.SHOWN;
  },
);

export const getOffset = createSelector(
  getJournalState,
  state => state.pagination.offset,
);

export const getLoadTransactionListNextPageParams = createSelector(
  getFilterOptions,
  getSortOrder,
  getOrderBy,
  getOffset,
  (filterOptions, sortOrder, orderBy, offset) => (
    {
      ...filterOptions,
      sortOrder,
      orderBy,
      offset,
    }
  ),
);
