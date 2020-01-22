import React from 'react';

import TableSummary from './TableSummary';
import getRegionToDialectText from '../../../../../dialect/getRegionToDialectText';

const InvoiceServiceItemSummary = ({ region }) => (
  <TableSummary
    summary={[
      { title: 'Subtotal', amount: '$89.14' },
      { title: getRegionToDialectText(region)('Tax'), amount: '$8.91' },
      {
        title: 'Total amount',
        titleAccessory: `(inc. ${getRegionToDialectText(region)('tax')})`,
        amount: '$98.05',
        type: 'large',
      },
      { title: 'Total paid', amount: '$0.00' },
      { title: 'Balance due', amount: '$98.05', type: 'total' },
    ]}
  />
);

export default InvoiceServiceItemSummary;
