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
  contactId: '', // spend money & receive money
  supplierId: '', // bill
  customerId: '', // invoice
  allocationType: '',
  allocations: [],
  conditions: [],
  allocationAccounts: [],
  bankAccounts: [],
  contacts: [], // spend money & receive money
  suppliers: [], // bill
  customers: [], // invoice
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
  alertMessage: '',
  modal: undefined,
  isPaymentReportable: undefined,
});

export default getDefaultState;
