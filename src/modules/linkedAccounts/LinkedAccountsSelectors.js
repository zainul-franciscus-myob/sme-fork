export const getLoadingState = (state) => state.loadingState;
export const getIsActionDisabled = (state) => state.isSubmitting;
export const getAlert = (state) => state.alert;
export const getSelectedTab = (state) => state.selectedTab;

export const getBusinessId = (state) => state.businessId;
export const getRegion = (state) => state.region;

export const getEquityAccountCurrentEarnings = (state) =>
  state.linkedAccounts.equityAccountCurrentEarnings;
export const getEquityAccountRetainedEarnings = (state) =>
  state.linkedAccounts.equityAccountRetainedEarnings;
export const getEquityHistoricalBalancing = (state) =>
  state.linkedAccounts.equityHistoricalBalancing;
export const getBankAccountElectronicPayments = (state) =>
  state.linkedAccounts.bankAccountElectronicPayments;
export const getBankAccountUndepositedFunds = (state) =>
  state.linkedAccounts.bankAccountUndepositedFunds;
export const getAssetAccountTrackingReceivables = (state) =>
  state.linkedAccounts.assetAccountTrackingReceivables;
export const getBankAccountCustomerReceipts = (state) =>
  state.linkedAccounts.bankAccountCustomerReceipts;
export const getIncomeAccountFreight = (state) =>
  state.linkedAccounts.incomeAccountFreight;
export const getLiabilityAccountCustomerDeposits = (state) =>
  state.linkedAccounts.liabilityAccountCustomerDeposits;
export const getExpenseSalesAccountDiscounts = (state) =>
  state.linkedAccounts.expenseSalesAccountDiscounts;
export const getIncomeAccountLateCharges = (state) =>
  state.linkedAccounts.incomeAccountLateCharges;
export const getLiabilityAccountTrackingPayables = (state) =>
  state.linkedAccounts.liabilityAccountTrackingPayables;
export const getBankAccountPayingBills = (state) =>
  state.linkedAccounts.bankAccountPayingBills;
export const getLiabilityAccountItemReceipts = (state) =>
  state.linkedAccounts.liabilityAccountItemReceipts;
export const getExpenseSalesAccountFreight = (state) =>
  state.linkedAccounts.expenseSalesAccountFreight;
export const getAssetAccountSupplierDeposits = (state) =>
  state.linkedAccounts.assetAccountSupplierDeposits;
export const getExpenseAccountDiscounts = (state) =>
  state.linkedAccounts.expenseAccountDiscounts;
export const getExpenseAccountLaterCharges = (state) =>
  state.linkedAccounts.expenseAccountLaterCharges;
export const getBankAccountCashPayments = (state) =>
  state.linkedAccounts.bankAccountCashPayments;
export const getBankAccountChequePayments = (state) =>
  state.linkedAccounts.bankAccountChequePayments;
export const getEmploymentExpenseAccount = (state) =>
  state.linkedAccounts.employmentExpenseAccount;
export const getWagesExpenseAccount = (state) =>
  state.linkedAccounts.wagesExpenseAccount;
export const getTaxDeductionsPayableAccount = (state) =>
  state.linkedAccounts.taxDeductionsPayableAccount;

export const getSaveLinkedAccountsPayload = (state) => ({
  equityAccountCurrentEarnings: {
    accountId: state.linkedAccounts.equityAccountCurrentEarnings.accountId,
  },
  equityAccountRetainedEarnings: {
    accountId: state.linkedAccounts.equityAccountRetainedEarnings.accountId,
  },
  equityHistoricalBalancing: {
    accountId: state.linkedAccounts.equityHistoricalBalancing.accountId,
  },
  bankAccountElectronicPayments: {
    accountId: state.linkedAccounts.bankAccountElectronicPayments.accountId,
  },
  bankAccountUndepositedFunds: {
    accountId: state.linkedAccounts.bankAccountUndepositedFunds.accountId,
  },
  assetAccountTrackingReceivables: {
    accountId: state.linkedAccounts.assetAccountTrackingReceivables.accountId,
  },
  bankAccountCustomerReceipts: {
    accountId: state.linkedAccounts.bankAccountCustomerReceipts.accountId,
  },
  incomeAccountFreight: {
    accountId: state.linkedAccounts.incomeAccountFreight.accountId,
    hasAccount: state.linkedAccounts.incomeAccountFreight.hasAccount,
  },
  liabilityAccountCustomerDeposits: {
    accountId: state.linkedAccounts.liabilityAccountCustomerDeposits.accountId,
    hasAccount:
      state.linkedAccounts.liabilityAccountCustomerDeposits.hasAccount,
  },
  expenseSalesAccountDiscounts: {
    accountId: state.linkedAccounts.expenseSalesAccountDiscounts.accountId,
    hasAccount: state.linkedAccounts.expenseSalesAccountDiscounts.hasAccount,
  },
  incomeAccountLateCharges: {
    accountId: state.linkedAccounts.incomeAccountLateCharges.accountId,
    hasAccount: state.linkedAccounts.incomeAccountLateCharges.hasAccount,
  },
  liabilityAccountTrackingPayables: {
    accountId: state.linkedAccounts.liabilityAccountTrackingPayables.accountId,
  },
  bankAccountPayingBills: {
    accountId: state.linkedAccounts.bankAccountPayingBills.accountId,
  },
  liabilityAccountItemReceipts: {
    accountId: state.linkedAccounts.liabilityAccountItemReceipts.accountId,
    hasAccount: state.linkedAccounts.liabilityAccountItemReceipts.hasAccount,
  },
  expenseSalesAccountFreight: {
    accountId: state.linkedAccounts.expenseSalesAccountFreight.accountId,
    hasAccount: state.linkedAccounts.expenseSalesAccountFreight.hasAccount,
  },
  assetAccountSupplierDeposits: {
    accountId: state.linkedAccounts.assetAccountSupplierDeposits.accountId,
    hasAccount: state.linkedAccounts.assetAccountSupplierDeposits.hasAccount,
  },
  expenseAccountDiscounts: {
    accountId: state.linkedAccounts.expenseAccountDiscounts.accountId,
    hasAccount: state.linkedAccounts.expenseAccountDiscounts.hasAccount,
  },
  expenseAccountLaterCharges: {
    accountId: state.linkedAccounts.expenseAccountLaterCharges.accountId,
    hasAccount: state.linkedAccounts.expenseAccountLaterCharges.hasAccount,
  },
  bankAccountCashPayments: {
    accountId: state.linkedAccounts.bankAccountCashPayments.accountId,
  },
  bankAccountChequePayments: {
    accountId: state.linkedAccounts.bankAccountChequePayments.accountId,
  },
  employmentExpenseAccount: {
    accountId: state.linkedAccounts.employmentExpenseAccount.accountId,
  },
  wagesExpenseAccount: {
    accountId: state.linkedAccounts.wagesExpenseAccount.accountId,
  },
  taxDeductionsPayableAccount: {
    accountId: state.linkedAccounts.taxDeductionsPayableAccount.accountId,
  },
});

export const getAccountModalContext = (state) => {
  const businessId = getBusinessId(state);
  const region = getRegion(state);

  return { businessId, region };
};

export const getLoadAddedAccountUrlParams = (state, accountId) => {
  const businessId = getBusinessId(state);

  return { businessId, accountId };
};
