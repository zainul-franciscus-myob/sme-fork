import React from 'react';

import TableSummary from './TableSummary';
import getRegionToDialectText from '../../../../../dialect/getRegionToDialectText';

const InvoiceServiceItemSummary = ({
  region,
  description,
  subtotalAmount,
  taxAmount,
  totalAmount,
  totalPaid,
  balanceDue,
}) => (
  <TableSummary
    summary={[
      { title: 'Subtotal', amount: subtotalAmount },
      { title: getRegionToDialectText(region)('Tax'), amount: taxAmount },
      {
        title: 'Total amount',
        titleAccessory: `(inc. ${getRegionToDialectText(region)('tax')})`,
        amount: totalAmount,
        type: 'large',
      },
      { title: 'Total paid', amount: totalPaid },
      { title: 'Balance due', amount: balanceDue, type: 'total' },
    ]}
    description={description}
  />
);

export default InvoiceServiceItemSummary;
