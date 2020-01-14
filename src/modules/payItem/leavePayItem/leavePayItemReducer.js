import {
  ADD_EMPLOYEE,
  ADD_EXEMPTION,
  ADD_LINKED_WAGE,
  CLOSE_MODAL,
  LOAD_LEAVE_PAY_ITEM,
  OPEN_MODAL,
  REMOVE_EMPLOYEE,
  REMOVE_EXEMPTION,
  REMOVE_LINKED_WAGE,
  SET_ALERT,
  SET_LOADING_STATE,
  SET_SUBMITTING_STATE,
  UPDATE_CALCULATION_BASIS,
  UPDATE_CALCULATION_BASIS_AMOUNTS,
  UPDATE_NAME,
} from './LeavePayItemIntents';
import { RESET_STATE, SET_INITIAL_STATE } from '../../../SystemIntents';
import LoadingState from '../../../components/PageView/LoadingState';
import createReducer from '../../../store/createReducer';

const formatAmount = value => (Number(value) || 0).toFixed(3);

const removeTrailingZeroes = number => String(Number(number));

const countDecimalPlaces = (num) => {
  if (Math.floor(num) === num) return 0;
  return num.toString().split('.')[1].length || 0;
};

const formatPercentage = (percentage) => {
  if (countDecimalPlaces(percentage) < 2) {
    return percentage.toFixed(2);
  }

  return removeTrailingZeroes(percentage.toFixed(5));
};

const getDefaultState = () => ({
  businessId: '',
  region: '',
  loadingState: LoadingState.LOADING,
  isPageEdited: false,
  isSubmitting: false,
  modalType: '',
  alert: undefined,
  leavePayItemId: '',
  leavePayItem: {
    title: '',
    name: '',
    printOnPaySlip: true,
    carryRemainingLeave: false,
    calculationBasisType: '',
    calculationBasisPercentage: '',
    calculationBasisPayItemId: '',
    calculationBasisAmount: '',
    calculationBasisPeriod: '',
    selectedExemptions: [],
    selectedEmployees: [],
    selectedLinkedWages: [],
  },
  calculationBasisTypes: [],
  calculationBasisPercentOfOptions: [],
  payPeriods: [],
  employees: [],
  exemptionOptions: [],
  linkedWagesOptions: [],
});

const setInitialState = (state, action) => ({
  ...state,
  ...action.context,
});

const resetState = () => (getDefaultState());

const setAlert = (state, action) => ({
  ...state,
  alert: action.alert,
});

const openModal = (state, action) => ({
  ...state,
  modalType: action.modalType,
});

const closeModal = state => ({
  ...state,
  modalType: '',
});

const setLoadingState = (state, { loadingState }) => ({
  ...state,
  loadingState,
});

const setSubmittingState = (state, action) => ({
  ...state,
  isSubmitting: action.isSubmitting,
});

const loadLeavePayItem = (state, action) => ({
  ...state,
  ...action,
  leavePayItem: {
    ...state.leavePayItem,
    ...action.leavePayItem,
  },
});

const addEmployee = (state, action) => ({
  ...state,
  leavePayItem: {
    ...state.leavePayItem,
    selectedEmployees: [
      ...state.leavePayItem.selectedEmployees,
      {
        name: action.name,
        id: action.id,
      },
    ],
  },
  isPageEdited: true,
});

const removeEmployee = (state, action) => ({
  ...state,
  leavePayItem: {
    ...state.leavePayItem,
    selectedEmployees: state.leavePayItem.selectedEmployees.filter(
      selectedEmployee => selectedEmployee.id !== action.id,
    ),
  },
  isPageEdited: true,
});

const addExemption = (state, action) => ({
  ...state,
  leavePayItem: {
    ...state.leavePayItem,
    selectedExemptions: [
      ...state.leavePayItem.selectedExemptions,
      state.exemptionOptions.find(({ id }) => id === action.id),
    ],
  },
  isPageEdited: true,
});

const removeExemption = (state, action) => ({
  ...state,
  leavePayItem: {
    ...state.leavePayItem,
    selectedExemptions: state.leavePayItem.selectedExemptions.filter(
      selectedExemption => selectedExemption.id !== action.id,
    ),
  },
  isPageEdited: true,
});

const addLinkedWage = (state, action) => ({
  ...state,
  leavePayItem: {
    ...state.leavePayItem,
    selectedLinkedWages: [
      ...state.leavePayItem.selectedLinkedWages,
      state.linkedWagesOptions.find(({ id }) => id === action.id),
    ],
  },
  isPageEdited: true,
});

const removeLinkedWage = (state, action) => ({
  ...state,
  leavePayItem: {
    ...state.leavePayItem,
    selectedLinkedWages: state.leavePayItem.selectedLinkedWages.filter(
      selectedLinkedWage => selectedLinkedWage.id !== action.id,
    ),
  },
  isPageEdited: true,
});

const updateName = (state, action) => ({
  ...state,
  leavePayItem: {
    ...state.leavePayItem,
    name: action.value,
  },
  isPageEdited: true,
});

const updateCalculationBasis = (state, action) => ({
  ...state,
  leavePayItem: {
    ...state.leavePayItem,
    [action.key]: action.value,
  },
  isPageEdited: true,
});

const updateCalculationBasisAmounts = (state, { key, value }) => {
  if (key === 'calculationBasisPercentage') {
    const number = Number(value) || 0;
    const formattedPercentage = formatPercentage(number);
    return updateCalculationBasis(state, { key, value: formattedPercentage });
  }
  if (key === 'calculationBasisAmount') {
    const formattedAmount = formatAmount(value);
    return updateCalculationBasis(state, { key, value: formattedAmount });
  }
  return updateCalculationBasis(state, { key, value });
};

const handlers = {
  [SET_INITIAL_STATE]: setInitialState,
  [RESET_STATE]: resetState,
  [SET_ALERT]: setAlert,
  [OPEN_MODAL]: openModal,
  [CLOSE_MODAL]: closeModal,
  [SET_LOADING_STATE]: setLoadingState,
  [SET_SUBMITTING_STATE]: setSubmittingState,
  [LOAD_LEAVE_PAY_ITEM]: loadLeavePayItem,
  [ADD_EMPLOYEE]: addEmployee,
  [ADD_EXEMPTION]: addExemption,
  [ADD_LINKED_WAGE]: addLinkedWage,
  [REMOVE_EMPLOYEE]: removeEmployee,
  [REMOVE_EXEMPTION]: removeExemption,
  [REMOVE_LINKED_WAGE]: removeLinkedWage,
  [UPDATE_NAME]: updateName,
  [UPDATE_CALCULATION_BASIS]: updateCalculationBasis,
  [UPDATE_CALCULATION_BASIS_AMOUNTS]: updateCalculationBasisAmounts,
};

const leavePayItemReducer = createReducer(getDefaultState(), handlers);

export default leavePayItemReducer;
