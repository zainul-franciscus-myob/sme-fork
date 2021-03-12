import { createSelector } from 'reselect';

export const getBusinessId = (state) => state.businessId;
export const getRegion = (state) => state.region;
export const getLoadingState = (state) => state.loadingState;
export const getSupplierOptions = (state) => state.supplierOptions;
export const getAlert = (state) => state.alert;
export const getIsTableLoading = (state) => state.isTableLoading;
export const getIsTableEmpty = (state) =>
  state.remittanceAdviceList.length === 0;
const getRemittanceAdviceList = (state) => state.remittanceAdviceList;

const buildPaymentUrl = (region, businessId, id) =>
  `/#/${region}/${businessId}/supplierPayment/${id}`;

export const getRemittanceAdvices = createSelector(
  getRegion,
  getBusinessId,
  getRemittanceAdviceList,
  (region, businessId, remittanceAdvices) =>
    remittanceAdvices.map((remittanceAdvice) => ({
      ...remittanceAdvice,
      link: buildPaymentUrl(region, businessId, remittanceAdvice.id),
    }))
);

export const getSuppliersSelected = createSelector(
  getRemittanceAdvices,
  (remittanceAdvices) =>
    remittanceAdvices.filter((remittanceAdvice) => remittanceAdvice.isSelected)
      .length
);

export const getIsAllSelected = createSelector(
  getRemittanceAdvices,
  getIsTableEmpty,
  (remittanceAdvices, isTableEmpty) =>
    !isTableEmpty &&
    remittanceAdvices.every((remittanceAdvice) => remittanceAdvice.isSelected)
);

export const getIsSomeSelected = createSelector(
  getRemittanceAdvices,
  (remittanceAdvices) =>
    remittanceAdvices.some((remittanceAdvice) => remittanceAdvice.isSelected)
);

const getOrderBy = (state) => state.orderBy;
const getFlipSortOrder = ({ sortOrder }) =>
  sortOrder === 'desc' ? 'asc' : 'desc';

export const getNewSortOrder = (state, orderBy) =>
  orderBy === getOrderBy(state) ? getFlipSortOrder(state) : 'asc';

export const getOrder = ({ sortOrder, orderBy }) => ({
  column: orderBy,
  descending: sortOrder === 'desc',
});
