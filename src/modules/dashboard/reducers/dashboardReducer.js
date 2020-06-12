import {
  LOAD_CONFIG, LOAD_DASHBOARD, SET_ALERT, SET_LOADING_STATE,
} from '../DashboardIntents';
import { RESET_STATE, SET_INITIAL_STATE } from '../../../SystemIntents';
import createReducer from '../../../store/createReducer';
import dashboardBankingReducerHandlers from './dashboardBankingReducer';
import dashboardPayrollReducerHandlers from './dashboardPayrollReducer';
import dashboardPayrollReportsReducerHandlers from './dashboardPayrollReportsReducer';
import dashboardPurchaseReducerHandlers from './dashboardPurchaseReducer';
import dashboardSalesReducerHandlers from './dashboardSalesReducer';
import dashboardTrackingReducerHandlers from './dashboardTrackingReducer';

const getDefaultState = () => ({
  businessId: '',
  regionId: '',
  alert: undefined,
  isLoading: true,
  enabled: [],
  serialNumber: '',
  greeting: '',
  businessName: '',
  inspirationalQuote: '',
  bankFeedBalance: '',
  config: {
    myReportsUrl: '',
  },

  sales: {
    layout: '',
    month: '',
    isEmpty: true,
    financialYearStartDate: '',
    isLoading: true,
    unpaidTotal: '',
    overDueTotal: '',
    salesTotal: '',
    entries: [],
    chart: [],
    hasError: false,
  },

  purchase: {
    month: '',
    isEmpty: true,
    financialYearStartDate: '',
    isLoading: true,
    unpaidTotal: '',
    overDueTotal: '',
    salesTotal: '',
    entries: [],
    chart: [],
    hasError: false,
  },

  tracking: {
    isLoading: true,
    isDetailLoading: false,
    hasError: false,
    isEmpty: true,
    financialYear: '',
    incomeAmount: '',
    expenseAmount: '',
    profitAmount: '',
    chart: {},
    financialYearOptions: [],
  },

  banking: {
    isLoading: true,
    hasError: false,
    bankFeedAccountId: '',
    bankFeedAccounts: [],
    unallocatedTransactionsTotal: '',
    bankLatestClosingBalance: '',
    bankBalanceDate: '',
    currentBalance: '',
    lastReconcileDate: '',
  },

  payroll: {
    isLoading: true,
    hasError: false,
    isPayrollSetup: false,
    entries: [],
  },

  payrollReports: {
    isLoading: true,
    hasError: false,
    favourites: [],
    all: [
      { id: 'payrollCategoryTransactions', name: 'Pay item transactions' },
      { id: 'payrollSummary', name: 'Payroll summary' },
      { id: 'payrollRegister', name: 'Payroll register' },
      { id: 'payrollActivity', name: 'Payroll activity' },
      { id: 'payrollAdvice', name: 'Payroll advice' },
      { id: 'timesheets', name: 'Timesheets' },
      { id: 'accrualByFundSummary', name: 'Accrual by fund' },
      { id: 'accrualByFundDetail', name: 'Accrual by fund (detail)' },
      { id: 'leaveBalanceSummary', name: 'Leave balance' },
      { id: 'leaveBalanceDetail', name: 'Leave balance (detail)' },
    ],
  },
});


const setInitialState = (state, { context }) => ({
  ...state,
  ...context,
});

const loadConfig = (state, { config }) => ({
  ...state,
  config,
});

const resetState = () => ({ ...getDefaultState() });

const setLoadingState = (state, { isLoading }) => ({
  ...state,
  isLoading,
});

const setAlert = (state, action) => ({
  ...state,
  alert: action.alert,
});

const loadDashboard = (state, action) => ({
  ...state,
  businessName: action.businessName,
  inspirationalQuote: action.inspirationalQuote,
  bankFeedBalance: action.bankFeedBalance,
  enabled: action.enabled,
  serialNumber: action.serialNumber,
});

const handlers = {
  [SET_INITIAL_STATE]: setInitialState,
  [RESET_STATE]: resetState,
  [SET_LOADING_STATE]: setLoadingState,
  [SET_ALERT]: setAlert,

  [LOAD_DASHBOARD]: loadDashboard,
  [LOAD_CONFIG]: loadConfig,

  ...dashboardSalesReducerHandlers,
  ...dashboardPurchaseReducerHandlers,
  ...dashboardTrackingReducerHandlers,
  ...dashboardBankingReducerHandlers,
  ...dashboardPayrollReducerHandlers,
  ...dashboardPayrollReportsReducerHandlers,
};

const dashboardReducer = createReducer(getDefaultState(), handlers);

export default dashboardReducer;
