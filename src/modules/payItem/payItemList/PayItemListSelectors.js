import { createSelector, createStructuredSelector } from 'reselect';

import {
  LOAD_DEDUCTIONS_LIST,
  LOAD_EXPENSES_LIST,
  LOAD_LEAVE_LIST,
  LOAD_SUPERANNUATION_LIST,
  LOAD_TAX_PAY_ITEM,
  LOAD_WAGES_LIST,
} from '../PayItemIntents';
import { tabIds } from './tabItems';

export const getBusinessId = (state) => state.businessId;
export const getRegion = (state) => state.region;
export const getIsLoading = (state) => state.isLoading;
export const getIsTableLoading = (state) => state.isTableLoading;
export const getAlert = (state) => state.alert;
export const getIsPageEdited = (state) => state.isPageEdited;
export const getModal = (state) => state.modal;
export const getModalUrl = (state) => (state.modal || {}).url;
export const getTabUrl = (state, tab) =>
  `/#/${state.region}/${state.businessId}/payItem?tab=${tab}`;

export const getWagesOrderBy = (state) => state.wages.orderBy;
export const getWagesSortOrder = (state) => state.wages.sortOrder;
export const getIsWagesTableEmpty = ({ wages }) => wages.entries.length === 0;

export const getSuperannuationOrderBy = (state) => state.superannuation.orderBy;
export const getSuperannuationSortOrder = (state) =>
  state.superannuation.sortOrder;
export const getIsSuperannuationTableEmpty = ({ superannuation }) =>
  superannuation.entries.length === 0;

export const getLeaveOrderBy = (state) => state.leave.orderBy;
export const getLeaveSortOrder = (state) => state.leave.sortOrder;
export const getIsLeaveTableEmpty = ({ leave }) => leave.entries.length === 0;

export const getDeductionsOrderBy = (state) => state.deductions.orderBy;
export const getDeductionsSortOrder = (state) => state.deductions.sortOrder;
export const getIsDeductionsTableEmpty = ({ deductions }) =>
  deductions.entries.length === 0;

export const getExpensesOrderBy = (state) => state.expenses.orderBy;
export const getExpensesSortOrder = (state) => state.expenses.sortOrder;
export const getIsExpensesTableEmpty = ({ expenses }) =>
  expenses.entries.length === 0;

const getStateTab = (state) => state.tab;
export const getTab = createSelector(getStateTab, (stateTab) => {
  const tabIdKeys = Object.keys(tabIds);
  const tabIdValues = Object.values(tabIds);
  const isValidTab = tabIdKeys.includes(stateTab);

  return isValidTab ? stateTab : tabIdValues[0];
});

export const getUrlTabParams = createStructuredSelector({
  tab: getTab,
});

const flipSortOrder = (sortOrder) => (sortOrder === 'desc' ? 'asc' : 'desc');

const getPayItemEntryLink = (entry, businessId, region, payItemType) => {
  const { id } = entry;

  return `/#/${region}/${businessId}/payItem/${payItemType}/${id}`;
};

export const getWagesEntries = (state) => state.wages.entries;

export const getWageTableEntries = createSelector(
  getWagesEntries,
  getBusinessId,
  getRegion,
  (entries, businessId, region) =>
    entries.map((entry) => ({
      ...entry,
      link: getPayItemEntryLink(entry, businessId, region, 'wage'),
    }))
);

export const getWagesOrder = (state) => ({
  column: getWagesOrderBy(state),
  descending: getWagesSortOrder(state) === 'desc',
});

export const getNewWagesSortOrder = (state, { orderBy }) =>
  orderBy === getWagesOrderBy(state)
    ? flipSortOrder(getWagesSortOrder(state))
    : 'asc';

export const getSuperannuationEntries = (state) => state.superannuation.entries;

export const getSuperannuationTableEntries = createSelector(
  getSuperannuationEntries,
  getBusinessId,
  getRegion,
  (entries, businessId, region) =>
    entries.map((entry) => ({
      ...entry,
      link: getPayItemEntryLink(entry, businessId, region, 'superannuation'),
    }))
);

export const getDeductionsEntries = (state) => state.deductions.entries;

export const getDeductionTableEntries = createSelector(
  getDeductionsEntries,
  getBusinessId,
  getRegion,
  (entries, businessId, region) =>
    entries.map((entry) => ({
      ...entry,
      link: getPayItemEntryLink(entry, businessId, region, 'deduction'),
    }))
);

export const getSuperannuationOrder = (state) => ({
  column: getSuperannuationOrderBy(state),
  descending: getSuperannuationSortOrder(state) === 'desc',
});

export const getNewSuperannuationSortOrder = (state, { orderBy }) =>
  orderBy === getSuperannuationOrderBy(state)
    ? flipSortOrder(getSuperannuationSortOrder(state))
    : 'asc';

export const getUrlParams = createStructuredSelector({
  businessId: getBusinessId,
});

export const getLeaveEntries = (state) => state.leave.entries;

export const getLeaveTableEntries = createSelector(
  getLeaveEntries,
  getBusinessId,
  getRegion,
  (entries, businessId, region) =>
    entries.map((entry) => ({
      ...entry,
      link: getPayItemEntryLink(entry, businessId, region, 'leave'),
    }))
);

export const getLeaveOrder = (state) => ({
  column: getLeaveOrderBy(state),
  descending: getLeaveSortOrder(state) === 'desc',
});

export const getNewLeaveSortOrder = (state, { orderBy }) =>
  orderBy === getLeaveOrderBy(state)
    ? flipSortOrder(getLeaveSortOrder(state))
    : 'asc';

export const getDeductionsOrder = (state) => ({
  column: getDeductionsOrderBy(state),
  descending: getDeductionsSortOrder(state) === 'desc',
});

export const getNewDeductionsSortOrder = (state, { orderBy }) =>
  orderBy === getDeductionsOrderBy(state)
    ? flipSortOrder(getDeductionsSortOrder(state))
    : 'asc';

export const getExpensesEntries = (state) => state.expenses.entries;

export const getExpensesTableEntries = createSelector(
  getExpensesEntries,
  getBusinessId,
  getRegion,
  (entries, businessId, region) =>
    entries.map((entry) => ({
      ...entry,
      link: getPayItemEntryLink(entry, businessId, region, 'expense'),
    }))
);

export const getExpensesOrder = (state) => ({
  column: getExpensesOrderBy(state),
  descending: getExpensesSortOrder(state) === 'desc',
});

export const getNewExpensesSortOrder = (state, { orderBy }) =>
  orderBy === getExpensesOrderBy(state)
    ? flipSortOrder(getExpensesSortOrder(state))
    : 'asc';

export const getPayrollIsSetUp = (state) => state.payrollIsSetUp;
export const getTaxPayItemDetail = (state) => state.taxPayItem.tax;
export const getTaxPayItemAccounts = (state) => state.taxPayItem.accounts;
export const getTaxPayItemAtoReportingCategoryList = (state) =>
  state.taxPayItem.atoReportingCategoryList;
export const getShowActionButtonForTax = (state) =>
  getTab(state) === 'tax' && !state.isTableLoading;
export const getSaveTaxPayItemPayload = (state) => ({
  atoReportingCategory: state.taxPayItem.tax.atoReportingCategory,
  accountId: state.taxPayItem.tax.accountId,
});
export const getLoadingState = (state) => state.loadingState;
export const getPayrollSettingsLink = (state) =>
  `/#/${state.region}/${state.businessId}/payrollSettings?tab=general`;

export const getLoadTabContentIntent = createSelector(
  getTab,
  (tab) =>
    ({
      [tabIds.wages]: LOAD_WAGES_LIST,
      [tabIds.superannuation]: LOAD_SUPERANNUATION_LIST,
      [tabIds.leave]: LOAD_LEAVE_LIST,
      [tabIds.deductions]: LOAD_DEDUCTIONS_LIST,
      [tabIds.expenses]: LOAD_EXPENSES_LIST,
      [tabIds.tax]: LOAD_TAX_PAY_ITEM,
    }[tab])
);
