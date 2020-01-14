import React from 'react';

import PaymentType from './PaymentType';
import styles from './PaymentMethod.module.css';

const NZChequePayment = () => (
  <PaymentType name="Mail a cheque" className={styles.paymenttypeCheque}>
    <p>
      <strong>Cheques payable to</strong>
      <br />
      Coffee House
    </p>
    <p>
      <strong>Mail to</strong>
      <br />
      1 Yellowbrick Rd
      <br />
      Christchurch 8053
      <br />
      New Zealand
    </p>
  </PaymentType>
);

export default NZChequePayment;
