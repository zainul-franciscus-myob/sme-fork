import React from 'react';

import TableSummary from './TableSummary';
import getRegionToDialectText from '../../../../../dialect/getRegionToDialectText';

const QuoteTableSummary = ({ region }) => (
  <TableSummary
    summary={[
      { title: 'Subtotal', amount: '$99,999,999.99' },
      { title: getRegionToDialectText(region)('Tax'), amount: '$29.12' },
      {
        title: 'Total amount',
        titleAccessory: getRegionToDialectText(region)('Including tax'),
        amount: '$99,999,999.99',
        type: 'total',
      },
    ]}
  />
);

export default QuoteTableSummary;
