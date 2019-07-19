import { TotalsHeader } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getIsCreating, getTotals } from '../invoiceItemSelectors';

const InvoiceItemHeader = ({ isCreating, totals }) => {
  const totalItems = [
    <TotalsHeader.TotalItem
      key="totalAmount"
      label="Total amount"
      count={totals.displayTotalAmount}
    />,
    <TotalsHeader.TotalItem
      key="totalPaid"
      label="Total paid"
      count={totals.displayAmountPaid}
    />,
    <TotalsHeader.TotalItem
      key="balanceDue"
      label="Balance due"
      count={totals.displayAmountDue}
    />,
  ];

  return <TotalsHeader title="Invoice" totalItems={isCreating ? [] : totalItems} />;
};

const mapStateToProps = state => ({
  totals: getTotals(state),
  isCreating: getIsCreating(state),
});

export default connect(mapStateToProps)(InvoiceItemHeader);
