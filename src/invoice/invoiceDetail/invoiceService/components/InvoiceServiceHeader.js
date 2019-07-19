import { TotalsHeader } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getIsCreating, getTotalsAndAmounts } from '../invoiceServiceSelectors';

const InvoiceServiceHeader = ({ isCreating, totals }) => {
  const totalItems = [
    <TotalsHeader.TotalItem
      key="totalAmount"
      label="Total amount"
      count={totals.totalAmount}
    />,
    <TotalsHeader.TotalItem
      key="totalPaid"
      label="Total paid"
      count={totals.amountPaid}
    />,
    <TotalsHeader.TotalItem
      key="balanceDue"
      label="Balance due"
      count={totals.amountDue}
    />,
  ];

  return <TotalsHeader title="Invoice" totalItems={isCreating ? [] : totalItems} />;
};

const mapStateToProps = state => ({
  totals: getTotalsAndAmounts(state),
  isCreating: getIsCreating(state),
});

export default connect(mapStateToProps)(InvoiceServiceHeader);
