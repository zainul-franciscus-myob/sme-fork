import { createSelector } from 'reselect';

import ModalType from '../ModalType';
import StatementType from '../StatementType';
import shallowCompare from '../../../common/shallowCompare/shallowCompare';

const getBusinessId = (state) => state.businessId;
export const getRegion = (state) => state.region;
export const getLoadingState = (state) => state.loadingState;

export const getStatementType = (state) =>
  state.templateAdditionalOptions.statementType;
export const getStatementDate = (state) =>
  state.templateAdditionalOptions.statementDate;
export const getFromDate = (state) => state.templateAdditionalOptions.fromDate;
export const getToDate = (state) => state.templateAdditionalOptions.toDate;
export const getIncludeInvoices = (state) =>
  state.templateAdditionalOptions.includeInvoices;

export const getSelectedCustomerId = (state) =>
  state.filterOptions.selectedCustomerId;
export const getShowZeroAmount = (state) => state.filterOptions.showZeroAmount;

export const getCustomerOptions = (state) => state.customerOptions;
export const getEmailSubject = (state) => state.emailModalOptions.subject;
export const getEmailMessage = (state) => state.emailModalOptions.message;
export const getModal = (state) => state.modal;
export const getAlert = (state) => state.alert;

export const getDefaultTemplateOption = (state) =>
  getStatementType(state) === StatementType.INVOICE
    ? state.defaultInvoiceTemplateOption
    : state.defaultActivityTemplateOption;

export const getSelectedTemplateOption = (state) => {
  const defaultTemplateOption = getDefaultTemplateOption(state);
  const { selectedTemplateOption } = state;
  return selectedTemplateOption || defaultTemplateOption;
};

const getActivityTemplateOptions = (state) => state.activityTemplateOptions;
const getInvoiceTemplateOptions = (state) => state.invoiceTemplateOptions;

export const getTemplateOptions = createSelector(
  getStatementType,
  getActivityTemplateOptions,
  getInvoiceTemplateOptions,
  (statementType, activityTemplateOptions, invoiceTemplateOptions) =>
    statementType === StatementType.INVOICE
      ? invoiceTemplateOptions
      : activityTemplateOptions
);

export const getTemplateAdditionalOptions = createSelector(
  getStatementType,
  getStatementDate,
  getFromDate,
  getToDate,
  getIncludeInvoices,
  (statementType, statementDate, fromDate, toDate, includeInvoices) => ({
    statementType,
    statementDate,
    fromDate,
    toDate,
    includeInvoices,
  })
);

export const getFilterOptions = createSelector(
  getShowZeroAmount,
  getSelectedCustomerId,
  (showZeroAmount, selectedCustomerId) => ({
    showZeroAmount,
    selectedCustomerId,
  })
);

export const getAreActionsDisabled = (state) =>
  state.areActionsDisabled || state.isTableLoading;
export const getIsTableLoading = (state) => state.isTableLoading;
export const getIsTableEmpty = (state) => state.customerStatements.length === 0;

const buildContactsUrl = (region, businessId, id) =>
  `/#/${region}/${businessId}/contact/${id}`;
const getStatements = (state) => state.customerStatements;

export const getCustomerStatements = createSelector(
  getRegion,
  getBusinessId,
  getStatements,
  (region, businessId, statements) =>
    statements.map((statement) => ({
      ...statement,
      link: buildContactsUrl(region, businessId, statement.id),
    }))
);

export const getCustomersSelected = createSelector(
  getStatements,
  (customerStatements) =>
    customerStatements.filter(
      (customerStatement) => customerStatement.isSelected
    ).length
);

export const getIsAllSelected = createSelector(
  getStatements,
  getIsTableEmpty,
  (customerStatements, isTableEmpty) =>
    !isTableEmpty &&
    customerStatements.every(
      (customerStatement) => customerStatement.isSelected
    )
);

export const getIsSomeSelected = createSelector(
  getStatements,
  (customerStatements) =>
    customerStatements.some((customerStatement) => customerStatement.isSelected)
);

export const getIsDownloadPDFDisabled = createSelector(
  getCustomersSelected,
  (customersSelected) => customersSelected >= 30
);

export const getOrder = ({ sortOrder, orderBy }) => ({
  column: orderBy,
  descending: sortOrder === 'desc',
});

const getSortOrder = (state) => state.sortOrder;
const getOrderBy = (state) => state.orderBy;
const getFlipSortOrder = ({ sortOrder }) =>
  sortOrder === 'desc' ? 'asc' : 'desc';

export const getNewSortOrder = (state, orderBy) =>
  orderBy === getOrderBy(state) ? getFlipSortOrder(state) : 'asc';

export const getSettings = createSelector(
  getFilterOptions,
  getTemplateAdditionalOptions,
  getSortOrder,
  getOrderBy,
  (filterOptions, templateAdditionalOptions, sortOrder, orderBy) => ({
    filterOptions,
    templateAdditionalOptions,
    sortOrder,
    orderBy,
  })
);

export const getFileName = (state) => {
  const selectedCustomerStatement = state.customerStatements.find(
    (customerStatement) => customerStatement.isSelected
  );

  return selectedCustomerStatement
    ? `${selectedCustomerStatement.payerUid}.zip`
    : 'customer-statement.zip';
};

export const getDefaultFilterOptions = ({ defaultFilterOptions }) =>
  defaultFilterOptions;

export const getIsDefaultFilters = createSelector(
  getFilterOptions,
  getDefaultFilterOptions,
  (filterOptions, defaultFilterOptions) =>
    shallowCompare(filterOptions, defaultFilterOptions)
);

export const getIsModalSubmitting = createSelector(
  getModal,
  (modal = { isModalSubmitting: false }) => modal.isModalSubmitting
);

export const getOpenedModalType = (state) => {
  const modal = getModal(state) || { type: ModalType.NONE };

  return modal.type;
};

export const getIsDownloadingDefaultPDF = (state) =>
  state.isDownloadingDefaultPDF;

export const getIsDownloadingPDF = createSelector(
  getOpenedModalType,
  getIsModalSubmitting,
  (modalType, isModalSubmitting) =>
    modalType === ModalType.PDF && isModalSubmitting
);
