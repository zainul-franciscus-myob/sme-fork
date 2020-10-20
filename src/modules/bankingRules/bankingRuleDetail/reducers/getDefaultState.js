import LoadingState from '../../../../components/PageView/LoadingState';
import RuleTypes from '../RuleTypes';

const getDefaultState = () => ({
  businessId: '',
  bankingRuleId: '',
  region: '',
  name: '',
  title: '',
  ruleType: RuleTypes.spendMoney,
  isInactiveRule: false,
  applyToAllAccounts: '',
  transactionDescription: '',
  accountId: '',
  contactId: '',
  allocationType: '',
  allocations: [],
  conditions: [],
  depositAccounts: [],
  withdrawalAccounts: [],
  bankAccounts: [],
  taxCodes: [],
  newAllocationLine: {
    accountId: '',
    value: '',
    jobId: '',
    taxCodeId: '',
    lineJobOptions: [],
  },
  loadingState: LoadingState.LOADING,
  isPageEdited: false,
  alert: undefined,
  modal: undefined,
  isPaymentReportable: undefined,
  contactType: undefined,
  isNoConditionRuleEnabled: false,
});

export default getDefaultState;
