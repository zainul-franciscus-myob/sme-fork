import { createSelector, createStructuredSelector } from 'reselect';

import StatementType from '../StatementType';

const getBusinessId = state => state.businessId;
export const getRegion = state => state.region;
export const getIsLoading = state => state.isLoading;

export const getStatementType = state => state.filterOptions.statementType;
export const getAppliedStatementType = state => state.appliedFilterOptions.statementType;
export const getStatementDate = state => state.filterOptions.statementDate;
export const getFromDate = state => state.filterOptions.fromDate;
export const getToDate = state => state.filterOptions.toDate;
export const getIncludeInvoices = state => state.filterOptions.includeInvoices;
export const getSelectedCustomerId = state => state.filterOptions.selectedCustomerId;
export const getShowZeroAmount = state => state.filterOptions.showZeroAmount;
export const getCustomerOptions = state => state.customerOptions;
export const getEmailSubject = state => state.emailModalOptions.subject;
export const getEmailMessage = state => state.emailModalOptions.message;
export const getModal = state => state.modal;
export const getAlert = state => state.alert;
export const getAppliedFilterOptions = state => state.appliedFilterOptions;

export const getDefaultTemplateOption = state => (
  getAppliedStatementType(state) === StatementType.INVOICE
    ? state.defaultInvoiceTemplateOption
    : state.defaultActivityTemplateOption
);

export const getSelectedTemplateOption = (state) => {
  const defaultTemplateOption = getDefaultTemplateOption(state);
  const { selectedTemplateOption } = state;
  return selectedTemplateOption || defaultTemplateOption;
};

const getActivityTemplateOptions = state => state.activityTemplateOptions;
const getInvoiceTemplateOptions = state => state.invoiceTemplateOptions;

export const getTemplateOptions = createSelector(
  getAppliedStatementType,
  getActivityTemplateOptions,
  getInvoiceTemplateOptions,
  (statementType, activityTemplateOptions, invoiceTemplateOptions) => (
    statementType === StatementType.INVOICE ? invoiceTemplateOptions : activityTemplateOptions
  ),
);

export const getFilterOptions = createStructuredSelector({
  statementType: getStatementType,
  statementDate: getStatementDate,
  fromDate: getFromDate,
  toDate: getToDate,
  includeInvoices: getIncludeInvoices,
  selectedCustomerId: getSelectedCustomerId,
  showZeroAmount: getShowZeroAmount,
  customerOptions: getCustomerOptions,
});

export const getAreActionsDisabled = state => state.areActionsDisabled;
export const getIsTableLoading = state => state.isTableLoading;
export const getIsTableEmpty = state => state.customerStatements.length === 0;

const buildContactsUrl = (region, businessId, id) => `/#/${region}/${businessId}/contact/${id}`;
const getStatements = state => state.customerStatements;

export const getCustomerStatements = createSelector(
  getRegion,
  getBusinessId,
  getStatements,
  (region, businessId, statements) => statements.map(statement => ({
    ...statement,
    link: buildContactsUrl(region, businessId, statement.id),
  })),
);

export const getCustomersSelected = createSelector(
  getCustomerStatements,
  customerStatements => customerStatements.filter(
    customerStatement => customerStatement.isSelected,
  ).length,
);

export const getIsAllSelected = createSelector(
  getCustomerStatements,
  getIsTableEmpty,
  (customerStatements, isTableEmpty) => !isTableEmpty && customerStatements.every(
    customerStatement => customerStatement.isSelected,
  ),
);

export const getIsSomeSelected = createSelector(
  getCustomerStatements,
  customerStatements => customerStatements.some(customerStatement => customerStatement.isSelected),
);

export const getOrder = ({ sortOrder, orderBy }) => ({
  column: orderBy,
  descending: sortOrder === 'desc',
});

const getSortOrder = state => state.sortOrder;
const getOrderBy = state => state.orderBy;
const getFlipSortOrder = ({ sortOrder }) => (sortOrder === 'desc' ? 'asc' : 'desc');

export const getNewSortOrder = (state, orderBy) => (orderBy === getOrderBy(state) ? getFlipSortOrder(state) : 'asc');

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
