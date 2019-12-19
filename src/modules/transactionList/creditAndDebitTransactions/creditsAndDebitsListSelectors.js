import { createSelector, createStructuredSelector } from 'reselect';

import { tabItemIds as tabItems } from '../tabItems';
import BusinessEventTypeMap from '../../../common/types/BusinessEventTypeMap';
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
export const getAppliedFilterOptions = createSelector(
  getCreditsAndDebitsState,
  ({ appliedFilterOptions }) => appliedFilterOptions,
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
  const feature = BusinessEventTypeMap[businessEventType];
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

export const getIsLoading = createSelector(
  getCreditsAndDebitsState,
  state => state.isLoading,
);

export const getIsLoaded = createSelector(
  getIsLoading,
  isLoading => !isLoading,
);

const getAppliedSourceJournal = createSelector(
  getCreditsAndDebitsState,
  state => state.appliedFilterOptions.sourceJournal,
);

export const getURLParams = createStructuredSelector({
  sourceJournal: getAppliedSourceJournal,
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

const getDefaultFilterOptions = () => getDefaultState().filterOptions;

export const getIsDefaultFilters = createSelector(
  getAppliedFilterOptions,
  (appliedFilterOptions) => {
    const defaultFilterOptions = getDefaultFilterOptions();
    return shallowCompare(appliedFilterOptions, defaultFilterOptions);
  },
);
