import {
  ADD_ALLOCATED_EMPLOYEE,
  ADD_EXEMPTION_PAY_ITEM,
  CHANGE_EXPENSE_PAY_ITEM_INPUT,
  FORMAT_EXPENSE_PAY_ITEM_AMOUNT_INPUT,
  LOAD_EXPENSE_PAY_ITEM,
  LOAD_NEW_EXPENSE_PAY_ITEM,
  REMOVE_ALLOCATED_EMPLOYEE,
  REMOVE_EXEMPTION_PAY_ITEM,
  SET_ALERT_MESSAGE,
  SET_IS_LOADING,
  SET_IS_PAGE_EDITED,
  SET_IS_SUBMITTING,
  SET_MODAL_TYPE,
} from './ExpensePayItemIntents';
import { RESET_STATE, SET_INITIAL_STATE } from '../../SystemIntents';
import createReducer from '../../store/createReducer';

const getDefaultState = () => ({
  businessId: '',
  expensePayItemId: '',
  region: '',
  name: '',
  originalName: '',
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
  isLoading: false,
  isSubmitting: false,
  isPageEdited: false,
  modalType: '',
  alertMessage: '',
});

const resetState = () => getDefaultState();

const setInitialState = (state, action) => ({
  ...state,
  ...action.context,
});

const setIsLoading = (state, action) => ({
  ...state,
  isLoading: action.isLoading,
});

const setIsSubmitting = (state, action) => ({
  ...state,
  isSubmitting: action.isSubmitting,
});

const setIsPageEdited = (state, action) => ({
  ...state,
  isPageEdited: action.isPageEdited,
});

const setModalType = (state, action) => ({
  ...state,
  modalType: action.modalType,
});

const setAlertMessage = (state, action) => ({
  ...state,
  alertMessage: action.alertMessage,
});

const loadNewExpensePayItem = (state, action) => ({
  ...state,
  name: action.expensePayItem.name,
  linkedExpenseAccountId: action.expensePayItem.linkedExpenseAccountId,
  linkedPayablesAccountId: action.expensePayItem.linkedPayablesAccountId,
  isPrintOnPaySlip: action.expensePayItem.isPrintOnPaySlip,
  calculationBasis: action.expensePayItem.calculationBasis,
  calculationBasisPercentage: action.expensePayItem.calculationBasisPercentage,
  calculationBasisPayItemId: action.expensePayItem.calculationBasisPayItemId,
  calculationBasisAmount: action.expensePayItem.calculationBasisAmount,
  calculationBasisPeriod: action.expensePayItem.calculationBasisPeriod,
  limit: action.expensePayItem.limit,
  limitPercentage: action.expensePayItem.limitPercentage,
  limitPayItemId: action.expensePayItem.limitPayItemId,
  limitAmount: action.expensePayItem.limitAmount,
  limitPeriod: action.expensePayItem.limitPeriod,
  threshold: action.expensePayItem.threshold,
  exemptionPayItems: action.expensePayItem.exemptionPayItems,
  allocatedEmployees: action.expensePayItem.allocatedEmployees,
  exemptionPayItemOptions: action.expensePayItem.exemptionPayItemOptions,
  limitPayItemOptions: action.expensePayItem.limitPayItemOptions,
  periodOptions: action.expensePayItem.periodOptions,
  calculationBasisPayItemOptions: action.expensePayItem.calculationBasisPayItemOptions,
  linkedExpenseAccountOptions: action.expensePayItem.linkedExpenseAccountOptions,
  linkedPayablesAccountOptions: action.expensePayItem.linkedPayablesAccountOptions,
  employeeOptions: action.expensePayItem.employeeOptions,
});

const loadExistingExpensePayItem = (state, action) => ({
  ...state,
  name: action.expensePayItem.name,
  originalName: action.expensePayItem.name,
  linkedExpenseAccountId: action.expensePayItem.linkedExpenseAccountId,
  linkedPayablesAccountId: action.expensePayItem.linkedPayablesAccountId,
  isPrintOnPaySlip: action.expensePayItem.isPrintOnPaySlip,
  calculationBasis: action.expensePayItem.calculationBasis,
  calculationBasisPercentage: action.expensePayItem.calculationBasisPercentage,
  calculationBasisPayItemId: action.expensePayItem.calculationBasisPayItemId,
  calculationBasisAmount: action.expensePayItem.calculationBasisAmount,
  calculationBasisPeriod: action.expensePayItem.calculationBasisPeriod,
  limit: action.expensePayItem.limit,
  limitPercentage: action.expensePayItem.limitPercentage,
  limitPayItemId: action.expensePayItem.limitPayItemId,
  limitAmount: action.expensePayItem.limitAmount,
  limitPeriod: action.expensePayItem.limitPeriod,
  threshold: action.expensePayItem.threshold,
  exemptionPayItems: action.expensePayItem.exemptionPayItems,
  allocatedEmployees: action.expensePayItem.allocatedEmployees,
  exemptionPayItemOptions: action.expensePayItem.exemptionPayItemOptions,
  limitPayItemOptions: action.expensePayItem.limitPayItemOptions,
  periodOptions: action.expensePayItem.periodOptions,
  calculationBasisPayItemOptions: action.expensePayItem.calculationBasisPayItemOptions,
  linkedExpenseAccountOptions: action.expensePayItem.linkedExpenseAccountOptions,
  linkedPayablesAccountOptions: action.expensePayItem.linkedPayablesAccountOptions,
  employeeOptions: action.expensePayItem.employeeOptions,
});

const changeExpensePayItemInput = (state, action) => ({
  ...state,
  [action.key]: action.value,
});

const safeParseNumber = strNum => (Number(strNum) ? Number(strNum) : 0);

const formatAmount = num => num.toFixed(2);

const removeTrailingZeroes = num => String(Number(num));

const countDecimalPlaces = (num) => {
  if (Math.floor(num) === num) return 0;
  return num.toString()
    .split('.')[1].length || 0;
};

const formatPercentage = (num) => {
  if (countDecimalPlaces(num) < 2) {
    return num.toFixed(2);
  }

  return removeTrailingZeroes(num.toFixed(5));
};

const formatExpensePayItemAmountInput = state => ({
  ...state,
  calculationBasisPercentage: formatPercentage(safeParseNumber(state.calculationBasisPercentage)),
  calculationBasisAmount: formatAmount(safeParseNumber(state.calculationBasisAmount)),
  limitPercentage: formatPercentage(safeParseNumber(state.limitPercentage)),
  limitAmount: formatAmount(safeParseNumber(state.limitAmount)),
  threshold: formatAmount(safeParseNumber(state.threshold)),
});

const addAllocatedEmployee = (state, action) => ({
  ...state,
  allocatedEmployees: [
    ...state.allocatedEmployees,
    state.employeeOptions.find(employee => employee.id === action.id),
  ],
});

const removeAllocatedEmployee = (state, action) => ({
  ...state,
  allocatedEmployees: state.allocatedEmployees.filter(employee => action.id !== employee.id),
});

const addExemptionPayItem = (state, action) => ({
  ...state,
  exemptionPayItems: [
    ...state.exemptionPayItems,
    state.exemptionPayItemOptions.find(exemption => exemption.id === action.id),
  ],
});

const removeExemptionPayItem = (state, action) => ({
  ...state,
  exemptionPayItems: state.exemptionPayItems.filter(employee => action.id !== employee.id),
});

const handlers = {
  [SET_INITIAL_STATE]: setInitialState,
  [RESET_STATE]: resetState,
  [SET_IS_LOADING]: setIsLoading,
  [SET_IS_SUBMITTING]: setIsSubmitting,
  [SET_IS_PAGE_EDITED]: setIsPageEdited,
  [SET_MODAL_TYPE]: setModalType,
  [SET_ALERT_MESSAGE]: setAlertMessage,
  [LOAD_NEW_EXPENSE_PAY_ITEM]: loadNewExpensePayItem,
  [LOAD_EXPENSE_PAY_ITEM]: loadExistingExpensePayItem,
  [CHANGE_EXPENSE_PAY_ITEM_INPUT]: changeExpensePayItemInput,
  [FORMAT_EXPENSE_PAY_ITEM_AMOUNT_INPUT]: formatExpensePayItemAmountInput,
  [ADD_ALLOCATED_EMPLOYEE]: addAllocatedEmployee,
  [REMOVE_ALLOCATED_EMPLOYEE]: removeAllocatedEmployee,
  [ADD_EXEMPTION_PAY_ITEM]: addExemptionPayItem,
  [REMOVE_EXEMPTION_PAY_ITEM]: removeExemptionPayItem,
};

const expensePayItemReducer = createReducer(getDefaultState(), handlers);

export default expensePayItemReducer;
