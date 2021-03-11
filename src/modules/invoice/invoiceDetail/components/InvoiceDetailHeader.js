import { Button, Icons, Label, TotalsHeader } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getInvoiceDetailTotalHeader } from '../selectors/invoiceDetailSelectors';
import { getInvoiceFinanceInfo } from '../selectors/invoiceFinanceSelectors';
import TotalsHeaderItemFormattedCurrency from '../../../../components/TotalsHeader/TotalsHeaderItemFormattedCurrency';
import styles from './invoiceDetailHeader.module.css';

const InvoiceDetailHeader = ({
  totalAmount,
  amountPaid,
  amountDue,
  title,
  isCreating,
  onFocusActivityHistory,
  onRedirectToCreatePayment,
  onInvoiceFinanceClick,
  statusLabel,
  statusColor,
  invoiceFinanceEntryUrl,
  invoiceFinanceMessage,
  showInvoiceFinanceButton,
}) => {
  const statusItem = (
    <div className={styles.capitalFirst} name="statusLabel">
      <Label color={statusColor} type="boxed">
        {statusLabel}
      </Label>
    </div>
  );

  const invoiceFinanceAction = (
    <div className={styles.right}>
      <Button
        name="invoiceFinance"
        key="invoiceFinance"
        type="link"
        icon={<Icons.Dollar />}
        onClick={() => onInvoiceFinanceClick(invoiceFinanceEntryUrl)}
      >
        {invoiceFinanceMessage}
      </Button>
    </div>
  );

  const actions = [
    <Button
      key="activityHistory"
      name="activityHistory"
      type="link"
      icon={<Icons.History />}
      onClick={onFocusActivityHistory}
    >
      Activity history
    </Button>,
    <Button
      key="createPayment"
      name="createPaymentHeader"
      type="link"
      icon={<Icons.Add />}
      onClick={onRedirectToCreatePayment}
    >
      Create payment
    </Button>,
  ];

  const totalItems = [
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
  ];

  return (
    <div className={styles.titleWrapper}>
      <TotalsHeader
        title={title}
        actions={
          !isCreating &&
          (showInvoiceFinanceButton
            ? [...actions, invoiceFinanceAction]
            : actions)
        }
        tag={!isCreating && statusItem}
        totalItems={!isCreating && totalItems}
      />
    </div>
  );
};

const mapStateToProps = (state) => ({
  ...getInvoiceDetailTotalHeader(state),
  ...getInvoiceFinanceInfo(state),
});

export default connect(mapStateToProps)(InvoiceDetailHeader);
