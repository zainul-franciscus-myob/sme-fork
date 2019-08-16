import { getAllocatedWagePayItems } from '../selectors/PayrollWageSelectors';

const getWagePayItemModalDefaultState = () => ({
  id: '',
  isLoading: false,
  isSubmitting: false,
  alert: undefined,
  title: '',
  wage: {
    name: '',
    atoReportingCategory: '',
    payBasis: '',
    payRate: '',
    payRateMultiplier: '',
    fixedHourlyPayRate: '',
    autoAdjustBase: false,
    selectedEmployees: [],
    selectedExemptions: [],
  },
  defaultAccountId: '',
  overrideAccount: false,
  accounts: [],
  payRateList: [],
  atoReportCategoryList: [],
  employees: [],
  exemptions: [],
});

export const openWagePayItemModal = (state, { id }) => {
  const wagePayItemModalDefaultState = getWagePayItemModalDefaultState();

  return {
    ...state,
    wagePayItemModal: {
      ...wagePayItemModalDefaultState,
      id,
    },
  };
};

const setWagePayItemModalState = (state, modal) => ({
  ...state,
  wagePayItemModal: {
    ...state.wagePayItemModal,
    ...modal,
  },
});

export const setWagePayItemModalLoadingState = (state, { isLoading }) => (
  setWagePayItemModalState(state, { isLoading })
);

export const setWagePayItemModalSubmittingState = (state, { isSubmitting }) => (
  setWagePayItemModalState(state, { isSubmitting })
);

export const loadWagePayItemModal = (state, { response }) => ({
  ...state,
  wagePayItemModal: {
    ...state.wagePayItemModal,
    ...response,
    wage: {
      ...state.wagePayItemModal.wage,
      ...response.wage,
    },
  },
});

export const createWagePayItemModal = (state, {
  response: { wagePayItem, wagePayItems },
}) => ({
  ...state,
  payrollDetails: {
    ...state.payrollDetails,
    wage: {
      ...state.payrollDetails.wage,
      allocatedWagePayItems: [
        ...state.payrollDetails.wage.allocatedWagePayItems,
        wagePayItem,
      ],
    },
  },
  wagePayItems,
});

export const updateWagePayItemModal = (state, {
  response: { wagePayItem, wagePayItems },
}) => {
  const allocatedWagePayItems = getAllocatedWagePayItems(state);
  const updatedWagePayItems = allocatedWagePayItems
    .map(payItem => (payItem.id === wagePayItem.id ? wagePayItem : payItem));

  return {
    ...state,
    payrollDetails: {
      ...state.payrollDetails,
      wage: {
        ...state.payrollDetails.wage,
        allocatedWagePayItems: updatedWagePayItems,
      },
    },
    wagePayItems,
  };
};

export const closeWagePayItemModal = state => ({
  ...state,
  wagePayItemModal: undefined,
});

export const setWagePayItemModalAlert = (state, { alert }) => (
  setWagePayItemModalState(state, { alert })
);

export const updateWagePayItemModalDetails = (state, { key, value }) => ({
  ...state,
  wagePayItemModal: {
    ...state.wagePayItemModal,
    wage: {
      ...state.wagePayItemModal.wage,
      [key]: value,
    },
  },
});

const formatAmount = value => (Number(value) || 0).toFixed(4);

export const updateWagePayItemModalAmount = (state, { key, value }) => ({
  ...state,
  wagePayItemModal: {
    ...state.wagePayItemModal,
    wage: {
      ...state.wagePayItemModal.wage,
      [key]: formatAmount(value),
    },
  },
});

export const updateWagePayItemModalOverrideAccount = (state, { value }) => ({
  ...state,
  wagePayItemModal: {
    ...state.wagePayItemModal,
    overrideAccount: value,
  },
});

export const addWagePayItemModalEmployee = (state, { value }) => ({
  ...state,
  wagePayItemModal: {
    ...state.wagePayItemModal,
    wage: {
      ...state.wagePayItemModal.wage,
      selectedEmployees: [
        ...state.wagePayItemModal.wage.selectedEmployees,
        state.wagePayItemModal.employees.find(({ id }) => id === value),
      ],
    },
  },
});

export const removeWagePayItemModalEmployee = (state, { id }) => ({
  ...state,
  wagePayItemModal: {
    ...state.wagePayItemModal,
    wage: {
      ...state.wagePayItemModal.wage,
      selectedEmployees: state.wagePayItemModal.wage.selectedEmployees.filter(
        employee => employee.id !== id,
      ),
    },
  },
});

export const addWagePayItemModalExemption = (state, { value }) => ({
  ...state,
  wagePayItemModal: {
    ...state.wagePayItemModal,
    wage: {
      ...state.wagePayItemModal.wage,
      selectedExemptions: [
        ...state.wagePayItemModal.wage.selectedExemptions,
        state.wagePayItemModal.exemptions.find(({ id }) => id === value),
      ],
    },
  },
});

export const removeWagePayItemModalExemption = (state, { id }) => ({
  ...state,
  wagePayItemModal: {
    ...state.wagePayItemModal,
    wage: {
      ...state.wagePayItemModal.wage,
      selectedExemptions: state.wagePayItemModal.wage.selectedExemptions.filter(
        exemption => exemption.id !== id,
      ),
    },
  },
});
