import { getDefaultOpenPosition } from '../selectors';
import BankingViewCodes from '../BankingViewCodes';
import LoadingState from '../../../components/PageView/LoadingState';
import MatchTransactionShowType from '../types/MatchTransactionShowType';
import Periods from '../../../components/PeriodPicker/Periods';
import TabItems from '../types/TabItems';
import TransactionTypes from '../types/TransactionTypes';

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
  taxCodes: [],
  jobs: [],
  filterOptions: defaultFilterOptions,
  defaultFilterOptions,
  pagination: {
    hasNextPage: false,
    offset: 0,
  },
  viewCode: BankingViewCodes.TRANSACTIONS_VIEW,
  loadingState: LoadingState.LOADING_SUCCESS,
  orderBy: 'Date',
  sortOrder: 'desc',
  alert: undefined,
  modalAlert: undefined,
  isModalBlocking: false,
  isLoadingMore: false,
  isTableLoading: false,
  isBulkLoading: false,
  isBulkOpen: false,
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
    activeTabId: TabItems.allocate,
    description: '',
    allocate: {
      isLoading: false,
      id: '',
      date: '',
      contactId: '',
      description: '',
      isReportable: false,
      bankingRuleId: '',
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
        showType: MatchTransactionShowType.CLOSE_MATCHES,
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
  hoverIndex: -1,
  focus: {
    index: -1,
    location: undefined,
    isFocused: false,
  },
  lastAllocatedAccount: undefined,
});

export default getDefaultState;
