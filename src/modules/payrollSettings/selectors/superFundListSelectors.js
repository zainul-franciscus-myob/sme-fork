import { createSelector } from 'reselect';

import { getBusinessId, getRegion } from './payrollSettingsSelectors';
import LoadingState from '../../../components/PageView/LoadingState';

export const getLoadingState = state => state.superFundList.loadingState;
export const getIsLoading = state => getLoadingState(state) === LoadingState.LOADING;

export const getIsTableLoading = state => state.superFundList.isTableLoading;

export const getFilterOptions = state => state.superFundList.filterOptions;

export const getSortOrder = state => state.superFundList.sortOrder;

export const getOrderBy = state => state.superFundList.orderBy;

const getEntries = state => state.superFundList.entries;

export const getIsTableEmpty = state => (state.superFundList.entries || []).length === 0;

export const getTableEntries = createSelector(
  getRegion,
  getBusinessId,
  getEntries,
  (region, businessId, entries) => entries.map((entry) => {
    const link = `/#/${region}/${businessId}/superFund/${entry.id}`;
    return { ...entry, link };
  }),
);

export const getOrder = state => ({
  column: getOrderBy(state),
  descending: getSortOrder(state) === 'desc',
});

const flipSortOrder = ({ superFundList: { sortOrder } }) => (sortOrder === 'desc' ? 'asc' : 'desc');

export const getNewSortOrder = orderBy => state => (orderBy === getOrderBy(state)
  ? flipSortOrder(state)
  : 'asc');
