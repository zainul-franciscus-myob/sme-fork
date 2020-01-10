import React from 'react';

import PaymentType from './PaymentType';
import bpayImg from '../assets/Bpay.svg';
import styles from './PaymentMethod.module.css';

const BpayPayment = () => (
  <PaymentType name="BPAY®" className={styles.paymenttypeBpay}>
    <img src={bpayImg} alt="bpay" />
  </PaymentType>
);

export default BpayPayment;
