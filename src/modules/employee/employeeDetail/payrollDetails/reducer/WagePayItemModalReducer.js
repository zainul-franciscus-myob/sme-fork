import {
  ADD_WAGE_PAY_ITEM_MODAL_EMPLOYEE,
  ADD_WAGE_PAY_ITEM_MODAL_EXEMPTION,
  CLOSE_WAGE_PAY_ITEM_MODAL,
  CREATE_WAGE_PAY_ITEM_MODAL,
  LOAD_WAGE_PAY_ITEM_MODAL,
  OPEN_WAGE_PAY_ITEM_MODAL,
  REMOVE_WAGE_PAY_ITEM_MODAL_EMPLOYEE,
  REMOVE_WAGE_PAY_ITEM_MODAL_EXEMPTION,
  SET_WAGE_PAY_ITEM_MODAL_ALERT,
  SET_WAGE_PAY_ITEM_MODAL_LOADING_STATE,
  SET_WAGE_PAY_ITEM_MODAL_SUBMITTING_STATE,
  UPDATE_WAGE_PAY_ITEM_MODAL,
  UPDATE_WAGE_PAY_ITEM_MODAL_AMOUNT,
  UPDATE_WAGE_PAY_ITEM_MODAL_DETAILS,
  UPDATE_WAGE_PAY_ITEM_MODAL_OVERRIDE_ACCOUNT,
} from '../../../EmployeeIntents';
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

const openWagePayItemModal = (state, { id }) => {
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

const setWagePayItemModalLoadingState = (state, { isLoading }) => (
  setWagePayItemModalState(state, { isLoading })
);

const setWagePayItemModalSubmittingState = (state, { isSubmitting }) => (
  setWagePayItemModalState(state, { isSubmitting })
);

const loadWagePayItemModal = (state, { response }) => ({
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

const createWagePayItemModal = (state, {
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
  isPageEdited: true,
});

const updateWagePayItemModal = (state, {
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

const closeWagePayItemModal = state => ({
  ...state,
  wagePayItemModal: undefined,
});

const setWagePayItemModalAlert = (state, { alert }) => (
  setWagePayItemModalState(state, { alert })
);

const updateWagePayItemModalDetails = (state, { key, value }) => ({
  ...state,
  wagePayItemModal: {
    ...state.wagePayItemModal,
    wage: {
      ...state.wagePayItemModal.wage,
      [key]: value,
    },
  },
});

const formatAmount = value => (value === null || value === '' ? null : (Number(value || 0)).toFixed(4));

const updateWagePayItemModalAmount = (state, { key, value }) => ({
  ...state,
  wagePayItemModal: {
    ...state.wagePayItemModal,
    wage: {
      ...state.wagePayItemModal.wage,
      [key]: formatAmount(value),
    },
  },
});

const updateWagePayItemModalOverrideAccount = (state, { value }) => ({
  ...state,
  wagePayItemModal: {
    ...state.wagePayItemModal,
    overrideAccount: value,
  },
});

const addWagePayItemModalEmployee = (state, { value }) => ({
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

const removeWagePayItemModalEmployee = (state, { id }) => ({
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

const addWagePayItemModalExemption = (state, { value }) => ({
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

const removeWagePayItemModalExemption = (state, { id }) => ({
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

export default {
  [OPEN_WAGE_PAY_ITEM_MODAL]: openWagePayItemModal,
  [SET_WAGE_PAY_ITEM_MODAL_LOADING_STATE]: setWagePayItemModalLoadingState,
  [SET_WAGE_PAY_ITEM_MODAL_SUBMITTING_STATE]: setWagePayItemModalSubmittingState,
  [LOAD_WAGE_PAY_ITEM_MODAL]: loadWagePayItemModal,
  [CLOSE_WAGE_PAY_ITEM_MODAL]: closeWagePayItemModal,
  [SET_WAGE_PAY_ITEM_MODAL_ALERT]: setWagePayItemModalAlert,
  [UPDATE_WAGE_PAY_ITEM_MODAL_DETAILS]: updateWagePayItemModalDetails,
  [UPDATE_WAGE_PAY_ITEM_MODAL_AMOUNT]: updateWagePayItemModalAmount,
  [UPDATE_WAGE_PAY_ITEM_MODAL_OVERRIDE_ACCOUNT]: updateWagePayItemModalOverrideAccount,
  [ADD_WAGE_PAY_ITEM_MODAL_EMPLOYEE]: addWagePayItemModalEmployee,
  [REMOVE_WAGE_PAY_ITEM_MODAL_EMPLOYEE]: removeWagePayItemModalEmployee,
  [ADD_WAGE_PAY_ITEM_MODAL_EXEMPTION]: addWagePayItemModalExemption,
  [REMOVE_WAGE_PAY_ITEM_MODAL_EXEMPTION]: removeWagePayItemModalExemption,
  [CREATE_WAGE_PAY_ITEM_MODAL]: createWagePayItemModal,
  [UPDATE_WAGE_PAY_ITEM_MODAL]: updateWagePayItemModal,
};
