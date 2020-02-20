import {
  ADD_EMPLOYEE,
  ADD_EXEMPTION,
  CLOSE_MODAL,
  LOAD_EXISTING_PAY_ITEM,
  LOAD_NEW_PAY_ITEM,
  OPEN_MODAL,
  REMOVE_EMPLOYEE,
  REMOVE_EXEMPTION,
  SET_ALERT,
  SET_IS_SUBMITTING,
  SET_LOADING_STATE,
  UPDATE_DETAILS,
  UPDATE_OVERRIDE_ACCOUNT,
} from './WagePayItemIntents';
import { RESET_STATE, SET_INITIAL_STATE } from '../../../SystemIntents';
import createReducer from '../../../store/createReducer';

const getDefaultState = () => ({
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
  modalType: '',
  isSubmitting: false,
  isLoading: false,
  isPageEdited: false,
  alert: undefined,
});

const resetState = () => (getDefaultState());

const setInitialState = (state, action) => ({
  ...state,
  ...action.context,
});

const setLoadingState = (state, { isLoading }) => ({
  ...state,
  isLoading,
});

const setSubmittingState = (state, { isSubmitting }) => ({
  ...state,
  isSubmitting,
});

const loadPayItem = (state, action) => ({
  ...state,
  title: action.title,
  wage: {
    ...state.wage,
    ...action.wage,
  },
  defaultAccountId: action.defaultAccountId,
  overrideAccount: action.overrideAccount,
  accounts: action.accounts,
  payRateList: action.payRateList,
  atoReportCategoryList: action.atoReportCategoryList,
  employees: action.employees,
  exemptions: action.exemptions,
});

const updatePayItemDetails = (state, { key, value }) => ({
  ...state,
  wage: {
    ...state.wage,
    [key]: value,
  },
  isPageEdited: true,
});

const addEmployeeToSelectedList = (state, { value }) => ({
  ...state,
  wage: {
    ...state.wage,
    selectedEmployees: [
      ...state.wage.selectedEmployees,
      state.employees.find(({ id }) => id === value),
    ],
  },
  isPageEdited: true,
});

const removeEmployeeFromSelectedList = (state, { id }) => ({
  ...state,
  wage: {
    ...state.wage,
    selectedEmployees: state.wage.selectedEmployees.filter(
      employee => employee.id !== id,
    ),
  },
  isPageEdited: true,
});

const addExemptionToSelectedList = (state, { value }) => ({
  ...state,
  wage: {
    ...state.wage,
    selectedExemptions: [
      ...state.wage.selectedExemptions,
      state.exemptions.find(({ id }) => id === value),
    ],
  },
  isPageEdited: true,
});

const removeExemptionFromSelectedList = (state, { id }) => ({
  ...state,
  wage: {
    ...state.wage,
    selectedExemptions: state.wage.selectedExemptions.filter(
      exemption => exemption.id !== id,
    ),
  },
  isPageEdited: true,
});

const updateOverrideAccount = (state, { value }) => ({
  ...state,
  overrideAccount: value,
  isPageEdited: true,
});

const openModal = (state, action) => ({
  ...state,
  modalType: action.modalType,
});

const closeModal = state => ({
  ...state,
  modalType: '',
});

const setAlert = (state, action) => ({
  ...state,
  alert: action.alert,
});

const handlers = {
  [RESET_STATE]: resetState,
  [SET_INITIAL_STATE]: setInitialState,
  [SET_LOADING_STATE]: setLoadingState,
  [SET_IS_SUBMITTING]: setSubmittingState,
  [LOAD_NEW_PAY_ITEM]: loadPayItem,
  [LOAD_EXISTING_PAY_ITEM]: loadPayItem,
  [UPDATE_DETAILS]: updatePayItemDetails,
  [ADD_EMPLOYEE]: addEmployeeToSelectedList,
  [REMOVE_EMPLOYEE]: removeEmployeeFromSelectedList,
  [ADD_EXEMPTION]: addExemptionToSelectedList,
  [REMOVE_EXEMPTION]: removeExemptionFromSelectedList,
  [UPDATE_OVERRIDE_ACCOUNT]: updateOverrideAccount,
  [OPEN_MODAL]: openModal,
  [CLOSE_MODAL]: closeModal,
  [SET_ALERT]: setAlert,
};

const wagePayItemReducer = createReducer(getDefaultState(), handlers);

export default wagePayItemReducer;
