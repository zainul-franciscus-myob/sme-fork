import { createSelector, createStructuredSelector } from 'reselect';

export const getRegion = state => state.region;

export const getIsCreating = state => state.payItemId === 'new';

export const getIsLoading = state => state.isLoading;

export const getPayItemId = state => state.payItemId;

export const getIsSubmitting = state => state.isSubmitting;

export const getTitle = state => state.title;

export const getModalType = state => state.modalType;

export const getIsPageEdited = state => state.isPageEdited;

export const getBusinessId = state => state.businessId;

export const getAlert = state => state.alert;

export const getIsJobKeeper = state => state.isJobKeeper;

export const getWage = state => state.wage;
export const getAccounts = state => state.accounts;
export const getDefaultAccountId = state => state.defaultAccountId;
export const getOverrideAccount = state => state.overrideAccount;
export const getPayRateList = state => state.payRateList;
export const getAtoReportCategoryList = state => state.atoReportCategoryList;
export const getIsHourlyView = state => state.wage.payBasis === 'Hourly';

const getSelectedEmployees = state => state.wage.selectedEmployees;
const getFilteredListOfEmployees = createSelector(
  state => state.employees,
  getSelectedEmployees,
  (employees, selectedEmployees) => employees.filter(({ id }) => !selectedEmployees
    .find(({ id: selectedId }) => selectedId === id)),
);

export const getEmployeeAllocations = createStructuredSelector({
  selectedEmployees: getSelectedEmployees,
  filteredListOfEmployees: getFilteredListOfEmployees,
});

const getSelectedExemptions = state => state.wage.selectedExemptions;
const getFilteredListOfExemptions = createSelector(
  state => state.exemptions,
  getSelectedExemptions,
  (exemptions, selectedExemptions) => exemptions.filter(({ id }) => !selectedExemptions
    .find(({ id: selectedId }) => selectedId === id)),
);

export const getExemptionAllocations = createStructuredSelector({
  selectedExemptions: getSelectedExemptions,
  filteredListOfExemptions: getFilteredListOfExemptions,
});

export const getSaveWagePayItemPayload = ({
  wage: {
    selectedEmployees, selectedExemptions, accountId, ...rest
  },
  overrideAccount,
}) => ({
  ...rest,
  accountId: overrideAccount ? accountId : '',
  employeeIds: selectedEmployees.map(employee => employee.id),
  exemptions: selectedExemptions.map(exemption => ({
    id: exemption.id,
    type: exemption.itemType,
  })),
});
