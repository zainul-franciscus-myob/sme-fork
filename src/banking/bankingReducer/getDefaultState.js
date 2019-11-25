import { addMonths } from 'date-fns';

import { getDefaultOpenPosition } from '../bankingSelectors';
import { tabIds } from '../tabItems';
import formatIsoDate from '../../valueFormatters/formatDate/formatIsoDate';
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
  transactionTypes: [],
  contacts: [],
  suppliers: [],
  customers: [],
  taxCodes: [],
  filterOptions: {
    transactionType: 'All',
    bankAccount: '',
    dateFrom: formatIsoDate(getDefaultDateRange()),
    dateTo: formatIsoDate(new Date()),
    keywords: '',
  },
  appliedFilterOptions: {
    transactionType: 'All',
    bankAccount: '',
    dateFrom: formatIsoDate(getDefaultDateRange()),
    dateTo: formatIsoDate(new Date()),
    keywords: '',
  },
  orderBy: '',
  sortOrder: '',
  alert: undefined,
  isLoading: true,
  isTableLoading: false,
  isBulkLoading: false,
  businessId: '',
  region: '',
  openPosition: getDefaultOpenPosition(),
  isOpenEntryLoading: false,
  openEntry: {
    isEdited: false,
    isCreating: false,
    isAttachmentsLoading: false,
    activeTabId: tabIds.allocate,
    allocate: {
      id: '',
      date: '',
      contactId: '',
      isReportable: false,
      lines: [],
      isSpendMoney: false,
      totalAmount: 0,
      newLine: {
        accountId: '',
        taxCodeId: '',
        description: '',
        amount: '',
      },
    },
    match: {
      isTableLoading: false,
      totalAmount: 0,
      selectedJournalLineId: '',
      filterOptions: {
        accountId: '',
        allocatedJournalLineId: '',
        isCredit: '',
        dateFrom: '',
        dateTo: '',
        amountFrom: '',
        amountTo: '',
        keywords: '',
      },
      orderBy: '',
      sortOrder: '',
      entries: [],
    },
    payment: {
      isTableLoading: false,
      isBillPayment: false,
      totalAmount: 0,
      contacts: [],
      filterOptions: {
        contactId: '',
        showPaid: false,
      },
      entries: [],
    },
    transfer: {
      transferFrom: '',
      transferTo: '',
      amount: '',
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
