import { createSelector, createStructuredSelector } from 'reselect';

import { businessEventToFeatureMap } from '../../../common/types/BusinessEventTypeMap';
import { tabItemIds } from '../tabItems';
import LoadMoreButtonStatuses from '../../../components/PaginatedListTemplate/LoadMoreButtonStatuses';
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

export const getAppliedFilterOptions = createSelector(
  getJournalState,
  ({ appliedFilterOptions }) => appliedFilterOptions,
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

export const getIsLoading = createSelector(
  getJournalState,
  state => state.isLoading,
);

export const getIsLoaded = createSelector(
  getIsLoading,
  isLoading => !isLoading,
);

const getAppliedSourceJournal = createSelector(
  getJournalState,
  state => state.appliedFilterOptions.sourceJournal,
);

export const getURLParams = createStructuredSelector({
  sourceJournal: getAppliedSourceJournal,
});

const getDefaultFilterOptions = createSelector(
  getJournalState,
  state => state.defaultFilterOptions,
);

export const getIsDefaultFilters = createSelector(
  getAppliedFilterOptions,
  getDefaultFilterOptions,
  (appliedFilterOptions, defaultFilterOptions) => shallowCompare(
    appliedFilterOptions,
    defaultFilterOptions,
  ),
);

export const getSettings = createSelector(
  getAppliedFilterOptions,
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
  getAppliedFilterOptions,
  getSortOrder,
  getOrderBy,
  getOffset,
  (appliedFilterOptions, sortOrder, orderBy, offset) => (
    {
      ...appliedFilterOptions,
      sortOrder,
      orderBy,
      offset,
    }
  ),
);
