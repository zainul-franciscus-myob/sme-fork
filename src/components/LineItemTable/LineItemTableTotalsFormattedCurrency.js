import { LineItemTable } from '@myob/myob-widgets';
import React from 'react';

import formatCurrency from '../../common/valueFormatters/formatCurrency';

const LineItemTableTotalsFormattedCurrency = ({ title, amount, note }) => (
  <LineItemTable.Totals
    title={title}
    amount={
      note ? `${formatCurrency(amount)} (${note})` : formatCurrency(amount)
    }
  />
);

export default LineItemTableTotalsFormattedCurrency;
