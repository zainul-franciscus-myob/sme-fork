import { createSelector } from 'reselect';

import shallowCompare from '../../../../common/shallowCompare/shallowCompare';

const DESC = 'desc';
const ASC = 'asc';

export const getBusinessId = (state) => state.businessId;
export const getRegion = (state) => state.region;

export const getLoadingState = (state) => state.loadingState;
export const getFilterOptions = (state) => state.filterOptions;
export const getSortOrder = (state) => state.sortOrder;
export const getOrderBy = (state) => state.orderBy;
export const getTotalAmount = (state) => state.totalAmount;
export const getTotalDebitAmount = (state) => state.totalDebitAmount;
export const getSupplierFilterOptions = (state) => state.supplierFilterOptions;
export const getIsTableLoading = (state) => state.isTableLoading;

export const getIsTableEmpty = (state) => state.entries.length === 0;

export const getOrder = (state) => ({
  column: getOrderBy(state),
  descending: getSortOrder(state) === DESC,
});

const getLink = (state, id) =>
  `/#/${state.region}/${state.businessId}/bill/${id}`;

export const getTableEntries = (state) =>
  state.entries.map((entry) => ({
    ...entry,
    link: getLink(state, entry.id),
  }));

export const getAlert = (state) => state.alert;

const flipSortOrder = ({ sortOrder }) => (sortOrder === DESC ? ASC : DESC);

export const getNewSortOrder = (state, orderBy) =>
  orderBy === getOrderBy(state) ? flipSortOrder(state) : ASC;

const getDefaultFilterOptions = ({ defaultFilterOptions }) =>
  defaultFilterOptions;

export const getIsDefaultFilters = createSelector(
  getFilterOptions,
  getDefaultFilterOptions,
  (filterOptions, defaultFilterOptions) =>
    shallowCompare(defaultFilterOptions, filterOptions)
);

export const getCreateRefundUrl = (state, id) => {
  const businessId = getBusinessId(state);
  const region = getRegion(state);

  return `/#/${region}/${businessId}/supplierReturn/${id}/receiveRefund/new`;
};

export const getCreatePurchaseUrl = (state, id) => {
  const businessId = getBusinessId(state);
  const region = getRegion(state);

  return `/#/${region}/${businessId}/supplierReturn/${id}/applyToPurchase/new`;
};
