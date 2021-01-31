import { createSelector } from 'reselect';

import { businessEventToFeatureMap } from '../../../common/types/BusinessEventTypeMap';
import LoadMoreButtonStatuses from '../../../components/PaginatedListTemplate/LoadMoreButtonStatuses';
import RecodeStatus from './types/RecodeStatus';

const getBusinessId = (state) => state.businessId;

export const getRegion = (state) => state.region;

export const getLastMonthInFinancialYear = (state) =>
  state.lastMonthInFinancialYear;

const getOrderBy = (state) => state.orderBy;

const getSortOrder = (state) => state.sortOrder;

export const getFilterOptions = (state) => state.filterOptions;

export const getModalType = (state) => state.modalType;

const getEntries = (state) => state.entries;

const getEntryLink = (entry, businessId, region) => {
  const { businessEventId, businessEventType } = entry;
  const feature = businessEventToFeatureMap[businessEventType];

  return feature
    ? `/#/${region}/${businessId}/${feature}/${businessEventId}`
    : undefined;
};

export const getRecodeItems = (state) => state.recodeItems;

export const getTableEntries = createSelector(
  getEntries,
  getBusinessId,
  getRegion,
  getRecodeItems,
  (entries, businessId, region, recodeItems) =>
    entries.map((entry) => ({
      ...entry,
      link: getEntryLink(entry, businessId, region),
      recodeItem: recodeItems.find((item) => item.id === entry.id),
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

export const getIsAccountsOrTaxCodesListEmpty = createSelector(
  getAccountList,
  getTaxCodeList,
  (accountList, taxCodeList) => {
    return accountList.length === 0 || taxCodeList.length === 0;
  }
);

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

export const getNoItemSelected = createSelector(
  getRecodeItems,
  (items) => items.length === 0
);

export const getAreAllItemsSelected = createSelector(
  getRecodeItems,
  getEntries,
  (items, entries) => items.length === entries.length
);

export const getAreSomeItemsSelected = createSelector(
  getRecodeItems,
  (items) => items.length > 0
);

export const getSelectedText = createSelector(getRecodeItems, (recodeItems) => {
  const count = recodeItems.length;

  switch (count) {
    case 0:
      return '';
    case 1:
      return '1 item selected';
    default:
      return `${count} items selected`;
  }
});

export const getActiveSort = createSelector(getSort, (sort) => ({
  column: sort.orderBy,
  descending: sort.sortOrder === 'desc',
}));

export const getIsRecodeOptionsOpen = (state) => state.isRecodeOptionsOpen;

export const getIsRecodeLoading = createSelector(getRecodeItems, (items) =>
  items.some((item) => item.status === RecodeStatus.LOADING)
);

export const getIsRecodeFinished = createSelector(getRecodeItems, (items) =>
  items.every(
    (item) =>
      item.status === RecodeStatus.SUCCESS ||
      item.status === RecodeStatus.FAILURE
  )
);

const getFailedRecodeItems = createSelector(getRecodeItems, (items) =>
  items.filter((item) => item.status === RecodeStatus.FAILURE)
);

export const getIsRecodeFailure = createSelector(
  getIsRecodeFinished,
  getFailedRecodeItems,
  (isRecodeFinished, failedItems) => isRecodeFinished && failedItems.length > 0
);

export const getRecodeFailureMessage = createSelector(
  getFailedRecodeItems,
  (failedItems) => {
    const count = failedItems.length;

    switch (count) {
      case 0:
        return '';
      case 1:
        return '1 replacement failed.';
      default:
        return `${count} replacements failed.`;
    }
  }
);

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

export const getRecodeItemContent = (id) =>
  createSelector(getEntries, getRecodeOptions, (entries, recodeOptions) => {
    const { businessEventType, businessEventId } = entries.find(
      (entry) => entry.id === id
    );

    return [
      {
        businessEventLineId: id,
        businessEventType,
        businessEventId,
        accountId: recodeOptions.accountId,
        taxCodeId: recodeOptions.taxCodeId,
      },
    ];
  });
