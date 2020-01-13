import React from 'react';

import TableSummary from './TableSummary';
import getRegionToDialectText from '../../../../../dialect/getRegionToDialectText';

const QuoteServiceItemSummary = ({ region }) => (
  <TableSummary
    summary={[
      { title: getRegionToDialectText(region)('Tax'), amount: '$8.91' },
      {
        title: 'Total amount',
        titleAccessory: getRegionToDialectText(region)('Including tax'),
        amount: '$98.05',
        type: 'total',
      },
    ]}
  />
);

export default QuoteServiceItemSummary;
