import { createSelector, createStructuredSelector } from 'reselect';

import { getDefaultState } from '../getDefaultState';
import shallowCompare from '../../../common/shallowCompare/shallowCompare';

export const getAlert = (state) => state.alert;
export const getActiveTab = (state) => state.activeTab;
export const getBusinessId = (state) => state.businessId;
export const getRegion = (state) => state.region;

const getLastLoadingTab = (state) => state.lastLoadingTab;

export const getIsSwitchingTab = createSelector(
  getActiveTab,
  getLastLoadingTab,
  (activeTab, lastLoadingTab) => activeTab !== lastLoadingTab
);

export const getOrder = createSelector(
  (state) => state,
  ({ sortOrder, orderBy }) => ({
    column: orderBy,
    descending: sortOrder === 'desc',
  })
);

export const getSortOrder = createSelector(
  (state) => state,
  ({ sortOrder }) => sortOrder
);

export const getOrderBy = createSelector(
  (state) => state,
  ({ orderBy }) => orderBy
);

export const getFlipSortOrder = createSelector(
  (state) => state,
  ({ sortOrder }) => (sortOrder === 'desc' ? 'asc' : 'desc')
);

export const getNewSortOrder = (state, orderBy) =>
  orderBy === getOrderBy(state) ? getFlipSortOrder(state) : 'asc';

export const getFilterOptions = createSelector(
  (state) => state,
  ({ filterOptions }) => filterOptions
);

export const getSettings = createSelector(
  getFilterOptions,
  getSortOrder,
  getOrderBy,
  (filterOptions, sortOrder, orderBy) => ({
    filterOptions,
    sortOrder,
    orderBy,
  })
);

const getDefaultFilterOptions = () => getDefaultState().filterOptions;

export const getIsDefaultFilters = createSelector(
  getFilterOptions,
  (filterOptions) => {
    const defaultFilterOptions = getDefaultFilterOptions();
    return shallowCompare(filterOptions, defaultFilterOptions);
  }
);

const getSourceJournal = (state) => state.filterOptions.sourceJournal;

export const getURLParams = createStructuredSelector({
  sourceJournal: getSourceJournal,
});

export const getAccountList = (state) => state.accountList;
export const getTaxCodeList = (state) => state.taxCodeList;

export const getFindAndRecodeContext = createSelector(
  getBusinessId,
  getRegion,
  getAccountList,
  getTaxCodeList,
  (businessId, region, accountList, taxCodeList) => ({
    businessId,
    region,
    accountList,
    taxCodeList,
  })
);

export const getIsFindAndRecodeEnabled = (state) =>
  state.isFindAndRecodeEnabled;
