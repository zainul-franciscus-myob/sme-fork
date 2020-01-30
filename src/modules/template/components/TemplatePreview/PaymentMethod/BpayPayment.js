import { Spinner } from '@myob/myob-widgets';
import React from 'react';

import PaymentType from './PaymentType';
import bpayImg from '../assets/Bpay.svg';
import styles from './PaymentMethod.module.css';

const BpayPayment = ({
  isLoading,
  isShown,
}) => {
  if (isLoading) {
    return (
      <PaymentType isLoading className={styles.onlinePaymentLoading}><Spinner size="small" /></PaymentType>
    );
  }

  return isShown
    ? (
      <PaymentType name="BPAY®" className={styles.paymenttypeBpay}>
        <img src={bpayImg} alt="bpay" />
      </PaymentType>)
    : null;
};

export default BpayPayment;
