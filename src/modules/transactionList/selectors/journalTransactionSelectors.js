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

const getJournalTransactions = (state) => state.journalTransaction;

export const getEntries = createSelector(
  getJournalTransactions,
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
  getJournalTransactions,
  ({ entries }) => entries.length === 0,
);

export const getIsTableLoading = createSelector(
  getJournalTransactions,
  state => state.isTableLoading,
);

export const getLoadMoreButtonStatus = createSelector(
  getJournalTransactions,
  state => state.loadMoreButtonStatus,
);

const getOffset = createSelector(
  getJournalTransactions,
  state => state.pagination.offset,
);

export const getSortingForJournalTransactions = createSelector(
  getSortOrder,
  getOrderBy,
  (sortOrder, orderBy) => {
    const validOrderByOptions = ['Reference', 'Date', 'Description', 'SourceJournal', 'Amount'];
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
  },
);

export const getLoadNextPageParams = createSelector(
  getFilterOptions,
  getSortingForJournalTransactions,
  getOffset,
  (filterOptions, sortOptions, offset) => (
    {
      ...filterOptions,
      ...sortOptions,
      offset,
    }
  ),
);
