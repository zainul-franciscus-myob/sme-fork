import {
  CLOSE_MODAL,
  LOAD_DEDUCTIONS_LIST,
  LOAD_EXPENSES_LIST,
  LOAD_LEAVE_LIST,
  LOAD_SUPERANNUATION_LIST,
  LOAD_TAX_PAY_ITEM,
  LOAD_WAGES_LIST,
  OPEN_MODAL,
  SET_ALERT,
  SET_DEDUCTIONS_SORT_ORDER,
  SET_EXPENSES_SORT_ORDER,
  SET_LEAVE_SORT_ORDER,
  SET_LOADING_STATE,
  SET_PAYROLL_IS_SET_UP,
  SET_SUBMITTING_STATE,
  SET_SUPERANNUATION_SORT_ORDER,
  SET_TAB,
  SET_TABLE_LOADING_STATE,
  SET_WAGES_SORT_ORDER,
  SORT_DEDUCTIONS_LIST,
  SORT_EXPENSES_LIST,
  SORT_LEAVE_LIST,
  SORT_SUPERANNUATION_LIST,
  SORT_WAGES_LIST,
  UPDATE_TAX_PAY_ITEM_DETAIL,
} from '../PayItemIntents';
import { RESET_STATE, SET_INITIAL_STATE } from '../../../SystemIntents';
import LoadingState from '../../../components/PageView/LoadingState';
import createReducer from '../../../store/createReducer';

const getDefaultState = () => ({
  loadingState: LoadingState.LOADING,
  isTableLoading: false,
  isSubmitting: false,
  payrollIsSetUp: true,
  tab: 'wages',
  wages: {
    orderBy: '',
    sortOrder: '',
    entries: [],
  },
  superannuation: {
    orderBy: '',
    sortOrder: '',
    entries: [],
  },
  leave: {
    orderBy: '',
    sortOrder: '',
    entries: [],
  },
  deductions: {
    orderBy: '',
    sortOrder: '',
    entries: [],
  },
  expenses: {
    orderBy: '',
    sortOrder: '',
    entries: [],
  },
  taxPayItem: {
    tax: {
      atoReportingCategory: '',
      accountId: '',
      revisionDate: '',
    },
    accounts: [],
    atoReportingCategoryList: [],
  },
  alert: undefined,
  isPageEdited: false,
});

const setInitialState = (state, action) => ({
  ...state,
  ...action.context,
});

const setLoadingState = (state, { loadingState }) => ({
  ...state,
  loadingState,
});

const setSubmittingState = (state, action) => ({
  ...state,
  isSubmitting: action.isSubmitting,
});

const resetState = () => getDefaultState();

const setTab = (state, action) => ({
  ...state,
  tab: action.selectedTab,
});

const loadWagesList = (state, action) => ({
  ...state,
  wages: {
    ...state.wages,
    orderBy: action.orderBy,
    sortOrder: action.sortOrder,
    entries: action.entries,
  },
});

const sortWagesList = (state, action) => ({
  ...state,
  wages: {
    ...state.wages,
    entries: action.entries,
  },
});

const setWagesSortOrder = (state, action) => ({
  ...state,
  wages: {
    ...state.wages,
    orderBy: action.orderBy,
    sortOrder: action.sortOrder,
  },
});

const loadSuperannuationList = (state, action) => ({
  ...state,
  superannuation: {
    ...state.superannuation,
    entries: action.entries,
    orderBy: action.orderBy,
    sortOrder: action.sortOrder,
  },
});

const sortSuperannuationList = (state, action) => ({
  ...state,
  superannuation: {
    ...state.superannuation,
    entries: action.entries,
  },
});

const setSuperannuationSortOrder = (state, action) => ({
  ...state,
  superannuation: {
    ...state.superannuation,
    orderBy: action.orderBy,
    sortOrder: action.sortOrder,
  },
});

const loadLeaveList = (state, action) => ({
  ...state,
  leave: {
    ...state.leave,
    entries: action.entries,
    orderBy: action.orderBy,
    sortOrder: action.sortOrder,
  },
});

const sortLeaveList = (state, action) => ({
  ...state,
  leave: {
    ...state.leave,
    entries: action.entries,
  },
});

const setLeaveSortOrder = (state, action) => ({
  ...state,
  leave: {
    ...state.leave,
    orderBy: action.orderBy,
    sortOrder: action.sortOrder,
  },
});

const loadDeductionsList = (state, action) => ({
  ...state,
  deductions: {
    ...state.deductions,
    entries: action.entries,
    orderBy: action.orderBy,
    sortOrder: action.sortOrder,
  },
});

const sortDeductionsList = (state, action) => ({
  ...state,
  deductions: {
    ...state.deductions,
    entries: action.entries,
  },
});

const openModal = (state, action) => ({
  ...state,
  modal: action.modal,
});

const setDeductionsSortOrder = (state, action) => ({
  ...state,
  deductions: {
    ...state.deductions,
    orderBy: action.orderBy,
    sortOrder: action.sortOrder,
  },
});

const loadExpensesList = (state, action) => ({
  ...state,
  expenses: {
    ...state.expenses,
    entries: action.entries,
    orderBy: action.orderBy,
    sortOrder: action.sortOrder,
  },
});

const sortExpensesList = (state, action) => ({
  ...state,
  expenses: {
    ...state.expenses,
    entries: action.entries,
  },
});

const setExpensesSortOrder = (state, action) => ({
  ...state,
  expenses: {
    ...state.expenses,
    orderBy: action.orderBy,
    sortOrder: action.sortOrder,
  },
});

const loadTaxPayItem = (state, action) => ({
  ...state,
  taxPayItem: {
    ...state.taxPayItem,
    tax: action.tax,
    accounts: action.accounts,
    atoReportingCategoryList: action.atoReportingCategoryList,
  },
});

const updateTaxPayItemDetail = (state, action) => ({
  ...state,
  taxPayItem: {
    ...state.taxPayItem,
    tax: {
      ...state.taxPayItem.tax,
      [action.key]: action.value,
    },
  },
  isPageEdited: true,
});

const setTableLoadingState = (state, action) => ({
  ...state,
  isTableLoading: action.isTableLoading,
});

const closeModal = (state) => ({
  ...state,
  modal: undefined,
});

const setAlert = (state, action) => ({
  ...state,
  alert: action.alert,
});

const setPayrollIsSetUp = (state, action) => ({
  ...state,
  payrollIsSetUp: action.payrollIsSetUp,
});

const handlers = {
  [SET_INITIAL_STATE]: setInitialState,
  [SET_SUBMITTING_STATE]: setSubmittingState,
  [RESET_STATE]: resetState,
  [SET_TAB]: setTab,
  [LOAD_WAGES_LIST]: loadWagesList,
  [SORT_WAGES_LIST]: sortWagesList,
  [SET_WAGES_SORT_ORDER]: setWagesSortOrder,
  [LOAD_SUPERANNUATION_LIST]: loadSuperannuationList,
  [SORT_SUPERANNUATION_LIST]: sortSuperannuationList,
  [SET_SUPERANNUATION_SORT_ORDER]: setSuperannuationSortOrder,
  [SET_TABLE_LOADING_STATE]: setTableLoadingState,
  [SET_ALERT]: setAlert,
  [LOAD_LEAVE_LIST]: loadLeaveList,
  [SORT_LEAVE_LIST]: sortLeaveList,
  [SET_LEAVE_SORT_ORDER]: setLeaveSortOrder,
  [LOAD_DEDUCTIONS_LIST]: loadDeductionsList,
  [SORT_DEDUCTIONS_LIST]: sortDeductionsList,
  [SET_DEDUCTIONS_SORT_ORDER]: setDeductionsSortOrder,
  [LOAD_EXPENSES_LIST]: loadExpensesList,
  [SORT_EXPENSES_LIST]: sortExpensesList,
  [SET_EXPENSES_SORT_ORDER]: setExpensesSortOrder,
  [LOAD_TAX_PAY_ITEM]: loadTaxPayItem,
  [UPDATE_TAX_PAY_ITEM_DETAIL]: updateTaxPayItemDetail,
  [CLOSE_MODAL]: closeModal,
  [OPEN_MODAL]: openModal,
  [SET_LOADING_STATE]: setLoadingState,
  [SET_PAYROLL_IS_SET_UP]: setPayrollIsSetUp,
};

const payItemListReducer = createReducer(getDefaultState(), handlers);

export default payItemListReducer;
