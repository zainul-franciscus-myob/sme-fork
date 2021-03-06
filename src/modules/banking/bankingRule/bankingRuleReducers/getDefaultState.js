import AutomatedRuleTypes from '../AutomatedRuleTypes';

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
    automatedRuleType: AutomatedRuleTypes.AUTOMATED,
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
  jobs: [],
  taxCodes: [],
  withdrawalAccounts: [],
  depositAccounts: [],
  isNoConditionRuleAllowed: false,
  viewedAccountToolTip: false,
});

export default getDefaultState;
