import React from 'react';

import TableSummary from './TableSummary';

const StatementTableSummary = () => (
  <TableSummary
    summary={[
      { title: 'Current', amount: '$322.90' },
      { title: '30 days', amount: '$22.19' },
      { title: '60 days', amount: '$0.00' },
      { title: '90 days', amount: '$0.00' },
      { title: 'Balance due', amount: '$390.19', type: 'total' },
    ]}
  />
);

export default StatementTableSummary;
