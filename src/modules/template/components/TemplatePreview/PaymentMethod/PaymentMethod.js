import React from 'react';

import BankDepositPayment from './BankDepositPayment';
import BpayPayment from './BpayPayment';
import ChequePayment from './ChequePayment';
import CreditCardPayment from './CreditCardPayment';
import styles from './PaymentMethod.module.css';

const PaymentMethod = () => (
  <div>
    <div className={styles.paymentmethodHeader}>
      <h3>How to pay</h3>
      <span>Due date: 12/10/2019</span>
    </div>
    <div className={styles.paymentmethodGrid}>
      {<BpayPayment />}
      {<CreditCardPayment />}
      {<BankDepositPayment />}
      {<ChequePayment />}
    </div>
  </div>
);

export default PaymentMethod;
