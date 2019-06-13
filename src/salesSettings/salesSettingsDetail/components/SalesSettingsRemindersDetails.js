import {
  Button, Card, FieldGroup,
} from '@myob/myob-widgets';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import React from 'react';

import { getReminderLink } from '../SalesSettingsDetailSelectors';
import invoiceReminder from './invoiceReminder.png';
import styles from './SalesSettingRemindersDetail.css';

const openNewTab = url => () => window.open(
  url,
  'invoiceReminder',
  'height=776,width=618,menubar=no,toolbar=no,resizable=yes',
);

const SalesSettingsLayoutDetails = ({ reminderLink }) => (
  <Card>
    <FieldGroup label="Get paid faster with invoice reminders">
      <img className={styles.invoiceReminder} src={invoiceReminder} alt="Invoice reminder" />
      <p>
        Save time chasing late payments by automating your reminders.
        Whether you want to gently prod all or some of your customers,
        you can choose when to remind them, what you want to say and how often.
      </p>
      <Button type="primary" onClick={openNewTab(reminderLink)}>Reminders settings</Button>
    </FieldGroup>
  </Card>
);

SalesSettingsLayoutDetails.propTypes = {
  reminderLink: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  reminderLink: getReminderLink(state),
});

export default connect(mapStateToProps)(SalesSettingsLayoutDetails);
