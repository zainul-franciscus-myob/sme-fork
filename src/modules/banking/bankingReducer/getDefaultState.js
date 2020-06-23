import { getDefaultOpenPosition } from '../bankingSelectors';
import { tabIds } from '../tabItems';
import Periods from '../../../components/PeriodPicker/Periods';
import TransactionTypes from '../TransactionTypes';
import getBankingRuleDefaultState from '../bankingRule/bankingRuleReducers/getDefaultState';

const defaultFilterOptions = {
  transactionType: TransactionTypes.ALL,
  bankAccount: '',
  period: Periods.lastThreeMonths,
  keywords: '',
};

const getDefaultState = () => ({
  entries: [],
  withdrawalAccounts: [],
  depositAccounts: [],
  bulkAllocationAccounts: [],
  bulkAllocationOptions: {
    accountId: '',
    taxCodeId: '',
  },
  balances: {
    bankBalance: '',
    myobBalance: '',
    unallocated: '',
    bankBalanceDate: '',
    balanceTooltip: '',
  },
  bankAccounts: [],
  transactionTypes: [
    {
      name: 'All transactions',
      value: TransactionTypes.ALL,
    },
    {
      name: 'Unallocated',
      value: TransactionTypes.UNALLOCATED,
    },
    {
      name: 'Allocated',
      value: TransactionTypes.ALLOCATED,
    },
  ],
  contacts: [],
  suppliers: [],
  customers: [],
  taxCodes: [],
  jobs: [],
  filterOptions: defaultFilterOptions,
  defaultFilterOptions,
  pagination: {
    hasNextPage: false,
    offset: 0,
  },
  orderBy: 'Date',
  sortOrder: 'desc',
  alert: undefined,
  modalAlert: undefined,
  isModalBlocking: false,
  hasError: false,
  isLoading: true,
  isLoadingMore: false,
  isTableLoading: false,
  isBulkLoading: false,
  isLoadingAccount: false,
  isJobLoading: false,
  businessId: '',
  region: '',
  openPosition: getDefaultOpenPosition(),
  editingNotePosition: undefined,
  isSubmittingNote: false,
  pendingNote: undefined,
  isOpenEntryLoading: false,
  openEntry: {
    isEdited: false,
    isCreating: false,
    isAttachmentsLoading: false,
    activeTabId: tabIds.allocate,
    description: '',
    allocate: {
      id: '',
      date: '',
      contactId: '',
      description: '',
      isReportable: false,
      lines: [],
      isSpendMoney: false,
      totalAmount: 0,
      newLine: {
        accountId: '',
        jobId: '',
        taxCodeId: '',
        description: '',
        amount: '',
        quantity: '',
        lineJobOptions: [],
      },
    },
    match: {
      isTableLoading: false,
      totalAmount: 0,
      filterOptions: {
        showType: 'closeMatches',
        contactId: undefined,
        keywords: '',
        includeClosed: false,
      },
      orderBy: '',
      sortOrder: '',
      entries: [],
      adjustments: [],
      showAdjustmentTable: false,
      selectedEntries: {},
    },
    transfer: {
      isWithdrawal: false,
      isTableLoading: false,
      entries: [],
      orderBy: 'Date',
      sortOrder: 'desc',
      transferFrom: '',
      transferTo: '',
      amount: '',
      date: '',
      description: '',
    },
    attachments: [],
  },
  loginDetails: {
    username: '',
    password: '',
  },
  bankingRuleModal: getBankingRuleDefaultState(),
});

export default getDefaultState;
