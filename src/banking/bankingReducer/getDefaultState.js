import { format } from 'date-fns';

import { getDefaultOpenPosition } from '../bankingSelectors';
import { tabIds } from '../tabItems';

const convertToDateString = time => format(new Date(Number(time)), 'YYYY-MM-DD');
const getDefaultDateRange = () => new Date().setMonth(new Date().getMonth() - 3);

const getDefaultState = () => ({
  entries: [],
  withdrawalAccounts: [],
  depositAccounts: [],
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
    dateFrom: convertToDateString(getDefaultDateRange()),
    dateTo: convertToDateString(Date.now()),
    keywords: '',
  },
  appliedFilterOptions: {
    transactionType: 'All',
    bankAccount: '',
    dateFrom: convertToDateString(getDefaultDateRange()),
    dateTo: convertToDateString(Date.now()),
    keywords: '',
  },
  orderBy: '',
  sortOrder: '',
  alert: undefined,
  isLoading: true,
  isTableLoading: false,
  businessId: '',
  region: '',
  openPosition: getDefaultOpenPosition(),
  isOpenEntryLoading: false,
  openEntry: {
    isEdited: false,
    isCreating: false,
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
  },
  loginDetails: {
    username: '',
    password: '',
  },
});

export default getDefaultState;
