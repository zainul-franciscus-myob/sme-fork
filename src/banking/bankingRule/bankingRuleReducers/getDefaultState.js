const getDefaultState = () => ({
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
  },
  isSaving: false,
  bankAccounts: [],
  taxCodes: [],
  withdrawalAccounts: [],
  depositAccounts: [],
  contacts: [],
});

export default getDefaultState;
