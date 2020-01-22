import React from 'react';

import TableSummary from './TableSummary';
import getRegionToDialectText from '../../../../../dialect/getRegionToDialectText';

const QuoteServiceSummary = ({ region }) => (
  <TableSummary
    summary={[
      { title: 'Subtotal', amount: '$172.73' },
      { title: getRegionToDialectText(region)('Tax'), amount: '$17.27' },
      {
        title: 'Total amount',
        titleAccessory: getRegionToDialectText(region)('Including tax'),
        amount: '$190.00',
        type: 'total',
      },
    ]}
  />
);

export default QuoteServiceSummary;
