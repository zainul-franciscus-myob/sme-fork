import {
  ADD_EXPENSE_PAY_ITEM_MODAL_ALLOCATED_EMPLOYEE,
  ADD_EXPENSE_PAY_ITEM_MODAL_EXEMPTION_PAY_ITEM,
  CHANGE_EXPENSE_PAY_ITEM_MODAL_INPUT,
  CLOSE_EXPENSE_PAY_ITEM_MODAL,
  CREATE_EXPENSE_PAY_ITEM_MODAL,
  FORMAT_EXPENSE_PAY_ITEM_MODAL_AMOUNT_INPUT,
  LOAD_EXPENSE_PAY_ITEM_MODAL,
  OPEN_EXPENSE_PAY_ITEM_MODAL,
  REMOVE_EXPENSE_PAY_ITEM_MODAL_ALLOCATED_EMPLOYEE,
  REMOVE_EXPENSE_PAY_ITEM_MODAL_EXEMPTION_PAY_ITEM,
  SET_EXPENSE_PAY_ITEM_MODAL_ALERT,
  SET_EXPENSE_PAY_ITEM_MODAL_LOADING_STATE,
  SET_EXPENSE_PAY_ITEM_MODAL_SUBMITTING_STATE,
  UPDATE_EXPENSE_PAY_ITEM_MODAL,
} from '../../../EmployeeIntents';
import {
  getAllocatedEmployees,
  getCalculationBasisAmount,
  getCalculationBasisPercentage,
  getEmployeeOptions,
  getExemptionPayItemOptions,
  getExemptionPayItems,
  getLimitAmount,
  getLimitPercentage,
  getThreshold,
} from '../selectors/ExpensePayItemModalSelectors';
import { getExpensePayItems } from '../selectors/PayrollExpenseDetailSelectors';

const getExpensePayItemModalDefaultState = () => ({
  id: '',
  isLoading: false,
  isSubmitting: false,
  alert: undefined,
  title: '',
  name: '',
  linkedExpenseAccountId: '',
  linkedPayablesAccountId: '',
  isPrintOnPaySlip: false,
  calculationBasis: '',
  calculationBasisPercentage: '',
  calculationBasisPayItemId: '',
  calculationBasisAmount: '',
  calculationBasisPeriod: '',
  limit: '',
  limitPercentage: '',
  limitPayItemId: '',
  limitAmount: '',
  limitPeriod: '',
  threshold: '',
  exemptionPayItems: [],
  allocatedEmployees: [],
  exemptionPayItemOptions: [],
  limitPayItemOptions: [],
  periodOptions: [],
  calculationBasisPayItemOptions: [],
  linkedExpenseAccountOptions: [],
  linkedPayablesAccountOptions: [],
  employeeOptions: [],
});

const setExpensePayItemModalState = (state, modal) => ({
  ...state,
  expensePayItemModal: {
    ...state.expensePayItemModal,
    ...modal,
  },
});

const setExpensePayItemModalAlert = (state, { alert }) => (
  setExpensePayItemModalState(state, { alert })
);

const changeExpensePayItemModalInput = (state, { key, value }) => ({
  ...state,
  expensePayItemModal: {
    ...state.expensePayItemModal,
    [key]: value,
  },
});

const countDecimalPlaces = (num) => {
  if (Math.floor(num) === num) return 0;
  return num.toString()
    .split('.')[1].length || 0;
};

const removeTrailingZeroes = num => String(Number(num));

const formatPercentage = (num) => {
  if (countDecimalPlaces(num) < 2) {
    return num.toFixed(2);
  }

  return removeTrailingZeroes(num.toFixed(5));
};

const safeParseNumber = strNum => (Number(strNum) ? Number(strNum) : 0);

const formatAmount = num => num.toFixed(2);

const formatExpensePayItemModalAmountInput = state => (
  setExpensePayItemModalState(
    state,
    {
      calculationBasisPercentage:
        formatPercentage(safeParseNumber(getCalculationBasisPercentage(state))),
      calculationBasisAmount:
        formatAmount(safeParseNumber(getCalculationBasisAmount(state))),
      limitPercentage:
        formatPercentage(safeParseNumber(getLimitPercentage(state))),
      limitAmount:
        formatAmount(safeParseNumber(getLimitAmount(state))),
      threshold:
        formatAmount(safeParseNumber(getThreshold(state))),
    },
  )
);

const addExpensePayItemModalAllocatedEmployee = (state, action) => (
  setExpensePayItemModalState(
    state,
    {
      allocatedEmployees: [
        ...getAllocatedEmployees(state),
        getEmployeeOptions(state).find(employee => employee.id === action.id),
      ],
    },
  )
);

const removeExpensePayItemModalAllocatedEmployee = (state, action) => (
  setExpensePayItemModalState(
    state,
    {
      allocatedEmployees:
        getAllocatedEmployees(state).filter(employee => action.id !== employee.id),
    },
  )
);

const addExpensePayItemModalExemptionPayItem = (state, action) => (
  setExpensePayItemModalState(
    state,
    {
      exemptionPayItems: [
        ...getExemptionPayItems(state),
        getExemptionPayItemOptions(state).find(exemption => exemption.id === action.id),
      ],
    },
  )
);

const removeExpensePayItemModalExemptionPayItem = (state, action) => (
  setExpensePayItemModalState(
    state,
    {
      exemptionPayItems:
        getExemptionPayItems(state).filter(exemption => action.id !== exemption.id),
    },
  )
);

const openExpensePayItemModal = (state, { id }) => {
  const expensePayItemModalDefaultState = getExpensePayItemModalDefaultState();

  return setExpensePayItemModalState(
    state,
    {
      ...expensePayItemModalDefaultState,
      id,
    },
  );
};

const setExpensePayItemModalLoadingState = (state, { isLoading }) => (
  setExpensePayItemModalState(state, { isLoading })
);

const loadExpensePayItemModal = (state, { response }) => (
  setExpensePayItemModalState(
    state,
    { ...response },
  )
);

const closeExpensePayItemModal = state => ({
  ...state,
  expensePayItemModal: undefined,
});

const setExpensePayItemModalSubmittingState = (state, { isSubmitting }) => (
  setExpensePayItemModalState(state, { isSubmitting })
);

const createExpensePayItemModal = (state, {
  response: { expensePayItem, expensePayItems },
}) => ({
  ...state,
  payrollDetails: {
    ...state.payrollDetails,
    employerExpenseDetails: {
      ...state.payrollDetails.employerExpenseDetails,
      expensePayItems: [
        ...state.payrollDetails.employerExpenseDetails.expensePayItems,
        expensePayItem,
      ],
    },
  },
  expensePayItemOptions: expensePayItems,
  isPageEdited: true,
});


const updateExpensePayItemModal = (state, {
  response: { expensePayItem, expensePayItems },
}) => {
  const addedPayItems = getExpensePayItems(state);
  const updatedWagePayItems = addedPayItems
    .map(payItem => (payItem.id === expensePayItem.id ? expensePayItem : payItem));

  return {
    ...state,
    payrollDetails: {
      ...state.payrollDetails,
      employerExpenseDetails: {
        ...state.payrollDetails.employerExpenseDetails,
        expensePayItems: updatedWagePayItems,
      },
    },
    expensePayItemOptions: expensePayItems,
  };
};

export default {
  [SET_EXPENSE_PAY_ITEM_MODAL_ALERT]: setExpensePayItemModalAlert,
  [CHANGE_EXPENSE_PAY_ITEM_MODAL_INPUT]: changeExpensePayItemModalInput,
  [FORMAT_EXPENSE_PAY_ITEM_MODAL_AMOUNT_INPUT]: formatExpensePayItemModalAmountInput,
  [ADD_EXPENSE_PAY_ITEM_MODAL_ALLOCATED_EMPLOYEE]: addExpensePayItemModalAllocatedEmployee,
  [REMOVE_EXPENSE_PAY_ITEM_MODAL_ALLOCATED_EMPLOYEE]: removeExpensePayItemModalAllocatedEmployee,
  [ADD_EXPENSE_PAY_ITEM_MODAL_EXEMPTION_PAY_ITEM]: addExpensePayItemModalExemptionPayItem,
  [REMOVE_EXPENSE_PAY_ITEM_MODAL_EXEMPTION_PAY_ITEM]: removeExpensePayItemModalExemptionPayItem,
  [OPEN_EXPENSE_PAY_ITEM_MODAL]: openExpensePayItemModal,
  [SET_EXPENSE_PAY_ITEM_MODAL_LOADING_STATE]: setExpensePayItemModalLoadingState,
  [LOAD_EXPENSE_PAY_ITEM_MODAL]: loadExpensePayItemModal,
  [CLOSE_EXPENSE_PAY_ITEM_MODAL]: closeExpensePayItemModal,
  [SET_EXPENSE_PAY_ITEM_MODAL_SUBMITTING_STATE]: setExpensePayItemModalSubmittingState,
  [CREATE_EXPENSE_PAY_ITEM_MODAL]: createExpensePayItemModal,
  [UPDATE_EXPENSE_PAY_ITEM_MODAL]: updateExpensePayItemModal,
};
