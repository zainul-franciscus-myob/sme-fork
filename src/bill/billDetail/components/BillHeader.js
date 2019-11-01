import {
  Button, Icons, Label, TotalsHeader,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getAmountDue,
  getDisplayAmountPaid,
  getIsCreating,
  getPageTitle,
  getStatus,
  getTotalAmount,
} from '../selectors/billSelectors';
import {
  getRecordPaymentUrl,
} from '../selectors/BillRedirectSelectors';
import LinkButton from '../../../components/Button/LinkButton';

const BillHeader = ({
  isCreating,
  pageTitle,
  status,
  recordPaymentUrl,
  displayTotalAmount,
  displayAmountPaid,
  displayAmountDue,
}) => {
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
      tag={(
        <Label type="boxed">
          {status}
        </Label>
      )}
      actions={[
        <Button
          key="activityHistory"
          type="link"
          icon={<Icons.History />}
        >
Activity history
        </Button>,
        <LinkButton
          key="recordPayment"
          type="link"
          icon={<Icons.Dollar />}
          href={recordPaymentUrl}
        >
Record payment
        </LinkButton>,
      ]}
    />
  );
};

const mapStateToProps = state => ({
  isCreating: getIsCreating(state),
  pageTitle: getPageTitle(state),
  status: getStatus(state),
  recordPaymentUrl: getRecordPaymentUrl(state),
  displayTotalAmount: getTotalAmount(state),
  displayAmountPaid: getDisplayAmountPaid(state),
  displayAmountDue: getAmountDue(state),
});


export default connect(mapStateToProps)(BillHeader);
