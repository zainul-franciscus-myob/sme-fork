import React from 'react';

import TableSummary from './TableSummary';
import getRegionToDialectText from '../../../../../dialect/getRegionToDialectText';

const InvoiceServiceSummary = ({ region }) => (
  <TableSummary
    summary={[
      { title: 'Subtotal', amount: '$172.73' },
      { title: getRegionToDialectText(region)('Tax'), amount: '$17.27' },
      {
        title: 'Total amount',
        titleAccessory: `(inc. ${getRegionToDialectText(region)('tax')})`,
        amount: '$190.00',
        type: 'large',
      },
      { title: 'Total paid', amount: '$0.00' },
      { title: 'Balance due', amount: '$190.00', type: 'total' },
    ]}
  />
);

export default InvoiceServiceSummary;
