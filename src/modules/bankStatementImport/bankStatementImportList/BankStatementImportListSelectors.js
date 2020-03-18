import { createSelector } from 'reselect';

export const getBusinessId = state => state.businessId;
export const getRegion = state => state.region;
export const getLoadingState = state => state.loadingState;
export const getFilterOptions = state => state.filterOptions;
export const getIsTableLoading = state => state.isTableLoading;
export const getIsSubmitting = state => state.isSubmitting;
export const getOrderBy = state => state.orderBy;
export const getSortOrder = state => state.sortOrder;
export const getEntries = state => state.entries;
export const getAccountOptions = state => state.accountOptions;
export const getAlert = state => state.alert;
export const getImportModal = state => state.importModal;
export const getModalType = state => state.modalType;
export const getPendingDeleteId = state => state.pendingDeleteId;

export const getIsTableEmpty = state => state.entries.length === 0;
export const getOrder = state => ({
  column: getOrderBy(state),
  descending: getSortOrder(state) === 'desc',
});

const flipSortOrder = ({ sortOrder }) => (sortOrder === 'desc' ? 'asc' : 'desc');
export const getNewSortOrder = orderBy => state => (orderBy === getOrderBy(state)
  ? flipSortOrder(state)
  : 'asc');

export const getContentForImport = createSelector(
  getImportModal,
  ({ accountId, file }) => ({
    AccountId: accountId,
    file,
  }),
);
