import { createSelector } from 'reselect';

import {
  getAppliedFilterOptions,
  getFilterOptions,
  getOrderBy,
  getSortOrder,
} from './SupplierReturnListSelectors';

export const getBusinessId = state => state.businessId;

export const getRegion = state => state.region;

export const getURLParams = createSelector(
  getBusinessId,
  businessId => ({ businessId }),
);

export const getParams = createSelector(
  getSortOrder,
  getOrderBy,
  getFilterOptions,
  (sortOrder, orderBy, filterOptions) => ({
    ...filterOptions,
    sortOrder,
    orderBy,
  }),
);

export const getAppliedParams = createSelector(
  getSortOrder,
  getOrderBy,
  getAppliedFilterOptions,
  (sortOrder, orderBy, appliedFilterOptions) => ({
    ...appliedFilterOptions,
    sortOrder,
    orderBy,
  }),
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
