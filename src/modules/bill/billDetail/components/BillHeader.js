import { Button, Icons, TotalsHeader } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getAmountDue,
  getAmountPaid,
  getIsCreating,
  getPageTitle,
  getTotals,
} from '../selectors/billSelectors';
import TotalsHeaderItemFormattedCurrency from '../../../../components/TotalsHeader/TotalsHeaderItemFormattedCurrency';

const BillHeader = ({
  isCreating,
  pageTitle,
  amountPaid,
  totals: { totalAmount },
  amountDue,
  onCreatePaymentClick,
}) => {
  const actions = [
    <Button
      key="createPayment"
      type="link"
      icon={<Icons.Dollar />}
      onClick={onCreatePaymentClick}
    >
      Create payment
    </Button>,
  ];

  if (isCreating) {
    return <TotalsHeader title={pageTitle} totalItems={[]} />;
  }

  return (
    <TotalsHeader
      title={pageTitle}
      actions={actions}
      totalItems={[
        <TotalsHeaderItemFormattedCurrency
          key="totalAmount"
          label="Total amount"
          count={totalAmount}
        />,
        <TotalsHeaderItemFormattedCurrency
          key="totalPaid"
          label="Total paid"
          count={amountPaid}
        />,
        <TotalsHeaderItemFormattedCurrency
          key="balanceDue"
          label="Balance due"
          count={amountDue}
        />,
      ]}
    />
  );
};

const mapStateToProps = (state) => ({
  isCreating: getIsCreating(state),
  pageTitle: getPageTitle(state),
  amountDue: getAmountDue(state),
  amountPaid: getAmountPaid(state),
  totals: getTotals(state),
});

export default connect(mapStateToProps)(BillHeader);
