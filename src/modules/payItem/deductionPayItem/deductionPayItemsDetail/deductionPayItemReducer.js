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
  UPDATE_INFORMATION,
} from '../DeductionPayItemIntents';
import { RESET_STATE, SET_INITIAL_STATE } from '../../../../SystemIntents';
import LoadingState from '../../../../components/PageView/LoadingState';
import createReducer from '../../../../store/createReducer';

const getDefaultState = () => ({
  title: 'Deduction pay item',
  details: {
    name: '',
    accounts: [],
    atoReportCategoryList: [],
    linkedPayableAccountId: '',
    atoReportingCategory: '',
  },
  information: {
    calculationBasis: '',
    calculationPercentage: '',
    calculationPercentOfId: '',
    calculationDollars: '',
    calculationPer: '',
    limit: '',
    limitPercentage: '',
    limitPercentOfId: '',
    limitDollars: '',
    limitPer: '',
    calculationBasisOptions: [],
    calculationPercentOfOptions: [],
    calculationDollarPerOptions: [],
    limitOptions: [],
    limitPercentOfOptions: [],
    limitDollarPerOptions: [],
  },
  employeeAllocations: {
    employees: [],
    selectedEmployees: [],
  },
  exemptionAllocations: {
    exemptions: [],
    selectedExemptions: [],
  },
  modalType: '',
  isSubmitting: false,
  loadingState: LoadingState.LOADING,
  isPageEdited: false,
  alert: undefined,
});

const resetState = () => getDefaultState();

const setInitialState = (state, action) => ({
  ...state,
  ...action.context,
});

const setLoadingState = (state, { loadingState }) => ({
  ...state,
  loadingState,
});

const loadDetailsData = (
  state,
  {
    name,
    accounts,
    atoReportCategoryList,
    atoReportingCategory,
    linkedPayableAccountId,
  }
) => ({
  ...state.details,
  name,
  accounts,
  atoReportCategoryList,
  atoReportingCategory,
  linkedPayableAccountId,
});

const loadInformationData = (
  state,
  {
    calculationBasis,
    calculationPercentage,
    calculationPercentOfId,
    calculationDollars,
    calculationPer,
    calculationBasisOptions,
    calculationPercentOfOptions,
    calculationDollarPerOptions,
    limit,
    limitPercentage,
    limitPercentOfId,
    limitDollars,
    limitPer,
    limitOptions,
    limitPercentOfOptions,
    limitDollarPerOptions,
  }
) => ({
  ...state.information,
  calculationBasis,
  calculationPercentage,
  calculationPercentOfId,
  calculationDollars,
  calculationPer,
  limit,
  limitPercentage,
  limitPercentOfId,
  limitDollars,
  limitPer,
  calculationBasisOptions,
  calculationPercentOfOptions,
  calculationDollarPerOptions,
  limitOptions,
  limitPercentOfOptions,
  limitDollarPerOptions,
});

const loadEmployeeAllocation = (state, { employees, selectedEmployees }) => ({
  ...state.employeeAllocations,
  employees,
  selectedEmployees,
});

const loadExemptionAllocations = (
  state,
  { exemptions, selectedExemptions }
) => ({
  ...state.exemptionAllocations,
  exemptions,
  selectedExemptions,
});

const loadPayItem = (state, action) => ({
  ...state,
  title: action.title,
  details: loadDetailsData(state, action),
  information: loadInformationData(state, action),
  employeeAllocations: loadEmployeeAllocation(state, action),
  exemptionAllocations: loadExemptionAllocations(state, action),
});

const loadNewPayItem = loadPayItem;

const loadExistingPayItem = loadPayItem;

const updateDetails = (state, { key, value }) => ({
  ...state,
  details: {
    ...state.details,
    [key]: value,
  },
  isPageEdited: true,
});

const updateInformation = (state, { key, value }) => ({
  ...state,
  information: {
    ...state.information,
    [key]: value,
  },
  isPageEdited: true,
});

const addEmployee = (state, { value }) => ({
  ...state,
  employeeAllocations: {
    ...state.employeeAllocations,
    selectedEmployees: [
      ...state.employeeAllocations.selectedEmployees,
      state.employeeAllocations.employees.find(({ id }) => id === value),
    ],
  },
  isPageEdited: true,
});

const removeEmployee = (state, { id }) => ({
  ...state,
  employeeAllocations: {
    ...state.employeeAllocations,
    selectedEmployees: state.employeeAllocations.selectedEmployees.filter(
      (employee) => employee.id !== id
    ),
  },
  isPageEdited: true,
});

const addExemption = (state, { value }) => ({
  ...state,
  exemptionAllocations: {
    ...state.exemptionAllocations,
    selectedExemptions: [
      ...state.exemptionAllocations.selectedExemptions,
      state.exemptionAllocations.exemptions.find(({ id }) => id === value),
    ],
  },
  isPageEdited: true,
});

const removeExemption = (state, { id }) => ({
  ...state,
  exemptionAllocations: {
    ...state.exemptionAllocations,
    selectedExemptions: state.exemptionAllocations.selectedExemptions.filter(
      (exemption) => exemption.id !== id
    ),
  },
  isPageEdited: true,
});

const openModal = (state, action) => ({
  ...state,
  modalType: action.modalType,
});

const closeModal = (state) => ({
  ...state,
  modalType: '',
});

const setAlert = (state, action) => ({
  ...state,
  alert: action.alert,
});

const setIsSubmitting = (state, { isSubmitting }) => ({
  ...state,
  isSubmitting,
});

const handlers = {
  [RESET_STATE]: resetState,
  [SET_INITIAL_STATE]: setInitialState,
  [SET_LOADING_STATE]: setLoadingState,
  [LOAD_NEW_PAY_ITEM]: loadNewPayItem,
  [LOAD_EXISTING_PAY_ITEM]: loadExistingPayItem,
  [UPDATE_DETAILS]: updateDetails,
  [UPDATE_INFORMATION]: updateInformation,
  [ADD_EMPLOYEE]: addEmployee,
  [REMOVE_EMPLOYEE]: removeEmployee,
  [ADD_EXEMPTION]: addExemption,
  [REMOVE_EXEMPTION]: removeExemption,
  [OPEN_MODAL]: openModal,
  [CLOSE_MODAL]: closeModal,
  [SET_ALERT]: setAlert,
  [SET_IS_SUBMITTING]: setIsSubmitting,
};

const deductionPayItemReducer = createReducer(getDefaultState(), handlers);

export default deductionPayItemReducer;
