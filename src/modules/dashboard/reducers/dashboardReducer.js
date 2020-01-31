import { LOAD_DASHBOARD, SET_ALERT, SET_LOADING_STATE } from '../DashboardIntents';
import { RESET_STATE, SET_INITIAL_STATE } from '../../../SystemIntents';
import createReducer from '../../../store/createReducer';
import dashboardBankingReducerHandlers from './dashboardBankingReducer';
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
});

const setInitialState = (state, { context }) => ({
  ...state,
  ...context,
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

  ...dashboardSalesReducerHandlers,
  ...dashboardPurchaseReducerHandlers,
  ...dashboardTrackingReducerHandlers,
  ...dashboardBankingReducerHandlers,
};

const dashboardReducer = createReducer(getDefaultState(), handlers);

export default dashboardReducer;
