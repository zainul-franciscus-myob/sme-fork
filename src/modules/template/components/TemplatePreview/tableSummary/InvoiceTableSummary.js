import React from 'react';

import TableSummary from './TableSummary';
import getRegionToDialectText from '../../../../../dialect/getRegionToDialectText';

const InvoiceTableSummary = ({ region }) => (
  <TableSummary
    summary={[
      { title: 'Subtotal', amount: '$99,999,999.99' },
      { title: getRegionToDialectText(region)('Tax'), amount: '$9,999.99' },
      {
        title: 'Total amount',
        titleAccessory: `(inc. ${getRegionToDialectText(region)('tax')})`,
        amount: '$99,999,999.99',
        type: 'large',
      },
      { title: 'Total paid', amount: '$0.00' },
      { title: 'Balance due', amount: '$99,999,999.99', type: 'total' },
    ]}
  />
);

export default InvoiceTableSummary;
