import {
  Button, Icons, Label,
} from '@myob/myob-widgets';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import React from 'react';

import { getContactHeaderDetails } from '../contactDetailSelectors';
import styles from './ContactHeader.module.css';

// eslint-disable-next-line react/prop-types
const PaymentChip = ({ label, value, color }) => (
  <div className={styles.chip}>
    <Label size="small" color={color}>{label}</Label>
    <Label size="large" color={color}>{value}</Label>
  </div>
);

const ContactHeader = (props) => {
  const {
    contactType,
    averageDaysToPay,
    balanceDue,
    overDue,
    showReminders,
    showPaymentSummary,
    onRemindersButtonClick,
  } = props;

  return (
    <div className={styles.header}>
      <div className={styles.headerLeft}>
        <div>
          <Label>{contactType}</Label>
        </div>
        {
          showReminders && (
            <Button
              type="link"
              icon={<Icons.OpenExternalLink />}
              onClick={onRemindersButtonClick}
            >
              Reminder settings
            </Button>
          )
        }
      </div>
      <div className={styles.headerRight}>
        {
          showPaymentSummary && (
            <React.Fragment>
              <PaymentChip label="Avg days to pay" value={averageDaysToPay} />
              <PaymentChip label="Balance due" value={balanceDue} />
              <PaymentChip label="Overdue" value={overDue} color="red" />
            </React.Fragment>
          )
        }
      </div>
    </div>
  );
};

ContactHeader.propTypes = {
  contactType: PropTypes.string.isRequired,
  averageDaysToPay: PropTypes.string.isRequired,
  balanceDue: PropTypes.string.isRequired,
  overDue: PropTypes.string.isRequired,
  showReminders: PropTypes.bool.isRequired,
  showPaymentSummary: PropTypes.bool.isRequired,
  onRemindersButtonClick: PropTypes.func.isRequired,
};

const mapStateToProps = state => getContactHeaderDetails(state);

export default connect(mapStateToProps)(ContactHeader);
