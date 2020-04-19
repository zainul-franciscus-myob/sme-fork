import { LineItemTable } from '@myob/myob-widgets';
import React from 'react';

import formatCurrency from '../../common/valueFormatters/formatCurrency';

const LineItemTableTotalsFormattedCurrency = ({
  title,
  amount,
}) => (
  <LineItemTable.Totals
    title={title}
    amount={formatCurrency(amount)}
  />
);

export default LineItemTableTotalsFormattedCurrency;
