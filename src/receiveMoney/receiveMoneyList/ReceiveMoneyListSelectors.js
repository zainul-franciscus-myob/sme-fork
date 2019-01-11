export const getOrder = ({ sortOrder }) => ({
  column: 'date',
  descending: sortOrder === 'desc',
});

export const getSortOrder = ({ sortOrder }) => sortOrder;

export const getAlert = ({ alert }) => alert;

export const convertToUnixTime = date => new Date(date).getTime().toString();

export const getFilterOptions = ({ filterOptions }) => ({
  ...filterOptions,
  dateFrom: convertToUnixTime(filterOptions.dateFrom),
  dateTo: convertToUnixTime(filterOptions.dateTo),
});

export const getEntries = state => state.entries;

export const getIsTableEmpty = ({ entries }) => entries.length === 0;

export const getIsTableLoading = state => state.isTableLoading;

export const getIsLoading = state => state.isLaoding;
