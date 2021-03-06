import {
  LOAD_ACCOUNT_AFTER_CREATE,
  LOAD_LINKED_ACCOUNTS,
  RESET_ACCOUNT_TO_SAVED_VALUE,
  SET_ALERT,
  SET_CREATED_ACCOUNT_LOADING_STATE,
  SET_IS_LATE_CHARGE_REQUIRED,
  SET_IS_SUBMITTING,
  SET_LOADING_STATE,
  SET_SELECTED_TAB,
  SET_SHOULD_DISPLAY_ACCOUNTS_BANKING_TAB,
  SET_SHOULD_DISPLAY_PAYROLL_TAB,
  SET_SHOULD_DISPLAY_PURCHASES_TAB,
  SET_SHOULD_DISPLAY_SALES_TAB,
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
  shouldDisplayAccountsBankingTab: false,
  shouldDisplaySalesTab: false,
  shouldDisplayPurchasesTab: false,
  shouldDisplayPayrollTab: false,
  isLateChargeRequired: false,
  isCreatedAccountLoading: false,
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
    kiwiSaverExpenseAccount: {
      accounts: [],
      selectedAccountId: '',
    },
    employerDeductionsPayableAccount: {
      accounts: [],
      selectedAccountId: '',
    },
    otherDeductionsPayableAccount: {
      accounts: [],
      selectedAccountId: '',
    },
  },
  savedLinkedAccounts: {
    equityAccountCurrentEarnings: 0,
    equityAccountRetainedEarnings: 0,
    equityHistoricalBalancing: 0,
    bankAccountElectronicPayments: 0,
    bankAccountUndepositedFunds: 0,
    assetAccountTrackingReceivables: 0,
    bankAccountCustomerReceipts: 0,
    incomeAccountFreight: 0,
    liabilityAccountCustomerDeposits: 0,
    incomeAccountLateCharges: 0,
    liabilityAccountTrackingPayables: 0,
    bankAccountPayingBills: 0,
    liabilityAccountItemReceipts: 0,
    expenseSalesAccountFreight: 0,
    assetAccountSupplierDeposits: 0,
    expenseAccountDiscounts: 0,
    expenseAccountLaterCharges: 0,
    bankAccountCashPayments: 0,
    bankAccountChequePayments: 0,
    employmentExpenseAccount: 0,
    wagesExpenseAccount: 0,
    taxDeductionsPayableAccount: 0,
    kiwiSaverExpenseAccount: 0,
    employerDeductionsPayableAccount: 0,
    otherDeductionsPayableAccount: 0,
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

const setShouldDisplayAccountsBankingTab = (state, action) => ({
  ...state,
  shouldDisplayAccountsBankingTab: action.shouldDisplayAccountsBankingTab,
});

const setShouldDisplaySalesTab = (state, action) => ({
  ...state,
  shouldDisplaySalesTab: action.shouldDisplaySalesTab,
});

const setShouldDisplayPurchasesTab = (state, action) => ({
  ...state,
  shouldDisplayPurchasesTab: action.shouldDisplayPurchasesTab,
});

const setShouldDisplayPayrollTab = (state, action) => ({
  ...state,
  shouldDisplayPayrollTab: action.shouldDisplayPayrollTab,
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
    kiwiSaverExpenseAccount: action.kiwiSaverExpenseAccount,
    employerDeductionsPayableAccount: action.employerDeductionsPayableAccount,
    otherDeductionsPayableAccount: action.otherDeductionsPayableAccount,
  },
  savedLinkedAccounts: {
    equityAccountCurrentEarnings: action.equityAccountCurrentEarnings.accountId,
    equityAccountRetainedEarnings:
      action.equityAccountRetainedEarnings.accountId,
    equityHistoricalBalancing: action.equityHistoricalBalancing.accountId,
    bankAccountElectronicPayments:
      action.bankAccountElectronicPayments.accountId,
    bankAccountUndepositedFunds: action.bankAccountUndepositedFunds.accountId,
    assetAccountTrackingReceivables:
      action.assetAccountTrackingReceivables.accountId,
    bankAccountCustomerReceipts: action.bankAccountCustomerReceipts.accountId,
    incomeAccountFreight: action.incomeAccountFreight.accountId,
    liabilityAccountCustomerDeposits:
      action.liabilityAccountCustomerDeposits.accountId,
    expenseSalesAccountDiscounts: action.expenseSalesAccountDiscounts.accountId,
    incomeAccountLateCharges: action.incomeAccountLateCharges.accountId,
    liabilityAccountTrackingPayables:
      action.liabilityAccountTrackingPayables.accountId,
    bankAccountPayingBills: action.bankAccountPayingBills.accountId,
    liabilityAccountItemReceipts: action.liabilityAccountItemReceipts.accountId,
    expenseSalesAccountFreight: action.expenseSalesAccountFreight.accountId,
    assetAccountSupplierDeposits: action.assetAccountSupplierDeposits.accountId,
    expenseAccountDiscounts: action.expenseAccountDiscounts.accountId,
    expenseAccountLaterCharges: action.expenseAccountLaterCharges.accountId,
    bankAccountCashPayments: action.bankAccountCashPayments.accountId,
    bankAccountChequePayments: action.bankAccountChequePayments.accountId,
    employmentExpenseAccount: action.employmentExpenseAccount.accountId,
    wagesExpenseAccount: action.wagesExpenseAccount.accountId,
    taxDeductionsPayableAccount: action.taxDeductionsPayableAccount.accountId,
    kiwiSaverExpenseAccount: action.kiwiSaverExpenseAccount.accountId,
    employerDeductionsPayableAccount:
      action.employerDeductionsPayableAccount.accountId,
    otherDeductionsPayableAccount:
      action.otherDeductionsPayableAccount.accountId,
  },
});

const loadAccountAfterCreate = (state, { intent, ...accounts }) => ({
  ...state,
  linkedAccounts: {
    ...state.linkedAccounts,
    equityHistoricalBalancing: {
      ...state.linkedAccounts.equityHistoricalBalancing,
      accounts: [
        ...state.linkedAccounts.equityHistoricalBalancing.accounts,
        accounts,
      ],
    },
    bankAccountElectronicPayments: {
      ...state.linkedAccounts.bankAccountElectronicPayments,
      accounts: [
        ...state.linkedAccounts.bankAccountElectronicPayments.accounts,
        accounts,
      ],
    },
    bankAccountUndepositedFunds: {
      ...state.linkedAccounts.bankAccountUndepositedFunds,
      accounts: [
        ...state.linkedAccounts.bankAccountUndepositedFunds.accounts,
        accounts,
      ],
    },
    assetAccountTrackingReceivables: {
      ...state.linkedAccounts.assetAccountTrackingReceivables,
      accounts: [
        ...state.linkedAccounts.assetAccountTrackingReceivables.accounts,
        accounts,
      ],
    },
    bankAccountCustomerReceipts: {
      ...state.linkedAccounts.bankAccountCustomerReceipts,
      accounts: [
        ...state.linkedAccounts.bankAccountCustomerReceipts.accounts,
        accounts,
      ],
    },
    incomeAccountFreight: {
      ...state.linkedAccounts.incomeAccountFreight,
      accounts: [
        ...state.linkedAccounts.incomeAccountFreight.accounts,
        accounts,
      ],
    },
    liabilityAccountCustomerDeposits: {
      ...state.linkedAccounts.liabilityAccountCustomerDeposits,
      accounts: [
        ...state.linkedAccounts.liabilityAccountCustomerDeposits.accounts,
        accounts,
      ],
    },
    expenseSalesAccountDiscounts: {
      ...state.linkedAccounts.expenseSalesAccountDiscounts,
      accounts: [
        ...state.linkedAccounts.expenseSalesAccountDiscounts.accounts,
        accounts,
      ],
    },
    incomeAccountLateCharges: {
      ...state.linkedAccounts.incomeAccountLateCharges,
      accounts: [
        ...state.linkedAccounts.incomeAccountLateCharges.accounts,
        accounts,
      ],
    },
    liabilityAccountTrackingPayables: {
      ...state.linkedAccounts.liabilityAccountTrackingPayables,
      accounts: [
        ...state.linkedAccounts.liabilityAccountTrackingPayables.accounts,
        accounts,
      ],
    },
    bankAccountPayingBills: {
      ...state.linkedAccounts.bankAccountPayingBills,
      accounts: [
        ...state.linkedAccounts.bankAccountPayingBills.accounts,
        accounts,
      ],
    },
    liabilityAccountItemReceipts: {
      ...state.linkedAccounts.liabilityAccountItemReceipts,
      accounts: [
        ...state.linkedAccounts.liabilityAccountItemReceipts.accounts,
        accounts,
      ],
    },
    expenseSalesAccountFreight: {
      ...state.linkedAccounts.expenseSalesAccountFreight,
      accounts: [
        ...state.linkedAccounts.expenseSalesAccountFreight.accounts,
        accounts,
      ],
    },
    assetAccountSupplierDeposits: {
      ...state.linkedAccounts.assetAccountSupplierDeposits,
      accounts: [
        ...state.linkedAccounts.assetAccountSupplierDeposits.accounts,
        accounts,
      ],
    },
    expenseAccountDiscounts: {
      ...state.linkedAccounts.expenseAccountDiscounts,
      accounts: [
        ...state.linkedAccounts.expenseAccountDiscounts.accounts,
        accounts,
      ],
    },
    expenseAccountLaterCharges: {
      ...state.linkedAccounts.expenseAccountLaterCharges,
      accounts: [
        ...state.linkedAccounts.expenseAccountLaterCharges.accounts,
        accounts,
      ],
    },
    bankAccountCashPayments: {
      ...state.linkedAccounts.bankAccountCashPayments,
      accounts: [
        ...state.linkedAccounts.bankAccountCashPayments.accounts,
        accounts,
      ],
    },
    bankAccountChequePayments: {
      ...state.linkedAccounts.bankAccountChequePayments,
      accounts: [
        ...state.linkedAccounts.bankAccountChequePayments.accounts,
        accounts,
      ],
    },
    employmentExpenseAccount: {
      ...state.linkedAccounts.employmentExpenseAccount,
      accounts: [
        ...state.linkedAccounts.employmentExpenseAccount.accounts,
        accounts,
      ],
    },
    wagesExpenseAccount: {
      ...state.linkedAccounts.wagesExpenseAccount,
      accounts: [
        ...state.linkedAccounts.wagesExpenseAccount.accounts,
        accounts,
      ],
    },
    taxDeductionsPayableAccount: {
      ...state.linkedAccounts.taxDeductionsPayableAccount,
      accounts: [
        ...state.linkedAccounts.taxDeductionsPayableAccount.accounts,
        accounts,
      ],
    },
    kiwiSaverExpenseAccount: {
      ...state.linkedAccounts.kiwiSaverExpenseAccount,
      accounts: [
        ...state.linkedAccounts.kiwiSaverExpenseAccount.accounts,
        accounts,
      ],
    },
    employerDeductionsPayableAccount: {
      ...state.linkedAccounts.employerDeductionsPayableAccount,
      accounts: [
        ...state.linkedAccounts.employerDeductionsPayableAccount.accounts,
        accounts,
      ],
    },
    otherDeductionsPayableAccount: {
      ...state.linkedAccounts.otherDeductionsPayableAccount,
      accounts: [
        ...state.linkedAccounts.otherDeductionsPayableAccount.accounts,
        accounts,
      ],
    },
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

const resetAccountToSavedValue = (state, { accountField }) => ({
  ...state,
  linkedAccounts: {
    ...state.linkedAccounts,
    [accountField]: {
      ...state.linkedAccounts[accountField],
      accountId: state.savedLinkedAccounts[accountField],
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

const setCreatedAccountLoadingState = (state, action) => ({
  ...state,
  isCreatedAccountLoading: action.isCreatedAccountLoading,
});

const setIsLateChargeRequired = (state, action) => ({
  ...state,
  isLateChargeRequired: action.isLateChargeRequired,
});

const handlers = {
  [SET_INITIAL_STATE]: setInitialState,
  [RESET_STATE]: resetState,
  [SET_LOADING_STATE]: setLoadingState,
  [SET_IS_SUBMITTING]: setIsSubmitting,
  [SET_ALERT]: setAlert,
  [SET_CREATED_ACCOUNT_LOADING_STATE]: setCreatedAccountLoadingState,
  [SET_SELECTED_TAB]: setSelectedTab,
  [SET_SHOULD_DISPLAY_ACCOUNTS_BANKING_TAB]: setShouldDisplayAccountsBankingTab,
  [SET_SHOULD_DISPLAY_SALES_TAB]: setShouldDisplaySalesTab,
  [SET_SHOULD_DISPLAY_PURCHASES_TAB]: setShouldDisplayPurchasesTab,
  [SET_SHOULD_DISPLAY_PAYROLL_TAB]: setShouldDisplayPayrollTab,
  [LOAD_LINKED_ACCOUNTS]: loadLinkedAccounts,
  [LOAD_ACCOUNT_AFTER_CREATE]: loadAccountAfterCreate,
  [UPDATE_ACCOUNT]: updateAccount,
  [UPDATE_HAS_ACCOUNT_OPTION]: updateHasAccountOption,
  [RESET_ACCOUNT_TO_SAVED_VALUE]: resetAccountToSavedValue,
  [SET_IS_LATE_CHARGE_REQUIRED]: setIsLateChargeRequired,
};

const linkedAccountsReducer = createReducer(getDefaultState(), handlers);

export default linkedAccountsReducer;
