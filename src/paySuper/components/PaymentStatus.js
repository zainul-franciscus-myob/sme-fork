import { Label } from '@myob/myob-widgets';
import React from 'react';

const PaymentStatus = ({ paymentStatus }) => (
  <Label type="boxed" color={paymentStatus.color}>{paymentStatus.display}</Label>
);

export default PaymentStatus;
