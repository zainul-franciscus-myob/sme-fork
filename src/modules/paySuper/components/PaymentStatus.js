import { Label } from '@myob/myob-widgets';
import React from 'react';

const PaymentStatus = ({ paymentStatus, size }) => {
  if (!paymentStatus) {
    return null;
  }

  return (<Label type="boxed" size={size} color={paymentStatus.color}>{paymentStatus.display}</Label>
  );
};

export default PaymentStatus;
