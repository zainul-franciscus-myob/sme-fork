import { Label } from '@myob/myob-widgets';
import React from 'react';

const PaymentStatus = ({ paymentStatus, size }) => (
  <Label type="boxed" size={size} color={paymentStatus.color}>{paymentStatus.display}</Label>
);

export default PaymentStatus;
