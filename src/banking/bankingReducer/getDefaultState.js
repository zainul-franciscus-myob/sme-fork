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
  },
  bankAccounts: [],
  transactionTypes: [],
  contacts: [],
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
  },
});

export default getDefaultState;
