import {
  LOAD_CONFIG,
  LOAD_DASHBOARD,
  SET_ALERT,
  SET_LOADING_STATE,
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
      {
        name: 'Payroll category transactions',
        path: 'payrollCategoryTransactions',
        displayName: 'Pay item transactions',
      },
      {
        name: 'Payroll summary',
        path: 'payrollSummary',
        displayName: 'Payroll summary',
      },
      {
        name: 'Payroll register',
        path: 'payrollRegister',
        displayName: 'Payroll register',
      },
      {
        name: 'Payroll activity',
        path: 'payrollActivity',
        displayName: 'Payroll activity',
      },
      {
        name: 'Payroll advice',
        path: 'payrollAdvice',
        displayName: 'Payroll advice',
      },
      { name: 'Timesheets', path: 'timesheets', displayName: 'Timesheets' },
      {
        name: 'Accrual by fund summary',
        path: 'accrualByFundSummary',
        displayName: 'Accrual by fund',
      },
      {
        name: 'Accrual by fund detail',
        path: 'accrualByFundDetail',
        displayName: 'Accrual by fund (detail)',
      },
      {
        name: 'Leave balance summary',
        path: 'leaveBalanceSummary',
        displayName: 'Leave balance',
      },
      {
        name: 'Leave balance detail',
        path: 'leaveBalanceDetail',
        displayName: 'Leave balance (detail)',
      },
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
