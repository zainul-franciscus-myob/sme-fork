import React from 'react';

import TableSummary from './TableSummary';
import getRegionToDialectText from '../../../../../dialect/getRegionToDialectText';

const QuoteServiceSummary = ({ region, shouldShowTaxCodeAndAmount }) => {
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
          titleAccessory: getRegionToDialectText(region)('Including tax'),
          amount: total,
          type: 'total',
        },
      ]}
    />
  );
};

export default QuoteServiceSummary;
