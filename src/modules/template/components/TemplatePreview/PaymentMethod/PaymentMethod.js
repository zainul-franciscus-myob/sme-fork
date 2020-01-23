import React from 'react';

import styles from './PaymentMethod.module.css';

const PaymentMethod = ({
  bPay,
  creditCard,
  bankDeposit,
  cheque,
  rightHeader,
}) => (
  <div>
    <div className={styles.paymentmethodHeader}>
      <h3>How to pay</h3>
      {rightHeader}
    </div>
    <div className={styles.paymentmethodGrid}>
      {bPay}
      {creditCard}
      {bankDeposit}
      {cheque}
    </div>
  </div>
);

export default PaymentMethod;
