import { Button, Card, FieldGroup } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import { getReminderLink } from '../SalesSettingsDetailSelectors';
import invoiceReminder from './invoiceReminder.png';
import styles from './SalesSettingsRemindersDetails.module.css';

const openNewTab = (url) => () =>
  window.open(
    url,
    'invoiceReminder',
    'height=776,width=618,menubar=no,toolbar=no,resizable=yes'
  );

const SalesSettingsLayoutDetails = ({ reminderLink }) => (
  <Card>
    <FieldGroup label="Get paid faster with invoice reminders">
      <img
        className={styles.invoiceReminder}
        src={invoiceReminder}
        alt="Invoice reminder"
      />
      <p>
        Save time chasing late payments by automating your reminders. You can
        decide which of your customers to remind, and how often. For customers
        you work with regularly, you can send summaries of all outstanding
        invoices.
      </p>
      <Button type="primary" onClick={openNewTab(reminderLink)}>
        Reminders settings
      </Button>
    </FieldGroup>
  </Card>
);

const mapStateToProps = (state) => ({
  reminderLink: getReminderLink(state),
});

export default connect(mapStateToProps)(SalesSettingsLayoutDetails);
