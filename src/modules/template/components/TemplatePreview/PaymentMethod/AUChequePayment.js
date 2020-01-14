import React from 'react';

import PaymentType from './PaymentType';
import styles from './PaymentMethod.module.css';

const AUChequePayment = () => (
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
      Melbourne VIC 3000
      <br />
      Australia
    </p>
  </PaymentType>
);

export default AUChequePayment;
