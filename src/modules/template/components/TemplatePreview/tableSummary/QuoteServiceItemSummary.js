import React from 'react';

import TableSummary from './TableSummary';
import getRegionToDialectText from '../../../../../dialect/getRegionToDialectText';

const QuoteServiceItemSummary = ({ region, shouldShowTaxCodeAndAmount }) => {
  const { subtotal, tax, total } = shouldShowTaxCodeAndAmount
    ? { subtotal: '$89.14', tax: '$8.91', total: '$98.05' }
    : { subtotal: '$98.05', tax: '$0.00', total: '$98.05' };
  return (
    <TableSummary
      summary={[
        { title: 'Subtotal', amount: subtotal },
        { title: getRegionToDialectText(region)('Tax'), amount: tax },
        {
          title: 'Total amount',
          titleAccessory: getRegionToDialectText(region)('Including tax'),
          amount: total,
          type: 'total',
        },
      ]}
    />
  );
};

export default QuoteServiceItemSummary;
