export const getOrder = ({ sortOrder }) => ({
  column: 'date',
  descending: sortOrder === 'desc',
});

export const getSortOrder = ({ sortOrder }) => sortOrder;

export const getAlert = ({ alert }) => alert;

export const getFilterOptions = ({ filterOptions }) => filterOptions;

export const isTableEmpty = ({ entries }) => entries.length === 0;
