import { Label } from '@myob/myob-widgets';
import React from 'react';

const ReportsStatusLabel = ({ status }) => (
  <Label type="boxed" color={status.color}>{status.label}</Label>
);

export default ReportsStatusLabel;
