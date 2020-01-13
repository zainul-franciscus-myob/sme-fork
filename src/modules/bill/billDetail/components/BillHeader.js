import {
  Button, Icons, TotalsHeader,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getAmountDue,
  getDisplayAmountPaid,
  getIsCreating,
  getPageTitle,
  getTotalAmount,
} from '../selectors/billSelectors';

const BillHeader = ({
  isCreating,
  pageTitle,
  displayTotalAmount,
  displayAmountPaid,
  displayAmountDue,
  onCreatePaymentClick,
}) => {
  const actions = [
    <Button key="createPayment" type="link" icon={<Icons.Dollar />} onClick={onCreatePaymentClick}>
      Create payment
    </Button>,
  ];

  if (isCreating) {
    return (
      <TotalsHeader
        title={pageTitle}
        totalItems={[]}
      />
    );
  }

  return (
    <TotalsHeader
      title={pageTitle}
      actions={actions}
      totalItems={[
        <TotalsHeader.TotalItem
          key="totalAmount"
          label="Total amount"
          count={displayTotalAmount}
        />,
        <TotalsHeader.TotalItem
          key="totalPaid"
          label="Total paid"
          count={displayAmountPaid}
        />,
        <TotalsHeader.TotalItem
          key="balanceDue"
          label="Balance due"
          count={displayAmountDue}
        />,
      ]}
    />
  );
};

const mapStateToProps = state => ({
  isCreating: getIsCreating(state),
  pageTitle: getPageTitle(state),
  displayTotalAmount: getTotalAmount(state),
  displayAmountPaid: getDisplayAmountPaid(state),
  displayAmountDue: getAmountDue(state),
});


export default connect(mapStateToProps)(BillHeader);
