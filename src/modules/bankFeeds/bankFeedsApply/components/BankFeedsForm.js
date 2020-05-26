import { Button, Input } from '@myob/myob-widgets';
import { connect } from 'react-redux';
import React from 'react';

import {
  getBankFeedLoadEmail,
  getReferenceNumber,
  getUserEmail,
} from '../BankFeedsApplySelectors';
import styles from './BankFeedsConnectView.module.css';

const BankFeedsForm = ({
  bankFeedLoadEmail,
  onCopy,
  setCopyAlertText,
  userEmail,
}) => {
  const copy = (email) => {
    onCopy(email);
    setCopyAlertText('Copied! You can send your signed form to this email address.');
  };

  return (
    <>
      <h3>Last steps</h3>

      To complete your application, you will need to sign an authority form and email it to us.
      We will then send your bank feed application to your bank for approval.

      <hr />

      <h3>1. Print the form and sign it</h3>

      Check your email {userEmail && <b>{userEmail}</b>} or click the button below to download
      and print your form. Sign the printed authority form and scan a copy to your computer.

      <Button className={styles.printForm} type="primary">Print authority form</Button>

      <h3>2. Email the signed form</h3>

      Send your signed form to <a href="mailto:bankfeedloads@myob.com">bankfeedloads@myob.com</a> and we will pass it on to your bank for approval.

      <div className={styles.bankFeedLoadEmail}>
        <Input
          disabled
          hideLabel
          label="bankFeedLoadEmail"
          name="bankFeedLoadEmail"
          placeholder="bankfeedloads@myob.com"
          type="email"
          value={bankFeedLoadEmail}
        />

        <Button type="secondary" onClick={() => copy(bankFeedLoadEmail)}>Copy</Button>
      </div>

      <hr />

      <h3>That&apos;s all!</h3>

      We&apos;ll take it from here.  You&apos;ll receive an email when we
      get the confirmation of your authority form approval from your bank.
      This process usually takes 10 days depending on your bank.
    </>
  );
};

const mapStateToProps = state => ({
  bankFeedLoadEmail: getBankFeedLoadEmail(state),
  referenceNumber: getReferenceNumber(state),
  userEmail: getUserEmail(state),
});

export default connect(mapStateToProps)(BankFeedsForm);
