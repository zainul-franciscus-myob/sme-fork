import { Label } from '@myob/myob-widgets';
import React from 'react';

const EiSubmissionsStatusLabel = ({ status, size }) => (
  <Label type="boxed" color={status.colour} size={size}>
    {status.label}
  </Label>
);

export default EiSubmissionsStatusLabel;
