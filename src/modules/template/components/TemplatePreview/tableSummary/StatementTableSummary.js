import React from 'react';

import TableSummary from './TableSummary';

const StatementTableSummary = () => (
  <TableSummary
    summary={[
      { title: 'Current', amount: '$99,999,999.99' },
      { title: '30 days', amount: '$20.53' },
      { title: '60 days', amount: '$28,750.12' },
      { title: '90 days', amount: '$1,660.15' },
      { title: 'Balance due', amount: '$99,999,999.99', type: 'total' },
    ]}
  />
);

export default StatementTableSummary;
