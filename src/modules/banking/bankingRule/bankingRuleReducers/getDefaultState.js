const getDefaultState = () => ({
  businessId: '',
  region: '',
  transaction: {
    accountId: '',
    accountDisplayName: '',
    description: '',
    date: '',
    withdrawal: undefined,
    deposit: undefined,
  },
  bankingRule: {
    name: '',
    ruleType: '',
    isInactiveRule: false,
    applyToAllAccounts: 'All bank accounts',
    transactionDescription: '',
    bankFeedAccountId: '',
    contactId: '',
    allocationType: 'Percent',
    allocations: [],
    conditions: [],
    isPaymentReportable: undefined,
  },
  isOpen: false,
  isLoading: false,
  contactType: undefined,
  bankAccounts: [],
  taxCodes: [],
  withdrawalAccounts: [],
  depositAccounts: [],
});

export default getDefaultState;
