import { Label } from '@myob/myob-widgets';
import React from 'react';

const ReportsStatusLabel = ({ status, size }) => (
  <Label type="boxed" color={status.color} size={size}>{status.label}</Label>
);

export default ReportsStatusLabel;
