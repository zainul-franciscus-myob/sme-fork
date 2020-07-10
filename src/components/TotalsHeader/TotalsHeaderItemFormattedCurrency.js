import { TotalsHeader } from '@myob/myob-widgets';
import React from 'react';

import formatCurrency from '../../common/valueFormatters/formatCurrency';

const TotalsHeaderItemFormattedCurrency = ({ key, label, count }) => (
  <TotalsHeader.TotalItem
    key={key}
    label={label}
    count={formatCurrency(count)}
  />
);

export default TotalsHeaderItemFormattedCurrency;
