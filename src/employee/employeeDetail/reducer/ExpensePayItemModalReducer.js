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

export const setExpensePayItemModalAlert = (state, { alert }) => (
  setExpensePayItemModalState(state, { alert })
);

export const changeExpensePayItemModalInput = (state, { key, value }) => ({
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

export const formatExpensePayItemModalAmountInput = state => (
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

export const addExpensePayItemModalAllocatedEmployee = (state, action) => (
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

export const removeExpensePayItemModalAllocatedEmployee = (state, action) => (
  setExpensePayItemModalState(
    state,
    {
      allocatedEmployees:
        getAllocatedEmployees(state).filter(employee => action.id !== employee.id),
    },
  )
);

export const addExpensePayItemModalExemptionPayItem = (state, action) => (
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

export const removeExpensePayItemModalExemptionPayItem = (state, action) => (
  setExpensePayItemModalState(
    state,
    {
      exemptionPayItems:
        getExemptionPayItems(state).filter(exemption => action.id !== exemption.id),
    },
  )
);

export const openExpensePayItemModal = (state, { id }) => {
  const expensePayItemModalDefaultState = getExpensePayItemModalDefaultState();

  return setExpensePayItemModalState(
    state,
    {
      ...expensePayItemModalDefaultState,
      id,
    },
  );
};

export const setExpensePayItemModalLoadingState = (state, { isLoading }) => (
  setExpensePayItemModalState(state, { isLoading })
);

export const loadExpensePayItemModal = (state, { response }) => (
  setExpensePayItemModalState(
    state,
    { ...response },
  )
);

export const closeExpensePayItemModal = state => ({
  ...state,
  expensePayItemModal: undefined,
});

export const setExpensePayItemModalSubmittingState = (state, { isSubmitting }) => (
  setExpensePayItemModalState(state, { isSubmitting })
);

export const createExpensePayItemModal = (state, {
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


export const updateExpensePayItemModal = (state, {
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
