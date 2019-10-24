import { TotalsHeader } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getInvoiceDetailTotalHeader } from '../selectors/invoiceDetailSelectors';

const InvoiceDetailHeader = ({
  totalAmount,
  amountPaid,
  amountDue,
  isCreating,
}) => {
  const totalItems = [
    <TotalsHeader.TotalItem
      key="totalAmount"
      label="Total amount"
      count={totalAmount}
    />,
    <TotalsHeader.TotalItem
      key="totalPaid"
      label="Total paid"
      count={amountPaid}
    />,
    <TotalsHeader.TotalItem
      key="balanceDue"
      label="Balance due"
      count={amountDue}
    />,
  ];

  return <TotalsHeader title="Invoice" totalItems={isCreating ? [] : totalItems} />;
};

const mapStateToProps = state => getInvoiceDetailTotalHeader(state);

export default connect(mapStateToProps)(InvoiceDetailHeader);
