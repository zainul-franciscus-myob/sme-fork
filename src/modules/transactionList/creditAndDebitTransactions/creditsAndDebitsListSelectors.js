import { createSelector, createStructuredSelector } from 'reselect';

import { businessEventToFeatureMap } from '../../../common/types/BusinessEventTypeMap';
import { tabItemIds as tabItems } from '../tabItems';
import LoadingState from '../../../components/PageView/LoadingState';
import getDefaultState from './getDefaultState';
import shallowCompare from '../../../common/shallowCompare/shallowCompare';

const getCreditsAndDebitsState = state => state.creditsAndDebitsTransactions;

export const getIsActive = state => state.activeTab === tabItems.debitsAndCredits;

export const getOrder = createSelector(
  getCreditsAndDebitsState,
  ({ sortOrder, orderBy }) => ({
    column: orderBy,
    descending: sortOrder === 'desc',
  }),
);

export const getSortOrder = createSelector(
  getCreditsAndDebitsState,
  ({ sortOrder }) => sortOrder,
);

export const getFlipSortOrder = createSelector(
  getCreditsAndDebitsState,
  ({ sortOrder }) => (sortOrder === 'desc' ? 'asc' : 'desc'),
);

export const getOrderBy = createSelector(
  getCreditsAndDebitsState,
  ({ orderBy }) => orderBy,
);

export const getNewSortOrder = (state, orderBy) => (
  orderBy === getOrderBy(state) ? getFlipSortOrder(state) : 'asc'
);

export const getFilterOptions = createSelector(
  getCreditsAndDebitsState,
  ({ filterOptions }) => filterOptions,
);

export const getSourceJournalFilterOptions = createSelector(
  getCreditsAndDebitsState,
  ({ sourceJournalFilters }) => sourceJournalFilters.map(
    filter => ({
      label: filter.name,
      value: filter.value,
    }),
  ),
);

export const getEntries = createSelector(
  getCreditsAndDebitsState,
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
  getCreditsAndDebitsState,
  ({ entries }) => entries.length === 0,
);

export const getIsTableLoading = createSelector(
  getCreditsAndDebitsState,
  state => state.isTableLoading,
);

export const getLoadingState = createSelector(
  getCreditsAndDebitsState,
  state => state.loadingState,
);

export const getIsLoaded = createSelector(
  getLoadingState,
  loadingState => loadingState !== LoadingState.LOADING,
);

const getSourceJournal = createSelector(
  getCreditsAndDebitsState,
  state => state.filterOptions.sourceJournal,
);

export const getURLParams = createStructuredSelector({
  sourceJournal: getSourceJournal,
});

export const getAccountList = createSelector(
  getCreditsAndDebitsState,
  state => state.accountList,
);

export const getLoadMoreButtonStatus = createSelector(
  getCreditsAndDebitsState,
  state => state.loadMoreButtonStatus,
);

const getOffset = createSelector(
  getCreditsAndDebitsState,
  state => state.pagination.offset,
);

export const getLoadNextPageParams = createSelector(
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

const getDefaultFilterOptions = () => getDefaultState().filterOptions;

export const getIsDefaultFilters = createSelector(
  getFilterOptions,
  (filterOptions) => {
    const defaultFilterOptions = getDefaultFilterOptions();
    return shallowCompare(filterOptions, defaultFilterOptions);
  },
);
