import { addMonths } from 'date-fns';

import formatIsoDate from '../../valueFormatters/formatDate/formatIsoDate';

const getDefaultDateRange = () => addMonths(new Date(), -3);

const getDefaultState = () => ({
  entries: [],
  sourceJournalFilters: [],
  filterOptions: {
    sourceJournal: '',
    dateFrom: formatIsoDate(getDefaultDateRange()),
    dateTo: formatIsoDate(new Date()),
    keywords: '',
  },
  appliedFilterOptions: {
    sourceJournal: '',
    dateFrom: formatIsoDate(getDefaultDateRange()),
    dateTo: formatIsoDate(new Date()),
    keywords: '',
  },
  sortOrder: '',
  orderBy: '',
  isLoading: true,
  isTableLoading: false,
});

export default getDefaultState;
