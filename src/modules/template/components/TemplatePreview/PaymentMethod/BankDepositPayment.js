import React from 'react';

import PaymentType from './PaymentType';
import styles from './PaymentMethod.module.css';

const BankDepositPayment = () => (
  <PaymentType
    name="Bank deposit via EFT"
    className={styles.paymenttypeDeposit}
  >
    <p>
      <strong>Bank</strong>
      <p>Commonwealth Bank of Australia</p>
    </p>
    <p>
      <strong>Name</strong>
      <p>Paradise Closet Limited Services</p>
    </p>
    <p>
      <strong>BSB</strong>
      <p>123456</p>
    </p>
    <p>
      <strong>AC#</strong>
      <p>123456789</p>
    </p>
    <p>
      <strong>Ref#</strong>
      <p>IV000000195</p>
    </p>
  </PaymentType>
);

export default BankDepositPayment;
