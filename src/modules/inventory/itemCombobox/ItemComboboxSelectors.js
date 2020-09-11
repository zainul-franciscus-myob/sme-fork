import { createSelector } from 'reselect';

import getLoadMoreButtonStatus from '../../../components/AutoComplete/helpers/getLoadMoreButtonStatus';

const getBusinessId = (state) => state.businessId;
const getRegion = (state) => state.region;
export const getItemId = (state) => state.itemId;
export const getIsItemLoading = (state) => state.isLoading;
const getIsItemOptionsLoading = (state) => state.isOptionsLoading;
export const getItemOptions = (state) => state.itemOptions;
const getHasMoreItemOptions = (state) => state.pagination.hasNextPage;
const getItemOptionsOffset = (state) => state.pagination.offset;
const getItemType = (state) => state.itemType;

export const getLoadItemOptionsStatus = createSelector(
  getIsItemOptionsLoading,
  getHasMoreItemOptions,
  (isOptionsLoading, hasMore) =>
    getLoadMoreButtonStatus(isOptionsLoading, hasMore)
);

export const getLoadItemOptionsParams = createSelector(
  getItemOptionsOffset,
  getItemType,
  (offset, itemType) => ({ offset, itemType })
);

export const getLoadItemOptionsUrlParams = (state) => {
  const businessId = getBusinessId(state);

  return { businessId };
};

export const getSearchItemParams = (keywords, state) => ({
  offset: 0,
  keywords,
  itemType: getItemType(state),
});

export const getItemModalContext = (state) => {
  const businessId = getBusinessId(state);
  const region = getRegion(state);

  return { businessId, region };
};

export const getLoadItemOptionByIdContent = (itemId) => {
  return [itemId];
};
