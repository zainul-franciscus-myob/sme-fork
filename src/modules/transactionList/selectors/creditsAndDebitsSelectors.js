import { createSelector } from 'reselect';

import { businessEventToFeatureMap } from '../../../common/types/BusinessEventTypeMap';
import {
  getBusinessId,
  getFilterOptions,
  getOrderBy,
  getRegion,
  getSortOrder,
} from './transactionListSelectors';
import { getDefaultState } from '../getDefaultState';
import LoadingState from '../../../components/PageView/LoadingState';

const getDebitsAndCredits = (state) => state.debitsAndCredits;

export const getEntries = createSelector(
  getDebitsAndCredits,
  (state) => state.entries
);

const getEntryLink = (entry, businessId, region) => {
  const { id, businessEventType } = entry;
  const feature = businessEventToFeatureMap[businessEventType];

  return feature ? `/#/${region}/${businessId}/${feature}/${id}` : undefined;
};

export const getTableEntries = createSelector(
  getEntries,
  getBusinessId,
  getRegion,
  (entries, businessId, region) =>
    entries.map((entry) => ({
      ...entry,
      link: getEntryLink(entry, businessId, region),
    }))
);

export const getIsTableEmpty = createSelector(
  getDebitsAndCredits,
  ({ entries }) => entries.length === 0
);

export const getIsTableLoading = createSelector(
  getDebitsAndCredits,
  (state) => state.isTableLoading
);

export const getLoadingState = createSelector(
  getDebitsAndCredits,
  (state) => state.loadingState
);

export const getIsCreditsAndDebitsLoaded = createSelector(
  getLoadingState,
  (loadingState) => loadingState !== LoadingState.LOADING
);

export const getLoadMoreButtonStatus = createSelector(
  getDebitsAndCredits,
  (state) => state.loadMoreButtonStatus
);

const getOffset = createSelector(
  getDebitsAndCredits,
  (state) => state.pagination.offset
);

export const getSortingForCreditsAndDebits = createSelector(
  getSortOrder,
  getOrderBy,
  (sortOrder, orderBy) => {
    const validOrderByOptions = [
      'Reference',
      'Date',
      'Description',
      'SourceJournal',
      'AccountIdentifier',
      'Debit',
      'Credit',
    ];
    if (validOrderByOptions.includes(orderBy)) {
      return {
        orderBy,
        sortOrder,
      };
    }
    return {
      orderBy: getDefaultState().orderBy,
      sortOrder: getDefaultState().sortOrder,
    };
  }
);

export const getLoadNextPageParams = createSelector(
  getFilterOptions,
  getSortingForCreditsAndDebits,
  getOffset,
  (filterOptions, sortingOptions, offset) => ({
    ...filterOptions,
    ...sortingOptions,
    offset,
  })
);
