import { createSelector, createStructuredSelector } from 'reselect';

import { getDefaultState } from '../getDefaultState';
import shallowCompare from '../../../common/shallowCompare/shallowCompare';

export const getAlert = (state) => state.alert;
export const getActiveTab = (state) => state.activeTab;
export const getSwitchToTab = (state) => state.switchToTab;
export const getBusinessId = (state) => state.businessId;
export const getRegion = (state) => state.region;
export const getLastMonthInFinancialYear = (state) =>
  state.lastMonthInFinancialYear;
export const getModalType = (state) => state.modalType;
export const getRedirectUrl = (state) => state.redirectUrl;

export const getLastLoadingTab = (state) => state.lastLoadingTab;

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
  getActiveTab,
  getFilterOptions,
  getSortOrder,
  getOrderBy,
  (activeTab, filterOptions, sortOrder, orderBy) => ({
    activeTab,
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
  getLastMonthInFinancialYear,
  (businessId, region, accountList, taxCodeList, lastMonthInFinancialYear) => ({
    businessId,
    region,
    lastMonthInFinancialYear,
    accountList,
    taxCodeList,
  })
);
