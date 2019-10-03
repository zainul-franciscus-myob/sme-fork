import { createSelector } from 'reselect/lib/index';

export const getAlert = state => state.alert;
export const getIsTableLoading = state => state.isTableLoading;
export const getIsLoading = state => state.isLoading;
export const getAreActionButtonsDisabled = state => state.isSubmitting;

export const getBusinessId = state => state.businessId;
export const getRegion = state => state.region;

export const getThumbnailUri = state => state.document.thumbnailUri;
export const getDocumentUrl = state => state.document.documentUrl;
export const getDocumentUploadDate = state => state.document.uploadedOn;
export const getDocumentId = state => state.documentId;

export const getSupplierFilterOptions = state => state.supplierFilterOptions;
export const getFilterOptions = state => state.filterOptions;
export const getAppliedFilterOptions = state => state.appliedFilterOptions;

export const getSortOrder = state => state.sortOrder;
export const getOrderBy = state => state.orderBy;
export const getIsTableEmpty = state => state.bills.length === 0;
export const getTableEntries = state => state.bills;
export const getInTrayListUrl = createSelector(
  getRegion,
  getBusinessId,
  (region, businessId) => `/#/${region}/${businessId}/intray`,
);
export const getIsAnyBillSelected = state => state.bills.some(bill => bill.isSelected);
export const getSelectedBillId = state => state.bills.find(bill => bill.isSelected).id;

export const getOrder = state => ({
  column: getOrderBy(state),
  descending: getSortOrder(state) === 'desc',
});

const flipSortOrder = ({ sortOrder }) => (sortOrder === 'desc' ? 'asc' : 'desc');

export const getNewSortOrder = orderBy => state => (orderBy === getOrderBy(state)
  ? flipSortOrder(state)
  : 'asc');

export const getLinkDocumentToBillPayload = createSelector(
  getSelectedBillId,
  getDocumentId,
  (billId, documentId) => ({
    billId,
    documentId,
  }),
);
