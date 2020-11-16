import { createSelector } from 'reselect';

import { businessEventToFeatureMap } from '../../../common/types/BusinessEventTypeMap';
import LoadMoreButtonStatuses from '../../../components/PaginatedListTemplate/LoadMoreButtonStatuses';

const getBusinessId = (state) => state.businessId;

export const getRegion = (state) => state.region;

const getOrderBy = (state) => state.orderBy;

const getSortOrder = (state) => state.sortOrder;

export const getFilterOptions = (state) => state.filterOptions;

const getEntries = (state) => state.entries;

const getEntryLink = (entry, businessId, region) => {
  const { businessEventId, businessEventType } = entry;
  const feature = businessEventToFeatureMap[businessEventType];

  return feature
    ? `/#/${region}/${businessId}/${feature}/${businessEventId}`
    : undefined;
};

const getSelectedItems = (state) => state.selectedItems;

export const getTableEntries = createSelector(
  getEntries,
  getBusinessId,
  getRegion,
  getSelectedItems,
  (entries, businessId, region, selectedItems) =>
    entries.map((entry) => ({
      ...entry,
      link: getEntryLink(entry, businessId, region),
      isSelected: selectedItems.includes(entry.id),
    }))
);

export const getIsTableEmpty = (state) => state.entries.length === 0;

export const getIsTableLoading = (state) => state.isTableLoading;

export const getLoadMoreButtonStatus = (state) => {
  if (state.isNextPageLoading) return LoadMoreButtonStatuses.LOADING;

  return state.pagination.hasNextPage
    ? LoadMoreButtonStatuses.SHOWN
    : LoadMoreButtonStatuses.HIDDEN;
};

export const getAccountList = (state) => state.accountList;

export const getTaxCodeList = (state) => state.taxCodeList;

const getOffset = (state) => state.pagination.offset;

const getSort = createSelector(
  getSortOrder,
  getOrderBy,
  (sortOrder, orderBy) => {
    return {
      orderBy,
      sortOrder,
    };
  }
);

export const getAreAllItemsSelected = (state) =>
  state.selectedItems.length === state.entries.length;

export const getAreSomeItemsSelected = (state) =>
  state.selectedItems.length > 0;

export const getSelectedText = (state) => {
  const selectedCount = state.selectedItems.length;

  switch (selectedCount) {
    case 0:
      return '';
    case 1:
      return '1 item selected';
    default:
      return `${selectedCount} items selected`;
  }
};

export const getActiveSort = createSelector(getSort, (sort) => ({
  column: sort.orderBy,
  descending: sort.sortOrder === 'desc',
}));

export const getIsRecodeOpen = (state) => state.isRecodeOpen;

export const getIsRecodeLoading = (state) => state.isRecodeLoading;

export const getRecodeOptions = (state) => state.recodeOptions;

const getLoadParams = createSelector(
  getFilterOptions,
  getSort,
  (
    {
      accountId,
      keywords,
      orderBy,
      sortOrder,
      sourceJournal,
      taxCodeId,
      dateFrom,
      dateTo,
    },
    sort
  ) => ({
    accountId,
    keywords,
    orderBy,
    sortOrder,
    sourceJournal,
    taxCodeId,
    dateFrom,
    dateTo,
    ...sort,
  })
);

export const getSortAndFilterParams = createSelector(
  getLoadParams,
  (loadParams) => ({
    ...loadParams,
    offset: 0,
  })
);

export const getLoadNextPageParams = createSelector(
  getLoadParams,
  getOffset,
  (loadParams, offset) => ({
    ...loadParams,
    offset,
  })
);

export const getUrlParams = createSelector(getBusinessId, (businessId) => ({
  businessId,
}));

export const getRecodeContent = createSelector(
  getEntries,
  getSelectedItems,
  getRecodeOptions,
  (entries, selectedItems, recodeOptions) => {
    return entries
      .filter((entry) => selectedItems.includes(entry.id))
      .map(({ id, businessEventType, businessEventId }) => ({
        businessEventLineId: id,
        businessEventType,
        businessEventId,
        accountId: recodeOptions.accountId,
      }));
  }
);
