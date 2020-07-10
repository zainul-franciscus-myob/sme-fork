import {
  ADD_SUPER_PAY_ITEM_EMPLOYEE,
  ADD_SUPER_PAY_ITEM_EXEMPTION,
  CLOSE_MODAL,
  LOAD_SUPER_PAY_ITEM,
  OPEN_MODAL,
  REMOVE_SUPER_PAY_ITEM_EMPLOYEE,
  REMOVE_SUPER_PAY_ITEM_EXEMPTION,
  SET_ALERT,
  SET_LOADING_STATE,
  SET_SUBMITTING_STATE,
  SET_SUPER_PAY_ITEM,
  SET_SUPER_PAY_ITEM_DETAIL,
} from './SuperPayItemIntents';
import { RESET_STATE, SET_INITIAL_STATE } from '../../../SystemIntents';
import LoadingState from '../../../components/PageView/LoadingState';
import createReducer from '../../../store/createReducer';

const getDefaultState = () => ({
  businessId: '',
  region: '',
  isLoading: false,
  loadingState: LoadingState.LOADING,
  isPageEdited: false,
  isSubmitting: false,
  modalType: '',
  alert: undefined,
  superPayItemId: '',
  superPayItem: {
    name: '',
    contributionType: '',
    expenseAccountId: '',
    payableAccountId: '',
    atoReportingCategory: '',
    printOnPayAdvice: false,
    calculationBasisType: '',
    calculationBasisPercentage: '',
    calculationBasisPayItemId: '',
    calculationBasisPayItemType: '',
    calculationBasisAmount: '',
    calculationBasisPeriod: '',
    exclusion: '',
    limitType: '',
    limitPercentage: '',
    limitPayItemId: '',
    limitPayItemType: '',
    limitAmount: '',
    limitPeriod: '',
    threshold: '',
    exemptions: [],
    employees: [],
  },
  originalSuperPayItem: {
    name: '',
  },
  settings: {
    grossWagesId: '',
    federalWagesId: '',
  },
  enabledExemptionFieldConfiguration: [],
  contributionTypes: [],
  expenseAccounts: [],
  payableAccounts: [],
  atoReportingCategories: [],
  calculationBasisTypes: [],
  limitTypes: [],
  periods: [],
  employees: [],
  calculationBasisDeductionPayItems: [],
  calculationBasisExpensePayItems: [],
  limitDeductionPayItems: [],
  limitExpensePayItems: [],
  exemptionPayItems: [],
  payItemSubTypeToSuperPayItemTypeMappings: {},
});

const setInitialState = (state, action) => ({
  ...state,
  ...action.context,
});

const resetState = () => getDefaultState();

const setAlert = (state, action) => ({
  ...state,
  alert: action.alert,
});

const openModal = (state, action) => ({
  ...state,
  modalType: action.modalType,
});

const closeModal = (state) => ({
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

const loadSuperPayItem = (state, action) => ({
  ...state,
  ...action,
  superPayItem: {
    ...state.superPayItem,
    ...action.superPayItem,
  },
});

const setSuperPayItemState = (state, partialSuperPayItem) => ({
  ...state,
  superPayItem: {
    ...state.superPayItem,
    ...partialSuperPayItem,
  },
  isPageEdited: true,
});

const setSuperPayItem = (state, action) =>
  setSuperPayItemState(state, action.superPayItem);

const setSuperPayItemDetail = (state, action) => {
  const partialSuperPayItem = { [action.key]: action.value };

  return setSuperPayItemState(state, partialSuperPayItem);
};

const addSuperPayItemEmployee = (state, action) => {
  const updatedEmployees = [
    ...state.superPayItem.employees,
    { id: action.value, name: action.name },
  ];
  const partialSuperPayItem = { employees: updatedEmployees };

  return setSuperPayItemState(state, partialSuperPayItem);
};

const removeSuperPayItemEmployee = (state, action) => {
  const updatedEmployees = state.superPayItem.employees.filter(
    (employee) => employee.id !== action.id
  );
  const partialSuperPayItem = { employees: updatedEmployees };

  return setSuperPayItemState(state, partialSuperPayItem);
};

const addSuperPayItemExemption = (state, action) => {
  const updatedExemptions = [
    ...state.superPayItem.exemptions,
    { id: action.id, name: action.name, type: action.mappedType },
  ];
  const partialSuperPayItem = { exemptions: updatedExemptions };

  return setSuperPayItemState(state, partialSuperPayItem);
};

const removeSuperPayItemExemption = (state, action) => {
  const updatedExemptions = state.superPayItem.exemptions.filter(
    (exemption) => exemption.id !== action.id
  );
  const partialSuperPayItem = { exemptions: updatedExemptions };

  return setSuperPayItemState(state, partialSuperPayItem);
};

const handlers = {
  [SET_INITIAL_STATE]: setInitialState,
  [RESET_STATE]: resetState,
  [SET_ALERT]: setAlert,
  [OPEN_MODAL]: openModal,
  [CLOSE_MODAL]: closeModal,
  [SET_LOADING_STATE]: setLoadingState,
  [SET_SUBMITTING_STATE]: setSubmittingState,
  [LOAD_SUPER_PAY_ITEM]: loadSuperPayItem,
  [SET_SUPER_PAY_ITEM]: setSuperPayItem,
  [SET_SUPER_PAY_ITEM_DETAIL]: setSuperPayItemDetail,
  [ADD_SUPER_PAY_ITEM_EMPLOYEE]: addSuperPayItemEmployee,
  [REMOVE_SUPER_PAY_ITEM_EMPLOYEE]: removeSuperPayItemEmployee,
  [ADD_SUPER_PAY_ITEM_EXEMPTION]: addSuperPayItemExemption,
  [REMOVE_SUPER_PAY_ITEM_EXEMPTION]: removeSuperPayItemExemption,
};

const superPayItemReducer = createReducer(getDefaultState(), handlers);

export default superPayItemReducer;
