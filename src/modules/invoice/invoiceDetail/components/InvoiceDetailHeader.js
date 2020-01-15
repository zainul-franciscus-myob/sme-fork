import { Button, Icons, TotalsHeader } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getInvoiceDetailTotalHeader } from '../selectors/invoiceDetailSelectors';

const InvoiceDetailHeader = ({
  totalAmount,
  amountPaid,
  amountDue,
  title,
  isCreating,
  onFocusActivityHistory,
  onRedirectToCreatePayment,
}) => {
  const actions = [
    <Button key="activityHistory" type="link" icon={<Icons.History />} onClick={onFocusActivityHistory}>
      Activity history
    </Button>,
    <Button key="createPayment" type="link" icon={<Icons.Dollar />} onClick={onRedirectToCreatePayment}>
      Create payment
    </Button>,
  ];

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

  return (
    <TotalsHeader
      title={title}
      actions={!isCreating && actions}
      totalItems={!isCreating && totalItems}
    />
  );
};

const mapStateToProps = state => getInvoiceDetailTotalHeader(state);

export default connect(mapStateToProps)(InvoiceDetailHeader);
