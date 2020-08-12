import { createSelector, createStructuredSelector } from 'reselect';

export const getWagePayItemModal = (state) => state.wagePayItemModal;

export const getIsWagePayItemModalCreating = (state) =>
  getWagePayItemModal(state).id === 'new';

export const getWagePayItemModalId = (state) => getWagePayItemModal(state).id;

const getTitle = (state) => getWagePayItemModal(state).title;

export const getModalTitle = createSelector(
  getIsWagePayItemModalCreating,
  getTitle,
  (isCreating, title) =>
    isCreating ? 'Create wage pay item' : title || 'Wage pay item'
);

export const getAlert = (state) => getWagePayItemModal(state).alert;

export const getIsLoading = (state) => getWagePayItemModal(state).isLoading;

export const getIsActionDisabled = (state) =>
  getWagePayItemModal(state).isSubmitting;

export const getWage = (state) => getWagePayItemModal(state).wage;

export const getAtoReportCategoryList = (state) =>
  getWagePayItemModal(state).atoReportCategoryList;

export const getIsHourlyView = (state) => getWage(state).payBasis === 'Hourly';

export const getAccounts = (state) => getWagePayItemModal(state).accounts;

export const getDefaultAccountId = (state) =>
  getWagePayItemModal(state).defaultAccountId;

export const getOverrideAccount = (state) =>
  getWagePayItemModal(state).overrideAccount;

export const getPayRateList = (state) => getWagePayItemModal(state).payRateList;

const getSelectedEmployees = (state) => getWage(state).selectedEmployees;

const getEmployees = (state) => getWagePayItemModal(state).employees;

export const getIsJobKeeper = (state) => getWagePayItemModal(state).isJobKeeper;

const getFilteredListOfEmployees = createSelector(
  getEmployees,
  getSelectedEmployees,
  (employees, selectedEmployees) =>
    employees.filter(
      ({ id }) =>
        !selectedEmployees.find(({ id: selectedId }) => selectedId === id)
    )
);

export const getEmployeeAllocations = createStructuredSelector({
  selectedEmployees: getSelectedEmployees,
  filteredListOfEmployees: getFilteredListOfEmployees,
});

const getSelectedExemptions = (state) => getWage(state).selectedExemptions;

const getExemptions = (state) => getWagePayItemModal(state).exemptions;

const getFilteredListOfExemptions = createSelector(
  getExemptions,
  getSelectedExemptions,
  (exemptions, selectedExemptions) =>
    exemptions.filter(
      ({ id }) =>
        !selectedExemptions.find(({ id: selectedId }) => selectedId === id)
    )
);

export const getExemptionAllocations = createStructuredSelector({
  selectedExemptions: getSelectedExemptions,
  filteredListOfExemptions: getFilteredListOfExemptions,
});

export const getSaveWagePayItemModalPayload = (state) => {
  const {
    wage: {
      selectedEmployees,
      selectedExemptions,
      accountId,
      isSystem,
      ...rest
    },
    overrideAccount,
  } = getWagePayItemModal(state);

  return {
    ...rest,
    accountId: overrideAccount ? accountId : '',
    employeeIds: selectedEmployees.map((employee) => employee.id),
    exemptions: selectedExemptions.map((exemption) => ({
      id: exemption.id,
      type: exemption.itemType,
    })),
  };
};
