import { addMonths } from 'date-fns';

import { getDefaultOpenPosition } from '../bankingSelectors';
import { tabIds } from '../tabItems';
import TransactionTypes from '../TransactionTypes';
import formatIsoDate from '../../../common/valueFormatters/formatDate/formatIsoDate';
import getBankingRuleDefaultState from '../bankingRule/bankingRuleReducers/getDefaultState';

const getDefaultDateRange = () => addMonths(new Date(), -3);

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
    balanceTooltip: '',
  },
  bankAccounts: [],
  transactionTypes: [
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
  filterOptions: {
    transactionType: TransactionTypes.UNALLOCATED,
    bankAccount: '',
    dateFrom: formatIsoDate(getDefaultDateRange()),
    dateTo: formatIsoDate(new Date()),
    keywords: '',
  },
  appliedFilterOptions: {
    transactionType: TransactionTypes.UNALLOCATED,
    bankAccount: '',
    dateFrom: formatIsoDate(getDefaultDateRange()),
    dateTo: formatIsoDate(new Date()),
    keywords: '',
  },
  orderBy: 'Date',
  sortOrder: 'desc',
  alert: undefined,
  modalAlert: undefined,
  isModalBlocking: false,
  hasError: false,
  isLoading: true,
  isTableLoading: false,
  isBulkLoading: false,
  isLoadingAccount: false,
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
        taxCodeId: '',
        description: '',
        amount: '',
        quantity: '',
      },
    },
    match: {
      isTableLoading: false,
      totalAmount: 0,
      filterOptions: {
        showType: 'closeMatches',
        contactId: 'All',
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
