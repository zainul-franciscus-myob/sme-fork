import { Alert, Button, Input } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getOnlineBankLink,
  getReferenceNumber,
} from '../BankFeedsApplySelectors';
import styles from './BankFeedsConnectView.module.css';

const BankFeedsOnline = ({
  onCopy,
  redirectToBank,
  referenceNumber,
  setCopyAlertText,
}) => {
  const copy = (refNumber) => {
    onCopy(refNumber);
    setCopyAlertText(
      'Copied! You can use this reference number to activate bank feeds with your bank.'
    );
  };

  return (
    <>
      <h3>Last steps</h3>
      Finish your bank feed application by logging in to your online banking
      system and activating bank feeds with MYOB.
      <div className={styles.alert}>
        <Alert inline type="info">
          Copy this number before continuing to your online banking.
        </Alert>
      </div>
      <div className={styles.referenceNumber}>
        <Input
          disabled
          hideLabel
          label="referenceNumber"
          name="referenceNumber"
          type="number"
          value={referenceNumber}
          width="md"
        />

        <Button type="secondary" onClick={() => copy(referenceNumber)}>
          Copy
        </Button>
      </div>
      <Button type="primary" onClick={() => redirectToBank()}>
        Go to online banking
      </Button>
      <hr />
      <h3>That&apos;s all!</h3>
      Once you&apos;ve activated bank feed in your online banking page, your
      bank will review your application. They&apos;ll send us a confirmation and
      we&apos;ll contract you by email immediately. The process usually takes a
      few days depending on your bank.
    </>
  );
};

const mapStateToProps = (state) => ({
  onlineBankLink: getOnlineBankLink(state),
  referenceNumber: getReferenceNumber(state),
});

export default connect(mapStateToProps)(BankFeedsOnline);
