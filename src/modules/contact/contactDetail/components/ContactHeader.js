import {
  Button, Icons, Label, TotalsHeader,
} from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getContactHeaderDetails } from '../contactDetailSelectors';
import styles from './ContactHeader.module.css';

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
    onRemindersButtonClick,
  } = props;


  if (isCreating) {
    return (
      <TotalsHeader
        title="Create contact"
      />
    );
  }

  const headerRight = showPaymentSummary && (
    [
      <TotalsHeader.TotalItem
        key={1}
        label="Avg days to pay"
        count={averageDaysToPay}
      />,
      <TotalsHeader.TotalItem
        key={2}
        label="Balance due"
        count={balanceDue}
      />,
      <TotalsHeader.TotalItem
        key={3}
        label="Balance due"
        count={overDue}
        className={styles.overdue}
      />,
    ]
  );

  const headerLeft = showReminders && (
    <Button
      type="link"
      icon={<Icons.OpenExternalLink />}
      onClick={onRemindersButtonClick}
    >
      Reminder settings
    </Button>
  );

  return (
    <TotalsHeader
      title={title}
      subtitle={contactType}
      actions={
        headerLeft
      }
      totalItems={headerRight}
      tag={(
        <Label type="boxed" color="light-grey">
          {status}
        </Label>
      )}
    />
  );
};


const mapStateToProps = state => ({
  ...getContactHeaderDetails(state),
});

export default connect(mapStateToProps)(ContactHeader);
