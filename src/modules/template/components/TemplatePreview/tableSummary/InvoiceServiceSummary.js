import React from 'react';

import TableSummary from './TableSummary';
import getRegionToDialectText from '../../../../../dialect/getRegionToDialectText';

const InvoiceServiceSummary = ({ region, shouldShowTaxCodeAndAmount }) => {
  const { subtotal, tax, total } = shouldShowTaxCodeAndAmount
    ? { subtotal: '$172.73', tax: '$17.27', total: '$190.00' }
    : { subtotal: '$190.00', tax: '$0.00', total: '$190.00' };

  return (
    <TableSummary
      summary={[
        { title: 'Subtotal', amount: subtotal },
        { title: getRegionToDialectText(region)('Tax'), amount: tax },
        {
          title: 'Total amount',
          titleAccessory: `(inc. ${getRegionToDialectText(region)('tax')})`,
          amount: total,
          type: 'large',
        },
        { title: 'Total paid', amount: '$0.00' },
        { title: 'Balance due', amount: '$190.00', type: 'total' },
      ]}
    />
  );
};

export default InvoiceServiceSummary;
