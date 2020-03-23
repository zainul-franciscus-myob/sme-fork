import { createSelector } from 'reselect';

import { getBusinessId, getRegion } from './payrollSettingsSelectors';
import LoadingState from '../../../components/PageView/LoadingState';

export const getLoadingState = state => state.employmentClassificationList.loadingState;
export const getIsLoading = state => getLoadingState(state) === LoadingState.LOADING;

export const getIsTableLoading = state => state.employmentClassificationList.isTableLoading;

export const getEmploymentClassificationFilterOptions = state => (
  state.employmentClassificationList.filterOptions);

export const getEmploymentClassificationSortOrder = state => (
  state.employmentClassificationList.sortOrder);

export const getEmploymentClassificationOrderBy = state => (
  state.employmentClassificationList.orderBy);

const getEntries = state => state.employmentClassificationList.entries;

export const getIsTableEmpty = state => (
  state.employmentClassificationList.entries || []).length === 0;

export const getTableEntries = createSelector(
  getRegion,
  getBusinessId,
  getEntries,
  (region, businessId, entries) => entries.map((entry) => {
    const link = `/#/${region}/${businessId}/employmentClassification/${entry.id}`;
    return { ...entry, link };
  }),
);

export const getOrder = state => ({
  column: getEmploymentClassificationOrderBy(state),
  descending: getEmploymentClassificationSortOrder(state) === 'desc',
});

const flipSortOrder = ({ employmentClassificationList: { sortOrder } }) => (sortOrder === 'desc' ? 'asc' : 'desc');

export const getNewEmploymentClassificationSortOrder = orderBy => state => (
  orderBy === getEmploymentClassificationOrderBy(state)
    ? flipSortOrder(state)
    : 'asc');
