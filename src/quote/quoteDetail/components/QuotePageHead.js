import { TotalsHeader } from '@myob/myob-widgets';
import React from 'react';

const QuotePageHead = ({ showTotalItems, totalAmount, pageTitle }) => {
  const totalItems = [
    <TotalsHeader.TotalItem
      key="totalAmount"
      label="Total amount"
      count={totalAmount}
    />,
  ];

  return <TotalsHeader title={pageTitle} totalItems={showTotalItems ? [] : totalItems} />;
};

export default QuotePageHead;
