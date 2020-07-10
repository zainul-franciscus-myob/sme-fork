import { Button, Icons, Label, TotalsHeader } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getContactHeaderDetails,
  getReminderLink,
} from '../contactDetailSelectors';
import styles from './ContactHeader.module.css';

const openNewTab = (url) => () =>
  window.open(
    url,
    'invoiceReminder',
    'height=776,width=618,menubar=no,toolbar=no,resizable=yes'
  );

const ContactHeader = (props) => {
  const {
    isCreating,
    title,
    contactType,
    status,
    averageDaysToPay,
    balanceDue,
    overDue,
    showReminders,
    showPaymentSummary,
    reminderLink,
  } = props;

  if (isCreating) {
    return <TotalsHeader title="Create contact" />;
  }

  const headerRight = showPaymentSummary && [
    <TotalsHeader.TotalItem
      key={1}
      label="Avg days to pay"
      count={averageDaysToPay}
    />,
    <TotalsHeader.TotalItem key={2} label="Balance due" count={balanceDue} />,
    <TotalsHeader.TotalItem
      key={3}
      label="Balance overdue"
      count={overDue}
      className={styles.overdue}
    />,
  ];

  const headerLeft = showReminders && (
    <Button
      type="link"
      icon={<Icons.OpenExternalLink />}
      onClick={openNewTab(reminderLink)}
    >
      Reminder settings
    </Button>
  );

  return (
    <TotalsHeader
      title={title}
      subtitle={contactType}
      actions={headerLeft}
      totalItems={headerRight}
      tag={
        <Label type="boxed" color="light-grey">
          {status}
        </Label>
      }
    />
  );
};

const mapStateToProps = (state) => ({
  ...getContactHeaderDetails(state),
  reminderLink: getReminderLink(state),
});

export default connect(mapStateToProps)(ContactHeader);
