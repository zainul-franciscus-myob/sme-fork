import {
  LOAD_LINKED_ACCOUNTS,
  SET_ALERT,
  SET_IS_SUBMITTING,
  SET_LOADING_STATE,
  SET_SELECTED_TAB,
  UPDATE_ACCOUNT,
  UPDATE_HAS_ACCOUNT_OPTION,
} from './LinkedAccountsIntents';
import { RESET_STATE, SET_INITIAL_STATE } from '../../SystemIntents';
import LoadingState from '../../components/PageView/LoadingState';
import TabItem from './TabItem';
import createReducer from '../../store/createReducer';

const getDefaultState = () => ({
  businessId: '',
  region: '',
  loadingState: LoadingState.LOADING,
  isSubmitting: false,
  alert: undefined,
  selectedTab: TabItem.ACCOUNTS_AND_BANKING,
  linkedAccounts: {
    equityAccountCurrentEarnings: {
      accountId: '',
      accountName: '',
    },
    equityAccountRetainedEarnings: {
      accountId: '',
      accountName: '',
    },
    equityHistoricalBalancing: {
      accounts: [],
      selectedAccountId: '',
    },
    bankAccountElectronicPayments: {
      accounts: [],
      selectedAccountId: '',
    },
    bankAccountUndepositedFunds: {
      accounts: [],
      selectedAccountId: '',
    },
    assetAccountTrackingReceivables: {
      accounts: [],
      selectedAccountId: '',
    },
    bankAccountCustomerReceipts: {
      accounts: [],
      selectedAccountId: '',
    },
    incomeAccountFreight: {
      accounts: [],
      selectedAccountId: '',
      hasAccount: true,
    },
    liabilityAccountCustomerDeposits: {
      accounts: [],
      selectedAccountId: '',
      hasAccount: true,
    },
    expenseSalesAccountDiscounts: {
      accounts: [],
      selectedAccountId: '',
      hasAccount: true,
    },
    incomeAccountLateCharges: {
      accounts: [],
      selectedAccountId: '',
      hasAccount: false,
    },
    liabilityAccountTrackingPayables: {
      accounts: [],
      selectedAccountId: '',
    },
    bankAccountPayingBills: {
      accounts: [],
      selectedAccountId: '',
    },
    liabilityAccountItemReceipts: {
      accounts: [],
      selectedAccountId: '',
      hasAccount: false,
    },
    expenseSalesAccountFreight: {
      accounts: [],
      selectedAccountId: '',
      hasAccount: true,
    },
    assetAccountSupplierDeposits: {
      accounts: [],
      selectedAccountId: '',
      hasAccount: true,
    },
    expenseAccountDiscounts: {
      accounts: [],
      selectedAccountId: '',
      hasAccount: true,
    },
    expenseAccountLaterCharges: {
      accounts: [],
      selectedAccountId: '',
      hasAccount: false,
    },
    bankAccountCashPayments: {
      accounts: [],
      selectedAccountId: '',
    },
    bankAccountChequePayments: {
      accounts: [],
      selectedAccountId: '',
    },
    employmentExpenseAccount: {
      accounts: [],
      selectedAccountId: '',
    },
    wagesExpenseAccount: {
      accounts: [],
      selectedAccountId: '',
    },
    taxDeductionsPayableAccount: {
      accounts: [],
      selectedAccountId: '',
    },
  },
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

const setIsSubmitting = (state, action) => ({
  ...state,
  isSubmitting: action.isSubmitting,
});

const setAlert = (state, action) => ({
  ...state,
  alert: action.alert,
});

const setSelectedTab = (state, action) => ({
  ...state,
  selectedTab: action.selectedTab,
});

const loadLinkedAccounts = (state, action) => ({
  ...state,
  linkedAccounts: {
    equityAccountCurrentEarnings: action.equityAccountCurrentEarnings,
    equityAccountRetainedEarnings: action.equityAccountRetainedEarnings,
    equityHistoricalBalancing: action.equityHistoricalBalancing,
    bankAccountElectronicPayments: action.bankAccountElectronicPayments,
    bankAccountUndepositedFunds: action.bankAccountUndepositedFunds,
    assetAccountTrackingReceivables: action.assetAccountTrackingReceivables,
    bankAccountCustomerReceipts: action.bankAccountCustomerReceipts,
    incomeAccountFreight: action.incomeAccountFreight,
    liabilityAccountCustomerDeposits: action.liabilityAccountCustomerDeposits,
    expenseSalesAccountDiscounts: action.expenseSalesAccountDiscounts,
    incomeAccountLateCharges: action.incomeAccountLateCharges,
    liabilityAccountTrackingPayables: action.liabilityAccountTrackingPayables,
    bankAccountPayingBills: action.bankAccountPayingBills,
    liabilityAccountItemReceipts: action.liabilityAccountItemReceipts,
    expenseSalesAccountFreight: action.expenseSalesAccountFreight,
    assetAccountSupplierDeposits: action.assetAccountSupplierDeposits,
    expenseAccountDiscounts: action.expenseAccountDiscounts,
    expenseAccountLaterCharges: action.expenseAccountLaterCharges,
    bankAccountCashPayments: action.bankAccountCashPayments,
    bankAccountChequePayments: action.bankAccountChequePayments,
    employmentExpenseAccount: action.employmentExpenseAccount,
    wagesExpenseAccount: action.wagesExpenseAccount,
    taxDeductionsPayableAccount: action.taxDeductionsPayableAccount,
  },
});

const updateAccount = (state, action) => ({
  ...state,
  linkedAccounts: {
    ...state.linkedAccounts,
    [action.key]: {
      ...state.linkedAccounts[action.key],
      accountId: action.value,
    },
  },
});

const updateHasAccountOption = (state, action) => ({
  ...state,
  linkedAccounts: {
    ...state.linkedAccounts,
    [action.key]: {
      ...state.linkedAccounts[action.key],
      hasAccount: action.value,
    },
  },
});

const handlers = {
  [SET_INITIAL_STATE]: setInitialState,
  [RESET_STATE]: resetState,
  [SET_LOADING_STATE]: setLoadingState,
  [SET_IS_SUBMITTING]: setIsSubmitting,
  [SET_ALERT]: setAlert,
  [SET_SELECTED_TAB]: setSelectedTab,
  [LOAD_LINKED_ACCOUNTS]: loadLinkedAccounts,
  [UPDATE_ACCOUNT]: updateAccount,
  [UPDATE_HAS_ACCOUNT_OPTION]: updateHasAccountOption,
};

const linkedAccountsReducer = createReducer(getDefaultState(), handlers);

export default linkedAccountsReducer;
