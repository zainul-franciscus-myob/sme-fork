import { Spinner } from '@myob/myob-widgets';
import React from 'react';

import PaymentType from './PaymentType';
import creditCardImg from '../assets/CreditCardLogos.svg';
import styles from './PaymentMethod.module.css';

const CreditCardPayment = ({
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
      <PaymentType name="Credit card" className={styles.paymenttypeCredit}>
        <img src={creditCardImg} alt="credit card" />
        <p>
          Pay with your credit card by clicking
          {' '}
          <strong>Pay now</strong>
          {' '}
          in your invoice email.
        </p>
        <p>We accept American Express, Visa and Mastercard.</p>
      </PaymentType>
    )
    : null;
};

export default CreditCardPayment;
